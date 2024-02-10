mod constants;
pub mod graphics;
pub mod primitives;
pub mod state;
mod tree;

use crate::components::core::{image::Handle, shapes::Rectangle};
use crate::components::layer::{self, LayerBrush};
use crate::components::rect::{Rect, RectBrush};
use crate::components::rich_text::RichTextBrush;
use crate::components::text;
use crate::context::Context;
use crate::font::fonts::{SugarloafFont, SugarloafFonts};
#[cfg(not(target_arch = "wasm32"))]
use crate::font::loader::Database;
use crate::font::Font;
use crate::font::{
    FONT_ID_BOLD, FONT_ID_BOLD_ITALIC, FONT_ID_EMOJIS, FONT_ID_ICONS, FONT_ID_ITALIC,
    FONT_ID_REGULAR, FONT_ID_SYMBOL, FONT_ID_UNICODE,
};
use crate::glyph::{FontId, GlyphCruncher};
use crate::layout::SpanStyle;
use crate::layout::SugarloafLayout;
use crate::sugarloaf::layer::types;
use crate::sugarloaf::tree::SugarTreeDiff;
use ab_glyph::{self, Font as GFont, FontArc, PxScale};
use core::fmt::{Debug, Formatter};
use fnv::FnvHashMap;
use graphics::SugarloafGraphics;
use primitives::{ImageProperties, Sugar, SugarLine};
use raw_window_handle::{
    DisplayHandle, HandleError, HasDisplayHandle, HasWindowHandle, WindowHandle,
};
use state::SugarState;

use unicode_width::UnicodeWidthChar;

#[cfg(target_arch = "wasm32")]
pub struct Database;

#[derive(Copy, Clone, PartialEq)]
pub struct CachedSugar {
    font_id: FontId,
    char_width: f32,
    px_scale: Option<PxScale>,
}

struct GraphicRect {
    id: graphics::SugarGraphicId,
    #[allow(unused)]
    height: u16,
    width: u16,
    pos_x: f32,
    pos_y: f32,
    columns: f32,
    start_row: f32,
    end_row: f32,
}

pub struct Sugarloaf {
    sugar_cache: FnvHashMap<char, CachedSugar>,
    pub ctx: Context,
    pub layout: SugarloafLayout,
    pub graphics: SugarloafGraphics,
    text_brush: text::GlyphBrush<()>,
    rect_brush: RectBrush,
    layer_brush: LayerBrush,
    rich_text_brush: RichTextBrush,
    graphic_rects: FnvHashMap<crate::SugarGraphicId, GraphicRect>,
    rects: Vec<Rect>,
    state: state::SugarState,
    fonts: SugarloafFonts,
    level: SugarloafRendererLevel,
    text_y: f32,
    current_row: u16,
    pub sugar_dimension_has_changed: bool,
    pub background_color: wgpu::Color,
    pub background_image: Option<types::Image>,
}

#[derive(Debug)]
pub struct SugarloafErrors {
    pub fonts_not_found: Vec<SugarloafFont>,
}

pub struct SugarloafWithErrors {
    pub instance: Sugarloaf,
    pub errors: SugarloafErrors,
}

impl Debug for SugarloafWithErrors {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self.errors)
    }
}

#[derive(Copy, Clone)]
pub struct SugarloafWindowSize {
    pub width: f32,
    pub height: f32,
}

pub struct SugarloafWindow {
    pub handle: raw_window_handle::RawWindowHandle,
    pub display: raw_window_handle::RawDisplayHandle,
    pub size: SugarloafWindowSize,
    pub scale: f32,
}

#[derive(PartialEq, Debug, Clone, Default)]
pub enum SugarloafRendererLevel {
    Basic,
    #[default]
    Advanced,
}

impl SugarloafRendererLevel {
    #[inline]
    pub fn is_advanced(&self) -> bool {
        self == &SugarloafRendererLevel::Advanced
    }
}

pub struct SugarloafRenderer {
    pub power_preference: wgpu::PowerPreference,
    pub backend: wgpu::Backends,
    pub level: SugarloafRendererLevel,
}

