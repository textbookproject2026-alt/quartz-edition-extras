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
var controls_inline_default = 'var ne=/^\\s{0,3}(```|~~~)/,Oe=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,_e=t=>{let e=t.split(`\n`),r=[],s=0;if(e[0]?.trim()==="---"){let a=e.findIndex((c,d)=>d>0&&(c.trim()==="---"||c.trim()==="..."));a>0&&(s=a+1)}let i=0;for(;s<e.length;){let a=e[s];if(!a.trim()){s++;continue}let c=ne.exec(a);if(c||a.trim()==="$$"){let p=c?c[1]:"$$",b=s+1;for(;b<e.length&&!e[b].trim().startsWith(p);)b++;s=b+1;continue}let d=s;for(;d<e.length&&e[d].trim()&&!ne.test(e[d]);)d++;let n=e.slice(s,d).join(`\n`),l=!Oe.test(a);r.push({start:s,text:n,ordinal:l?++i:0}),s=d}return r},De=t=>oe(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,r)=>r.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),oe=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],Re=(t,e)=>{if(!t.length||!e.length)return 0;let r=new Map;for(let i of t)r.set(i,(r.get(i)??0)+1);let s=0;for(let i of e){let a=r.get(i)??0;a>0&&(s++,r.set(i,a-1))}return s/Math.max(t.length,e.length)};var re=(t,e,r)=>{let s=oe(e);if(!s.length)return null;let i=null,a=0,c=1/0;for(let d of _e(t)){let n=Re(De(d.text),s);if(n<.75)continue;let l=d.ordinal?Math.abs(d.ordinal-r):1e6;(n>a+.02||Math.abs(n-a)<=.02&&l<c)&&(i=d,a=Math.max(n,a),c=l)}return i};var Nt=(t,e)=>{let r=0;for(;r<t.length&&r<e.length&&t[r]===e[r];)r++;let s=t.length,i=e.length;for(;s>r&&i>r&&t[s-1]===e[i-1];)s--,i--;let a=t.slice(0,r).map(p=>({t:"=",v:p})),c=t.slice(s).map(p=>({t:"=",v:p})),d=t.slice(r,s),n=e.slice(r,i),l;if((d.length+1)*(n.length+1)>4e5)l=[...d.map(p=>({t:"-",v:p})),...n.map(p=>({t:"+",v:p}))];else{let p=n.length+1,b=new Uint32Array((d.length+1)*p);for(let x=d.length-1;x>=0;x--)for(let g=n.length-1;g>=0;g--)b[x*p+g]=d[x]===n[g]?b[(x+1)*p+g+1]+1:Math.max(b[(x+1)*p+g],b[x*p+g+1]);l=[];let h=0,v=0;for(;h<d.length&&v<n.length;)d[h]===n[v]?(l.push({t:"=",v:d[h]}),h++,v++):b[(h+1)*p+v]>=b[h*p+v+1]?l.push({t:"-",v:d[h++]}):l.push({t:"+",v:n[v++]});for(;h<d.length;)l.push({t:"-",v:d[h++]});for(;v<n.length;)l.push({t:"+",v:n[v++]})}return[...a,...l,...c]},Ot=t=>t.split(/(\\s+)/).filter(e=>e!==""),se=(t,e,r=2)=>{let s=Nt(t.split(`\n`),e.split(`\n`)),i=[],a=1,c=1,d=null,n=0;return s.forEach((l,p)=>{s.slice(Math.max(0,p-r),p+r+1).some(h=>h.t!=="=")?((!d||l.t==="="&&n>2*r)&&(d={a,b:c,ops:[]},i.push(d)),d.ops.push(l),n=l.t==="="?n+1:0):(d=null,n=0),l.t!=="+"&&a++,l.t!=="-"&&c++}),i};var yt="tb-editor",ie="tb-editor-style",Dt="tb-gh-identity",Pe=7.5*60*60*1e3,ae=2e4,Ue=200,wt=/^#edit(?:-(\\d+))?$/,je=t=>t?`#edit-${t}`:"#edit",le={tbEditor:!0},ze="This page has changes waiting for review; you\\u2019re editing the latest draft.",o=(t,e={},...r)=>{let s=document.createElement(t);for(let[i,a]of Object.entries(e))a!==!1&&(i==="text"?s.textContent=String(a):i==="class"?s.className=String(a):s.setAttribute(i,a===!0?"":String(a)));for(let i of r)i&&s.append(i);return s},de="http://www.w3.org/2000/svg",bt=t=>{let e=document.createElementNS(de,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let r=document.createElementNS(de,"path");return r.setAttribute("d",t),r.setAttribute("fill","currentColor"),e.append(r),e},ce="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",At="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",Rt="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",Ge="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Ft=t=>{let e=t?.userMessage,r=typeof e=="string"?e.trim():"";return r?r.slice(0,Ue):null},qe=()=>{try{let t=sessionStorage.getItem(Dt);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Pe?null:e}catch{return null}},_t=t=>{try{t?sessionStorage.setItem(Dt,JSON.stringify(t)):sessionStorage.removeItem(Dt)}catch{}},Pt=()=>{if(document.getElementById(ie))return;let t=`#${yt}`,e=o("style",{id:ie});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-faint, #9B9BA1); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-faint, #9B9BA1); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: #FFFFFF; }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-faint, #9B9BA1); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n${t} .tb-ed-del { background: #FFEBE9; }\n${t} .tb-ed-add { background: #E6FFEC; }\n${t} .tb-ed-del del { background: #FFC1C0; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: #ABF2BC; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},Ye=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,r)=>r.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),Ke="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",Ut=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(Ke).forEach(s=>s.remove()),e.querySelectorAll("*").forEach(s=>{for(let i of Array.from(s.attributes)){let a=i.value.trim().toLowerCase();(i.name.startsWith("on")||(i.name==="href"||i.name==="src")&&/^(javascript|data|vbscript):/.test(a))&&s.removeAttribute(i.name)}s.tagName==="A"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"))});let r=document.createDocumentFragment();return r.append(...Array.from(e.body.childNodes)),r},jt=(t,e)=>{let r=o("div",{class:"tb-ed-diff"}),s=se(t,e);if(!s.length)return r.append(o("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),r;let i=(a,c)=>{let d=o("div",{class:`tb-ed-line${a==="-"?" tb-ed-del":a==="+"?" tb-ed-add":""}`}),n=o("span");return typeof c=="string"?n.textContent=c||" ":n.append(...c),d.append(o("span",{text:a==="="?" ":a}),n),d};for(let a of s){let c=o("div",{class:"tb-ed-hunk"},o("div",{class:"tb-ed-hh",text:`Line ${a.b}`}));for(let d=0;d<a.ops.length;){let n=a.ops[d];if(n.t==="="){c.append(i("=",n.v)),d++;continue}let l=[],p=[];for(;a.ops[d]?.t==="-";)l.push(a.ops[d++].v);for(;a.ops[d]?.t==="+";)p.push(a.ops[d++].v);let b=Math.min(l.length,p.length),h=l.map((v,x)=>x<b?Nt(Ot(v),Ot(p[x])):null);l.forEach((v,x)=>{let g=h[x];c.append(i("-",g?g.filter(w=>w.t!=="+").map(w=>w.t==="-"?o("del",{text:w.v}):document.createTextNode(w.v)):v))}),p.forEach((v,x)=>{let g=h[x];c.append(i("+",g?g.filter(w=>w.t!=="-").map(w=>w.t==="+"?o("ins",{text:w.v}):document.createTextNode(w.v)):v))})}r.append(c)}return r},Ct=null,ue=()=>Ct?.(),Ht=t=>{if(Ct)return;Pt();let e=document.body.style.overflow,r=new URL(t.endpoint,location.href).origin,s=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),i=t.path.split("/"),a=i.pop(),c=t.para&&Number(t.para.getAttribute("data-pnum"))||0,d=t.mode,n="",l="",p="drafts",b=null,h="",v=qe(),x=!1,g=!1,w=null,A=null,ot=!1,rt=window.scrollY,G=je(d==="paragraph"?c:0),B=o("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),D=o("span",{class:"tb-ed-pill"},bt(At),o("span",{text:p})),I=o("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},bt(Rt));I.append(o("span",{text:t.repo.split("/").pop()||t.repo}));for(let u of i)I.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{text:u}));I.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{class:"tb-ed-file",text:a}));let y=o("span",{class:"tb-ed-muted",text:c?` \\xB7 \\xB6${c}`:""});I.append(y,D);let E=o("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),M=o("div",{class:"tb-ed-head"},I,E),S=o("div",{class:"tb-ed-discard",role:"alert",hidden:!0},o("span",{text:"Discard your changes?"})),K=o("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),P=o("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});S.append(K,P);let j=o("div",{class:"tb-ed-main"}),U=o("div",{class:"tb-ed-inner"}),z=o("p",{class:"tb-ed-note",hidden:!0}),$=o("p",{class:"tb-ed-note",hidden:!0,text:ze}),N=o("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),q=o("div",{class:"tb-ed-gate",hidden:!0});U.append($,z,N,q),j.append(U),B.append(M,S,j);let gt=["Edit","Preview","Changes"],st=o("div",{role:"tablist","aria-label":"Editor view"}),Y=gt.map((u,m)=>o("button",{type:"button",role:"tab",id:`tb-ed-tab-${m}`,"aria-controls":`tb-ed-panel-${m}`,"aria-selected":m===0?"true":"false",tabindex:m===0?0:-1,text:u==="Edit"?"Edit":u==="Preview"?"Preview":"Changes"}));st.append(...Y);let et=o("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),nt=o("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),W=o("div",{class:"tb-ed-bar"},st,o("div",{class:"tb-ed-actions"},et,nt)),V=o("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),Z=o("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),R=o("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),C=[o("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},Z,V,R),o("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),o("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],Q=o("div",{class:"tb-ed-box"},W,...C),it=o("p",{class:"tb-ed-foot"}),at=()=>V.value,Et=()=>h,kt=u=>{Y.forEach((m,f)=>{m.setAttribute("aria-selected",f===u?"true":"false"),m.tabIndex=f===u?0:-1,C[f].hidden=f!==u}),u===1&&T(),u===2&&(C[2].textContent="",C[2].append(jt(Et(),at())))};Y.forEach((u,m)=>{u.addEventListener("click",()=>kt(m)),u.addEventListener("keydown",f=>{let L=f.key==="ArrowRight"?1:f.key==="ArrowLeft"?-1:0;if(!L)return;f.preventDefault();let tt=(m+L+Y.length)%Y.length;kt(tt),Y[tt].focus()})});let mt=0,T=()=>{let u=C[1];u.textContent="",u.className="tb-ed-panel tb-ed-preview";let m=o("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});u.append(m);let f=++mt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:Ye(at()),mode:"markdown"})}).then(L=>L.ok?L.text():Promise.reject(new Error(String(L.status)))).then(L=>{f===mt&&(u.textContent="",u.append(Ut(L)))}).catch(()=>{f===mt&&(m.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};V.addEventListener("input",()=>{g=at()!==h,nt.disabled=!g});let H=o("div",{class:"tb-ed-scrim",hidden:!0}),_=o("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});H.append(_),B.append(H);let lt=(u,m,f,L=!1)=>{f.id=u;let tt=o("p",{class:"tb-ed-err",id:`${u}-err`}),O=o("label",{for:u,text:m},L?o("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:o("div",{class:"tb-ed-field"},O,f,tt),control:f,err:tt}},F=lt("tb-ed-msg","Title",o("input",{type:"text",maxlength:200,autocomplete:"off"})),X=lt("tb-ed-desc","Extended description",o("textarea",{rows:3,maxlength:5e3}),!0),J=o("div",{class:"tb-ed-who"}),pt=o("div",{class:"tb-ed-what"},bt(At)),ht=o("span");pt.append(ht);let Wt=o("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),ft=o("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),vt=o("form",{novalidate:!0},o("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),F.wrap,X.wrap,J,pt,o("div",{class:"tb-ed-row"},Wt,ft)),dt=o("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});_.append(vt,dt);let Tt=()=>{if(J.textContent="",v){let u=o("img",{src:`https://avatars.githubusercontent.com/u/${v.id}?s=56`,alt:""}),m=o("button",{type:"button",class:"tb-ed-link",text:"Sign out"});m.addEventListener("click",()=>{v=null,_t(null),Tt()}),J.append(u,o("span",{},"Signed in as ",o("strong",{text:`@${v.login}`})," \\u2014 this edit will be credited to your GitHub account."),m)}else J.append(Vt(),o("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Vt=()=>{let u=o("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},bt(Ge),"Sign in with GitHub");return u.addEventListener("click",()=>Me(u)),u},He=()=>{q.textContent="";let u=Vt(),m=o("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let f=o("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});f.addEventListener("click",()=>{$t(),t.suggest()}),m.append(f," instead: it needs no account.")}else m.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");q.append(o("h2",{text:"Sign in to edit"}),o("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),o("p",{},u),m),N.hidden=!0,q.hidden=!1,u.focus()},Zt=u=>{if(u.origin!==r)return;let m=u.data;if(!(!m||m.type!=="tb-github-identity")){if(w=null,m.error||typeof m.token!="string"||typeof m.login!="string"){t.track("github_signin",{outcome:m.error==="denied"?"cancelled":"error"});return}if(v={token:m.token,login:m.login,id:Number(m.id)||0,name:m.name??"",at:Date.now()},_t(v),t.track("github_signin",{outcome:"success"}),!ot)return ee();Tt(),H.hidden||F.control.focus()}},Me=u=>{let m=`${s}?origin=${encodeURIComponent(location.origin)}`;w=window.open(m,"tb-github-signin","popup,width=560,height=720"),!w&&!u.parentElement?.querySelector(".tb-ed-err")&&u.after(o("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Zt);let Se=(u,m)=>{u.control.setAttribute("aria-invalid","true"),u.control.setAttribute("aria-describedby",u.err.id),u.err.textContent=m},Xt=u=>{u.control.removeAttribute("aria-invalid"),u.control.removeAttribute("aria-describedby"),u.err.textContent=""};F.control.addEventListener("input",()=>Xt(F));let Be=()=>{F.control.value||(F.control.value=d==="paragraph"&&c?`Edit \\xB6${c} of ${a}`:`Update ${a}`),ht.textContent="",ht.append("This creates a new branch and opens a proposal to merge it into ",o("code",{text:p}),". Nothing changes in the book until an editor accepts it."),Tt(),vt.hidden=!1,dt.hidden=!0,H.hidden=!1,F.control.focus(),F.control.select()},Bt=()=>{H.hidden=!0,nt.focus()};nt.addEventListener("click",Be),Wt.addEventListener("click",Bt),H.addEventListener("mousedown",u=>{u.target===H&&!x&&Bt()});let It=(u,m,f,L)=>{if(!B.isConnected)return;dt.textContent="",dt.append(o("h2",{text:u}),o("p",{text:m})),f&&dt.append(o("p",{},o("a",{href:f.href,target:"_blank",rel:"noopener",text:f.text})));let tt=o("button",{type:"button",class:`tb-ed-btn${L?" tb-ed-primary":""}`,text:L?"Back to my edit":"Close"});tt.addEventListener("click",L?()=>{dt.hidden=!0,vt.hidden=!1,ft.focus()}:()=>Lt(!0)),dt.append(o("div",{class:"tb-ed-row"},tt)),vt.hidden=!0,dt.hidden=!1,dt.focus()};vt.addEventListener("submit",u=>{if(u.preventDefault(),x)return;let m=null;if(Xt(F),F.control.value.trim()?v||(m=J.querySelector("button")):(Se(F,"Please give your change a short title."),m=F.control),m){m.focus();return}let f={mode:d,path:t.path,baseSha:l,title:F.control.value.trim(),description:X.control.value.trim()};d==="page"?f.content=at():(f.startLine=b.start,f.original=b.text,f.replacement=at(),c&&(f.paragraph=c)),f.identity=v.token,x=!0,ft.disabled=!0,ft.textContent="Proposing\\u2026";let L=A=new AbortController,tt=setTimeout(()=>L.abort(),ae);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f),signal:L.signal}).then(async O=>{let ct=null;try{ct=await O.json()}catch{ct=null}if(O.status===401&&v&&(v=null,_t(null),Tt()),!O.ok)throw Object.assign(new Error(String(O.status)),{userMessage:Ft(ct)});return ct}).then(O=>{g=!1,O.fallback&&typeof O.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:d}),It("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:O.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:d}),It("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof O.prUrl=="string"?{href:O.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(O=>{t.track("page_edit_submitted",{outcome:"error",mode:d}),It("That did not go through",O&&O.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(tt),A===L&&(A=null),x=!1,ft.disabled=!1,ft.textContent="Propose changes"})});let Ie=u=>Array.from(u.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(m=>!m.disabled&&m.tabIndex>=0&&!m.closest("[hidden]")),Jt=u=>{if(u.key==="Escape"){u.preventDefault(),H.hidden?xt():x||(!dt.hidden&&vt.hidden&&!g?Lt(!0):Bt());return}if(u.key!=="Tab")return;let m=H.hidden?B:_,f=Ie(m);if(!f.length){u.preventDefault(),m.focus();return}let L=f.indexOf(document.activeElement);(u.shiftKey?L<=0:L===-1||L===f.length-1)&&(u.preventDefault(),f[u.shiftKey?f.length-1:0].focus())},Qt=u=>{g&&(u.preventDefault(),u.returnValue="")},Lt=(u=!1)=>{if(!u&&g)return xt();g=!1,wt.test(location.hash)?history.back():$t()},te=()=>{if(!wt.test(location.hash)){if(g)return history.pushState(le,"",G),xt();$t()}},$t=()=>{Ct=null,A?.abort(),w?.close(),document.removeEventListener("keydown",Jt,!0),window.removeEventListener("message",Zt),window.removeEventListener("beforeunload",Qt),window.removeEventListener("popstate",te),B.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,rt)},xt=()=>{if(!g)return Lt(!0);S.hidden=!1,P.focus()};K.addEventListener("click",()=>Lt(!0)),P.addEventListener("click",()=>{S.hidden=!0,V.focus()}),E.addEventListener("click",xt),et.addEventListener("click",xt),document.addEventListener("keydown",Jt,!0),window.addEventListener("beforeunload",Qt),window.addEventListener("popstate",te),Ct=$t,t.push!==!1&&history.pushState(le,"",G),document.body.style.overflow="hidden",document.body.append(B),E.focus(),t.track("page_editor_opened",{mode:d});let Ne=u=>{N.textContent="",N.removeAttribute("class"),N.append(u+" ",o("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},ee=()=>{if(!v)return He();ot=!0,q.hidden=!0,N.hidden=!1;let u=new AbortController,m=setTimeout(()=>u.abort(),ae);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:u.signal}).then(async f=>{let L=null;try{L=await f.json()}catch{L=null}if(!f.ok)throw Object.assign(new Error(String(f.status)),{userMessage:Ft(L)});return L}).then(f=>{if(B.isConnected){if(typeof f?.content!="string"||typeof f.sha!="string")throw new Error("bad source");if(n=f.content,l=f.sha,p=typeof f.branch=="string"?f.branch:p,D.lastChild.textContent=p,$.hidden=!t.builtBlob||t.builtBlob===l,d==="paragraph"&&(b=t.para?re(n,t.para.textContent??"",c):null,b||(d="page",y.textContent="",z.textContent=`We couldn\\u2019t find \\xB6${c} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,z.hidden=!1)),d==="paragraph"&&b){Q.classList.add("tb-ed-para");let L=n.split(`\n`),tt=b.text.split(`\n`).length,O=L.slice(Math.max(0,b.start-3),b.start).join(`\n`).trim(),ct=L.slice(b.start+tt,b.start+tt+3).join(`\n`).trim();Z.textContent=O.length>220?`\\u2026${O.slice(-220)}`:O,R.textContent=ct.length>220?`${ct.slice(0,220)}\\u2026`:ct,Z.hidden=!O,R.hidden=!ct,h=b.text,it.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else h=n,it.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";V.value=h,N.remove(),U.append(Q,it),V.setSelectionRange(0,0),V.focus()}}).catch(f=>{B.isConnected&&Ne(f&&f.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(m))};ee()};var pe="tb-history-style",We=30,be=2e4,Ve=()=>{if(document.getElementById(pe))return;let t=`#${yt}`,e=o("style",{id:pe});e.textContent=`\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-hi-list li + li { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; padding: 0.7rem 1rem; border: 0; background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-msg { display: block; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.15rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 0.75rem; }\n${t} .tb-hi-head { margin: 0 0 0.75rem; }\n${t} .tb-hi-head h2 { margin: 0; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n`,document.head.append(e)},Ze=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric"})},zt=async(t,e)=>{let r=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),s=null;try{s=await r.json()}catch{}if(!r.ok){let i=new Error(`HTTP ${r.status}`);throw i.userMessage=Ft(s),i}return s},Mt=null,ge=()=>Mt?.(),me=t=>{if(Mt||document.getElementById(yt))return;Pt(),Ve();let e=document.body.style.overflow,r=null,s=0,i=new Map,a=o("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),c=t.path.split("/"),d=c.pop(),n=o("div",{class:"tb-ed-crumbs",id:"tb-hi-title"},bt(Rt),o("span",{class:"tb-ed-file",text:"History"}));n.append(o("span",{class:"tb-ed-sep",text:"\\xB7"}),o("span",{text:t.repo.split("/").pop()||t.repo}));for(let y of c)n.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{text:y}));n.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{text:d})),n.append(o("span",{class:"tb-ed-pill"},bt(At),o("span",{text:t.branch})));let l=o("button",{type:"button",class:"tb-ed-x","aria-label":"Close the history",text:"\\xD7"}),p=o("div",{class:"tb-ed-main"}),b=o("div",{class:"tb-ed-inner"});p.append(b),a.append(o("div",{class:"tb-ed-head"},n,l),p);let h=y=>o("p",{class:"tb-ed-muted",role:"status",text:y}),v=(y,E)=>{let M=o("div",{class:"tb-ed-note",role:"alert"});return M.append(o("span",{text:`${y?.userMessage||E} `}),o("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),M},x=()=>{r?.abort();let y=new AbortController;r=y;let E=setTimeout(()=>y.abort(),be);return{signal:y.signal,done:()=>clearTimeout(E),current:()=>r===y}},g=y=>y.reader&&i.get(y.sha)||y.who,w=y=>`${g(y)} \\xB7 ${Ze(y.date)}`,A=null,ot=()=>{let y=[...new Set((A??[]).filter(K=>K.reader).map(K=>K.sha))].slice(0,We);if(!y.length)return;let E=new URL(t.endpoint,location.href);E.searchParams.set("shas",y.join(","));let M=new AbortController,S=setTimeout(()=>M.abort(),be);zt(E.toString(),M.signal).then(K=>{let P=K?.names??{};for(let[U,z]of Object.entries(P))typeof z=="string"&&z.trim()&&i.set(U,z.trim().slice(0,80));let j=b.querySelectorAll(".tb-hi-list .tb-hi-meta");A?.forEach((U,z)=>{j[z]&&(j[z].textContent=w(U))})}).catch(()=>{}).finally(()=>clearTimeout(S))},rt=()=>{if(b.textContent="",!A)return;if(!A.length){b.append(h("This page has no published revisions yet."));return}b.append(o("p",{class:"tb-ed-muted",text:`${A.length} published ${A.length===1?"version":"versions"} of this page, newest first. Open one to see what changed.`}));let y=o("ol",{class:"tb-hi-list"});A.forEach((E,M)=>{let S=o("button",{type:"button",class:"tb-hi-rev"},o("span",{class:"tb-hi-msg",text:E.message||"(no description)"}),o("span",{class:"tb-hi-meta",text:w(E)}));S.addEventListener("click",()=>{s=p.scrollTop,G(M)}),y.append(o("li",{},S))}),b.append(y),p.scrollTop=s},G=y=>{let E=A[y];b.textContent="";let M=o("button",{type:"button",class:"tb-ed-btn tb-hi-back",text:"\\u2190 All revisions"});M.addEventListener("click",()=>{r?.abort(),rt(),(b.querySelectorAll(".tb-hi-rev")[y]??l).focus()});let S=o("p",{class:"tb-ed-muted",text:w(E)}),K=o("div",{class:"tb-hi-head"},o("h2",{text:E.message||"(no description)"}),S),P=h("Loading this revision\\u2026");b.append(M,K,P),p.scrollTop=0,M.focus(),t.track("page_revision_opened");let j=x(),U=new URL(t.endpoint,location.href);U.searchParams.set("sha",E.sha),U.searchParams.set("path",E.path),zt(U.toString(),j.signal).then(z=>{if(!j.current())return;let $=z;E.reader&&typeof $.proposer=="string"&&$.proposer.trim()&&(i.set(E.sha,$.proposer.trim().slice(0,80)),S.textContent=w(E));let N=typeof $.before=="string"?$.before:"",q=typeof $.after=="string"?$.after:"",gt=["Changes","Page as it was"],st=o("div",{role:"tablist","aria-label":"Revision view"}),Y=gt.map((R,C)=>o("button",{type:"button",role:"tab",id:`tb-hi-tab-${C}`,"aria-controls":`tb-hi-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:R}));st.append(...Y);let et=o("div",{role:"tabpanel",id:"tb-hi-panel-0","aria-labelledby":"tb-hi-tab-0",tabindex:0});$.status==="added"&&et.append(o("p",{class:"tb-ed-panel tb-ed-muted",text:"The page was first published in this revision."}));let nt=typeof $.previousPath=="string"&&$.previousPath!==E.path?$.previousPath:"";nt&&et.append(o("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved here from ${nt}${N===q?"; its text didn\\u2019t change.":"."}`})),(!nt||N!==q)&&et.append(jt(N,q));let W=o("div",{role:"tabpanel",id:"tb-hi-panel-1","aria-labelledby":"tb-hi-tab-1",tabindex:0,hidden:!0,class:"tb-ed-panel tb-ed-preview"});typeof $.html=="string"&&$.html?W.append(Ut($.html)):W.append(o("p",{class:"tb-ed-muted",text:"The page was removed in this revision."}));let V=[et,W],Z=R=>Y.forEach((C,Q)=>{C.setAttribute("aria-selected",Q===R?"true":"false"),C.tabIndex=Q===R?0:-1,V[Q].hidden=Q!==R});Y.forEach((R,C)=>{R.addEventListener("click",()=>Z(C)),R.addEventListener("keydown",Q=>{let it=Q.key==="ArrowRight"?1:Q.key==="ArrowLeft"?-1:0;if(!it)return;Q.preventDefault();let at=(C+it+Y.length)%Y.length;Z(at),Y[at].focus()})}),P.replaceWith(o("div",{class:"tb-ed-box"},o("div",{class:"tb-ed-bar"},st),...V))}).catch(z=>{j.current()&&P.replaceWith(v(z,"This revision couldn\\u2019t be loaded just now. Please try again in a moment."))}).finally(j.done)},B=y=>{if(y.key==="Escape"){y.preventDefault(),D();return}if(y.key!=="Tab")return;let E=Array.from(a.querySelectorAll("a[href], button, [tabindex]")).filter(S=>!S.disabled&&S.tabIndex>=0&&!S.closest("[hidden]"));if(!E.length)return;let M=E.indexOf(document.activeElement);(y.shiftKey?M<=0:M===-1||M===E.length-1)&&(y.preventDefault(),E[y.shiftKey?E.length-1:0].focus())},D=()=>{Mt=null,r?.abort(),document.removeEventListener("keydown",B,!0),a.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};l.addEventListener("click",D),document.addEventListener("keydown",B,!0),Mt=D,document.body.style.overflow="hidden",document.body.append(a),l.focus(),t.track("page_history_opened"),b.append(h("Loading this page\\u2019s history\\u2026"));let I=x();zt(t.listUrl,I.signal).then(y=>{I.current()&&(A=(Array.isArray(y)?y:[]).filter(E=>!!E&&typeof E.sha=="string"&&typeof E.path=="string"),rt(),ot())}).catch(y=>{I.current()&&(b.textContent="",b.append(v(y,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(I.done)};var fe={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},ve=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),Xe=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(s=>`${s.charAt(0).toUpperCase()}.`).join(" ")}`},Je=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,he=t=>/[.?!]$/.test(t)?t:`${t}.`,ye=t=>{let e=Je(ve(t.authors).map(Xe)),r=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),s=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",i=[],a=s?[{text:`${he(s)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)i.push({text:`${he(e)} (n.d.). `},...a);else if(a.length){let[c,...d]=a;i.push({...c,text:c.text.replace(/ $/,"")},{text:" (n.d.). "},...d)}else i.push({text:"(n.d.). "});return i.push({text:`Retrieved ${r}, from ${t.url}`}),i},xe=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=fe[t.licence],s=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&s.push({text:` by ${ve(t.authors).join(", ")}`}),e&&t.bookTitle&&s.push({text:", from "},{text:t.bookTitle,italic:!0}),s.push({text:`, ${t.url}`}),r?s.push({text:`, is licensed under ${r.name} (${r.url})`}):t.licence&&s.push({text:`, is licensed under ${t.licence}`}),s.push({text:"."}),s},we=t=>t.map(e=>e.text).join(""),Ee=t=>fe[t]?.name??t;var ut=(t,e)=>{try{let r=window.tbTrack;typeof r=="function"&&(e?r(t,e):r(t))}catch{}},qt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",r="tb-suggest-title",c=g=>{let w=g?.userMessage,A=typeof w=="string"?w.trim():"";return A?A.slice(0,200):null},d=()=>{if(document.getElementById(e))return;let g=document.createElement("style");g.id=e,g.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: #FFFFFF; cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(g)},n=(g,w,A,ot=!1)=>{let rt=document.createElement("div");rt.className="tb-sg-field";let G=document.createElement("label");if(G.setAttribute("for",g),G.textContent=w,ot){let D=document.createElement("span");D.className="tb-sg-opt",D.textContent=" (optional)",G.append(D)}let B=document.createElement("p");return B.className="tb-sg-err",B.id=g+"-err",A.id=g,!ot&&!A.readOnly&&(A.required=!0),rt.append(G,A,B),{wrap:rt,control:A,err:B,hintId:null}},l=g=>{let w=[];g.err.textContent&&w.push(g.err.id),g.hintId&&w.push(g.hintId),w.length?g.control.setAttribute("aria-describedby",w.join(" ")):g.control.removeAttribute("aria-describedby")},p=(g,w)=>{g.control.setAttribute("aria-invalid","true"),g.err.textContent=w,l(g)},b=g=>{g.control.hasAttribute("aria-invalid")&&(g.control.removeAttribute("aria-invalid"),g.err.textContent="",l(g))},h=null,v=(g,w,A)=>{if(h)return;d();let ot=A,rt=document.body.style.overflow,G=null,B=!1,D=document.createElement("div");D.id=t;let I=document.createElement("div");I.className="tb-sg-dialog",I.tabIndex=-1,I.setAttribute("role","dialog"),I.setAttribute("aria-modal","true"),I.setAttribute("aria-labelledby",r);let y=document.createElement("div");y.className="tb-sg-head";let E=document.createElement("h2");E.id=r,E.textContent="Suggest an edit";let M=document.createElement("button");M.type="button",M.className="tb-sg-close",M.textContent="\\xD7",M.setAttribute("aria-label","Close suggestion form"),y.append(E,M);let S=document.createElement("form");S.noValidate=!0;let K=document.createElement("p");K.className="tb-sg-intro",K.textContent="Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let P=document.createElement("input");P.type="text",P.name="name",P.autocomplete="name";let j=n("tb-sg-name","Your name",P),U=document.createElement("input");U.type="text",U.name="path",U.readOnly=!0,U.value=w;let z=n("tb-sg-path","Page you are editing",U),$=document.createElement("textarea");$.name="suggestion",$.rows=6,$.maxLength=5e3;let N=n("tb-sg-suggestion","Your suggested change",$),q=document.createElement("p");q.className="tb-sg-count",q.id="tb-sg-count",N.hintId=q.id;let gt=()=>{let T=5e3-$.value.length;q.textContent=T+" character"+(T===1?"":"s")+" remaining"};gt(),l(N),$.addEventListener("input",()=>{gt(),b(N)}),N.wrap.append(q);let st=document.createElement("textarea");st.name="reasoning",st.rows=3;let Y=n("tb-sg-reasoning","Why",st,!0);j.control.addEventListener("input",()=>b(j));let et=document.createElement("div");et.className="tb-sg-hp",et.setAttribute("aria-hidden","true");let nt=document.createElement("label");nt.setAttribute("for","tb-sg-website"),nt.textContent="Leave this field empty";let W=document.createElement("input");W.type="text",W.name="website",W.id="tb-sg-website",W.tabIndex=-1,W.autocomplete="off",W.setAttribute("aria-hidden","true"),et.append(nt,W);let V=document.createElement("div");V.className="tb-sg-actions";let Z=document.createElement("button");Z.type="submit",Z.className="tb-sg-btn",Z.textContent="Send suggestion";let R=document.createElement("button");R.type="button",R.className="tb-sg-quiet",R.textContent="Cancel",V.append(Z,R),S.append(K,j.wrap,z.wrap,N.wrap,Y.wrap,et,V);let C=document.createElement("div");C.className="tb-sg-pane",C.tabIndex=-1,C.hidden=!0,I.append(y,S,C),D.append(I);let Q=()=>{C.hidden=!0,S.hidden=!1,$.focus()},it=(T,H,_,lt=!1)=>{if(!D.isConnected)return;C.textContent="";let F=document.createElement("p");F.className="tb-sg-pane-title",F.textContent=T;let X=document.createElement("p");if(X.textContent=H,C.append(F,X),_){let pt=document.createElement("a");pt.href=_,pt.target="_blank",pt.rel="noopener",pt.textContent="View your suggestion on GitHub";let ht=document.createElement("p");ht.append(pt),C.append(ht)}let J=document.createElement("button");J.type="button",J.className=lt?"tb-sg-btn":"tb-sg-quiet",J.textContent=lt?"Back to my suggestion":"Close",J.addEventListener("click",lt?Q:()=>h?.()),C.append(J),S.hidden=!0,C.hidden=!1,C.focus()},at=()=>Array.prototype.filter.call(I.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),T=>!T.disabled&&T.tabIndex>=0&&!T.closest("[hidden]")),Et=T=>{if(T.key==="Escape"){T.preventDefault(),h?.();return}if(T.key!=="Tab")return;let H=at();if(!H.length){T.preventDefault(),I.focus();return}let _=H.indexOf(document.activeElement);T.shiftKey?_<=0&&(T.preventDefault(),H[H.length-1].focus()):(_===-1||_===H.length-1)&&(T.preventDefault(),H[0].focus())};h=()=>{if(h=null,G)try{G.abort()}catch{}document.removeEventListener("keydown",Et,!0),D.remove(),document.body.style.overflow=rt,ot.isConnected&&ot.focus()},D.addEventListener("mousedown",T=>{T.target===D&&h?.()}),M.addEventListener("click",()=>h?.()),R.addEventListener("click",()=>h?.()),document.addEventListener("keydown",Et,!0);let kt=()=>{let T=null,H=(_,lt)=>{p(_,lt),T||(T=_.control)};for(let _ of[j,N])b(_);return P.value.trim()||H(j,"Please add your name."),$.value.trim()?$.value.length>5e3&&H(N,"Please keep the suggestion under 5000 characters."):H(N,"Please describe the change you would like."),T&&T.focus(),!T},mt=T=>{B=T,Z.disabled=T,Z.textContent=T?"Sending\\u2026":"Send suggestion"};S.addEventListener("submit",T=>{if(T.preventDefault(),B||!kt())return;let H={name:P.value.trim(),suggestion:$.value.trim(),reasoning:st.value.trim(),path:w,website:W.value};if(H.website){it("Thank you","Your suggestion has been received.");return}mt(!0);let _=G=new AbortController,lt=setTimeout(()=>_.abort(),1e4);fetch(g,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(H),signal:_.signal}).then(async F=>{let X=null;try{X=await F.json()}catch{X=null}if(!F.ok){let J=new Error(X?.error||"HTTP "+F.status);throw J.userMessage=c(X),J}return X}).then(F=>{ut("suggest_edit_submitted",{outcome:"success"});let X=F?.issueUrl;it("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof X=="string"?X:null)}).catch(F=>{ut("suggest_edit_submitted",{outcome:"error"}),it("That did not go through",F&&F.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(lt),G===_&&(G=null),Z.isConnected?mt(!1):B=!1})}),document.body.style.overflow="hidden",document.body.appendChild(D),P.focus(),ut("suggest_edit_opened")},x=((g,w,A)=>{try{v(g,w,A)}catch{h=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return x.closeIfOpen=()=>h?.(),x}catch{return null}})(),ke="tb-pedit-style",Qe=()=>{if(document.getElementById(ke))return;let t=document.createElement("style");t.id=ke,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n.popover button.tb-pedit { display: none; }\n@media print { button.tb-pedit { display: none !important; } }\n`,document.head.appendChild(t)},tn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",ce),r.setAttribute("fill","currentColor"),e.append(r),t.append(e),t},St=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let r of Array.from(St))e&&!r.panel.contains(e)&&!r.button.contains(e)&&r.d.close(!1)});var Gt=(t,e,r,s)=>{let i=()=>Array.from(e.querySelectorAll(r?\'[role="menuitem"]\':"input, button, a[href]")).filter(n=>!n.hidden&&!n.closest("[hidden]")),a={d:null,button:t,panel:e},c={open(){for(let l of Array.from(St))l!==a&&l.d.close(!1);e.hidden=!1,t.setAttribute("aria-expanded","true"),St.add(a),(r?i()[0]:e.querySelector("input:checked")??i()[0])?.focus()},close(n=!0){e.hidden||(e.hidden=!0,t.setAttribute("aria-expanded","false"),St.delete(a),n&&t.focus())}};a.d=c,t.addEventListener("click",()=>{if(!e.hidden)return c.close();s?s(c.open):c.open()});let d=n=>{if(n.key==="Escape"&&!e.hidden){n.preventDefault(),n.stopPropagation(),c.close(!0);return}if(!r||e.hidden||!e.contains(n.target))return;let l=i(),p=l.indexOf(document.activeElement),b=h=>{n.preventDefault(),l[(h+l.length)%l.length]?.focus()};n.key==="ArrowDown"?b(p+1):n.key==="ArrowUp"?b(p-1):n.key==="Home"?b(0):n.key==="End"?b(l.length-1):n.key==="Tab"&&c.close(!1)};return e.addEventListener("keydown",d),t.addEventListener("keydown",d),r&&e.addEventListener("click",n=>{let l=n.target.closest(\'[role="menuitem"]\');if(l){if(l.getAttribute("aria-disabled")==="true"){n.preventDefault();return}c.close(!1)}}),c},k=(t,e={},...r)=>{let s=document.createElement(t);for(let[i,a]of Object.entries(e))i==="text"?s.textContent=a:i==="class"?s.className=a:s.setAttribute(i,a);for(let i of r)i!==null&&s.append(i);return s},$e=(t,e,...r)=>{let s=k("dialog",{class:"tb-dialog","aria-label":t}),i=k("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});i.addEventListener("click",()=>s.close()),s.append(i,...r);let a=null;return s.addEventListener("close",()=>{s.remove(),a?a():e.isConnected&&e.focus()}),document.body.append(s),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),{d:s,closeThen:c=>(a=c,s.close())}},Te=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,setTimeout(()=>{e.textContent===t&&(e.textContent="")},4e3))},en=(t,e,r)=>{let s=()=>{let i=k("textarea",{readonly:""});i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.append(i),i.select();let a=!1;try{a=document.execCommand("copy")}catch{a=!1}return i.remove(),a};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>s()?e():r()):s()?e():r()},Ce="tb-contribute-explained",Ae=!1,nn=()=>{if(Ae)return!0;try{return localStorage.getItem(Ce)==="1"}catch{return!1}},Le={edit:{title:"Edit this page",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},comment:{title:"Public comment",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"]}},on=["no","one","two","three"],Fe=(t,e,r)=>{Ae=!0;try{localStorage.setItem(Ce,"1")}catch{}let s=({title:p,what:b,who:h,account:v,link:x})=>k("section",{class:"tb-route"},k("h3",{text:p}),k("p",{text:b}),k("p",{},k("strong",{text:"Who sees it: "}),h),k("p",{},k("strong",{text:"Account: "}),v,x?" ":null,x?k("a",{href:x[1],target:"_blank",rel:"noopener noreferrer",text:x[0]}):null)),i=k("div",{class:"tb-dialog-row"}),c=(document.querySelector(".tb-header")?.dataset.routes??"comment").split(" ").filter(p=>p in Le),d=c.includes("edit")||c.includes("note")?"book":"edition",n=$e("How contributing works",t,k("h2",{text:"How contributing works"}),k("p",{text:`There ${c.length===1?"is one way":`are ${on[c.length]??c.length} ways`} to help with this ${d}. They differ in who sees what you write, and in which account you need.`}),...c.map(p=>s(Le[p])),k("p",{},k("a",{href:e,text:"More about commenting and contributing"})),i),l=k("button",{type:"button",class:"tb-btn",text:"Close"});if(l.addEventListener("click",()=>n.d.close()),r){let p=k("button",{type:"button",class:"tb-btn tb-btn-primary",text:r.label});p.addEventListener("click",()=>n.closeThen(r.run)),i.append(l,p),p.focus()}else i.append(l),l.focus()},Yt=(t,e,r,s)=>nn()?s():Fe(t,e,{label:r,run:s}),rn=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},sn=(t,e)=>{let r={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:rn(),accessed:new Date},s=c=>{let d=k("p",{class:"tb-cite-text"});for(let n of c)d.append(n.italic?k("i",{text:n.text}):n.text);return d},i=(c,d)=>{let n=k("span",{class:"tb-cite-said",role:"status"}),l=k("button",{type:"button",class:"tb-btn",text:"Copy"});return l.addEventListener("click",()=>en(we(d),()=>n.textContent="Copied",()=>n.textContent="Couldn\'t copy: select the text instead")),k("section",{},k("h3",{text:c}),s(d),k("div",{class:"tb-dialog-row"},n,l))},a=Ee(r.licence);$e("Cite this page",e,k("h2",{text:"Cite this page"}),i("APA 7",ye(r)),i(a?`Attribution (${a})`:"Attribution",xe(r)))},an=(t,e,r)=>{let s=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];r&&s.push(["annotations","Public annotations",[["on","On"],["off","Off"]]]);let i=k("p",{class:"tb-panel-note",role:"status"});for(let[a,c,d]of s){let n=k("div",{class:"tb-seg"});for(let[p,b]of d){let h=k("input",{type:"radio",name:`tb-pref-${a}`,value:p});h.checked=e.get(a)===p,h.addEventListener("change",()=>{if(a==="annotations"&&r){if(i.textContent="",p==="on")r.enable();else if(r.disable().reload){let v=k("button",{type:"button",class:"tb-btn",text:"Reload"});v.addEventListener("click",()=>location.reload()),i.append("Highlights hidden. The annotation tab goes away when the page reloads.",v)}return}e.set(a,p),a==="numbers"&&ut("paragraph_numbers_toggled",{to:p})}),n.append(k("label",{},h,b))}let l=k("fieldset",{},k("legend",{text:c}),n);a==="annotations"&&l.append(i),t.append(l)}},Kt=null;window.addEventListener("popstate",()=>Kt?.(location.hash,!1));var ln=(t,e,r,s,i)=>{let a={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:i,track:ut};t.addEventListener("click",n=>{if(n.button!==0||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey){ut("edit_on_github_clicked");return}n.preventDefault(),Ht({...a,mode:"page",trigger:r})});let c=new Map,d=Array.from(document.querySelectorAll("[data-pnum]")).filter(n=>!n.closest(".popover")&&!n.querySelector(":scope > button.tb-pedit"));d.length&&Qe();for(let n of d){let l=tn();l.addEventListener("click",p=>{p.stopPropagation(),Yt(l,s,`Continue: edit \\xB6${n.dataset.pnum}`,()=>Ht({...a,mode:"paragraph",para:n,trigger:l}))}),n.append(l),c.set(n.dataset.pnum??"",{p:n,b:l})}Kt=(n,l)=>{let p=wt.exec(n);if(!p)return;let b=p[1]?c.get(p[1]):void 0;Ht(b?{...a,mode:"paragraph",para:b.p,trigger:b.b,push:l}:{...a,mode:"page",trigger:r,push:l})}},dn=(t,e,r)=>{t.addEventListener("click",s=>{s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),me({endpoint:e,listUrl:t.dataset.history??"",path:t.dataset.path??"",repo:t.dataset.repo??"",branch:t.dataset.branch??"",githubHref:t.href,trigger:r,track:ut}))})},cn=t=>{let e=()=>{t.classList.remove("tb-hdr-icons"),t.scrollWidth>t.clientWidth+1&&t.classList.add("tb-hdr-icons")};if(e(),window.addEventListener("resize",e),typeof ResizeObserver=="function"){let r=new ResizeObserver(()=>requestAnimationFrame(e));r.observe(t);let s=t.querySelector(".tb-hdr-actions");s&&r.observe(s)}return e},un=t=>{let e=n=>t.querySelector(n),r=t.dataset.howTo??"/how-to-comment",s=window,i=e("[data-tb-contribute]"),a=e("[data-tb-more]"),c=n=>{try{n()}catch{}};c(()=>{let n=e("[data-tb-search]"),l=document.querySelector(".search .search-button");!n||!l||(n.addEventListener("click",()=>l.click()),n.hidden=!1)});let d=()=>{ut("annotation_badge_clicked"),s.tbAnnotations.open().then(n=>{n||Te("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};c(()=>{if(!s.tbAnnotations)return;let n=e("[data-tb-annotate]");n&&(n.addEventListener("click",()=>Yt(n,r,"Continue: open annotations",d)),n.querySelector(".tb-anno-count")||n.append(k("span",{class:"tb-anno-count"})),n.hidden=!1);let l=e("[data-tb-comment]");l&&(l.addEventListener("click",d),l.hidden=!1)}),c(()=>{let n=e("#tb-contribute-menu");if(!i||!n)return;Gt(i,n,!0,x=>Yt(i,r,"Continue to Contribute",x)),e("[data-tb-explain]")?.addEventListener("click",()=>Fe(i,r));let l=e("button.tb-suggest-btn"),p=l?.dataset.endpoint,b=l&&p&&qt?()=>qt(p,l.dataset.path??"",i):void 0,h=e("a.edit-on-github"),v=h?.dataset.editEndpoint;if(h&&v){if(ln(h,v,i,r,b),wt.test(location.hash)){let x=location.hash,g=window.history.state?.tbEditor===!0;g||window.history.replaceState(window.history.state,"",location.pathname+location.search),Kt?.(x,!g)}}else h?.addEventListener("click",()=>ut("edit_on_github_clicked"));l&&b&&(l.addEventListener("click",b),l.hidden=!1),i.hidden=!1}),c(()=>{let n=e("[data-tb-appearance]"),l=e("#tb-appearance");!n||!l||!s.tbPrefs||(an(l,s.tbPrefs,s.tbAnnotations),Gt(n,l,!1),n.hidden=!1)}),c(()=>{let n=e("#tb-more-menu");if(!a||!n)return;Gt(a,n,!0),e("[data-tb-cite]")?.addEventListener("click",()=>sn(t,a)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let l=e("a.tb-history-link");l?.dataset.revisionEndpoint&&dn(l,l.dataset.revisionEndpoint,a);let p=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");p&&(!b||!b.querySelector("a.internal")?(p.setAttribute("aria-disabled","true"),p.append(k("span",{class:"tb-mi-s",text:"No other page links here"}))):p.addEventListener("click",()=>{let v=b.querySelector("h3")??b;v.tabIndex=-1,b.scrollIntoView({block:"start"}),v.focus({preventScroll:!0})}));let h=e("[data-tb-download]");h?.addEventListener("click",()=>{fetch(h.dataset.tbDownload).then(v=>v.ok?v.blob():Promise.reject(new Error(String(v.status)))).then(v=>{let x=URL.createObjectURL(v),g=k("a",{href:x,download:h.dataset.file??"page.md"});document.body.append(g),g.click(),g.remove(),setTimeout(()=>URL.revokeObjectURL(x),1e3)}).catch(()=>Te("That didn\'t download just now. View source has the same file."))}),a.hidden=!1}),c(()=>{cn(t)})},pn=()=>{try{qt?.closeIfOpen(),ue(),ge();for(let t of Array.from(document.querySelectorAll(".tb-page-controls")))t.dataset.tbWired||(t.dataset.tbWired="1",un(t))}catch{}};document.addEventListener("nav",pn);\n';

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