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
var controls_inline_default = 'var _e=/^\\s{0,3}(```|~~~)/,Nn=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,On=t=>{let e=t.split(`\n`),n=[],s=0;if(e[0]?.trim()==="---"){let i=e.findIndex((u,l)=>l>0&&(u.trim()==="---"||u.trim()==="..."));i>0&&(s=i+1)}let r=0;for(;s<e.length;){let i=e[s];if(!i.trim()){s++;continue}let u=_e.exec(i);if(u||i.trim()==="$$"){let c=u?u[1]:"$$",b=s+1;for(;b<e.length&&!e[b].trim().startsWith(c);)b++;s=b+1;continue}let l=s;for(;l<e.length&&e[l].trim()&&!_e.test(e[l]);)l++;let o=e.slice(s,l).join(`\n`),d=!Nn.test(i);n.push({start:s,text:o,ordinal:d?++r:0}),s=l}return n},_n=t=>Pe(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),Pe=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],Pn=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let r of t)n.set(r,(n.get(r)??0)+1);let s=0;for(let r of e){let i=n.get(r)??0;i>0&&(s++,n.set(r,i-1))}return s/Math.max(t.length,e.length)};var qe=(t,e,n)=>{let s=Pe(e);if(!s.length)return null;let r=null,i=0,u=1/0;for(let l of On(t)){let o=Pn(_n(l.text),s);if(o<.75)continue;let d=l.ordinal?Math.abs(l.ordinal-n):1e6;(o>i+.02||Math.abs(o-i)<=.02&&d<u)&&(r=l,i=Math.max(o,i),u=d)}return r};var St=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let s=t.length,r=e.length;for(;s>n&&r>n&&t[s-1]===e[r-1];)s--,r--;let i=t.slice(0,n).map(c=>({t:"=",v:c})),u=t.slice(s).map(c=>({t:"=",v:c})),l=t.slice(n,s),o=e.slice(n,r),d;if((l.length+1)*(o.length+1)>4e5)d=[...l.map(c=>({t:"-",v:c})),...o.map(c=>({t:"+",v:c}))];else{let c=o.length+1,b=new Uint32Array((l.length+1)*c);for(let x=l.length-1;x>=0;x--)for(let p=o.length-1;p>=0;p--)b[x*c+p]=l[x]===o[p]?b[(x+1)*c+p+1]+1:Math.max(b[(x+1)*c+p],b[x*c+p+1]);d=[];let m=0,f=0;for(;m<l.length&&f<o.length;)l[m]===o[f]?(d.push({t:"=",v:l[m]}),m++,f++):b[(m+1)*c+f]>=b[m*c+f+1]?d.push({t:"-",v:l[m++]}):d.push({t:"+",v:o[f++]});for(;m<l.length;)d.push({t:"-",v:l[m++]});for(;f<o.length;)d.push({t:"+",v:o[f++]})}return[...i,...d,...u]},Ht=t=>t.split(/(\\s+)/).filter(e=>e!==""),Ut=(t,e,n=2)=>{let s=St(t.split(`\n`),e.split(`\n`)),r=[],i=1,u=1,l=null,o=0;return s.forEach((d,c)=>{s.slice(Math.max(0,c-n),c+n+1).some(m=>m.t!=="=")?((!l||d.t==="="&&o>2*n)&&(l={a:i,b:u,ops:[]},r.push(l)),l.ops.push(d),o=d.t==="="?o+1:0):(l=null,o=0),d.t!=="+"&&i++,d.t!=="-"&&u++}),r};var zt="Saving\\u2026 this can take up to a minute.",ce={pollMs:3e3,waitMs:18e4,runningMs:35e3},qn=Math.random().toString(36).slice(2)+Date.now().toString(36);async function Un(t,e){let n=new TextEncoder().encode(`${qn}\n${t}\n${e}`),s=new Uint8Array(await crypto.subtle.digest("SHA-256",n));return Array.from(s.slice(0,16),r=>r.toString(16).padStart(2,"0")).join("")}var zn=t=>new Promise(e=>setTimeout(e,t));async function jt(t,e,{signal:n,onWait:s}={}){let r=await Un(t,e),i=new URL(t);i.searchParams.set("write_key",r);let u=(m={},f)=>{let x=new URL(i);for(let[p,v]of Object.entries(m))x.searchParams.set(p,v);return fetch(x,{method:"POST",headers:{"Content-Type":"application/json"},body:e,signal:f})},l=null,o="network";try{l=await u({},n)}catch{n?.aborted&&(o="timeout")}if(l&&l.status<500&&l.status!==202)return l;if(s?.(),l&&l.status>=500&&(o=String(l.status)),!l||l.status>=500){let m=await u({fallback:o}).catch(()=>null);if(!m)throw new Error("network");if(m.status!==202)return m}let d=new URL("write-status",i);d.searchParams.set("write_key",r);let c=Date.now(),b=!1;for(;Date.now()-c<ce.waitMs;){await zn(ce.pollMs);let m=await fetch(d).catch(()=>null);if(!m)continue;if(m.status!==202)return m;(await m.json().catch(()=>null))?.state==="running"&&!b&&Date.now()-c>ce.runningMs&&(b=!0,await u({fallback:"timeout"}).catch(()=>null))}return new Response(JSON.stringify({error:"timeout",userMessage:"This is taking longer than it should. Nothing you wrote is lost: try again in a few minutes."}),{status:504,headers:{"Content-Type":"application/json"}})}var Et="tb-editor",Ue="tb-editor-style",me="tb-gh-identity",ue=10,pe=500,jn=7.5*60*60*1e3,ze=2e4,Gn=200,Mt=/^#edit(?:-(\\d+))?$/,Wn=t=>t?`#edit-${t}`:"#edit",je={tbEditor:!0},Kn="This page has changes waiting for review; you\\u2019re editing the latest draft.",a=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,i]of Object.entries(e))i!==!1&&(r==="text"?s.textContent=String(i):r==="class"?s.className=String(i):s.setAttribute(r,i===!0?"":String(i)));for(let r of n)r&&s.append(r);return s},Ge="http://www.w3.org/2000/svg",Gt=t=>{let e=document.createElementNS(Ge,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(Ge,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},Ke="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",We="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",Yn="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",Vn="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Kt=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,Gn):null},Zn=()=>{try{let t=sessionStorage.getItem(me);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>jn?null:e}catch{return null}},be=t=>{try{t?sessionStorage.setItem(me,JSON.stringify(t)):sessionStorage.removeItem(me)}catch{}},ge=()=>{if(document.getElementById(Ue))return;let t=`#${Et}`,e=a("style",{id:Ue});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline;\n  min-height: 24px; min-width: 24px; } /* a 24px target at least (batch 2b) */\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},Jn=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),Xn="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",he=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(Xn).forEach(s=>s.remove()),e.querySelectorAll("*").forEach(s=>{for(let r of Array.from(s.attributes)){let i=r.value.trim().toLowerCase();(r.name.startsWith("on")||(r.name==="href"||r.name==="src")&&/^(javascript|data|vbscript):/.test(i))&&s.removeAttribute(r.name)}s.tagName==="A"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},Qn=(t,e)=>{let n=a("div",{class:"tb-ed-diff"}),s=Ut(t,e);if(!s.length)return n.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let r=(i,u)=>{let l=a("div",{class:`tb-ed-line${i==="-"?" tb-ed-del":i==="+"?" tb-ed-add":""}`}),o=a("span");return typeof u=="string"?o.textContent=u||" ":o.append(...u),l.append(a("span",{text:i==="="?" ":i}),o),l};for(let i of s){let u=a("div",{class:"tb-ed-hunk"},a("div",{class:"tb-ed-hh",text:`Line ${i.b}`}));for(let l=0;l<i.ops.length;){let o=i.ops[l];if(o.t==="="){u.append(r("=",o.v)),l++;continue}let d=[],c=[];for(;i.ops[l]?.t==="-";)d.push(i.ops[l++].v);for(;i.ops[l]?.t==="+";)c.push(i.ops[l++].v);let b=Math.min(d.length,c.length),m=d.map((f,x)=>x<b?St(Ht(f),Ht(c[x])):null);d.forEach((f,x)=>{let p=m[x];u.append(r("-",p?p.filter(v=>v.t!=="+").map(v=>v.t==="-"?a("del",{text:v.v}):document.createTextNode(v.v)):f))}),c.forEach((f,x)=>{let p=m[x];u.append(r("+",p?p.filter(v=>v.t!=="-").map(v=>v.t==="+"?a("ins",{text:v.v}):document.createTextNode(v.v)):f))})}n.append(u)}return n},Wt=null,Ye=()=>Wt?.(),Yt=t=>{if(Wt)return;ge();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,s=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),r=t.path.split("/"),i=r.pop(),u=t.para&&Number(t.para.getAttribute("data-pnum"))||0,l=t.mode,o="",d="",c="drafts",b=null,m="",f=Zn(),x=!1,p=!1,v=null,H=null,h=!1,L=window.scrollY,B=Wn(l==="paragraph"?u:0),A=a("div",{id:Et,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),N=a("span",{class:"tb-ed-pill"},Gt(We),a("span",{text:c})),R=a("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},Gt(Yn));R.append(a("span",{text:t.repo.split("/").pop()||t.repo}));for(let w of r)R.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{text:w}));R.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{class:"tb-ed-file",text:i}));let q=a("span",{class:"tb-ed-muted",text:u?` \\xB7 \\xB6${u}`:""});R.append(q,N);let J=a("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),at=a("div",{class:"tb-ed-head"},R,J),U=a("div",{class:"tb-ed-discard",role:"alert",hidden:!0},a("span",{text:"Discard your changes?"})),K=a("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),tt=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});U.append(K,tt);let ut=a("div",{class:"tb-ed-main"}),z=a("div",{class:"tb-ed-inner"}),et=a("p",{class:"tb-ed-note",hidden:!0}),W=a("p",{class:"tb-ed-note",hidden:!0,text:Kn}),Y=a("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),g=a("div",{class:"tb-ed-gate",hidden:!0});z.append(W,et,Y,g),ut.append(z),A.append(at,U,ut);let E=["Edit","Preview","Changes"],y=a("div",{role:"tablist","aria-label":"Editor view"}),$=E.map((w,C)=>a("button",{type:"button",role:"tab",id:`tb-ed-tab-${C}`,"aria-controls":`tb-ed-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:w==="Edit"?"Edit":w==="Preview"?"Preview":"Changes"}));y.append(...$);let D=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),O=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),M=a("div",{class:"tb-ed-bar"},y,a("div",{class:"tb-ed-actions"},D,O)),I=a("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),_=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),X=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),nt=[a("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},_,I,X),a("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),a("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],vt=a("div",{class:"tb-ed-box"},M,...nt),it=a("p",{class:"tb-ed-foot"}),pt=()=>I.value,rt=()=>m,Nt=w=>{$.forEach((C,F)=>{C.setAttribute("aria-selected",F===w?"true":"false"),C.tabIndex=F===w?0:-1,nt[F].hidden=F!==w}),w===1&&ie(),w===2&&(nt[2].textContent="",nt[2].append(Qn(rt(),pt())))};$.forEach((w,C)=>{w.addEventListener("click",()=>Nt(C)),w.addEventListener("keydown",F=>{let S=F.key==="ArrowRight"?1:F.key==="ArrowLeft"?-1:0;if(!S)return;F.preventDefault();let Q=(C+S+$.length)%$.length;Nt(Q),$[Q].focus()})});let yt=0,ie=()=>{let w=nt[1];w.textContent="",w.className="tb-ed-panel tb-ed-preview";let C=a("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});w.append(C);let F=++yt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:Jn(pt()),mode:"markdown"})}).then(S=>S.ok?S.text():Promise.reject(new Error(String(S.status)))).then(S=>{F===yt&&(w.textContent="",w.append(he(S)))}).catch(()=>{F===yt&&(C.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};I.addEventListener("input",()=>{p=pt()!==m,O.disabled=!p});let lt=a("div",{class:"tb-ed-scrim",hidden:!0}),Tt=a("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});lt.append(Tt),A.append(lt);let At=(w,C,F,S=!1)=>{F.id=w;let Q=a("p",{class:"tb-ed-err",id:`${w}-err`}),gt=a("label",{for:w,text:C},S?a("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:a("div",{class:"tb-ed-field"},gt,F,Q),control:F,err:Q}},T=At("tb-ed-msg","What did you change, and why?",a("textarea",{rows:2,maxlength:pe,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));T.wrap.append(a("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let j=At("tb-ed-desc","Extended description",a("textarea",{rows:3,maxlength:5e3}),!0),P=a("div",{class:"tb-ed-who"}),bt=a("div",{class:"tb-ed-what"},Gt(We)),V=a("span");bt.append(V);let ot=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),Z=a("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),dt=a("form",{novalidate:!0},a("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),T.wrap,j.wrap,P,bt,a("div",{class:"tb-ed-row"},ot,Z)),st=a("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});Tt.append(dt,st);let Ot=()=>{if(P.textContent="",f){let w=a("img",{src:`https://avatars.githubusercontent.com/u/${f.id}?s=56`,alt:""}),C=a("button",{type:"button",class:"tb-ed-link",text:"Sign out"});C.addEventListener("click",()=>{f=null,be(null),Ot()}),P.append(w,a("span",{},"Signed in as ",a("strong",{text:`@${f.login}`})," \\u2014 this edit will be credited to your GitHub account."),C)}else P.append(Me(),a("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Me=()=>{let w=a("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},Gt(Vn),"Sign in with GitHub");return w.addEventListener("click",()=>Mn(w)),w},Hn=()=>{g.textContent="";let w=Me(),C=a("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let F=a("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});F.addEventListener("click",()=>{Pt(),t.suggest()}),C.append(F," instead: it needs no account.")}else C.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");g.append(a("h2",{text:"Sign in to edit"}),a("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),a("p",{},w),C),Y.hidden=!0,g.hidden=!1,w.focus()},Be=w=>{if(w.origin!==n)return;let C=w.data;if(!(!C||C.type!=="tb-github-identity")){if(v=null,C.error||typeof C.token!="string"||typeof C.login!="string"){t.track("github_signin",{outcome:C.error==="denied"?"cancelled":"error"});return}if(f={token:C.token,login:C.login,id:Number(C.id)||0,name:C.name??"",at:Date.now()},be(f),t.track("github_signin",{outcome:"success"}),!h)return Oe();Ot(),lt.hidden||T.control.focus()}},Mn=w=>{let C=`${s}?origin=${encodeURIComponent(location.origin)}`;v=window.open(C,"tb-github-signin","popup,width=560,height=720"),!v&&!w.parentElement?.querySelector(".tb-ed-err")&&w.after(a("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Be);let Bn=(w,C)=>{w.control.setAttribute("aria-invalid","true"),w.control.setAttribute("aria-describedby",w.err.id),w.err.textContent=C},Re=w=>{w.control.removeAttribute("aria-invalid"),w.control.removeAttribute("aria-describedby"),w.err.textContent=""};T.control.addEventListener("input",()=>Re(T));let Rn=()=>{V.textContent="",V.append("This creates a new branch and opens a proposal to merge it into ",a("code",{text:c}),". Nothing changes in the book until an editor accepts it."),Ot(),dt.hidden=!1,st.hidden=!0,lt.hidden=!1,T.control.focus()},le=()=>{lt.hidden=!0,O.focus()};O.addEventListener("click",Rn),ot.addEventListener("click",le),lt.addEventListener("mousedown",w=>{w.target===lt&&!x&&le()});let de=(w,C,F,S)=>{if(!A.isConnected)return;st.textContent="",st.append(a("h2",{text:w}),a("p",{text:C})),F&&st.append(a("p",{},a("a",{href:F.href,target:"_blank",rel:"noopener",text:F.text})));let Q=a("button",{type:"button",class:`tb-ed-btn${S?" tb-ed-primary":""}`,text:S?"Back to my edit":"Close"});Q.addEventListener("click",S?()=>{st.hidden=!0,dt.hidden=!1,Z.focus()}:()=>_t(!0)),st.append(a("div",{class:"tb-ed-row"},Q)),dt.hidden=!0,st.hidden=!1,st.focus()};dt.addEventListener("submit",w=>{if(w.preventDefault(),x)return;let C=null;Re(T);let F=T.control.value.trim().length;if(F<ue||F>pe?(Bn(T,F<ue?`Please say what you changed and why, in at least ${ue} characters.`:`Please keep it under ${pe} characters.`),C=T.control):f||(C=P.querySelector("button")),C){C.focus();return}let S={mode:l,path:t.path,baseSha:d,title:l==="paragraph"&&u?`Edit \\xB6${u} of ${i}`:`Update ${i}`,summary:T.control.value.trim().replace(/\\s+/g," "),description:j.control.value.trim()};l==="page"?S.content=pt():(S.startLine=b.start,S.original=b.text,S.replacement=pt(),u&&(S.paragraph=u)),S.identity=f.token,x=!0,Z.disabled=!0,Z.textContent="Proposing\\u2026";let Q=H=new AbortController,gt=setTimeout(()=>Q.abort(),ze);jt(t.endpoint,JSON.stringify(S),{signal:Q.signal,onWait:()=>{clearTimeout(gt),Z.textContent=zt}}).then(async G=>{let qt=null;try{qt=await G.json()}catch{qt=null}if(G.status===401&&f&&(f=null,be(null),Ot()),!G.ok)throw Object.assign(new Error(String(G.status)),{userMessage:Kt(qt)});return qt}).then(G=>{p=!1,G.fallback&&typeof G.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:l}),de("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:G.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:l}),de("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof G.prUrl=="string"?{href:G.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(G=>{t.track("page_edit_submitted",{outcome:"error",mode:l}),de("That did not go through",G&&G.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(gt),H===Q&&(H=null),x=!1,Z.disabled=!1,Z.textContent="Propose changes"})});let In=w=>Array.from(w.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]")),Ie=w=>{if(w.key==="Escape"){w.preventDefault(),lt.hidden?Ft():x||(!st.hidden&&dt.hidden&&!p?_t(!0):le());return}if(w.key!=="Tab")return;let C=lt.hidden?A:Tt,F=In(C);if(!F.length){w.preventDefault(),C.focus();return}let S=F.indexOf(document.activeElement);(w.shiftKey?S<=0:S===-1||S===F.length-1)&&(w.preventDefault(),F[w.shiftKey?F.length-1:0].focus())},De=w=>{p&&(w.preventDefault(),w.returnValue="")},_t=(w=!1)=>{if(!w&&p)return Ft();p=!1,Mt.test(location.hash)?history.back():Pt()},Ne=()=>{if(!Mt.test(location.hash)){if(p)return history.pushState(je,"",B),Ft();Pt()}},Pt=()=>{Wt=null,H?.abort(),v?.close(),document.removeEventListener("keydown",Ie,!0),window.removeEventListener("message",Be),window.removeEventListener("beforeunload",De),window.removeEventListener("popstate",Ne),A.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,L)},Ft=()=>{if(!p)return _t(!0);U.hidden=!1,tt.focus()};K.addEventListener("click",()=>_t(!0)),tt.addEventListener("click",()=>{U.hidden=!0,I.focus()}),J.addEventListener("click",Ft),D.addEventListener("click",Ft),document.addEventListener("keydown",Ie,!0),window.addEventListener("beforeunload",De),window.addEventListener("popstate",Ne),Wt=Pt,t.push!==!1&&history.pushState(je,"",B),document.body.style.overflow="hidden",document.body.append(A),J.focus(),t.track("page_editor_opened",{mode:l});let Dn=w=>{Y.textContent="",Y.removeAttribute("class"),Y.append(w+" ",a("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},Oe=()=>{if(!f)return Hn();h=!0,g.hidden=!0,Y.hidden=!1;let w=new AbortController,C=setTimeout(()=>w.abort(),ze);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:w.signal}).then(async F=>{let S=null;try{S=await F.json()}catch{S=null}if(!F.ok)throw Object.assign(new Error(String(F.status)),{userMessage:Kt(S)});return S}).then(F=>{if(A.isConnected){if(typeof F?.content!="string"||typeof F.sha!="string")throw new Error("bad source");if(o=F.content,d=F.sha,c=typeof F.branch=="string"?F.branch:c,N.lastChild.textContent=c,W.hidden=!t.builtBlob||t.builtBlob===d,l==="paragraph"&&(b=t.para?qe(o,t.para.textContent??"",u):null,b||(l="page",q.textContent="",et.textContent=`We couldn\\u2019t find \\xB6${u} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,et.hidden=!1)),l==="paragraph"&&b){vt.classList.add("tb-ed-para");let S=o.split(`\n`),Q=b.text.split(`\n`).length,gt=S.slice(Math.max(0,b.start-3),b.start).join(`\n`).trim(),G=S.slice(b.start+Q,b.start+Q+3).join(`\n`).trim();_.textContent=gt.length>220?`\\u2026${gt.slice(-220)}`:gt,X.textContent=G.length>220?`${G.slice(0,220)}\\u2026`:G,_.hidden=!gt,X.hidden=!G,m=b.text,it.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else m=o,it.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";I.value=m,Y.remove(),z.append(vt,it),I.setSelectionRange(0,0),I.focus()}}).catch(F=>{A.isConnected&&Dn(F&&F.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(C))};Oe()};var wt=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},Vt=(t,e)=>Ht(t).map(n=>({v:n,s:{...e}})),kt=(t,e={})=>{let n=[],s={...e},r="",i=()=>{r&&n.push(...Vt(r,s)),r=""},u=l=>!!l&&/[\\p{L}\\p{N}]/u.test(l);for(let l=0;l<t.length;){let o=t.slice(l),d;if(o[0]==="\\\\"&&o.length>1)r+=o[1],l+=2;else if(d=/^`([^`]+)`/.exec(o))i(),n.push(...Vt(d[1],{...s,code:!0})),l+=d[0].length;else if(d=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(o)){i();let c=d[2]??d[1].split("/").pop()??d[1];n.push(...Vt(c,{...s,link:!0})),l+=d[0].length}else if(d=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(o))i(),n.push(...Vt(`(image${d[1]?`: ${d[1]}`:""})`,{...s,i:!0})),l+=d[0].length;else if(d=/^\\[\\^([^\\]]+)\\]/.exec(o))i(),n.push({v:d[1],s:{...s,sup:!0}}),l+=d[0].length;else if(d=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(o))i(),n.push(...kt(d[1],{...s,link:!0})),l+=d[0].length;else if(d=/^<\\/?[a-zA-Z][^>]*>/.exec(o))i(),l+=d[0].length;else if(o.startsWith("**")||o.startsWith("__")){let c=o.slice(0,2);s.b||t.indexOf(c,l+2)>l+2?(i(),s.b=!s.b):r+=c,l+=2}else(o[0]==="*"||o[0]==="_")&&!(o[0]==="_"&&u(t[l-1])&&u(t[l+1]))?(s.i||t.indexOf(o[0],l+1)>l+1?(i(),s.i=!s.i):r+=o[0],l+=1):(r+=o[0],l+=1)}return i(),n},fe=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:kt(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:kt(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:kt(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:kt(e[2])}:{kind:"p",runs:kt(t)}:{kind:"blank",runs:[]}},Ve=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=a("code",{},e)),t.s.i&&(e=a("em",{},e)),t.s.b&&(e=a("strong",{},e)),t.s.link&&(e=a("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=a("sup",{},e)),e},ye=(t,e,n)=>{let s=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,r=a("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),i=a("div",{class:"tb-rd-text"});e.marker&&i.append(a("span",{class:"tb-rd-marker",text:e.marker}));let u=null;for(let{run:l,changed:o}of n)o&&t!=="="?(u||(u=a(t==="-"?"del":"ins"),i.append(u)),u.append(Ve(l))):(u=null,i.append(Ve(l)));return a("div",{class:s},r,i)},we=(t,e)=>t.map(n=>({run:n,changed:e})),Bt=(t,e)=>{let n=a("div",{class:"tb-ed-diff tb-rd"}),s=wt(t),r=wt(e);return s===r?(n.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n):(Ut(s,r).forEach((i,u)=>{u>0&&n.append(a("div",{class:"tb-rd-gap","aria-hidden":"true",text:"\\u22EF"}));let l=i.ops;for(let o=0;o<l.length;){let d=l[o];if(d.t==="="){let p=fe(d.v);n.append(ye("=",p,we(p.runs,!1))),o++;continue}let c=[],b=[];for(;l[o]?.t==="-";)c.push(fe(l[o++].v));for(;l[o]?.t==="+";)b.push(fe(l[o++].v));let m=Math.min(c.length,b.length),f=c.map(p=>we(p.runs,!0)),x=b.map(p=>we(p.runs,!0));for(let p=0;p<m;p++){let v=c[p].runs,H=b[p].runs,h=St(v.map(R=>R.v),H.map(R=>R.v)),L=0,B=0,A=[],N=[];for(let R of h)R.t!=="+"&&A.push({run:v[L++],changed:R.t==="-"}),R.t!=="-"&&N.push({run:H[B++],changed:R.t==="+"});f[p]=A,x[p]=N}c.forEach((p,v)=>n.append(ye("-",p,f[v]))),b.forEach((p,v)=>n.append(ye("+",p,x[v])))}}),n)};var $t=t=>(Array.isArray(t)?t:[]).filter(e=>!!e&&Number.isInteger(e.number)&&typeof e.date=="string"&&typeof e.url=="string"&&/^https:\\/\\/github\\.com\\//.test(e.url)&&["edit","note","suggestion"].includes(e.kind)&&Array.isArray(e.comments)),Zt=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},xe=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},xt=(t,e="",n={})=>{try{let s=new URL(t,"https://x.invalid"),r=new URL("history",s);r.searchParams.set("book",s.searchParams.get("book")??""),e&&r.searchParams.set("path",e);for(let[i,u]of Object.entries(n))r.searchParams.set(i,u);return t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},Ze=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(r=>r.toLowerCase());return e.find(r=>r.role&&r.role!=="contributor"&&n.includes(r.who.toLowerCase()))?.role??"contributor"},Ct=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",Je=(t,e)=>{let n=[],s=[...e].sort((r,i)=>i.date.localeCompare(r.date));for(let r of t){for(;s.length&&s[0].date>=r.date;)n.push({release:s.shift()});n.push({entry:r})}for(let r of s)n.push({release:r});return n},Xe=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),Qe=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state);var to="No reason was recorded.",Rt=t=>t.kind==="edit"?"Declined proposed edit":t.kind==="note"?t.paragraph?`Declined note on \\xB6${t.paragraph}`:"Declined note":"Declined suggestion",ve=t=>{let e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"}):t},eo=async(t,e)=>{let n=await fetch(t,{signal:e,credentials:"omit"}),s=await n.json().catch(()=>null);if(!n.ok)throw Object.assign(new Error(`HTTP ${n.status}`),{userMessage:s?.userMessage});return s},Jt=(t,e)=>{let n=a("div",{class:"tb-dc"});n.append(a("div",{class:"tb-dc-who",text:`Proposed by ${t.who?.name??"a reader"} on ${ve(t.proposed)}. Declined${t.decliner?` by ${t.decliner}`:""} on ${ve(t.date)}.`}),a("blockquote",{class:`tb-dc-reason${t.reason?"":" tb-dc-none"}`},a("span",{class:"tb-dc-label",text:"Why it was declined: "}),t.reason??to));let s=a("div",{class:"tb-hi-actions tb-dc-actions"}),r=a("div",{class:"tb-hi-diff tb-dc-diff",hidden:!0});if(t.kind==="edit"&&e){let i=a("button",{type:"button","aria-pressed":"false",text:"Show changes"});i.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0,i.setAttribute("aria-pressed","false");return}i.setAttribute("aria-pressed","true"),r.hidden=!1,r.textContent="",r.append(a("p",{class:"tb-ed-muted",role:"status",text:"Loading what was proposed\\u2026"}));let u=new AbortController,l=setTimeout(()=>u.abort(),2e4);eo(xt(e,"",{change:String(t.number)}),u.signal).then(o=>{let d=o?.files??[];r.textContent="",d.length||r.append(a("p",{class:"tb-ed-muted",text:"The proposal changed no page."}));for(let c of d)r.append(Bt(typeof c.before=="string"?c.before:"",typeof c.after=="string"?c.after:""))}).catch(o=>{r.textContent="",r.append(a("p",{class:"tb-ed-note",role:"alert",text:o?.userMessage||"What was proposed couldn\\u2019t be loaded just now."}))}).finally(()=>clearTimeout(l))}),s.append(i)}if(s.append(a("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",text:`See #${t.number} on GitHub \\u2197`})),n.append(s,r),t.comments.length){let i=a("ol",{class:"tb-dc-comments","aria-label":"Comments from the book\'s people"});for(let u of t.comments)i.append(a("li",{class:"tb-dc-comment"},a("div",{class:"tb-dc-cmeta",text:`${u.name} \\xB7 ${ve(u.date)}`}),a("p",{class:"tb-dc-ctext",text:u.text})));n.append(a("div",{class:"tb-dc-chead",text:"Comments from the book\\u2019s people"}),i)}return n},Xt=t=>`\n${t} .tb-dc { margin-top: 0.4rem; }\n${t} .tb-dc p, ${t} .tb-dc-who, ${t} .tb-dc-cmeta { margin: 0.15rem 0; overflow-wrap: anywhere; }\n${t} .tb-dc-who, ${t} .tb-dc-cmeta, ${t} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }\n${t} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }\n${t} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }\n${t} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }\n${t} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-dc-ctext { white-space: pre-line; }\n${t} .tb-hi-state.tb-hi-declined, ${t} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }\n`;var tn={author:"Author",editor:"Editor",contributor:"Contributor"},Qt=t=>{if(!t||!(t in tn))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=tn[t],e};var en="tb-history-style",no=30,nn=2e4,on="a reader",Ee=t=>`\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n${t} .tb-rd-gap { padding: 0.3rem 0; text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n`,oo=()=>{if(document.getElementById(en))return;let t=`#${Et}.tb-hi`,e=a("style",{id:en});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n${Ee(t)}\n${Xt(t)}\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},ro=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),s=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return s?`Paragraph ${s[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},ht=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},mt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),s=null;try{s=await n.json()}catch{}if(!n.ok){let r=new Error(`HTTP ${n.status}`);throw r.userMessage=Kt(s),r}return s},te=null,rn=()=>te?.(),sn=t=>{if(te||document.getElementById(Et))return;ge(),oo();let e=document.body.style.overflow,n=null,s=0,r=a("div",{id:Et,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),i=a("div",{class:"tb-hi-where",id:"tb-hi-title"},a("span",{class:"tb-hi-name",text:"Page history"}),t.title?a("span",{class:"tb-hi-page",text:t.title}):null),u=a("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},a("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),a("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),l=a("div",{class:"tb-ed-main"}),o=a("div",{class:"tb-ed-inner"});l.append(o),r.append(a("div",{class:"tb-hi-top"},i,u),l);let d=g=>a("p",{class:"tb-ed-muted",role:"status",text:g}),c=(g,E)=>{let y=a("div",{class:"tb-ed-note",role:"alert"});return y.append(a("span",{text:`${g?.userMessage||E} `}),a("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),y},b=()=>{n?.abort();let g=new AbortController;n=g;let E=setTimeout(()=>g.abort(),nn);return{signal:g.signal,done:()=>clearTimeout(E),current:()=>n===g}},m=null,f=[],x=[],p=[],v=null,H=g=>{let E=new URL(t.endpoint,location.href);for(let[y,$]of Object.entries(g))E.searchParams.set(y,$);return E.toString()},h=g=>g.path??m?.source??t.path,L=()=>m?.published[0]??null,B=(g,E)=>{let y=a("p",{class:"tb-hi-meta"});E&&y.append(a("span",{class:"tb-hi-state",text:E})),y.append(`${ht(g.date)} \\xB7 ${g.who}`);let $=Qt(g.role);return $&&y.append(" ",$),g.pr&&t.githubHref&&y.append(" \\xB7 ",a("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${g.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${g.pr}`})),y},A=(g,E,y)=>{if(!E.hidden){E.hidden=!0,y.setAttribute("aria-pressed","false");return}y.setAttribute("aria-pressed","true"),E.hidden=!1,E.textContent="",E.append(d("Loading what changed\\u2026")),t.track("page_revision_opened");let $=new AbortController,D=setTimeout(()=>$.abort(),nn);mt(H({sha:g.sha,path:h(g)}),$.signal).then(O=>{let M=O,I=typeof M.before=="string"?M.before:"",_=typeof M.after=="string"?M.after:"";E.textContent="",M.status==="added"&&E.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let X=typeof M.previousPath=="string"&&M.previousPath!==h(g);X&&E.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${wt(I)===wt(_)?"; its text didn\\u2019t change.":"."}`})),(!X||wt(I)!==wt(_))&&E.append(Bt(I,_))}).catch(O=>{E.textContent="",E.append(c(O,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(D))},N=(g,E)=>{s=l.scrollTop,o.textContent="";let y=a("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});y.addEventListener("click",()=>{n?.abort(),K()});let $=a("div",{});return o.append(y,a("div",{class:"tb-hi-banner",role:"status",text:E}),a("div",{class:"tb-hi-head"},a("h2",{text:g})),$),l.scrollTop=0,y.focus(),$},R=g=>{let E=N(g.summary,`You are reading the version of ${ht(g.date)}.`);E.append(d("Loading this version\\u2026")),t.track("page_version_read");let y=b();mt(H({sha:g.sha,path:h(g)}),y.signal).then($=>{if(!y.current())return;let D=$.html;E.textContent="",E.append(typeof D=="string"&&D?a("div",{class:"tb-ed-panel tb-ed-preview"},he(D)):a("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch($=>{y.current()&&(E.textContent="",E.append(c($,"This version couldn\\u2019t be loaded just now.")))}).finally(y.done)},q=(g,E)=>{let[y,$]=g.date<=E.date?[g,E]:[E,g],D=I=>`the version of ${ht(I.date)}${I===L()?" (the one you read now)":""}`,O=N("Compare versions",`Changes from ${D(y)} to ${D($)}.`);O.append(d("Loading the two versions\\u2026")),t.track("page_versions_compared");let M=b();mt(H({sha:$.sha,base:y.sha,path:h($)}),M.signal).then(I=>{if(!M.current())return;let _=I;O.textContent="",O.append(a("div",{class:"tb-hi-diff"},Bt(typeof _.before=="string"?_.before:"",typeof _.after=="string"?_.after:"")))}).catch(I=>{M.current()&&(O.textContent="",O.append(c(I,"The versions couldn\\u2019t be compared just now.")))}).finally(M.done)},J=(g,E)=>{let y=a("li",{class:"tb-hi-entry"}),$=a("div",{class:"tb-hi-diff",hidden:!0}),D=a("button",{type:"button","aria-pressed":"false",text:"Show changes"});D.addEventListener("click",()=>A(g,$,D));let O=a("button",{type:"button",text:"Read this version"});O.addEventListener("click",()=>R(g));let M=a("button",{type:"button",text:v?v===g?"Cancel compare":"Compare with this":"Compare\\u2026"});M.addEventListener("click",()=>{if(!v)v=g,K();else if(v===g)v=null,K();else{let X=v;v=null,q(X,g)}});let I=a("div",{class:"tb-hi-actions"},D,O,M),_=L();if(!v&&_&&_.sha!==g.sha){let X=a("button",{type:"button",text:"Compare with now"});X.addEventListener("click",()=>q(g,_)),I.append(X)}return y.append(a("p",{class:"tb-hi-msg",text:g.summary}),B(g,E),I,$),y},at=g=>{let E=a("li",{class:"tb-hi-entry"});return E.append(a("p",{class:"tb-hi-msg",text:g.summary||Ct(g)}),B({date:g.date,who:g.who?.name??"A reader",role:Ze(g,[...m?.published??[],...m?.drafts??[]])},`Proposed \\xB7 ${Ct(g)}`),a("div",{class:"tb-hi-actions"},a("a",{href:g.url,target:"_blank",rel:"noopener noreferrer",text:`See #${g.number} on GitHub \\u2197`}))),E},U=g=>a("li",{class:"tb-hi-entry tb-hi-declined-entry"},a("p",{class:"tb-hi-msg",text:g.summary||Rt(g)}),a("p",{class:"tb-hi-meta"},a("span",{class:"tb-hi-state tb-hi-declined",text:"Declined"}),`${Rt(g).replace(/^Declined /,"")} \\xB7 ${ht(g.date)}`),Jt(g,t.endpoint)),K=()=>{if(o.textContent="",!m)return;if(v&&o.append(a("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${ht(v.date)}: pick the other version, below.`})),x.length||m.drafts.length){let y=a("ol",{class:"tb-hi-list"});for(let $ of x)y.append(at($));for(let $ of m.drafts)y.append(J($,"Being edited"));o.append(a("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},a("h2",{id:"tb-hi-editing",text:"Being edited"}),a("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),y))}let g=a("ol",{class:"tb-hi-list"}),E=[...p].sort((y,$)=>$.date.localeCompare(y.date));for(let y of Je(m.published,f)){let $="release"in y?y.release.date:y.entry.date;for(;E.length&&E[0].date>$;)g.append(U(E.shift()));"release"in y?g.append(a("li",{class:"tb-hi-release",role:"separator","aria-label":`${xe(y.release.tag)}, ${ht(y.release.date)}`,text:`${xe(y.release.tag)} \\xB7 ${ht(y.release.date)}`})):g.append(J(y.entry,void 0))}for(let y of E)g.append(U(y));o.append(a("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},a("h2",{id:"tb-hi-published",text:p.length?"Published and declined":"Published"}),a("p",{text:m.published.length?p.length?"What readers have seen, and what the authors declined and why, newest first.":"What readers have seen, newest first.":p.length?"This page has no published versions yet. What the authors declined, and why:":"This page has no published versions yet."}),g)),l.scrollTop=s},tt=g=>{if(g.key==="Escape"){g.preventDefault(),ut();return}if(g.key!=="Tab")return;let E=Array.from(r.querySelectorAll("a[href], button, [tabindex]")).filter($=>!$.disabled&&$.tabIndex>=0&&!$.closest("[hidden]"));if(!E.length)return;let y=E.indexOf(document.activeElement);(g.shiftKey?y<=0:y===-1||y===E.length-1)&&(g.preventDefault(),E[g.shiftKey?E.length-1:0].focus())},ut=()=>{te=null,n?.abort(),document.removeEventListener("keydown",tt,!0),r.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};u.addEventListener("click",ut),document.addEventListener("keydown",tt,!0),te=ut,document.body.style.overflow="hidden",document.body.append(r),u.focus(),t.track("page_history_opened"),o.append(d("Loading this page\\u2019s history\\u2026"));let z=b(),et=t.bookHistoryUrl?mt(t.bookHistoryUrl,z.signal).then(g=>{let E=Zt(g),y=E?.pages.find($=>$.source===t.path)??null;return E&&(f=E.releases),E&&!p.length&&(p=$t(E.declined).filter($=>$.files?.includes(t.path))),y}):Promise.resolve(null),W=xt(t.endpoint,t.path,{declined:"1"}),Y=W?mt(W,z.signal).then(g=>(p=$t(g?.declined),(g?.items??[]).filter(E=>E&&typeof E.url=="string"))).catch(()=>[]):Promise.resolve([]);et.catch(()=>null).then(async g=>{if(g)return g;let E=await mt(t.listUrl,z.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(E)?E:[]).map((y,$,D)=>({sha:y.sha,date:y.date,who:y.who,role:null,summary:ro(y.message??"",$===D.length-1),...y.path!==t.path?{path:y.path}:{}})),drafts:[],releases:{}}}).then(async g=>{m=g;let E=[...g.published,...g.drafts],y=[...new Set(E.filter(M=>M.who===on).map(M=>M.sha))].slice(0,no),$=y.length?mt(H({shas:y.join(",")}),z.signal).then(M=>M?.names??{}).catch(()=>({})):Promise.resolve({}),[D,O]=await Promise.all([$,Y]);for(let M of E){let I=D[M.sha];M.who===on&&typeof I=="string"&&I.trim()&&(M.who=I.trim().slice(0,80))}x=O,z.current()&&K()}).catch(g=>{z.current()&&(o.textContent="",o.append(c(g,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(z.done)};var Lt="http://www.w3.org/2000/svg",an={proposed:"Proposed",drafts:"Being edited",published:"Published",declined:"Declined"},ln="tb-bh-style",so=(t,e)=>{let n=s=>{let r=s?.querySelector("title")?.textContent;if(r){for(let i of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))i.removeAttribute("aria-current");s.setAttribute("aria-current","true"),e.textContent=r}};t.addEventListener("click",s=>n(s.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",s=>n(s.target.closest(".tb-swim-dot")))},ao=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!s)return;let[r,i]=n.map(l=>({t:Date.parse(l.textContent??""),x:Number(l.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(i.t)||i.t<=r.t)return;let u=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2;for(let l of e){let o=Math.min(Math.max(Date.parse(l.date),r.t),i.t),d=document.createElementNS(Lt,"circle");d.setAttribute("class","tb-swim-dot"),d.setAttribute("data-lane","0"),d.setAttribute("cx",(r.x+(o-r.t)/(i.t-r.t)*(i.x-r.x)).toFixed(1)),d.setAttribute("cy",String(u)),d.setAttribute("r","5"),d.setAttribute("tabindex","0");let c=document.createElementNS(Lt,"title");c.textContent=`${l.date} \\xB7 ${Ct(l)}: ${l.summary} (${l.who?.name??"a reader"})`,d.append(c),t.append(d)}},io=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="3"]\');if(n.length<2||!s)return;let[r,i]=n.map(o=>({t:Date.parse(o.textContent??""),x:Number(o.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(i.t)||i.t<=r.t)return;let u=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2,l=new Set(Array.from(t.querySelectorAll(".tb-swim-declined")).map(o=>o.getAttribute("data-number")));for(let o of e){if(l.has(String(o.number)))continue;let d=r.x+(Math.min(Math.max(Date.parse(o.date),r.t),i.t)-r.t)/(i.t-r.t)*(i.x-r.x),c=document.createElementNS(Lt,"g");for(let[x,p]of Object.entries({class:"tb-swim-dot tb-swim-declined","data-lane":"3","data-number":String(o.number),tabindex:"0",fill:"none",stroke:"currentColor","stroke-width":"1.5"}))c.setAttribute(x,p);let b=document.createElementNS(Lt,"title");b.textContent=`${o.date} \\xB7 declined: ${o.summary} (${o.who?.name??"a reader"})`;let m=document.createElementNS(Lt,"circle");m.setAttribute("cx",d.toFixed(1)),m.setAttribute("cy",String(u)),m.setAttribute("r","5");let f=document.createElementNS(Lt,"path");f.setAttribute("d",`M${(d-3).toFixed(1)} ${u-3}L${(d+3).toFixed(1)} ${u+3}M${(d+3).toFixed(1)} ${u-3}L${(d-3).toFixed(1)} ${u+3}`),c.append(b,m,f),t.append(c)}},ke=(t,e,n,s)=>{let r=a("select",{class:"tb-bh-select"});r.append(a("option",{value:"",text:"Any"}));for(let[i,u]of n)r.append(a("option",{value:i,text:u}));return r.addEventListener("change",()=>s(e,r.value)),a("label",{class:"tb-bh-filter"},a("span",{text:t}),r)},dn=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let s=document.querySelector("svg.tb-swimlane");if(s){let h=a("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});s.closest("figure")?.append(h),so(s,h)}let r=new AbortController;setTimeout(()=>r.abort(),2e4);let i=Zt(await mt(e,r.signal).catch(()=>null));if(!i)return;let u=n?xt(n):"";document.getElementById(ln)||document.head.append(a("style",{id:ln,text:Ee(".tb-bh-list")+Xt(".tb-bh-list")}));let l=$t(i.declined),o=u?await mt(xt(n,"",{declined:"1"}),r.signal).then(h=>{let L=h?.declined;return Array.isArray(L)&&(l=$t(L)),(h?.items??[]).filter(B=>B&&typeof B.url=="string")}).catch(()=>[]):[];s&&(ao(s,o),io(s,l));let d=new Map(i.pages.map(h=>[h.source,h])),c=[...o.map(h=>{let L=h.files?.map(B=>d.get(B)).find(Boolean);return{date:h.date,who:h.who?.name??"A reader",role:"contributor",summary:h.summary||Ct(h),state:"proposed",page:L?.source??"",pageTitle:L?.title??"",href:h.url,ref:`#${h.number}`}}),...l.map(h=>{let L=h.files?.map(B=>d.get(B)).find(Boolean);return{date:h.date,who:h.who?.name??"A reader",role:"contributor",summary:h.summary||Rt(h),state:"declined",page:L?.source??"",pageTitle:L?.title??"",href:h.url,ref:`#${h.number}`,declined:h}}),...Xe(i).map(h=>({date:h.date,who:h.who,role:h.role,summary:h.summary,state:h.state,page:h.page.source,pageTitle:h.page.title,href:h.page.path,ref:h.pr?`#${h.pr}`:""}))].sort((h,L)=>L.date.localeCompare(h.date)),b={page:"",person:"",state:""},m=a("ol",{class:"tb-bh-list"}),f=a("p",{class:"tb-bh-count",role:"status"}),x=()=>{m.textContent="";let h=c.filter(L=>Qe(b,L));f.textContent=`${h.length} change${h.length===1?"":"s"}`;for(let L of h){let B=a("p",{class:"tb-bh-meta"},a("span",{class:`tb-bh-state tb-bh-${L.state}`,text:an[L.state]}),` ${ht(L.date)} \\xB7 ${L.who}`),A=Qt(L.role);A&&B.append(" ",A),L.state==="proposed"&&B.append(" \\xB7 ",a("a",{href:L.href,target:"_blank",rel:"noopener noreferrer",text:`${L.ref} on GitHub \\u2197`})),m.append(a("li",{class:"tb-bh-item"},a("p",{class:"tb-bh-summary",text:L.summary}),L.pageTitle?a("p",{class:"tb-bh-page"},L.state==="proposed"||L.state==="declined"?L.pageTitle:a("a",{href:L.href,text:L.pageTitle})):null,B,L.declined?Jt(L.declined,n):null))}},p=(h,L)=>{Object.assign(b,{[h]:L}),x()},v=[...new Set(c.map(h=>h.who))].sort((h,L)=>h.localeCompare(L)),H=i.pages.filter(h=>h.published.length||h.drafts.length).map(h=>[h.source,h.title]);t.append(a("h2",{text:"All changes"}),a("div",{class:"tb-bh-filters"},ke("Chapter","page",H,p),ke("Person","person",v.map(h=>[h,h]),p),ke("State","state",Object.entries(an),p)),f,m),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),x()};var un={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},pn=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),lo=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(s=>`${s.charAt(0).toUpperCase()}.`).join(" ")}`},co=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,cn=t=>/[.?!]$/.test(t)?t:`${t}.`,bn=t=>{let e=co(pn(t.authors).map(lo)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),s=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=[],i=s?[{text:`${cn(s)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)r.push({text:`${cn(e)} (n.d.). `},...i);else if(i.length){let[u,...l]=i;r.push({...u,text:u.text.replace(/ $/,"")},{text:" (n.d.). "},...l)}else r.push({text:"(n.d.). "});return r.push({text:`Retrieved ${n}, from ${t.url}`}),r},Ce=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=un[t.licence],s=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&s.push({text:` by ${pn(t.authors).join(", ")}`}),e&&t.bookTitle&&s.push({text:", from "},{text:t.bookTitle,italic:!0}),s.push({text:`, ${t.url}`}),n?s.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&s.push({text:`, is licensed under ${t.licence}`}),s.push({text:"."}),s},Le=t=>t.map(e=>e.text).join(""),Te=t=>un[t]?.name??t,ee=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],mn=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},uo=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function gn(t,e,n,s=0){let r=e!=="book"&&t.chapter&&t.styles.chapter,i=r?t.chapter:t.book,u=r?t.styles.chapter:t.styles.book,l=e==="paragraph"&&r?s:0,o=l?`${i.URL}#p${l}`:i.URL,d=uo(n),c={};for(let[m]of ee)c[m]=(u[m]??[]).map(f=>({...f,text:f.text.replaceAll("{accessed}",d).replace(i.URL,l?`${o} (para. ${l})`:o)}));return{item:{...i,id:o,URL:o,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...l?{note:`para. ${l}`}:{}},styles:c}}var It=t=>t?.["date-parts"]?.[0]??[],ft=t=>String(t??"").padStart(2,"0"),hn=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),po=t=>{let e=r=>r.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),s=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(r=>r.length>3)??"");return`${n}${It(t.issued)[0]??""}${s}`.toLowerCase()||"citation"},bo={chapter:"incollection",book:"book",report:"techreport"},$e=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function fn(t){let[e,n,s]=It(t.issued),[r,i,u]=It(t.accessed),l=c=>c?$e(c):void 0,d=[["author",t.author?.map(c=>c.literal?`{${$e(c.literal)}}`:$e(hn(c))).join(" and ")],["title",l(t.title)],["booktitle",t.type==="chapter"?l(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",l(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&s?`${e}-${ft(n)}-${ft(s)}`:void 0],["url",t.URL],["urldate",r?`${r}-${ft(i)}-${ft(u)}`:void 0],["doi",t.DOI],["language",l(t.language)],["note",l(t.note)],["keywords",l(t.keyword)],["abstract",l(t.abstract)]].filter(([,c])=>c).map(([c,b])=>`  ${c} = {${b}}`).join(`,\n`);return`@${bo[t.type]??"misc"}{${po(t)},\n${d}\n}\n`}var mo={chapter:"CHAP",book:"BOOK",report:"RPRT"};function yn(t){let[e,n,s]=It(t.issued),[r,i,u]=It(t.accessed);return[["TY",mo[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(o=>["AU",hn(o)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${ft(n)}/${ft(s)}`:void 0],["UR",t.URL],["Y2",r?`${r}/${ft(i)}/${ft(u)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(o=>["KW",o]),["N1",t.note]].filter(([,o])=>o).map(([o,d])=>`${o}  - ${d.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var wn=t=>JSON.stringify([t],null,2)+`\n`;var ct=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},go=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},ne=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",u=p=>{let v=p?.userMessage,H=typeof v=="string"?v.trim():"";return H?H.slice(0,200):null},l=()=>{if(document.getElementById(e))return;let p=document.createElement("style");p.id=e,p.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(p)},o=(p,v,H,h=!1)=>{let L=document.createElement("div");L.className="tb-sg-field";let B=document.createElement("label");if(B.setAttribute("for",p),B.textContent=v,h){let N=document.createElement("span");N.className="tb-sg-opt",N.textContent=" (optional)",B.append(N)}let A=document.createElement("p");return A.className="tb-sg-err",A.id=p+"-err",H.id=p,!h&&!H.readOnly&&(H.required=!0),L.append(B,H,A),{wrap:L,control:H,err:A,hintId:null}},d=p=>{let v=[];p.err.textContent&&v.push(p.err.id),p.hintId&&v.push(p.hintId),v.length?p.control.setAttribute("aria-describedby",v.join(" ")):p.control.removeAttribute("aria-describedby")},c=(p,v)=>{p.control.setAttribute("aria-invalid","true"),p.err.textContent=v,d(p)},b=p=>{p.control.hasAttribute("aria-invalid")&&(p.control.removeAttribute("aria-invalid"),p.err.textContent="",d(p))},m=null,f=(p,v,H,h)=>{if(m)return;l();let L=H,B=document.body.style.overflow,A=null,N=!1,R=document.createElement("div");R.id=t;let q=document.createElement("div");q.className="tb-sg-dialog",q.tabIndex=-1,q.setAttribute("role","dialog"),q.setAttribute("aria-modal","true"),q.setAttribute("aria-labelledby",n);let J=document.createElement("div");J.className="tb-sg-head";let at=document.createElement("h2");at.id=n,at.textContent=h?`Note to the authors about \\xB6${h.paragraph}`:"Suggest an edit";let U=document.createElement("button");U.type="button",U.className="tb-sg-close",U.textContent="\\xD7",U.setAttribute("aria-label","Close suggestion form"),J.append(at,U);let K=document.createElement("form");K.noValidate=!0;let tt=document.createElement("p");tt.className="tb-sg-intro",tt.textContent=h?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let ut=document.createElement("blockquote");ut.className="tb-sg-quote",ut.textContent=h?.quote??"",ut.hidden=!h?.quote;let z=go(),et=document.createElement("input");et.type="text",et.name="name",et.autocomplete="name";let W=o("tb-sg-name","Your name",et),Y=document.createElement("p");if(Y.className="tb-sg-count",Y.id="tb-sg-credit",Y.textContent="If the authors accept your suggestion, you\'ll be credited by this name.",W.wrap.append(Y),W.hintId=Y.id,d(W),z){et.value=z.name||z.login;let T=document.createElement("p");T.className="tb-sg-count",T.id="tb-sg-who",T.textContent=`Signed in as @${z.login}: GitHub tells you when the authors answer.`,W.wrap.append(T),W.hintId=`${Y.id} ${T.id}`,d(W)}let g=document.createElement("input");g.type="text",g.name="path",g.readOnly=!0,g.value=v;let E=o("tb-sg-path","Page you are editing",g),y=document.createElement("textarea");y.name="suggestion",y.rows=6,y.maxLength=5e3;let $=o("tb-sg-suggestion","Your suggested change",y),D=document.createElement("p");D.className="tb-sg-count",D.id="tb-sg-count",$.hintId=D.id;let O=()=>{let T=5e3-y.value.length;D.textContent=T+" character"+(T===1?"":"s")+" remaining"};O(),d($),y.addEventListener("input",()=>{O(),b($)}),$.wrap.append(D);let M=document.createElement("textarea");M.name="reasoning",M.rows=3;let I=o("tb-sg-reasoning","Why",M,!0);W.control.addEventListener("input",()=>b(W));let _=document.createElement("div");_.className="tb-sg-hp",_.setAttribute("aria-hidden","true");let X=document.createElement("label");X.setAttribute("for","tb-sg-website"),X.textContent="Leave this field empty";let nt=document.createElement("input");nt.type="text",nt.name="website",nt.id="tb-sg-website",nt.tabIndex=-1,nt.autocomplete="off",nt.setAttribute("aria-hidden","true"),_.append(X,nt);let vt=document.createElement("div");vt.className="tb-sg-actions";let it=document.createElement("button");it.type="submit",it.className="tb-sg-btn",it.textContent="Send suggestion";let pt=document.createElement("button");pt.type="button",pt.className="tb-sg-quiet",pt.textContent="Cancel",vt.append(it,pt),K.append(tt,ut,W.wrap,E.wrap,$.wrap,I.wrap,_,vt);let rt=document.createElement("div");rt.className="tb-sg-pane",rt.tabIndex=-1,rt.hidden=!0,q.append(J,K,rt),R.append(q);let Nt=()=>{rt.hidden=!0,K.hidden=!1,y.focus()},yt=(T,j,P,bt=!1)=>{if(!R.isConnected)return;rt.textContent="";let V=document.createElement("p");V.className="tb-sg-pane-title",V.textContent=T;let ot=document.createElement("p");if(ot.textContent=j,rt.append(V,ot),P){let dt=document.createElement("a");dt.href=P,dt.target="_blank",dt.rel="noopener",dt.textContent="View your suggestion on GitHub";let st=document.createElement("p");st.append(dt),rt.append(st)}let Z=document.createElement("button");Z.type="button",Z.className=bt?"tb-sg-btn":"tb-sg-quiet",Z.textContent=bt?"Back to my suggestion":"Close",Z.addEventListener("click",bt?Nt:()=>m?.()),rt.append(Z),K.hidden=!0,rt.hidden=!1,rt.focus()},ie=()=>Array.prototype.filter.call(q.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),T=>!T.disabled&&T.tabIndex>=0&&!T.closest("[hidden]")),lt=T=>{if(T.key==="Escape"){T.preventDefault(),m?.();return}if(T.key!=="Tab")return;let j=ie();if(!j.length){T.preventDefault(),q.focus();return}let P=j.indexOf(document.activeElement);T.shiftKey?P<=0&&(T.preventDefault(),j[j.length-1].focus()):(P===-1||P===j.length-1)&&(T.preventDefault(),j[0].focus())};m=()=>{if(m=null,A)try{A.abort()}catch{}document.removeEventListener("keydown",lt,!0),R.remove(),document.body.style.overflow=B,L.isConnected&&L.focus()},R.addEventListener("mousedown",T=>{T.target===R&&m?.()}),U.addEventListener("click",()=>m?.()),pt.addEventListener("click",()=>m?.()),document.addEventListener("keydown",lt,!0);let Tt=()=>{let T=null,j=(P,bt)=>{c(P,bt),T||(T=P.control)};for(let P of[W,$])b(P);return et.value.trim()||j(W,"Please add your name."),y.value.trim()?y.value.length>5e3&&j($,"Please keep the suggestion under 5000 characters."):j($,"Please describe the change you would like."),T&&T.focus(),!T},At=T=>{N=T,it.disabled=T,it.textContent=T?"Sending\\u2026":"Send suggestion"};K.addEventListener("submit",T=>{if(T.preventDefault(),N||!Tt())return;let j={name:et.value.trim(),suggestion:y.value.trim(),reasoning:M.value.trim(),path:v,website:nt.value,...h?{paragraph:h.paragraph,quote:h.quote,page:h.page}:{},...z?{identity:z.token}:{}};if(j.website){yt("Thank you","Your suggestion has been received.");return}At(!0);let P=A=new AbortController,bt=setTimeout(()=>P.abort(),1e4);jt(p,JSON.stringify(j),{signal:P.signal,onWait:()=>{clearTimeout(bt),it.textContent=zt}}).then(async V=>{let ot=null;try{ot=await V.json()}catch{ot=null}if(!V.ok){let Z=new Error(ot?.error||"HTTP "+V.status);throw Z.userMessage=u(ot),Z}return ot}).then(V=>{ct("suggest_edit_submitted",{outcome:"success"});let ot=V?.issueUrl;yt("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof ot=="string"?ot:null)}).catch(V=>{ct("suggest_edit_submitted",{outcome:"error"}),yt("That did not go through",V&&V.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(bt),A===P&&(A=null),it.isConnected?At(!1):N=!1})}),document.body.style.overflow="hidden",document.body.appendChild(R),et.focus(),ct(h?"section_note_opened":"suggest_edit_opened")},x=((p,v,H,h)=>{try{f(p,v,H,h)}catch{m=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return x.closeIfOpen=()=>m?.(),x}catch{return null}})(),xn="tb-pedit-style",En=()=>{if(document.getElementById(xn))return;let t=document.createElement("style");t.id=xn,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},kn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",Ke),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},ho="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",fo=t=>{let e=(t.textContent??"").replace(/\\s+/g," ").trim();if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},yo=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(r=>!r.closest(".popover")&&!r.querySelector(":scope > button.tb-pnote"));if(!n.length)return;En();let s=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let r of n){let i=Number(r.dataset.pnum),u=kn();u.className="tb-pnote",u.title=`Note to the authors about \\xB6${i}`,u.querySelector("path").setAttribute("d",ho),u.addEventListener("click",l=>{l.stopPropagation(),se(u,e,`Continue: note on \\xB6${i}`,()=>t({paragraph:i,quote:fo(r),page:s},u))}),r.append(u)}},oe=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(oe))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var wo=t=>typeof t.showPopover=="function",re=new Set,$n=(t,e)=>{let n=t.closest(".tb-header")??t,r=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),i=t.getBoundingClientRect(),u=document.documentElement.clientWidth,l=e.style;l.boxSizing="border-box",l.top=`${Math.max(r.bottom,0)+6}px`,l.maxHeight=`${Math.max(window.innerHeight-Math.max(r.bottom,0)-12,120)}px`;let o=()=>{l.left=`${Math.max(r.left,0)}px`,l.right="auto",l.width=`${Math.min(r.width,u)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return o();l.left="auto",l.right=`${Math.max(u-i.right,0)}px`,l.width="",e.getBoundingClientRect().left<r.left&&o()},Se=()=>{for(let t of Array.from(re))$n(t.button,t.panel)};window.addEventListener("resize",Se);window.addEventListener("scroll",Se,{passive:!0});var Cn=(t,e)=>{e.hidden=!1,wo(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",re.add({button:t,panel:e}),$n(t,e))},Ln=t=>{for(let e of Array.from(re))e.panel===t&&re.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Ae=(t,e,n,s)=>{let r=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(o=>!o.hidden&&!o.closest("[hidden]")),i={d:null,button:t,panel:e},u={open(){for(let d of Array.from(oe))d!==i&&d.d.close(!1);Cn(t,e),t.setAttribute("aria-expanded","true"),oe.add(i),(n?r()[0]:e.querySelector("input:checked")??r()[0])?.focus()},close(o=!0){e.hidden||(Ln(e),t.setAttribute("aria-expanded","false"),oe.delete(i),o&&t.focus())}};i.d=u,t.addEventListener("click",()=>{if(!e.hidden)return u.close();s?s(u.open):u.open()});let l=o=>{if(o.key==="Escape"&&!e.hidden){o.preventDefault(),o.stopPropagation(),u.close(!0);return}if(!n||e.hidden||!e.contains(o.target))return;let d=r(),c=d.indexOf(document.activeElement),b=m=>{o.preventDefault(),d[(m+d.length)%d.length]?.focus()};o.key==="ArrowDown"?b(c+1):o.key==="ArrowUp"?b(c-1):o.key==="Home"?b(0):o.key==="End"?b(d.length-1):o.key==="Tab"&&u.close(!1)};return e.addEventListener("keydown",l),t.addEventListener("keydown",l),n&&e.addEventListener("click",o=>{let d=o.target.closest(\'[role="menuitem"]\');if(d){if(d.getAttribute("aria-disabled")==="true"){o.preventDefault();return}u.close(!1)}}),u},k=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,i]of Object.entries(e))r==="text"?s.textContent=i:r==="class"?s.className=i:s.setAttribute(r,i);for(let r of n)r!==null&&s.append(r);return s},ae=(t,e,...n)=>{let s=k("dialog",{class:"tb-dialog","aria-label":t}),r=k("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});r.addEventListener("click",()=>s.close()),s.append(r,...n);let i=null;return s.addEventListener("close",()=>{s.remove(),i?i():e.isConnected&&e.focus()}),document.body.append(s),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),{d:s,closeThen:u=>(i=u,s.close())}},vn=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,Cn(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Ln(e),e.hidden=!1)},4e3))},Tn=(t,e,n)=>{let s=()=>{let r=k("textarea",{readonly:""});r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.append(r),r.select();let i=!1;try{i=document.execCommand("copy")}catch{i=!1}return r.remove(),i};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>s()?e():n()):s()?e():n()},An="tb-contribute-explained",Fn=!1,xo=()=>{if(Fn)return!0;try{return localStorage.getItem(An)==="1"}catch{return!1}},Dt={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},vo=["no","one","two","three"],Eo="https://hypothes.is/logout",Sn=(t,e,n)=>{Fn=!0;try{localStorage.setItem(An,"1")}catch{}let s=({title:b,what:m,who:f,account:x,link:p,switchNote:v})=>k("section",{class:"tb-route"},k("h3",{text:b}),k("p",{text:m}),k("p",{},k("strong",{text:"Who sees it: "}),f),k("p",{},k("strong",{text:"Account: "}),x,p?" ":null,p?k("a",{href:p[1],target:"_blank",rel:"noopener noreferrer",text:p[0]}):null),v?k("p",{},`${v} `,k("a",{href:Eo,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),r=k("div",{class:"tb-dialog-row"}),i=document.querySelector(".tb-header"),u=window.tbAnnotations,l=(i?.dataset.routes??"comment").split(" ").filter(b=>b!=="comment"||u).map(b=>b==="comment"&&u?.groupsOnly?"groupComment":b).filter(b=>b in Dt),o=l.includes("edit")||l.includes("note")?"book":"edition",d=ae("How contributing works",t,k("h2",{text:"How contributing works"}),k("p",{text:l.length===1?`There is one way to help with this ${o}: ${Dt[l[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${vo[l.length]??l.length} ways to help with this ${o}. They differ in who sees what you write, and in which account you need.`}),...l.map(b=>s(Dt[b])),k("p",{},k("a",{href:e,text:"More about commenting and contributing"})),...i?.dataset.credits?[k("p",{},k("a",{href:`${i.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],r),c=k("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>d.d.close()),n){let b=k("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});b.addEventListener("click",()=>d.closeThen(n.run)),r.append(c,b),b.focus()}else r.append(c),c.focus()},se=(t,e,n,s)=>xo()?s():Sn(t,e,{label:n,run:s}),ko=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},$o=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(i=>i.id===e):void 0;if(n)return Number(n.dataset.pnum);let s=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,r=t.find(i=>{let u=i.getBoundingClientRect();return u.bottom>s+8&&u.top<window.innerHeight});return Number((r??t[0]).dataset.pnum)||0},Co=(t,e,n)=>{let s=URL.createObjectURL(new Blob([t],{type:e})),r=k("a",{href:s,download:n});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3)},Lo=(t,e,n,s)=>{let r=t.chapter?$o():0,i=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),u=[...r?[["paragraph",`This paragraph (\\xB6${r})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${i}`]],l=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),o=r&&l?"paragraph":t.chapter?"chapter":"book",d="apa";try{let A=localStorage.getItem("tb-cite-style");A&&ee.some(([N])=>N===A)&&(d=A)}catch{}let c=k("p",{class:"tb-cite-text","aria-live":"polite"}),b=k("span",{class:"tb-cite-said",role:"status"}),m=()=>gn(t,o,new Date,r),f=()=>{b.textContent="",c.textContent="";for(let A of m().styles[d])c.append(A.italic?k("i",{text:A.text}):A.text)},x=(A,N,R,q,J)=>{let at=k("div",{class:"tb-seg"});for(let[U,K]of R){let tt=k("input",{type:"radio",name:A,value:U});tt.checked=q()===U,tt.addEventListener("change",()=>{J(U),f()}),at.append(k("label",{},tt,K))}return k("fieldset",{},k("legend",{text:N}),at)},p=k("button",{type:"button",class:"tb-btn",text:"Copy"});p.addEventListener("click",()=>{Tn(Le(m().styles[d]),()=>b.textContent="Copied",()=>b.textContent="Couldn\'t copy: select the text instead"),ct("citation_copied",{style:d,scope:o})});let v=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",H=[["BibTeX","bib","application/x-bibtex",fn],["RIS","ris","application/x-research-info-systems",yn],["CSL-JSON","json","application/vnd.citationstyles.csl+json",wn]],h=k("div",{class:"tb-dialog-row tb-cite-files"},k("span",{class:"tb-cite-said",text:"Download"}));for(let[A,N,R,q]of H){let J=k("button",{type:"button",class:"tb-btn",text:A});J.addEventListener("click",()=>{let{item:at}=m();Co(q(at),R,`${o==="book"?"book":v}${o==="paragraph"?`-p${r}`:""}.${N}`),ct("citation_downloaded",{format:N,scope:o})}),h.append(J)}let L=Te(e.dataset.licence??""),B=k("p",{class:"tb-cite-text"});for(let A of s())B.append(A.italic?k("i",{text:A.text}):A.text);f(),ae("Cite",n,k("h2",{text:"Cite"}),x("tb-cite-scope","What",u,()=>o,A=>o=A),x("tb-cite-style","Style",ee,()=>d,A=>{d=A;try{localStorage.setItem("tb-cite-style",d)}catch{}}),c,k("div",{class:"tb-dialog-row"},b,p),h,k("h3",{text:L?`Attribution (${L})`:"Attribution"}),B)},To=(t,e)=>{let n={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:ko(),accessed:new Date},s=l=>{let o=k("p",{class:"tb-cite-text"});for(let d of l)o.append(d.italic?k("i",{text:d.text}):d.text);return o},r=(l,o)=>{let d=k("span",{class:"tb-cite-said",role:"status"}),c=k("button",{type:"button",class:"tb-btn",text:"Copy"});return c.addEventListener("click",()=>Tn(Le(o),()=>d.textContent="Copied",()=>d.textContent="Couldn\'t copy: select the text instead")),k("section",{},k("h3",{text:l}),s(o),k("div",{class:"tb-dialog-row"},d,c))},i=mn(document);if(i)return Lo(i,t,e,()=>Ce(n));let u=Te(n.licence);ae("Cite this page",e,k("h2",{text:"Cite this page"}),r("APA 7",bn(n)),r(u?`Attribution (${u})`:"Attribution",Ce(n)))},Ao=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},Fo=(t,e,n,s)=>{let r=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],i=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),u=(o,d,c)=>{let b=r.filter(([m])=>d?.[m]).map(([m,f])=>{let x=k("a",{class:"tb-btn",href:d[m],download:"",text:f});return x.addEventListener("click",()=>ct("download",{format:m,scope:c})),x});return b.length?[k("h3",{text:o}),k("div",{class:"tb-dialog-row tb-cite-files"},...b)]:[]},l=k("button",{type:"button",class:"tb-btn",text:"Markdown"});l.addEventListener("click",s),ae("Download",n,k("h2",{text:"Download"}),...u("This page",t.chapter,"chapter"),...u(`Whole ${i}`,t.book,"book"),k("h3",{text:"Source"}),k("div",{class:"tb-dialog-row tb-cite-files"},l))},So=(t,e,n)=>{let s=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&s.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let r=k("p",{class:"tb-panel-note",role:"status"});for(let[i,u,l]of s){let o=k("div",{class:"tb-seg"});for(let[c,b]of l){let m=k("input",{type:"radio",name:`tb-pref-${i}`,value:c});m.checked=e.get(i)===c,m.addEventListener("change",()=>{if(i==="annotations"&&n){if(r.textContent="",c==="on")n.enable();else if(n.disable().reload){let f=k("button",{type:"button",class:"tb-btn",text:"Reload"});f.addEventListener("click",()=>location.reload()),r.append("Highlights hidden. The annotation tab goes away when the page reloads.",f)}return}e.set(i,c),i==="numbers"&&ct("paragraph_numbers_toggled",{to:c})}),o.append(k("label",{},m,b))}let d=k("fieldset",{},k("legend",{text:u}),o);i==="annotations"&&d.append(r),i==="width"&&Ho(t,d),t.append(d)}},Ho=(t,e)=>{let n=r=>k("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${r}) * var(--tb-size-body) * var(--tb-text-scale))`}),s=()=>{let r=document.querySelector("article");if(!r?.parentElement||t.hidden)return;let i=n("--tb-measure-standard-em"),u=n("--tb-measure-wide-em");r.parentElement.append(i,u);let l=i.getBoundingClientRect().width,o=u.getBoundingClientRect().width;i.remove(),u.remove(),e.hidden=!(o-l>=16)};new MutationObserver(s).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",s)},Fe=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Mo=t=>{let e=!1,n=()=>{e=!1;let r=t.getBoundingClientRect(),i=document.documentElement.style;i.setProperty("--tb-hdr-h",`${Math.round(r.height)}px`),i.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(r.bottom))}px`)},s=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s),typeof ResizeObserver=="function"&&new ResizeObserver(s).observe(t)},He=null;window.addEventListener("popstate",()=>He?.(location.hash,!1));var Bo=(t,e,n,s,r)=>{let i={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:r,track:ct};t.addEventListener("click",o=>{if(o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey){ct("edit_on_github_clicked");return}o.preventDefault(),Yt({...i,mode:"page",trigger:n})});let u=new Map,l=Array.from(document.querySelectorAll("[data-pnum]")).filter(o=>!o.closest(".popover")&&!o.querySelector(":scope > button.tb-pedit"));l.length&&En();for(let o of l){let d=kn();d.addEventListener("click",c=>{c.stopPropagation(),se(d,s,`Continue: edit \\xB6${o.dataset.pnum}`,()=>Yt({...i,mode:"paragraph",para:o,trigger:d}))}),o.append(d),u.set(o.dataset.pnum??"",{p:o,b:d})}He=(o,d)=>{let c=Mt.exec(o);if(!c)return;let b=c[1]?u.get(c[1]):void 0;Yt(b?{...i,mode:"paragraph",para:b.p,trigger:b.b,push:d}:{...i,mode:"page",trigger:n,push:d})}},Ro=(t,e,n)=>{t.addEventListener("click",s=>{s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),sn({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:ct}))})},Io=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),s=()=>t.scrollWidth>t.clientWidth+1,r=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,i=r?.querySelector(".home-link")?r:null,u=t.querySelector(".tb-hdr-label"),l=()=>!!u&&getComputedStyle(u).position!=="absolute",o=t.querySelector(".tb-hdr-where"),d=f=>!!f&&f.scrollWidth>f.clientWidth+1,c=f=>!s()&&l()===f&&!d(o)&&!Array.from(o?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(d),b=f=>{i?.classList.toggle("tb-logo-full",f),i?.classList.toggle("tb-logo-icon",!f)},m=()=>{let f=!!e&&!!n&&t.dataset.tbHasReader==="1";b(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),f&&(e.hidden=!1,n.hidden=!0),s()&&t.classList.add("tb-hdr-icons"),s()&&(t.classList.add("tb-hdr-tight"),f&&(e.hidden=!0,n.hidden=!1));let x=l();i&&c(x)&&(b(!0),c(x)||b(!1)),Se()};if(m(),window.addEventListener("resize",m),document.fonts?.ready.then(m),typeof ResizeObserver=="function"){let f=new ResizeObserver(()=>requestAnimationFrame(m));f.observe(t);let x=t.querySelector(".tb-hdr-actions");x&&f.observe(x)}return m},Do=t=>{let e=o=>t.querySelector(o),n=t.dataset.howTo??"/how-to-comment",s=window,r=e("[data-tb-contribute]"),i=e("[data-tb-more]"),u=o=>{try{o()}catch{}};u(()=>{let o=e("[data-tb-search]"),d=document.querySelector(".search .search-button");!o||!d||(o.addEventListener("click",()=>d.click()),o.hidden=!1)}),u(()=>{let o=e("[data-tb-menu]"),d=document.querySelector(".explorer"),c=d?.querySelector(".mobile-explorer");if(!o||!d||!c)return;let b=t.parentElement;b?.classList.contains("tb-header-slot")&&b.prepend(o);let m=d.querySelector(".explorer-content");m?.id&&o.setAttribute("aria-controls",m.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let f=o.querySelector(".tb-hdr-label"),x=()=>!d.classList.contains("collapsed"),p=()=>{let v=x();o.setAttribute("aria-expanded",String(v)),o.classList.toggle("tb-closes",v),f&&(f.textContent=v?"Close menu":"Menu")};new MutationObserver(p).observe(d,{attributes:!0,attributeFilter:["class"]}),o.addEventListener("click",()=>{x()||s.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",v=>{v.key!=="Escape"||!x()||!Fe()||(c.click(),o.focus())}),p(),o.hidden=!1}),u(()=>{let o=e("[data-tb-reader]"),d=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!o||!d||!c)return;let b=()=>o.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",b),o.addEventListener("click",()=>c.click()),d.addEventListener("click",()=>c.click()),b(),t.dataset.tbHasReader="1",o.hidden=!1});let l=()=>{ct("annotation_badge_clicked"),s.tbAnnotations.open().then(o=>{o||vn("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};u(()=>{if(!s.tbAnnotations){let c=e("[data-tb-comment]");if(c&&window.tbCommentsComing){let b=c.querySelector(".tb-mi-t"),m=c.querySelector(".tb-mi-s");b&&(b.textContent=Dt.groupComment.title),m&&(m.textContent="Coming soon for classes"),c.setAttribute("aria-disabled","true"),c.hidden=!1}return}let o=e("[data-tb-annotate]");if(o){let c=o.querySelector(".tb-hdr-label"),b=()=>Fe()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),m=()=>{let x=b();o.classList.toggle("tb-closes",x),c&&(c.textContent=x?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",m),window.addEventListener("resize",m);let f=null;o.addEventListener("pointerdown",()=>f=b(),!0),o.addEventListener("click",()=>{let x=f??b();if(f=null,x)return s.tbAnnotations.close?.();let p=document.querySelector(".explorer");p&&!p.classList.contains("collapsed")&&Fe()&&p.querySelector(".mobile-explorer")?.click(),se(o,n,"Continue: open annotations",l)}),o.querySelector(".tb-anno-count")||o.append(k("span",{class:"tb-anno-count"})),o.hidden=!1}let d=e("[data-tb-comment]");if(d){if(d.addEventListener("click",l),s.tbAnnotations.groupsOnly){let c=d.querySelector(".tb-mi-t"),b=d.querySelector(".tb-mi-s");c&&(c.textContent=Dt.groupComment.title),b&&(b.textContent="Hypothes.is account \\xB7 only your group sees it")}d.hidden=!1}}),u(()=>{let o=e("#tb-contribute-menu");if(!r||!o)return;Ae(r,o,!0,x=>se(r,n,"Continue to Contribute",x)),e("[data-tb-explain]")?.addEventListener("click",()=>Sn(r,n));let d=e("button.tb-suggest-btn"),c=d?.dataset.endpoint,b=d&&c&&ne?()=>ne(c,d.dataset.path??"",r):void 0,m=e("a.edit-on-github"),f=m?.dataset.editEndpoint;if(m&&f){if(Bo(m,f,r,n,b),Mt.test(location.hash)){let x=location.hash,p=window.history.state?.tbEditor===!0;p||window.history.replaceState(window.history.state,"",location.pathname+location.search),He?.(x,!p)}}else m?.addEventListener("click",()=>ct("edit_on_github_clicked"));d&&b&&(d.addEventListener("click",b),d.hidden=!1,yo((x,p)=>ne(c,d.dataset.path??"",p,x),n)),r.hidden=!1}),u(()=>{let o=e("[data-tb-appearance]"),d=e("#tb-appearance");!o||!d||!s.tbPrefs||(So(d,s.tbPrefs,s.tbAnnotations),Ae(o,d,!1),o.hidden=!1)}),u(()=>{let o=e("#tb-more-menu");if(!i||!o)return;Ae(i,o,!0),e("[data-tb-cite]")?.addEventListener("click",()=>To(t,i)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let d=e("a.tb-history-link");d?.dataset.revisionEndpoint&&Ro(d,d.dataset.revisionEndpoint,i);let c=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");c&&(!b||!b.querySelector("a.internal")?(c.setAttribute("aria-disabled","true"),c.append(k("span",{class:"tb-mi-s",text:"No other page links here"}))):c.addEventListener("click",()=>{let p=b.querySelector("h3")??b;p.tabIndex=-1,b.scrollIntoView({block:"start"}),p.focus({preventScroll:!0})}));let m=e("[data-tb-download]"),f=Ao();if(m&&f){let p=m.querySelector(".tb-mi-t");p&&(p.textContent="Download\\u2026")}let x=()=>fetch(m.dataset.tbDownload).then(p=>p.ok?p.blob():Promise.reject(new Error(String(p.status)))).then(p=>{let v=URL.createObjectURL(p),H=k("a",{href:v,download:m.dataset.file??"page.md"});document.body.append(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(v),1e3)}).catch(()=>vn("That didn\'t download just now. View source has the same file."));m?.addEventListener("click",()=>f?Fo(f,t,i,x):x()),i.hidden=!1}),u(()=>{Io(t)}),u(()=>{let o=t.parentElement;Mo(o?.classList.contains("tb-header-slot")?o:t)})},No=()=>{try{ne?.closeIfOpen(),Ye(),rn();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",Do(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&dn(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",No);\n';

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
      // Without scripts the menus can't open: the plain links, as the row had.
      hasSource ? _(
        "noscript",
        null,
        _("a", { class: "tb-hdr-plain", href: editHref, ...away }, "Edit on GitHub \u2197"),
        _(
          "a",
          { class: "tb-hdr-plain", href: historyHref, ...away },
          "View revision history \u2197"
        )
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