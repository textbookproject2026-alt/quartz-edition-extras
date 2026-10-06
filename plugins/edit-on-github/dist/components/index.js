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
var controls_inline_default = 'var ne=/^\\s{0,3}(```|~~~)/,Oe=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,_e=t=>{let e=t.split(`\n`),r=[],s=0;if(e[0]?.trim()==="---"){let a=e.findIndex((c,d)=>d>0&&(c.trim()==="---"||c.trim()==="..."));a>0&&(s=a+1)}let i=0;for(;s<e.length;){let a=e[s];if(!a.trim()){s++;continue}let c=ne.exec(a);if(c||a.trim()==="$$"){let u=c?c[1]:"$$",b=s+1;for(;b<e.length&&!e[b].trim().startsWith(u);)b++;s=b+1;continue}let d=s;for(;d<e.length&&e[d].trim()&&!ne.test(e[d]);)d++;let o=e.slice(s,d).join(`\n`),l=!Oe.test(a);r.push({start:s,text:o,ordinal:l?++i:0}),s=d}return r},De=t=>oe(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,r)=>r.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),oe=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],Re=(t,e)=>{if(!t.length||!e.length)return 0;let r=new Map;for(let i of t)r.set(i,(r.get(i)??0)+1);let s=0;for(let i of e){let a=r.get(i)??0;a>0&&(s++,r.set(i,a-1))}return s/Math.max(t.length,e.length)};var re=(t,e,r)=>{let s=oe(e);if(!s.length)return null;let i=null,a=0,c=1/0;for(let d of _e(t)){let o=Re(De(d.text),s);if(o<.75)continue;let l=d.ordinal?Math.abs(d.ordinal-r):1e6;(o>a+.02||Math.abs(o-a)<=.02&&l<c)&&(i=d,a=Math.max(o,a),c=l)}return i};var Ot=(t,e)=>{let r=0;for(;r<t.length&&r<e.length&&t[r]===e[r];)r++;let s=t.length,i=e.length;for(;s>r&&i>r&&t[s-1]===e[i-1];)s--,i--;let a=t.slice(0,r).map(u=>({t:"=",v:u})),c=t.slice(s).map(u=>({t:"=",v:u})),d=t.slice(r,s),o=e.slice(r,i),l;if((d.length+1)*(o.length+1)>4e5)l=[...d.map(u=>({t:"-",v:u})),...o.map(u=>({t:"+",v:u}))];else{let u=o.length+1,b=new Uint32Array((d.length+1)*u);for(let x=d.length-1;x>=0;x--)for(let T=o.length-1;T>=0;T--)b[x*u+T]=d[x]===o[T]?b[(x+1)*u+T+1]+1:Math.max(b[(x+1)*u+T],b[x*u+T+1]);l=[];let y=0,g=0;for(;y<d.length&&g<o.length;)d[y]===o[g]?(l.push({t:"=",v:d[y]}),y++,g++):b[(y+1)*u+g]>=b[y*u+g+1]?l.push({t:"-",v:d[y++]}):l.push({t:"+",v:o[g++]});for(;y<d.length;)l.push({t:"-",v:d[y++]});for(;g<o.length;)l.push({t:"+",v:o[g++]})}return[...a,...l,...c]},_t=t=>t.split(/(\\s+)/).filter(e=>e!==""),se=(t,e,r=2)=>{let s=Ot(t.split(`\n`),e.split(`\n`)),i=[],a=1,c=1,d=null,o=0;return s.forEach((l,u)=>{s.slice(Math.max(0,u-r),u+r+1).some(y=>y.t!=="=")?((!d||l.t==="="&&o>2*r)&&(d={a,b:c,ops:[]},i.push(d)),d.ops.push(l),o=l.t==="="?o+1:0):(d=null,o=0),l.t!=="+"&&a++,l.t!=="-"&&c++}),i};var yt="tb-editor",ae="tb-editor-style",Rt="tb-gh-identity",Pe=7.5*60*60*1e3,ie=2e4,Ue=200,Et=/^#edit(?:-(\\d+))?$/,je=t=>t?`#edit-${t}`:"#edit",le={tbEditor:!0},ze="This page has changes waiting for review; you\\u2019re editing the latest draft.",n=(t,e={},...r)=>{let s=document.createElement(t);for(let[i,a]of Object.entries(e))a!==!1&&(i==="text"?s.textContent=String(a):i==="class"?s.className=String(a):s.setAttribute(i,a===!0?"":String(a)));for(let i of r)i&&s.append(i);return s},de="http://www.w3.org/2000/svg",ht=t=>{let e=document.createElementNS(de,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let r=document.createElementNS(de,"path");return r.setAttribute("d",t),r.setAttribute("fill","currentColor"),e.append(r),e},ce="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",At="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",Pt="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",Ge="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Ft=t=>{let e=t?.userMessage,r=typeof e=="string"?e.trim():"";return r?r.slice(0,Ue):null},qe=()=>{try{let t=sessionStorage.getItem(Rt);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Pe?null:e}catch{return null}},Dt=t=>{try{t?sessionStorage.setItem(Rt,JSON.stringify(t)):sessionStorage.removeItem(Rt)}catch{}},Ut=()=>{if(document.getElementById(ae))return;let t=`#${yt}`,e=n("style",{id:ae});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-faint, #9B9BA1); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-faint, #9B9BA1); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: #FFFFFF; }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-faint, #9B9BA1); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n${t} .tb-ed-del { background: #FFEBE9; }\n${t} .tb-ed-add { background: #E6FFEC; }\n${t} .tb-ed-del del { background: #FFC1C0; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: #ABF2BC; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},Ye=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,r)=>r.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),Ke="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",jt=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(Ke).forEach(s=>s.remove()),e.querySelectorAll("*").forEach(s=>{for(let i of Array.from(s.attributes)){let a=i.value.trim().toLowerCase();(i.name.startsWith("on")||(i.name==="href"||i.name==="src")&&/^(javascript|data|vbscript):/.test(a))&&s.removeAttribute(i.name)}s.tagName==="A"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"))});let r=document.createDocumentFragment();return r.append(...Array.from(e.body.childNodes)),r},zt=(t,e)=>{let r=n("div",{class:"tb-ed-diff"}),s=se(t,e);if(!s.length)return r.append(n("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),r;let i=(a,c)=>{let d=n("div",{class:`tb-ed-line${a==="-"?" tb-ed-del":a==="+"?" tb-ed-add":""}`}),o=n("span");return typeof c=="string"?o.textContent=c||" ":o.append(...c),d.append(n("span",{text:a==="="?" ":a}),o),d};for(let a of s){let c=n("div",{class:"tb-ed-hunk"},n("div",{class:"tb-ed-hh",text:`Line ${a.b}`}));for(let d=0;d<a.ops.length;){let o=a.ops[d];if(o.t==="="){c.append(i("=",o.v)),d++;continue}let l=[],u=[];for(;a.ops[d]?.t==="-";)l.push(a.ops[d++].v);for(;a.ops[d]?.t==="+";)u.push(a.ops[d++].v);let b=Math.min(l.length,u.length),y=l.map((g,x)=>x<b?Ot(_t(g),_t(u[x])):null);l.forEach((g,x)=>{let T=y[x];c.append(i("-",T?T.filter(h=>h.t!=="+").map(h=>h.t==="-"?n("del",{text:h.v}):document.createTextNode(h.v)):g))}),u.forEach((g,x)=>{let T=y[x];c.append(i("+",T?T.filter(h=>h.t!=="-").map(h=>h.t==="+"?n("ins",{text:h.v}):document.createTextNode(h.v)):g))})}r.append(c)}return r},Ct=null,ue=()=>Ct?.(),Mt=t=>{if(Ct)return;Ut();let e=document.body.style.overflow,r=new URL(t.endpoint,location.href).origin,s=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),i=t.path.split("/"),a=i.pop(),c=t.para&&Number(t.para.getAttribute("data-pnum"))||0,d=t.mode,o="",l="",u="drafts",b=null,y="",g=qe(),x=!1,T=!1,h=null,L=null,U=!1,it=window.scrollY,lt=je(d==="paragraph"?c:0),M=n("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),W=n("span",{class:"tb-ed-pill"},ht(At),n("span",{text:u})),H=n("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},ht(Pt));H.append(n("span",{text:t.repo.split("/").pop()||t.repo}));for(let p of i)H.append(n("span",{class:"tb-ed-sep",text:"/"}),n("span",{text:p}));H.append(n("span",{class:"tb-ed-sep",text:"/"}),n("span",{class:"tb-ed-file",text:a}));let f=n("span",{class:"tb-ed-muted",text:c?` \\xB7 \\xB6${c}`:""});H.append(f,W);let w=n("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),S=n("div",{class:"tb-ed-head"},H,w),A=n("div",{class:"tb-ed-discard",role:"alert",hidden:!0},n("span",{text:"Discard your changes?"})),j=n("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),Q=n("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});A.append(j,Q);let P=n("div",{class:"tb-ed-main"}),q=n("div",{class:"tb-ed-inner"}),B=n("p",{class:"tb-ed-note",hidden:!0}),F=n("p",{class:"tb-ed-note",hidden:!0,text:ze}),z=n("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),rt=n("div",{class:"tb-ed-gate",hidden:!0});q.append(F,B,z,rt),P.append(q),M.append(S,A,P);let X=["Edit","Preview","Changes"],J=n("div",{role:"tablist","aria-label":"Editor view"}),D=X.map((p,m)=>n("button",{type:"button",role:"tab",id:`tb-ed-tab-${m}`,"aria-controls":`tb-ed-panel-${m}`,"aria-selected":m===0?"true":"false",tabindex:m===0?0:-1,text:p==="Edit"?"Edit":p==="Preview"?"Preview":"Changes"}));J.append(...D);let dt=n("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),tt=n("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),mt=n("div",{class:"tb-ed-bar"},J,n("div",{class:"tb-ed-actions"},dt,tt)),V=n("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),ct=n("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),I=n("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),N=[n("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},ct,V,I),n("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),n("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],R=n("div",{class:"tb-ed-box"},mt,...N),nt=n("p",{class:"tb-ed-foot"}),O=()=>V.value,Bt=()=>y,ft=p=>{D.forEach((m,v)=>{m.setAttribute("aria-selected",v===p?"true":"false"),m.tabIndex=v===p?0:-1,N[v].hidden=v!==p}),p===1&&kt(),p===2&&(N[2].textContent="",N[2].append(zt(Bt(),O())))};D.forEach((p,m)=>{p.addEventListener("click",()=>ft(m)),p.addEventListener("keydown",v=>{let C=v.key==="ArrowRight"?1:v.key==="ArrowLeft"?-1:0;if(!C)return;v.preventDefault();let et=(m+C+D.length)%D.length;ft(et),D[et].focus()})});let xt=0,kt=()=>{let p=N[1];p.textContent="",p.className="tb-ed-panel tb-ed-preview";let m=n("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});p.append(m);let v=++xt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:Ye(O()),mode:"markdown"})}).then(C=>C.ok?C.text():Promise.reject(new Error(String(C.status)))).then(C=>{v===xt&&(p.textContent="",p.append(jt(C)))}).catch(()=>{v===xt&&(m.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};V.addEventListener("input",()=>{T=O()!==y,tt.disabled=!T});let st=n("div",{class:"tb-ed-scrim",hidden:!0}),vt=n("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});st.append(vt),M.append(st);let E=(p,m,v,C=!1)=>{v.id=p;let et=n("p",{class:"tb-ed-err",id:`${p}-err`}),_=n("label",{for:p,text:m},C?n("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:n("div",{class:"tb-ed-field"},_,v,et),control:v,err:et}},$=E("tb-ed-msg","Title",n("input",{type:"text",maxlength:200,autocomplete:"off"})),Y=E("tb-ed-desc","Extended description",n("textarea",{rows:3,maxlength:5e3}),!0),K=n("div",{class:"tb-ed-who"}),G=n("div",{class:"tb-ed-what"},ht(At)),Z=n("span");G.append(Z);let at=n("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),ot=n("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),pt=n("form",{novalidate:!0},n("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),$.wrap,Y.wrap,K,G,n("div",{class:"tb-ed-row"},at,ot)),ut=n("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});vt.append(pt,ut);let Tt=()=>{if(K.textContent="",g){let p=n("img",{src:`https://avatars.githubusercontent.com/u/${g.id}?s=56`,alt:""}),m=n("button",{type:"button",class:"tb-ed-link",text:"Sign out"});m.addEventListener("click",()=>{g=null,Dt(null),Tt()}),K.append(p,n("span",{},"Signed in as ",n("strong",{text:`@${g.login}`})," \\u2014 this edit will be credited to your GitHub account."),m)}else K.append(Vt(),n("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Vt=()=>{let p=n("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},ht(Ge),"Sign in with GitHub");return p.addEventListener("click",()=>He(p)),p},Me=()=>{rt.textContent="";let p=Vt(),m=n("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let v=n("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});v.addEventListener("click",()=>{$t(),t.suggest()}),m.append(v," instead: it needs no account.")}else m.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");rt.append(n("h2",{text:"Sign in to edit"}),n("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),n("p",{},p),m),z.hidden=!0,rt.hidden=!1,p.focus()},Zt=p=>{if(p.origin!==r)return;let m=p.data;if(!(!m||m.type!=="tb-github-identity")){if(h=null,m.error||typeof m.token!="string"||typeof m.login!="string"){t.track("github_signin",{outcome:m.error==="denied"?"cancelled":"error"});return}if(g={token:m.token,login:m.login,id:Number(m.id)||0,name:m.name??"",at:Date.now()},Dt(g),t.track("github_signin",{outcome:"success"}),!U)return ee();Tt(),st.hidden||$.control.focus()}},He=p=>{let m=`${s}?origin=${encodeURIComponent(location.origin)}`;h=window.open(m,"tb-github-signin","popup,width=560,height=720"),!h&&!p.parentElement?.querySelector(".tb-ed-err")&&p.after(n("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Zt);let Se=(p,m)=>{p.control.setAttribute("aria-invalid","true"),p.control.setAttribute("aria-describedby",p.err.id),p.err.textContent=m},Xt=p=>{p.control.removeAttribute("aria-invalid"),p.control.removeAttribute("aria-describedby"),p.err.textContent=""};$.control.addEventListener("input",()=>Xt($));let Be=()=>{$.control.value||($.control.value=d==="paragraph"&&c?`Edit \\xB6${c} of ${a}`:`Update ${a}`),Z.textContent="",Z.append("This creates a new branch and opens a proposal to merge it into ",n("code",{text:u}),". Nothing changes in the book until an editor accepts it."),Tt(),pt.hidden=!1,ut.hidden=!0,st.hidden=!1,$.control.focus(),$.control.select()},It=()=>{st.hidden=!0,tt.focus()};tt.addEventListener("click",Be),at.addEventListener("click",It),st.addEventListener("mousedown",p=>{p.target===st&&!x&&It()});let Nt=(p,m,v,C)=>{if(!M.isConnected)return;ut.textContent="",ut.append(n("h2",{text:p}),n("p",{text:m})),v&&ut.append(n("p",{},n("a",{href:v.href,target:"_blank",rel:"noopener",text:v.text})));let et=n("button",{type:"button",class:`tb-ed-btn${C?" tb-ed-primary":""}`,text:C?"Back to my edit":"Close"});et.addEventListener("click",C?()=>{ut.hidden=!0,pt.hidden=!1,ot.focus()}:()=>Lt(!0)),ut.append(n("div",{class:"tb-ed-row"},et)),pt.hidden=!0,ut.hidden=!1,ut.focus()};pt.addEventListener("submit",p=>{if(p.preventDefault(),x)return;let m=null;if(Xt($),$.control.value.trim()?g||(m=K.querySelector("button")):(Se($,"Please give your change a short title."),m=$.control),m){m.focus();return}let v={mode:d,path:t.path,baseSha:l,title:$.control.value.trim(),description:Y.control.value.trim()};d==="page"?v.content=O():(v.startLine=b.start,v.original=b.text,v.replacement=O(),c&&(v.paragraph=c)),v.identity=g.token,x=!0,ot.disabled=!0,ot.textContent="Proposing\\u2026";let C=L=new AbortController,et=setTimeout(()=>C.abort(),ie);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v),signal:C.signal}).then(async _=>{let bt=null;try{bt=await _.json()}catch{bt=null}if(_.status===401&&g&&(g=null,Dt(null),Tt()),!_.ok)throw Object.assign(new Error(String(_.status)),{userMessage:Ft(bt)});return bt}).then(_=>{T=!1,_.fallback&&typeof _.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:d}),Nt("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:_.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:d}),Nt("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof _.prUrl=="string"?{href:_.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(_=>{t.track("page_edit_submitted",{outcome:"error",mode:d}),Nt("That did not go through",_&&_.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(et),L===C&&(L=null),x=!1,ot.disabled=!1,ot.textContent="Propose changes"})});let Ie=p=>Array.from(p.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(m=>!m.disabled&&m.tabIndex>=0&&!m.closest("[hidden]")),Jt=p=>{if(p.key==="Escape"){p.preventDefault(),st.hidden?wt():x||(!ut.hidden&&pt.hidden&&!T?Lt(!0):It());return}if(p.key!=="Tab")return;let m=st.hidden?M:vt,v=Ie(m);if(!v.length){p.preventDefault(),m.focus();return}let C=v.indexOf(document.activeElement);(p.shiftKey?C<=0:C===-1||C===v.length-1)&&(p.preventDefault(),v[p.shiftKey?v.length-1:0].focus())},Qt=p=>{T&&(p.preventDefault(),p.returnValue="")},Lt=(p=!1)=>{if(!p&&T)return wt();T=!1,Et.test(location.hash)?history.back():$t()},te=()=>{if(!Et.test(location.hash)){if(T)return history.pushState(le,"",lt),wt();$t()}},$t=()=>{Ct=null,L?.abort(),h?.close(),document.removeEventListener("keydown",Jt,!0),window.removeEventListener("message",Zt),window.removeEventListener("beforeunload",Qt),window.removeEventListener("popstate",te),M.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,it)},wt=()=>{if(!T)return Lt(!0);A.hidden=!1,Q.focus()};j.addEventListener("click",()=>Lt(!0)),Q.addEventListener("click",()=>{A.hidden=!0,V.focus()}),w.addEventListener("click",wt),dt.addEventListener("click",wt),document.addEventListener("keydown",Jt,!0),window.addEventListener("beforeunload",Qt),window.addEventListener("popstate",te),Ct=$t,t.push!==!1&&history.pushState(le,"",lt),document.body.style.overflow="hidden",document.body.append(M),w.focus(),t.track("page_editor_opened",{mode:d});let Ne=p=>{z.textContent="",z.removeAttribute("class"),z.append(p+" ",n("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},ee=()=>{if(!g)return Me();U=!0,rt.hidden=!0,z.hidden=!1;let p=new AbortController,m=setTimeout(()=>p.abort(),ie);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:p.signal}).then(async v=>{let C=null;try{C=await v.json()}catch{C=null}if(!v.ok)throw Object.assign(new Error(String(v.status)),{userMessage:Ft(C)});return C}).then(v=>{if(M.isConnected){if(typeof v?.content!="string"||typeof v.sha!="string")throw new Error("bad source");if(o=v.content,l=v.sha,u=typeof v.branch=="string"?v.branch:u,W.lastChild.textContent=u,F.hidden=!t.builtBlob||t.builtBlob===l,d==="paragraph"&&(b=t.para?re(o,t.para.textContent??"",c):null,b||(d="page",f.textContent="",B.textContent=`We couldn\\u2019t find \\xB6${c} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,B.hidden=!1)),d==="paragraph"&&b){R.classList.add("tb-ed-para");let C=o.split(`\n`),et=b.text.split(`\n`).length,_=C.slice(Math.max(0,b.start-3),b.start).join(`\n`).trim(),bt=C.slice(b.start+et,b.start+et+3).join(`\n`).trim();ct.textContent=_.length>220?`\\u2026${_.slice(-220)}`:_,I.textContent=bt.length>220?`${bt.slice(0,220)}\\u2026`:bt,ct.hidden=!_,I.hidden=!bt,y=b.text,nt.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else y=o,nt.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";V.value=y,z.remove(),q.append(R,nt),V.setSelectionRange(0,0),V.focus()}}).catch(v=>{M.isConnected&&Ne(v&&v.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(m))};ee()};var pe="tb-history-style",We=30,be=2e4,Ve=()=>{if(document.getElementById(pe))return;let t=`#${yt}`,e=n("style",{id:pe});e.textContent=`\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-hi-list li + li { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; padding: 0.7rem 1rem; border: 0; background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-msg { display: block; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.15rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 0.75rem; }\n${t} .tb-hi-head { margin: 0 0 0.75rem; }\n${t} .tb-hi-head h2 { margin: 0; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n`,document.head.append(e)},Ze=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric"})},Gt=async(t,e)=>{let r=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),s=null;try{s=await r.json()}catch{}if(!r.ok){let i=new Error(`HTTP ${r.status}`);throw i.userMessage=Ft(s),i}return s},Ht=null,ge=()=>Ht?.(),me=t=>{if(Ht||document.getElementById(yt))return;Ut(),Ve();let e=document.body.style.overflow,r=null,s=0,i=new Map,a=n("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),c=t.path.split("/"),d=c.pop(),o=n("div",{class:"tb-ed-crumbs",id:"tb-hi-title"},ht(Pt),n("span",{class:"tb-ed-file",text:"History"}));o.append(n("span",{class:"tb-ed-sep",text:"\\xB7"}),n("span",{text:t.repo.split("/").pop()||t.repo}));for(let f of c)o.append(n("span",{class:"tb-ed-sep",text:"/"}),n("span",{text:f}));o.append(n("span",{class:"tb-ed-sep",text:"/"}),n("span",{text:d})),o.append(n("span",{class:"tb-ed-pill"},ht(At),n("span",{text:t.branch})));let l=n("button",{type:"button",class:"tb-ed-x","aria-label":"Close the history",text:"\\xD7"}),u=n("div",{class:"tb-ed-main"}),b=n("div",{class:"tb-ed-inner"});u.append(b),a.append(n("div",{class:"tb-ed-head"},o,l),u);let y=f=>n("p",{class:"tb-ed-muted",role:"status",text:f}),g=(f,w)=>{let S=n("div",{class:"tb-ed-note",role:"alert"});return S.append(n("span",{text:`${f?.userMessage||w} `}),n("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),S},x=()=>{r?.abort();let f=new AbortController;r=f;let w=setTimeout(()=>f.abort(),be);return{signal:f.signal,done:()=>clearTimeout(w),current:()=>r===f}},T=f=>f.reader&&i.get(f.sha)||f.who,h=f=>`${T(f)} \\xB7 ${Ze(f.date)}`,L=null,U=()=>{let f=[...new Set((L??[]).filter(j=>j.reader).map(j=>j.sha))].slice(0,We);if(!f.length)return;let w=new URL(t.endpoint,location.href);w.searchParams.set("shas",f.join(","));let S=new AbortController,A=setTimeout(()=>S.abort(),be);Gt(w.toString(),S.signal).then(j=>{let Q=j?.names??{};for(let[q,B]of Object.entries(Q))typeof B=="string"&&B.trim()&&i.set(q,B.trim().slice(0,80));let P=b.querySelectorAll(".tb-hi-list .tb-hi-meta");L?.forEach((q,B)=>{P[B]&&(P[B].textContent=h(q))})}).catch(()=>{}).finally(()=>clearTimeout(A))},it=()=>{if(b.textContent="",!L)return;if(!L.length){b.append(y("This page has no published revisions yet."));return}b.append(n("p",{class:"tb-ed-muted",text:`${L.length} published ${L.length===1?"version":"versions"} of this page, newest first. Open one to see what changed.`}));let f=n("ol",{class:"tb-hi-list"});L.forEach((w,S)=>{let A=n("button",{type:"button",class:"tb-hi-rev"},n("span",{class:"tb-hi-msg",text:w.message||"(no description)"}),n("span",{class:"tb-hi-meta",text:h(w)}));A.addEventListener("click",()=>{s=u.scrollTop,lt(S)}),f.append(n("li",{},A))}),b.append(f),u.scrollTop=s},lt=f=>{let w=L[f];b.textContent="";let S=n("button",{type:"button",class:"tb-ed-btn tb-hi-back",text:"\\u2190 All revisions"});S.addEventListener("click",()=>{r?.abort(),it(),(b.querySelectorAll(".tb-hi-rev")[f]??l).focus()});let A=n("p",{class:"tb-ed-muted",text:h(w)}),j=n("div",{class:"tb-hi-head"},n("h2",{text:w.message||"(no description)"}),A),Q=y("Loading this revision\\u2026");b.append(S,j,Q),u.scrollTop=0,S.focus(),t.track("page_revision_opened");let P=x(),q=new URL(t.endpoint,location.href);q.searchParams.set("sha",w.sha),q.searchParams.set("path",w.path),Gt(q.toString(),P.signal).then(B=>{if(!P.current())return;let F=B;w.reader&&typeof F.proposer=="string"&&F.proposer.trim()&&(i.set(w.sha,F.proposer.trim().slice(0,80)),A.textContent=h(w));let z=typeof F.before=="string"?F.before:"",rt=typeof F.after=="string"?F.after:"",X=["Changes","Page as it was"],J=n("div",{role:"tablist","aria-label":"Revision view"}),D=X.map((I,N)=>n("button",{type:"button",role:"tab",id:`tb-hi-tab-${N}`,"aria-controls":`tb-hi-panel-${N}`,"aria-selected":N===0?"true":"false",tabindex:N===0?0:-1,text:I}));J.append(...D);let dt=n("div",{role:"tabpanel",id:"tb-hi-panel-0","aria-labelledby":"tb-hi-tab-0",tabindex:0});F.status==="added"&&dt.append(n("p",{class:"tb-ed-panel tb-ed-muted",text:"The page was first published in this revision."}));let tt=typeof F.previousPath=="string"&&F.previousPath!==w.path?F.previousPath:"";tt&&dt.append(n("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved here from ${tt}${z===rt?"; its text didn\\u2019t change.":"."}`})),(!tt||z!==rt)&&dt.append(zt(z,rt));let mt=n("div",{role:"tabpanel",id:"tb-hi-panel-1","aria-labelledby":"tb-hi-tab-1",tabindex:0,hidden:!0,class:"tb-ed-panel tb-ed-preview"});typeof F.html=="string"&&F.html?mt.append(jt(F.html)):mt.append(n("p",{class:"tb-ed-muted",text:"The page was removed in this revision."}));let V=[dt,mt],ct=I=>D.forEach((N,R)=>{N.setAttribute("aria-selected",R===I?"true":"false"),N.tabIndex=R===I?0:-1,V[R].hidden=R!==I});D.forEach((I,N)=>{I.addEventListener("click",()=>ct(N)),I.addEventListener("keydown",R=>{let nt=R.key==="ArrowRight"?1:R.key==="ArrowLeft"?-1:0;if(!nt)return;R.preventDefault();let O=(N+nt+D.length)%D.length;ct(O),D[O].focus()})}),Q.replaceWith(n("div",{class:"tb-ed-box"},n("div",{class:"tb-ed-bar"},J),...V))}).catch(B=>{P.current()&&Q.replaceWith(g(B,"This revision couldn\\u2019t be loaded just now. Please try again in a moment."))}).finally(P.done)},M=f=>{if(f.key==="Escape"){f.preventDefault(),W();return}if(f.key!=="Tab")return;let w=Array.from(a.querySelectorAll("a[href], button, [tabindex]")).filter(A=>!A.disabled&&A.tabIndex>=0&&!A.closest("[hidden]"));if(!w.length)return;let S=w.indexOf(document.activeElement);(f.shiftKey?S<=0:S===-1||S===w.length-1)&&(f.preventDefault(),w[f.shiftKey?w.length-1:0].focus())},W=()=>{Ht=null,r?.abort(),document.removeEventListener("keydown",M,!0),a.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};l.addEventListener("click",W),document.addEventListener("keydown",M,!0),Ht=W,document.body.style.overflow="hidden",document.body.append(a),l.focus(),t.track("page_history_opened"),b.append(y("Loading this page\\u2019s history\\u2026"));let H=x();Gt(t.listUrl,H.signal).then(f=>{H.current()&&(L=(Array.isArray(f)?f:[]).filter(w=>!!w&&typeof w.sha=="string"&&typeof w.path=="string"),it(),U())}).catch(f=>{H.current()&&(b.textContent="",b.append(g(f,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(H.done)};var fe={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},ve=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),Xe=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(s=>`${s.charAt(0).toUpperCase()}.`).join(" ")}`},Je=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,he=t=>/[.?!]$/.test(t)?t:`${t}.`,ye=t=>{let e=Je(ve(t.authors).map(Xe)),r=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),s=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",i=[],a=s?[{text:`${he(s)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)i.push({text:`${he(e)} (n.d.). `},...a);else if(a.length){let[c,...d]=a;i.push({...c,text:c.text.replace(/ $/,"")},{text:" (n.d.). "},...d)}else i.push({text:"(n.d.). "});return i.push({text:`Retrieved ${r}, from ${t.url}`}),i},xe=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=fe[t.licence],s=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&s.push({text:` by ${ve(t.authors).join(", ")}`}),e&&t.bookTitle&&s.push({text:", from "},{text:t.bookTitle,italic:!0}),s.push({text:`, ${t.url}`}),r?s.push({text:`, is licensed under ${r.name} (${r.url})`}):t.licence&&s.push({text:`, is licensed under ${t.licence}`}),s.push({text:"."}),s},we=t=>t.map(e=>e.text).join(""),Ee=t=>fe[t]?.name??t;var gt=(t,e)=>{try{let r=window.tbTrack;typeof r=="function"&&(e?r(t,e):r(t))}catch{}},Yt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",r="tb-suggest-title",a=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/,d=h=>{let L=h?.userMessage,U=typeof L=="string"?L.trim():"";return U?U.slice(0,200):null},o=()=>{if(document.getElementById(e))return;let h=document.createElement("style");h.id=e,h.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: #FFFFFF; cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(h)},l=(h,L,U,it=!1)=>{let lt=document.createElement("div");lt.className="tb-sg-field";let M=document.createElement("label");if(M.setAttribute("for",h),M.textContent=L,it){let H=document.createElement("span");H.className="tb-sg-opt",H.textContent=" (optional)",M.append(H)}let W=document.createElement("p");return W.className="tb-sg-err",W.id=h+"-err",U.id=h,!it&&!U.readOnly&&(U.required=!0),lt.append(M,U,W),{wrap:lt,control:U,err:W,hintId:null}},u=h=>{let L=[];h.err.textContent&&L.push(h.err.id),h.hintId&&L.push(h.hintId),L.length?h.control.setAttribute("aria-describedby",L.join(" ")):h.control.removeAttribute("aria-describedby")},b=(h,L)=>{h.control.setAttribute("aria-invalid","true"),h.err.textContent=L,u(h)},y=h=>{h.control.hasAttribute("aria-invalid")&&(h.control.removeAttribute("aria-invalid"),h.err.textContent="",u(h))},g=null,x=(h,L,U)=>{if(g)return;o();let it=U,lt=document.body.style.overflow,M=null,W=!1,H=document.createElement("div");H.id=t;let f=document.createElement("div");f.className="tb-sg-dialog",f.tabIndex=-1,f.setAttribute("role","dialog"),f.setAttribute("aria-modal","true"),f.setAttribute("aria-labelledby",r);let w=document.createElement("div");w.className="tb-sg-head";let S=document.createElement("h2");S.id=r,S.textContent="Suggest an edit";let A=document.createElement("button");A.type="button",A.className="tb-sg-close",A.textContent="\\xD7",A.setAttribute("aria-label","Close suggestion form"),w.append(S,A);let j=document.createElement("form");j.noValidate=!0;let Q=document.createElement("p");Q.className="tb-sg-intro",Q.textContent="Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let P=document.createElement("input");P.type="text",P.name="name",P.autocomplete="name";let q=l("tb-sg-name","Your name",P),B=document.createElement("input");B.type="email",B.name="email",B.autocomplete="email";let F=l("tb-sg-email","Your email",B),z=document.createElement("input");z.type="text",z.name="path",z.readOnly=!0,z.value=L;let rt=l("tb-sg-path","Page you are editing",z),X=document.createElement("textarea");X.name="suggestion",X.rows=6,X.maxLength=5e3;let J=l("tb-sg-suggestion","Your suggested change",X),D=document.createElement("p");D.className="tb-sg-count",D.id="tb-sg-count",J.hintId=D.id;let dt=()=>{let E=5e3-X.value.length;D.textContent=E+" character"+(E===1?"":"s")+" remaining"};dt(),u(J),X.addEventListener("input",()=>{dt(),y(J)}),J.wrap.append(D);let tt=document.createElement("textarea");tt.name="reasoning",tt.rows=3;let mt=l("tb-sg-reasoning","Why",tt,!0);for(let E of[q,F])E.control.addEventListener("input",()=>y(E));let V=document.createElement("div");V.className="tb-sg-hp",V.setAttribute("aria-hidden","true");let ct=document.createElement("label");ct.setAttribute("for","tb-sg-website"),ct.textContent="Leave this field empty";let I=document.createElement("input");I.type="text",I.name="website",I.id="tb-sg-website",I.tabIndex=-1,I.autocomplete="off",I.setAttribute("aria-hidden","true"),V.append(ct,I);let N=document.createElement("div");N.className="tb-sg-actions";let R=document.createElement("button");R.type="submit",R.className="tb-sg-btn",R.textContent="Send suggestion";let nt=document.createElement("button");nt.type="button",nt.className="tb-sg-quiet",nt.textContent="Cancel",N.append(R,nt),j.append(Q,q.wrap,F.wrap,rt.wrap,J.wrap,mt.wrap,V,N);let O=document.createElement("div");O.className="tb-sg-pane",O.tabIndex=-1,O.hidden=!0,f.append(w,j,O),H.append(f);let Bt=()=>{O.hidden=!0,j.hidden=!1,X.focus()},ft=(E,$,Y,K=!1)=>{if(!H.isConnected)return;O.textContent="";let G=document.createElement("p");G.className="tb-sg-pane-title",G.textContent=E;let Z=document.createElement("p");if(Z.textContent=$,O.append(G,Z),Y){let ot=document.createElement("a");ot.href=Y,ot.target="_blank",ot.rel="noopener",ot.textContent="View your suggestion on GitHub";let pt=document.createElement("p");pt.append(ot),O.append(pt)}let at=document.createElement("button");at.type="button",at.className=K?"tb-sg-btn":"tb-sg-quiet",at.textContent=K?"Back to my suggestion":"Close",at.addEventListener("click",K?Bt:()=>g?.()),O.append(at),j.hidden=!0,O.hidden=!1,O.focus()},xt=()=>Array.prototype.filter.call(f.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),E=>!E.disabled&&E.tabIndex>=0&&!E.closest("[hidden]")),kt=E=>{if(E.key==="Escape"){E.preventDefault(),g?.();return}if(E.key!=="Tab")return;let $=xt();if(!$.length){E.preventDefault(),f.focus();return}let Y=$.indexOf(document.activeElement);E.shiftKey?Y<=0&&(E.preventDefault(),$[$.length-1].focus()):(Y===-1||Y===$.length-1)&&(E.preventDefault(),$[0].focus())};g=()=>{if(g=null,M)try{M.abort()}catch{}document.removeEventListener("keydown",kt,!0),H.remove(),document.body.style.overflow=lt,it.isConnected&&it.focus()},H.addEventListener("mousedown",E=>{E.target===H&&g?.()}),A.addEventListener("click",()=>g?.()),nt.addEventListener("click",()=>g?.()),document.addEventListener("keydown",kt,!0);let st=()=>{let E=null,$=(K,G)=>{b(K,G),E||(E=K.control)};for(let K of[q,F,J])y(K);P.value.trim()||$(q,"Please add your name.");let Y=B.value.trim();return Y?a.test(Y)||$(F,"That does not look like an email address."):$(F,"Please add your email."),X.value.trim()?X.value.length>5e3&&$(J,"Please keep the suggestion under 5000 characters."):$(J,"Please describe the change you would like."),E&&E.focus(),!E},vt=E=>{W=E,R.disabled=E,R.textContent=E?"Sending\\u2026":"Send suggestion"};j.addEventListener("submit",E=>{if(E.preventDefault(),W||!st())return;let $={name:P.value.trim(),email:B.value.trim(),suggestion:X.value.trim(),reasoning:tt.value.trim(),path:L,website:I.value};if($.website){ft("Thank you","Your suggestion has been received.");return}vt(!0);let Y=M=new AbortController,K=setTimeout(()=>Y.abort(),1e4);fetch(h,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify($),signal:Y.signal}).then(async G=>{let Z=null;try{Z=await G.json()}catch{Z=null}if(!G.ok){let at=new Error(Z?.error||"HTTP "+G.status);throw at.userMessage=d(Z),at}return Z}).then(G=>{gt("suggest_edit_submitted",{outcome:"success"});let Z=G?.issueUrl;ft("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof Z=="string"?Z:null)}).catch(G=>{gt("suggest_edit_submitted",{outcome:"error"}),ft("That did not go through",G&&G.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(K),M===Y&&(M=null),R.isConnected?vt(!1):W=!1})}),document.body.style.overflow="hidden",document.body.appendChild(H),P.focus(),gt("suggest_edit_opened")},T=((h,L,U)=>{try{x(h,L,U)}catch{g=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return T.closeIfOpen=()=>g?.(),T}catch{return null}})(),ke="tb-pedit-style",Qe=()=>{if(document.getElementById(ke))return;let t=document.createElement("style");t.id=ke,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n.popover button.tb-pedit { display: none; }\n@media print { button.tb-pedit { display: none !important; } }\n`,document.head.appendChild(t)},tn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",ce),r.setAttribute("fill","currentColor"),e.append(r),t.append(e),t},St=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let r of Array.from(St))e&&!r.panel.contains(e)&&!r.button.contains(e)&&r.d.close(!1)});var qt=(t,e,r,s)=>{let i=()=>Array.from(e.querySelectorAll(r?\'[role="menuitem"]\':"input, button, a[href]")).filter(o=>!o.hidden&&!o.closest("[hidden]")),a={d:null,button:t,panel:e},c={open(){for(let l of Array.from(St))l!==a&&l.d.close(!1);e.hidden=!1,t.setAttribute("aria-expanded","true"),St.add(a),(r?i()[0]:e.querySelector("input:checked")??i()[0])?.focus()},close(o=!0){e.hidden||(e.hidden=!0,t.setAttribute("aria-expanded","false"),St.delete(a),o&&t.focus())}};a.d=c,t.addEventListener("click",()=>{if(!e.hidden)return c.close();s?s(c.open):c.open()});let d=o=>{if(o.key==="Escape"&&!e.hidden){o.preventDefault(),o.stopPropagation(),c.close(!0);return}if(!r||e.hidden||!e.contains(o.target))return;let l=i(),u=l.indexOf(document.activeElement),b=y=>{o.preventDefault(),l[(y+l.length)%l.length]?.focus()};o.key==="ArrowDown"?b(u+1):o.key==="ArrowUp"?b(u-1):o.key==="Home"?b(0):o.key==="End"?b(l.length-1):o.key==="Tab"&&c.close(!1)};return e.addEventListener("keydown",d),t.addEventListener("keydown",d),r&&e.addEventListener("click",o=>{let l=o.target.closest(\'[role="menuitem"]\');if(l){if(l.getAttribute("aria-disabled")==="true"){o.preventDefault();return}c.close(!1)}}),c},k=(t,e={},...r)=>{let s=document.createElement(t);for(let[i,a]of Object.entries(e))i==="text"?s.textContent=a:i==="class"?s.className=a:s.setAttribute(i,a);for(let i of r)i!==null&&s.append(i);return s},$e=(t,e,...r)=>{let s=k("dialog",{class:"tb-dialog","aria-label":t}),i=k("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});i.addEventListener("click",()=>s.close()),s.append(i,...r);let a=null;return s.addEventListener("close",()=>{s.remove(),a?a():e.isConnected&&e.focus()}),document.body.append(s),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),{d:s,closeThen:c=>(a=c,s.close())}},Te=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,setTimeout(()=>{e.textContent===t&&(e.textContent="")},4e3))},en=(t,e,r)=>{let s=()=>{let i=k("textarea",{readonly:""});i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.append(i),i.select();let a=!1;try{a=document.execCommand("copy")}catch{a=!1}return i.remove(),a};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>s()?e():r()):s()?e():r()},Ce="tb-contribute-explained",Ae=!1,nn=()=>{if(Ae)return!0;try{return localStorage.getItem(Ce)==="1"}catch{return!1}},Le={edit:{title:"Edit this page",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors, and anyone else: your note becomes an issue on the book\'s GitHub repository, showing your name and your email address masked to its first letter and its domain (like a***@example.org). It doesn\'t appear on this page.",account:"None. You give your name and an email address."},comment:{title:"Public comment",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Everyone reading this page, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"]}},on=["no","one","two","three"],Fe=(t,e,r)=>{Ae=!0;try{localStorage.setItem(Ce,"1")}catch{}let s=({title:u,what:b,who:y,account:g,link:x})=>k("section",{class:"tb-route"},k("h3",{text:u}),k("p",{text:b}),k("p",{},k("strong",{text:"Who sees it: "}),y),k("p",{},k("strong",{text:"Account: "}),g,x?" ":null,x?k("a",{href:x[1],target:"_blank",rel:"noopener noreferrer",text:x[0]}):null)),i=k("div",{class:"tb-dialog-row"}),c=(document.querySelector(".tb-header")?.dataset.routes??"comment").split(" ").filter(u=>u in Le),d=c.includes("edit")||c.includes("note")?"book":"edition",o=$e("How contributing works",t,k("h2",{text:"How contributing works"}),k("p",{text:`There ${c.length===1?"is one way":`are ${on[c.length]??c.length} ways`} to help with this ${d}. They differ in who sees what you write, and in which account you need.`}),...c.map(u=>s(Le[u])),k("p",{},k("a",{href:e,text:"More about commenting and contributing"})),i),l=k("button",{type:"button",class:"tb-btn",text:"Close"});if(l.addEventListener("click",()=>o.d.close()),r){let u=k("button",{type:"button",class:"tb-btn tb-btn-primary",text:r.label});u.addEventListener("click",()=>o.closeThen(r.run)),i.append(l,u),u.focus()}else i.append(l),l.focus()},Kt=(t,e,r,s)=>nn()?s():Fe(t,e,{label:r,run:s}),rn=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},sn=(t,e)=>{let r={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:rn(),accessed:new Date},s=c=>{let d=k("p",{class:"tb-cite-text"});for(let o of c)d.append(o.italic?k("i",{text:o.text}):o.text);return d},i=(c,d)=>{let o=k("span",{class:"tb-cite-said",role:"status"}),l=k("button",{type:"button",class:"tb-btn",text:"Copy"});return l.addEventListener("click",()=>en(we(d),()=>o.textContent="Copied",()=>o.textContent="Couldn\'t copy: select the text instead")),k("section",{},k("h3",{text:c}),s(d),k("div",{class:"tb-dialog-row"},o,l))},a=Ee(r.licence);$e("Cite this page",e,k("h2",{text:"Cite this page"}),i("APA 7",ye(r)),i(a?`Attribution (${a})`:"Attribution",xe(r)))},an=(t,e,r)=>{let s=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];r&&s.push(["annotations","Public annotations",[["on","On"],["off","Off"]]]);let i=k("p",{class:"tb-panel-note",role:"status"});for(let[a,c,d]of s){let o=k("div",{class:"tb-seg"});for(let[u,b]of d){let y=k("input",{type:"radio",name:`tb-pref-${a}`,value:u});y.checked=e.get(a)===u,y.addEventListener("change",()=>{if(a==="annotations"&&r){if(i.textContent="",u==="on")r.enable();else if(r.disable().reload){let g=k("button",{type:"button",class:"tb-btn",text:"Reload"});g.addEventListener("click",()=>location.reload()),i.append("Highlights hidden. The annotation tab goes away when the page reloads.",g)}return}e.set(a,u),a==="numbers"&&gt("paragraph_numbers_toggled",{to:u})}),o.append(k("label",{},y,b))}let l=k("fieldset",{},k("legend",{text:c}),o);a==="annotations"&&l.append(i),t.append(l)}},Wt=null;window.addEventListener("popstate",()=>Wt?.(location.hash,!1));var ln=(t,e,r,s,i)=>{let a={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:i,track:gt};t.addEventListener("click",o=>{if(o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey){gt("edit_on_github_clicked");return}o.preventDefault(),Mt({...a,mode:"page",trigger:r})});let c=new Map,d=Array.from(document.querySelectorAll("[data-pnum]")).filter(o=>!o.closest(".popover")&&!o.querySelector(":scope > button.tb-pedit"));d.length&&Qe();for(let o of d){let l=tn();l.addEventListener("click",u=>{u.stopPropagation(),Kt(l,s,`Continue: edit \\xB6${o.dataset.pnum}`,()=>Mt({...a,mode:"paragraph",para:o,trigger:l}))}),o.append(l),c.set(o.dataset.pnum??"",{p:o,b:l})}Wt=(o,l)=>{let u=Et.exec(o);if(!u)return;let b=u[1]?c.get(u[1]):void 0;Mt(b?{...a,mode:"paragraph",para:b.p,trigger:b.b,push:l}:{...a,mode:"page",trigger:r,push:l})}},dn=(t,e,r)=>{t.addEventListener("click",s=>{s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),me({endpoint:e,listUrl:t.dataset.history??"",path:t.dataset.path??"",repo:t.dataset.repo??"",branch:t.dataset.branch??"",githubHref:t.href,trigger:r,track:gt}))})},cn=t=>{let e=()=>{t.classList.remove("tb-hdr-icons"),t.scrollWidth>t.clientWidth+1&&t.classList.add("tb-hdr-icons")};if(e(),window.addEventListener("resize",e),typeof ResizeObserver=="function"){let r=new ResizeObserver(()=>requestAnimationFrame(e));r.observe(t);let s=t.querySelector(".tb-hdr-actions");s&&r.observe(s)}return e},un=t=>{let e=o=>t.querySelector(o),r=t.dataset.howTo??"/how-to-comment",s=window,i=e("[data-tb-contribute]"),a=e("[data-tb-more]"),c=o=>{try{o()}catch{}};c(()=>{let o=e("[data-tb-search]"),l=document.querySelector(".search .search-button");!o||!l||(o.addEventListener("click",()=>l.click()),o.hidden=!1)});let d=()=>{gt("annotation_badge_clicked"),s.tbAnnotations.open().then(o=>{o||Te("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};c(()=>{if(!s.tbAnnotations)return;let o=e("[data-tb-annotate]");o&&(o.addEventListener("click",()=>Kt(o,r,"Continue: open annotations",d)),o.querySelector(".tb-anno-count")||o.append(k("span",{class:"tb-anno-count"})),o.hidden=!1);let l=e("[data-tb-comment]");l&&(l.addEventListener("click",d),l.hidden=!1)}),c(()=>{let o=e("#tb-contribute-menu");if(!i||!o)return;qt(i,o,!0,x=>Kt(i,r,"Continue to Contribute",x)),e("[data-tb-explain]")?.addEventListener("click",()=>Fe(i,r));let l=e("button.tb-suggest-btn"),u=l?.dataset.endpoint,b=l&&u&&Yt?()=>Yt(u,l.dataset.path??"",i):void 0,y=e("a.edit-on-github"),g=y?.dataset.editEndpoint;if(y&&g){if(ln(y,g,i,r,b),Et.test(location.hash)){let x=location.hash,T=window.history.state?.tbEditor===!0;T||window.history.replaceState(window.history.state,"",location.pathname+location.search),Wt?.(x,!T)}}else y?.addEventListener("click",()=>gt("edit_on_github_clicked"));l&&b&&(l.addEventListener("click",b),l.hidden=!1),i.hidden=!1}),c(()=>{let o=e("[data-tb-appearance]"),l=e("#tb-appearance");!o||!l||!s.tbPrefs||(an(l,s.tbPrefs,s.tbAnnotations),qt(o,l,!1),o.hidden=!1)}),c(()=>{let o=e("#tb-more-menu");if(!a||!o)return;qt(a,o,!0),e("[data-tb-cite]")?.addEventListener("click",()=>sn(t,a)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let l=e("a.tb-history-link");l?.dataset.revisionEndpoint&&dn(l,l.dataset.revisionEndpoint,a);let u=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");u&&(!b||!b.querySelector("a.internal")?(u.setAttribute("aria-disabled","true"),u.append(k("span",{class:"tb-mi-s",text:"No other page links here"}))):u.addEventListener("click",()=>{let g=b.querySelector("h3")??b;g.tabIndex=-1,b.scrollIntoView({block:"start"}),g.focus({preventScroll:!0})}));let y=e("[data-tb-download]");y?.addEventListener("click",()=>{fetch(y.dataset.tbDownload).then(g=>g.ok?g.blob():Promise.reject(new Error(String(g.status)))).then(g=>{let x=URL.createObjectURL(g),T=k("a",{href:x,download:y.dataset.file??"page.md"});document.body.append(T),T.click(),T.remove(),setTimeout(()=>URL.revokeObjectURL(x),1e3)}).catch(()=>Te("That didn\'t download just now. View source has the same file."))}),a.hidden=!1}),c(()=>{cn(t)})},pn=()=>{try{Yt?.closeIfOpen(),ue(),ge();for(let t of Array.from(document.querySelectorAll(".tb-page-controls")))t.dataset.tbWired||(t.dataset.tbWired="1",un(t))}catch{}};document.addEventListener("nav",pn);\n';

