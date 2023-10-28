"use strict";(self.webpackChunkrio_docs=self.webpackChunkrio_docs||[]).push([[1382],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>y});var o=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,a=function(e,t){if(null==e)return{};var r,o,a={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=o.createContext({}),p=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(r),m=a,y=u["".concat(s,".").concat(m)]||u[m]||d[m]||n;return r?o.createElement(y,i(i({ref:t},c),{},{components:r})):o.createElement(y,i({ref:t},c))}));function y(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,i=new Array(n);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<n;p++)i[p]=r[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7282:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>n,metadata:()=>l,toc:()=>p});var o=r(7462),a=(r(7294),r(3905));const n={title:"Kitty keyboard protocol",language:"en"},i=void 0,l={unversionedId:"features/kitty-keyboard-protocol",id:"features/kitty-keyboard-protocol",title:"Kitty keyboard protocol",description:"Rio terminal implements Kitty keyboard protocol. It is disabled by default, for activate you need to set the configuration as true.",source:"@site/docs/features/kitty-keyboard-protocol.md",sourceDirName:"features",slug:"/features/kitty-keyboard-protocol",permalink:"/rio/docs/features/kitty-keyboard-protocol",draft:!1,editUrl:"https://github.com/raphamorim/rio/tree/main/docs/docs/features/kitty-keyboard-protocol.md",tags:[],version:"current",frontMatter:{title:"Kitty keyboard protocol",language:"en"},sidebar:"tutorialSidebar",previous:{title:"hyperlinks",permalink:"/rio/docs/features/hyperlinks"},next:{title:"Multi windows",permalink:"/rio/docs/features/multi-windows"}},s={},p=[{value:"How it works?",id:"how-it-works",level:3}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Rio terminal implements Kitty keyboard protocol. It is disabled by default, for activate you need to set the configuration as true."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},"use-kitty-keyboard-protocol = true\n")),(0,a.kt)("h3",{id:"how-it-works"},"How it works?"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Note: All the information of this page was retired from: ",(0,a.kt)("a",{parentName:"p",href:"https://sw.kovidgoyal.net/kitty/keyboard-protocol/"},"sw.kovidgoyal.net/kitty/keyboard-protocol"))),(0,a.kt)("p",null,"There are various problems with the current state of keyboard handling in terminals. They include:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"No way to use modifiers other than ctrl and alt")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"No way to reliably use multiple modifier keys, other than, shift+alt and ctrl+alt.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Many of the existing escape codes used to encode these events are ambiguous with different key presses mapping to the same escape code.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"No way to handle different types of keyboard events, such as press, release or repeat")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"No reliable way to distinguish single Esc key presses from the start of a escape sequence. Currently, client programs use fragile timing related hacks for this, leading to bugs, for example: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/neovim/neovim/issues/2035"},"neovim #2035"),"."))),(0,a.kt)("p",null,"To solve these issues and others, kitty has created a new keyboard protocol, that is backward compatible but allows applications to opt-in to support more advanced usages."),(0,a.kt)("p",null,"You can see this protocol with all enhancements in action by running:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"kitten show_key -m kitty\n")),(0,a.kt)("p",null,"You can also run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"kitty +kitten show_key -m kitty\n")),(0,a.kt)("p",null,"Below an example of Rio terminal with Kitty keyboard protocol by the following instructions (MacOS keyboard example)."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Press left shift, release shift"),(0,a.kt)("li",{parentName:"ul"},"Press right shift, release shift"),(0,a.kt)("li",{parentName:"ul"},"Press left command")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Demo kitty keyboard protocol",src:r(9155).Z,width:"1424",height:"1024"})))}d.isMDXComponent=!0},9155:(e,t,r)=>{r.d(t,{Z:()=>o});const o=r.p+"assets/images/demo-kitty-keyboard-protocol-6e329aca6a1cb396ee848b19cf805b00.png"}}]);