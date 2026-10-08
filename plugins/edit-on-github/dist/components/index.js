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
var controls_inline_default = 'var se=/^\\s{0,3}(```|~~~)/,Ue=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,ze=t=>{let e=t.split(`\n`),o=[],r=0;if(e[0]?.trim()==="---"){let a=e.findIndex((c,d)=>d>0&&(c.trim()==="---"||c.trim()==="..."));a>0&&(r=a+1)}let i=0;for(;r<e.length;){let a=e[r];if(!a.trim()){r++;continue}let c=se.exec(a);if(c||a.trim()==="$$"){let u=c?c[1]:"$$",p=r+1;for(;p<e.length&&!e[p].trim().startsWith(u);)p++;r=p+1;continue}let d=r;for(;d<e.length&&e[d].trim()&&!se.test(e[d]);)d++;let n=e.slice(r,d).join(`\n`),l=!Ue.test(a);o.push({start:r,text:n,ordinal:l?++i:0}),r=d}return o},je=t=>ie(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,o)=>o.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),ie=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],Ge=(t,e)=>{if(!t.length||!e.length)return 0;let o=new Map;for(let i of t)o.set(i,(o.get(i)??0)+1);let r=0;for(let i of e){let a=o.get(i)??0;a>0&&(r++,o.set(i,a-1))}return r/Math.max(t.length,e.length)};var ae=(t,e,o)=>{let r=ie(e);if(!r.length)return null;let i=null,a=0,c=1/0;for(let d of ze(t)){let n=Ge(je(d.text),r);if(n<.75)continue;let l=d.ordinal?Math.abs(d.ordinal-o):1e6;(n>a+.02||Math.abs(n-a)<=.02&&l<c)&&(i=d,a=Math.max(n,a),c=l)}return i};var Nt=(t,e)=>{let o=0;for(;o<t.length&&o<e.length&&t[o]===e[o];)o++;let r=t.length,i=e.length;for(;r>o&&i>o&&t[r-1]===e[i-1];)r--,i--;let a=t.slice(0,o).map(u=>({t:"=",v:u})),c=t.slice(r).map(u=>({t:"=",v:u})),d=t.slice(o,r),n=e.slice(o,i),l;if((d.length+1)*(n.length+1)>4e5)l=[...d.map(u=>({t:"-",v:u})),...n.map(u=>({t:"+",v:u}))];else{let u=n.length+1,p=new Uint32Array((d.length+1)*u);for(let y=d.length-1;y>=0;y--)for(let m=n.length-1;m>=0;m--)p[y*u+m]=d[y]===n[m]?p[(y+1)*u+m+1]+1:Math.max(p[(y+1)*u+m],p[y*u+m+1]);l=[];let h=0,b=0;for(;h<d.length&&b<n.length;)d[h]===n[b]?(l.push({t:"=",v:d[h]}),h++,b++):p[(h+1)*u+b]>=p[h*u+b+1]?l.push({t:"-",v:d[h++]}):l.push({t:"+",v:n[b++]});for(;h<d.length;)l.push({t:"-",v:d[h++]});for(;b<n.length;)l.push({t:"+",v:n[b++]})}return[...a,...l,...c]},_t=t=>t.split(/(\\s+)/).filter(e=>e!==""),le=(t,e,o=2)=>{let r=Nt(t.split(`\n`),e.split(`\n`)),i=[],a=1,c=1,d=null,n=0;return r.forEach((l,u)=>{r.slice(Math.max(0,u-o),u+o+1).some(h=>h.t!=="=")?((!d||l.t==="="&&n>2*o)&&(d={a,b:c,ops:[]},i.push(d)),d.ops.push(l),n=l.t==="="?n+1:0):(d=null,n=0),l.t!=="+"&&a++,l.t!=="-"&&c++}),i};var yt="tb-editor",de="tb-editor-style",Dt="tb-gh-identity",Ye=7.5*60*60*1e3,ce=2e4,Ke=200,wt=/^#edit(?:-(\\d+))?$/,We=t=>t?`#edit-${t}`:"#edit",ue={tbEditor:!0},Ve="This page has changes waiting for review; you\\u2019re editing the latest draft.",s=(t,e={},...o)=>{let r=document.createElement(t);for(let[i,a]of Object.entries(e))a!==!1&&(i==="text"?r.textContent=String(a):i==="class"?r.className=String(a):r.setAttribute(i,a===!0?"":String(a)));for(let i of o)i&&r.append(i);return r},pe="http://www.w3.org/2000/svg",bt=t=>{let e=document.createElementNS(pe,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let o=document.createElementNS(pe,"path");return o.setAttribute("d",t),o.setAttribute("fill","currentColor"),e.append(o),e},be="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",Mt="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",Pt="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",Ze="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",At=t=>{let e=t?.userMessage,o=typeof e=="string"?e.trim():"";return o?o.slice(0,Ke):null},Xe=()=>{try{let t=sessionStorage.getItem(Dt);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Ye?null:e}catch{return null}},Rt=t=>{try{t?sessionStorage.setItem(Dt,JSON.stringify(t)):sessionStorage.removeItem(Dt)}catch{}},qt=()=>{if(document.getElementById(de))return;let t=`#${yt}`,e=s("style",{id:de});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-faint, #9B9BA1); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-faint, #9B9BA1); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: #FFFFFF; }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-faint, #9B9BA1); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n${t} .tb-ed-del { background: #FFEBE9; }\n${t} .tb-ed-add { background: #E6FFEC; }\n${t} .tb-ed-del del { background: #FFC1C0; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: #ABF2BC; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},Je=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,o)=>o.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),Qe="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",Ut=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(Qe).forEach(r=>r.remove()),e.querySelectorAll("*").forEach(r=>{for(let i of Array.from(r.attributes)){let a=i.value.trim().toLowerCase();(i.name.startsWith("on")||(i.name==="href"||i.name==="src")&&/^(javascript|data|vbscript):/.test(a))&&r.removeAttribute(i.name)}r.tagName==="A"&&(r.setAttribute("target","_blank"),r.setAttribute("rel","noopener noreferrer"))});let o=document.createDocumentFragment();return o.append(...Array.from(e.body.childNodes)),o},zt=(t,e)=>{let o=s("div",{class:"tb-ed-diff"}),r=le(t,e);if(!r.length)return o.append(s("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),o;let i=(a,c)=>{let d=s("div",{class:`tb-ed-line${a==="-"?" tb-ed-del":a==="+"?" tb-ed-add":""}`}),n=s("span");return typeof c=="string"?n.textContent=c||" ":n.append(...c),d.append(s("span",{text:a==="="?" ":a}),n),d};for(let a of r){let c=s("div",{class:"tb-ed-hunk"},s("div",{class:"tb-ed-hh",text:`Line ${a.b}`}));for(let d=0;d<a.ops.length;){let n=a.ops[d];if(n.t==="="){c.append(i("=",n.v)),d++;continue}let l=[],u=[];for(;a.ops[d]?.t==="-";)l.push(a.ops[d++].v);for(;a.ops[d]?.t==="+";)u.push(a.ops[d++].v);let p=Math.min(l.length,u.length),h=l.map((b,y)=>y<p?Nt(_t(b),_t(u[y])):null);l.forEach((b,y)=>{let m=h[y];c.append(i("-",m?m.filter(w=>w.t!=="+").map(w=>w.t==="-"?s("del",{text:w.v}):document.createTextNode(w.v)):b))}),u.forEach((b,y)=>{let m=h[y];c.append(i("+",m?m.filter(w=>w.t!=="-").map(w=>w.t==="+"?s("ins",{text:w.v}):document.createTextNode(w.v)):b))})}o.append(c)}return o},Ct=null,ge=()=>Ct?.(),Ht=t=>{if(Ct)return;qt();let e=document.body.style.overflow,o=new URL(t.endpoint,location.href).origin,r=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),i=t.path.split("/"),a=i.pop(),c=t.para&&Number(t.para.getAttribute("data-pnum"))||0,d=t.mode,n="",l="",u="drafts",p=null,h="",b=Xe(),y=!1,m=!1,w=null,M=null,ot=!1,rt=window.scrollY,j=We(d==="paragraph"?c:0),B=s("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),R=s("span",{class:"tb-ed-pill"},bt(Mt),s("span",{text:u})),I=s("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},bt(Pt));I.append(s("span",{text:t.repo.split("/").pop()||t.repo}));for(let g of i)I.append(s("span",{class:"tb-ed-sep",text:"/"}),s("span",{text:g}));I.append(s("span",{class:"tb-ed-sep",text:"/"}),s("span",{class:"tb-ed-file",text:a}));let x=s("span",{class:"tb-ed-muted",text:c?` \\xB7 \\xB6${c}`:""});I.append(x,R);let k=s("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),S=s("div",{class:"tb-ed-head"},I,k),F=s("div",{class:"tb-ed-discard",role:"alert",hidden:!0},s("span",{text:"Discard your changes?"})),K=s("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),P=s("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});F.append(K,P);let U=s("div",{class:"tb-ed-main"}),q=s("div",{class:"tb-ed-inner"}),z=s("p",{class:"tb-ed-note",hidden:!0}),$=s("p",{class:"tb-ed-note",hidden:!0,text:Ve}),O=s("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),G=s("div",{class:"tb-ed-gate",hidden:!0});q.append($,z,O,G),U.append(q),B.append(S,F,U);let gt=["Edit","Preview","Changes"],st=s("div",{role:"tablist","aria-label":"Editor view"}),Y=gt.map((g,f)=>s("button",{type:"button",role:"tab",id:`tb-ed-tab-${f}`,"aria-controls":`tb-ed-panel-${f}`,"aria-selected":f===0?"true":"false",tabindex:f===0?0:-1,text:g==="Edit"?"Edit":g==="Preview"?"Preview":"Changes"}));st.append(...Y);let et=s("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),nt=s("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),W=s("div",{class:"tb-ed-bar"},st,s("div",{class:"tb-ed-actions"},et,nt)),V=s("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),Z=s("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),D=s("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),C=[s("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},Z,V,D),s("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),s("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],Q=s("div",{class:"tb-ed-box"},W,...C),it=s("p",{class:"tb-ed-foot"}),at=()=>V.value,Et=()=>h,kt=g=>{Y.forEach((f,v)=>{f.setAttribute("aria-selected",v===g?"true":"false"),f.tabIndex=v===g?0:-1,C[v].hidden=v!==g}),g===1&&T(),g===2&&(C[2].textContent="",C[2].append(zt(Et(),at())))};Y.forEach((g,f)=>{g.addEventListener("click",()=>kt(f)),g.addEventListener("keydown",v=>{let L=v.key==="ArrowRight"?1:v.key==="ArrowLeft"?-1:0;if(!L)return;v.preventDefault();let tt=(f+L+Y.length)%Y.length;kt(tt),Y[tt].focus()})});let mt=0,T=()=>{let g=C[1];g.textContent="",g.className="tb-ed-panel tb-ed-preview";let f=s("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});g.append(f);let v=++mt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:Je(at()),mode:"markdown"})}).then(L=>L.ok?L.text():Promise.reject(new Error(String(L.status)))).then(L=>{v===mt&&(g.textContent="",g.append(Ut(L)))}).catch(()=>{v===mt&&(f.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};V.addEventListener("input",()=>{m=at()!==h,nt.disabled=!m});let H=s("div",{class:"tb-ed-scrim",hidden:!0}),_=s("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});H.append(_),B.append(H);let lt=(g,f,v,L=!1)=>{v.id=g;let tt=s("p",{class:"tb-ed-err",id:`${g}-err`}),N=s("label",{for:g,text:f},L?s("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:s("div",{class:"tb-ed-field"},N,v,tt),control:v,err:tt}},A=lt("tb-ed-msg","Title",s("input",{type:"text",maxlength:200,autocomplete:"off"})),X=lt("tb-ed-desc","Extended description",s("textarea",{rows:3,maxlength:5e3}),!0),J=s("div",{class:"tb-ed-who"}),pt=s("div",{class:"tb-ed-what"},bt(Mt)),ht=s("span");pt.append(ht);let Xt=s("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),ft=s("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),vt=s("form",{novalidate:!0},s("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),A.wrap,X.wrap,J,pt,s("div",{class:"tb-ed-row"},Xt,ft)),dt=s("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});_.append(vt,dt);let Tt=()=>{if(J.textContent="",b){let g=s("img",{src:`https://avatars.githubusercontent.com/u/${b.id}?s=56`,alt:""}),f=s("button",{type:"button",class:"tb-ed-link",text:"Sign out"});f.addEventListener("click",()=>{b=null,Rt(null),Tt()}),J.append(g,s("span",{},"Signed in as ",s("strong",{text:`@${b.login}`})," \\u2014 this edit will be credited to your GitHub account."),f)}else J.append(Jt(),s("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Jt=()=>{let g=s("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},bt(Ze),"Sign in with GitHub");return g.addEventListener("click",()=>_e(g)),g},Ne=()=>{G.textContent="";let g=Jt(),f=s("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let v=s("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});v.addEventListener("click",()=>{$t(),t.suggest()}),f.append(v," instead: it needs no account.")}else f.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");G.append(s("h2",{text:"Sign in to edit"}),s("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),s("p",{},g),f),O.hidden=!0,G.hidden=!1,g.focus()},Qt=g=>{if(g.origin!==o)return;let f=g.data;if(!(!f||f.type!=="tb-github-identity")){if(w=null,f.error||typeof f.token!="string"||typeof f.login!="string"){t.track("github_signin",{outcome:f.error==="denied"?"cancelled":"error"});return}if(b={token:f.token,login:f.login,id:Number(f.id)||0,name:f.name??"",at:Date.now()},Rt(b),t.track("github_signin",{outcome:"success"}),!ot)return re();Tt(),H.hidden||A.control.focus()}},_e=g=>{let f=`${r}?origin=${encodeURIComponent(location.origin)}`;w=window.open(f,"tb-github-signin","popup,width=560,height=720"),!w&&!g.parentElement?.querySelector(".tb-ed-err")&&g.after(s("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Qt);let Re=(g,f)=>{g.control.setAttribute("aria-invalid","true"),g.control.setAttribute("aria-describedby",g.err.id),g.err.textContent=f},te=g=>{g.control.removeAttribute("aria-invalid"),g.control.removeAttribute("aria-describedby"),g.err.textContent=""};A.control.addEventListener("input",()=>te(A));let De=()=>{A.control.value||(A.control.value=d==="paragraph"&&c?`Edit \\xB6${c} of ${a}`:`Update ${a}`),ht.textContent="",ht.append("This creates a new branch and opens a proposal to merge it into ",s("code",{text:u}),". Nothing changes in the book until an editor accepts it."),Tt(),vt.hidden=!1,dt.hidden=!0,H.hidden=!1,A.control.focus(),A.control.select()},It=()=>{H.hidden=!0,nt.focus()};nt.addEventListener("click",De),Xt.addEventListener("click",It),H.addEventListener("mousedown",g=>{g.target===H&&!y&&It()});let Ot=(g,f,v,L)=>{if(!B.isConnected)return;dt.textContent="",dt.append(s("h2",{text:g}),s("p",{text:f})),v&&dt.append(s("p",{},s("a",{href:v.href,target:"_blank",rel:"noopener",text:v.text})));let tt=s("button",{type:"button",class:`tb-ed-btn${L?" tb-ed-primary":""}`,text:L?"Back to my edit":"Close"});tt.addEventListener("click",L?()=>{dt.hidden=!0,vt.hidden=!1,ft.focus()}:()=>Lt(!0)),dt.append(s("div",{class:"tb-ed-row"},tt)),vt.hidden=!0,dt.hidden=!1,dt.focus()};vt.addEventListener("submit",g=>{if(g.preventDefault(),y)return;let f=null;if(te(A),A.control.value.trim()?b||(f=J.querySelector("button")):(Re(A,"Please give your change a short title."),f=A.control),f){f.focus();return}let v={mode:d,path:t.path,baseSha:l,title:A.control.value.trim(),description:X.control.value.trim()};d==="page"?v.content=at():(v.startLine=p.start,v.original=p.text,v.replacement=at(),c&&(v.paragraph=c)),v.identity=b.token,y=!0,ft.disabled=!0,ft.textContent="Proposing\\u2026";let L=M=new AbortController,tt=setTimeout(()=>L.abort(),ce);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v),signal:L.signal}).then(async N=>{let ct=null;try{ct=await N.json()}catch{ct=null}if(N.status===401&&b&&(b=null,Rt(null),Tt()),!N.ok)throw Object.assign(new Error(String(N.status)),{userMessage:At(ct)});return ct}).then(N=>{m=!1,N.fallback&&typeof N.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:d}),Ot("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:N.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:d}),Ot("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof N.prUrl=="string"?{href:N.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(N=>{t.track("page_edit_submitted",{outcome:"error",mode:d}),Ot("That did not go through",N&&N.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(tt),M===L&&(M=null),y=!1,ft.disabled=!1,ft.textContent="Propose changes"})});let Pe=g=>Array.from(g.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(f=>!f.disabled&&f.tabIndex>=0&&!f.closest("[hidden]")),ee=g=>{if(g.key==="Escape"){g.preventDefault(),H.hidden?xt():y||(!dt.hidden&&vt.hidden&&!m?Lt(!0):It());return}if(g.key!=="Tab")return;let f=H.hidden?B:_,v=Pe(f);if(!v.length){g.preventDefault(),f.focus();return}let L=v.indexOf(document.activeElement);(g.shiftKey?L<=0:L===-1||L===v.length-1)&&(g.preventDefault(),v[g.shiftKey?v.length-1:0].focus())},ne=g=>{m&&(g.preventDefault(),g.returnValue="")},Lt=(g=!1)=>{if(!g&&m)return xt();m=!1,wt.test(location.hash)?history.back():$t()},oe=()=>{if(!wt.test(location.hash)){if(m)return history.pushState(ue,"",j),xt();$t()}},$t=()=>{Ct=null,M?.abort(),w?.close(),document.removeEventListener("keydown",ee,!0),window.removeEventListener("message",Qt),window.removeEventListener("beforeunload",ne),window.removeEventListener("popstate",oe),B.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,rt)},xt=()=>{if(!m)return Lt(!0);F.hidden=!1,P.focus()};K.addEventListener("click",()=>Lt(!0)),P.addEventListener("click",()=>{F.hidden=!0,V.focus()}),k.addEventListener("click",xt),et.addEventListener("click",xt),document.addEventListener("keydown",ee,!0),window.addEventListener("beforeunload",ne),window.addEventListener("popstate",oe),Ct=$t,t.push!==!1&&history.pushState(ue,"",j),document.body.style.overflow="hidden",document.body.append(B),k.focus(),t.track("page_editor_opened",{mode:d});let qe=g=>{O.textContent="",O.removeAttribute("class"),O.append(g+" ",s("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},re=()=>{if(!b)return Ne();ot=!0,G.hidden=!0,O.hidden=!1;let g=new AbortController,f=setTimeout(()=>g.abort(),ce);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:g.signal}).then(async v=>{let L=null;try{L=await v.json()}catch{L=null}if(!v.ok)throw Object.assign(new Error(String(v.status)),{userMessage:At(L)});return L}).then(v=>{if(B.isConnected){if(typeof v?.content!="string"||typeof v.sha!="string")throw new Error("bad source");if(n=v.content,l=v.sha,u=typeof v.branch=="string"?v.branch:u,R.lastChild.textContent=u,$.hidden=!t.builtBlob||t.builtBlob===l,d==="paragraph"&&(p=t.para?ae(n,t.para.textContent??"",c):null,p||(d="page",x.textContent="",z.textContent=`We couldn\\u2019t find \\xB6${c} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,z.hidden=!1)),d==="paragraph"&&p){Q.classList.add("tb-ed-para");let L=n.split(`\n`),tt=p.text.split(`\n`).length,N=L.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),ct=L.slice(p.start+tt,p.start+tt+3).join(`\n`).trim();Z.textContent=N.length>220?`\\u2026${N.slice(-220)}`:N,D.textContent=ct.length>220?`${ct.slice(0,220)}\\u2026`:ct,Z.hidden=!N,D.hidden=!ct,h=p.text,it.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else h=n,it.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";V.value=h,O.remove(),q.append(Q,it),V.setSelectionRange(0,0),V.focus()}}).catch(v=>{B.isConnected&&qe(v&&v.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(f))};re()};var me="tb-history-style",tn=30,he=2e4,en=()=>{if(document.getElementById(me))return;let t=`#${yt}`,e=s("style",{id:me});e.textContent=`\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-hi-list li + li { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; padding: 0.7rem 1rem; border: 0; background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-msg { display: block; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.15rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 0.75rem; }\n${t} .tb-hi-head { margin: 0 0 0.75rem; }\n${t} .tb-hi-head h2 { margin: 0; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n`,document.head.append(e)},nn=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric"})},jt=async(t,e)=>{let o=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),r=null;try{r=await o.json()}catch{}if(!o.ok){let i=new Error(`HTTP ${o.status}`);throw i.userMessage=At(r),i}return r},St=null,fe=()=>St?.(),ve=t=>{if(St||document.getElementById(yt))return;qt(),en();let e=document.body.style.overflow,o=null,r=0,i=new Map,a=s("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),c=t.path.split("/"),d=c.pop(),n=s("div",{class:"tb-ed-crumbs",id:"tb-hi-title"},bt(Pt),s("span",{class:"tb-ed-file",text:"History"}));n.append(s("span",{class:"tb-ed-sep",text:"\\xB7"}),s("span",{text:t.repo.split("/").pop()||t.repo}));for(let x of c)n.append(s("span",{class:"tb-ed-sep",text:"/"}),s("span",{text:x}));n.append(s("span",{class:"tb-ed-sep",text:"/"}),s("span",{text:d})),n.append(s("span",{class:"tb-ed-pill"},bt(Mt),s("span",{text:t.branch})));let l=s("button",{type:"button",class:"tb-ed-x","aria-label":"Close the history",text:"\\xD7"}),u=s("div",{class:"tb-ed-main"}),p=s("div",{class:"tb-ed-inner"});u.append(p),a.append(s("div",{class:"tb-ed-head"},n,l),u);let h=x=>s("p",{class:"tb-ed-muted",role:"status",text:x}),b=(x,k)=>{let S=s("div",{class:"tb-ed-note",role:"alert"});return S.append(s("span",{text:`${x?.userMessage||k} `}),s("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),S},y=()=>{o?.abort();let x=new AbortController;o=x;let k=setTimeout(()=>x.abort(),he);return{signal:x.signal,done:()=>clearTimeout(k),current:()=>o===x}},m=x=>x.reader&&i.get(x.sha)||x.who,w=x=>`${m(x)} \\xB7 ${nn(x.date)}`,M=null,ot=()=>{let x=[...new Set((M??[]).filter(K=>K.reader).map(K=>K.sha))].slice(0,tn);if(!x.length)return;let k=new URL(t.endpoint,location.href);k.searchParams.set("shas",x.join(","));let S=new AbortController,F=setTimeout(()=>S.abort(),he);jt(k.toString(),S.signal).then(K=>{let P=K?.names??{};for(let[q,z]of Object.entries(P))typeof z=="string"&&z.trim()&&i.set(q,z.trim().slice(0,80));let U=p.querySelectorAll(".tb-hi-list .tb-hi-meta");M?.forEach((q,z)=>{U[z]&&(U[z].textContent=w(q))})}).catch(()=>{}).finally(()=>clearTimeout(F))},rt=()=>{if(p.textContent="",!M)return;if(!M.length){p.append(h("This page has no published revisions yet."));return}p.append(s("p",{class:"tb-ed-muted",text:`${M.length} published ${M.length===1?"version":"versions"} of this page, newest first. Open one to see what changed.`}));let x=s("ol",{class:"tb-hi-list"});M.forEach((k,S)=>{let F=s("button",{type:"button",class:"tb-hi-rev"},s("span",{class:"tb-hi-msg",text:k.message||"(no description)"}),s("span",{class:"tb-hi-meta",text:w(k)}));F.addEventListener("click",()=>{r=u.scrollTop,j(S)}),x.append(s("li",{},F))}),p.append(x),u.scrollTop=r},j=x=>{let k=M[x];p.textContent="";let S=s("button",{type:"button",class:"tb-ed-btn tb-hi-back",text:"\\u2190 All revisions"});S.addEventListener("click",()=>{o?.abort(),rt(),(p.querySelectorAll(".tb-hi-rev")[x]??l).focus()});let F=s("p",{class:"tb-ed-muted",text:w(k)}),K=s("div",{class:"tb-hi-head"},s("h2",{text:k.message||"(no description)"}),F),P=h("Loading this revision\\u2026");p.append(S,K,P),u.scrollTop=0,S.focus(),t.track("page_revision_opened");let U=y(),q=new URL(t.endpoint,location.href);q.searchParams.set("sha",k.sha),q.searchParams.set("path",k.path),jt(q.toString(),U.signal).then(z=>{if(!U.current())return;let $=z;k.reader&&typeof $.proposer=="string"&&$.proposer.trim()&&(i.set(k.sha,$.proposer.trim().slice(0,80)),F.textContent=w(k));let O=typeof $.before=="string"?$.before:"",G=typeof $.after=="string"?$.after:"",gt=["Changes","Page as it was"],st=s("div",{role:"tablist","aria-label":"Revision view"}),Y=gt.map((D,C)=>s("button",{type:"button",role:"tab",id:`tb-hi-tab-${C}`,"aria-controls":`tb-hi-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:D}));st.append(...Y);let et=s("div",{role:"tabpanel",id:"tb-hi-panel-0","aria-labelledby":"tb-hi-tab-0",tabindex:0});$.status==="added"&&et.append(s("p",{class:"tb-ed-panel tb-ed-muted",text:"The page was first published in this revision."}));let nt=typeof $.previousPath=="string"&&$.previousPath!==k.path?$.previousPath:"";nt&&et.append(s("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved here from ${nt}${O===G?"; its text didn\\u2019t change.":"."}`})),(!nt||O!==G)&&et.append(zt(O,G));let W=s("div",{role:"tabpanel",id:"tb-hi-panel-1","aria-labelledby":"tb-hi-tab-1",tabindex:0,hidden:!0,class:"tb-ed-panel tb-ed-preview"});typeof $.html=="string"&&$.html?W.append(Ut($.html)):W.append(s("p",{class:"tb-ed-muted",text:"The page was removed in this revision."}));let V=[et,W],Z=D=>Y.forEach((C,Q)=>{C.setAttribute("aria-selected",Q===D?"true":"false"),C.tabIndex=Q===D?0:-1,V[Q].hidden=Q!==D});Y.forEach((D,C)=>{D.addEventListener("click",()=>Z(C)),D.addEventListener("keydown",Q=>{let it=Q.key==="ArrowRight"?1:Q.key==="ArrowLeft"?-1:0;if(!it)return;Q.preventDefault();let at=(C+it+Y.length)%Y.length;Z(at),Y[at].focus()})}),P.replaceWith(s("div",{class:"tb-ed-box"},s("div",{class:"tb-ed-bar"},st),...V))}).catch(z=>{U.current()&&P.replaceWith(b(z,"This revision couldn\\u2019t be loaded just now. Please try again in a moment."))}).finally(U.done)},B=x=>{if(x.key==="Escape"){x.preventDefault(),R();return}if(x.key!=="Tab")return;let k=Array.from(a.querySelectorAll("a[href], button, [tabindex]")).filter(F=>!F.disabled&&F.tabIndex>=0&&!F.closest("[hidden]"));if(!k.length)return;let S=k.indexOf(document.activeElement);(x.shiftKey?S<=0:S===-1||S===k.length-1)&&(x.preventDefault(),k[x.shiftKey?k.length-1:0].focus())},R=()=>{St=null,o?.abort(),document.removeEventListener("keydown",B,!0),a.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};l.addEventListener("click",R),document.addEventListener("keydown",B,!0),St=R,document.body.style.overflow="hidden",document.body.append(a),l.focus(),t.track("page_history_opened"),p.append(h("Loading this page\\u2019s history\\u2026"));let I=y();jt(t.listUrl,I.signal).then(x=>{I.current()&&(M=(Array.isArray(x)?x:[]).filter(k=>!!k&&typeof k.sha=="string"&&typeof k.path=="string"),rt(),ot())}).catch(x=>{I.current()&&(p.textContent="",p.append(b(x,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(I.done)};var xe={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},we=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),on=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(r=>`${r.charAt(0).toUpperCase()}.`).join(" ")}`},rn=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,ye=t=>/[.?!]$/.test(t)?t:`${t}.`,Ee=t=>{let e=rn(we(t.authors).map(on)),o=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),r=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",i=[],a=r?[{text:`${ye(r)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)i.push({text:`${ye(e)} (n.d.). `},...a);else if(a.length){let[c,...d]=a;i.push({...c,text:c.text.replace(/ $/,"")},{text:" (n.d.). "},...d)}else i.push({text:"(n.d.). "});return i.push({text:`Retrieved ${o}, from ${t.url}`}),i},ke=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",o=xe[t.licence],r=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&r.push({text:` by ${we(t.authors).join(", ")}`}),e&&t.bookTitle&&r.push({text:", from "},{text:t.bookTitle,italic:!0}),r.push({text:`, ${t.url}`}),o?r.push({text:`, is licensed under ${o.name} (${o.url})`}):t.licence&&r.push({text:`, is licensed under ${t.licence}`}),r.push({text:"."}),r},Te=t=>t.map(e=>e.text).join(""),Le=t=>xe[t]?.name??t;var ut=(t,e)=>{try{let o=window.tbTrack;typeof o=="function"&&(e?o(t,e):o(t))}catch{}},Kt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",o="tb-suggest-title",c=m=>{let w=m?.userMessage,M=typeof w=="string"?w.trim():"";return M?M.slice(0,200):null},d=()=>{if(document.getElementById(e))return;let m=document.createElement("style");m.id=e,m.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: #FFFFFF; cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(m)},n=(m,w,M,ot=!1)=>{let rt=document.createElement("div");rt.className="tb-sg-field";let j=document.createElement("label");if(j.setAttribute("for",m),j.textContent=w,ot){let R=document.createElement("span");R.className="tb-sg-opt",R.textContent=" (optional)",j.append(R)}let B=document.createElement("p");return B.className="tb-sg-err",B.id=m+"-err",M.id=m,!ot&&!M.readOnly&&(M.required=!0),rt.append(j,M,B),{wrap:rt,control:M,err:B,hintId:null}},l=m=>{let w=[];m.err.textContent&&w.push(m.err.id),m.hintId&&w.push(m.hintId),w.length?m.control.setAttribute("aria-describedby",w.join(" ")):m.control.removeAttribute("aria-describedby")},u=(m,w)=>{m.control.setAttribute("aria-invalid","true"),m.err.textContent=w,l(m)},p=m=>{m.control.hasAttribute("aria-invalid")&&(m.control.removeAttribute("aria-invalid"),m.err.textContent="",l(m))},h=null,b=(m,w,M)=>{if(h)return;d();let ot=M,rt=document.body.style.overflow,j=null,B=!1,R=document.createElement("div");R.id=t;let I=document.createElement("div");I.className="tb-sg-dialog",I.tabIndex=-1,I.setAttribute("role","dialog"),I.setAttribute("aria-modal","true"),I.setAttribute("aria-labelledby",o);let x=document.createElement("div");x.className="tb-sg-head";let k=document.createElement("h2");k.id=o,k.textContent="Suggest an edit";let S=document.createElement("button");S.type="button",S.className="tb-sg-close",S.textContent="\\xD7",S.setAttribute("aria-label","Close suggestion form"),x.append(k,S);let F=document.createElement("form");F.noValidate=!0;let K=document.createElement("p");K.className="tb-sg-intro",K.textContent="Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let P=document.createElement("input");P.type="text",P.name="name",P.autocomplete="name";let U=n("tb-sg-name","Your name",P),q=document.createElement("input");q.type="text",q.name="path",q.readOnly=!0,q.value=w;let z=n("tb-sg-path","Page you are editing",q),$=document.createElement("textarea");$.name="suggestion",$.rows=6,$.maxLength=5e3;let O=n("tb-sg-suggestion","Your suggested change",$),G=document.createElement("p");G.className="tb-sg-count",G.id="tb-sg-count",O.hintId=G.id;let gt=()=>{let T=5e3-$.value.length;G.textContent=T+" character"+(T===1?"":"s")+" remaining"};gt(),l(O),$.addEventListener("input",()=>{gt(),p(O)}),O.wrap.append(G);let st=document.createElement("textarea");st.name="reasoning",st.rows=3;let Y=n("tb-sg-reasoning","Why",st,!0);U.control.addEventListener("input",()=>p(U));let et=document.createElement("div");et.className="tb-sg-hp",et.setAttribute("aria-hidden","true");let nt=document.createElement("label");nt.setAttribute("for","tb-sg-website"),nt.textContent="Leave this field empty";let W=document.createElement("input");W.type="text",W.name="website",W.id="tb-sg-website",W.tabIndex=-1,W.autocomplete="off",W.setAttribute("aria-hidden","true"),et.append(nt,W);let V=document.createElement("div");V.className="tb-sg-actions";let Z=document.createElement("button");Z.type="submit",Z.className="tb-sg-btn",Z.textContent="Send suggestion";let D=document.createElement("button");D.type="button",D.className="tb-sg-quiet",D.textContent="Cancel",V.append(Z,D),F.append(K,U.wrap,z.wrap,O.wrap,Y.wrap,et,V);let C=document.createElement("div");C.className="tb-sg-pane",C.tabIndex=-1,C.hidden=!0,I.append(x,F,C),R.append(I);let Q=()=>{C.hidden=!0,F.hidden=!1,$.focus()},it=(T,H,_,lt=!1)=>{if(!R.isConnected)return;C.textContent="";let A=document.createElement("p");A.className="tb-sg-pane-title",A.textContent=T;let X=document.createElement("p");if(X.textContent=H,C.append(A,X),_){let pt=document.createElement("a");pt.href=_,pt.target="_blank",pt.rel="noopener",pt.textContent="View your suggestion on GitHub";let ht=document.createElement("p");ht.append(pt),C.append(ht)}let J=document.createElement("button");J.type="button",J.className=lt?"tb-sg-btn":"tb-sg-quiet",J.textContent=lt?"Back to my suggestion":"Close",J.addEventListener("click",lt?Q:()=>h?.()),C.append(J),F.hidden=!0,C.hidden=!1,C.focus()},at=()=>Array.prototype.filter.call(I.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),T=>!T.disabled&&T.tabIndex>=0&&!T.closest("[hidden]")),Et=T=>{if(T.key==="Escape"){T.preventDefault(),h?.();return}if(T.key!=="Tab")return;let H=at();if(!H.length){T.preventDefault(),I.focus();return}let _=H.indexOf(document.activeElement);T.shiftKey?_<=0&&(T.preventDefault(),H[H.length-1].focus()):(_===-1||_===H.length-1)&&(T.preventDefault(),H[0].focus())};h=()=>{if(h=null,j)try{j.abort()}catch{}document.removeEventListener("keydown",Et,!0),R.remove(),document.body.style.overflow=rt,ot.isConnected&&ot.focus()},R.addEventListener("mousedown",T=>{T.target===R&&h?.()}),S.addEventListener("click",()=>h?.()),D.addEventListener("click",()=>h?.()),document.addEventListener("keydown",Et,!0);let kt=()=>{let T=null,H=(_,lt)=>{u(_,lt),T||(T=_.control)};for(let _ of[U,O])p(_);return P.value.trim()||H(U,"Please add your name."),$.value.trim()?$.value.length>5e3&&H(O,"Please keep the suggestion under 5000 characters."):H(O,"Please describe the change you would like."),T&&T.focus(),!T},mt=T=>{B=T,Z.disabled=T,Z.textContent=T?"Sending\\u2026":"Send suggestion"};F.addEventListener("submit",T=>{if(T.preventDefault(),B||!kt())return;let H={name:P.value.trim(),suggestion:$.value.trim(),reasoning:st.value.trim(),path:w,website:W.value};if(H.website){it("Thank you","Your suggestion has been received.");return}mt(!0);let _=j=new AbortController,lt=setTimeout(()=>_.abort(),1e4);fetch(m,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(H),signal:_.signal}).then(async A=>{let X=null;try{X=await A.json()}catch{X=null}if(!A.ok){let J=new Error(X?.error||"HTTP "+A.status);throw J.userMessage=c(X),J}return X}).then(A=>{ut("suggest_edit_submitted",{outcome:"success"});let X=A?.issueUrl;it("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof X=="string"?X:null)}).catch(A=>{ut("suggest_edit_submitted",{outcome:"error"}),it("That did not go through",A&&A.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(lt),j===_&&(j=null),Z.isConnected?mt(!1):B=!1})}),document.body.style.overflow="hidden",document.body.appendChild(R),P.focus(),ut("suggest_edit_opened")},y=((m,w,M)=>{try{b(m,w,M)}catch{h=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return y.closeIfOpen=()=>h?.(),y}catch{return null}})(),$e="tb-pedit-style",sn=()=>{if(document.getElementById($e))return;let t=document.createElement("style");t.id=$e,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n.popover button.tb-pedit { display: none; }\n@media print { button.tb-pedit { display: none !important; } }\n`,document.head.appendChild(t)},an=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",be),o.setAttribute("fill","currentColor"),e.append(o),t.append(e),t},Ft=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let o of Array.from(Ft))e&&!o.panel.contains(e)&&!o.button.contains(e)&&o.d.close(!1)});var ln=t=>typeof t.showPopover=="function",Bt=new Set,Ae=(t,e)=>{let o=t.closest(".tb-header")??t,i=(t.closest(".tb-header-slot")??o).getBoundingClientRect(),a=t.getBoundingClientRect(),c=document.documentElement.clientWidth,d=e.style;d.boxSizing="border-box",d.top=`${Math.max(i.bottom,0)+6}px`,d.maxHeight=`${Math.max(window.innerHeight-Math.max(i.bottom,0)-12,120)}px`;let n=()=>{d.left=`${Math.max(i.left,0)}px`,d.right="auto",d.width=`${Math.min(i.width,c)}px`};if(o.classList.contains("tb-hdr-icons")||o.getBoundingClientRect().width<=640)return n();d.left="auto",d.right=`${Math.max(c-a.right,0)}px`,d.width="",e.getBoundingClientRect().left<i.left&&n()},Vt=()=>{for(let t of Array.from(Bt))Ae(t.button,t.panel)};window.addEventListener("resize",Vt);window.addEventListener("scroll",Vt,{passive:!0});var He=(t,e)=>{e.hidden=!1,ln(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",Bt.add({button:t,panel:e}),Ae(t,e))},Se=t=>{for(let e of Array.from(Bt))e.panel===t&&Bt.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Gt=(t,e,o,r)=>{let i=()=>Array.from(e.querySelectorAll(o?\'[role="menuitem"]\':"input, button, a[href]")).filter(n=>!n.hidden&&!n.closest("[hidden]")),a={d:null,button:t,panel:e},c={open(){for(let l of Array.from(Ft))l!==a&&l.d.close(!1);He(t,e),t.setAttribute("aria-expanded","true"),Ft.add(a),(o?i()[0]:e.querySelector("input:checked")??i()[0])?.focus()},close(n=!0){e.hidden||(Se(e),t.setAttribute("aria-expanded","false"),Ft.delete(a),n&&t.focus())}};a.d=c,t.addEventListener("click",()=>{if(!e.hidden)return c.close();r?r(c.open):c.open()});let d=n=>{if(n.key==="Escape"&&!e.hidden){n.preventDefault(),n.stopPropagation(),c.close(!0);return}if(!o||e.hidden||!e.contains(n.target))return;let l=i(),u=l.indexOf(document.activeElement),p=h=>{n.preventDefault(),l[(h+l.length)%l.length]?.focus()};n.key==="ArrowDown"?p(u+1):n.key==="ArrowUp"?p(u-1):n.key==="Home"?p(0):n.key==="End"?p(l.length-1):n.key==="Tab"&&c.close(!1)};return e.addEventListener("keydown",d),t.addEventListener("keydown",d),o&&e.addEventListener("click",n=>{let l=n.target.closest(\'[role="menuitem"]\');if(l){if(l.getAttribute("aria-disabled")==="true"){n.preventDefault();return}c.close(!1)}}),c},E=(t,e={},...o)=>{let r=document.createElement(t);for(let[i,a]of Object.entries(e))i==="text"?r.textContent=a:i==="class"?r.className=a:r.setAttribute(i,a);for(let i of o)i!==null&&r.append(i);return r},Fe=(t,e,...o)=>{let r=E("dialog",{class:"tb-dialog","aria-label":t}),i=E("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});i.addEventListener("click",()=>r.close()),r.append(i,...o);let a=null;return r.addEventListener("close",()=>{r.remove(),a?a():e.isConnected&&e.focus()}),document.body.append(r),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),{d:r,closeThen:c=>(a=c,r.close())}},Ce=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,He(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Se(e),e.hidden=!1)},4e3))},dn=(t,e,o)=>{let r=()=>{let i=E("textarea",{readonly:""});i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.append(i),i.select();let a=!1;try{a=document.execCommand("copy")}catch{a=!1}return i.remove(),a};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>r()?e():o()):r()?e():o()},Be="tb-contribute-explained",Ie=!1,cn=()=>{if(Ie)return!0;try{return localStorage.getItem(Be)==="1"}catch{return!1}},Me={edit:{title:"Edit this page",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},comment:{title:"Public comment",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"]}},un=["no","one","two","three"],Oe=(t,e,o)=>{Ie=!0;try{localStorage.setItem(Be,"1")}catch{}let r=({title:u,what:p,who:h,account:b,link:y})=>E("section",{class:"tb-route"},E("h3",{text:u}),E("p",{text:p}),E("p",{},E("strong",{text:"Who sees it: "}),h),E("p",{},E("strong",{text:"Account: "}),b,y?" ":null,y?E("a",{href:y[1],target:"_blank",rel:"noopener noreferrer",text:y[0]}):null)),i=E("div",{class:"tb-dialog-row"}),c=(document.querySelector(".tb-header")?.dataset.routes??"comment").split(" ").filter(u=>u in Me),d=c.includes("edit")||c.includes("note")?"book":"edition",n=Fe("How contributing works",t,E("h2",{text:"How contributing works"}),E("p",{text:`There ${c.length===1?"is one way":`are ${un[c.length]??c.length} ways`} to help with this ${d}. They differ in who sees what you write, and in which account you need.`}),...c.map(u=>r(Me[u])),E("p",{},E("a",{href:e,text:"More about commenting and contributing"})),i),l=E("button",{type:"button",class:"tb-btn",text:"Close"});if(l.addEventListener("click",()=>n.d.close()),o){let u=E("button",{type:"button",class:"tb-btn tb-btn-primary",text:o.label});u.addEventListener("click",()=>n.closeThen(o.run)),i.append(l,u),u.focus()}else i.append(l),l.focus()},Wt=(t,e,o,r)=>cn()?r():Oe(t,e,{label:o,run:r}),pn=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},bn=(t,e)=>{let o={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:pn(),accessed:new Date},r=c=>{let d=E("p",{class:"tb-cite-text"});for(let n of c)d.append(n.italic?E("i",{text:n.text}):n.text);return d},i=(c,d)=>{let n=E("span",{class:"tb-cite-said",role:"status"}),l=E("button",{type:"button",class:"tb-btn",text:"Copy"});return l.addEventListener("click",()=>dn(Te(d),()=>n.textContent="Copied",()=>n.textContent="Couldn\'t copy: select the text instead")),E("section",{},E("h3",{text:c}),r(d),E("div",{class:"tb-dialog-row"},n,l))},a=Le(o.licence);Fe("Cite this page",e,E("h2",{text:"Cite this page"}),i("APA 7",Ee(o)),i(a?`Attribution (${a})`:"Attribution",ke(o)))},gn=(t,e,o)=>{let r=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];o&&r.push(["annotations","Public annotations",[["on","On"],["off","Off"]]]);let i=E("p",{class:"tb-panel-note",role:"status"});for(let[a,c,d]of r){let n=E("div",{class:"tb-seg"});for(let[u,p]of d){let h=E("input",{type:"radio",name:`tb-pref-${a}`,value:u});h.checked=e.get(a)===u,h.addEventListener("change",()=>{if(a==="annotations"&&o){if(i.textContent="",u==="on")o.enable();else if(o.disable().reload){let b=E("button",{type:"button",class:"tb-btn",text:"Reload"});b.addEventListener("click",()=>location.reload()),i.append("Highlights hidden. The annotation tab goes away when the page reloads.",b)}return}e.set(a,u),a==="numbers"&&ut("paragraph_numbers_toggled",{to:u})}),n.append(E("label",{},h,p))}let l=E("fieldset",{},E("legend",{text:c}),n);a==="annotations"&&l.append(i),a==="width"&&mn(t,l),t.append(l)}},mn=(t,e)=>{let o=i=>E("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${i}) * var(--tb-size-body) * var(--tb-text-scale))`}),r=()=>{let i=document.querySelector("article");if(!i?.parentElement||t.hidden)return;let a=o("--tb-measure-standard-em"),c=o("--tb-measure-wide-em");i.parentElement.append(a,c);let d=a.getBoundingClientRect().width,n=c.getBoundingClientRect().width;a.remove(),c.remove(),e.hidden=!(n-d>=16)};new MutationObserver(r).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",r)},Yt=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,hn=t=>{let e=!1,o=()=>{e=!1;let i=t.getBoundingClientRect(),a=document.documentElement.style;a.setProperty("--tb-hdr-h",`${Math.round(i.height)}px`),a.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(i.bottom))}px`)},r=()=>{e||(e=!0,requestAnimationFrame(o))};o(),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),typeof ResizeObserver=="function"&&new ResizeObserver(r).observe(t)},Zt=null;window.addEventListener("popstate",()=>Zt?.(location.hash,!1));var fn=(t,e,o,r,i)=>{let a={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:i,track:ut};t.addEventListener("click",n=>{if(n.button!==0||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey){ut("edit_on_github_clicked");return}n.preventDefault(),Ht({...a,mode:"page",trigger:o})});let c=new Map,d=Array.from(document.querySelectorAll("[data-pnum]")).filter(n=>!n.closest(".popover")&&!n.querySelector(":scope > button.tb-pedit"));d.length&&sn();for(let n of d){let l=an();l.addEventListener("click",u=>{u.stopPropagation(),Wt(l,r,`Continue: edit \\xB6${n.dataset.pnum}`,()=>Ht({...a,mode:"paragraph",para:n,trigger:l}))}),n.append(l),c.set(n.dataset.pnum??"",{p:n,b:l})}Zt=(n,l)=>{let u=wt.exec(n);if(!u)return;let p=u[1]?c.get(u[1]):void 0;Ht(p?{...a,mode:"paragraph",para:p.p,trigger:p.b,push:l}:{...a,mode:"page",trigger:o,push:l})}},vn=(t,e,o)=>{t.addEventListener("click",r=>{r.button!==0||r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||(r.preventDefault(),ve({endpoint:e,listUrl:t.dataset.history??"",path:t.dataset.path??"",repo:t.dataset.repo??"",branch:t.dataset.branch??"",githubHref:t.href,trigger:o,track:ut}))})},yn=t=>{let e=t.querySelector("[data-tb-reader]"),o=t.querySelector("[data-tb-reader-item]"),r=()=>t.scrollWidth>t.clientWidth+1,i=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,a=i?.querySelector(".home-link")?i:null,c=t.querySelector(".tb-hdr-label"),d=()=>!!c&&getComputedStyle(c).position!=="absolute",n=t.querySelector(".tb-hdr-where"),l=b=>!!b&&b.scrollWidth>b.clientWidth+1,u=b=>!r()&&d()===b&&!l(n)&&!Array.from(n?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(l),p=b=>{a?.classList.toggle("tb-logo-full",b),a?.classList.toggle("tb-logo-icon",!b)},h=()=>{let b=!!e&&!!o&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),b&&(e.hidden=!1,o.hidden=!0),r()&&t.classList.add("tb-hdr-icons"),r()&&(t.classList.add("tb-hdr-tight"),b&&(e.hidden=!0,o.hidden=!1));let y=d();a&&u(y)&&(p(!0),u(y)||p(!1)),Vt()};if(h(),window.addEventListener("resize",h),document.fonts?.ready.then(h),typeof ResizeObserver=="function"){let b=new ResizeObserver(()=>requestAnimationFrame(h));b.observe(t);let y=t.querySelector(".tb-hdr-actions");y&&b.observe(y)}return h},xn=t=>{let e=n=>t.querySelector(n),o=t.dataset.howTo??"/how-to-comment",r=window,i=e("[data-tb-contribute]"),a=e("[data-tb-more]"),c=n=>{try{n()}catch{}};c(()=>{let n=e("[data-tb-search]"),l=document.querySelector(".search .search-button");!n||!l||(n.addEventListener("click",()=>l.click()),n.hidden=!1)}),c(()=>{let n=e("[data-tb-menu]"),l=document.querySelector(".explorer"),u=l?.querySelector(".mobile-explorer");if(!n||!l||!u)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(n);let h=l.querySelector(".explorer-content");h?.id&&n.setAttribute("aria-controls",h.id),u.tabIndex=-1,u.setAttribute("aria-hidden","true");let b=n.querySelector(".tb-hdr-label"),y=()=>!l.classList.contains("collapsed"),m=()=>{let w=y();n.setAttribute("aria-expanded",String(w)),n.classList.toggle("tb-closes",w),b&&(b.textContent=w?"Close menu":"Menu")};new MutationObserver(m).observe(l,{attributes:!0,attributeFilter:["class"]}),n.addEventListener("click",()=>{y()||r.tbAnnotations?.close?.(),u.click()}),document.addEventListener("keydown",w=>{w.key!=="Escape"||!y()||!Yt()||(u.click(),n.focus())}),m(),n.hidden=!1}),c(()=>{let n=e("[data-tb-reader]"),l=e("[data-tb-reader-item]"),u=document.querySelector(".sidebar .readermode");if(!n||!l||!u)return;let p=()=>n.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),n.addEventListener("click",()=>u.click()),l.addEventListener("click",()=>u.click()),p(),t.dataset.tbHasReader="1",n.hidden=!1});let d=()=>{ut("annotation_badge_clicked"),r.tbAnnotations.open().then(n=>{n||Ce("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};c(()=>{if(!r.tbAnnotations)return;let n=e("[data-tb-annotate]");if(n){let u=n.querySelector(".tb-hdr-label"),p=()=>Yt()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),h=()=>{let b=p();n.classList.toggle("tb-closes",b),u&&(u.textContent=b?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",h),window.addEventListener("resize",h),n.addEventListener("click",()=>{if(p())return r.tbAnnotations.close?.();let b=document.querySelector(".explorer");b&&!b.classList.contains("collapsed")&&Yt()&&b.querySelector(".mobile-explorer")?.click(),Wt(n,o,"Continue: open annotations",d)}),n.querySelector(".tb-anno-count")||n.append(E("span",{class:"tb-anno-count"})),n.hidden=!1}let l=e("[data-tb-comment]");l&&(l.addEventListener("click",d),l.hidden=!1)}),c(()=>{let n=e("#tb-contribute-menu");if(!i||!n)return;Gt(i,n,!0,y=>Wt(i,o,"Continue to Contribute",y)),e("[data-tb-explain]")?.addEventListener("click",()=>Oe(i,o));let l=e("button.tb-suggest-btn"),u=l?.dataset.endpoint,p=l&&u&&Kt?()=>Kt(u,l.dataset.path??"",i):void 0,h=e("a.edit-on-github"),b=h?.dataset.editEndpoint;if(h&&b){if(fn(h,b,i,o,p),wt.test(location.hash)){let y=location.hash,m=window.history.state?.tbEditor===!0;m||window.history.replaceState(window.history.state,"",location.pathname+location.search),Zt?.(y,!m)}}else h?.addEventListener("click",()=>ut("edit_on_github_clicked"));l&&p&&(l.addEventListener("click",p),l.hidden=!1),i.hidden=!1}),c(()=>{let n=e("[data-tb-appearance]"),l=e("#tb-appearance");!n||!l||!r.tbPrefs||(gn(l,r.tbPrefs,r.tbAnnotations),Gt(n,l,!1),n.hidden=!1)}),c(()=>{let n=e("#tb-more-menu");if(!a||!n)return;Gt(a,n,!0),e("[data-tb-cite]")?.addEventListener("click",()=>bn(t,a)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let l=e("a.tb-history-link");l?.dataset.revisionEndpoint&&vn(l,l.dataset.revisionEndpoint,a);let u=e("[data-tb-backlinks]"),p=document.querySelector(".backlinks");u&&(!p||!p.querySelector("a.internal")?(u.setAttribute("aria-disabled","true"),u.append(E("span",{class:"tb-mi-s",text:"No other page links here"}))):u.addEventListener("click",()=>{let b=p.querySelector("h3")??p;b.tabIndex=-1,p.scrollIntoView({block:"start"}),b.focus({preventScroll:!0})}));let h=e("[data-tb-download]");h?.addEventListener("click",()=>{fetch(h.dataset.tbDownload).then(b=>b.ok?b.blob():Promise.reject(new Error(String(b.status)))).then(b=>{let y=URL.createObjectURL(b),m=E("a",{href:y,download:h.dataset.file??"page.md"});document.body.append(m),m.click(),m.remove(),setTimeout(()=>URL.revokeObjectURL(y),1e3)}).catch(()=>Ce("That didn\'t download just now. View source has the same file."))}),a.hidden=!1}),c(()=>{yn(t)}),c(()=>{let n=t.parentElement;hn(n?.classList.contains("tb-header-slot")?n:t)})},wn=()=>{try{Kt?.closeIfOpen(),ge(),fe();for(let t of Array.from(document.querySelectorAll(".tb-page-controls")))t.dataset.tbWired||(t.dataset.tbWired="1",xn(t))}catch{}};document.addEventListener("nav",wn);\n';

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
      // Quartz's explorer menu, where the explorer is a drawer (a narrow window);
      // Close while the drawer is open. The page script moves it to the row's start.
      btn(
        { "data-tb-menu": "", "aria-expanded": "false" },
        [_("span", { class: "tb-ic-open" }, SVG(MENU)), _("span", { class: "tb-ic-close" }, SVG(CLOSE))],
        "Menu"
      ),
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
          [_("span", { class: "tb-ic-open" }, SVG(COMMENT)), _("span", { class: "tb-ic-close" }, SVG(CLOSE))],
          "Annotate"
        ),
        btn({ "data-tb-reader": "", "aria-pressed": "false" }, SVG(BOOK), "Reader mode"),
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
.tb-header.tb-hdr-tight .tb-hdr-btn { padding-left: 0.2rem; padding-right: 0.2rem; }
.tb-header.tb-hdr-tight .tb-hdr-where { min-width: 2rem; }
@media (max-width: 800px) {
  .tb-header { gap: 0.4rem; margin-bottom: 1rem; }
}
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
  Component.tbHeader = true;
  return Component;
};
var EditOnGitHub_default = EditOnGitHub;

export { EditOnGitHub_default as EditOnGitHub };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map