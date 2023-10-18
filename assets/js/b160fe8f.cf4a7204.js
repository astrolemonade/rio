"use strict";(self.webpackChunkrio_docs=self.webpackChunkrio_docs||[]).push([[9152],{3905:(e,t,o)=>{o.d(t,{Zo:()=>u,kt:()=>d});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var c=r.createContext({}),s=function(e){var t=r.useContext(c),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(o),m=n,d=p["".concat(c,".").concat(m)]||p[m]||f[m]||a;return o?r.createElement(d,i(i({ref:t},u),{},{components:o})):r.createElement(d,i({ref:t},u))}));function d(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:n,i[1]=l;for(var s=2;s<a;s++)i[s]=o[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}m.displayName="MDXCreateElement"},2863:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=o(7462),n=(o(7294),o(3905));const a={title:"Color automation for navigation",language:"en"},i=void 0,l={unversionedId:"features/color-automation-for-navigation",id:"features/color-automation-for-navigation",title:"Color automation for navigation",description:"Rio allows to specify color overwrites for tabs based on program context.",source:"@site/docs/features/color-automation-for-navigation.md",sourceDirName:"features",slug:"/features/color-automation-for-navigation",permalink:"/rio/docs/features/color-automation-for-navigation",draft:!1,editUrl:"https://github.com/raphamorim/rio/tree/main/docs/docs/features/color-automation-for-navigation.md",tags:[],version:"current",frontMatter:{title:"Color automation for navigation",language:"en"},sidebar:"tutorialSidebar",previous:{title:"Adaptive theme",permalink:"/rio/docs/features/adaptive-theme"},next:{title:"Kitty keyboard protocol",permalink:"/rio/docs/features/kitty-keyboard-protocol"}},c={},s=[],u={toc:s},p="wrapper";function f(e){let{components:t,...o}=e;return(0,n.kt)(p,(0,r.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Rio allows to specify color overwrites for tabs based on program context."),(0,n.kt)("p",null,"The example below sets ",(0,n.kt)("span",{class:"keyword"},"#FFFF00")," as color background whenever ",(0,n.kt)("span",{class:"keyword"},"nvim")," is running."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"example navigation with color automation",src:"/rio/assets/features/demo-colorized-navigation.png",width:"48%"}),(0,n.kt)("img",{alt:"second example navigation with color automation",src:"/rio/assets/features/demo-colorized-navigation-2.png",width:"48%"})),(0,n.kt)("p",null,"The configuration would be like:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-toml"},'[navigation]\ncolor-automation = [\n    { program = "nvim", color = "#FFFF00" }\n]\n')))}f.isMDXComponent=!0}}]);