import{r as R,j as r}from"./index-D89wP-Bh.js";import{f,c as S,g as _,a as M,k as w,s as O,_ as l,b as g,u as U,d as A,e as E,h as N}from"./CircularProgress-9x59cZ3H.js";function P(t,e=0,i=1){return S(t,e,i)}function X(t){t=t.slice(1);const e=new RegExp(`.{1,${t.length>=6?2:1}}`,"g");let i=t.match(e);return i&&i[0].length===1&&(i=i.map(a=>a+a)),i?`rgb${i.length===4?"a":""}(${i.map((a,n)=>n<3?parseInt(a,16):Math.round(parseInt(a,16)/255*1e3)/1e3).join(", ")})`:""}function y(t){if(t.type)return t;if(t.charAt(0)==="#")return y(X(t));const e=t.indexOf("("),i=t.substring(0,e);if(["rgb","rgba","hsl","hsla","color"].indexOf(i)===-1)throw new Error(f(9,t));let a=t.substring(e+1,t.length-1),n;if(i==="color"){if(a=a.split(" "),n=a.shift(),a.length===4&&a[3].charAt(0)==="/"&&(a[3]=a[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(n)===-1)throw new Error(f(10,n))}else a=a.split(",");return a=a.map(s=>parseFloat(s)),{type:i,values:a,colorSpace:n}}function F(t){const{type:e,colorSpace:i}=t;let{values:a}=t;return e.indexOf("rgb")!==-1?a=a.map((n,s)=>s<3?parseInt(n,10):n):e.indexOf("hsl")!==-1&&(a[1]=`${a[1]}%`,a[2]=`${a[2]}%`),e.indexOf("color")!==-1?a=`${i} ${a.join(" ")}`:a=`${a.join(", ")}`,`${e}(${a})`}function I(t,e){return t=y(t),e=P(e),(t.type==="rgb"||t.type==="hsl")&&(t.type+="a"),t.type==="color"?t.values[3]=`/${e}`:t.values[3]=e,F(t)}function T(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function W(t){return parseFloat(t)}function B(t){return _("MuiSkeleton",t)}M("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const K=["animation","className","component","height","style","variant","width"];let h=t=>t,m,b,x,v;const z=t=>{const{classes:e,variant:i,animation:a,hasChildren:n,width:s,height:o}=t;return N({root:["root",i,a,n&&"withChildren",n&&!s&&"fitContent",n&&!o&&"heightAuto"]},B,e)},L=w(m||(m=h`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),V=w(b||(b=h`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),q=O("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:i}=t;return[e.root,e[i.variant],i.animation!==!1&&e[i.animation],i.hasChildren&&e.withChildren,i.hasChildren&&!i.width&&e.fitContent,i.hasChildren&&!i.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const i=T(t.shape.borderRadius)||"px",a=W(t.shape.borderRadius);return l({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:I(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${i}/${Math.round(a/.6*10)/10}${i}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&g(x||(x=h`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),L),({ownerState:t,theme:e})=>t.animation==="wave"&&g(v||(v=h`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),V,(e.vars||e).palette.action.hover)),D=R.forwardRef(function(e,i){const a=U({props:e,name:"MuiSkeleton"}),{animation:n="pulse",className:s,component:o="span",height:p,style:k,variant:C="text",width:$}=a,c=A(a,K),u=l({},a,{animation:n,component:o,variant:C,hasChildren:!!c.children}),j=z(u);return r.jsx(q,l({as:o,ref:i,className:E(j.root,s),ownerState:u},c,{style:l({width:$,height:p},k)}))}),d=D,J=()=>r.jsxs("div",{className:"w-full  gap-5 flex flex-row border-b-2 pb-10 border-[white]/[0.2] justify-center p-5 items-start",children:[r.jsx("div",{className:"w-[70px] h-[70px]",children:r.jsx(d,{sx:{bgcolor:"grey.900"},animation:"wave",variant:"circular",width:60,height:60})}),r.jsxs("div",{className:"flex w-full flex-col gap-5 items-start justify-start",children:[r.jsx(d,{animation:"wave",variant:"text",width:"100%",sx:{fontSize:"1rem",bgcolor:"grey.900"}}),r.jsx(d,{sx:{bgcolor:"grey.900"},animation:"wave",variant:"rectangular",width:"100%",height:100})]})]});export{J as P};
