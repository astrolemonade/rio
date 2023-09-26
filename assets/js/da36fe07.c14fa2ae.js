"use strict";(self.webpackChunkrio_docs=self.webpackChunkrio_docs||[]).push([[2342],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(n),m=o,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||i;return n?a.createElement(f,r(r({ref:t},u),{},{components:n})):a.createElement(f,r({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[d]="string"==typeof e?e:o,r[1]=l;for(var s=2;s<i;s++)r[s]=n[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3890:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=n(7462),o=(n(7294),n(3905));const i={layout:"post",title:"New font configuration API and native tabs",date:"2023-08-29 17:53",description:"Rio terminal release: New font configuration API, native tabs, kitty keyboard protocol and other stuff.",categories:"windows macos linux webassembly"},r=void 0,l={permalink:"/rio/blog/2023/08/29/release-0.0.17",editUrl:"https://github.com/raphamorim/rio/tree/main/docs/blog/2023-08-29-release-0.0.17.md",source:"@site/blog/2023-08-29-release-0.0.17.md",title:"New font configuration API and native tabs",description:"Rio terminal release: New font configuration API, native tabs, kitty keyboard protocol and other stuff.",date:"2023-08-29T17:53:00.000Z",formattedDate:"August 29, 2023",tags:[],readingTime:1.655,hasTruncateMarker:!1,authors:[],frontMatter:{layout:"post",title:"New font configuration API and native tabs",date:"2023-08-29 17:53",description:"Rio terminal release: New font configuration API, native tabs, kitty keyboard protocol and other stuff.",categories:"windows macos linux webassembly"},prevItem:{title:"Settings UI, Welcome UI, Adaptive theme, crates.io and more",permalink:"/rio/blog/2023/09/19/release-0.0.19"},nextItem:{title:"Support to tabs, custom key bindings, performance improvements and other updates",permalink:"/rio/blog/2023/08/02/release-0.0.15"}},c={authorsImageUrls:[]},s=[{value:"Breaking change: New font API",id:"breaking-change-new-font-api",level:2},{value:"Native Tabs (macOs only)",id:"native-tabs-macos-only",level:2},{value:"Changelog of v0.0.17 along with v0.0.16",id:"changelog-of-v0017-along-with-v0016",level:2}],u={toc:s},d="wrapper";function p(e){let{components:t,...i}=e;return(0,o.kt)(d,(0,a.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This post also includes changes from v0.0.16 and v0.0.17."),(0,o.kt)("h1",{id:"highlights"},"Highlights"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"New font configuration API."),(0,o.kt)("li",{parentName:"ul"},"Native Tabs for MacOS.")),(0,o.kt)("h2",{id:"breaking-change-new-font-api"},"Breaking change: New font API"),(0,o.kt)("p",null,"If you don't use Rio default font configuration you will be affected by this change."),(0,o.kt)("p",null,'A new API has been introduced to select fonts, now you can configure even different font families for "regular", "bold", "italic" and "bold-italic".'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'[fonts]\nsize = 18\n\n[fonts.regular]\nfamily = "cascadiamono"\nstyle = "normal"\nweight = 400\n\n[fonts.bold]\nfamily = "cascadiamono"\nstyle = "normal"\nweight = 800\n\n[fonts.italic]\nfamily = "cascadiamono"\nstyle = "italic"\nweight = 400\n\n[fonts.bold-italic]\nfamily = "cascadiamono"\nstyle = "italic"\nweight = 800\n')),(0,o.kt)("h2",{id:"native-tabs-macos-only"},"Native Tabs (macOs only)"),(0,o.kt)("p",null,"Native tabs have arrived for MacOS users."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"native tab example",src:n(2103).Z,width:"748",height:"579"})),(0,o.kt)("p",null,'To configure it you will need to update the configuration file and set navigation mode as "NativeTab":'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-toml"},'[navigation]\nmode = "NativeTab"\n')),(0,o.kt)("h2",{id:"changelog-of-v0017-along-with-v0016"},"Changelog of v0.0.17 along with v0.0.16"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'Configuration "font" does not work anymore, a new configuration API of font selection has been introduced.'),(0,o.kt)("li",{parentName:"ul"},'Action "TabSwitchNext" and "TabSwitchPrev" has been renamed to "SelectNextTab" and "SelectPrevTab".'),(0,o.kt)("li",{parentName:"ul"},'Support to "NativeTab" (MacOS only).'),(0,o.kt)("li",{parentName:"ul"},'Support for kitty\'s keyboard protocol ("CSI u"). Ref: ',(0,o.kt)("a",{parentName:"li",href:"https://sw.kovidgoyal.net/kitty/keyboard-protocol/"},"https://sw.kovidgoyal.net/kitty/keyboard-protocol/")),(0,o.kt)("li",{parentName:"ul"},'Added new actions for tab selection: "SelectTab1", "SelectTab2", "SelectTab3", "SelectTab4", "SelectTab5", "SelectTab6", "SelectTab7", "SelectTab8", "SelectTab9", "SelectLastTab".'),(0,o.kt)("li",{parentName:"ul"},"Support lowercased action and fix overwrite for actions in custom key bindings."),(0,o.kt)("li",{parentName:"ul"},'Added action "Minimize" for minimize Rio terminal window.'),(0,o.kt)("li",{parentName:"ul"},'Added action "ClearHistory" for clear terminal saved history.'),(0,o.kt)("li",{parentName:"ul"},'Added action "ReceiveChar" for custom key bindings.'),(0,o.kt)("li",{parentName:"ul"},"New default key bindings for Linux and Windows so that conflicts with readline key bindings are removed."),(0,o.kt)("li",{parentName:"ul"},"Winit Version 0.29.1-beta."),(0,o.kt)("li",{parentName:"ul"},"Allow paste with the middle mouse of the button (fixes ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/raphamorim/rio/issues/123"},"https://github.com/raphamorim/rio/issues/123"),")."),(0,o.kt)("li",{parentName:"ul"},"Support startup notify protocol to raise initial window on Wayland/X11."),(0,o.kt)("li",{parentName:"ul"},"Fix Double-tap by touchpad on the titlebar doesn't maximize/unmaximize the window in GNOME 44, Wayland."),(0,o.kt)("li",{parentName:"ul"},"Fix tab/breadcrumb bug introduced in 0.0.15"),(0,o.kt)("li",{parentName:"ul"},'Introduce new configuration property: "navigation.macos-hide-window-button".')))}p.isMDXComponent=!0},2103:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/demo-native-tabs-663d9555fa1db6e9400021fd83a8f2a9.png"}}]);