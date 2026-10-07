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
var controls_inline_default = 'var re=/^\\s{0,3}(```|~~~)/,Ue=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,qe=t=>{let e=t.split(`\n`),r=[],s=0;if(e[0]?.trim()==="---"){let a=e.findIndex((d,u)=>u>0&&(d.trim()==="---"||d.trim()==="..."));a>0&&(s=a+1)}let l=0;for(;s<e.length;){let a=e[s];if(!a.trim()){s++;continue}let d=re.exec(a);if(d||a.trim()==="$$"){let c=d?d[1]:"$$",p=s+1;for(;p<e.length&&!e[p].trim().startsWith(c);)p++;s=p+1;continue}let u=s;for(;u<e.length&&e[u].trim()&&!re.test(e[u]);)u++;let n=e.slice(s,u).join(`\n`),i=!Ue.test(a);r.push({start:s,text:n,ordinal:i?++l:0}),s=u}return r},je=t=>se(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,r)=>r.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),se=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],ze=(t,e)=>{if(!t.length||!e.length)return 0;let r=new Map;for(let l of t)r.set(l,(r.get(l)??0)+1);let s=0;for(let l of e){let a=r.get(l)??0;a>0&&(s++,r.set(l,a-1))}return s/Math.max(t.length,e.length)};var ie=(t,e,r)=>{let s=se(e);if(!s.length)return null;let l=null,a=0,d=1/0;for(let u of qe(t)){let n=ze(je(u.text),s);if(n<.75)continue;let i=u.ordinal?Math.abs(u.ordinal-r):1e6;(n>a+.02||Math.abs(n-a)<=.02&&i<d)&&(l=u,a=Math.max(n,a),d=i)}return l};var Ot=(t,e)=>{let r=0;for(;r<t.length&&r<e.length&&t[r]===e[r];)r++;let s=t.length,l=e.length;for(;s>r&&l>r&&t[s-1]===e[l-1];)s--,l--;let a=t.slice(0,r).map(c=>({t:"=",v:c})),d=t.slice(s).map(c=>({t:"=",v:c})),u=t.slice(r,s),n=e.slice(r,l),i;if((u.length+1)*(n.length+1)>4e5)i=[...u.map(c=>({t:"-",v:c})),...n.map(c=>({t:"+",v:c}))];else{let c=n.length+1,p=new Uint32Array((u.length+1)*c);for(let y=u.length-1;y>=0;y--)for(let g=n.length-1;g>=0;g--)p[y*c+g]=u[y]===n[g]?p[(y+1)*c+g+1]+1:Math.max(p[(y+1)*c+g],p[y*c+g+1]);i=[];let h=0,m=0;for(;h<u.length&&m<n.length;)u[h]===n[m]?(i.push({t:"=",v:u[h]}),h++,m++):p[(h+1)*c+m]>=p[h*c+m+1]?i.push({t:"-",v:u[h++]}):i.push({t:"+",v:n[m++]});for(;h<u.length;)i.push({t:"-",v:u[h++]});for(;m<n.length;)i.push({t:"+",v:n[m++]})}return[...a,...i,...d]},_t=t=>t.split(/(\\s+)/).filter(e=>e!==""),ae=(t,e,r=2)=>{let s=Ot(t.split(`\n`),e.split(`\n`)),l=[],a=1,d=1,u=null,n=0;return s.forEach((i,c)=>{s.slice(Math.max(0,c-r),c+r+1).some(h=>h.t!=="=")?((!u||i.t==="="&&n>2*r)&&(u={a,b:d,ops:[]},l.push(u)),u.ops.push(i),n=i.t==="="?n+1:0):(u=null,n=0),i.t!=="+"&&a++,i.t!=="-"&&d++}),l};var yt="tb-editor",le="tb-editor-style",Dt="tb-gh-identity",Ge=7.5*60*60*1e3,de=2e4,Ye=200,Et=/^#edit(?:-(\\d+))?$/,Ke=t=>t?`#edit-${t}`:"#edit",ce={tbEditor:!0},We="This page has changes waiting for review; you\\u2019re editing the latest draft.",o=(t,e={},...r)=>{let s=document.createElement(t);for(let[l,a]of Object.entries(e))a!==!1&&(l==="text"?s.textContent=String(a):l==="class"?s.className=String(a):s.setAttribute(l,a===!0?"":String(a)));for(let l of r)l&&s.append(l);return s},ue="http://www.w3.org/2000/svg",bt=t=>{let e=document.createElementNS(ue,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let r=document.createElementNS(ue,"path");return r.setAttribute("d",t),r.setAttribute("fill","currentColor"),e.append(r),e},pe="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",At="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",Pt="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",Ve="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Ht=t=>{let e=t?.userMessage,r=typeof e=="string"?e.trim():"";return r?r.slice(0,Ye):null},Ze=()=>{try{let t=sessionStorage.getItem(Dt);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Ge?null:e}catch{return null}},Rt=t=>{try{t?sessionStorage.setItem(Dt,JSON.stringify(t)):sessionStorage.removeItem(Dt)}catch{}},Ut=()=>{if(document.getElementById(le))return;let t=`#${yt}`,e=o("style",{id:le});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-faint, #9B9BA1); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-faint, #9B9BA1); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: #FFFFFF; }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-faint, #9B9BA1); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n${t} .tb-ed-del { background: #FFEBE9; }\n${t} .tb-ed-add { background: #E6FFEC; }\n${t} .tb-ed-del del { background: #FFC1C0; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: #ABF2BC; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},Xe=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,r)=>r.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),Je="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",qt=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(Je).forEach(s=>s.remove()),e.querySelectorAll("*").forEach(s=>{for(let l of Array.from(s.attributes)){let a=l.value.trim().toLowerCase();(l.name.startsWith("on")||(l.name==="href"||l.name==="src")&&/^(javascript|data|vbscript):/.test(a))&&s.removeAttribute(l.name)}s.tagName==="A"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"))});let r=document.createDocumentFragment();return r.append(...Array.from(e.body.childNodes)),r},jt=(t,e)=>{let r=o("div",{class:"tb-ed-diff"}),s=ae(t,e);if(!s.length)return r.append(o("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),r;let l=(a,d)=>{let u=o("div",{class:`tb-ed-line${a==="-"?" tb-ed-del":a==="+"?" tb-ed-add":""}`}),n=o("span");return typeof d=="string"?n.textContent=d||" ":n.append(...d),u.append(o("span",{text:a==="="?" ":a}),n),u};for(let a of s){let d=o("div",{class:"tb-ed-hunk"},o("div",{class:"tb-ed-hh",text:`Line ${a.b}`}));for(let u=0;u<a.ops.length;){let n=a.ops[u];if(n.t==="="){d.append(l("=",n.v)),u++;continue}let i=[],c=[];for(;a.ops[u]?.t==="-";)i.push(a.ops[u++].v);for(;a.ops[u]?.t==="+";)c.push(a.ops[u++].v);let p=Math.min(i.length,c.length),h=i.map((m,y)=>y<p?Ot(_t(m),_t(c[y])):null);i.forEach((m,y)=>{let g=h[y];d.append(l("-",g?g.filter(E=>E.t!=="+").map(E=>E.t==="-"?o("del",{text:E.v}):document.createTextNode(E.v)):m))}),c.forEach((m,y)=>{let g=h[y];d.append(l("+",g?g.filter(E=>E.t!=="-").map(E=>E.t==="+"?o("ins",{text:E.v}):document.createTextNode(E.v)):m))})}r.append(d)}return r},Ct=null,be=()=>Ct?.(),Mt=t=>{if(Ct)return;Ut();let e=document.body.style.overflow,r=new URL(t.endpoint,location.href).origin,s=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),l=t.path.split("/"),a=l.pop(),d=t.para&&Number(t.para.getAttribute("data-pnum"))||0,u=t.mode,n="",i="",c="drafts",p=null,h="",m=Ze(),y=!1,g=!1,E=null,A=null,ot=!1,rt=window.scrollY,z=Ke(u==="paragraph"?d:0),B=o("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),R=o("span",{class:"tb-ed-pill"},bt(At),o("span",{text:c})),I=o("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},bt(Pt));I.append(o("span",{text:t.repo.split("/").pop()||t.repo}));for(let b of l)I.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{text:b}));I.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{class:"tb-ed-file",text:a}));let x=o("span",{class:"tb-ed-muted",text:d?` \\xB7 \\xB6${d}`:""});I.append(x,R);let w=o("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),F=o("div",{class:"tb-ed-head"},I,w),S=o("div",{class:"tb-ed-discard",role:"alert",hidden:!0},o("span",{text:"Discard your changes?"})),K=o("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),P=o("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});S.append(K,P);let q=o("div",{class:"tb-ed-main"}),U=o("div",{class:"tb-ed-inner"}),j=o("p",{class:"tb-ed-note",hidden:!0}),$=o("p",{class:"tb-ed-note",hidden:!0,text:We}),N=o("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),G=o("div",{class:"tb-ed-gate",hidden:!0});U.append($,j,N,G),q.append(U),B.append(F,S,q);let gt=["Edit","Preview","Changes"],st=o("div",{role:"tablist","aria-label":"Editor view"}),Y=gt.map((b,f)=>o("button",{type:"button",role:"tab",id:`tb-ed-tab-${f}`,"aria-controls":`tb-ed-panel-${f}`,"aria-selected":f===0?"true":"false",tabindex:f===0?0:-1,text:b==="Edit"?"Edit":b==="Preview"?"Preview":"Changes"}));st.append(...Y);let et=o("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),nt=o("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),W=o("div",{class:"tb-ed-bar"},st,o("div",{class:"tb-ed-actions"},et,nt)),V=o("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),Z=o("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),D=o("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),C=[o("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},Z,V,D),o("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),o("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],Q=o("div",{class:"tb-ed-box"},W,...C),it=o("p",{class:"tb-ed-foot"}),at=()=>V.value,wt=()=>h,kt=b=>{Y.forEach((f,v)=>{f.setAttribute("aria-selected",v===b?"true":"false"),f.tabIndex=v===b?0:-1,C[v].hidden=v!==b}),b===1&&T(),b===2&&(C[2].textContent="",C[2].append(jt(wt(),at())))};Y.forEach((b,f)=>{b.addEventListener("click",()=>kt(f)),b.addEventListener("keydown",v=>{let L=v.key==="ArrowRight"?1:v.key==="ArrowLeft"?-1:0;if(!L)return;v.preventDefault();let tt=(f+L+Y.length)%Y.length;kt(tt),Y[tt].focus()})});let mt=0,T=()=>{let b=C[1];b.textContent="",b.className="tb-ed-panel tb-ed-preview";let f=o("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});b.append(f);let v=++mt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:Xe(at()),mode:"markdown"})}).then(L=>L.ok?L.text():Promise.reject(new Error(String(L.status)))).then(L=>{v===mt&&(b.textContent="",b.append(qt(L)))}).catch(()=>{v===mt&&(f.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};V.addEventListener("input",()=>{g=at()!==h,nt.disabled=!g});let M=o("div",{class:"tb-ed-scrim",hidden:!0}),_=o("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});M.append(_),B.append(M);let lt=(b,f,v,L=!1)=>{v.id=b;let tt=o("p",{class:"tb-ed-err",id:`${b}-err`}),O=o("label",{for:b,text:f},L?o("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:o("div",{class:"tb-ed-field"},O,v,tt),control:v,err:tt}},H=lt("tb-ed-msg","Title",o("input",{type:"text",maxlength:200,autocomplete:"off"})),X=lt("tb-ed-desc","Extended description",o("textarea",{rows:3,maxlength:5e3}),!0),J=o("div",{class:"tb-ed-who"}),pt=o("div",{class:"tb-ed-what"},bt(At)),ht=o("span");pt.append(ht);let Zt=o("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),ft=o("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),vt=o("form",{novalidate:!0},o("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),H.wrap,X.wrap,J,pt,o("div",{class:"tb-ed-row"},Zt,ft)),dt=o("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});_.append(vt,dt);let Tt=()=>{if(J.textContent="",m){let b=o("img",{src:`https://avatars.githubusercontent.com/u/${m.id}?s=56`,alt:""}),f=o("button",{type:"button",class:"tb-ed-link",text:"Sign out"});f.addEventListener("click",()=>{m=null,Rt(null),Tt()}),J.append(b,o("span",{},"Signed in as ",o("strong",{text:`@${m.login}`})," \\u2014 this edit will be credited to your GitHub account."),f)}else J.append(Xt(),o("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Xt=()=>{let b=o("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},bt(Ve),"Sign in with GitHub");return b.addEventListener("click",()=>Oe(b)),b},Ne=()=>{G.textContent="";let b=Xt(),f=o("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let v=o("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});v.addEventListener("click",()=>{$t(),t.suggest()}),f.append(v," instead: it needs no account.")}else f.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");G.append(o("h2",{text:"Sign in to edit"}),o("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),o("p",{},b),f),N.hidden=!0,G.hidden=!1,b.focus()},Jt=b=>{if(b.origin!==r)return;let f=b.data;if(!(!f||f.type!=="tb-github-identity")){if(E=null,f.error||typeof f.token!="string"||typeof f.login!="string"){t.track("github_signin",{outcome:f.error==="denied"?"cancelled":"error"});return}if(m={token:f.token,login:f.login,id:Number(f.id)||0,name:f.name??"",at:Date.now()},Rt(m),t.track("github_signin",{outcome:"success"}),!ot)return oe();Tt(),M.hidden||H.control.focus()}},Oe=b=>{let f=`${s}?origin=${encodeURIComponent(location.origin)}`;E=window.open(f,"tb-github-signin","popup,width=560,height=720"),!E&&!b.parentElement?.querySelector(".tb-ed-err")&&b.after(o("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Jt);let _e=(b,f)=>{b.control.setAttribute("aria-invalid","true"),b.control.setAttribute("aria-describedby",b.err.id),b.err.textContent=f},Qt=b=>{b.control.removeAttribute("aria-invalid"),b.control.removeAttribute("aria-describedby"),b.err.textContent=""};H.control.addEventListener("input",()=>Qt(H));let Re=()=>{H.control.value||(H.control.value=u==="paragraph"&&d?`Edit \\xB6${d} of ${a}`:`Update ${a}`),ht.textContent="",ht.append("This creates a new branch and opens a proposal to merge it into ",o("code",{text:c}),". Nothing changes in the book until an editor accepts it."),Tt(),vt.hidden=!1,dt.hidden=!0,M.hidden=!1,H.control.focus(),H.control.select()},It=()=>{M.hidden=!0,nt.focus()};nt.addEventListener("click",Re),Zt.addEventListener("click",It),M.addEventListener("mousedown",b=>{b.target===M&&!y&&It()});let Nt=(b,f,v,L)=>{if(!B.isConnected)return;dt.textContent="",dt.append(o("h2",{text:b}),o("p",{text:f})),v&&dt.append(o("p",{},o("a",{href:v.href,target:"_blank",rel:"noopener",text:v.text})));let tt=o("button",{type:"button",class:`tb-ed-btn${L?" tb-ed-primary":""}`,text:L?"Back to my edit":"Close"});tt.addEventListener("click",L?()=>{dt.hidden=!0,vt.hidden=!1,ft.focus()}:()=>Lt(!0)),dt.append(o("div",{class:"tb-ed-row"},tt)),vt.hidden=!0,dt.hidden=!1,dt.focus()};vt.addEventListener("submit",b=>{if(b.preventDefault(),y)return;let f=null;if(Qt(H),H.control.value.trim()?m||(f=J.querySelector("button")):(_e(H,"Please give your change a short title."),f=H.control),f){f.focus();return}let v={mode:u,path:t.path,baseSha:i,title:H.control.value.trim(),description:X.control.value.trim()};u==="page"?v.content=at():(v.startLine=p.start,v.original=p.text,v.replacement=at(),d&&(v.paragraph=d)),v.identity=m.token,y=!0,ft.disabled=!0,ft.textContent="Proposing\\u2026";let L=A=new AbortController,tt=setTimeout(()=>L.abort(),de);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v),signal:L.signal}).then(async O=>{let ct=null;try{ct=await O.json()}catch{ct=null}if(O.status===401&&m&&(m=null,Rt(null),Tt()),!O.ok)throw Object.assign(new Error(String(O.status)),{userMessage:Ht(ct)});return ct}).then(O=>{g=!1,O.fallback&&typeof O.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:u}),Nt("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:O.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:u}),Nt("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof O.prUrl=="string"?{href:O.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(O=>{t.track("page_edit_submitted",{outcome:"error",mode:u}),Nt("That did not go through",O&&O.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(tt),A===L&&(A=null),y=!1,ft.disabled=!1,ft.textContent="Propose changes"})});let De=b=>Array.from(b.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(f=>!f.disabled&&f.tabIndex>=0&&!f.closest("[hidden]")),te=b=>{if(b.key==="Escape"){b.preventDefault(),M.hidden?xt():y||(!dt.hidden&&vt.hidden&&!g?Lt(!0):It());return}if(b.key!=="Tab")return;let f=M.hidden?B:_,v=De(f);if(!v.length){b.preventDefault(),f.focus();return}let L=v.indexOf(document.activeElement);(b.shiftKey?L<=0:L===-1||L===v.length-1)&&(b.preventDefault(),v[b.shiftKey?v.length-1:0].focus())},ee=b=>{g&&(b.preventDefault(),b.returnValue="")},Lt=(b=!1)=>{if(!b&&g)return xt();g=!1,Et.test(location.hash)?history.back():$t()},ne=()=>{if(!Et.test(location.hash)){if(g)return history.pushState(ce,"",z),xt();$t()}},$t=()=>{Ct=null,A?.abort(),E?.close(),document.removeEventListener("keydown",te,!0),window.removeEventListener("message",Jt),window.removeEventListener("beforeunload",ee),window.removeEventListener("popstate",ne),B.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,rt)},xt=()=>{if(!g)return Lt(!0);S.hidden=!1,P.focus()};K.addEventListener("click",()=>Lt(!0)),P.addEventListener("click",()=>{S.hidden=!0,V.focus()}),w.addEventListener("click",xt),et.addEventListener("click",xt),document.addEventListener("keydown",te,!0),window.addEventListener("beforeunload",ee),window.addEventListener("popstate",ne),Ct=$t,t.push!==!1&&history.pushState(ce,"",z),document.body.style.overflow="hidden",document.body.append(B),w.focus(),t.track("page_editor_opened",{mode:u});let Pe=b=>{N.textContent="",N.removeAttribute("class"),N.append(b+" ",o("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},oe=()=>{if(!m)return Ne();ot=!0,G.hidden=!0,N.hidden=!1;let b=new AbortController,f=setTimeout(()=>b.abort(),de);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:b.signal}).then(async v=>{let L=null;try{L=await v.json()}catch{L=null}if(!v.ok)throw Object.assign(new Error(String(v.status)),{userMessage:Ht(L)});return L}).then(v=>{if(B.isConnected){if(typeof v?.content!="string"||typeof v.sha!="string")throw new Error("bad source");if(n=v.content,i=v.sha,c=typeof v.branch=="string"?v.branch:c,R.lastChild.textContent=c,$.hidden=!t.builtBlob||t.builtBlob===i,u==="paragraph"&&(p=t.para?ie(n,t.para.textContent??"",d):null,p||(u="page",x.textContent="",j.textContent=`We couldn\\u2019t find \\xB6${d} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,j.hidden=!1)),u==="paragraph"&&p){Q.classList.add("tb-ed-para");let L=n.split(`\n`),tt=p.text.split(`\n`).length,O=L.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),ct=L.slice(p.start+tt,p.start+tt+3).join(`\n`).trim();Z.textContent=O.length>220?`\\u2026${O.slice(-220)}`:O,D.textContent=ct.length>220?`${ct.slice(0,220)}\\u2026`:ct,Z.hidden=!O,D.hidden=!ct,h=p.text,it.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else h=n,it.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";V.value=h,N.remove(),U.append(Q,it),V.setSelectionRange(0,0),V.focus()}}).catch(v=>{B.isConnected&&Pe(v&&v.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(f))};oe()};var ge="tb-history-style",Qe=30,me=2e4,tn=()=>{if(document.getElementById(ge))return;let t=`#${yt}`,e=o("style",{id:ge});e.textContent=`\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-hi-list li + li { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; padding: 0.7rem 1rem; border: 0; background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-msg { display: block; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.15rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 0.75rem; }\n${t} .tb-hi-head { margin: 0 0 0.75rem; }\n${t} .tb-hi-head h2 { margin: 0; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n`,document.head.append(e)},en=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric"})},zt=async(t,e)=>{let r=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),s=null;try{s=await r.json()}catch{}if(!r.ok){let l=new Error(`HTTP ${r.status}`);throw l.userMessage=Ht(s),l}return s},Ft=null,he=()=>Ft?.(),fe=t=>{if(Ft||document.getElementById(yt))return;Ut(),tn();let e=document.body.style.overflow,r=null,s=0,l=new Map,a=o("div",{id:yt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),d=t.path.split("/"),u=d.pop(),n=o("div",{class:"tb-ed-crumbs",id:"tb-hi-title"},bt(Pt),o("span",{class:"tb-ed-file",text:"History"}));n.append(o("span",{class:"tb-ed-sep",text:"\\xB7"}),o("span",{text:t.repo.split("/").pop()||t.repo}));for(let x of d)n.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{text:x}));n.append(o("span",{class:"tb-ed-sep",text:"/"}),o("span",{text:u})),n.append(o("span",{class:"tb-ed-pill"},bt(At),o("span",{text:t.branch})));let i=o("button",{type:"button",class:"tb-ed-x","aria-label":"Close the history",text:"\\xD7"}),c=o("div",{class:"tb-ed-main"}),p=o("div",{class:"tb-ed-inner"});c.append(p),a.append(o("div",{class:"tb-ed-head"},n,i),c);let h=x=>o("p",{class:"tb-ed-muted",role:"status",text:x}),m=(x,w)=>{let F=o("div",{class:"tb-ed-note",role:"alert"});return F.append(o("span",{text:`${x?.userMessage||w} `}),o("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),F},y=()=>{r?.abort();let x=new AbortController;r=x;let w=setTimeout(()=>x.abort(),me);return{signal:x.signal,done:()=>clearTimeout(w),current:()=>r===x}},g=x=>x.reader&&l.get(x.sha)||x.who,E=x=>`${g(x)} \\xB7 ${en(x.date)}`,A=null,ot=()=>{let x=[...new Set((A??[]).filter(K=>K.reader).map(K=>K.sha))].slice(0,Qe);if(!x.length)return;let w=new URL(t.endpoint,location.href);w.searchParams.set("shas",x.join(","));let F=new AbortController,S=setTimeout(()=>F.abort(),me);zt(w.toString(),F.signal).then(K=>{let P=K?.names??{};for(let[U,j]of Object.entries(P))typeof j=="string"&&j.trim()&&l.set(U,j.trim().slice(0,80));let q=p.querySelectorAll(".tb-hi-list .tb-hi-meta");A?.forEach((U,j)=>{q[j]&&(q[j].textContent=E(U))})}).catch(()=>{}).finally(()=>clearTimeout(S))},rt=()=>{if(p.textContent="",!A)return;if(!A.length){p.append(h("This page has no published revisions yet."));return}p.append(o("p",{class:"tb-ed-muted",text:`${A.length} published ${A.length===1?"version":"versions"} of this page, newest first. Open one to see what changed.`}));let x=o("ol",{class:"tb-hi-list"});A.forEach((w,F)=>{let S=o("button",{type:"button",class:"tb-hi-rev"},o("span",{class:"tb-hi-msg",text:w.message||"(no description)"}),o("span",{class:"tb-hi-meta",text:E(w)}));S.addEventListener("click",()=>{s=c.scrollTop,z(F)}),x.append(o("li",{},S))}),p.append(x),c.scrollTop=s},z=x=>{let w=A[x];p.textContent="";let F=o("button",{type:"button",class:"tb-ed-btn tb-hi-back",text:"\\u2190 All revisions"});F.addEventListener("click",()=>{r?.abort(),rt(),(p.querySelectorAll(".tb-hi-rev")[x]??i).focus()});let S=o("p",{class:"tb-ed-muted",text:E(w)}),K=o("div",{class:"tb-hi-head"},o("h2",{text:w.message||"(no description)"}),S),P=h("Loading this revision\\u2026");p.append(F,K,P),c.scrollTop=0,F.focus(),t.track("page_revision_opened");let q=y(),U=new URL(t.endpoint,location.href);U.searchParams.set("sha",w.sha),U.searchParams.set("path",w.path),zt(U.toString(),q.signal).then(j=>{if(!q.current())return;let $=j;w.reader&&typeof $.proposer=="string"&&$.proposer.trim()&&(l.set(w.sha,$.proposer.trim().slice(0,80)),S.textContent=E(w));let N=typeof $.before=="string"?$.before:"",G=typeof $.after=="string"?$.after:"",gt=["Changes","Page as it was"],st=o("div",{role:"tablist","aria-label":"Revision view"}),Y=gt.map((D,C)=>o("button",{type:"button",role:"tab",id:`tb-hi-tab-${C}`,"aria-controls":`tb-hi-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:D}));st.append(...Y);let et=o("div",{role:"tabpanel",id:"tb-hi-panel-0","aria-labelledby":"tb-hi-tab-0",tabindex:0});$.status==="added"&&et.append(o("p",{class:"tb-ed-panel tb-ed-muted",text:"The page was first published in this revision."}));let nt=typeof $.previousPath=="string"&&$.previousPath!==w.path?$.previousPath:"";nt&&et.append(o("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved here from ${nt}${N===G?"; its text didn\\u2019t change.":"."}`})),(!nt||N!==G)&&et.append(jt(N,G));let W=o("div",{role:"tabpanel",id:"tb-hi-panel-1","aria-labelledby":"tb-hi-tab-1",tabindex:0,hidden:!0,class:"tb-ed-panel tb-ed-preview"});typeof $.html=="string"&&$.html?W.append(qt($.html)):W.append(o("p",{class:"tb-ed-muted",text:"The page was removed in this revision."}));let V=[et,W],Z=D=>Y.forEach((C,Q)=>{C.setAttribute("aria-selected",Q===D?"true":"false"),C.tabIndex=Q===D?0:-1,V[Q].hidden=Q!==D});Y.forEach((D,C)=>{D.addEventListener("click",()=>Z(C)),D.addEventListener("keydown",Q=>{let it=Q.key==="ArrowRight"?1:Q.key==="ArrowLeft"?-1:0;if(!it)return;Q.preventDefault();let at=(C+it+Y.length)%Y.length;Z(at),Y[at].focus()})}),P.replaceWith(o("div",{class:"tb-ed-box"},o("div",{class:"tb-ed-bar"},st),...V))}).catch(j=>{q.current()&&P.replaceWith(m(j,"This revision couldn\\u2019t be loaded just now. Please try again in a moment."))}).finally(q.done)},B=x=>{if(x.key==="Escape"){x.preventDefault(),R();return}if(x.key!=="Tab")return;let w=Array.from(a.querySelectorAll("a[href], button, [tabindex]")).filter(S=>!S.disabled&&S.tabIndex>=0&&!S.closest("[hidden]"));if(!w.length)return;let F=w.indexOf(document.activeElement);(x.shiftKey?F<=0:F===-1||F===w.length-1)&&(x.preventDefault(),w[x.shiftKey?w.length-1:0].focus())},R=()=>{Ft=null,r?.abort(),document.removeEventListener("keydown",B,!0),a.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};i.addEventListener("click",R),document.addEventListener("keydown",B,!0),Ft=R,document.body.style.overflow="hidden",document.body.append(a),i.focus(),t.track("page_history_opened"),p.append(h("Loading this page\\u2019s history\\u2026"));let I=y();zt(t.listUrl,I.signal).then(x=>{I.current()&&(A=(Array.isArray(x)?x:[]).filter(w=>!!w&&typeof w.sha=="string"&&typeof w.path=="string"),rt(),ot())}).catch(x=>{I.current()&&(p.textContent="",p.append(m(x,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(I.done)};var ye={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},xe=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),nn=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(s=>`${s.charAt(0).toUpperCase()}.`).join(" ")}`},on=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,ve=t=>/[.?!]$/.test(t)?t:`${t}.`,Ee=t=>{let e=on(xe(t.authors).map(nn)),r=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),s=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",l=[],a=s?[{text:`${ve(s)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)l.push({text:`${ve(e)} (n.d.). `},...a);else if(a.length){let[d,...u]=a;l.push({...d,text:d.text.replace(/ $/,"")},{text:" (n.d.). "},...u)}else l.push({text:"(n.d.). "});return l.push({text:`Retrieved ${r}, from ${t.url}`}),l},we=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=ye[t.licence],s=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&s.push({text:` by ${xe(t.authors).join(", ")}`}),e&&t.bookTitle&&s.push({text:", from "},{text:t.bookTitle,italic:!0}),s.push({text:`, ${t.url}`}),r?s.push({text:`, is licensed under ${r.name} (${r.url})`}):t.licence&&s.push({text:`, is licensed under ${t.licence}`}),s.push({text:"."}),s},ke=t=>t.map(e=>e.text).join(""),Te=t=>ye[t]?.name??t;var ut=(t,e)=>{try{let r=window.tbTrack;typeof r=="function"&&(e?r(t,e):r(t))}catch{}},Yt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",r="tb-suggest-title",d=g=>{let E=g?.userMessage,A=typeof E=="string"?E.trim():"";return A?A.slice(0,200):null},u=()=>{if(document.getElementById(e))return;let g=document.createElement("style");g.id=e,g.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: #FFFFFF; cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(g)},n=(g,E,A,ot=!1)=>{let rt=document.createElement("div");rt.className="tb-sg-field";let z=document.createElement("label");if(z.setAttribute("for",g),z.textContent=E,ot){let R=document.createElement("span");R.className="tb-sg-opt",R.textContent=" (optional)",z.append(R)}let B=document.createElement("p");return B.className="tb-sg-err",B.id=g+"-err",A.id=g,!ot&&!A.readOnly&&(A.required=!0),rt.append(z,A,B),{wrap:rt,control:A,err:B,hintId:null}},i=g=>{let E=[];g.err.textContent&&E.push(g.err.id),g.hintId&&E.push(g.hintId),E.length?g.control.setAttribute("aria-describedby",E.join(" ")):g.control.removeAttribute("aria-describedby")},c=(g,E)=>{g.control.setAttribute("aria-invalid","true"),g.err.textContent=E,i(g)},p=g=>{g.control.hasAttribute("aria-invalid")&&(g.control.removeAttribute("aria-invalid"),g.err.textContent="",i(g))},h=null,m=(g,E,A)=>{if(h)return;u();let ot=A,rt=document.body.style.overflow,z=null,B=!1,R=document.createElement("div");R.id=t;let I=document.createElement("div");I.className="tb-sg-dialog",I.tabIndex=-1,I.setAttribute("role","dialog"),I.setAttribute("aria-modal","true"),I.setAttribute("aria-labelledby",r);let x=document.createElement("div");x.className="tb-sg-head";let w=document.createElement("h2");w.id=r,w.textContent="Suggest an edit";let F=document.createElement("button");F.type="button",F.className="tb-sg-close",F.textContent="\\xD7",F.setAttribute("aria-label","Close suggestion form"),x.append(w,F);let S=document.createElement("form");S.noValidate=!0;let K=document.createElement("p");K.className="tb-sg-intro",K.textContent="Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let P=document.createElement("input");P.type="text",P.name="name",P.autocomplete="name";let q=n("tb-sg-name","Your name",P),U=document.createElement("input");U.type="text",U.name="path",U.readOnly=!0,U.value=E;let j=n("tb-sg-path","Page you are editing",U),$=document.createElement("textarea");$.name="suggestion",$.rows=6,$.maxLength=5e3;let N=n("tb-sg-suggestion","Your suggested change",$),G=document.createElement("p");G.className="tb-sg-count",G.id="tb-sg-count",N.hintId=G.id;let gt=()=>{let T=5e3-$.value.length;G.textContent=T+" character"+(T===1?"":"s")+" remaining"};gt(),i(N),$.addEventListener("input",()=>{gt(),p(N)}),N.wrap.append(G);let st=document.createElement("textarea");st.name="reasoning",st.rows=3;let Y=n("tb-sg-reasoning","Why",st,!0);q.control.addEventListener("input",()=>p(q));let et=document.createElement("div");et.className="tb-sg-hp",et.setAttribute("aria-hidden","true");let nt=document.createElement("label");nt.setAttribute("for","tb-sg-website"),nt.textContent="Leave this field empty";let W=document.createElement("input");W.type="text",W.name="website",W.id="tb-sg-website",W.tabIndex=-1,W.autocomplete="off",W.setAttribute("aria-hidden","true"),et.append(nt,W);let V=document.createElement("div");V.className="tb-sg-actions";let Z=document.createElement("button");Z.type="submit",Z.className="tb-sg-btn",Z.textContent="Send suggestion";let D=document.createElement("button");D.type="button",D.className="tb-sg-quiet",D.textContent="Cancel",V.append(Z,D),S.append(K,q.wrap,j.wrap,N.wrap,Y.wrap,et,V);let C=document.createElement("div");C.className="tb-sg-pane",C.tabIndex=-1,C.hidden=!0,I.append(x,S,C),R.append(I);let Q=()=>{C.hidden=!0,S.hidden=!1,$.focus()},it=(T,M,_,lt=!1)=>{if(!R.isConnected)return;C.textContent="";let H=document.createElement("p");H.className="tb-sg-pane-title",H.textContent=T;let X=document.createElement("p");if(X.textContent=M,C.append(H,X),_){let pt=document.createElement("a");pt.href=_,pt.target="_blank",pt.rel="noopener",pt.textContent="View your suggestion on GitHub";let ht=document.createElement("p");ht.append(pt),C.append(ht)}let J=document.createElement("button");J.type="button",J.className=lt?"tb-sg-btn":"tb-sg-quiet",J.textContent=lt?"Back to my suggestion":"Close",J.addEventListener("click",lt?Q:()=>h?.()),C.append(J),S.hidden=!0,C.hidden=!1,C.focus()},at=()=>Array.prototype.filter.call(I.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),T=>!T.disabled&&T.tabIndex>=0&&!T.closest("[hidden]")),wt=T=>{if(T.key==="Escape"){T.preventDefault(),h?.();return}if(T.key!=="Tab")return;let M=at();if(!M.length){T.preventDefault(),I.focus();return}let _=M.indexOf(document.activeElement);T.shiftKey?_<=0&&(T.preventDefault(),M[M.length-1].focus()):(_===-1||_===M.length-1)&&(T.preventDefault(),M[0].focus())};h=()=>{if(h=null,z)try{z.abort()}catch{}document.removeEventListener("keydown",wt,!0),R.remove(),document.body.style.overflow=rt,ot.isConnected&&ot.focus()},R.addEventListener("mousedown",T=>{T.target===R&&h?.()}),F.addEventListener("click",()=>h?.()),D.addEventListener("click",()=>h?.()),document.addEventListener("keydown",wt,!0);let kt=()=>{let T=null,M=(_,lt)=>{c(_,lt),T||(T=_.control)};for(let _ of[q,N])p(_);return P.value.trim()||M(q,"Please add your name."),$.value.trim()?$.value.length>5e3&&M(N,"Please keep the suggestion under 5000 characters."):M(N,"Please describe the change you would like."),T&&T.focus(),!T},mt=T=>{B=T,Z.disabled=T,Z.textContent=T?"Sending\\u2026":"Send suggestion"};S.addEventListener("submit",T=>{if(T.preventDefault(),B||!kt())return;let M={name:P.value.trim(),suggestion:$.value.trim(),reasoning:st.value.trim(),path:E,website:W.value};if(M.website){it("Thank you","Your suggestion has been received.");return}mt(!0);let _=z=new AbortController,lt=setTimeout(()=>_.abort(),1e4);fetch(g,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(M),signal:_.signal}).then(async H=>{let X=null;try{X=await H.json()}catch{X=null}if(!H.ok){let J=new Error(X?.error||"HTTP "+H.status);throw J.userMessage=d(X),J}return X}).then(H=>{ut("suggest_edit_submitted",{outcome:"success"});let X=H?.issueUrl;it("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof X=="string"?X:null)}).catch(H=>{ut("suggest_edit_submitted",{outcome:"error"}),it("That did not go through",H&&H.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(lt),z===_&&(z=null),Z.isConnected?mt(!1):B=!1})}),document.body.style.overflow="hidden",document.body.appendChild(R),P.focus(),ut("suggest_edit_opened")},y=((g,E,A)=>{try{m(g,E,A)}catch{h=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return y.closeIfOpen=()=>h?.(),y}catch{return null}})(),Le="tb-pedit-style",rn=()=>{if(document.getElementById(Le))return;let t=document.createElement("style");t.id=Le,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n.popover button.tb-pedit { display: none; }\n@media print { button.tb-pedit { display: none !important; } }\n`,document.head.appendChild(t)},sn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",pe),r.setAttribute("fill","currentColor"),e.append(r),t.append(e),t},St=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let r of Array.from(St))e&&!r.panel.contains(e)&&!r.button.contains(e)&&r.d.close(!1)});var an=t=>typeof t.showPopover=="function",Bt=new Set,Ae=(t,e)=>{let r=t.closest(".tb-header")??t,s=r.getBoundingClientRect(),l=t.getBoundingClientRect(),a=document.documentElement.clientWidth,d=e.style;d.top=`${Math.max(s.bottom,0)+6}px`,d.maxHeight=`${Math.max(window.innerHeight-Math.max(s.bottom,0)-12,120)}px`,r.classList.contains("tb-hdr-icons")||s.width<=640?(d.left=`${s.left}px`,d.right="auto",d.width=`${s.width}px`):(d.left="auto",d.right=`${Math.max(a-l.right,0)}px`,d.width="")},Wt=()=>{for(let t of Array.from(Bt))Ae(t.button,t.panel)};window.addEventListener("resize",Wt);window.addEventListener("scroll",Wt,{passive:!0});var He=(t,e)=>{e.hidden=!1,an(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",Bt.add({button:t,panel:e}),Ae(t,e))},Me=t=>{for(let e of Array.from(Bt))e.panel===t&&Bt.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Gt=(t,e,r,s)=>{let l=()=>Array.from(e.querySelectorAll(r?\'[role="menuitem"]\':"input, button, a[href]")).filter(n=>!n.hidden&&!n.closest("[hidden]")),a={d:null,button:t,panel:e},d={open(){for(let i of Array.from(St))i!==a&&i.d.close(!1);He(t,e),t.setAttribute("aria-expanded","true"),St.add(a),(r?l()[0]:e.querySelector("input:checked")??l()[0])?.focus()},close(n=!0){e.hidden||(Me(e),t.setAttribute("aria-expanded","false"),St.delete(a),n&&t.focus())}};a.d=d,t.addEventListener("click",()=>{if(!e.hidden)return d.close();s?s(d.open):d.open()});let u=n=>{if(n.key==="Escape"&&!e.hidden){n.preventDefault(),n.stopPropagation(),d.close(!0);return}if(!r||e.hidden||!e.contains(n.target))return;let i=l(),c=i.indexOf(document.activeElement),p=h=>{n.preventDefault(),i[(h+i.length)%i.length]?.focus()};n.key==="ArrowDown"?p(c+1):n.key==="ArrowUp"?p(c-1):n.key==="Home"?p(0):n.key==="End"?p(i.length-1):n.key==="Tab"&&d.close(!1)};return e.addEventListener("keydown",u),t.addEventListener("keydown",u),r&&e.addEventListener("click",n=>{let i=n.target.closest(\'[role="menuitem"]\');if(i){if(i.getAttribute("aria-disabled")==="true"){n.preventDefault();return}d.close(!1)}}),d},k=(t,e={},...r)=>{let s=document.createElement(t);for(let[l,a]of Object.entries(e))l==="text"?s.textContent=a:l==="class"?s.className=a:s.setAttribute(l,a);for(let l of r)l!==null&&s.append(l);return s},Fe=(t,e,...r)=>{let s=k("dialog",{class:"tb-dialog","aria-label":t}),l=k("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});l.addEventListener("click",()=>s.close()),s.append(l,...r);let a=null;return s.addEventListener("close",()=>{s.remove(),a?a():e.isConnected&&e.focus()}),document.body.append(s),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),{d:s,closeThen:d=>(a=d,s.close())}},$e=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,He(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Me(e),e.hidden=!1)},4e3))},ln=(t,e,r)=>{let s=()=>{let l=k("textarea",{readonly:""});l.value=t,l.style.position="fixed",l.style.opacity="0",document.body.append(l),l.select();let a=!1;try{a=document.execCommand("copy")}catch{a=!1}return l.remove(),a};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>s()?e():r()):s()?e():r()},Se="tb-contribute-explained",Be=!1,dn=()=>{if(Be)return!0;try{return localStorage.getItem(Se)==="1"}catch{return!1}},Ce={edit:{title:"Edit this page",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},comment:{title:"Public comment",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"]}},cn=["no","one","two","three"],Ie=(t,e,r)=>{Be=!0;try{localStorage.setItem(Se,"1")}catch{}let s=({title:c,what:p,who:h,account:m,link:y})=>k("section",{class:"tb-route"},k("h3",{text:c}),k("p",{text:p}),k("p",{},k("strong",{text:"Who sees it: "}),h),k("p",{},k("strong",{text:"Account: "}),m,y?" ":null,y?k("a",{href:y[1],target:"_blank",rel:"noopener noreferrer",text:y[0]}):null)),l=k("div",{class:"tb-dialog-row"}),d=(document.querySelector(".tb-header")?.dataset.routes??"comment").split(" ").filter(c=>c in Ce),u=d.includes("edit")||d.includes("note")?"book":"edition",n=Fe("How contributing works",t,k("h2",{text:"How contributing works"}),k("p",{text:`There ${d.length===1?"is one way":`are ${cn[d.length]??d.length} ways`} to help with this ${u}. They differ in who sees what you write, and in which account you need.`}),...d.map(c=>s(Ce[c])),k("p",{},k("a",{href:e,text:"More about commenting and contributing"})),l),i=k("button",{type:"button",class:"tb-btn",text:"Close"});if(i.addEventListener("click",()=>n.d.close()),r){let c=k("button",{type:"button",class:"tb-btn tb-btn-primary",text:r.label});c.addEventListener("click",()=>n.closeThen(r.run)),l.append(i,c),c.focus()}else l.append(i),i.focus()},Kt=(t,e,r,s)=>dn()?s():Ie(t,e,{label:r,run:s}),un=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},pn=(t,e)=>{let r={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:un(),accessed:new Date},s=d=>{let u=k("p",{class:"tb-cite-text"});for(let n of d)u.append(n.italic?k("i",{text:n.text}):n.text);return u},l=(d,u)=>{let n=k("span",{class:"tb-cite-said",role:"status"}),i=k("button",{type:"button",class:"tb-btn",text:"Copy"});return i.addEventListener("click",()=>ln(ke(u),()=>n.textContent="Copied",()=>n.textContent="Couldn\'t copy: select the text instead")),k("section",{},k("h3",{text:d}),s(u),k("div",{class:"tb-dialog-row"},n,i))},a=Te(r.licence);Fe("Cite this page",e,k("h2",{text:"Cite this page"}),l("APA 7",Ee(r)),l(a?`Attribution (${a})`:"Attribution",we(r)))},bn=(t,e,r)=>{let s=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];r&&s.push(["annotations","Public annotations",[["on","On"],["off","Off"]]]);let l=k("p",{class:"tb-panel-note",role:"status"});for(let[a,d,u]of s){let n=k("div",{class:"tb-seg"});for(let[c,p]of u){let h=k("input",{type:"radio",name:`tb-pref-${a}`,value:c});h.checked=e.get(a)===c,h.addEventListener("change",()=>{if(a==="annotations"&&r){if(l.textContent="",c==="on")r.enable();else if(r.disable().reload){let m=k("button",{type:"button",class:"tb-btn",text:"Reload"});m.addEventListener("click",()=>location.reload()),l.append("Highlights hidden. The annotation tab goes away when the page reloads.",m)}return}e.set(a,c),a==="numbers"&&ut("paragraph_numbers_toggled",{to:c})}),n.append(k("label",{},h,p))}let i=k("fieldset",{},k("legend",{text:d}),n);a==="annotations"&&i.append(l),t.append(i)}},Vt=null;window.addEventListener("popstate",()=>Vt?.(location.hash,!1));var gn=(t,e,r,s,l)=>{let a={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:l,track:ut};t.addEventListener("click",n=>{if(n.button!==0||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey){ut("edit_on_github_clicked");return}n.preventDefault(),Mt({...a,mode:"page",trigger:r})});let d=new Map,u=Array.from(document.querySelectorAll("[data-pnum]")).filter(n=>!n.closest(".popover")&&!n.querySelector(":scope > button.tb-pedit"));u.length&&rn();for(let n of u){let i=sn();i.addEventListener("click",c=>{c.stopPropagation(),Kt(i,s,`Continue: edit \\xB6${n.dataset.pnum}`,()=>Mt({...a,mode:"paragraph",para:n,trigger:i}))}),n.append(i),d.set(n.dataset.pnum??"",{p:n,b:i})}Vt=(n,i)=>{let c=Et.exec(n);if(!c)return;let p=c[1]?d.get(c[1]):void 0;Mt(p?{...a,mode:"paragraph",para:p.p,trigger:p.b,push:i}:{...a,mode:"page",trigger:r,push:i})}},mn=(t,e,r)=>{t.addEventListener("click",s=>{s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),fe({endpoint:e,listUrl:t.dataset.history??"",path:t.dataset.path??"",repo:t.dataset.repo??"",branch:t.dataset.branch??"",githubHref:t.href,trigger:r,track:ut}))})},hn=t=>{let e=t.querySelector("[data-tb-reader]"),r=t.querySelector("[data-tb-reader-item]"),s=()=>t.scrollWidth>t.clientWidth+1,l=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,a=l?.querySelector(".home-link")?l:null,d=t.querySelector(".tb-hdr-label"),u=()=>!!d&&getComputedStyle(d).position!=="absolute",n=t.querySelector(".tb-hdr-where"),i=m=>!!m&&m.scrollWidth>m.clientWidth+1,c=m=>!s()&&u()===m&&!i(n)&&!Array.from(n?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(i),p=m=>{a?.classList.toggle("tb-logo-full",m),a?.classList.toggle("tb-logo-icon",!m)},h=()=>{let m=!!e&&!!r&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),m&&(e.hidden=!1,r.hidden=!0),s()&&t.classList.add("tb-hdr-icons"),s()&&(t.classList.add("tb-hdr-tight"),m&&(e.hidden=!0,r.hidden=!1));let y=u();a&&c(y)&&(p(!0),c(y)||p(!1)),Wt()};if(h(),window.addEventListener("resize",h),document.fonts?.ready.then(h),typeof ResizeObserver=="function"){let m=new ResizeObserver(()=>requestAnimationFrame(h));m.observe(t);let y=t.querySelector(".tb-hdr-actions");y&&m.observe(y)}return h},fn=t=>{let e=n=>t.querySelector(n),r=t.dataset.howTo??"/how-to-comment",s=window,l=e("[data-tb-contribute]"),a=e("[data-tb-more]"),d=n=>{try{n()}catch{}};d(()=>{let n=e("[data-tb-search]"),i=document.querySelector(".search .search-button");!n||!i||(n.addEventListener("click",()=>i.click()),n.hidden=!1)}),d(()=>{let n=e("[data-tb-menu]"),i=document.querySelector(".explorer"),c=i?.querySelector(".mobile-explorer");if(!n||!i||!c)return;let p=i.querySelector(".explorer-content");p?.id&&n.setAttribute("aria-controls",p.id),c.tabIndex=-1;let h=()=>!i.classList.contains("collapsed"),m=h(),y=()=>{let g=h();n.setAttribute("aria-expanded",String(g)),c.tabIndex=g?0:-1,m&&!g&&(c===document.activeElement||i.contains(document.activeElement))&&n.focus(),m=g};new MutationObserver(y).observe(i,{attributes:!0,attributeFilter:["class"]}),n.addEventListener("click",()=>{let g=n.getBoundingClientRect();document.documentElement.style.setProperty("--tb-menu-x",`${g.left}px`),document.documentElement.style.setProperty("--tb-menu-y",`${g.top}px`),c.click(),h()&&c.focus()}),document.addEventListener("keydown",g=>{g.key!=="Escape"||!h()||!c.checkVisibility?.()||(c.click(),n.focus())}),n.hidden=!1}),d(()=>{let n=e("[data-tb-reader]"),i=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!n||!i||!c)return;let p=()=>n.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),n.addEventListener("click",()=>c.click()),i.addEventListener("click",()=>c.click()),p(),t.dataset.tbHasReader="1",n.hidden=!1});let u=()=>{ut("annotation_badge_clicked"),s.tbAnnotations.open().then(n=>{n||$e("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};d(()=>{if(!s.tbAnnotations)return;let n=e("[data-tb-annotate]");n&&(n.addEventListener("click",()=>Kt(n,r,"Continue: open annotations",u)),n.querySelector(".tb-anno-count")||n.append(k("span",{class:"tb-anno-count"})),n.hidden=!1);let i=e("[data-tb-comment]");i&&(i.addEventListener("click",u),i.hidden=!1)}),d(()=>{let n=e("#tb-contribute-menu");if(!l||!n)return;Gt(l,n,!0,y=>Kt(l,r,"Continue to Contribute",y)),e("[data-tb-explain]")?.addEventListener("click",()=>Ie(l,r));let i=e("button.tb-suggest-btn"),c=i?.dataset.endpoint,p=i&&c&&Yt?()=>Yt(c,i.dataset.path??"",l):void 0,h=e("a.edit-on-github"),m=h?.dataset.editEndpoint;if(h&&m){if(gn(h,m,l,r,p),Et.test(location.hash)){let y=location.hash,g=window.history.state?.tbEditor===!0;g||window.history.replaceState(window.history.state,"",location.pathname+location.search),Vt?.(y,!g)}}else h?.addEventListener("click",()=>ut("edit_on_github_clicked"));i&&p&&(i.addEventListener("click",p),i.hidden=!1),l.hidden=!1}),d(()=>{let n=e("[data-tb-appearance]"),i=e("#tb-appearance");!n||!i||!s.tbPrefs||(bn(i,s.tbPrefs,s.tbAnnotations),Gt(n,i,!1),n.hidden=!1)}),d(()=>{let n=e("#tb-more-menu");if(!a||!n)return;Gt(a,n,!0),e("[data-tb-cite]")?.addEventListener("click",()=>pn(t,a)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let i=e("a.tb-history-link");i?.dataset.revisionEndpoint&&mn(i,i.dataset.revisionEndpoint,a);let c=e("[data-tb-backlinks]"),p=document.querySelector(".backlinks");c&&(!p||!p.querySelector("a.internal")?(c.setAttribute("aria-disabled","true"),c.append(k("span",{class:"tb-mi-s",text:"No other page links here"}))):c.addEventListener("click",()=>{let m=p.querySelector("h3")??p;m.tabIndex=-1,p.scrollIntoView({block:"start"}),m.focus({preventScroll:!0})}));let h=e("[data-tb-download]");h?.addEventListener("click",()=>{fetch(h.dataset.tbDownload).then(m=>m.ok?m.blob():Promise.reject(new Error(String(m.status)))).then(m=>{let y=URL.createObjectURL(m),g=k("a",{href:y,download:h.dataset.file??"page.md"});document.body.append(g),g.click(),g.remove(),setTimeout(()=>URL.revokeObjectURL(y),1e3)}).catch(()=>$e("That didn\'t download just now. View source has the same file."))}),a.hidden=!1}),d(()=>{hn(t)})},vn=()=>{try{Yt?.closeIfOpen(),be(),he();for(let t of Array.from(document.querySelectorAll(".tb-page-controls")))t.dataset.tbWired||(t.dataset.tbWired="1",fn(t))}catch{}};document.addEventListener("nav",vn);\n';

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
      // Quartz's explorer menu, where the explorer is a drawer (a narrow window).
      btn(
        { "data-tb-menu": "", "aria-expanded": "false" },
        SVG(MENU),
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
          SVG(COMMENT),
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
   edition-integrations' breakpointBand moves to its narrow width). */
.tb-header [data-tb-menu] { display: none; }
@media (max-width: 800px) {
  .tb-header [data-tb-menu]:not([hidden]) { display: inline-flex; }
}
.tb-header [data-tb-reader][aria-pressed="true"] { color: var(--tb-accent, var(--secondary)); }
/* Quartz's own reader-mode and explorer-menu buttons stay in the page, out of
   sight, so their scripts keep working: the header's buttons press them. Open,
   the drawer's own menu button (above the drawer, its way to close) shows at the
   header's menu button's place. */
.page > #quartz-body > .sidebar .readermode { display: none; }
.page > #quartz-body .explorer .mobile-explorer:not(.hide-until-loaded) {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;
  clip-path: inset(50%); white-space: nowrap; border: 0;
}
html.mobile-no-scroll .page > #quartz-body .explorer .mobile-explorer:not(.hide-until-loaded) {
  position: fixed;
  left: var(--tb-menu-x, 0.5rem);
  top: var(--tb-menu-y, 0.5rem);
  width: auto; height: auto; margin: 0; padding: 0.45rem; overflow: visible; clip-path: none;
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