impl Default for SugarloafRenderer {
    fn default() -> SugarloafRenderer {
        #[cfg(target_arch = "wasm32")]
        let default_backend = wgpu::Backends::BROWSER_WEBGPU | wgpu::Backends::GL;
        #[cfg(not(target_arch = "wasm32"))]
        let default_backend = wgpu::Backends::all();

        SugarloafRenderer {
            power_preference: wgpu::PowerPreference::HighPerformance,
            backend: default_backend,
            level: SugarloafRendererLevel::default(),
        }
    }
}

impl SugarloafWindow {
    fn raw_window_handle(&self) -> raw_window_handle::RawWindowHandle {
        self.handle
    }

    fn raw_display_handle(&self) -> raw_window_handle::RawDisplayHandle {
        self.display
    }
}

impl HasWindowHandle for SugarloafWindow {
    fn window_handle(&self) -> std::result::Result<WindowHandle, HandleError> {
        let raw = self.raw_window_handle();
        Ok(unsafe { WindowHandle::borrow_raw(raw) })
    }
}

impl HasDisplayHandle for SugarloafWindow {
    fn display_handle(&self) -> Result<DisplayHandle, HandleError> {
        let raw = self.raw_display_handle();
        Ok(unsafe { DisplayHandle::borrow_raw(raw) })
    }
}

unsafe impl Send for SugarloafWindow {}
unsafe impl Sync for SugarloafWindow {}

impl Sugarloaf {
    pub async fn new(
        window: SugarloafWindow,
        renderer: SugarloafRenderer,
        fonts: SugarloafFonts,
        layout: SugarloafLayout,
        #[allow(unused)] db: Option<&Database>,
    ) -> Result<Sugarloaf, SugarloafWithErrors> {
        let ctx = Context::new(window, &renderer).await;
        let mut sugarloaf_errors = None;

        #[cfg(not(target_arch = "wasm32"))]
        let loader = Font::load(fonts.to_owned(), db);
        #[cfg(target_arch = "wasm32")]
        let loader = Font::load(fonts.to_owned());

        let (loaded_fonts, fonts_not_found) = loader;

        if !fonts_not_found.is_empty() {
            sugarloaf_errors = Some(SugarloafErrors { fonts_not_found });
        }

        let text_brush = text::GlyphBrushBuilder::using_fonts(loaded_fonts)
            .build(&ctx.device, ctx.format);
        let rect_brush = RectBrush::init(&ctx);
        let layer_brush = LayerBrush::new(&ctx);
        let rich_text_brush = RichTextBrush::new(&ctx);

        let instance = Sugarloaf {
            sugar_cache: FnvHashMap::default(),
            graphics: SugarloafGraphics::new(),
            state: SugarState::default(),
            layer_brush,
            fonts,
            ctx,
            background_color: wgpu::Color::BLACK,
            background_image: None,
            rect_brush,
            rich_text_brush,
            rects: vec![],
            graphic_rects: FnvHashMap::default(),
            text_brush,
            layout,
            text_y: 0.0,
            current_row: 0,
            level: renderer.level,
            sugar_dimension_has_changed: false,
        };

        if let Some(errors) = sugarloaf_errors {
            return Err(SugarloafWithErrors { instance, errors });
        }

        Ok(instance)
    }

