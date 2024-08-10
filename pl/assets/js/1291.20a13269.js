"use strict";(self.webpackChunkrio_docs=self.webpackChunkrio_docs||[]).push([[1291],{1460:(e,t,a)=>{a.d(t,{Z:()=>j});var n=a(7294),s=a(512),r=a(6040),i=a(7524),l=a(3692),o=a(5999),c=a(6550),d=a(8596);function m(e){const{pathname:t}=(0,c.TH)();return(0,n.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,d.Mg)(e.permalink,t))}(e,t)))),[e,t])}const u={sidebar:"sidebar_re4s",sidebarItemTitle:"sidebarItemTitle_pO2u",sidebarItemList:"sidebarItemList_Yudw",sidebarItem:"sidebarItem__DBe",sidebarItemLink:"sidebarItemLink_mo7H",sidebarItemLinkActive:"sidebarItemLinkActive_I1ZP"};var g=a(5893);function h(e){let{sidebar:t}=e;const a=m(t.items);return(0,g.jsx)("aside",{className:"col col--3",children:(0,g.jsxs)("nav",{className:(0,s.Z)(u.sidebar,"thin-scrollbar"),"aria-label":(0,o.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,g.jsx)("div",{className:(0,s.Z)(u.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,g.jsx)("ul",{className:(0,s.Z)(u.sidebarItemList,"clean-list"),children:a.map((e=>(0,g.jsx)("li",{className:u.sidebarItem,children:(0,g.jsx)(l.Z,{isNavLink:!0,to:e.permalink,className:u.sidebarItemLink,activeClassName:u.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var f=a(3102);function p(e){let{sidebar:t}=e;const a=m(t.items);return(0,g.jsx)("ul",{className:"menu__list",children:a.map((e=>(0,g.jsx)("li",{className:"menu__list-item",children:(0,g.jsx)(l.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function x(e){return(0,g.jsx)(f.Zo,{component:p,props:e})}function b(e){let{sidebar:t}=e;const a=(0,i.i)();return t?.items.length?"mobile"===a?(0,g.jsx)(x,{sidebar:t}):(0,g.jsx)(h,{sidebar:t}):null}function j(e){const{sidebar:t,toc:a,children:n,...i}=e,l=t&&t.items.length>0;return(0,g.jsx)(r.Z,{...i,children:(0,g.jsx)("div",{className:"container margin-vert--lg",children:(0,g.jsxs)("div",{className:"row",children:[(0,g.jsx)(b,{sidebar:t}),(0,g.jsx)("main",{className:(0,s.Z)("col",{"col--7":l,"col--9 col--offset-1":!l}),children:n}),a&&(0,g.jsx)("div",{className:"col col--2",children:a})]})})})}},9188:(e,t,a)=>{a.d(t,{Z:()=>R});var n=a(7294),s=a(512),r=a(9460),i=a(5893);function l(e){let{children:t,className:a}=e;return(0,i.jsx)("article",{className:a,children:t})}var o=a(3692);const c={title:"title_f1Hy"};function d(e){let{className:t}=e;const{metadata:a,isBlogPostPage:n}=(0,r.C)(),{permalink:l,title:d}=a,m=n?"h1":"h2";return(0,i.jsx)(m,{className:(0,s.Z)(c.title,t),children:n?d:(0,i.jsx)(o.Z,{to:l,children:d})})}var m=a(5999),u=a(2263);const g=["zero","one","two","few","many","other"];function h(e){return g.filter((t=>e.includes(t)))}const f={locale:"en",pluralForms:h(["one","other"]),select:e=>1===e?"one":"other"};function p(){const{i18n:{currentLocale:e}}=(0,u.Z)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:h(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),f}}),[e])}function x(){const e=p();return{selectMessage:(t,a)=>function(e,t,a){const n=e.split("|");if(1===n.length)return n[0];n.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const s=a.select(t),r=a.pluralForms.indexOf(s);return n[Math.min(r,n.length-1)]}(a,t,e)}}var b=a(9788);const j={container:"container_mt6G"};function v(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=x();return t=>{const a=Math.ceil(t);return e(a,(0,m.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return(0,i.jsx)(i.Fragment,{children:a(t)})}function N(e){let{date:t,formattedDate:a}=e;return(0,i.jsx)("time",{dateTime:t,children:a})}function P(){return(0,i.jsx)(i.Fragment,{children:" \xb7 "})}function k(e){let{className:t}=e;const{metadata:a}=(0,r.C)(),{date:n,readingTime:l}=a,o=(0,b.P)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,i.jsxs)("div",{className:(0,s.Z)(j.container,"margin-vert--md",t),children:[(0,i.jsx)(N,{date:n,formattedDate:(c=n,o.format(new Date(c)))}),void 0!==l&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(P,{}),(0,i.jsx)(v,{readingTime:l})]})]});var c}function Z(e){return e.href?(0,i.jsx)(o.Z,{...e}):(0,i.jsx)(i.Fragment,{children:e.children})}function _(e){let{author:t,className:a}=e;const{name:n,title:r,url:l,imageURL:o,email:c}=t,d=l||c&&`mailto:${c}`||void 0;return(0,i.jsxs)("div",{className:(0,s.Z)("avatar margin-bottom--sm",a),children:[o&&(0,i.jsx)(Z,{href:d,className:"avatar__photo-link",children:(0,i.jsx)("img",{className:"avatar__photo",src:o,alt:n})}),n&&(0,i.jsxs)("div",{className:"avatar__intro",children:[(0,i.jsx)("div",{className:"avatar__name",children:(0,i.jsx)(Z,{href:d,children:(0,i.jsx)("span",{children:n})})}),r&&(0,i.jsx)("small",{className:"avatar__subtitle",children:r})]})]})}const w={authorCol:"authorCol_Hf19",imageOnlyAuthorRow:"imageOnlyAuthorRow_pa_O",imageOnlyAuthorCol:"imageOnlyAuthorCol_G86a"};function y(e){let{className:t}=e;const{metadata:{authors:a},assets:n}=(0,r.C)();if(0===a.length)return null;const l=a.every((e=>{let{name:t}=e;return!t}));return(0,i.jsx)("div",{className:(0,s.Z)("margin-top--md margin-bottom--sm",l?w.imageOnlyAuthorRow:"row",t),children:a.map(((e,t)=>(0,i.jsx)("div",{className:(0,s.Z)(!l&&"col col--6",l?w.imageOnlyAuthorCol:w.authorCol),children:(0,i.jsx)(_,{author:{...e,imageURL:n.authorsImageUrls[t]??e.imageURL}})},t)))})}function C(){return(0,i.jsxs)("header",{children:[(0,i.jsx)(d,{}),(0,i.jsx)(k,{}),(0,i.jsx)(y,{})]})}var I=a(8780),M=a(7395);function B(e){let{children:t,className:a}=e;const{isBlogPostPage:n}=(0,r.C)();return(0,i.jsx)("div",{id:n?I.blogPostContainerID:void 0,className:(0,s.Z)("markdown",a),children:(0,i.jsx)(M.Z,{children:t})})}var T=a(5281),U=a(7265),L=a(6233);function A(){return(0,i.jsx)("b",{children:(0,i.jsx)(m.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function O(e){const{blogPostTitle:t,...a}=e;return(0,i.jsx)(o.Z,{"aria-label":(0,m.I)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...a,children:(0,i.jsx)(A,{})})}function $(){const{metadata:e,isBlogPostPage:t}=(0,r.C)(),{tags:a,title:n,editUrl:l,hasTruncateMarker:o,lastUpdatedBy:c,lastUpdatedAt:d}=e,m=!t&&o,u=a.length>0;if(!(u||m||l))return null;if(t){const e=!!(l||d||c);return(0,i.jsxs)("footer",{className:"docusaurus-mt-lg",children:[u&&(0,i.jsx)("div",{className:(0,s.Z)("row","margin-top--sm",T.k.blog.blogFooterEditMetaRow),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(L.Z,{tags:a})})}),e&&(0,i.jsx)(U.Z,{className:(0,s.Z)("margin-top--sm",T.k.blog.blogFooterEditMetaRow),editUrl:l,lastUpdatedAt:d,lastUpdatedBy:c})]})}return(0,i.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[u&&(0,i.jsx)("div",{className:(0,s.Z)("col",{"col--9":m}),children:(0,i.jsx)(L.Z,{tags:a})}),m&&(0,i.jsx)("div",{className:(0,s.Z)("col text--right",{"col--3":u}),children:(0,i.jsx)(O,{blogPostTitle:n,to:e.permalink})})]})}function R(e){let{children:t,className:a}=e;const n=function(){const{isBlogPostPage:e}=(0,r.C)();return e?void 0:"margin-bottom--xl"}();return(0,i.jsxs)(l,{className:(0,s.Z)(n,a),children:[(0,i.jsx)(C,{}),(0,i.jsx)(B,{children:t}),(0,i.jsx)($,{})]})}},9460:(e,t,a)=>{a.d(t,{C:()=>o,n:()=>l});var n=a(7294),s=a(902),r=a(5893);const i=n.createContext(null);function l(e){let{children:t,content:a,isBlogPostPage:s=!1}=e;const l=function(e){let{content:t,isBlogPostPage:a}=e;return(0,n.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a})),[t,a])}({content:a,isBlogPostPage:s});return(0,r.jsx)(i.Provider,{value:l,children:t})}function o(){const e=(0,n.useContext)(i);if(null===e)throw new s.i6("BlogPostProvider");return e}},136:(e,t,a)=>{a.d(t,{C:()=>d,i:()=>m});var n=a(4996),s=a(2263),r=a(5102);var i=a(9460);const l=e=>new Date(e).toISOString();function o(e){const t=e.map(u);return{author:1===t.length?t[0]:t}}function c(e,t,a){return e?{image:g({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${a}`})}:{}}function d(e){const{siteConfig:t}=(0,s.Z)(),{withBaseUrl:a}=(0,n.Cg)(),{metadata:{blogDescription:r,blogTitle:i,permalink:d}}=e,m=`${t.url}${d}`;return{"@context":"https://schema.org","@type":"Blog","@id":m,mainEntityOfPage:m,headline:i,description:r,blogPost:e.items.map((e=>function(e,t,a){const{assets:n,frontMatter:s,metadata:r}=e,{date:i,title:d,description:m,lastUpdatedAt:u}=r,g=n.image??s.image,h=s.keywords??[],f=`${t.url}${r.permalink}`,p=u?l(u):void 0;return{"@type":"BlogPosting","@id":f,mainEntityOfPage:f,url:f,headline:d,name:d,description:m,datePublished:i,...p?{dateModified:p}:{},...o(r.authors),...c(g,a,d),...h?{keywords:h}:{}}}(e.content,t,a)))}}function m(){const e=function(){const e=(0,r.Z)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:a}=(0,i.C)(),{siteConfig:d}=(0,s.Z)(),{withBaseUrl:m}=(0,n.Cg)(),{date:u,title:g,description:h,frontMatter:f,lastUpdatedAt:p}=a,x=t.image??f.image,b=f.keywords??[],j=p?l(p):void 0,v=`${d.url}${a.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":v,mainEntityOfPage:v,url:v,headline:g,name:g,description:h,datePublished:u,...j?{dateModified:j}:{},...o(a.authors),...c(x,m,g),...b?{keywords:b}:{},isPartOf:{"@type":"Blog","@id":`${d.url}${e.blogBasePath}`,name:e.blogTitle}}}function u(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function g(e){let{imageUrl:t,caption:a}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:a}}}}]);