// src/components/EditOnGitHub.tsx
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
  howTo: "how-to-comment"
};
var historyUrl = (slug) => `/.well-known/history/${encodePath(slug)}.json`;
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
  const Component = ({ fileData, cfg }) => {
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
      ) : item("a", { class: "edit-on-github", href: editHref, ...away }, "Edit on GitHub \u2197", SUBTITLES.github) : null,
      // Hidden until the script arms the form, so it is never a dead control.
      hasSource && opts.suggestEndpoint ? item(
        "button",
        { class: "tb-suggest-btn", hidden: true, "data-endpoint": opts.suggestEndpoint, "data-path": path },
        "Note to the authors",
        SUBTITLES.note
      ) : null,
      item("button", { "data-tb-comment": "", hidden: true }, "Public comment", SUBTITLES.comment),
      item("button", { "data-tb-explain": "" }, "How contributing works", SUBTITLES.explain)
    ];
    const more = [
      item("button", { "data-tb-cite": "" }, "Cite this page"),
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
          "data-path": path,
          "data-repo": opts.repo,
          "data-branch": opts.branch
        } : { class: "tb-history-link", href: historyHref, ...away },
        opts.editor && opts.revisionEndpoint && slug ? "Page history" : "Page history \u2197"
      ) : null,
      item("button", { "data-tb-backlinks": "" }, "What links here"),
      hasSource ? item(
        "button",
        {
          "data-tb-download": `https://raw.githubusercontent.com/${opts.repo}/${sha}/${gh}`,
          "data-file": path.split("/").pop()
        },
        "Download as Markdown"
      ) : null,
      hasSource ? item("a", { href: `https://github.com/${opts.repo}/blob/${sha}/${gh}`, ...away }, "View source \u2197") : null
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
        // The ways to contribute this site has, for the explainer on every page:
        // a book's editor and suggest form, or an edition's GitHub link.
        "data-routes": [
          opts.repo ? opts.editor && opts.suggestEndpoint ? "edit" : "github" : null,
          opts.suggestEndpoint ? "note" : null,
          "comment"
        ].filter(Boolean).join(" "),
        ...hasSource ? { "data-source-path": path } : {},
        ...hasSource && opts.sourceCommit ? { "data-source-commit": opts.sourceCommit } : {},
        ...blob ? { "data-source-blob": blob } : {}
      },
      _(
        "div",
        { class: "tb-hdr-where" },
        _("a", { class: "tb-hdr-title", href: root }, cfg?.pageTitle ?? ""),
        crumbs.length ? _("nav", { class: "tb-hdr-crumbs", "aria-label": "Breadcrumb" }, ...crumbs) : null
      ),
      _(
        "div",
        { class: "tb-hdr-actions" },
        btn({ "data-tb-search": "", "aria-keyshortcuts": "Control+K Meta+K" }, SVG(SEARCH), "Search"),
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
          SVG(COMMENT),
          "Annotate"
        ),
        _(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            { "data-tb-appearance": "", "aria-expanded": "false", "aria-controls": "tb-appearance" },
            _("span", { class: "tb-hdr-glyph", "aria-hidden": "true" }, "Aa"),
            "Appearance"
          ),
          _("div", { class: "tb-panel", id: "tb-appearance", role: "dialog", "aria-label": "Appearance", hidden: true })
        ),
        _(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            { "data-tb-more": "", "aria-haspopup": "menu", "aria-expanded": "false", "aria-controls": "tb-more-menu" },
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
        _("a", { class: "tb-hdr-plain", href: historyHref, ...away }, "View revision history \u2197")
      ) : null
    );
  };
  const iconsOnly = (scope) => `
${scope} .tb-hdr-where, ${scope} .tb-hdr-actions { gap: 0.3rem; }
${scope} .tb-hdr-crumbs { display: none; }
${scope} .tb-hdr-btn { padding: 0.3rem 0.45rem; }
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
.tb-header {
  position: sticky;
  top: 0;
  z-index: 1;
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
/* The sidebars hold Quartz's search overlay, the graph's full view and the phone
   menu: they stack above the header. On a phone they are static, so they get a
   position here to make that stack (else the open menu sits under the header and
   a tap on its first links hits the header). */
/* Quartz's own rules are .page > #quartz-body .sidebar.left/.right: these match
   their weight and come later. */
.page > #quartz-body > .sidebar.left,
.page > #quartz-body > .sidebar.right { z-index: 2; }
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
.tb-hdr-crumbs a { color: inherit; text-decoration: none; }
.tb-hdr-crumbs a::before { content: "\u203A"; margin-right: 0.4rem; color: var(--tb-faint, var(--gray)); }
.tb-hdr-title:hover, .tb-hdr-crumbs a:hover { color: var(--tb-accent, var(--secondary)); }
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
.tb-panel fieldset { margin: 0 0 0.7rem; padding: 0; border: 0; }
.tb-panel fieldset:last-of-type { margin-bottom: 0; }
.tb-panel legend { margin-bottom: 0.3rem; padding: 0; font-weight: 700; color: var(--tb-ink, var(--dark)); }
.tb-panel .tb-seg { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.tb-panel .tb-seg label {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.25rem 0.55rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 999px;
  color: var(--tb-ink, var(--dark)); cursor: pointer;
}
.tb-panel .tb-seg label:has(input:checked) {
  border-color: var(--tb-accent, var(--secondary));
  background: var(--tb-accent-wash, var(--highlight));
  color: var(--tb-accent, var(--secondary));
}
.tb-panel .tb-seg input { margin: 0; accent-color: var(--tb-accent, var(--secondary)); }
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
${iconsOnly(".tb-header.tb-hdr-icons")}
@media (max-width: 800px) {
  .tb-header { gap: 0.4rem; margin-bottom: 1rem; }
}
.tb-dialog {
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
  color: var(--tb-faint, var(--gray)); font-size: 1.4rem; line-height: 1; cursor: pointer;
}
.tb-dialog-row { display: flex; align-items: center; justify-content: flex-end; gap: 0.6rem; margin-top: 0.75rem; }
.tb-route { padding-top: 0.1rem; }
.tb-cite-text { padding: 0.6rem 0.75rem; border-radius: 8px; background: var(--tb-bg-soft, var(--lightgray)); overflow-wrap: anywhere; }
.tb-cite-said { color: var(--tb-muted, var(--gray)); }
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
  return Component;
};
var EditOnGitHub_default = EditOnGitHub;

export { EditOnGitHub_default as EditOnGitHub };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map