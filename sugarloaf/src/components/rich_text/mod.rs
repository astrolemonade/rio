mod batch;
pub mod color;
mod compositor;
pub mod doc;
mod image_cache;
pub mod layout;
pub mod text;
pub mod util;

use crate::context::Context;
use bytemuck::{Pod, Zeroable};
use color::Color;
use compositor::{Compositor, DisplayList, Rect, TextureEvent, TextureId, Vertex};
use layout::*;
use layout::{Direction, LayoutContext, Paragraph, Selection};
use std::collections::HashMap;
use std::{borrow::Cow, mem};
use text::{Glyph, TextRunStyle, UnderlineStyle};
use wgpu::util::DeviceExt;
use wgpu::Texture;

const MAX_INSTANCES: usize = 1_000;

#[repr(C)]
#[derive(Debug, Clone, Copy, Zeroable, Pod)]
struct Uniforms {
    transform: [f32; 16],
    scale: f32,
    _padding: [f32; 3],
}

#[inline]
fn create_view_proj(width: f32, height: f32) -> [f32; 16] {
    let r = width;
    let l = 0.;
    let t = 0.;
    let b = height;
    let n = 0.1;
    let f = 1024.;
    [
        2. / (r - l),
        0.,
        0.,
        (l + r) / (l - r),
        //
        0.,
        2. / (t - b),
        0.,
        (t + b) / (b - t),
        //
        0.,
        0.,
        2. / (f - n),
        -(f + n) / (f - n),
        //
        0.,
        0.,
        0.,
        1.,
    ]
}

const INDICES: [u16; 6] = [0, 1, 2, 0, 2, 3];

impl Uniforms {
    fn new(transformation: [f32; 16], width: f32, height: f32, scale: f32) -> Uniforms {
        Self {
            transform: create_view_proj(width, height),
            scale,
            // Ref: https://github.com/iced-rs/iced/blob/bc62013b6cde52174bf4c4286939cf170bfa7760/wgpu/src/quad.rs#LL295C6-L296C68
            // Uniforms must be aligned to their largest member,
            // this uses a mat4x4<f32> which aligns to 16, so align to that
            _padding: [0.0; 3],
        }
    }
}

impl Default for Uniforms {
    fn default() -> Self {
        let identity_matrix: [f32; 16] = [
            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
            1.0,
        ];
        Self {
            transform: identity_matrix,
            scale: 1.0,
            _padding: [0.0; 3],
        }
    }
}

pub const BLEND: Option<wgpu::BlendState> = Some(wgpu::BlendState {
    color: wgpu::BlendComponent {
        src_factor: wgpu::BlendFactor::SrcAlpha,
        dst_factor: wgpu::BlendFactor::OneMinusSrcAlpha,
        operation: wgpu::BlendOperation::Add,
    },
    alpha: wgpu::BlendComponent {
        src_factor: wgpu::BlendFactor::One,
        dst_factor: wgpu::BlendFactor::OneMinusSrcAlpha,
        operation: wgpu::BlendOperation::Add,
    },
});

pub struct RichTextBrush {
    vertex_buf: wgpu::Buffer,
    instances: wgpu::Buffer,
    bind_group: wgpu::BindGroup,
    transform: wgpu::Buffer,
    pipeline: wgpu::RenderPipeline,
    textures: HashMap<TextureId, Texture>,
    index_buf: wgpu::Buffer,
    index_count: usize,
    scale: f32,
    comp: Compositor,
    dlist: DisplayList,
    document: doc::Document,
    rich_text_layout: Paragraph,
    rich_text_layout_context: LayoutContext,
    needs_update: bool,
    size_changed: bool,
    first_run: bool,
    selection: Selection,
    selection_rects: Vec<[f32; 4]>,
    selecting: bool,
    selection_changed: bool,
    align: Alignment,
}

