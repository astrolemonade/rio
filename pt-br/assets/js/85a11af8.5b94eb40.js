"use strict";(self.webpackChunkrio_docs=self.webpackChunkrio_docs||[]).push([[8322],{3622:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>a,frontMatter:()=>i,metadata:()=>l,toc:()=>h});var o=t(5893),r=t(1151);const i={title:"Themes",language:"en"},s=void 0,l={id:"themes",title:"Themes",description:"The configuration property theme is used for specifying the theme. Rio will look in the themes folder for the theme.",source:"@site/docs/themes.md",sourceDirName:".",slug:"/themes",permalink:"/rio/pt-br/docs/next/themes",draft:!1,unlisted:!1,editUrl:"https://github.com/raphamorim/rio/tree/main/docs/docs/themes.md",tags:[],version:"current",frontMatter:{title:"Themes",language:"en"},sidebar:"tutorialSidebar",previous:{title:"Plugins",permalink:"/rio/pt-br/docs/next/plugins"}},c={},h=[{value:"Building your own theme",id:"building-your-own-theme",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["The configuration property ",(0,o.jsx)(n.code,{children:"theme"})," is used for specifying the theme. Rio will look in the ",(0,o.jsx)(n.code,{children:"themes"})," folder for the theme."]}),"\n",(0,o.jsxs)(n.p,{children:["You can see common paths for the ",(0,o.jsx)(n.code,{children:"themes"})," directory here:"]}),"\n",(0,o.jsx)(n.p,{children:'Note: Remember to replace "YOUR_USERNAME" with your actual user name.'}),"\n",(0,o.jsxs)(n.table,{children:[(0,o.jsx)(n.thead,{children:(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.th,{children:"Platform"}),(0,o.jsx)(n.th,{children:"Path"})]})}),(0,o.jsxs)(n.tbody,{children:[(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"Mac"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"/Users/YOUR_USERNAME/.config/rio/themes"})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"Linux"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"/home/YOUR_USERNAME/.config/rio/themes"})})]}),(0,o.jsxs)(n.tr,{children:[(0,o.jsx)(n.td,{children:"Windows"}),(0,o.jsx)(n.td,{children:(0,o.jsx)(n.code,{children:"C:\\Users\\YOUR_USERNAME\\AppData\\Local\\rio\\themes"})})]})]})]}),"\n",(0,o.jsxs)(n.p,{children:["In the example below, we will setup the Dracula theme for Rio. The theme can be downloaded from ",(0,o.jsx)(n.a,{href:"https://github.com/dracula/rio-terminal",children:"github.com/dracula/rio-terminal"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["After downloading the ",(0,o.jsx)(n.code,{children:"dracula.toml"})," file, move it inside the folder ",(0,o.jsx)(n.code,{children:"themes"})," in the configuration folder."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'#  ~/.config/rio/config.toml\ntheme = "dracula"\n'})}),"\n",(0,o.jsx)(n.p,{children:"It should look like this:"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Dracula theme example",src:t(2576).Z+"",width:"1824",height:"1424"})}),"\n",(0,o.jsxs)(n.p,{children:["Another option would be to install the ",(0,o.jsx)(n.a,{href:"https://github.com/raphamorim/lucario/#rio-terminal",children:"Lucario color scheme for Rio terminal"}),", by moving the downloaded file to ",(0,o.jsx)(n.code,{children:"~/.config/rio/themes/lucario.toml"})," and setting the ",(0,o.jsx)(n.code,{children:"theme"})," property:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'#  ~/.config/rio/config.toml\ntheme = "lucario"\n'})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:"https://github.com/raphamorim/lucario/raw/main/images/rio.png",alt:"Lucario theme example"})}),"\n",(0,o.jsxs)(n.p,{children:["You can find more than 250 themes for Rio terminal in this repository: ",(0,o.jsx)(n.a,{href:"https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/rio",children:"mbadolato/iTerm2-Color-Schemes/tree/master/rio"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"building-your-own-theme",children:"Building your own theme"}),"\n",(0,o.jsx)(n.p,{children:"Building your own theme for Rio is very straightforward."}),"\n",(0,o.jsxs)(n.p,{children:["Simply create a new theme file in your configuration themes folder (E.g. ",(0,o.jsx)(n.code,{children:"~/.config/rio/themes/foobar.toml"}),") and choose your preferred colors:"]}),"\n",(0,o.jsx)(n.p,{children:"Note: Missing fields will use the default for Rio."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'# ~/.config/rio/themes/foobar.toml\n\n[colors]\nbackground = ""\nforeground = ""\nselection-background = ""\nselection-foreground = ""\ntabs-active = ""\ntabs-active-highlight = ""\nbar = ""\ncursor = ""\nvi-cursor = ""\n# Regular colors\nblack = ""\nblue = ""\ncyan = ""\ngreen = ""\nmagenta = ""\nred = ""\ntabs = ""\nwhite = ""\nyellow = ""\n# Dim colors\ndim-black = ""\ndim-blue = ""\ndim-cyan = ""\ndim-foreground = ""\ndim-green = ""\ndim-magenta = ""\ndim-red = ""\ndim-white = ""\ndim-yellow = ""\n# Light colors\nlight-black = ""\nlight-blue = ""\nlight-cyan = ""\nlight-foreground = ""\nlight-green = ""\nlight-magenta = ""\nlight-red = ""\nlight-white = ""\nlight-yellow = ""\n'})}),"\n",(0,o.jsxs)(n.p,{children:["After that all you have to do is set the ",(0,o.jsx)(n.code,{children:"theme"})," property in your configuration file."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'# ~/.config/rio/config.toml\ntheme = "foobar"\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Proud of your new theme? Why not share it on the ",(0,o.jsx)(n.a,{href:"https://discord.gg/zRvJjmKGwS",children:"Rio Discord"}),"!"]})]})}function a(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},2576:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/dracula-nvim-a1d1457e2aa3780989b7e3378e473316.png"},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>s});var o=t(7294);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);