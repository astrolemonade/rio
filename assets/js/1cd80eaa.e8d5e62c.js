"use strict";(self.webpackChunkrio_docs=self.webpackChunkrio_docs||[]).push([[8885],{3905:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>m});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),p=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},u=function(e){var r=p(e.components);return n.createElement(c.Provider,{value:r},e.children)},l="mdxType",f={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),l=p(t),d=o,m=l["".concat(c,".").concat(d)]||l[d]||f[d]||a;return t?n.createElement(m,s(s({ref:r},u),{},{components:t})):n.createElement(m,s({ref:r},u))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=d;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i[l]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=t[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},5944:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>s,default:()=>f,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var n=t(7462),o=(t(7294),t(3905));const a={title:"Spawn or Fork",language:"en"},s=void 0,i={unversionedId:"features/spawn-or-fork",id:"features/spawn-or-fork",title:"Spawn or Fork",description:"In POSIX-based systems, Rio spawn processes instead of fork processes due to some compability issues between platforms.",source:"@site/docs/features/spawn-or-fork.md",sourceDirName:"features",slug:"/features/spawn-or-fork",permalink:"/rio/docs/features/spawn-or-fork",draft:!1,editUrl:"https://github.com/raphamorim/rio/tree/main/docs/docs/features/spawn-or-fork.md",tags:[],version:"current",frontMatter:{title:"Spawn or Fork",language:"en"},sidebar:"tutorialSidebar",previous:{title:"Rio is Fast",permalink:"/rio/docs/features/rio-is-fast"},next:{title:"Frequently Asked Questions",permalink:"/rio/docs/frequently-asked-questions/"}},c={},p=[],u={toc:p},l="wrapper";function f(e){let{components:r,...t}=e;return(0,o.kt)(l,(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In POSIX-based systems, Rio spawn processes instead of fork processes due to some compability issues between platforms."),(0,o.kt)("p",null,"However you can also switch from spawn to fork, forking a process is faster than spawning a process."),(0,o.kt)("p",null,"See how to configure it in the advanced section ",(0,o.kt)("a",{parentName:"p",href:"/rio/docs/documentation"},"here"),"."))}f.isMDXComponent=!0}}]);