impl RichTextBrush {
    pub fn new(context: &Context) -> Self {
        let device = &context.device;
        let dlist = DisplayList::new();

        let transform = device.create_buffer(&wgpu::BufferDescriptor {
            label: None,
            size: mem::size_of::<Uniforms>() as wgpu::BufferAddress,
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let vertex_buf = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Vertex Buffer"),
            contents: bytemuck::cast_slice(&dlist.vertices()),
            usage: wgpu::BufferUsages::VERTEX,
        });

        let index_buf = device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
            label: Some("Index Buffer"),
            contents: bytemuck::cast_slice(&dlist.indices()),
            usage: wgpu::BufferUsages::INDEX,
        });

        // Create pipeline layout
        let bind_group_layout =
            device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
                label: None,
                entries: &[wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::VERTEX,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: wgpu::BufferSize::new(
                            mem::size_of::<Uniforms>() as wgpu::BufferAddress,
                        ),
                    },
                    count: None,
                }],
            });
        let pipeline_layout =
            device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
                label: None,
                bind_group_layouts: &[&bind_group_layout],
                push_constant_ranges: &[],
            });

        // Create bind group
        let bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            layout: &bind_group_layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: wgpu::BindingResource::Buffer(wgpu::BufferBinding {
                    buffer: &transform,
                    offset: 0,
                    size: None,
                }),
            }],
            label: Some("rich_text::Pipeline uniforms"),
        });

        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: None,
            source: wgpu::ShaderSource::Wgsl(Cow::Borrowed(include_str!(
                "rich_text.wgsl"
            ))),
        });

        let vertex_buffers = [
            wgpu::VertexBufferLayout {
                array_stride: mem::size_of::<Vertex>() as u64,
                step_mode: wgpu::VertexStepMode::Vertex,
                attributes: &[wgpu::VertexAttribute {
                    format: wgpu::VertexFormat::Float32x2,
                    offset: 0,
                    shader_location: 0,
                }],
            },
            wgpu::VertexBufferLayout {
                array_stride: mem::size_of::<Rect>() as u64,
                step_mode: wgpu::VertexStepMode::Instance,
                attributes: &wgpu::vertex_attr_array!(
                    1 => Float32x2,
                    2 => Float32x4,
                    3 => Float32x2,
                ),
            },
        ];

        let pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: None,
            layout: Some(&pipeline_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: "vs_main",
                buffers: &vertex_buffers,
            },
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: "base_fs_shader",
                targets: &[Some(wgpu::ColorTargetState {
                    format: context.format,
                    blend: BLEND,
                    write_mask: wgpu::ColorWrites::ALL,
                })],
            }),
            primitive: wgpu::PrimitiveState {
                topology: wgpu::PrimitiveTopology::TriangleList,
                front_face: wgpu::FrontFace::Cw,
                ..Default::default()
            },
            depth_stencil: None,
            multisample: wgpu::MultisampleState::default(),
            multiview: None,
        });

        let instances = device.create_buffer(&wgpu::BufferDescriptor {
            label: Some("Instances Buffer"),
            size: mem::size_of::<Rect>() as u64 * MAX_INSTANCES as u64,
            usage: wgpu::BufferUsages::VERTEX | wgpu::BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let rich_text_layout = Paragraph::new();
        let document = build_document();
        let fonts = layout::FontLibrary::default();
        let rich_text_layout_context = LayoutContext::new(&fonts);

        // Done
        RichTextBrush {
            index_buf,
            index_count: 0,
            textures: HashMap::default(),
            comp: Compositor::new(2048),
            dlist,
            rich_text_layout,
            rich_text_layout_context,
            document,
            scale: context.scale,
            vertex_buf,
            bind_group,
            transform,
            pipeline,
            instances,
            needs_update: false,
            size_changed: false,
            first_run: true,
            selection: Selection::default(),
            selection_rects: Vec::new(),
            selecting: false,
            selection_changed: false,
            align: Alignment::Start,
        }
    }

    pub fn render(
        &mut self,
        ctx: &mut Context,
        _encoder: &mut wgpu::CommandEncoder,
        _view: &wgpu::TextureView,
    ) {
        // let cur_time = Instant::now();
        // let dt = cur_time.duration_since(last_time).as_secs_f32();
        // last_time = cur_time;
        // frame_count += 1;

        // cursor_time += dt;
        // if cursor_on {
        //     if cursor_time > 0.5 {
        //         cursor_time = 0.;
        //         cursor_on = false;
        //     }
        // } else {
        //     if cursor_time > 0.5 {
        //         cursor_time = 0.;
        //         cursor_on = true;
        //     }
        // }
        let margin = 12. * ctx.scale;

        if self.first_run {
            self.needs_update = true;
        }
        let w = ctx.size.width;
        let _h = ctx.size.height;
        if self.needs_update {
            // let mut lb = lcx.builder(Direction::LeftToRight, None, dpi);
            // doc.layout(&mut lb);
            // layout.clear();
            // lb.build_into(&mut layout);
            // if first_run {
            //     selection = Selection::from_point(&layout, 0., 0.);
            // }
            // first_run = false;
            // //layout.build_new_clusters();
            // needs_update = false;

            let mut lb = self.rich_text_layout_context.builder(
                Direction::LeftToRight,
                None,
                ctx.scale,
            );
            self.document.layout(&mut lb);
            self.rich_text_layout.clear();
            lb.build_into(&mut self.rich_text_layout);

            if self.first_run {
                self.selection = Selection::from_point(&self.rich_text_layout, 0., 0.);
            }

            self.first_run = false;
            self.needs_update = false;
            self.size_changed = true;
        }

        if self.size_changed {
            let lw = w as f32 - margin * 2.;
            self.rich_text_layout
                .break_lines()
                .break_remaining(lw, self.align);
            self.size_changed = false;
            self.selection_changed = true;
        }
        // println!("first_run {:?}", self.first_run);
        // first_run = false;
        //layout.build_new_clusters();
        // needs_update = false;
        // size_changed = true;
        // selection_changed = true;
        // }

        // if size_changed {
        //     let lw = w as f32 - margin * 2.;
        //     layout.break_lines().break_remaining(lw, align);
        //     size_changed = false;
        //     selection_changed = true;
        // }
        // if let Some(offs) = inserted {
        //     selection = Selection::from_offset(&layout, offs);
        // }
        // inserted = None;

        // if selection_changed {
        //     selection_rects.clear();
        //     selection.regions_with(&layout, |r| {
        //         selection_rects.push(r);
        //     });
        //     selection_changed = false;
        // }

        // let (fg, bg) = if dark_mode {
        //     (color::WHITE_SMOKE, Color::new(20, 20, 20, 255))
        // } else {
        //     (color::BLACK, color::WHITE)
        // };

        // Render
        self.comp.begin();
        draw_layout(
            &mut self.comp,
            &self.rich_text_layout,
            margin,
            margin,
            512.,
            color::WHITE_SMOKE,
        );

        // for r in &selection_rects {
        //     let rect = [r[0] + margin, r[1] + margin, r[2], r[3]];
        //     self.comp.draw_rect(rect, 600., Color::new(38, 79, 120, 255));
        // }

        // let (pt, ch, rtl) = selection.cursor(&layout);
        // if ch != 0. && cursor_on {
        //     let rect = [pt[0].round() + margin, pt[1].round() + margin, 1. * dpi, ch];
        //     comp.draw_rect(rect, 0.1, fg);
        // }
        self.dlist.clear();
        self.finish_composition();

        // unsafe {
        //     gl::Viewport(0, 0, w as i32, h as i32);
        //     let cc = bg.to_rgba_f32();
        //     gl::ClearColor(cc[0], cc[1], cc[2], 1.0);
        //     gl::ClearDepth(1.0);
        //     gl::Clear(gl::COLOR_BUFFER_BIT | gl::DEPTH_BUFFER_BIT);
        //     gl::Enable(gl::DEPTH_TEST);
        //     gl::DepthFunc(gl::LESS);
        //     gl::DepthMask(1);
        //     device.render(w, h, &dlist);
        //     gl::Flush();
        // }
        // windowed_context.swap_buffers().unwrap();

        println!("{:?}", self.dlist);

        // let mut i = 0;
        // let total = self.instances;

        // while i < total {
        //     let end = (i + MAX_INSTANCES).min(total);
        //     let amount = end - i;

        //     let instance_bytes = bytemuck::cast_slice(&instances[i..end]);

        //     queue.write_buffer(&self.instances, 0, instance_bytes);

        //     {
        //         let mut rpass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
        //             label: None,
        //             timestamp_writes: None,
        //             occlusion_query_set: None,
        //             color_attachments: &[Some(wgpu::RenderPassColorAttachment {
        //                 view,
        //                 resolve_target: None,
        //                 ops: wgpu::Operations {
        //                     load: wgpu::LoadOp::Load,
        //                     store: wgpu::StoreOp::Store,
        //                 },
        //             })],
        //             depth_stencil_attachment: None,
        //         });
        //         // rpass.push_debug_group("Prepare data for draw.");
        //         rpass.set_pipeline(&self.pipeline);
        //         rpass.set_bind_group(0, &self.bind_group, &[]);
        //         rpass.set_index_buffer(
        //             self.index_buf.slice(..),
        //             wgpu::IndexFormat::Uint16,
        //         );
        //         rpass.set_vertex_buffer(0, self.vertex_buf.slice(..));
        //         rpass.set_vertex_buffer(1, self.instances.slice(..));
        //         // rpass.pop_debug_group();
        //         // rpass.insert_debug_marker("Draw!");
        //         rpass.draw_indexed(0..self.index_count as u32, 0, 0..amount as u32);
        //         drop(rpass);
        //     }

        //     i += MAX_INSTANCES;
        // }
    }

    fn finish_composition(&mut self) {
        self.comp.finish(&mut self.dlist, |event| {
            match event {
                TextureEvent::CreateTexture {
                    id,
                    format,
                    width,
                    height,
                    data,
                } => {
                    println!("CreateTexture");
                    // let tex = Texture::new(*width as u32, *height as u32);
                    // if let Some(data) = data {
                    //     tex.update(data);
                    // }
                    // self.textures.insert(*id, tex);
                }
                TextureEvent::UpdateTexture {
                    id,
                    x,
                    y,
                    width,
                    height,
                    data,
                } => {
                    println!("UpdateTexture");
                    // if let Some(tex) = self.textures.get(&id) {
                    //     tex.update(data);
                    // }
                }
                TextureEvent::DestroyTexture(id) => {
                    self.textures.remove(&id);
                }
            }
        });
    }
}

