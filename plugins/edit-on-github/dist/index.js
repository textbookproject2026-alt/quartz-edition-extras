import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/preact/dist/preact.mjs
var n;
var l;
var u;
var v = [];
function _(l2, u2, t2) {
  var i2, o2, r2, e2 = {};
  for (r2 in u2) "key" == r2 ? i2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : e2[r2] = u2[r2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (r2 in l2.defaultProps) void 0 === e2[r2] && (e2[r2] = l2.defaultProps[r2]);
  return m(l2, e2, i2, o2, null);
}
function m(n2, t2, i2, o2, r2) {
  var e2 = { type: n2, props: t2, key: i2, ref: o2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == r2 ? ++u : r2, __i: -1, __u: 0 };
  return null != l.vnode && l.vnode(e2), e2;
}
n = v.slice, l = { __e: function(n2, l2, u2, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// src/components/scripts/controls.inline.ts
var controls_inline_default = 'var Ue=/^\\s{0,3}(```|~~~)/,qn=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,Un=t=>{let e=t.split(`\n`),n=[],s=0;if(e[0]?.trim()==="---"){let l=e.findIndex((c,a)=>a>0&&(c.trim()==="---"||c.trim()==="..."));l>0&&(s=l+1)}let r=0;for(;s<e.length;){let l=e[s];if(!l.trim()){s++;continue}let c=Ue.exec(l);if(c||l.trim()==="$$"){let u=c?c[1]:"$$",p=s+1;for(;p<e.length&&!e[p].trim().startsWith(u);)p++;s=p+1;continue}let a=s;for(;a<e.length&&e[a].trim()&&!Ue.test(e[a]);)a++;let o=e.slice(s,a).join(`\n`),d=!qn.test(l);n.push({start:s,text:o,ordinal:d?++r:0}),s=a}return n},zn=t=>ze(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),ze=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],jn=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let r of t)n.set(r,(n.get(r)??0)+1);let s=0;for(let r of e){let l=n.get(r)??0;l>0&&(s++,n.set(r,l-1))}return s/Math.max(t.length,e.length)};var je=(t,e,n)=>{let s=ze(e);if(!s.length)return null;let r=null,l=0,c=1/0;for(let a of Un(t)){let o=jn(zn(a.text),s);if(o<.75)continue;let d=a.ordinal?Math.abs(a.ordinal-n):1e6;(o>l+.02||Math.abs(o-l)<=.02&&d<c)&&(r=a,l=Math.max(o,l),c=d)}return r};var Wt=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let s=t.length,r=e.length;for(;s>n&&r>n&&t[s-1]===e[r-1];)s--,r--;let l=t.slice(0,n).map(u=>({t:"=",v:u})),c=t.slice(s).map(u=>({t:"=",v:u})),a=t.slice(n,s),o=e.slice(n,r),d;if((a.length+1)*(o.length+1)>4e5)d=[...a.map(u=>({t:"-",v:u})),...o.map(u=>({t:"+",v:u}))];else{let u=o.length+1,p=new Uint32Array((a.length+1)*u);for(let E=a.length-1;E>=0;E--)for(let b=o.length-1;b>=0;b--)p[E*u+b]=a[E]===o[b]?p[(E+1)*u+b+1]+1:Math.max(p[(E+1)*u+b],p[E*u+b+1]);d=[];let m=0,f=0;for(;m<a.length&&f<o.length;)a[m]===o[f]?(d.push({t:"=",v:a[m]}),m++,f++):p[(m+1)*u+f]>=p[m*u+f+1]?d.push({t:"-",v:a[m++]}):d.push({t:"+",v:o[f++]});for(;m<a.length;)d.push({t:"-",v:a[m++]});for(;f<o.length;)d.push({t:"+",v:o[f++]})}return[...l,...d,...c]},Gt=t=>t.split(/(\\s+)/).filter(e=>e!==""),Kt=(t,e)=>{let n=[];for(let s of Wt(t.split(`\n`),e.split(`\n`))){let r=n[n.length-1];s.v.trim()&&(s.t==="="?r&&"same"in r?r.same.push(s.v):n.push({same:[s.v]}):r&&"ops"in r?r.ops.push(s):n.push({ops:[s]}))}return n.some(s=>"ops"in s)?n:[]},Yt=t=>`${t} unchanged paragraph${t===1?"":"s"}`,Ge=t=>{let e=[];for(let n=0;n<t.length;){let s=[],r=[];for(;t[n]?.t==="=";)n++;for(;t[n]?.t==="-";)s.push(t[n++].v);for(;t[n]?.t==="+";)r.push(t[n++].v);let l=s.map(a=>({t:"-",words:[{v:a,changed:!0}]})),c=r.map(a=>({t:"+",words:[{v:a,changed:!0}]}));for(let a=0;a<Math.min(s.length,r.length);a++){let o=Wt(Gt(s[a]),Gt(r[a]));l[a].words=o.filter(d=>d.t!=="+").map(d=>({v:d.v,changed:d.t==="-"})),c[a].words=o.filter(d=>d.t!=="-").map(d=>({v:d.v,changed:d.t==="+"}))}for(let a of[...l,...c])a.words=a.words.reduce((o,d)=>{let u=o[o.length-1];return u&&u.changed===d.changed?u.v+=d.v:o.push({...d}),o},[]);e.push(...l,...c)}return e};var Vt="Saving\\u2026 this can take up to a minute.",ye={pollMs:3e3,waitMs:18e4,runningMs:35e3},Gn=Math.random().toString(36).slice(2)+Date.now().toString(36);async function Wn(t,e){let n=new TextEncoder().encode(`${Gn}\n${t}\n${e}`),s=new Uint8Array(await crypto.subtle.digest("SHA-256",n));return Array.from(s.slice(0,16),r=>r.toString(16).padStart(2,"0")).join("")}var Kn=t=>new Promise(e=>setTimeout(e,t));async function Zt(t,e,{signal:n,onWait:s}={}){let r=await Wn(t,e),l=new URL(t);l.searchParams.set("write_key",r);let c=(m={},f)=>{let E=new URL(l);for(let[b,$]of Object.entries(m))E.searchParams.set(b,$);return fetch(E,{method:"POST",headers:{"Content-Type":"application/json"},body:e,signal:f})},a=null,o="network";try{a=await c({},n)}catch{n?.aborted&&(o="timeout")}if(a&&a.status<500&&a.status!==202)return a;if(s?.(),a&&a.status>=500&&(o=String(a.status)),!a||a.status>=500){let m=await c({fallback:o}).catch(()=>null);if(!m)throw new Error("network");if(m.status!==202)return m}let d=new URL("write-status",l);d.searchParams.set("write_key",r);let u=Date.now(),p=!1;for(;Date.now()-u<ye.waitMs;){await Kn(ye.pollMs);let m=await fetch(d).catch(()=>null);if(!m)continue;if(m.status!==202)return m;(await m.json().catch(()=>null))?.state==="running"&&!p&&Date.now()-u>ye.runningMs&&(p=!0,await c({fallback:"timeout"}).catch(()=>null))}return new Response(JSON.stringify({error:"timeout",userMessage:"This is taking longer than it should. Nothing you wrote is lost: try again in a few minutes."}),{status:504,headers:{"Content-Type":"application/json"}})}var Tt="tb-editor",We="tb-editor-style",Ee="tb-gh-identity",we=10,xe=500,Yn=7.5*60*60*1e3,Ke=2e4,Vn=200,Bt=/^#edit(?:-(\\d+))?$/,Zn=t=>t?`#edit-${t}`:"#edit",Ye={tbEditor:!0},Jn="This page has changes waiting for review; you\\u2019re editing the latest draft.",i=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,l]of Object.entries(e))l!==!1&&(r==="text"?s.textContent=String(l):r==="class"?s.className=String(l):s.setAttribute(r,l===!0?"":String(l)));for(let r of n)r&&s.append(r);return s},Ve="http://www.w3.org/2000/svg",Jt=t=>{let e=document.createElementNS(Ve,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(Ve,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},Je="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",Ze="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",Xn="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",Qn="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Qt=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,Vn):null},to=()=>{try{let t=sessionStorage.getItem(Ee);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Yn?null:e}catch{return null}},ve=t=>{try{t?sessionStorage.setItem(Ee,JSON.stringify(t)):sessionStorage.removeItem(Ee)}catch{}},ke=()=>{if(document.getElementById(We))return;let t=`#${Tt}`,e=i("style",{id:We});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-same + .tb-ed-hunk, ${t} .tb-ed-hunk + .tb-ed-same { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-ed-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline;\n  min-height: 24px; min-width: 24px; } /* a 24px target at least (batch 2b) */\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},eo=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),no="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",$e=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(no).forEach(s=>s.remove()),e.querySelectorAll("*").forEach(s=>{for(let r of Array.from(s.attributes)){let l=r.value.trim().toLowerCase();(r.name.startsWith("on")||(r.name==="href"||r.name==="src")&&/^(javascript|data|vbscript):/.test(l))&&s.removeAttribute(r.name)}s.tagName==="A"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},oo=(t,e)=>{let n=i("div",{class:"tb-ed-diff"}),s=Kt(t,e);if(!s.length)return n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let r=(l,c)=>{let a=i("div",{class:`tb-ed-line${l==="-"?" tb-ed-del":l==="+"?" tb-ed-add":""}`}),o=i("span");return typeof c=="string"?o.textContent=c||" ":o.append(...c),a.append(i("span",{"aria-hidden":"true",text:l==="="?" ":l==="-"?"\\u2212":"+"}),o),a};for(let l of s){if("same"in l){let a=i("details",{class:"tb-ed-same"},i("summary",{text:Yt(l.same.length)}));a.append(...l.same.map(o=>r("=",o))),n.append(a);continue}let c=i("div",{class:"tb-ed-hunk"});for(let a of Ge(l.ops))c.append(r(a.t,a.words.map(o=>o.changed?i(a.t==="-"?"del":"ins",{text:o.v}):document.createTextNode(o.v))));n.append(c)}return n},Xt=null,Xe=()=>Xt?.(),te=t=>{if(Xt)return;ke();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,s=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),r=t.path.split("/"),l=r.pop(),c=t.para&&Number(t.para.getAttribute("data-pnum"))||0,a=t.mode,o="",d="",u="drafts",p=null,m="",f=to(),E=!1,b=!1,$=null,M=null,h=!1,L=window.scrollY,R=Zn(a==="paragraph"?c:0),T=i("div",{id:Tt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),O=i("span",{class:"tb-ed-pill"},Jt(Ze),i("span",{text:u})),D=i("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},Jt(Xn));D.append(i("span",{text:t.repo.split("/").pop()||t.repo}));for(let y of r)D.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{text:y}));D.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{class:"tb-ed-file",text:l}));let z=i("span",{class:"tb-ed-muted",text:c?` \\xB7 \\xB6${c}`:""});D.append(z,O);let X=i("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),at=i("div",{class:"tb-ed-head"},D,X),j=i("div",{class:"tb-ed-discard",role:"alert",hidden:!0},i("span",{text:"Discard your changes?"})),K=i("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),nt=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});j.append(K,nt);let dt=i("div",{class:"tb-ed-main"}),Y=i("div",{class:"tb-ed-inner"}),it=i("p",{class:"tb-ed-note",hidden:!0}),ot=i("p",{class:"tb-ed-note",hidden:!0,text:Jn}),P=i("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),g=i("div",{class:"tb-ed-gate",hidden:!0});Y.append(ot,it,P,g),dt.append(Y),T.append(at,j,dt);let w=["Edit","Preview","Changes"],x=i("div",{role:"tablist","aria-label":"Editor view"}),k=w.map((y,C)=>i("button",{type:"button",role:"tab",id:`tb-ed-tab-${C}`,"aria-controls":`tb-ed-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:y==="Edit"?"Edit":y==="Preview"?"Preview":"Changes"}));x.append(...k);let I=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),N=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),B=i("div",{class:"tb-ed-bar"},x,i("div",{class:"tb-ed-actions"},I,N)),H=i("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),G=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),V=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),mt=[i("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},G,H,V),i("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),i("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],ct=i("div",{class:"tb-ed-box"},B,...mt),vt=i("p",{class:"tb-ed-foot"}),Z=()=>H.value,Et=()=>m,Ct=y=>{k.forEach((C,A)=>{C.setAttribute("aria-selected",A===y?"true":"false"),C.tabIndex=A===y?0:-1,mt[A].hidden=A!==y}),y===1&&yt(),y===2&&(mt[2].textContent="",mt[2].append(oo(Et(),Z())))};k.forEach((y,C)=>{y.addEventListener("click",()=>Ct(C)),y.addEventListener("keydown",A=>{let S=A.key==="ArrowRight"?1:A.key==="ArrowLeft"?-1:0;if(!S)return;A.preventDefault();let et=(C+S+k.length)%k.length;Ct(et),k[et].focus()})});let ft=0,yt=()=>{let y=mt[1];y.textContent="",y.className="tb-ed-panel tb-ed-preview";let C=i("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});y.append(C);let A=++ft;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:eo(Z()),mode:"markdown"})}).then(S=>S.ok?S.text():Promise.reject(new Error(String(S.status)))).then(S=>{A===ft&&(y.textContent="",y.append($e(S)))}).catch(()=>{A===ft&&(C.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};H.addEventListener("input",()=>{b=Z()!==m,N.disabled=!b});let st=i("div",{class:"tb-ed-scrim",hidden:!0}),Q=i("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});st.append(Q),T.append(st);let Ot=(y,C,A,S=!1)=>{A.id=y;let et=i("p",{class:"tb-ed-err",id:`${y}-err`}),gt=i("label",{for:y,text:C},S?i("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:i("div",{class:"tb-ed-field"},gt,A,et),control:A,err:et}},tt=Ot("tb-ed-msg","What did you change, and why?",i("textarea",{rows:2,maxlength:xe,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));tt.wrap.append(i("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let _t=Ot("tb-ed-desc","Extended description",i("textarea",{rows:3,maxlength:5e3}),!0),wt=i("div",{class:"tb-ed-who"}),Pt=i("div",{class:"tb-ed-what"},Jt(Ze)),Lt=i("span");Pt.append(Lt);let F=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),_=i("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),q=i("form",{novalidate:!0},i("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),tt.wrap,_t.wrap,wt,Pt,i("div",{class:"tb-ed-row"},F,_)),U=i("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});Q.append(q,U);let ut=()=>{if(wt.textContent="",f){let y=i("img",{src:`https://avatars.githubusercontent.com/u/${f.id}?s=56`,alt:""}),C=i("button",{type:"button",class:"tb-ed-link",text:"Sign out"});C.addEventListener("click",()=>{f=null,ve(null),ut()}),wt.append(y,i("span",{},"Signed in as ",i("strong",{text:`@${f.login}`})," \\u2014 this edit will be credited to your GitHub account."),C)}else wt.append(rt(),i("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},rt=()=>{let y=i("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},Jt(Qn),"Sign in with GitHub");return y.addEventListener("click",()=>qt(y)),y},J=()=>{g.textContent="";let y=rt(),C=i("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let A=i("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});A.addEventListener("click",()=>{zt(),t.suggest()}),C.append(A," instead: it needs no account.")}else C.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");g.append(i("h2",{text:"Sign in to edit"}),i("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),i("p",{},y),C),P.hidden=!0,g.hidden=!1,y.focus()},pt=y=>{if(y.origin!==n)return;let C=y.data;if(!(!C||C.type!=="tb-github-identity")){if($=null,C.error||typeof C.token!="string"||typeof C.login!="string"){t.track("github_signin",{outcome:C.error==="denied"?"cancelled":"error"});return}if(f={token:C.token,login:C.login,id:Number(C.id)||0,name:C.name??"",at:Date.now()},ve(f),t.track("github_signin",{outcome:"success"}),!h)return qe();ut(),st.hidden||tt.control.focus()}},qt=y=>{let C=`${s}?origin=${encodeURIComponent(location.origin)}`;$=window.open(C,"tb-github-signin","popup,width=560,height=720"),!$&&!y.parentElement?.querySelector(".tb-ed-err")&&y.after(i("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",pt);let Nn=(y,C)=>{y.control.setAttribute("aria-invalid","true"),y.control.setAttribute("aria-describedby",y.err.id),y.err.textContent=C},Ne=y=>{y.control.removeAttribute("aria-invalid"),y.control.removeAttribute("aria-describedby"),y.err.textContent=""};tt.control.addEventListener("input",()=>Ne(tt));let On=()=>{Lt.textContent="",Lt.append("This creates a new branch and opens a proposal to merge it into ",i("code",{text:u}),". Nothing changes in the book until an editor accepts it."),ut(),q.hidden=!1,U.hidden=!0,st.hidden=!1,tt.control.focus()},he=()=>{st.hidden=!0,N.focus()};N.addEventListener("click",On),F.addEventListener("click",he),st.addEventListener("mousedown",y=>{y.target===st&&!E&&he()});let fe=(y,C,A,S)=>{if(!T.isConnected)return;U.textContent="",U.append(i("h2",{text:y}),i("p",{text:C})),A&&U.append(i("p",{},i("a",{href:A.href,target:"_blank",rel:"noopener",text:A.text})));let et=i("button",{type:"button",class:`tb-ed-btn${S?" tb-ed-primary":""}`,text:S?"Back to my edit":"Close"});et.addEventListener("click",S?()=>{U.hidden=!0,q.hidden=!1,_.focus()}:()=>Ut(!0)),U.append(i("div",{class:"tb-ed-row"},et)),q.hidden=!0,U.hidden=!1,U.focus()};q.addEventListener("submit",y=>{if(y.preventDefault(),E)return;let C=null;Ne(tt);let A=tt.control.value.trim().length;if(A<we||A>xe?(Nn(tt,A<we?`Please say what you changed and why, in at least ${we} characters.`:`Please keep it under ${xe} characters.`),C=tt.control):f||(C=wt.querySelector("button")),C){C.focus();return}let S={mode:a,path:t.path,baseSha:d,title:a==="paragraph"&&c?`Edit \\xB6${c} of ${l}`:`Update ${l}`,summary:tt.control.value.trim().replace(/\\s+/g," "),description:_t.control.value.trim()};a==="page"?S.content=Z():(S.startLine=p.start,S.original=p.text,S.replacement=Z(),c&&(S.paragraph=c)),S.identity=f.token,E=!0,_.disabled=!0,_.textContent="Proposing\\u2026";let et=M=new AbortController,gt=setTimeout(()=>et.abort(),Ke);Zt(t.endpoint,JSON.stringify(S),{signal:et.signal,onWait:()=>{clearTimeout(gt),_.textContent=Vt}}).then(async W=>{let jt=null;try{jt=await W.json()}catch{jt=null}if(W.status===401&&f&&(f=null,ve(null),ut()),!W.ok)throw Object.assign(new Error(String(W.status)),{userMessage:Qt(jt)});return jt}).then(W=>{b=!1,W.fallback&&typeof W.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:a}),fe("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:W.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:a}),fe("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof W.prUrl=="string"?{href:W.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(W=>{t.track("page_edit_submitted",{outcome:"error",mode:a}),fe("That did not go through",W&&W.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(gt),M===et&&(M=null),E=!1,_.disabled=!1,_.textContent="Propose changes"})});let _n=y=>Array.from(y.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]")),Oe=y=>{if(y.key==="Escape"){y.preventDefault(),st.hidden?Ht():E||(!U.hidden&&q.hidden&&!b?Ut(!0):he());return}if(y.key!=="Tab")return;let C=st.hidden?T:Q,A=_n(C);if(!A.length){y.preventDefault(),C.focus();return}let S=A.indexOf(document.activeElement);(y.shiftKey?S<=0:S===-1||S===A.length-1)&&(y.preventDefault(),A[y.shiftKey?A.length-1:0].focus())},_e=y=>{b&&(y.preventDefault(),y.returnValue="")},Ut=(y=!1)=>{if(!y&&b)return Ht();b=!1,Bt.test(location.hash)?history.back():zt()},Pe=()=>{if(!Bt.test(location.hash)){if(b)return history.pushState(Ye,"",R),Ht();zt()}},zt=()=>{Xt=null,M?.abort(),$?.close(),document.removeEventListener("keydown",Oe,!0),window.removeEventListener("message",pt),window.removeEventListener("beforeunload",_e),window.removeEventListener("popstate",Pe),T.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,L)},Ht=()=>{if(!b)return Ut(!0);j.hidden=!1,nt.focus()};K.addEventListener("click",()=>Ut(!0)),nt.addEventListener("click",()=>{j.hidden=!0,H.focus()}),X.addEventListener("click",Ht),I.addEventListener("click",Ht),document.addEventListener("keydown",Oe,!0),window.addEventListener("beforeunload",_e),window.addEventListener("popstate",Pe),Xt=zt,t.push!==!1&&history.pushState(Ye,"",R),document.body.style.overflow="hidden",document.body.append(T),X.focus(),t.track("page_editor_opened",{mode:a});let Pn=y=>{P.textContent="",P.removeAttribute("class"),P.append(y+" ",i("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},qe=()=>{if(!f)return J();h=!0,g.hidden=!0,P.hidden=!1;let y=new AbortController,C=setTimeout(()=>y.abort(),Ke);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:y.signal}).then(async A=>{let S=null;try{S=await A.json()}catch{S=null}if(!A.ok)throw Object.assign(new Error(String(A.status)),{userMessage:Qt(S)});return S}).then(A=>{if(T.isConnected){if(typeof A?.content!="string"||typeof A.sha!="string")throw new Error("bad source");if(o=A.content,d=A.sha,u=typeof A.branch=="string"?A.branch:u,O.lastChild.textContent=u,ot.hidden=!t.builtBlob||t.builtBlob===d,a==="paragraph"&&(p=t.para?je(o,t.para.textContent??"",c):null,p||(a="page",z.textContent="",it.textContent=`We couldn\\u2019t find \\xB6${c} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,it.hidden=!1)),a==="paragraph"&&p){ct.classList.add("tb-ed-para");let S=o.split(`\n`),et=p.text.split(`\n`).length,gt=S.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),W=S.slice(p.start+et,p.start+et+3).join(`\n`).trim();G.textContent=gt.length>220?`\\u2026${gt.slice(-220)}`:gt,V.textContent=W.length>220?`${W.slice(0,220)}\\u2026`:W,G.hidden=!gt,V.hidden=!W,m=p.text,vt.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else m=o,vt.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";H.value=m,P.remove(),Y.append(ct,vt),H.setSelectionRange(0,0),H.focus()}}).catch(A=>{T.isConnected&&Pn(A&&A.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(C))};qe()};var kt=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},ee=(t,e)=>Gt(t).map(n=>({v:n,s:{...e}})),At=(t,e={})=>{let n=[],s={...e},r="",l=()=>{r&&n.push(...ee(r,s)),r=""},c=a=>!!a&&/[\\p{L}\\p{N}]/u.test(a);for(let a=0;a<t.length;){let o=t.slice(a),d;if(o[0]==="\\\\"&&o.length>1)r+=o[1],a+=2;else if(d=/^`([^`]+)`/.exec(o))l(),n.push(...ee(d[1],{...s,code:!0})),a+=d[0].length;else if(d=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(o)){l();let u=d[2]??d[1].split("/").pop()??d[1];n.push(...ee(u,{...s,link:!0})),a+=d[0].length}else if(d=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(o))l(),n.push(...ee(`(image${d[1]?`: ${d[1]}`:""})`,{...s,i:!0})),a+=d[0].length;else if(d=/^\\[\\^([^\\]]+)\\]/.exec(o))l(),n.push({v:d[1],s:{...s,sup:!0}}),a+=d[0].length;else if(d=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(o))l(),n.push(...At(d[1],{...s,link:!0})),a+=d[0].length;else if(d=/^<\\/?[a-zA-Z][^>]*>/.exec(o))l(),a+=d[0].length;else if(o.startsWith("**")||o.startsWith("__")){let u=o.slice(0,2);s.b||t.indexOf(u,a+2)>a+2?(l(),s.b=!s.b):r+=u,a+=2}else(o[0]==="*"||o[0]==="_")&&!(o[0]==="_"&&c(t[a-1])&&c(t[a+1]))?(s.i||t.indexOf(o[0],a+1)>a+1?(l(),s.i=!s.i):r+=o[0],a+=1):(r+=o[0],a+=1)}return l(),n},ne=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:At(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:At(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:At(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:At(e[2])}:{kind:"p",runs:At(t)}:{kind:"blank",runs:[]}},Qe=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=i("code",{},e)),t.s.i&&(e=i("em",{},e)),t.s.b&&(e=i("strong",{},e)),t.s.link&&(e=i("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=i("sup",{},e)),e},oe=(t,e,n)=>{let s=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,r=i("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),l=i("div",{class:"tb-rd-text"});e.marker&&l.append(i("span",{class:"tb-rd-marker",text:e.marker}));let c=null;for(let{run:a,changed:o}of n)o&&t!=="="?(c||(c=i(t==="-"?"del":"ins"),l.append(c)),c.append(Qe(a))):(c=null,l.append(Qe(a)));return i("div",{class:s},r,l)},re=(t,e)=>t.map(n=>({run:n,changed:e})),Rt=(t,e)=>{let n=i("div",{class:"tb-ed-diff tb-rd"}),s=kt(t),r=kt(e),l=Kt(s,r);if(!l.length)return n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:s!==r||t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n;for(let c of l){if("same"in c){let o=i("details",{class:"tb-rd-same"},i("summary",{text:Yt(c.same.length)}));for(let d of c.same){let u=ne(d);o.append(oe("=",u,re(u.runs,!1)))}n.append(o);continue}let a=c.ops;for(let o=0;o<a.length;){let d=a[o];if(d.t==="="){let b=ne(d.v);n.append(oe("=",b,re(b.runs,!1))),o++;continue}let u=[],p=[];for(;a[o]?.t==="-";)u.push(ne(a[o++].v));for(;a[o]?.t==="+";)p.push(ne(a[o++].v));let m=Math.min(u.length,p.length),f=u.map(b=>re(b.runs,!0)),E=p.map(b=>re(b.runs,!0));for(let b=0;b<m;b++){let $=u[b].runs,M=p[b].runs,h=Wt($.map(D=>D.v),M.map(D=>D.v)),L=0,R=0,T=[],O=[];for(let D of h)D.t!=="+"&&T.push({run:$[L++],changed:D.t==="-"}),D.t!=="-"&&O.push({run:M[R++],changed:D.t==="+"});f[b]=T,E[b]=O}u.forEach((b,$)=>n.append(oe("-",b,f[$]))),p.forEach((b,$)=>n.append(oe("+",b,E[$])))}}return n};var Ft=t=>(Array.isArray(t)?t:[]).filter(e=>!!e&&Number.isInteger(e.number)&&typeof e.date=="string"&&typeof e.url=="string"&&/^https:\\/\\/github\\.com\\//.test(e.url)&&["edit","note","suggestion"].includes(e.kind)&&Array.isArray(e.comments)),se=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},Ce=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},$t=(t,e="",n={})=>{try{let s=new URL(t,"https://x.invalid"),r=new URL("history",s);r.searchParams.set("book",s.searchParams.get("book")??""),e&&r.searchParams.set("path",e);for(let[l,c]of Object.entries(n))r.searchParams.set(l,c);return t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},tn=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(r=>r.toLowerCase());return e.find(r=>r.role&&r.role!=="contributor"&&n.includes(r.who.toLowerCase()))?.role??"contributor"},St=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",en=(t,e)=>{let n=[],s=[...e].sort((r,l)=>l.date.localeCompare(r.date));for(let r of t){for(;s.length&&s[0].date>=r.date;)n.push({release:s.shift()});n.push({entry:r})}for(let r of s)n.push({release:r});return n},nn=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),on=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state);var ro="No reason was recorded.",Dt=t=>t.kind==="edit"?"Declined proposed edit":t.kind==="note"?t.paragraph?`Declined note on \\xB6${t.paragraph}`:"Declined note":"Declined suggestion",Le=t=>{let e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"}):t},so=async(t,e)=>{let n=await fetch(t,{signal:e,credentials:"omit"}),s=await n.json().catch(()=>null);if(!n.ok)throw Object.assign(new Error(`HTTP ${n.status}`),{userMessage:s?.userMessage});return s},ae=(t,e)=>{let n=i("div",{class:"tb-dc"});n.append(i("div",{class:"tb-dc-who",text:`Proposed by ${t.who?.name??"a reader"} on ${Le(t.proposed)}. Declined${t.decliner?` by ${t.decliner}`:""} on ${Le(t.date)}.`}),i("blockquote",{class:`tb-dc-reason${t.reason?"":" tb-dc-none"}`},i("span",{class:"tb-dc-label",text:"Why it was declined: "}),t.reason??ro));let s=i("div",{class:"tb-hi-actions tb-dc-actions"}),r=i("div",{class:"tb-hi-diff tb-dc-diff",hidden:!0});if(t.kind==="edit"&&e){let l=i("button",{type:"button","aria-pressed":"false",text:"Show changes"});l.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0,l.setAttribute("aria-pressed","false");return}l.setAttribute("aria-pressed","true"),r.hidden=!1,r.textContent="",r.append(i("p",{class:"tb-ed-muted",role:"status",text:"Loading what was proposed\\u2026"}));let c=new AbortController,a=setTimeout(()=>c.abort(),2e4);so($t(e,"",{change:String(t.number)}),c.signal).then(o=>{let d=o?.files??[];r.textContent="",d.length||r.append(i("p",{class:"tb-ed-muted",text:"The proposal changed no page."}));for(let u of d)r.append(Rt(typeof u.before=="string"?u.before:"",typeof u.after=="string"?u.after:""))}).catch(o=>{r.textContent="",r.append(i("p",{class:"tb-ed-note",role:"alert",text:o?.userMessage||"What was proposed couldn\\u2019t be loaded just now."}))}).finally(()=>clearTimeout(a))}),s.append(l)}if(s.append(i("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",text:`See #${t.number} on GitHub \\u2197`})),n.append(s,r),t.comments.length){let l=i("ol",{class:"tb-dc-comments","aria-label":"Comments from the book\'s people"});for(let c of t.comments)l.append(i("li",{class:"tb-dc-comment"},i("div",{class:"tb-dc-cmeta",text:`${c.name} \\xB7 ${Le(c.date)}`}),i("p",{class:"tb-dc-ctext",text:c.text})));n.append(i("div",{class:"tb-dc-chead",text:"Comments from the book\\u2019s people"}),l)}return n},ie=t=>`\n${t} .tb-dc { margin-top: 0.4rem; }\n${t} .tb-dc p, ${t} .tb-dc-who, ${t} .tb-dc-cmeta { margin: 0.15rem 0; overflow-wrap: anywhere; }\n${t} .tb-dc-who, ${t} .tb-dc-cmeta, ${t} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }\n${t} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }\n${t} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }\n${t} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }\n${t} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-dc-ctext { white-space: pre-line; }\n${t} .tb-hi-state.tb-hi-declined, ${t} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }\n`;var rn={author:"Author",editor:"Editor",contributor:"Contributor"},le=t=>{if(!t||!(t in rn))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=rn[t],e};var sn="tb-history-style",ao=30,an=2e4,ln="a reader",Te=t=>`\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-rd-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n`,io=()=>{if(document.getElementById(sn))return;let t=`#${Tt}.tb-hi`,e=i("style",{id:sn});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n${Te(t)}\n${ie(t)}\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},lo=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),s=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return s?`Paragraph ${s[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},ht=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},bt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),s=null;try{s=await n.json()}catch{}if(!n.ok){let r=new Error(`HTTP ${n.status}`);throw r.userMessage=Qt(s),r}return s},de=null,dn=()=>de?.(),cn=t=>{if(de||document.getElementById(Tt))return;ke(),io();let e=document.body.style.overflow,n=null,s=0,r=i("div",{id:Tt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),l=i("div",{class:"tb-hi-where",id:"tb-hi-title"},i("span",{class:"tb-hi-name",text:"Page history"}),t.title?i("span",{class:"tb-hi-page",text:t.title}):null),c=i("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},i("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),i("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),a=i("div",{class:"tb-ed-main"}),o=i("div",{class:"tb-ed-inner"});a.append(o),r.append(i("div",{class:"tb-hi-top"},l,c),a);let d=g=>i("p",{class:"tb-ed-muted",role:"status",text:g}),u=(g,w)=>{let x=i("div",{class:"tb-ed-note",role:"alert"});return x.append(i("span",{text:`${g?.userMessage||w} `}),i("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),x},p=()=>{n?.abort();let g=new AbortController;n=g;let w=setTimeout(()=>g.abort(),an);return{signal:g.signal,done:()=>clearTimeout(w),current:()=>n===g}},m=null,f=[],E=[],b=[],$=null,M=g=>{let w=new URL(t.endpoint,location.href);for(let[x,k]of Object.entries(g))w.searchParams.set(x,k);return w.toString()},h=g=>g.path??m?.source??t.path,L=()=>m?.published[0]??null,R=(g,w)=>{let x=i("p",{class:"tb-hi-meta"});w&&x.append(i("span",{class:"tb-hi-state",text:w})),x.append(`${ht(g.date)} \\xB7 ${g.who}`);let k=le(g.role);return k&&x.append(" ",k),g.pr&&t.githubHref&&x.append(" \\xB7 ",i("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${g.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${g.pr}`})),x},T=(g,w,x)=>{if(!w.hidden){w.hidden=!0,x.setAttribute("aria-pressed","false");return}x.setAttribute("aria-pressed","true"),w.hidden=!1,w.textContent="",w.append(d("Loading what changed\\u2026")),t.track("page_revision_opened");let k=new AbortController,I=setTimeout(()=>k.abort(),an);bt(M({sha:g.sha,path:h(g)}),k.signal).then(N=>{let B=N,H=typeof B.before=="string"?B.before:"",G=typeof B.after=="string"?B.after:"";w.textContent="",B.status==="added"&&w.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let V=typeof B.previousPath=="string"&&B.previousPath!==h(g);V&&w.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${kt(H)===kt(G)?"; its text didn\\u2019t change.":"."}`})),(!V||kt(H)!==kt(G))&&w.append(Rt(H,G))}).catch(N=>{w.textContent="",w.append(u(N,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(I))},O=(g,w)=>{s=a.scrollTop,o.textContent="";let x=i("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});x.addEventListener("click",()=>{n?.abort(),K()});let k=i("div",{});return o.append(x,i("div",{class:"tb-hi-banner",role:"status",text:w}),i("div",{class:"tb-hi-head"},i("h2",{text:g})),k),a.scrollTop=0,x.focus(),k},D=g=>{let w=O(g.summary,`You are reading the version of ${ht(g.date)}.`);w.append(d("Loading this version\\u2026")),t.track("page_version_read");let x=p();bt(M({sha:g.sha,path:h(g)}),x.signal).then(k=>{if(!x.current())return;let I=k.html;w.textContent="",w.append(typeof I=="string"&&I?i("div",{class:"tb-ed-panel tb-ed-preview"},$e(I)):i("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch(k=>{x.current()&&(w.textContent="",w.append(u(k,"This version couldn\\u2019t be loaded just now.")))}).finally(x.done)},z=(g,w)=>{let[x,k]=g.date<=w.date?[g,w]:[w,g],I=H=>`the version of ${ht(H.date)}${H===L()?" (the one you read now)":""}`,N=O("Compare versions",`Changes from ${I(x)} to ${I(k)}.`);N.append(d("Loading the two versions\\u2026")),t.track("page_versions_compared");let B=p();bt(M({sha:k.sha,base:x.sha,path:h(k)}),B.signal).then(H=>{if(!B.current())return;let G=H;N.textContent="",N.append(i("div",{class:"tb-hi-diff"},Rt(typeof G.before=="string"?G.before:"",typeof G.after=="string"?G.after:"")))}).catch(H=>{B.current()&&(N.textContent="",N.append(u(H,"The versions couldn\\u2019t be compared just now.")))}).finally(B.done)},X=(g,w)=>{let x=i("li",{class:"tb-hi-entry"}),k=i("div",{class:"tb-hi-diff",hidden:!0}),I=i("button",{type:"button","aria-pressed":"false",text:"Show changes"});I.addEventListener("click",()=>T(g,k,I));let N=i("button",{type:"button",text:"Read this version"});N.addEventListener("click",()=>D(g));let B=i("button",{type:"button",text:$?$===g?"Cancel compare":"Compare with this":"Compare\\u2026"});B.addEventListener("click",()=>{if(!$)$=g,K();else if($===g)$=null,K();else{let V=$;$=null,z(V,g)}});let H=i("div",{class:"tb-hi-actions"},I,N,B),G=L();if(!$&&G&&G.sha!==g.sha){let V=i("button",{type:"button",text:"Compare with now"});V.addEventListener("click",()=>z(g,G)),H.append(V)}return x.append(i("p",{class:"tb-hi-msg",text:g.summary}),R(g,w),H,k),x},at=g=>{let w=i("li",{class:"tb-hi-entry"});return w.append(i("p",{class:"tb-hi-msg",text:g.summary||St(g)}),R({date:g.date,who:g.who?.name??"A reader",role:tn(g,[...m?.published??[],...m?.drafts??[]])},`Proposed \\xB7 ${St(g)}`),i("div",{class:"tb-hi-actions"},i("a",{href:g.url,target:"_blank",rel:"noopener noreferrer",text:`See #${g.number} on GitHub \\u2197`}))),w},j=g=>i("li",{class:"tb-hi-entry tb-hi-declined-entry"},i("p",{class:"tb-hi-msg",text:g.summary||Dt(g)}),i("p",{class:"tb-hi-meta"},i("span",{class:"tb-hi-state tb-hi-declined",text:"Declined"}),`${Dt(g).replace(/^Declined /,"")} \\xB7 ${ht(g.date)}`),ae(g,t.endpoint)),K=()=>{if(o.textContent="",!m)return;if($&&o.append(i("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${ht($.date)}: pick the other version, below.`})),E.length||m.drafts.length){let x=i("ol",{class:"tb-hi-list"});for(let k of E)x.append(at(k));for(let k of m.drafts)x.append(X(k,"Being edited"));o.append(i("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},i("h2",{id:"tb-hi-editing",text:"Being edited"}),i("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),x))}let g=i("ol",{class:"tb-hi-list"}),w=[...b].sort((x,k)=>k.date.localeCompare(x.date));for(let x of en(m.published,f)){let k="release"in x?x.release.date:x.entry.date;for(;w.length&&w[0].date>k;)g.append(j(w.shift()));"release"in x?g.append(i("li",{class:"tb-hi-release",role:"separator","aria-label":`${Ce(x.release.tag)}, ${ht(x.release.date)}`,text:`${Ce(x.release.tag)} \\xB7 ${ht(x.release.date)}`})):g.append(X(x.entry,void 0))}for(let x of w)g.append(j(x));o.append(i("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},i("h2",{id:"tb-hi-published",text:b.length?"Published and declined":"Published"}),i("p",{text:m.published.length?b.length?"What readers have seen, and what the authors declined and why, newest first.":"What readers have seen, newest first.":b.length?"This page has no published versions yet. What the authors declined, and why:":"This page has no published versions yet."}),g)),a.scrollTop=s},nt=g=>{if(g.key==="Escape"){g.preventDefault(),dt();return}if(g.key!=="Tab")return;let w=Array.from(r.querySelectorAll("a[href], button, [tabindex]")).filter(k=>!k.disabled&&k.tabIndex>=0&&!k.closest("[hidden]"));if(!w.length)return;let x=w.indexOf(document.activeElement);(g.shiftKey?x<=0:x===-1||x===w.length-1)&&(g.preventDefault(),w[g.shiftKey?w.length-1:0].focus())},dt=()=>{de=null,n?.abort(),document.removeEventListener("keydown",nt,!0),r.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};c.addEventListener("click",dt),document.addEventListener("keydown",nt,!0),de=dt,document.body.style.overflow="hidden",document.body.append(r),c.focus(),t.track("page_history_opened"),o.append(d("Loading this page\\u2019s history\\u2026"));let Y=p(),it=t.bookHistoryUrl?bt(t.bookHistoryUrl,Y.signal).then(g=>{let w=se(g),x=w?.pages.find(k=>k.source===t.path)??null;return w&&(f=w.releases),w&&!b.length&&(b=Ft(w.declined).filter(k=>k.files?.includes(t.path))),x}):Promise.resolve(null),ot=$t(t.endpoint,t.path,{declined:"1"}),P=ot?bt(ot,Y.signal).then(g=>(b=Ft(g?.declined),(g?.items??[]).filter(w=>w&&typeof w.url=="string"))).catch(()=>[]):Promise.resolve([]);it.catch(()=>null).then(async g=>{if(g)return g;let w=await bt(t.listUrl,Y.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(w)?w:[]).map((x,k,I)=>({sha:x.sha,date:x.date,who:x.who,role:null,summary:lo(x.message??"",k===I.length-1),...x.path!==t.path?{path:x.path}:{}})),drafts:[],releases:{}}}).then(async g=>{m=g;let w=[...g.published,...g.drafts],x=[...new Set(w.filter(B=>B.who===ln).map(B=>B.sha))].slice(0,ao),k=x.length?bt(M({shas:x.join(",")}),Y.signal).then(B=>B?.names??{}).catch(()=>({})):Promise.resolve({}),[I,N]=await Promise.all([k,P]);for(let B of w){let H=I[B.sha];B.who===ln&&typeof H=="string"&&H.trim()&&(B.who=H.trim().slice(0,80))}E=N,Y.current()&&K()}).catch(g=>{Y.current()&&(o.textContent="",o.append(u(g,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(Y.done)};var Mt="http://www.w3.org/2000/svg",un={proposed:"Proposed",drafts:"Being edited",published:"Published",declined:"Declined"},pn="tb-bh-style",co=(t,e)=>{let n=s=>{let r=s?.querySelector("title")?.textContent;if(r){for(let l of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))l.removeAttribute("aria-current");s.setAttribute("aria-current","true"),e.textContent=r}};t.addEventListener("click",s=>n(s.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",s=>n(s.target.closest(".tb-swim-dot")))},uo=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!s)return;let[r,l]=n.map(a=>({t:Date.parse(a.textContent??""),x:Number(a.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let c=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2;for(let a of e){let o=Math.min(Math.max(Date.parse(a.date),r.t),l.t),d=document.createElementNS(Mt,"circle");d.setAttribute("class","tb-swim-dot"),d.setAttribute("data-lane","0"),d.setAttribute("cx",(r.x+(o-r.t)/(l.t-r.t)*(l.x-r.x)).toFixed(1)),d.setAttribute("cy",String(c)),d.setAttribute("r","5"),d.setAttribute("tabindex","0");let u=document.createElementNS(Mt,"title");u.textContent=`${a.date} \\xB7 ${St(a)}: ${a.summary} (${a.who?.name??"a reader"})`,d.append(u),t.append(d)}},po=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="3"]\');if(n.length<2||!s)return;let[r,l]=n.map(o=>({t:Date.parse(o.textContent??""),x:Number(o.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let c=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2,a=new Set(Array.from(t.querySelectorAll(".tb-swim-declined")).map(o=>o.getAttribute("data-number")));for(let o of e){if(a.has(String(o.number)))continue;let d=r.x+(Math.min(Math.max(Date.parse(o.date),r.t),l.t)-r.t)/(l.t-r.t)*(l.x-r.x),u=document.createElementNS(Mt,"g");for(let[E,b]of Object.entries({class:"tb-swim-dot tb-swim-declined","data-lane":"3","data-number":String(o.number),tabindex:"0",fill:"none",stroke:"currentColor","stroke-width":"1.5"}))u.setAttribute(E,b);let p=document.createElementNS(Mt,"title");p.textContent=`${o.date} \\xB7 declined: ${o.summary} (${o.who?.name??"a reader"})`;let m=document.createElementNS(Mt,"circle");m.setAttribute("cx",d.toFixed(1)),m.setAttribute("cy",String(c)),m.setAttribute("r","5");let f=document.createElementNS(Mt,"path");f.setAttribute("d",`M${(d-3).toFixed(1)} ${c-3}L${(d+3).toFixed(1)} ${c+3}M${(d+3).toFixed(1)} ${c-3}L${(d-3).toFixed(1)} ${c+3}`),u.append(p,m,f),t.append(u)}},Ae=(t,e,n,s)=>{let r=i("select",{class:"tb-bh-select"});r.append(i("option",{value:"",text:"Any"}));for(let[l,c]of n)r.append(i("option",{value:l,text:c}));return r.addEventListener("change",()=>s(e,r.value)),i("label",{class:"tb-bh-filter"},i("span",{text:t}),r)},bn=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let s=document.querySelector("svg.tb-swimlane");if(s){let h=i("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});s.closest("figure")?.append(h),co(s,h)}let r=new AbortController;setTimeout(()=>r.abort(),2e4);let l=se(await bt(e,r.signal).catch(()=>null));if(!l)return;let c=n?$t(n):"";document.getElementById(pn)||document.head.append(i("style",{id:pn,text:Te(".tb-bh-list")+ie(".tb-bh-list")}));let a=Ft(l.declined),o=c?await bt($t(n,"",{declined:"1"}),r.signal).then(h=>{let L=h?.declined;return Array.isArray(L)&&(a=Ft(L)),(h?.items??[]).filter(R=>R&&typeof R.url=="string")}).catch(()=>[]):[];s&&(uo(s,o),po(s,a));let d=new Map(l.pages.map(h=>[h.source,h])),u=[...o.map(h=>{let L=h.files?.map(R=>d.get(R)).find(Boolean);return{date:h.date,who:h.who?.name??"A reader",role:"contributor",summary:h.summary||St(h),state:"proposed",page:L?.source??"",pageTitle:L?.title??"",href:h.url,ref:`#${h.number}`}}),...a.map(h=>{let L=h.files?.map(R=>d.get(R)).find(Boolean);return{date:h.date,who:h.who?.name??"A reader",role:"contributor",summary:h.summary||Dt(h),state:"declined",page:L?.source??"",pageTitle:L?.title??"",href:h.url,ref:`#${h.number}`,declined:h}}),...nn(l).map(h=>({date:h.date,who:h.who,role:h.role,summary:h.summary,state:h.state,page:h.page.source,pageTitle:h.page.title,href:h.page.path,ref:h.pr?`#${h.pr}`:""}))].sort((h,L)=>L.date.localeCompare(h.date)),p={page:"",person:"",state:""},m=i("ol",{class:"tb-bh-list"}),f=i("p",{class:"tb-bh-count",role:"status"}),E=()=>{m.textContent="";let h=u.filter(L=>on(p,L));f.textContent=`${h.length} change${h.length===1?"":"s"}`;for(let L of h){let R=i("p",{class:"tb-bh-meta"},i("span",{class:`tb-bh-state tb-bh-${L.state}`,text:un[L.state]}),` ${ht(L.date)} \\xB7 ${L.who}`),T=le(L.role);T&&R.append(" ",T),L.state==="proposed"&&R.append(" \\xB7 ",i("a",{href:L.href,target:"_blank",rel:"noopener noreferrer",text:`${L.ref} on GitHub \\u2197`})),m.append(i("li",{class:"tb-bh-item"},i("p",{class:"tb-bh-summary",text:L.summary}),L.pageTitle?i("p",{class:"tb-bh-page"},L.state==="proposed"||L.state==="declined"?L.pageTitle:i("a",{href:L.href,text:L.pageTitle})):null,R,L.declined?ae(L.declined,n):null))}},b=(h,L)=>{Object.assign(p,{[h]:L}),E()},$=[...new Set(u.map(h=>h.who))].sort((h,L)=>h.localeCompare(L)),M=l.pages.filter(h=>h.published.length||h.drafts.length).map(h=>[h.source,h.title]);t.append(i("h2",{text:"All changes"}),i("div",{class:"tb-bh-filters"},Ae("Chapter","page",M,b),Ae("Person","person",$.map(h=>[h,h]),b),Ae("State","state",Object.entries(un),b)),f,m),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),E()};var gn={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},hn=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),bo=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(s=>`${s.charAt(0).toUpperCase()}.`).join(" ")}`},mo=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,mn=t=>/[.?!]$/.test(t)?t:`${t}.`,fn=t=>{let e=mo(hn(t.authors).map(bo)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),s=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=[],l=s?[{text:`${mn(s)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)r.push({text:`${mn(e)} (n.d.). `},...l);else if(l.length){let[c,...a]=l;r.push({...c,text:c.text.replace(/ $/,"")},{text:" (n.d.). "},...a)}else r.push({text:"(n.d.). "});return r.push({text:`Retrieved ${n}, from ${t.url}`}),r},Se=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=gn[t.licence],s=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&s.push({text:` by ${hn(t.authors).join(", ")}`}),e&&t.bookTitle&&s.push({text:", from "},{text:t.bookTitle,italic:!0}),s.push({text:`, ${t.url}`}),n?s.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&s.push({text:`, is licensed under ${t.licence}`}),s.push({text:"."}),s},Me=t=>t.map(e=>e.text).join(""),He=t=>gn[t]?.name??t,ce=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],yn=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},go=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function wn(t,e,n,s=0){let r=e!=="book"&&t.chapter&&t.styles.chapter,l=r?t.chapter:t.book,c=r?t.styles.chapter:t.styles.book,a=e==="paragraph"&&r?s:0,o=a?`${l.URL}#p${a}`:l.URL,d=go(n),u={};for(let[m]of ce)u[m]=(c[m]??[]).map(f=>({...f,text:f.text.replaceAll("{accessed}",d).replace(l.URL,a?`${o} (para. ${a})`:o)}));return{item:{...l,id:o,URL:o,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...a?{note:`para. ${a}`}:{}},styles:u}}var It=t=>t?.["date-parts"]?.[0]??[],xt=t=>String(t??"").padStart(2,"0"),xn=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),ho=t=>{let e=r=>r.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),s=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(r=>r.length>3)??"");return`${n}${It(t.issued)[0]??""}${s}`.toLowerCase()||"citation"},fo={chapter:"incollection",book:"book",report:"techreport"},Fe=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function vn(t){let[e,n,s]=It(t.issued),[r,l,c]=It(t.accessed),a=u=>u?Fe(u):void 0,d=[["author",t.author?.map(u=>u.literal?`{${Fe(u.literal)}}`:Fe(xn(u))).join(" and ")],["title",a(t.title)],["booktitle",t.type==="chapter"?a(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",a(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&s?`${e}-${xt(n)}-${xt(s)}`:void 0],["url",t.URL],["urldate",r?`${r}-${xt(l)}-${xt(c)}`:void 0],["doi",t.DOI],["language",a(t.language)],["note",a(t.note)],["keywords",a(t.keyword)],["abstract",a(t.abstract)]].filter(([,u])=>u).map(([u,p])=>`  ${u} = {${p}}`).join(`,\n`);return`@${fo[t.type]??"misc"}{${ho(t)},\n${d}\n}\n`}var yo={chapter:"CHAP",book:"BOOK",report:"RPRT"};function En(t){let[e,n,s]=It(t.issued),[r,l,c]=It(t.accessed);return[["TY",yo[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(o=>["AU",xn(o)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${xt(n)}/${xt(s)}`:void 0],["UR",t.URL],["Y2",r?`${r}/${xt(l)}/${xt(c)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(o=>["KW",o]),["N1",t.note]].filter(([,o])=>o).map(([o,d])=>`${o}  - ${d.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var kn=t=>JSON.stringify([t],null,2)+`\n`;var lt=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},wo=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},ue=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",c=b=>{let $=b?.userMessage,M=typeof $=="string"?$.trim():"";return M?M.slice(0,200):null},a=()=>{if(document.getElementById(e))return;let b=document.createElement("style");b.id=e,b.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(b)},o=(b,$,M,h=!1)=>{let L=document.createElement("div");L.className="tb-sg-field";let R=document.createElement("label");if(R.setAttribute("for",b),R.textContent=$,h){let O=document.createElement("span");O.className="tb-sg-opt",O.textContent=" (optional)",R.append(O)}let T=document.createElement("p");return T.className="tb-sg-err",T.id=b+"-err",M.id=b,!h&&!M.readOnly&&(M.required=!0),L.append(R,M,T),{wrap:L,control:M,err:T,hintId:null}},d=b=>{let $=[];b.err.textContent&&$.push(b.err.id),b.hintId&&$.push(b.hintId),$.length?b.control.setAttribute("aria-describedby",$.join(" ")):b.control.removeAttribute("aria-describedby")},u=(b,$)=>{b.control.setAttribute("aria-invalid","true"),b.err.textContent=$,d(b)},p=b=>{b.control.hasAttribute("aria-invalid")&&(b.control.removeAttribute("aria-invalid"),b.err.textContent="",d(b))},m=null,f=(b,$,M,h)=>{if(m)return;a();let L=M,R=document.body.style.overflow,T=null,O=!1,D=document.createElement("div");D.id=t;let z=document.createElement("div");z.className="tb-sg-dialog",z.tabIndex=-1,z.setAttribute("role","dialog"),z.setAttribute("aria-modal","true"),z.setAttribute("aria-labelledby",n);let X=document.createElement("div");X.className="tb-sg-head";let at=document.createElement("h2");at.id=n,at.textContent=h?`Note to the authors about \\xB6${h.paragraph}`:"Suggest an edit";let j=document.createElement("button");j.type="button",j.className="tb-sg-close",j.textContent="\\xD7",j.setAttribute("aria-label","Close suggestion form"),X.append(at,j);let K=document.createElement("form");K.noValidate=!0;let nt=document.createElement("p");nt.className="tb-sg-intro",nt.textContent=h?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let dt=document.createElement("blockquote");dt.className="tb-sg-quote",dt.textContent=h?.quote??"";let Y=h?.text??"";dt.hidden=!h?.quote||!!Y;let it=wo(),ot=document.createElement("input");ot.type="text",ot.name="name",ot.autocomplete="name";let P=o("tb-sg-name","Your name",ot),g=document.createElement("p");if(g.className="tb-sg-count",g.id="tb-sg-credit",g.textContent="If the authors accept your suggestion, you\'ll be credited by this name.",P.wrap.append(g),P.hintId=g.id,d(P),it){ot.value=it.name||it.login;let F=document.createElement("p");F.className="tb-sg-count",F.id="tb-sg-who",F.textContent=`Signed in as @${it.login}: GitHub tells you when the authors answer.`,P.wrap.append(F),P.hintId=`${g.id} ${F.id}`,d(P)}let w=document.createElement("input");w.type="text",w.name="path",w.readOnly=!0,w.value=$;let x=o("tb-sg-path","Page you are editing",w),k=document.createElement("textarea");k.name="suggestion",k.rows=6,k.maxLength=5e3,k.value=Y;let I=o("tb-sg-suggestion","Your suggested change",k),N=document.createElement("p");N.className="tb-sg-count",N.id="tb-sg-count",I.hintId=N.id;let B=()=>{let F=5e3-k.value.length;N.textContent=F+" character"+(F===1?"":"s")+" remaining"};B(),d(I),k.addEventListener("input",()=>{B(),p(I)}),I.wrap.append(N);let H=document.createElement("textarea");H.name="reasoning",H.rows=3;let G=o("tb-sg-reasoning","Comment",H,!0);P.control.addEventListener("input",()=>p(P));let V=document.createElement("div");V.className="tb-sg-hp",V.setAttribute("aria-hidden","true");let mt=document.createElement("label");mt.setAttribute("for","tb-sg-website"),mt.textContent="Leave this field empty";let ct=document.createElement("input");ct.type="text",ct.name="website",ct.id="tb-sg-website",ct.tabIndex=-1,ct.autocomplete="off",ct.setAttribute("aria-hidden","true"),V.append(mt,ct);let vt=document.createElement("div");vt.className="tb-sg-actions";let Z=document.createElement("button");Z.type="submit",Z.className="tb-sg-btn",Z.textContent="Send suggestion";let Et=document.createElement("button");Et.type="button",Et.className="tb-sg-quiet",Et.textContent="Cancel",vt.append(Z,Et);let Ct=()=>k.value.replace(/\\s+/g," ").trim()===Y.replace(/\\s+/g," ").trim(),ft=()=>Ct()&&!H.value.trim(),yt=document.createElement("p");yt.className="tb-sg-count",yt.id="tb-sg-why-not",yt.textContent=Y?"Change the text above, or add a comment, to send.":"Describe the change, or add a comment, to send.",Z.setAttribute("aria-describedby",yt.id);let st=()=>{yt.hidden=!ft(),O||(Z.disabled=ft())};k.addEventListener("input",st),H.addEventListener("input",st),K.append(nt,dt,P.wrap,x.wrap,I.wrap,G.wrap,V,yt,vt),st();let Q=document.createElement("div");Q.className="tb-sg-pane",Q.tabIndex=-1,Q.hidden=!0,z.append(X,K,Q),D.append(z);let Ot=()=>{Q.hidden=!0,K.hidden=!1,k.focus()},tt=(F,_,q,U=!1)=>{if(!D.isConnected)return;Q.textContent="";let ut=document.createElement("p");ut.className="tb-sg-pane-title",ut.textContent=F;let rt=document.createElement("p");if(rt.textContent=_,Q.append(ut,rt),q){let pt=document.createElement("a");pt.href=q,pt.target="_blank",pt.rel="noopener",pt.textContent="View your suggestion on GitHub";let qt=document.createElement("p");qt.append(pt),Q.append(qt)}let J=document.createElement("button");J.type="button",J.className=U?"tb-sg-btn":"tb-sg-quiet",J.textContent=U?"Back to my suggestion":"Close",J.addEventListener("click",U?Ot:()=>m?.()),Q.append(J),K.hidden=!0,Q.hidden=!1,Q.focus()},_t=()=>Array.prototype.filter.call(z.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),F=>!F.disabled&&F.tabIndex>=0&&!F.closest("[hidden]")),wt=F=>{if(F.key==="Escape"){F.preventDefault(),m?.();return}if(F.key!=="Tab")return;let _=_t();if(!_.length){F.preventDefault(),z.focus();return}let q=_.indexOf(document.activeElement);F.shiftKey?q<=0&&(F.preventDefault(),_[_.length-1].focus()):(q===-1||q===_.length-1)&&(F.preventDefault(),_[0].focus())};m=()=>{if(m=null,T)try{T.abort()}catch{}document.removeEventListener("keydown",wt,!0),D.remove(),document.body.style.overflow=R,L.isConnected&&L.focus()},D.addEventListener("mousedown",F=>{F.target===D&&m?.()}),j.addEventListener("click",()=>m?.()),Et.addEventListener("click",()=>m?.()),document.addEventListener("keydown",wt,!0);let Pt=()=>{let F=null,_=(q,U)=>{u(q,U),F||(F=q.control)};for(let q of[P,I])p(q);return ot.value.trim()||_(P,"Please add your name."),!k.value.trim()&&!Ct()?_(I,"Please describe the change you would like."):k.value.length>5e3&&_(I,"Please keep the suggestion under 5000 characters."),F&&F.focus(),!F},Lt=F=>{O=F,Z.disabled=F||ft(),Z.textContent=F?"Sending\\u2026":"Send suggestion"};K.addEventListener("submit",F=>{if(F.preventDefault(),O||ft()||!Pt())return;let _=Ct(),q={name:ot.value.trim(),suggestion:(_?H:k).value.trim(),reasoning:_?"":H.value.trim(),path:$,website:ct.value,...h?{paragraph:h.paragraph,quote:h.quote,page:h.page}:{},...it?{identity:it.token}:{}};if(q.website){tt("Thank you","Your suggestion has been received.");return}Lt(!0);let U=T=new AbortController,ut=setTimeout(()=>U.abort(),1e4);Zt(b,JSON.stringify(q),{signal:U.signal,onWait:()=>{clearTimeout(ut),Z.textContent=Vt}}).then(async rt=>{let J=null;try{J=await rt.json()}catch{J=null}if(!rt.ok){let pt=new Error(J?.error||"HTTP "+rt.status);throw pt.userMessage=c(J),pt}return J}).then(rt=>{lt("suggest_edit_submitted",{outcome:"success"});let J=rt?.issueUrl;tt("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof J=="string"?J:null)}).catch(rt=>{lt("suggest_edit_submitted",{outcome:"error"}),tt("That did not go through",rt&&rt.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(ut),T===U&&(T=null),Z.isConnected?Lt(!1):O=!1})}),document.body.style.overflow="hidden",document.body.appendChild(D),ot.focus(),lt(h?"section_note_opened":"suggest_edit_opened")},E=((b,$,M,h)=>{try{f(b,$,M,h)}catch{m=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return E.closeIfOpen=()=>m?.(),E}catch{return null}})(),$n="tb-pedit-style",Ln=()=>{if(document.getElementById($n))return;let t=document.createElement("style");t.id=$n,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},Tn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",Je),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},xo="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",An=t=>(t.textContent??"").replace(/\\s+/g," ").trim(),vo=()=>{let t=window.getSelection?.(),e=t&&!t.isCollapsed?t.toString().replace(/\\s+/g," ").trim():"",n=e?t.anchorNode:null,s=(n instanceof Element?n:n?.parentElement)?.closest("article [data-pnum]");if(!s||s.closest(".popover"))return;let r=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");return{paragraph:Number(s.dataset.pnum),quote:Fn(s),page:r,text:e}},Fn=t=>{let e=An(t);if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},Eo=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(r=>!r.closest(".popover")&&!r.querySelector(":scope > button.tb-pnote"));if(!n.length)return;Ln();let s=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let r of n){let l=Number(r.dataset.pnum),c=Tn();c.className="tb-pnote",c.title=`Note to the authors about \\xB6${l}`,c.querySelector("path").setAttribute("d",xo),c.addEventListener("click",a=>{a.stopPropagation(),me(c,e,`Continue: note on \\xB6${l}`,()=>t({paragraph:l,quote:Fn(r),page:s,text:An(r)},c))}),r.append(c)}},pe=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(pe))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var ko=t=>typeof t.showPopover=="function",be=new Set,Sn=(t,e)=>{let n=t.closest(".tb-header")??t,r=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),l=t.getBoundingClientRect(),c=document.documentElement.clientWidth,a=e.style;a.boxSizing="border-box",a.top=`${Math.max(r.bottom,0)+6}px`,a.maxHeight=`${Math.max(window.innerHeight-Math.max(r.bottom,0)-12,120)}px`;let o=()=>{a.left=`${Math.max(r.left,0)}px`,a.right="auto",a.width=`${Math.min(r.width,c)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return o();a.left="auto",a.right=`${Math.max(c-l.right,0)}px`,a.width="",e.getBoundingClientRect().left<r.left&&o()},De=()=>{for(let t of Array.from(be))Sn(t.button,t.panel)};window.addEventListener("resize",De);window.addEventListener("scroll",De,{passive:!0});var Mn=(t,e)=>{e.hidden=!1,ko(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",be.add({button:t,panel:e}),Sn(t,e))},Hn=t=>{for(let e of Array.from(be))e.panel===t&&be.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Be=(t,e,n,s)=>{let r=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(o=>!o.hidden&&!o.closest("[hidden]")),l={d:null,button:t,panel:e},c={open(){for(let d of Array.from(pe))d!==l&&d.d.close(!1);Mn(t,e),t.setAttribute("aria-expanded","true"),pe.add(l),(n?r()[0]:e.querySelector("input:checked")??r()[0])?.focus()},close(o=!0){e.hidden||(Hn(e),t.setAttribute("aria-expanded","false"),pe.delete(l),o&&t.focus())}};l.d=c,t.addEventListener("click",()=>{if(!e.hidden)return c.close();s?s(c.open):c.open()});let a=o=>{if(o.key==="Escape"&&!e.hidden){o.preventDefault(),o.stopPropagation(),c.close(!0);return}if(!n||e.hidden||!e.contains(o.target))return;let d=r(),u=d.indexOf(document.activeElement),p=m=>{o.preventDefault(),d[(m+d.length)%d.length]?.focus()};o.key==="ArrowDown"?p(u+1):o.key==="ArrowUp"?p(u-1):o.key==="Home"?p(0):o.key==="End"?p(d.length-1):o.key==="Tab"&&c.close(!1)};return e.addEventListener("keydown",a),t.addEventListener("keydown",a),n&&e.addEventListener("click",o=>{let d=o.target.closest(\'[role="menuitem"]\');if(d){if(d.getAttribute("aria-disabled")==="true"){o.preventDefault();return}c.close(!1)}}),c},v=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,l]of Object.entries(e))r==="text"?s.textContent=l:r==="class"?s.className=l:s.setAttribute(r,l);for(let r of n)r!==null&&s.append(r);return s},ge=(t,e,...n)=>{let s=v("dialog",{class:"tb-dialog","aria-label":t}),r=v("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});r.addEventListener("click",()=>s.close()),s.append(r,...n);let l=null;return s.addEventListener("close",()=>{s.remove(),l?l():e.isConnected&&e.focus()}),document.body.append(s),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),{d:s,closeThen:c=>(l=c,s.close())}},Cn=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,Mn(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Hn(e),e.hidden=!1)},4e3))},Bn=(t,e,n)=>{let s=()=>{let r=v("textarea",{readonly:""});r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.append(r),r.select();let l=!1;try{l=document.execCommand("copy")}catch{l=!1}return r.remove(),l};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>s()?e():n()):s()?e():n()},Rn="tb-contribute-explained",Dn=!1,$o=()=>{if(Dn)return!0;try{return localStorage.getItem(Rn)==="1"}catch{return!1}},Nt={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Reword a paragraph where it stands, or tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},Co=["no","one","two","three"],Lo="https://hypothes.is/logout",In=(t,e,n)=>{Dn=!0;try{localStorage.setItem(Rn,"1")}catch{}let s=({title:p,what:m,who:f,account:E,link:b,switchNote:$})=>v("section",{class:"tb-route"},v("h3",{text:p}),v("p",{text:m}),v("p",{},v("strong",{text:"Who sees it: "}),f),v("p",{},v("strong",{text:"Account: "}),E,b?" ":null,b?v("a",{href:b[1],target:"_blank",rel:"noopener noreferrer",text:b[0]}):null),$?v("p",{},`${$} `,v("a",{href:Lo,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),r=v("div",{class:"tb-dialog-row"}),l=document.querySelector(".tb-header"),c=window.tbAnnotations,a=(l?.dataset.routes??"comment").split(" ").filter(p=>p!=="comment"||c).map(p=>p==="comment"&&c?.groupsOnly?"groupComment":p).filter(p=>p in Nt),o=a.includes("edit")||a.includes("note")?"book":"edition",d=ge("How contributing works",t,v("h2",{text:"How contributing works"}),v("p",{text:a.length===1?`There is one way to help with this ${o}: ${Nt[a[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${Co[a.length]??a.length} ways to help with this ${o}. They differ in who sees what you write, and in which account you need.`}),...a.map(p=>s(Nt[p])),v("p",{},v("a",{href:e,text:"More about commenting and contributing"})),...l?.dataset.credits?[v("p",{},v("a",{href:`${l.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],r),u=v("button",{type:"button",class:"tb-btn",text:"Close"});if(u.addEventListener("click",()=>d.d.close()),n){let p=v("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});p.addEventListener("click",()=>d.closeThen(n.run)),r.append(u,p),p.focus()}else r.append(u),u.focus()},me=(t,e,n,s)=>$o()?s():In(t,e,{label:n,run:s}),To=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},Ao=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(l=>l.id===e):void 0;if(n)return Number(n.dataset.pnum);let s=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,r=t.find(l=>{let c=l.getBoundingClientRect();return c.bottom>s+8&&c.top<window.innerHeight});return Number((r??t[0]).dataset.pnum)||0},Fo=(t,e,n)=>{let s=URL.createObjectURL(new Blob([t],{type:e})),r=v("a",{href:s,download:n});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3)},So=(t,e,n,s)=>{let r=t.chapter?Ao():0,l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),c=[...r?[["paragraph",`This paragraph (\\xB6${r})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${l}`]],a=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),o=r&&a?"paragraph":t.chapter?"chapter":"book",d="apa";try{let T=localStorage.getItem("tb-cite-style");T&&ce.some(([O])=>O===T)&&(d=T)}catch{}let u=v("p",{class:"tb-cite-text","aria-live":"polite"}),p=v("span",{class:"tb-cite-said",role:"status"}),m=()=>wn(t,o,new Date,r),f=()=>{p.textContent="",u.textContent="";for(let T of m().styles[d])u.append(T.italic?v("i",{text:T.text}):T.text)},E=(T,O,D,z,X)=>{let at=v("div",{class:"tb-seg"});for(let[j,K]of D){let nt=v("input",{type:"radio",name:T,value:j});nt.checked=z()===j,nt.addEventListener("change",()=>{X(j),f()}),at.append(v("label",{},nt,K))}return v("fieldset",{},v("legend",{text:O}),at)},b=v("button",{type:"button",class:"tb-btn",text:"Copy"});b.addEventListener("click",()=>{Bn(Me(m().styles[d]),()=>p.textContent="Copied",()=>p.textContent="Couldn\'t copy: select the text instead"),lt("citation_copied",{style:d,scope:o})});let $=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",M=[["BibTeX","bib","application/x-bibtex",vn],["RIS","ris","application/x-research-info-systems",En],["CSL-JSON","json","application/vnd.citationstyles.csl+json",kn]],h=v("div",{class:"tb-dialog-row tb-cite-files"},v("span",{class:"tb-cite-said",text:"Download"}));for(let[T,O,D,z]of M){let X=v("button",{type:"button",class:"tb-btn",text:T});X.addEventListener("click",()=>{let{item:at}=m();Fo(z(at),D,`${o==="book"?"book":$}${o==="paragraph"?`-p${r}`:""}.${O}`),lt("citation_downloaded",{format:O,scope:o})}),h.append(X)}let L=He(e.dataset.licence??""),R=v("p",{class:"tb-cite-text"});for(let T of s())R.append(T.italic?v("i",{text:T.text}):T.text);f(),ge("Cite",n,v("h2",{text:"Cite"}),E("tb-cite-scope","What",c,()=>o,T=>o=T),E("tb-cite-style","Style",ce,()=>d,T=>{d=T;try{localStorage.setItem("tb-cite-style",d)}catch{}}),u,v("div",{class:"tb-dialog-row"},p,b),h,v("h3",{text:L?`Attribution (${L})`:"Attribution"}),R)},Mo=(t,e)=>{let n={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:To(),accessed:new Date},s=a=>{let o=v("p",{class:"tb-cite-text"});for(let d of a)o.append(d.italic?v("i",{text:d.text}):d.text);return o},r=(a,o)=>{let d=v("span",{class:"tb-cite-said",role:"status"}),u=v("button",{type:"button",class:"tb-btn",text:"Copy"});return u.addEventListener("click",()=>Bn(Me(o),()=>d.textContent="Copied",()=>d.textContent="Couldn\'t copy: select the text instead")),v("section",{},v("h3",{text:a}),s(o),v("div",{class:"tb-dialog-row"},d,u))},l=yn(document);if(l)return So(l,t,e,()=>Se(n));let c=He(n.licence);ge("Cite this page",e,v("h2",{text:"Cite this page"}),r("APA 7",fn(n)),r(c?`Attribution (${c})`:"Attribution",Se(n)))},Ho=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},Bo=(t,e,n,s)=>{let r=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),c=(o,d,u)=>{let p=r.filter(([m])=>d?.[m]).map(([m,f])=>{let E=v("a",{class:"tb-btn",href:d[m],download:"",text:f});return E.addEventListener("click",()=>lt("download",{format:m,scope:u})),E});return p.length?[v("h3",{text:o}),v("div",{class:"tb-dialog-row tb-cite-files"},...p)]:[]},a=v("button",{type:"button",class:"tb-btn",text:"Markdown"});a.addEventListener("click",s),ge("Download",n,v("h2",{text:"Download"}),...c("This page",t.chapter,"chapter"),...c(`Whole ${l}`,t.book,"book"),v("h3",{text:"Source"}),v("div",{class:"tb-dialog-row tb-cite-files"},a))},Ro=(t,e,n)=>{let s=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&s.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let r=v("p",{class:"tb-panel-note",role:"status"});for(let[l,c,a]of s){let o=v("div",{class:"tb-seg"});for(let[u,p]of a){let m=v("input",{type:"radio",name:`tb-pref-${l}`,value:u});m.checked=e.get(l)===u,m.addEventListener("change",()=>{if(l==="annotations"&&n){if(r.textContent="",u==="on")n.enable();else if(n.disable().reload){let f=v("button",{type:"button",class:"tb-btn",text:"Reload"});f.addEventListener("click",()=>location.reload()),r.append("Highlights hidden. The annotation tab goes away when the page reloads.",f)}return}e.set(l,u),l==="numbers"&&lt("paragraph_numbers_toggled",{to:u})}),o.append(v("label",{},m,p))}let d=v("fieldset",{},v("legend",{text:c}),o);l==="annotations"&&d.append(r),l==="width"&&Do(t,d),t.append(d)}},Do=(t,e)=>{let n=r=>v("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${r}) * var(--tb-size-body) * var(--tb-text-scale))`}),s=()=>{let r=document.querySelector("article");if(!r?.parentElement||t.hidden)return;let l=n("--tb-measure-standard-em"),c=n("--tb-measure-wide-em");r.parentElement.append(l,c);let a=l.getBoundingClientRect().width,o=c.getBoundingClientRect().width;l.remove(),c.remove(),e.hidden=!(o-a>=16)};new MutationObserver(s).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",s)},Re=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Io=t=>{let e=!1,n=()=>{e=!1;let r=t.getBoundingClientRect(),l=document.documentElement.style;l.setProperty("--tb-hdr-h",`${Math.round(r.height)}px`),l.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(r.bottom))}px`)},s=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s),typeof ResizeObserver=="function"&&new ResizeObserver(s).observe(t)},Ie=null;window.addEventListener("popstate",()=>Ie?.(location.hash,!1));var No=(t,e,n,s,r)=>{let l={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:r,track:lt};t.addEventListener("click",o=>{if(o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey){lt("edit_on_github_clicked");return}o.preventDefault(),te({...l,mode:"page",trigger:n})});let c=new Map,a=Array.from(document.querySelectorAll("[data-pnum]")).filter(o=>!o.closest(".popover")&&!o.querySelector(":scope > button.tb-pedit"));a.length&&Ln();for(let o of a){let d=Tn();d.addEventListener("click",u=>{u.stopPropagation(),me(d,s,`Continue: edit \\xB6${o.dataset.pnum}`,()=>te({...l,mode:"paragraph",para:o,trigger:d}))}),o.append(d),c.set(o.dataset.pnum??"",{p:o,b:d})}Ie=(o,d)=>{let u=Bt.exec(o);if(!u)return;let p=u[1]?c.get(u[1]):void 0;te(p?{...l,mode:"paragraph",para:p.p,trigger:p.b,push:d}:{...l,mode:"page",trigger:n,push:d})}},Oo=(t,e,n)=>{t.addEventListener("click",s=>{s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),cn({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:lt}))})},_o=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),s=()=>t.scrollWidth>t.clientWidth+1,r=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,l=r?.querySelector(".home-link")?r:null,c=t.querySelector(".tb-hdr-label"),a=()=>!!c&&getComputedStyle(c).position!=="absolute",o=t.querySelector(".tb-hdr-where"),d=f=>!!f&&f.scrollWidth>f.clientWidth+1,u=f=>!s()&&a()===f&&!d(o)&&!Array.from(o?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(d),p=f=>{l?.classList.toggle("tb-logo-full",f),l?.classList.toggle("tb-logo-icon",!f)},m=()=>{let f=!!e&&!!n&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),f&&(e.hidden=!1,n.hidden=!0),s()&&t.classList.add("tb-hdr-icons"),s()&&(t.classList.add("tb-hdr-tight"),f&&(e.hidden=!0,n.hidden=!1));let E=a();l&&u(E)&&(p(!0),u(E)||p(!1)),De()};if(m(),window.addEventListener("resize",m),document.fonts?.ready.then(m),typeof ResizeObserver=="function"){let f=new ResizeObserver(()=>requestAnimationFrame(m));f.observe(t);let E=t.querySelector(".tb-hdr-actions");E&&f.observe(E)}return m},Po=t=>{let e=o=>t.querySelector(o),n=t.dataset.howTo??"/how-to-comment",s=window,r=e("[data-tb-contribute]"),l=e("[data-tb-more]"),c=o=>{try{o()}catch{}};c(()=>{let o=e("[data-tb-search]"),d=document.querySelector(".search .search-button");!o||!d||(o.addEventListener("click",()=>d.click()),o.hidden=!1)}),c(()=>{let o=e("[data-tb-menu]"),d=document.querySelector(".explorer"),u=d?.querySelector(".mobile-explorer");if(!o||!d||!u)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(o);let m=d.querySelector(".explorer-content");m?.id&&o.setAttribute("aria-controls",m.id),u.tabIndex=-1,u.setAttribute("aria-hidden","true");let f=o.querySelector(".tb-hdr-label"),E=()=>!d.classList.contains("collapsed"),b=()=>{let $=E();o.setAttribute("aria-expanded",String($)),o.classList.toggle("tb-closes",$),f&&(f.textContent=$?"Close menu":"Menu")};new MutationObserver(b).observe(d,{attributes:!0,attributeFilter:["class"]}),o.addEventListener("click",()=>{E()||s.tbAnnotations?.close?.(),u.click()}),document.addEventListener("keydown",$=>{$.key!=="Escape"||!E()||!Re()||(u.click(),o.focus())}),b(),o.hidden=!1}),c(()=>{let o=e("[data-tb-reader]"),d=e("[data-tb-reader-item]"),u=document.querySelector(".sidebar .readermode");if(!o||!d||!u)return;let p=()=>o.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),o.addEventListener("click",()=>u.click()),d.addEventListener("click",()=>u.click()),p(),t.dataset.tbHasReader="1",o.hidden=!1});let a=()=>{lt("annotation_badge_clicked"),s.tbAnnotations.open().then(o=>{o||Cn("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};c(()=>{if(!s.tbAnnotations){let u=e("[data-tb-comment]");if(u&&window.tbCommentsComing){let p=u.querySelector(".tb-mi-t"),m=u.querySelector(".tb-mi-s");p&&(p.textContent=Nt.groupComment.title),m&&(m.textContent="Coming soon for classes"),u.setAttribute("aria-disabled","true"),u.hidden=!1}return}let o=e("[data-tb-annotate]");if(o){let u=o.querySelector(".tb-hdr-label"),p=()=>Re()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),m=()=>{let E=p();o.classList.toggle("tb-closes",E),u&&(u.textContent=E?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",m),window.addEventListener("resize",m);let f=null;o.addEventListener("pointerdown",()=>f=p(),!0),o.addEventListener("click",()=>{let E=f??p();if(f=null,E)return s.tbAnnotations.close?.();let b=document.querySelector(".explorer");b&&!b.classList.contains("collapsed")&&Re()&&b.querySelector(".mobile-explorer")?.click(),me(o,n,"Continue: open annotations",a)}),o.querySelector(".tb-anno-count")||o.append(v("span",{class:"tb-anno-count"})),o.hidden=!1}let d=e("[data-tb-comment]");if(d){if(d.addEventListener("click",a),s.tbAnnotations.groupsOnly){let u=d.querySelector(".tb-mi-t"),p=d.querySelector(".tb-mi-s");u&&(u.textContent=Nt.groupComment.title),p&&(p.textContent="Hypothes.is account \\xB7 only your group sees it")}d.hidden=!1}}),c(()=>{let o=e("#tb-contribute-menu");if(!r||!o)return;Be(r,o,!0,E=>me(r,n,"Continue to Contribute",E)),e("[data-tb-explain]")?.addEventListener("click",()=>In(r,n));let d=e("button.tb-suggest-btn"),u=d?.dataset.endpoint,p=d&&u&&ue?()=>ue(u,d.dataset.path??"",r,vo()):void 0,m=e("a.edit-on-github"),f=m?.dataset.editEndpoint;if(m&&f){if(No(m,f,r,n,p),Bt.test(location.hash)){let E=location.hash,b=window.history.state?.tbEditor===!0;b||window.history.replaceState(window.history.state,"",location.pathname+location.search),Ie?.(E,!b)}}else m?.addEventListener("click",()=>lt("edit_on_github_clicked"));d&&p&&(d.addEventListener("click",p),d.hidden=!1,Eo((E,b)=>ue(u,d.dataset.path??"",b,E),n)),r.hidden=!1}),c(()=>{let o=e("[data-tb-appearance]"),d=e("#tb-appearance");!o||!d||!s.tbPrefs||(Ro(d,s.tbPrefs,s.tbAnnotations),Be(o,d,!1),o.hidden=!1)}),c(()=>{let o=e("#tb-more-menu");if(!l||!o)return;Be(l,o,!0),e("[data-tb-cite]")?.addEventListener("click",()=>Mo(t,l)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let d=e("a.tb-history-link");d?.dataset.revisionEndpoint&&Oo(d,d.dataset.revisionEndpoint,l);let u=e("[data-tb-backlinks]"),p=document.querySelector(".backlinks");u&&(!p||!p.querySelector("a.internal")?(u.setAttribute("aria-disabled","true"),u.append(v("span",{class:"tb-mi-s",text:"No other page links here"}))):u.addEventListener("click",()=>{let b=p.querySelector("h3")??p;b.tabIndex=-1,p.scrollIntoView({block:"start"}),b.focus({preventScroll:!0})}));let m=e("[data-tb-download]"),f=Ho();if(m&&f){let b=m.querySelector(".tb-mi-t");b&&(b.textContent="Download\\u2026")}let E=()=>fetch(m.dataset.tbDownload).then(b=>b.ok?b.blob():Promise.reject(new Error(String(b.status)))).then(b=>{let $=URL.createObjectURL(b),M=v("a",{href:$,download:m.dataset.file??"page.md"});document.body.append(M),M.click(),M.remove(),setTimeout(()=>URL.revokeObjectURL($),1e3)}).catch(()=>Cn("That didn\'t download just now. View source has the same file."));m?.addEventListener("click",()=>f?Bo(f,t,l,E):E()),l.hidden=!1}),c(()=>{_o(t)}),c(()=>{let o=t.parentElement;Io(o?.classList.contains("tb-header-slot")?o:t)})},qo=()=>{try{ue?.closeIfOpen(),Xe(),dn();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",Po(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&bn(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",qo);\n';

// src/components/EditOnGitHub.tsx
var TYPE_LABELS = {
  book: "Book",
  paper: "Paper",
  report: "Report",
  article: "Article"
};
var statsHref = (base, host, page) => `${base}${base.includes("?") ? "&" : "?"}f=is,hostname,${encodeURIComponent(host)}` + (page ? `&f=is,page,${encodeURI(page)}` : "");
var pagePath = (slug) => "/" + (slug === "index" ? "" : slug.endsWith("/index") ? slug.slice(0, -"index".length) : slug);
var defaultOptions = {
  repo: "",
  branch: "main",
  contentDir: "content",
  suggestEndpoint: "",
  editor: true,
  revisionEndpoint: "",
  sourceCommit: "",
  sourceBlobs: {},
  authors: "",
  licence: "",
  howTo: "how-to-comment",
  statsUrl: "",
  statsHost: "",
  type: ""
};
var historyUrl = (slug) => `/.well-known/history/${encodePath(slug)}.json`;
var BOOK_HISTORY_URL = "/.well-known/history.json";
var proposeEndpoint = (suggestEndpoint) => {
  try {
    return new URL("propose-edit", suggestEndpoint).toString();
  } catch {
    return "";
  }
};
var repoPath = (contentDir, relativePath) => [...contentDir.split("/"), ...relativePath.split("/")].filter((seg) => seg !== "" && seg !== ".").join("/");
var encodePath = (path) => path.split("/").map(encodeURIComponent).join("/");
var folderName = (segment) => {
  const words = segment.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};
var rootOf = (slug) => {
  const depth = slug.split("/").length - 1;
  return depth > 0 ? "../".repeat(depth) : "./";
};
var SVG = (d2) => _(
  "svg",
  { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true", focusable: "false" },
  _("path", { d: d2, fill: "currentColor" })
);
var SEARCH = "M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z";
var PENCIL = "M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z";
var MENU = "M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z";
var CLOSE = "M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z";
var BOOK = "M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z";
var COMMENT = "M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z";
var SUBTITLES = {
  edit: "GitHub sign-in \xB7 reviewed before it's published",
  github: "Opens the file on GitHub \xB7 needs a GitHub account",
  note: "No account \xB7 goes to the authors as a GitHub issue, visible on the book's repository, not on this page",
  comment: "Hypothes.is account \xB7 anyone reading the book can see it",
  explain: "Who sees each one, and which account it needs"
};
var EditOnGitHub = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  const Component = ({ fileData, cfg, allFiles }) => {
    const slug = String(fileData.slug ?? "");
    const relativePath = fileData.relativePath;
    const fm = fileData.frontmatter ?? {};
    const hasSource = Boolean(
      opts.repo && fileData.filePath && relativePath && fm.tbBuilderPage !== true
    );
    const path = hasSource ? repoPath(opts.contentDir, relativePath) : "";
    const gh = encodePath(path);
    const sha = opts.sourceCommit || opts.branch;
    const root = rootOf(slug);
    const editEndpoint = hasSource && opts.editor && opts.suggestEndpoint ? proposeEndpoint(opts.suggestEndpoint) : "";
    const blob = hasSource ? opts.sourceBlobs[path] : void 0;
    const editHref = `https://github.com/${opts.repo}/edit/${opts.branch}/${gh}`;
    const hasBookHistory = (allFiles ?? []).some((f2) => f2.slug === "history");
    const historyHref = `https://github.com/${opts.repo}/commits/${opts.branch}/${gh}`;
    const item = (tag, attrs, title, subtitle) => _(
      tag,
      {
        role: "menuitem",
        tabindex: -1,
        ...tag === "button" ? { type: "button" } : {},
        ...attrs,
        class: ["tb-mi", attrs.class].filter(Boolean).join(" ")
      },
      _("span", { class: "tb-mi-t" }, title),
      subtitle ? _("span", { class: "tb-mi-s" }, subtitle) : null
    );
    const away = { target: "_blank", rel: "noopener noreferrer" };
    const btn = (attrs, icon, label) => _(
      "button",
      { type: "button", class: "tb-hdr-btn", hidden: true, ...attrs },
      icon,
      _("span", { class: "tb-hdr-label" }, label)
    );
    const menu = (id, label, ...items) => _("div", { class: "tb-menu", id, role: "menu", "aria-label": label, hidden: true }, ...items);
    const folders = slug.split("/").slice(0, -1);
    const crumbs = folders.map(
      (seg, i2) => _("a", { href: root + folders.slice(0, i2 + 1).join("/") + "/" }, folderName(seg))
    );
    const contribute = [
      hasSource ? editEndpoint ? item(
        "a",
        {
          class: "edit-on-github",
          href: editHref,
          ...away,
          "data-edit-endpoint": editEndpoint,
          "data-path": path,
          "data-repo": opts.repo
        },
        "Edit this page",
        SUBTITLES.edit
      ) : item(
        "a",
        { class: "edit-on-github", href: editHref, ...away },
        "Edit on GitHub \u2197",
        SUBTITLES.github
      ) : null,
      // Hidden until the script arms the form, so it is never a dead control.
      hasSource && opts.suggestEndpoint ? item(
        "button",
        {
          class: "tb-suggest-btn",
          hidden: true,
          "data-endpoint": opts.suggestEndpoint,
          "data-path": path
        },
        "Note to the authors",
        SUBTITLES.note
      ) : null,
      item("button", { "data-tb-comment": "", hidden: true }, "Public comment", SUBTITLES.comment),
      item("button", { "data-tb-explain": "" }, "How contributing works", SUBTITLES.explain)
    ];
    const more = [
      item("button", { "data-tb-cite": "" }, "Cite"),
      item("button", { "data-tb-print": "" }, "Print / save as PDF"),
      // With a revision endpoint the page script opens the History panel; the
      // href stays GitHub's history of the file, the fallback.
      hasSource ? item(
        "a",
        opts.editor && opts.revisionEndpoint && slug ? {
          class: "tb-history-link",
          href: historyHref,
          ...away,
          "data-revision-endpoint": opts.revisionEndpoint,
          "data-history": historyUrl(slug),
          ...hasBookHistory ? { "data-book-history": BOOK_HISTORY_URL } : {},
          "data-path": path
        } : { class: "tb-history-link", href: historyHref, ...away },
        opts.editor && opts.revisionEndpoint && slug ? "Page history" : "Page history \u2197"
      ) : null,
      // The book's /history page (quartz-book writes it), where it has one.
      hasBookHistory && slug !== "history" ? item("a", { class: "tb-book-history", href: `${root}history` }, "Book history") : null,
      item("button", { "data-tb-backlinks": "" }, "What links here"),
      opts.statsUrl && opts.statsHost ? item(
        "a",
        {
          class: "tb-stats-page",
          href: statsHref(opts.statsUrl, opts.statsHost, pagePath(slug)),
          ...away
        },
        "Page statistics \u2197"
      ) : null,
      opts.statsUrl && opts.statsHost && slug === "index" ? item(
        "a",
        { class: "tb-stats-book", href: statsHref(opts.statsUrl, opts.statsHost), ...away },
        "Book statistics \u2197"
      ) : null,
      // Reader mode is a header button; here instead only when the header is short of room.
      item("button", { "data-tb-reader-item": "", hidden: true }, "Reader mode"),
      hasSource ? item(
        "button",
        {
          "data-tb-download": `https://raw.githubusercontent.com/${opts.repo}/${sha}/${gh}`,
          "data-file": path.split("/").pop()
        },
        "Download as Markdown"
      ) : null,
      hasSource ? item(
        "a",
        { href: `https://github.com/${opts.repo}/blob/${sha}/${gh}`, ...away },
        "View source \u2197"
      ) : null
    ];
    return _(
      "div",
      {
        class: "tb-header tb-page-controls",
        "data-book-title": cfg?.pageTitle ?? "",
        "data-page-title": typeof fm.title === "string" ? fm.title : "",
        "data-authors": opts.authors,
        "data-licence": opts.licence,
        "data-how-to": root + opts.howTo,
        // The book's contributors page (quartz-book's gen-contributors), where it has one:
        // the explainer links its "How credit works".
        ...(allFiles ?? []).some((f2) => f2.slug === "community/contributors") ? { "data-credits": `${root}community/contributors` } : {},
        // The ways to contribute this site has, for the explainer on every page:
        // a book's editor and suggest form, or an edition's GitHub link.
        "data-routes": [
          opts.repo ? opts.editor && opts.suggestEndpoint ? "edit" : "github" : null,
          opts.suggestEndpoint ? "note" : null,
          "comment"
        ].filter(Boolean).join(" "),
        // The book's /history page asks the function what is proposed.
        ...slug === "history" && hasBookHistory && opts.revisionEndpoint ? {
          "data-book-history": BOOK_HISTORY_URL,
          "data-revision-endpoint": opts.revisionEndpoint
        } : {},
        ...hasSource ? { "data-source-path": path } : {},
        ...hasSource && opts.sourceCommit ? { "data-source-commit": opts.sourceCommit } : {},
        ...blob ? { "data-source-blob": blob } : {}
      },
      // Quartz's explorer menu, where the explorer is a drawer (a narrow window);
      // Close while the drawer is open. The page script moves it to the row's start.
      btn(
        { "data-tb-menu": "", "aria-expanded": "false" },
        [
          _("span", { class: "tb-ic-open" }, SVG(MENU)),
          _("span", { class: "tb-ic-close" }, SVG(CLOSE))
        ],
        "Menu"
      ),
      _(
        "div",
        { class: "tb-hdr-where" },
        _("a", { class: "tb-hdr-title", href: root }, cfg?.pageTitle ?? ""),
        TYPE_LABELS[opts.type] ? _("span", { class: "tb-type-badge" }, TYPE_LABELS[opts.type]) : null,
        crumbs.length ? _("nav", { class: "tb-hdr-crumbs", "aria-label": "Breadcrumb" }, ...crumbs) : null
      ),
      _(
        "div",
        { class: "tb-hdr-actions" },
        btn(
          { "data-tb-search": "", "aria-keyshortcuts": "Control+K Meta+K" },
          SVG(SEARCH),
          "Search"
        ),
        _(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            {
              "data-tb-contribute": "",
              "aria-haspopup": "menu",
              "aria-expanded": "false",
              "aria-controls": "tb-contribute-menu"
            },
            SVG(PENCIL),
            "Contribute \u25BE"
          ),
          menu("tb-contribute-menu", "Contribute", ...contribute)
        ),
        btn(
          { "data-tb-annotate": "" },
          [
            _("span", { class: "tb-ic-open" }, SVG(COMMENT)),
            _("span", { class: "tb-ic-close" }, SVG(CLOSE))
          ],
          "Annotate"
        ),
        btn({ "data-tb-reader": "", "aria-pressed": "false" }, SVG(BOOK), "Reader mode"),
        _(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            {
              "data-tb-appearance": "",
              "aria-expanded": "false",
              "aria-controls": "tb-appearance"
            },
            _("span", { class: "tb-hdr-glyph", "aria-hidden": "true" }, "Aa"),
            "Appearance"
          ),
          _("div", {
            class: "tb-panel",
            id: "tb-appearance",
            role: "dialog",
            "aria-label": "Appearance",
            hidden: true
          })
        ),
        _(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            {
              "data-tb-more": "",
              "aria-haspopup": "menu",
              "aria-expanded": "false",
              "aria-controls": "tb-more-menu"
            },
            _("span", { class: "tb-hdr-glyph", "aria-hidden": "true" }, "\u22EF"),
            "More"
          ),
          menu("tb-more-menu", "More", ...more)
        ),
        _("span", { class: "tb-hdr-status", role: "status" })
      ),
      // Without scripts the menus can't open, and editing and a page's history
      // need them: the book's /history page, which works without, is the link.
      hasSource && hasBookHistory && slug !== "history" ? _(
        "noscript",
        null,
        _("a", { class: "tb-hdr-plain", href: `${root}history` }, "Book history")
      ) : null
    );
  };
  const iconsOnly = (scope) => `
${scope} .tb-hdr-where, ${scope} .tb-hdr-actions { gap: 0.15rem; }
${scope} .tb-hdr-where { min-width: 2.5rem; }
${scope} .tb-hdr-crumbs { display: none; }
${scope} .tb-hdr-btn { padding: 0.3rem 0.35rem; }
${scope} .tb-hdr-label {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
}
${scope} .tb-hdr-wrap { position: static; }
${scope} .tb-menu, ${scope} .tb-panel { left: 0; right: 0; width: auto; max-width: none; }`;
  Component.css = `
/* Sticky across the whole centre column: the header's wrappers stop being boxes,
   so its containing block is .center, not the short .page-header. */
.center > .page-header,
.center > .page-header > .popover-hint { display: contents; }
/* In the "book" frame (src/frames) the header's grid cell is what sticks; on a
   page in another frame the header sticks by itself, inside the centre column. */
.tb-header {
  position: sticky;
  top: 0;
  z-index: 2;
  /* Its own width decides icons-only: a phone, or a centre column squeezed by the
     open annotation sidebar. */
  container: tb-header / inline-size;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: var(--tb-header-h, 3.25rem);
  margin: 0 0 1.5rem;
  padding: 0.4rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--tb-border, var(--lightgray));
  background: var(--tb-bg, var(--light));
  font-family: var(--tb-font-ui, sans-serif);
  font-size: var(--tb-size-controls, 0.85rem);
  line-height: 1.3;
}
/* Stacking: the sidebars' content (the explorer, Backlinks, the graph) goes under
   the sticky header (z-index 2); while one of Quartz's overlays they hold is open
   (search, the graph's full view, the phone menu) that sidebar goes above it. On a
   phone the sidebars are static, so they get a position here to make that stack.
   Quartz's own rules are .page > #quartz-body .sidebar.left/.right: these match
   their weight and come later. */
.page > #quartz-body > .sidebar.left,
.page > #quartz-body > .sidebar.right { z-index: 1; }
/* The right sidebar's empty padding lies over the paragraphs' right margin, where
   the pencil and the note button sit (on a 1280px window, half of each was under
   it and couldn't be clicked): only its content takes the pointer. */
.page > #quartz-body > .sidebar.right { pointer-events: none; }
.page > #quartz-body > .sidebar.right > * { pointer-events: auto; }
.page > #quartz-body > .sidebar:has(.search-container.active, .global-graph-outer.active),
html.mobile-no-scroll .page > #quartz-body > .sidebar.left { z-index: 3; }
@media (max-width: 800px) {
  .page > #quartz-body > .sidebar.left,
  .page > #quartz-body > .sidebar.right { position: relative; }
}
/* Search lives in the header now; Quartz's own button stays, unseen, for its overlay. */
.left.sidebar .search > .search-button { display: none; }
.popover .tb-header { display: none; }
.tb-hdr-where { display: flex; align-items: baseline; gap: 0.6rem; min-width: 3.5rem; flex: 1 1 auto; overflow: hidden; }
.tb-hdr-title {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 1rem;
  color: var(--tb-ink, var(--dark));
  text-decoration: none;
}
.tb-hdr-crumbs { display: flex; gap: 0.4rem; min-width: 0; overflow: hidden; white-space: nowrap; color: var(--tb-muted, var(--gray)); }
.tb-hdr-crumbs a { min-width: 0; overflow: hidden; white-space: nowrap; text-wrap: nowrap; text-overflow: ellipsis; color: inherit; text-decoration: none; }
.tb-hdr-crumbs a::before { content: "\u203A"; margin-right: 0.4rem; color: var(--tb-muted, var(--darkgray)); }
.tb-hdr-title:hover, .tb-hdr-crumbs a:hover { color: var(--tb-accent, var(--secondary)); }
/* What kind of text this is (registry type): a quiet pill after the title; the
   title keeps the room, the badge never wraps. */
.tb-type-badge {
  flex: 0 0 auto;
  padding: 0.05rem 0.45rem;
  border: 1px solid var(--lightgray);
  border-radius: 999px;
  font-size: 0.75rem; /* 12px: no text under 12px (batch 2b) */
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--darkgray);
  white-space: nowrap;
}
.tb-hdr-actions { display: flex; align-items: center; gap: 0.25rem; flex: 0 0 auto; }
.tb-hdr-wrap { position: relative; }
.tb-hdr-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 2.25rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid transparent;
  border-radius: 6px;
  background: none;
  color: var(--tb-muted, var(--darkgray));
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.tb-hdr-btn[hidden] { display: none; }
.tb-hdr-btn:hover, .tb-hdr-btn[aria-expanded="true"] {
  border-color: var(--tb-border, var(--lightgray));
  background: var(--tb-bg-soft, var(--lightgray));
  color: var(--tb-ink, var(--dark));
}
.tb-hdr-btn:focus-visible, .tb-mi:focus-visible, .tb-header a:focus-visible, .tb-panel :focus-visible {
  outline: 2px solid var(--tb-accent, var(--secondary));
  outline-offset: 2px;
}
.tb-hdr-glyph { font-weight: 700; min-width: 1rem; text-align: center; }
.tb-anno-count:not(:empty) {
  padding: 0 0.4rem;
  border-radius: 999px;
  background: var(--tb-accent-wash, var(--highlight));
  color: var(--tb-accent, var(--secondary));
  font-size: 0.75rem;
}
.tb-menu, .tb-panel {
  position: absolute;
  right: 0;
  top: calc(100% + 0.35rem);
  z-index: 3;
  width: max-content;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: 0.35rem;
  border: 1px solid var(--tb-border, var(--lightgray));
  border-radius: 10px;
  background: var(--tb-bg, var(--light));
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}
.tb-menu[hidden], .tb-panel[hidden] { display: none; }
/* Open, the menus, the Appearance panel and the status line are in the browser's
   top layer (the page script uses the Popover API where there is one): nothing on
   the page can be drawn over them, whatever its stacking. The script places them
   under their button, and sets these as fixed coordinates. */
.tb-menu:popover-open,
.tb-panel:popover-open,
.tb-hdr-status:popover-open { position: fixed; inset: auto; margin: 0; }
.tb-menu:popover-open, .tb-panel:popover-open { overflow: auto; color: var(--tb-ink, var(--dark)); }
.tb-hdr-status:popover-open { border: 0; }
/* The "book" frame's header row is the page's one bar: the logo, then the header.
   Quartz's own bar (logo, menu button, reader mode in the left sidebar's row on a
   narrow window) is gone: the logo is here, the other two are header buttons, and
   edition-integrations' design CSS takes that sidebar's height away. */
.tb-header-slot {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1.5rem;
  box-sizing: border-box;
}
/* The bar itself runs the full width of the window, whatever the page's side
   padding: drawn behind the row, centred on it (the row spans the page, which is
   centred). The root clips sideways overflow. */
.tb-header-slot::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - 50vw);
  right: calc(50% - 50vw);
  z-index: -1;
  border-bottom: 1px solid var(--tb-border, var(--lightgray));
  background: var(--tb-bg, var(--light));
}
.tb-header-slot > .home-link { flex: 0 0 auto; }
@media (max-width: 800px) { .tb-header-slot { gap: 0.5rem; } }
/* The full wordmark where the row has room, the icon otherwise: the page script
   decides, in the header's fit (tb-logo-full / tb-logo-icon). Until it has,
   home-link's own guess by window width. */
.tb-header-slot.tb-logo-full > .home-link .home-link-full { display: block; }
.tb-header-slot.tb-logo-full > .home-link .home-link-icon { display: none; }
.tb-header-slot.tb-logo-icon > .home-link .home-link-full { display: none; }
.tb-header-slot.tb-logo-icon > .home-link .home-link-icon { display: block; }
/* Where the explorer is a sidebar, the left column starts at the top, level with
   the header row: no empty space where the logo was. Quartz's toolbar row there
   holds only its hidden Search (whose overlay is fixed) and the hidden reader
   mode, so it leaves the flow rather than taking a row and a gap. */
@media not all and (max-width: 800px) {
  .page[data-frame="book"] > #quartz-body > .sidebar.left { padding-top: 1rem; }
  .page[data-frame="book"] > #quartz-body > .sidebar.left > .flex-component:has(.search) { position: absolute; }
}
.tb-header-slot > .tb-header {
  position: static;
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  border-bottom: 0;
  background: none;
}
/* The menu button only where Quartz's explorer is a drawer (Quartz's 800px, which
   edition-integrations' breakpointBand moves to its narrow width), first in the
   row at its left edge, as an icon: the menu's lines, or a cross while open. */
[data-tb-menu] { display: none; flex: 0 0 auto; }
@media (max-width: 800px) {
  [data-tb-menu]:not([hidden]) { display: inline-flex; }
}
[data-tb-menu] .tb-hdr-label {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
}
.tb-ic-open, .tb-ic-close { display: inline-flex; }
.tb-ic-close, .tb-closes > .tb-ic-open { display: none; }
.tb-closes > .tb-ic-close { display: inline-flex; }
.tb-header [data-tb-reader][aria-pressed="true"] { color: var(--tb-accent, var(--secondary)); }
/* Quartz's own reader-mode and explorer-menu buttons stay in the page, out of
   sight, so their scripts keep working: the header's buttons press them. The
   drawer opens below the header, whose menu button closes it. */
.page > #quartz-body > .sidebar .readermode { display: none; }
.page > #quartz-body .explorer .mobile-explorer:not(.hide-until-loaded) {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;
  clip-path: inset(50%); white-space: nowrap; border: 0;
}
.tb-mi {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--tb-ink, var(--dark));
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.tb-mi[hidden] { display: none; }
.tb-mi:hover, .tb-mi:focus { background: var(--tb-bg-soft, var(--lightgray)); }
.tb-mi[aria-disabled="true"] { color: var(--tb-faint, var(--gray)); cursor: default; background: none; }
.tb-mi-t { font-weight: 600; }
.tb-mi-s { max-width: 21rem; color: var(--tb-muted, var(--gray)); font-size: 0.8rem; line-height: 1.35; white-space: normal; }
.tb-panel { width: 17rem; padding: 0.75rem 0.85rem; }
.tb-panel fieldset, .tb-dialog fieldset { margin: 0 0 0.7rem; padding: 0; border: 0; min-width: 0; }
.tb-panel fieldset:last-of-type { margin-bottom: 0; }
.tb-panel legend, .tb-dialog legend { margin-bottom: 0.3rem; padding: 0; font-weight: 700; color: var(--tb-ink, var(--dark)); }
.tb-panel .tb-seg, .tb-dialog .tb-seg { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.tb-panel .tb-seg label, .tb-dialog .tb-seg label {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.25rem 0.55rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 999px;
  color: var(--tb-ink, var(--dark)); cursor: pointer;
}
.tb-panel .tb-seg label:has(input:checked), .tb-dialog .tb-seg label:has(input:checked) {
  border-color: var(--tb-accent, var(--secondary));
  background: var(--tb-accent-wash, var(--highlight));
  color: var(--tb-accent, var(--secondary));
}
.tb-panel .tb-seg input, .tb-dialog .tb-seg input { margin: 0; accent-color: var(--tb-accent, var(--secondary)); }
.tb-panel .tb-panel-note { margin: 0.4rem 0 0; color: var(--tb-muted, var(--gray)); }
.tb-panel .tb-panel-note button { margin-left: 0.3rem; }
.tb-hdr-status:empty { display: none; }
.tb-hdr-status {
  position: absolute; right: 0; top: calc(100% + 0.35rem); padding: 0.35rem 0.7rem; border-radius: 999px;
  background: var(--tb-ink, var(--dark)); color: var(--tb-bg, var(--light));
}
.tb-hdr-plain { margin-left: 0.75rem; color: var(--tb-muted, var(--gray)); font-weight: 600; }
/* A narrow header (a phone, or the centre column beside the open annotation
   sidebar), or one whose controls don't fit: icons only. */
@container tb-header (max-width: 640px) {${iconsOnly("")}
}
/* A phone's header: the book's title before the type badge. With a long title the
   badge left the title a sliver too thin to tap (batch 2b's audit, 360px). */
@container tb-header (max-width: 320px) {
  .tb-type-badge { display: none; }
}
${iconsOnly(".tb-header.tb-hdr-icons")}
.tb-header.tb-hdr-tight .tb-hdr-btn { padding-left: 0.2rem; padding-right: 0.2rem; }
.tb-header.tb-hdr-tight .tb-hdr-where { min-width: 2rem; }
@media (max-width: 800px) {
  .tb-header { gap: 0.4rem; margin-bottom: 1rem; }
}
/* Credit (batch 2a): the role badge, and what quartz-book's builder writes on the page:
   the byline under the title, the chapter's contributors at its foot, the front page's
   credits. */
.tb-role {
  display: inline-block;
  margin: 0 0.15rem;
  padding: 0 0.4rem;
  border: 1px solid var(--tb-border, var(--lightgray));
  border-radius: 999px;
  font-family: var(--tb-font-ui, sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.02em;
  vertical-align: 0.1em;
  white-space: nowrap;
  color: var(--tb-muted, var(--darkgray));
}
.tb-role[data-role="author"] { border-color: var(--tb-accent, var(--secondary)); color: var(--tb-accent, var(--secondary)); }
.tb-role[data-role="editor"] { background: var(--tb-accent-wash, var(--highlight)); border-color: transparent; color: var(--tb-ink, var(--dark)); }
.tb-byline {
  margin: -0.25rem 0 1rem;
  font-family: var(--tb-font-ui, sans-serif);
  font-size: 0.95rem;
  color: var(--tb-muted, var(--darkgray));
  overflow-wrap: anywhere;
}
.tb-byline .tb-sep { margin: 0 0.4rem; color: var(--tb-muted, var(--darkgray)); }
.tb-credits-foot, .tb-credits-block {
  margin: 2rem 0 0;
  padding: 0.75rem 0 0;
  border-top: 1px solid var(--tb-border, var(--lightgray));
  font-family: var(--tb-font-ui, sans-serif);
  font-size: 0.9rem;
  color: var(--tb-muted, var(--darkgray));
  overflow-wrap: anywhere;
}
.tb-credits-block { margin: 0 0 1.5rem; padding: 0.75rem 1rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 10px; }
.tb-credits-block p { margin: 0.2rem 0; }
.tb-credits-foot a, .tb-credits-block a { color: var(--tb-accent, var(--secondary)); }
@media print { .tb-credits-block a, .tb-credits-foot a { color: inherit; } }
/* Tables (batch 2b). In every cell at every width: a line height for short lines,
   cells top-aligned so labels sit beside their first line, and an external link's
   icon kept with its last word (quartz-book's tableLayout wraps them in .tb-nowrap).
   At 640px and under, quartz-book marks each table: .tb-table-stack (a text table
   of up to four columns) becomes blocks, each cell under its column's header,
   drawn from data-label so no text enters the page; .tb-table-scroll (wide or
   numeric) keeps its grid in a scroller with the first column pinned and a fade at
   whichever edge has more. */
article td, article th { line-height: 1.45; vertical-align: top; }
.tb-nowrap { white-space: nowrap; }
@media (max-width: 640px) {
  .table-container.tb-table-stack { overflow: visible; }
  .tb-table-stack table, .tb-table-stack tbody, .tb-table-stack tr, .tb-table-stack td { display: block; width: 100%; box-sizing: border-box; }
  .tb-table-stack table { min-width: 0; margin: 0; border-collapse: collapse; }
  .tb-table-stack thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .tb-table-stack tr { padding: 0.75rem 0; border-bottom: 1px solid var(--tb-border, var(--lightgray)); }
  .tb-table-stack tr:first-child { border-top: 1px solid var(--tb-border, var(--lightgray)); }
  .tb-table-stack td { padding: 0.15rem 0; border: 0; text-align: left; overflow-wrap: anywhere; }
  .tb-table-stack td[data-label]::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 0.05rem;
    font-family: var(--tb-font-ui, sans-serif);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--tb-muted, var(--darkgray));
  }
  .tb-table-stack td:empty, .tb-table-stack td[data-label=""]::before { display: none; }
  .tb-table-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    /* The fade: a shadow at an edge only while there is more that way. */
    background:
      linear-gradient(to right, var(--tb-bg, var(--light)) 30%, transparent) left / 2rem 100% no-repeat local,
      linear-gradient(to left, var(--tb-bg, var(--light)) 30%, transparent) right / 2rem 100% no-repeat local,
      radial-gradient(farthest-side at 0 50%, color-mix(in srgb, var(--tb-ink, #000) 22%, transparent), transparent) left / 0.9rem 100% no-repeat scroll,
      radial-gradient(farthest-side at 100% 50%, color-mix(in srgb, var(--tb-ink, #000) 22%, transparent), transparent) right / 0.9rem 100% no-repeat scroll;
  }
  .tb-table-scroll th:first-child, .tb-table-scroll td:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    background: var(--tb-bg, var(--light));
    box-shadow: 1px 0 0 var(--tb-border, var(--lightgray));
  }
  .tb-table-scroll:focus-visible { outline: 2px solid var(--tb-accent, var(--secondary)); outline-offset: 2px; }
}
/* The book's /history page (quartz-book): the swimlane is a static SVG that
   scales to the column; its lanes and dots take the book's palette. The script's
   timeline below it is one column at any width. */
/* Below ~560px the drawing would shrink its labels past reading: it keeps that width
   and the figure (not the page) scrolls sideways. */
.tb-swim { margin: 1rem 0 1.5rem; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.tb-swimlane { display: block; width: 100%; min-width: 560px; height: auto; font-family: var(--tb-font-ui, sans-serif); font-size: 12px; }
.tb-swim-caption { position: sticky; left: 0; }
.tb-swim-lane { fill: var(--tb-bg-soft, var(--lightgray)); stroke: var(--tb-bg, var(--light)); stroke-width: 2; }
.tb-swim-name, .tb-swim-axis { fill: var(--tb-muted, var(--darkgray)); }
.tb-swim-name { font-weight: 600; }
.tb-swim-release { stroke: var(--tb-accent, var(--secondary)); stroke-width: 2; stroke-dasharray: 4 3; }
.tb-swim-release-label { fill: var(--tb-accent, var(--secondary)); font-weight: 700; }
.tb-swim-dot { fill: var(--tb-accent, var(--secondary)); fill-opacity: 0.75; stroke: var(--tb-bg, var(--light)); stroke-width: 1.5; cursor: pointer; }
.tb-swim-dot[data-lane="0"] { fill: none; stroke: var(--tb-accent, var(--secondary)); stroke-width: 2; }
.tb-swim-dot[data-lane="1"] { fill-opacity: 0.4; }
.tb-swim-dot:focus-visible, .tb-swim-dot[aria-current] { stroke: var(--tb-ink, var(--dark)); stroke-width: 2.5; outline: none; }
/* Declined (batch 2c): a ring with a cross, never filled, so it differs by shape as well as colour. */
.tb-swim-dot.tb-swim-declined { fill: none; fill-opacity: 1; stroke: var(--tb-muted, var(--darkgray)); stroke-width: 1.75; }
.tb-swim-dot.tb-swim-declined:focus-visible, .tb-swim-dot.tb-swim-declined[aria-current] { stroke: var(--tb-ink, var(--dark)); stroke-width: 2.5; }
.tb-bh-declined { border-style: dotted; }
.tb-swim-caption { min-height: 1.4em; margin: 0.4rem 0 0; font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; color: var(--tb-muted, var(--darkgray)); overflow-wrap: anywhere; }
.tb-bh-filters { display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 0.5rem 0; font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; }
.tb-bh-filter { display: flex; flex-direction: column; gap: 0.2rem; min-width: 10rem; flex: 1 1 10rem; color: var(--tb-muted, var(--darkgray)); font-weight: 600; }
.tb-bh-select { min-height: 2.25rem; max-width: 100%; padding: 0.2rem 0.4rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 6px;
  background: var(--tb-bg, var(--light)); color: var(--tb-ink, var(--dark)); font: inherit; font-weight: 400; }
.tb-bh-count { margin: 0.5rem 0; font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; color: var(--tb-muted, var(--darkgray)); }
.tb-bh-list { list-style: none; margin: 0; padding: 0; }
.tb-bh-item { margin: 0; padding: 0.7rem 0; border-bottom: 1px solid var(--tb-border, var(--lightgray)); }
.tb-bh-item p { margin: 0.1rem 0; overflow-wrap: anywhere; }
.tb-bh-summary { font-weight: 600; }
.tb-bh-page, .tb-bh-meta { font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; color: var(--tb-muted, var(--darkgray)); }
.tb-bh-state { display: inline-block; padding: 0 0.4rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 4px; font-size: 0.75rem;
  font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; }
.tb-bh-proposed { border-style: dashed; }
.tb-bh-drafts { background: var(--tb-bg-soft, var(--lightgray)); }
.tb-bh-published { border-color: var(--tb-accent, var(--secondary)); color: var(--tb-accent, var(--secondary)); }
.tb-dialog {
  box-sizing: border-box;
  width: min(34rem, calc(100vw - 2rem));
  max-height: calc(100vh - 4rem);
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--tb-border, var(--lightgray));
  border-radius: 12px;
  background: var(--tb-bg, var(--light));
  color: var(--tb-ink, var(--dark));
  font-family: var(--tb-font-ui, sans-serif);
  font-size: 0.95rem;
  line-height: 1.5;
}
.tb-dialog::backdrop { background: rgba(0, 0, 0, 0.45); }
.tb-dialog h2 { margin: 0 2rem 0.6rem 0; font-size: 1.2rem; }
.tb-dialog h3 { margin: 1rem 0 0.25rem; font-size: 1rem; }
.tb-dialog p { margin: 0.25rem 0; }
.tb-dialog a { color: var(--tb-accent, var(--secondary)); }
.tb-dialog-x {
  position: absolute; top: 0.6rem; right: 0.7rem; border: 0; background: none;
  color: var(--tb-muted, var(--darkgray)); font-size: 1.4rem; line-height: 1; cursor: pointer;
}
.tb-dialog-row { display: flex; align-items: center; justify-content: flex-end; gap: 0.6rem; margin-top: 0.75rem; }
.tb-route { padding-top: 0.1rem; }
.tb-cite-text { padding: 0.6rem 0.75rem; border-radius: 8px; background: var(--tb-bg-soft, var(--lightgray)); overflow-wrap: anywhere; }
.tb-cite-said { color: var(--tb-muted, var(--gray)); }
.tb-cite-files { flex-wrap: wrap; justify-content: flex-start; }
.tb-cite-files .tb-btn { font-weight: 400; }
.tb-btn {
  padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 6px;
  background: var(--tb-bg, var(--light)); color: var(--tb-ink, var(--dark)); font: inherit; font-weight: 600; cursor: pointer;
}
.tb-btn-primary { border-color: var(--tb-accent, var(--secondary)); background: var(--tb-accent, var(--secondary)); color: var(--tb-bg, var(--light)); }
.tb-btn:focus-visible, .tb-dialog-x:focus-visible, .tb-dialog a:focus-visible {
  outline: 2px solid var(--tb-accent, var(--secondary)); outline-offset: 2px;
}
@media print { .tb-header, .tb-dialog { display: none !important; } }
`;
  Component.afterDOMLoaded = controls_inline_default;
  Component.tbHeader = true;
  return Component;
};
var EditOnGitHub_default = EditOnGitHub;

export { EditOnGitHub_default as EditOnGitHub };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map