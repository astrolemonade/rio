"use strict";(self.webpackChunkrio_docs=self.webpackChunkrio_docs||[]).push([[4640],{9745:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var o=i(5893),t=i(1151);const l={title:"Windows",language:"en"},s=void 0,r={id:"install/windows",title:"Windows",description:"Note: Rio is only available for Windows 10 or later.",source:"@site/docs/install/windows.md",sourceDirName:"install",slug:"/install/windows",permalink:"/rio/pt-br/docs/next/install/windows",draft:!1,unlisted:!1,editUrl:"https://github.com/raphamorim/rio/tree/main/docs/docs/install/windows.md",tags:[],version:"current",frontMatter:{title:"Windows",language:"en"},sidebar:"tutorialSidebar",previous:{title:"WebAssembly",permalink:"/rio/pt-br/docs/next/install/webassembly"},next:{title:"Key Bindings",permalink:"/rio/pt-br/docs/next/key-bindings"}},a={},c=[];function h(e){const n={a:"a",code:"code",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Note: Rio is only available for Windows 10 or later."}),"\n",(0,o.jsx)(n.p,{children:"Prebuilt binaries for Windows:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/raphamorim/rio/releases/download/v0.1.6/Rio-installer.msi",children:"Download Microsoft installer"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/raphamorim/rio/releases/download/v0.1.6/Rio-portable.exe",children:"Download Microsoft executable"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://community.chocolatey.org/packages/rio-terminal",children:"Using Chocolatey package manager"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"choco install rio-terminal\n"})}),"\n",(0,o.jsx)(n.p,{children:"There's a few things to note about the installer and the portable version:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:'The browser will ask if you want to keep the file, click "Keep" to save the installer/executable on your computer.'}),"\n",(0,o.jsx)(n.li,{children:'When opening the file, Windows will give you a warning, click "More info" and then "Run anyway" to run the installer/executable.'}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["If you want to change the default shell to the new PowerShell platform, change the following line in your config file (see ",(0,o.jsx)(n.a,{href:"/docs/next/configuration-file",children:"Configuration file"})," for more information):"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'shell = { program = "pwsh", args = ["--login"] }\n'})}),"\n",(0,o.jsx)(n.p,{children:"You may want to use a specific GPU on your system, specially if you're on a laptop configuration, this can enable hardware acceleration and improve performance of the application.\nTo make Windows utilize a GPU for a specific application through Windows display settings, follow the instructions:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:'Simultaneously press the Windows key and the letter "i" on your keyboard to open Windows Settings.'}),"\n",(0,o.jsx)(n.li,{children:"Select System."}),"\n",(0,o.jsx)(n.li,{children:"Choose the Display option."}),"\n",(0,o.jsx)(n.li,{children:"Click on the Graphics setting link located at the bottom of the page."}),"\n",(0,o.jsx)(n.li,{children:"Select the application from the list or press the Browse button, then select the executable file for the application."}),"\n",(0,o.jsx)(n.li,{children:"Click on the Options button to display the GPU selection window."}),"\n",(0,o.jsx)(n.li,{children:"Choose the GPU you want to prioritize for the selected application."}),"\n",(0,o.jsx)(n.li,{children:"Click on the Save button."}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>s});var o=i(7294);const t={},l=o.createContext(t);function s(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);