fn draw_layout(
    comp: &mut compositor::Compositor,
    layout: &Paragraph,
    x: f32,
    y: f32,
    depth: f32,
    color: Color,
) {
    let mut glyphs = Vec::new();
    for line in layout.lines() {
        let mut px = x + line.offset();
        for run in line.runs() {
            let font = run.font();
            let py = line.baseline() + y;
            let run_x = px;
            glyphs.clear();
            for cluster in run.visual_clusters() {
                for glyph in cluster.glyphs() {
                    let x = px + glyph.x;
                    let y = py - glyph.y;
                    px += glyph.advance;
                    glyphs.push(Glyph { id: glyph.id, x, y });
                }
            }
            let style = TextRunStyle {
                font: font.as_ref(),
                font_coords: run.normalized_coords(),
                font_size: run.font_size(),
                color,
                baseline: py,
                advance: px - run_x,
                underline: if run.underline() {
                    Some(UnderlineStyle {
                        offset: run.underline_offset(),
                        size: run.underline_size(),
                        color,
                    })
                } else {
                    None
                },
            };
            comp.draw_glyphs(
                Rect::new(run_x, py, style.advance, 1.),
                depth,
                &style,
                glyphs.iter(),
            );
        }
    }
}

fn build_document() -> doc::Document {
    use layout::*;
    let mut db = doc::Document::builder();

    use SpanStyle as S;

    let underline = &[
        S::Underline(true),
        S::UnderlineOffset(Some(-1.)),
        S::UnderlineSize(Some(1.)),
    ];

    db.enter_span(&[
        S::family_list("Victor Mono, times, georgia, serif"),
        S::Size(18.),
        S::features(&[("dlig", 1).into(), ("hlig", 1).into()][..]),
    ]);
    db.enter_span(&[S::LineSpacing(1.2)]);
    db.enter_span(&[S::family_list("fira code, serif"), S::Size(22.)]);
    db.add_text("According to Wikipedia, the foremost expert on any subject,\n\n");
    db.leave_span();
    db.enter_span(&[S::Weight(Weight::BOLD)]);
    db.add_text("Typography");
    db.leave_span();
    db.add_text(" is the ");
    db.enter_span(&[S::Style(Style::Italic)]);
    db.add_text("art and technique");
    db.leave_span();
    db.add_text(" of arranging type to make ");
    db.enter_span(underline);
    db.add_text("written language");
    db.leave_span();
    db.add_text(" ");
    db.enter_span(underline);
    db.add_text("legible");
    db.leave_span();
    db.add_text(", ");
    db.enter_span(underline);
    db.add_text("readable");
    db.leave_span();
    db.add_text(" and ");
    db.enter_span(underline);
    db.add_text("appealing");
    db.leave_span();
    db.add_text(WIKI_TYPOGRAPHY_REST);
    db.enter_span(&[S::LineSpacing(1.)]);
    db.add_text(
        " Furthermore, العربية نص جميل. द क्विक ब्राउन फ़ॉक्स jumps over the lazy 🐕.\n\n",
    );
    db.leave_span();
    db.enter_span(&[S::family_list("verdana, sans-serif"), S::LineSpacing(1.)]);
    db.add_text("A true ");
    db.enter_span(&[S::Size(48.)]);
    db.add_text("🕵🏽‍♀️");
    db.leave_span();
    db.add_text(" will spot the tricky selection in this BiDi text: ");
    db.enter_span(&[S::Size(22.)]);
    db.add_text("ניפגש ב09:35 בחוף הים");
    db.leave_span();
    db.build()
}

const WIKI_TYPOGRAPHY_REST: &'static str = " when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing (leading), and letter-spacing (tracking), and adjusting the space between pairs of letters (kerning). The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process.";