    #[allow(unused)]
    pub fn clear(&mut self) {
        match self.ctx.surface.get_current_texture() {
            Ok(frame) => {
                let mut encoder = self.ctx.device.create_command_encoder(
                    &wgpu::CommandEncoderDescriptor { label: None },
                );

                let view = &frame
                    .texture
                    .create_view(&wgpu::TextureViewDescriptor::default());

                encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                    timestamp_writes: None,
                    occlusion_query_set: None,
                    label: Some("sugarloaf::init -> Clear frame"),
                    color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                        view,
                        resolve_target: None,
                        ops: wgpu::Operations {
                            load: wgpu::LoadOp::Clear(self.background_color),
                            store: wgpu::StoreOp::Store,
                        },
                    })],
                    depth_stencil_attachment: None,
                });
                self.ctx.queue.submit(Some(encoder.finish()));
                frame.present();
            }
            Err(error) => {
                if error == wgpu::SurfaceError::OutOfMemory {
                    panic!("Swapchain error: {error}. Rendering cannot continue.")
                }
            }
        }
    }

    #[inline]
    pub fn update_font(
        &mut self,
        fonts: SugarloafFonts,
        #[allow(unused)] db: Option<&Database>,
    ) -> Option<SugarloafErrors> {
        if self.fonts != fonts {
            log::info!("requested a font change");

            #[cfg(not(target_arch = "wasm32"))]
            let loader = Font::load(fonts.to_owned(), db);
            #[cfg(target_arch = "wasm32")]
            let loader = Font::load(fonts.to_owned());

            let (loaded_fonts, fonts_not_found) = loader;
            if !fonts_not_found.is_empty() {
                return Some(SugarloafErrors { fonts_not_found });
            }

            // Clean font cache per instance
            self.sugar_cache = FnvHashMap::default();

            let text_brush = text::GlyphBrushBuilder::using_fonts(loaded_fonts)
                .build(&self.ctx.device, self.ctx.format);
            self.text_brush = text_brush;
            self.fonts = fonts;
        }

        None
    }

    #[inline]
    pub fn get_font_id(&mut self, sugar: &Sugar) -> CachedSugar {
        if let Some(cached_sugar) = self.sugar_cache.get(&sugar.content) {
            return *cached_sugar;
        }

        #[allow(clippy::unnecessary_to_owned)]
        let fonts: &[FontArc] = &self.text_brush.fonts().to_owned();
        let mut font_id = FontId(FONT_ID_REGULAR);

        for (idx, _font_arc) in fonts.iter().enumerate() {
            let found_glyph_id = fonts[idx].glyph_id(sugar.content);
            if found_glyph_id != ab_glyph::GlyphId(0) {
                font_id = FontId(idx);
                break;
            }
        }

        let mut px_scale = None;
        let char_width = sugar.content.width().unwrap_or(1) as f32;

        match font_id {
            // Icons will look for width 1
            FontId(FONT_ID_ICONS) => {
                px_scale = Some(PxScale {
                    x: self.layout.dimensions.width,
                    y: self.layout.dimensions.height,
                });
            }

            FontId(FONT_ID_UNICODE) | FontId(FONT_ID_SYMBOL) => {
                // println!("FONT_ID_UNICODE {:?}", char_width);
                px_scale = Some(PxScale {
                    x: self.layout.dimensions.width * char_width,
                    y: self.layout.dimensions.height,
                });
            }

            FontId(FONT_ID_EMOJIS) => {
                // scale_target = (self.layout.dimensions.width * self.layout.dimensions.scale) * 2.0;
                px_scale = Some(PxScale {
                    x: self.layout.dimensions.width * 2.0,
                    y: self.layout.dimensions.height,
                });
            }

            // FontId(FONT_ID_REGULAR) => {
            // px_scale = Some(PxScale {
            //     x: self.layout.dimensions.width * 2.0,
            //     y: self.layout.dimensions.height,
            // })
            // }
            FontId(_) => {}
        }

        let cached_sugar = CachedSugar {
            font_id,
            char_width,
            px_scale,
        };

        self.sugar_cache.insert(
            sugar.content,
            CachedSugar {
                font_id,
                char_width,
                px_scale,
            },
        );

        cached_sugar
    }

    #[inline]
    pub fn stack(&mut self, mut line: SugarLine) {
        match self.level {
            SugarloafRendererLevel::Basic => {
                self.process_line(&mut line);
            }
            SugarloafRendererLevel::Advanced => {
                self.state.process_line(&mut line);
            }
        }
    }

    #[inline]
    fn process_line(&mut self, stack: &mut SugarLine) {
        let mut x = 0.;
        let mod_pos_y = self.layout.style.screen_position.1;
        let mod_text_y = self.layout.dimensions.height;

        let sugar_x = self.layout.dimensions.width;
        let sugar_width =
            (self.layout.dimensions.width * self.layout.dimensions.scale) * 2.;

        if self.text_y == 0.0 {
            self.text_y = self.layout.style.screen_position.1;
        }

        let size = stack.acc;
        for i in 0..size {
            let mut add_pos_x = sugar_x;
            let mut sugar_char_width = 1.;
            let rect_pos_x = self.layout.style.screen_position.0 + x;

            let cached_sugar: CachedSugar = self.get_font_id(&stack[i]);

            let mut font_id = cached_sugar.font_id;
            if cached_sugar.font_id == FontId(FONT_ID_REGULAR) {
                if stack[i].style.is_bold_italic {
                    font_id = FontId(FONT_ID_BOLD_ITALIC);
                } else if stack[i].style.is_bold {
                    font_id = FontId(FONT_ID_BOLD);
                } else if stack[i].style.is_italic {
                    font_id = FontId(FONT_ID_ITALIC);
                }
            }

            if cached_sugar.char_width > 1. {
                sugar_char_width = cached_sugar.char_width;
                add_pos_x += sugar_x;
            }

            let quantity = stack[i].repeated + 1;

            let mut scale = PxScale {
                x: self.layout.dimensions.height,
                y: self.layout.dimensions.height,
            };
            if let Some(new_scale) = cached_sugar.px_scale {
                scale = new_scale;
            }

            let rect_pos_y = self.text_y + mod_pos_y;
            let width_bound = sugar_width * sugar_char_width;

            let text = if quantity == 1 {
                stack[i].content.to_string()
            } else {
                std::iter::repeat(stack[i].content)
                    .take(stack[i].repeated + 1)
                    .collect::<String>()
            };
            let section_pos_x = rect_pos_x;
            let section_pos_y = mod_text_y + self.text_y + mod_pos_y;

            let text = crate::components::text::OwnedText {
                text,
                scale: scale,
                font_id: font_id,
                extra: crate::components::text::Extra {
                    color: stack[i].foreground_color,
                    z: 0.0,
                },
            };

            let section = crate::components::text::OwnedSection {
                screen_position: (section_pos_x, section_pos_y),
                bounds: (self.layout.width, self.layout.height),
                text: vec![text],
                layout: crate::glyph::Layout::default_single_line()
                    .v_align(crate::glyph::VerticalAlign::Bottom)
                    .h_align(crate::glyph::HorizontalAlign::Left),
            };

            self.text_brush.queue(&section);

            let scaled_rect_pos_x = section_pos_x / self.ctx.scale;
            let scaled_rect_pos_y = rect_pos_y / self.ctx.scale;

            self.rects.push(Rect {
                position: [scaled_rect_pos_x, scaled_rect_pos_y],
                color: stack[i].background_color,
                size: [
                    width_bound * quantity as f32,
                    self.layout.dimensions.height / self.layout.dimensions.scale,
                ],
            });

            match &stack[i].cursor {
                primitives::SugarCursor::Block(cursor_color) => {
                    self.rects.push(Rect {
                        position: [
                            (scaled_rect_pos_x + (add_pos_x * 0.0) / self.ctx.scale),
                            scaled_rect_pos_y,
                        ],
                        color: *cursor_color,
                        size: [
                            (width_bound * 1.0),
                            (self.layout.dimensions.height
                                / self.layout.dimensions.scale)
                                * 1.0,
                        ],
                    });
                }
                primitives::SugarCursor::Caret(cursor_color) => {
                    self.rects.push(Rect {
                        position: [
                            (scaled_rect_pos_x + (add_pos_x * 0.0) / self.ctx.scale),
                            scaled_rect_pos_y,
                        ],
                        color: *cursor_color,
                        size: [
                            (width_bound * 0.1),
                            (self.layout.dimensions.height
                                / self.layout.dimensions.scale)
                                * 1.0,
                        ],
                    });
                }
                primitives::SugarCursor::Underline(cursor_color) => {
                    let dec_pos_y =
                        (scaled_rect_pos_y) + self.layout.dimensions.height - 2.5;
                    self.rects.push(Rect {
                        position: [
                            (scaled_rect_pos_x + (add_pos_x * 0.0) / self.ctx.scale),
                            dec_pos_y,
                        ],
                        color: *cursor_color,
                        size: [
                            (width_bound * 0.1),
                            (self.layout.dimensions.height
                                / self.layout.dimensions.scale)
                                * 1.0,
                        ],
                    });
                }
                primitives::SugarCursor::Disabled => {}
            }

            match &stack[i].decoration {
                primitives::SugarDecoration::Underline => {
                    let dec_pos_y =
                        (scaled_rect_pos_y) + self.layout.dimensions.height - 1.;
                    self.rects.push(Rect {
                        position: [
                            (scaled_rect_pos_x + (add_pos_x * 0.0) / self.ctx.scale),
                            dec_pos_y,
                        ],
                        color: stack[i].foreground_color,
                        size: [
                            (width_bound * 1.0),
                            (self.layout.dimensions.height
                                / self.layout.dimensions.scale)
                                * 0.005,
                        ],
                    });
                }
                primitives::SugarDecoration::Strikethrough => {
                    let dec_pos_y =
                        (scaled_rect_pos_y) + self.layout.dimensions.height / 2.0;
                    self.rects.push(Rect {
                        position: [
                            (scaled_rect_pos_x + (add_pos_x * 0.0) / self.ctx.scale),
                            dec_pos_y,
                        ],
                        color: stack[i].foreground_color,
                        size: [
                            (width_bound * 1.0),
                            (self.layout.dimensions.height
                                / self.layout.dimensions.scale)
                                * 0.025,
                        ],
                    });
                }
                &primitives::SugarDecoration::Disabled => {}
            }

            // if let Some(decoration) = &stack[i].custom_decoration {
            //     let dec_pos_y = (scaled_rect_pos_y) + (decoration.relative_position.1);
            //     self.rects.push(Rect {
            //         position: [
            //             (scaled_rect_pos_x
            //                 + (add_pos_x * decoration.relative_position.0)
            //                     / self.ctx.scale),
            //             dec_pos_y,
            //         ],
            //         color: decoration.color,
            //         size: [
            //             (width_bound * decoration.size.0),
            //             (self.layout.dimensions.height / self.layout.dimensions.scale)
            //                 * decoration.size.1,
            //         ],
            //     });
            // }

            if let Some(sugar_media) = &stack[i].media {
                if let Some(rect) = self.graphic_rects.get_mut(&sugar_media.id) {
                    rect.columns += 1.0;
                    rect.end_row = self.current_row.into();
                } else {
                    // println!("miss {:?}", sugar_media.id);
                    self.graphic_rects.insert(
                        sugar_media.id,
                        GraphicRect {
                            id: sugar_media.id,
                            height: sugar_media.height,
                            width: sugar_media.width,
                            pos_x: scaled_rect_pos_x,
                            pos_y: scaled_rect_pos_y,
                            columns: 1.0,
                            start_row: 1.0,
                            end_row: 1.0,
                        },
                    );
                }
            }

            x += add_pos_x * (quantity as f32);
        }

        self.current_row += 1;
        self.text_y += self.layout.dimensions.height * self.layout.line_height;
    }

    #[inline]
    pub fn get_context(&self) -> &Context {
        &self.ctx
    }

    #[inline]
    pub fn get_scale(&self) -> f32 {
        self.ctx.scale
    }

    #[inline]
    pub fn get_font_bounds(
        &mut self,
        content: char,
        font_id: FontId,
        scale: f32,
    ) -> (f32, f32) {
        let text = crate::components::text::Text {
            text: &content.to_owned().to_string(),
            scale: PxScale { x: scale, y: scale },
            font_id,
            extra: crate::components::text::Extra {
                color: [0., 0., 0., 0.],
                z: 0.0,
            },
        };

        let section = &crate::components::text::Section {
            screen_position: (0., 0.),
            bounds: (self.layout.width, self.layout.height),
            text: vec![text],
            layout: crate::glyph::Layout::default_single_line()
                .v_align(crate::glyph::VerticalAlign::Bottom)
                .h_align(crate::glyph::HorizontalAlign::Left),
        };

        self.text_brush.queue(section);

        if let Some(rect) = self.text_brush.glyph_bounds(section) {
            let width = rect.max.x - rect.min.x;
            let height = rect.max.y - rect.min.y;
            return (width, height);
        }

        (0., 0.)
    }

    #[inline]
    pub fn set_background_color(&mut self, color: wgpu::Color) -> &mut Self {
        self.background_color = color;
        self
    }

    #[inline]
    pub fn set_background_image(&mut self, image: &ImageProperties) -> &mut Self {
        let handle = Handle::from_path(image.path.to_owned());
        self.background_image = Some(layer::types::Image::Raster {
            handle,
            bounds: Rectangle {
                width: image.width,
                height: image.height,
                x: image.x,
                y: image.y,
            },
        });
        self
    }

    /// calculate_bounds is a fake render operation that defines font bounds
    /// is an important function to figure out the cursor dimensions and background color
    /// but should be used as minimal as possible.
    ///
    /// For example: It is used in Rio terminal only in the initialization and
    /// configuration updates that leads to layout recalculation.
    ///
    #[inline]
    pub fn calculate_bounds(&mut self) {
        if self.level.is_advanced() {
            return;
        }

        let text_scale = self.layout.style.text_scale;

        // Every time a font size change the cached bounds also changes
        self.sugar_cache = FnvHashMap::default();

        // Bounds are defined in runtime
        let font_bound = self.get_font_bounds(' ', FontId(FONT_ID_REGULAR), text_scale);

        self.layout.dimensions.width = font_bound.0;
        self.layout.dimensions.height = font_bound.1;

        self.layout.update_columns_per_font_width();
    }

    #[inline]
    pub fn pile_rects(&mut self, mut instances: Vec<Rect>) -> &mut Self {
        self.rects.append(&mut instances);
        self
    }

    #[inline]
    pub fn text(
        &mut self,
        pos: (f32, f32),
        text_str: String,
        font_id_usize: usize,
        scale: f32,
        color: [f32; 4],
        single_line: bool,
    ) -> &mut Self {
        let font_id = FontId(font_id_usize);

        let text = crate::components::text::Text {
            text: &text_str,
            scale: PxScale::from(scale * self.ctx.scale),
            font_id,
            extra: crate::components::text::Extra { color, z: 0.0 },
        };

        let layout = if single_line {
            crate::glyph::Layout::default_single_line()
                .v_align(crate::glyph::VerticalAlign::Bottom)
                .h_align(crate::glyph::HorizontalAlign::Left)
        } else {
            crate::glyph::Layout::default()
                .v_align(crate::glyph::VerticalAlign::Bottom)
                .h_align(crate::glyph::HorizontalAlign::Left)
        };

        let section = &crate::components::text::Section {
            screen_position: (pos.0 * self.ctx.scale, pos.1 * self.ctx.scale),
            bounds: (self.layout.width, self.layout.height),
            text: vec![text],
            layout,
        };

        self.text_brush.queue(section);
        self
    }

    #[inline]
    pub fn resize(&mut self, width: u32, height: u32) {
        self.ctx.resize(width, height);
        self.layout.resize(width, height).update();
    }

    #[inline]
    pub fn rescale(&mut self, scale: f32) {
        self.ctx.scale = scale;
        self.layout.rescale(scale).update();
    }

    #[inline]
    fn reset_state(&mut self) {
        self.rects = vec![];
        self.graphic_rects = FnvHashMap::default();
        self.sugar_dimension_has_changed = false;
        self.current_row = 0;
        self.text_y = 0.0;
    }

    #[inline]
    fn prepare_render(&mut self) {
        // let start = std::time::Instant::now();
        if self.level.is_advanced() {
            self.state.compute_changes(self.layout);

            if self.state.latest_change == SugarTreeDiff::LayoutIsDifferent
                || self.state.current_has_empty_dimensions()
            {
                if let Some((width, height)) =
                    self.rich_text_brush.dimensions(&mut self.ctx, &self.state)
                {
                    let mut sugar_dimension_has_changed = false;
                    if height != self.layout.dimensions.height {
                        self.layout.dimensions.height = height;
                        println!("prepare_render: changed height... {}", height);
                        sugar_dimension_has_changed = true;
                    }

                    if width != self.layout.dimensions.width {
                        self.layout.dimensions.width = width;
                        self.layout.update_columns_per_font_width();
                        println!("prepare_render: changed width... {}", width);
                        sugar_dimension_has_changed = true;
                    }

                    if sugar_dimension_has_changed {
                        self.layout.update();
                        self.sugar_dimension_has_changed = sugar_dimension_has_changed;
                        println!("RECOMPUTE sugar_dimension_has_changed");
                    }
                }
            }
        }

        self.rich_text_brush.prepare(&mut self.ctx, &self.state);

        // let duration = start.elapsed();
        // println!(
        //     "Time elapsed in rich_text_brush.prepare() is: {:?} \n",
        //     duration
        // );
    }

    #[inline]
    pub fn render(&mut self) {
        self.prepare_render();

        match self.ctx.surface.get_current_texture() {
            Ok(frame) => {
                let mut encoder = self.ctx.device.create_command_encoder(
                    &wgpu::CommandEncoderDescriptor { label: None },
                );

                let view = &frame
                    .texture
                    .create_view(&wgpu::TextureViewDescriptor::default());

                encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                    timestamp_writes: None,
                    occlusion_query_set: None,
                    label: Some("sugarloaf::render -> Clear frame"),
                    color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                        view,
                        resolve_target: None,
                        ops: wgpu::Operations {
                            load: wgpu::LoadOp::Clear(self.background_color),
                            store: wgpu::StoreOp::Store,
                        },
                    })],
                    depth_stencil_attachment: None,
                });

                if let Some(bg_image) = &self.background_image {
                    self.layer_brush.prepare_ref(
                        &mut encoder,
                        &mut self.ctx,
                        &[bg_image],
                    );

                    self.layer_brush
                        .render_with_encoder(0, view, &mut encoder, None);
                }

                self.rect_brush
                    .render(&mut encoder, view, &self.rects, &mut self.ctx);

                let _ = self
                    .text_brush
                    .draw_queued(&mut self.ctx, &mut encoder, view);

                if self.level.is_advanced() {
                    self.rich_text_brush.render(
                        &mut self.ctx,
                        &self.state,
                        &mut encoder,
                        view,
                    );
                }

                if !self.graphic_rects.is_empty() {
                    for entry_render in
                        &self.graphic_rects.keys().cloned().collect::<Vec<_>>()
                    {
                        if let Some(entry) = self.graphic_rects.get(entry_render) {
                            if let Some(graphic_data) = self.graphics.get(&entry.id) {
                                let rows = entry.end_row - entry.start_row;
                                let height = (rows - 2.) * self.layout.dimensions.height;

                                let a = layer::types::Image::Raster {
                                    handle: graphic_data.handle.clone(),
                                    bounds: Rectangle {
                                        x: entry.pos_x,
                                        y: entry.pos_y,
                                        width: entry.width as f32,
                                        height,
                                    },
                                };

                                self.layer_brush.prepare_ref(
                                    &mut encoder,
                                    &mut self.ctx,
                                    &[&a],
                                );

                                self.layer_brush.render_with_encoder(
                                    0,
                                    view,
                                    &mut encoder,
                                    None,
                                );
                            }
                        }
                    }
                }

                self.layer_brush.end_frame();

                self.ctx.queue.submit(Some(encoder.finish()));
                frame.present();
            }
            Err(error) => {
                if error == wgpu::SurfaceError::OutOfMemory {
                    panic!("Swapchain error: {error}. Rendering cannot continue.")
                }
            }
        }

        self.reset_state();
    }
}
