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
var controls_inline_default = 'var ce=/^\\s{0,3}(```|~~~)/,We=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,Ve=t=>{let e=t.split(`\n`),o=[],r=0;if(e[0]?.trim()==="---"){let l=e.findIndex((u,i)=>i>0&&(u.trim()==="---"||u.trim()==="..."));l>0&&(r=l+1)}let d=0;for(;r<e.length;){let l=e[r];if(!l.trim()){r++;continue}let u=ce.exec(l);if(u||l.trim()==="$$"){let c=u?u[1]:"$$",p=r+1;for(;p<e.length&&!e[p].trim().startsWith(c);)p++;r=p+1;continue}let i=r;for(;i<e.length&&e[i].trim()&&!ce.test(e[i]);)i++;let n=e.slice(r,i).join(`\n`),s=!We.test(l);o.push({start:r,text:n,ordinal:s?++d:0}),r=i}return o},Ze=t=>ue(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,o)=>o.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),ue=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],Xe=(t,e)=>{if(!t.length||!e.length)return 0;let o=new Map;for(let d of t)o.set(d,(o.get(d)??0)+1);let r=0;for(let d of e){let l=o.get(d)??0;l>0&&(r++,o.set(d,l-1))}return r/Math.max(t.length,e.length)};var be=(t,e,o)=>{let r=ue(e);if(!r.length)return null;let d=null,l=0,u=1/0;for(let i of Ve(t)){let n=Xe(Ze(i.text),r);if(n<.75)continue;let s=i.ordinal?Math.abs(i.ordinal-o):1e6;(n>l+.02||Math.abs(n-l)<=.02&&s<u)&&(d=i,l=Math.max(n,l),u=s)}return d};var Et=(t,e)=>{let o=0;for(;o<t.length&&o<e.length&&t[o]===e[o];)o++;let r=t.length,d=e.length;for(;r>o&&d>o&&t[r-1]===e[d-1];)r--,d--;let l=t.slice(0,o).map(c=>({t:"=",v:c})),u=t.slice(r).map(c=>({t:"=",v:c})),i=t.slice(o,r),n=e.slice(o,d),s;if((i.length+1)*(n.length+1)>4e5)s=[...i.map(c=>({t:"-",v:c})),...n.map(c=>({t:"+",v:c}))];else{let c=n.length+1,p=new Uint32Array((i.length+1)*c);for(let x=i.length-1;x>=0;x--)for(let b=n.length-1;b>=0;b--)p[x*c+b]=i[x]===n[b]?p[(x+1)*c+b+1]+1:Math.max(p[(x+1)*c+b],p[x*c+b+1]);s=[];let g=0,h=0;for(;g<i.length&&h<n.length;)i[g]===n[h]?(s.push({t:"=",v:i[g]}),g++,h++):p[(g+1)*c+h]>=p[g*c+h+1]?s.push({t:"-",v:i[g++]}):s.push({t:"+",v:n[h++]});for(;g<i.length;)s.push({t:"-",v:i[g++]});for(;h<n.length;)s.push({t:"+",v:n[h++]})}return[...l,...s,...u]},kt=t=>t.split(/(\\s+)/).filter(e=>e!==""),Mt=(t,e,o=2)=>{let r=Et(t.split(`\n`),e.split(`\n`)),d=[],l=1,u=1,i=null,n=0;return r.forEach((s,c)=>{r.slice(Math.max(0,c-o),c+o+1).some(g=>g.t!=="=")?((!i||s.t==="="&&n>2*o)&&(i={a:l,b:u,ops:[]},d.push(i)),i.ops.push(s),n=s.t==="="?n+1:0):(i=null,n=0),s.t!=="+"&&l++,s.t!=="-"&&u++}),d};var xt="tb-editor",pe="tb-editor-style",qt="tb-gh-identity",Je=7.5*60*60*1e3,me=2e4,Qe=200,Tt=/^#edit(?:-(\\d+))?$/,tn=t=>t?`#edit-${t}`:"#edit",he={tbEditor:!0},en="This page has changes waiting for review; you\\u2019re editing the latest draft.",a=(t,e={},...o)=>{let r=document.createElement(t);for(let[d,l]of Object.entries(e))l!==!1&&(d==="text"?r.textContent=String(l):d==="class"?r.className=String(l):r.setAttribute(d,l===!0?"":String(l)));for(let d of o)d&&r.append(d);return r},ge="http://www.w3.org/2000/svg",Ht=t=>{let e=document.createElementNS(ge,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let o=document.createElementNS(ge,"path");return o.setAttribute("d",t),o.setAttribute("fill","currentColor"),e.append(o),e},ve="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",fe="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",nn="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",on="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Bt=t=>{let e=t?.userMessage,o=typeof e=="string"?e.trim():"";return o?o.slice(0,Qe):null},rn=()=>{try{let t=sessionStorage.getItem(qt);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Je?null:e}catch{return null}},zt=t=>{try{t?sessionStorage.setItem(qt,JSON.stringify(t)):sessionStorage.removeItem(qt)}catch{}},Ut=()=>{if(document.getElementById(pe))return;let t=`#${xt}`,e=a("style",{id:pe});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-faint, #9B9BA1); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-faint, #9B9BA1); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: #FFFFFF; }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-faint, #9B9BA1); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n${t} .tb-ed-del { background: #FFEBE9; }\n${t} .tb-ed-add { background: #E6FFEC; }\n${t} .tb-ed-del del { background: #FFC1C0; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: #ABF2BC; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},sn=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,o)=>o.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),an="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",jt=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(an).forEach(r=>r.remove()),e.querySelectorAll("*").forEach(r=>{for(let d of Array.from(r.attributes)){let l=d.value.trim().toLowerCase();(d.name.startsWith("on")||(d.name==="href"||d.name==="src")&&/^(javascript|data|vbscript):/.test(l))&&r.removeAttribute(d.name)}r.tagName==="A"&&(r.setAttribute("target","_blank"),r.setAttribute("rel","noopener noreferrer"))});let o=document.createDocumentFragment();return o.append(...Array.from(e.body.childNodes)),o},ln=(t,e)=>{let o=a("div",{class:"tb-ed-diff"}),r=Mt(t,e);if(!r.length)return o.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),o;let d=(l,u)=>{let i=a("div",{class:`tb-ed-line${l==="-"?" tb-ed-del":l==="+"?" tb-ed-add":""}`}),n=a("span");return typeof u=="string"?n.textContent=u||" ":n.append(...u),i.append(a("span",{text:l==="="?" ":l}),n),i};for(let l of r){let u=a("div",{class:"tb-ed-hunk"},a("div",{class:"tb-ed-hh",text:`Line ${l.b}`}));for(let i=0;i<l.ops.length;){let n=l.ops[i];if(n.t==="="){u.append(d("=",n.v)),i++;continue}let s=[],c=[];for(;l.ops[i]?.t==="-";)s.push(l.ops[i++].v);for(;l.ops[i]?.t==="+";)c.push(l.ops[i++].v);let p=Math.min(s.length,c.length),g=s.map((h,x)=>x<p?Et(kt(h),kt(c[x])):null);s.forEach((h,x)=>{let b=g[x];u.append(d("-",b?b.filter(v=>v.t!=="+").map(v=>v.t==="-"?a("del",{text:v.v}):document.createTextNode(v.v)):h))}),c.forEach((h,x)=>{let b=g[x];u.append(d("+",b?b.filter(v=>v.t!=="-").map(v=>v.t==="+"?a("ins",{text:v.v}):document.createTextNode(v.v)):h))})}o.append(u)}return o},St=null,xe=()=>St?.(),Ot=t=>{if(St)return;Ut();let e=document.body.style.overflow,o=new URL(t.endpoint,location.href).origin,r=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),d=t.path.split("/"),l=d.pop(),u=t.para&&Number(t.para.getAttribute("data-pnum"))||0,i=t.mode,n="",s="",c="drafts",p=null,g="",h=rn(),x=!1,b=!1,v=null,H=null,Z=!1,ot=window.scrollY,U=tn(i==="paragraph"?u:0),A=a("div",{id:xt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),S=a("span",{class:"tb-ed-pill"},Ht(fe),a("span",{text:c})),f=a("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},Ht(nn));f.append(a("span",{text:t.repo.split("/").pop()||t.repo}));for(let m of d)f.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{text:m}));f.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{class:"tb-ed-file",text:l}));let k=a("span",{class:"tb-ed-muted",text:u?` \\xB7 \\xB6${u}`:""});f.append(k,S);let M=a("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),O=a("div",{class:"tb-ed-head"},f,M),B=a("div",{class:"tb-ed-discard",role:"alert",hidden:!0},a("span",{text:"Discard your changes?"})),et=a("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),z=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});B.append(et,z);let G=a("div",{class:"tb-ed-main"}),I=a("div",{class:"tb-ed-inner"}),R=a("p",{class:"tb-ed-note",hidden:!0}),j=a("p",{class:"tb-ed-note",hidden:!0,text:en}),N=a("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),X=a("div",{class:"tb-ed-gate",hidden:!0});I.append(j,R,N,X),G.append(I),A.append(O,B,G);let ut=["Edit","Preview","Changes"],K=a("div",{role:"tablist","aria-label":"Editor view"}),J=ut.map((m,y)=>a("button",{type:"button",role:"tab",id:`tb-ed-tab-${y}`,"aria-controls":`tb-ed-panel-${y}`,"aria-selected":y===0?"true":"false",tabindex:y===0?0:-1,text:m==="Edit"?"Edit":m==="Preview"?"Preview":"Changes"}));K.append(...J);let rt=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),nt=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),Q=a("div",{class:"tb-ed-bar"},K,a("div",{class:"tb-ed-actions"},rt,nt)),Y=a("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),_=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),P=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),$=[a("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},_,Y,P),a("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),a("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],bt=a("div",{class:"tb-ed-box"},Q,...$),st=a("p",{class:"tb-ed-foot"}),pt=()=>Y.value,Lt=()=>g,$t=m=>{J.forEach((y,w)=>{y.setAttribute("aria-selected",w===m?"true":"false"),y.tabIndex=w===m?0:-1,$[w].hidden=w!==m}),m===1&&T(),m===2&&($[2].textContent="",$[2].append(ln(Lt(),pt())))};J.forEach((m,y)=>{m.addEventListener("click",()=>$t(y)),m.addEventListener("keydown",w=>{let L=w.key==="ArrowRight"?1:w.key==="ArrowLeft"?-1:0;if(!L)return;w.preventDefault();let tt=(y+L+J.length)%J.length;$t(tt),J[tt].focus()})});let ht=0,T=()=>{let m=$[1];m.textContent="",m.className="tb-ed-panel tb-ed-preview";let y=a("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});m.append(y);let w=++ht;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:sn(pt()),mode:"markdown"})}).then(L=>L.ok?L.text():Promise.reject(new Error(String(L.status)))).then(L=>{w===ht&&(m.textContent="",m.append(jt(L)))}).catch(()=>{w===ht&&(y.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};Y.addEventListener("input",()=>{b=pt()!==g,nt.disabled=!b});let F=a("div",{class:"tb-ed-scrim",hidden:!0}),q=a("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});F.append(q),A.append(F);let it=(m,y,w,L=!1)=>{w.id=m;let tt=a("p",{class:"tb-ed-err",id:`${m}-err`}),D=a("label",{for:m,text:y},L?a("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:a("div",{class:"tb-ed-field"},D,w,tt),control:w,err:tt}},C=it("tb-ed-msg","Title",a("input",{type:"text",maxlength:200,autocomplete:"off"})),W=it("tb-ed-desc","Extended description",a("textarea",{rows:3,maxlength:5e3}),!0),V=a("div",{class:"tb-ed-who"}),ct=a("div",{class:"tb-ed-what"},Ht(fe)),gt=a("span");ct.append(gt);let ne=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),ft=a("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),vt=a("form",{novalidate:!0},a("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),C.wrap,W.wrap,V,ct,a("div",{class:"tb-ed-row"},ne,ft)),at=a("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});q.append(vt,at);let Ct=()=>{if(V.textContent="",h){let m=a("img",{src:`https://avatars.githubusercontent.com/u/${h.id}?s=56`,alt:""}),y=a("button",{type:"button",class:"tb-ed-link",text:"Sign out"});y.addEventListener("click",()=>{h=null,zt(null),Ct()}),V.append(m,a("span",{},"Signed in as ",a("strong",{text:`@${h.login}`})," \\u2014 this edit will be credited to your GitHub account."),y)}else V.append(oe(),a("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},oe=()=>{let m=a("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},Ht(on),"Sign in with GitHub");return m.addEventListener("click",()=>Ue(m)),m},qe=()=>{X.textContent="";let m=oe(),y=a("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let w=a("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});w.addEventListener("click",()=>{At(),t.suggest()}),y.append(w," instead: it needs no account.")}else y.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");X.append(a("h2",{text:"Sign in to edit"}),a("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),a("p",{},m),y),N.hidden=!0,X.hidden=!1,m.focus()},re=m=>{if(m.origin!==o)return;let y=m.data;if(!(!y||y.type!=="tb-github-identity")){if(v=null,y.error||typeof y.token!="string"||typeof y.login!="string"){t.track("github_signin",{outcome:y.error==="denied"?"cancelled":"error"});return}if(h={token:y.token,login:y.login,id:Number(y.id)||0,name:y.name??"",at:Date.now()},zt(h),t.track("github_signin",{outcome:"success"}),!Z)return de();Ct(),F.hidden||C.control.focus()}},Ue=m=>{let y=`${r}?origin=${encodeURIComponent(location.origin)}`;v=window.open(y,"tb-github-signin","popup,width=560,height=720"),!v&&!m.parentElement?.querySelector(".tb-ed-err")&&m.after(a("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",re);let je=(m,y)=>{m.control.setAttribute("aria-invalid","true"),m.control.setAttribute("aria-describedby",m.err.id),m.err.textContent=y},se=m=>{m.control.removeAttribute("aria-invalid"),m.control.removeAttribute("aria-describedby"),m.err.textContent=""};C.control.addEventListener("input",()=>se(C));let Ge=()=>{C.control.value||(C.control.value=i==="paragraph"&&u?`Edit \\xB6${u} of ${l}`:`Update ${l}`),gt.textContent="",gt.append("This creates a new branch and opens a proposal to merge it into ",a("code",{text:c}),". Nothing changes in the book until an editor accepts it."),Ct(),vt.hidden=!1,at.hidden=!0,F.hidden=!1,C.control.focus(),C.control.select()},Pt=()=>{F.hidden=!0,nt.focus()};nt.addEventListener("click",Ge),ne.addEventListener("click",Pt),F.addEventListener("mousedown",m=>{m.target===F&&!x&&Pt()});let Dt=(m,y,w,L)=>{if(!A.isConnected)return;at.textContent="",at.append(a("h2",{text:m}),a("p",{text:y})),w&&at.append(a("p",{},a("a",{href:w.href,target:"_blank",rel:"noopener",text:w.text})));let tt=a("button",{type:"button",class:`tb-ed-btn${L?" tb-ed-primary":""}`,text:L?"Back to my edit":"Close"});tt.addEventListener("click",L?()=>{at.hidden=!0,vt.hidden=!1,ft.focus()}:()=>Ft(!0)),at.append(a("div",{class:"tb-ed-row"},tt)),vt.hidden=!0,at.hidden=!1,at.focus()};vt.addEventListener("submit",m=>{if(m.preventDefault(),x)return;let y=null;if(se(C),C.control.value.trim()?h||(y=V.querySelector("button")):(je(C,"Please give your change a short title."),y=C.control),y){y.focus();return}let w={mode:i,path:t.path,baseSha:s,title:C.control.value.trim(),description:W.control.value.trim()};i==="page"?w.content=pt():(w.startLine=p.start,w.original=p.text,w.replacement=pt(),u&&(w.paragraph=u)),w.identity=h.token,x=!0,ft.disabled=!0,ft.textContent="Proposing\\u2026";let L=H=new AbortController,tt=setTimeout(()=>L.abort(),me);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(w),signal:L.signal}).then(async D=>{let lt=null;try{lt=await D.json()}catch{lt=null}if(D.status===401&&h&&(h=null,zt(null),Ct()),!D.ok)throw Object.assign(new Error(String(D.status)),{userMessage:Bt(lt)});return lt}).then(D=>{b=!1,D.fallback&&typeof D.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:i}),Dt("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:D.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:i}),Dt("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof D.prUrl=="string"?{href:D.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(D=>{t.track("page_edit_submitted",{outcome:"error",mode:i}),Dt("That did not go through",D&&D.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(tt),H===L&&(H=null),x=!1,ft.disabled=!1,ft.textContent="Propose changes"})});let Ke=m=>Array.from(m.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(y=>!y.disabled&&y.tabIndex>=0&&!y.closest("[hidden]")),ie=m=>{if(m.key==="Escape"){m.preventDefault(),F.hidden?wt():x||(!at.hidden&&vt.hidden&&!b?Ft(!0):Pt());return}if(m.key!=="Tab")return;let y=F.hidden?A:q,w=Ke(y);if(!w.length){m.preventDefault(),y.focus();return}let L=w.indexOf(document.activeElement);(m.shiftKey?L<=0:L===-1||L===w.length-1)&&(m.preventDefault(),w[m.shiftKey?w.length-1:0].focus())},ae=m=>{b&&(m.preventDefault(),m.returnValue="")},Ft=(m=!1)=>{if(!m&&b)return wt();b=!1,Tt.test(location.hash)?history.back():At()},le=()=>{if(!Tt.test(location.hash)){if(b)return history.pushState(he,"",U),wt();At()}},At=()=>{St=null,H?.abort(),v?.close(),document.removeEventListener("keydown",ie,!0),window.removeEventListener("message",re),window.removeEventListener("beforeunload",ae),window.removeEventListener("popstate",le),A.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,ot)},wt=()=>{if(!b)return Ft(!0);B.hidden=!1,z.focus()};et.addEventListener("click",()=>Ft(!0)),z.addEventListener("click",()=>{B.hidden=!0,Y.focus()}),M.addEventListener("click",wt),rt.addEventListener("click",wt),document.addEventListener("keydown",ie,!0),window.addEventListener("beforeunload",ae),window.addEventListener("popstate",le),St=At,t.push!==!1&&history.pushState(he,"",U),document.body.style.overflow="hidden",document.body.append(A),M.focus(),t.track("page_editor_opened",{mode:i});let Ye=m=>{N.textContent="",N.removeAttribute("class"),N.append(m+" ",a("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},de=()=>{if(!h)return qe();Z=!0,X.hidden=!0,N.hidden=!1;let m=new AbortController,y=setTimeout(()=>m.abort(),me);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:m.signal}).then(async w=>{let L=null;try{L=await w.json()}catch{L=null}if(!w.ok)throw Object.assign(new Error(String(w.status)),{userMessage:Bt(L)});return L}).then(w=>{if(A.isConnected){if(typeof w?.content!="string"||typeof w.sha!="string")throw new Error("bad source");if(n=w.content,s=w.sha,c=typeof w.branch=="string"?w.branch:c,S.lastChild.textContent=c,j.hidden=!t.builtBlob||t.builtBlob===s,i==="paragraph"&&(p=t.para?be(n,t.para.textContent??"",u):null,p||(i="page",k.textContent="",R.textContent=`We couldn\\u2019t find \\xB6${u} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,R.hidden=!1)),i==="paragraph"&&p){bt.classList.add("tb-ed-para");let L=n.split(`\n`),tt=p.text.split(`\n`).length,D=L.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),lt=L.slice(p.start+tt,p.start+tt+3).join(`\n`).trim();_.textContent=D.length>220?`\\u2026${D.slice(-220)}`:D,P.textContent=lt.length>220?`${lt.slice(0,220)}\\u2026`:lt,_.hidden=!D,P.hidden=!lt,g=p.text,st.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else g=n,st.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";Y.value=g,N.remove(),I.append(bt,st),Y.setSelectionRange(0,0),Y.focus()}}).catch(w=>{A.isConnected&&Ye(w&&w.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(y))};de()};var mt=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},It=(t,e)=>kt(t).map(o=>({v:o,s:{...e}})),yt=(t,e={})=>{let o=[],r={...e},d="",l=()=>{d&&o.push(...It(d,r)),d=""},u=i=>!!i&&/[\\p{L}\\p{N}]/u.test(i);for(let i=0;i<t.length;){let n=t.slice(i),s;if(n[0]==="\\\\"&&n.length>1)d+=n[1],i+=2;else if(s=/^`([^`]+)`/.exec(n))l(),o.push(...It(s[1],{...r,code:!0})),i+=s[0].length;else if(s=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(n)){l();let c=s[2]??s[1].split("/").pop()??s[1];o.push(...It(c,{...r,link:!0})),i+=s[0].length}else if(s=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(n))l(),o.push(...It(`(image${s[1]?`: ${s[1]}`:""})`,{...r,i:!0})),i+=s[0].length;else if(s=/^\\[\\^([^\\]]+)\\]/.exec(n))l(),o.push({v:s[1],s:{...r,sup:!0}}),i+=s[0].length;else if(s=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(n))l(),o.push(...yt(s[1],{...r,link:!0})),i+=s[0].length;else if(s=/^<\\/?[a-zA-Z][^>]*>/.exec(n))l(),i+=s[0].length;else if(n.startsWith("**")||n.startsWith("__")){let c=n.slice(0,2);r.b||t.indexOf(c,i+2)>i+2?(l(),r.b=!r.b):d+=c,i+=2}else(n[0]==="*"||n[0]==="_")&&!(n[0]==="_"&&u(t[i-1])&&u(t[i+1]))?(r.i||t.indexOf(n[0],i+1)>i+1?(l(),r.i=!r.i):d+=n[0],i+=1):(d+=n[0],i+=1)}return l(),o},Gt=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:yt(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:yt(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:yt(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:yt(e[2])}:{kind:"p",runs:yt(t)}:{kind:"blank",runs:[]}},ye=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=a("code",{},e)),t.s.i&&(e=a("em",{},e)),t.s.b&&(e=a("strong",{},e)),t.s.link&&(e=a("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=a("sup",{},e)),e},Kt=(t,e,o)=>{let r=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,d=a("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),l=a("div",{class:"tb-rd-text"});e.marker&&l.append(a("span",{class:"tb-rd-marker",text:e.marker}));let u=null;for(let{run:i,changed:n}of o)n&&t!=="="?(u||(u=a(t==="-"?"del":"ins"),l.append(u)),u.append(ye(i))):(u=null,l.append(ye(i)));return a("div",{class:r},d,l)},Yt=(t,e)=>t.map(o=>({run:o,changed:e})),we=(t,e)=>{let o=a("div",{class:"tb-ed-diff tb-rd"}),r=mt(t),d=mt(e);return r===d?(o.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),o):(Mt(r,d).forEach((l,u)=>{u>0&&o.append(a("div",{class:"tb-rd-gap","aria-hidden":"true",text:"\\u22EF"}));let i=l.ops;for(let n=0;n<i.length;){let s=i[n];if(s.t==="="){let b=Gt(s.v);o.append(Kt("=",b,Yt(b.runs,!1))),n++;continue}let c=[],p=[];for(;i[n]?.t==="-";)c.push(Gt(i[n++].v));for(;i[n]?.t==="+";)p.push(Gt(i[n++].v));let g=Math.min(c.length,p.length),h=c.map(b=>Yt(b.runs,!0)),x=p.map(b=>Yt(b.runs,!0));for(let b=0;b<g;b++){let v=c[b].runs,H=p[b].runs,Z=Et(v.map(f=>f.v),H.map(f=>f.v)),ot=0,U=0,A=[],S=[];for(let f of Z)f.t!=="+"&&A.push({run:v[ot++],changed:f.t==="-"}),f.t!=="-"&&S.push({run:H[U++],changed:f.t==="+"});h[b]=A,x[b]=S}c.forEach((b,v)=>o.append(Kt("-",b,h[v]))),p.forEach((b,v)=>o.append(Kt("+",b,x[v])))}}),o)};var Ee="tb-history-style",dn=30,ke=2e4,cn=()=>{if(document.getElementById(Ee))return;let t=`#${xt}.tb-hi`,e=a("style",{id:Ee});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n${t} .tb-rd-gap { padding: 0.3rem 0; text-align: center; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-ui, sans-serif); }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},un=(t,e)=>{let o=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),r=/^Edit \xB6(\\d+) of \\S+$/.exec(o);return r?`Paragraph ${r[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(o)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(o)||e&&/a new book from request/i.test(o)?"First published":o||(e?"First published":"Changed (no description given)")},bn=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric"})},Wt=async(t,e)=>{let o=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),r=null;try{r=await o.json()}catch{}if(!o.ok){let d=new Error(`HTTP ${o.status}`);throw d.userMessage=Bt(r),d}return r},Rt=null,Te=()=>Rt?.(),Le=t=>{if(Rt||document.getElementById(xt))return;Ut(),cn();let e=document.body.style.overflow,o=null,r=0,d=new Map,l=a("div",{id:xt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),u=a("div",{class:"tb-hi-where",id:"tb-hi-title"},a("span",{class:"tb-hi-name",text:"Page history"}),t.title?a("span",{class:"tb-hi-page",text:t.title}):null),i=a("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},a("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),a("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),n=a("div",{class:"tb-ed-main"}),s=a("div",{class:"tb-ed-inner"});n.append(s),l.append(a("div",{class:"tb-hi-top"},u,i),n);let c=f=>a("p",{class:"tb-ed-muted",role:"status",text:f}),p=(f,k)=>{let M=a("div",{class:"tb-ed-note",role:"alert"});return M.append(a("span",{text:`${f?.userMessage||k} `}),a("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),M},g=()=>{o?.abort();let f=new AbortController;o=f;let k=setTimeout(()=>f.abort(),ke);return{signal:f.signal,done:()=>clearTimeout(k),current:()=>o===f}},h=f=>f.reader&&d.get(f.sha)||f.who,x=f=>`Published ${bn(f.date)}, by ${h(f)}`,b=f=>un(v[f].message||"",f===v.length-1),v=null,H=()=>{let f=[...new Set((v??[]).filter(B=>B.reader).map(B=>B.sha))].slice(0,dn);if(!f.length)return;let k=new URL(t.endpoint,location.href);k.searchParams.set("shas",f.join(","));let M=new AbortController,O=setTimeout(()=>M.abort(),ke);Wt(k.toString(),M.signal).then(B=>{let et=B?.names??{};for(let[G,I]of Object.entries(et))typeof I=="string"&&I.trim()&&d.set(G,I.trim().slice(0,80));let z=s.querySelectorAll(".tb-hi-list .tb-hi-meta");v?.forEach((G,I)=>{z[I]&&(z[I].textContent=x(G))})}).catch(()=>{}).finally(()=>clearTimeout(O))},Z=()=>{if(s.textContent="",!v)return;if(!v.length){s.append(c("This page has no published revisions yet."));return}let f=v.length;s.append(a("p",{class:"tb-hi-intro",text:`${f===1?"One published version":`${f} published versions`} of ${t.title?`\\u201C${t.title}\\u201D`:"this page"}, newest first. Open one to see what changed.`}));let k=a("ol",{class:"tb-hi-list"});v.forEach((M,O)=>{let B=a("button",{type:"button",class:"tb-hi-rev"},a("span",{class:"tb-hi-msg",text:b(O)}),a("span",{class:"tb-hi-meta",text:x(M)}));B.addEventListener("click",()=>{r=n.scrollTop,ot(O)}),k.append(a("li",{},B))}),s.append(k),n.scrollTop=r},ot=f=>{let k=v[f];s.textContent="";let M=a("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 All versions"});M.addEventListener("click",()=>{o?.abort(),Z(),(s.querySelectorAll(".tb-hi-rev")[f]??i).focus()});let O=a("p",{class:"tb-ed-muted",text:x(k)}),B=a("div",{class:"tb-hi-head"},a("h2",{text:b(f)}),O),et=c("Loading this revision\\u2026");s.append(M,B,et),n.scrollTop=0,M.focus(),t.track("page_revision_opened");let z=g(),G=new URL(t.endpoint,location.href);G.searchParams.set("sha",k.sha),G.searchParams.set("path",k.path),Wt(G.toString(),z.signal).then(I=>{if(!z.current())return;let R=I;k.reader&&typeof R.proposer=="string"&&R.proposer.trim()&&(d.set(k.sha,R.proposer.trim().slice(0,80)),O.textContent=x(k));let j=typeof R.before=="string"?R.before:"",N=typeof R.after=="string"?R.after:"",X=["What changed","The page as it was"],ut=a("div",{role:"tablist","aria-label":"Revision view"}),K=X.map((_,P)=>a("button",{type:"button",role:"tab",id:`tb-hi-tab-${P}`,"aria-controls":`tb-hi-panel-${P}`,"aria-selected":P===0?"true":"false",tabindex:P===0?0:-1,text:_}));ut.append(...K);let J=a("div",{role:"tabpanel",id:"tb-hi-panel-0","aria-labelledby":"tb-hi-tab-0",tabindex:0});R.status==="added"&&J.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let rt=typeof R.previousPath=="string"&&R.previousPath!==k.path?R.previousPath:"";rt&&J.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${mt(j)===mt(N)?"; its text didn\\u2019t change.":"."}`})),(!rt||mt(j)!==mt(N))&&J.append(we(j,N));let nt=a("div",{role:"tabpanel",id:"tb-hi-panel-1","aria-labelledby":"tb-hi-tab-1",tabindex:0,hidden:!0,class:"tb-ed-panel tb-ed-preview"});typeof R.html=="string"&&R.html?nt.append(jt(R.html)):nt.append(a("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}));let Q=[J,nt],Y=_=>K.forEach((P,$)=>{P.setAttribute("aria-selected",$===_?"true":"false"),P.tabIndex=$===_?0:-1,Q[$].hidden=$!==_});K.forEach((_,P)=>{_.addEventListener("click",()=>Y(P)),_.addEventListener("keydown",$=>{let bt=$.key==="ArrowRight"?1:$.key==="ArrowLeft"?-1:0;if(!bt)return;$.preventDefault();let st=(P+bt+K.length)%K.length;Y(st),K[st].focus()})}),et.replaceWith(a("div",{class:"tb-ed-box"},a("div",{class:"tb-ed-bar"},ut),...Q))}).catch(I=>{z.current()&&et.replaceWith(p(I,"This version couldn\\u2019t be loaded just now. Please try again in a moment."))}).finally(z.done)},U=f=>{if(f.key==="Escape"){f.preventDefault(),A();return}if(f.key!=="Tab")return;let k=Array.from(l.querySelectorAll("a[href], button, [tabindex]")).filter(O=>!O.disabled&&O.tabIndex>=0&&!O.closest("[hidden]"));if(!k.length)return;let M=k.indexOf(document.activeElement);(f.shiftKey?M<=0:M===-1||M===k.length-1)&&(f.preventDefault(),k[f.shiftKey?k.length-1:0].focus())},A=()=>{Rt=null,o?.abort(),document.removeEventListener("keydown",U,!0),l.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};i.addEventListener("click",A),document.addEventListener("keydown",U,!0),Rt=A,document.body.style.overflow="hidden",document.body.append(l),i.focus(),t.track("page_history_opened"),s.append(c("Loading this page\\u2019s history\\u2026"));let S=g();Wt(t.listUrl,S.signal).then(f=>{S.current()&&(v=(Array.isArray(f)?f:[]).filter(k=>!!k&&typeof k.sha=="string"&&typeof k.path=="string"),Z(),H())}).catch(f=>{S.current()&&(s.textContent="",s.append(p(f,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(S.done)};var Ce={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},Fe=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),pn=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(r=>`${r.charAt(0).toUpperCase()}.`).join(" ")}`},mn=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,$e=t=>/[.?!]$/.test(t)?t:`${t}.`,Ae=t=>{let e=mn(Fe(t.authors).map(pn)),o=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),r=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",d=[],l=r?[{text:`${$e(r)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)d.push({text:`${$e(e)} (n.d.). `},...l);else if(l.length){let[u,...i]=l;d.push({...u,text:u.text.replace(/ $/,"")},{text:" (n.d.). "},...i)}else d.push({text:"(n.d.). "});return d.push({text:`Retrieved ${o}, from ${t.url}`}),d},Me=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",o=Ce[t.licence],r=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&r.push({text:` by ${Fe(t.authors).join(", ")}`}),e&&t.bookTitle&&r.push({text:", from "},{text:t.bookTitle,italic:!0}),r.push({text:`, ${t.url}`}),o?r.push({text:`, is licensed under ${o.name} (${o.url})`}):t.licence&&r.push({text:`, is licensed under ${t.licence}`}),r.push({text:"."}),r},He=t=>t.map(e=>e.text).join(""),Se=t=>Ce[t]?.name??t;var dt=(t,e)=>{try{let o=window.tbTrack;typeof o=="function"&&(e?o(t,e):o(t))}catch{}},Xt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",o="tb-suggest-title",u=b=>{let v=b?.userMessage,H=typeof v=="string"?v.trim():"";return H?H.slice(0,200):null},i=()=>{if(document.getElementById(e))return;let b=document.createElement("style");b.id=e,b.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: #FFFFFF; cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(b)},n=(b,v,H,Z=!1)=>{let ot=document.createElement("div");ot.className="tb-sg-field";let U=document.createElement("label");if(U.setAttribute("for",b),U.textContent=v,Z){let S=document.createElement("span");S.className="tb-sg-opt",S.textContent=" (optional)",U.append(S)}let A=document.createElement("p");return A.className="tb-sg-err",A.id=b+"-err",H.id=b,!Z&&!H.readOnly&&(H.required=!0),ot.append(U,H,A),{wrap:ot,control:H,err:A,hintId:null}},s=b=>{let v=[];b.err.textContent&&v.push(b.err.id),b.hintId&&v.push(b.hintId),v.length?b.control.setAttribute("aria-describedby",v.join(" ")):b.control.removeAttribute("aria-describedby")},c=(b,v)=>{b.control.setAttribute("aria-invalid","true"),b.err.textContent=v,s(b)},p=b=>{b.control.hasAttribute("aria-invalid")&&(b.control.removeAttribute("aria-invalid"),b.err.textContent="",s(b))},g=null,h=(b,v,H)=>{if(g)return;i();let Z=H,ot=document.body.style.overflow,U=null,A=!1,S=document.createElement("div");S.id=t;let f=document.createElement("div");f.className="tb-sg-dialog",f.tabIndex=-1,f.setAttribute("role","dialog"),f.setAttribute("aria-modal","true"),f.setAttribute("aria-labelledby",o);let k=document.createElement("div");k.className="tb-sg-head";let M=document.createElement("h2");M.id=o,M.textContent="Suggest an edit";let O=document.createElement("button");O.type="button",O.className="tb-sg-close",O.textContent="\\xD7",O.setAttribute("aria-label","Close suggestion form"),k.append(M,O);let B=document.createElement("form");B.noValidate=!0;let et=document.createElement("p");et.className="tb-sg-intro",et.textContent="Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let z=document.createElement("input");z.type="text",z.name="name",z.autocomplete="name";let G=n("tb-sg-name","Your name",z),I=document.createElement("input");I.type="text",I.name="path",I.readOnly=!0,I.value=v;let R=n("tb-sg-path","Page you are editing",I),j=document.createElement("textarea");j.name="suggestion",j.rows=6,j.maxLength=5e3;let N=n("tb-sg-suggestion","Your suggested change",j),X=document.createElement("p");X.className="tb-sg-count",X.id="tb-sg-count",N.hintId=X.id;let ut=()=>{let T=5e3-j.value.length;X.textContent=T+" character"+(T===1?"":"s")+" remaining"};ut(),s(N),j.addEventListener("input",()=>{ut(),p(N)}),N.wrap.append(X);let K=document.createElement("textarea");K.name="reasoning",K.rows=3;let J=n("tb-sg-reasoning","Why",K,!0);G.control.addEventListener("input",()=>p(G));let rt=document.createElement("div");rt.className="tb-sg-hp",rt.setAttribute("aria-hidden","true");let nt=document.createElement("label");nt.setAttribute("for","tb-sg-website"),nt.textContent="Leave this field empty";let Q=document.createElement("input");Q.type="text",Q.name="website",Q.id="tb-sg-website",Q.tabIndex=-1,Q.autocomplete="off",Q.setAttribute("aria-hidden","true"),rt.append(nt,Q);let Y=document.createElement("div");Y.className="tb-sg-actions";let _=document.createElement("button");_.type="submit",_.className="tb-sg-btn",_.textContent="Send suggestion";let P=document.createElement("button");P.type="button",P.className="tb-sg-quiet",P.textContent="Cancel",Y.append(_,P),B.append(et,G.wrap,R.wrap,N.wrap,J.wrap,rt,Y);let $=document.createElement("div");$.className="tb-sg-pane",$.tabIndex=-1,$.hidden=!0,f.append(k,B,$),S.append(f);let bt=()=>{$.hidden=!0,B.hidden=!1,j.focus()},st=(T,F,q,it=!1)=>{if(!S.isConnected)return;$.textContent="";let C=document.createElement("p");C.className="tb-sg-pane-title",C.textContent=T;let W=document.createElement("p");if(W.textContent=F,$.append(C,W),q){let ct=document.createElement("a");ct.href=q,ct.target="_blank",ct.rel="noopener",ct.textContent="View your suggestion on GitHub";let gt=document.createElement("p");gt.append(ct),$.append(gt)}let V=document.createElement("button");V.type="button",V.className=it?"tb-sg-btn":"tb-sg-quiet",V.textContent=it?"Back to my suggestion":"Close",V.addEventListener("click",it?bt:()=>g?.()),$.append(V),B.hidden=!0,$.hidden=!1,$.focus()},pt=()=>Array.prototype.filter.call(f.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),T=>!T.disabled&&T.tabIndex>=0&&!T.closest("[hidden]")),Lt=T=>{if(T.key==="Escape"){T.preventDefault(),g?.();return}if(T.key!=="Tab")return;let F=pt();if(!F.length){T.preventDefault(),f.focus();return}let q=F.indexOf(document.activeElement);T.shiftKey?q<=0&&(T.preventDefault(),F[F.length-1].focus()):(q===-1||q===F.length-1)&&(T.preventDefault(),F[0].focus())};g=()=>{if(g=null,U)try{U.abort()}catch{}document.removeEventListener("keydown",Lt,!0),S.remove(),document.body.style.overflow=ot,Z.isConnected&&Z.focus()},S.addEventListener("mousedown",T=>{T.target===S&&g?.()}),O.addEventListener("click",()=>g?.()),P.addEventListener("click",()=>g?.()),document.addEventListener("keydown",Lt,!0);let $t=()=>{let T=null,F=(q,it)=>{c(q,it),T||(T=q.control)};for(let q of[G,N])p(q);return z.value.trim()||F(G,"Please add your name."),j.value.trim()?j.value.length>5e3&&F(N,"Please keep the suggestion under 5000 characters."):F(N,"Please describe the change you would like."),T&&T.focus(),!T},ht=T=>{A=T,_.disabled=T,_.textContent=T?"Sending\\u2026":"Send suggestion"};B.addEventListener("submit",T=>{if(T.preventDefault(),A||!$t())return;let F={name:z.value.trim(),suggestion:j.value.trim(),reasoning:K.value.trim(),path:v,website:Q.value};if(F.website){st("Thank you","Your suggestion has been received.");return}ht(!0);let q=U=new AbortController,it=setTimeout(()=>q.abort(),1e4);fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(F),signal:q.signal}).then(async C=>{let W=null;try{W=await C.json()}catch{W=null}if(!C.ok){let V=new Error(W?.error||"HTTP "+C.status);throw V.userMessage=u(W),V}return W}).then(C=>{dt("suggest_edit_submitted",{outcome:"success"});let W=C?.issueUrl;st("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof W=="string"?W:null)}).catch(C=>{dt("suggest_edit_submitted",{outcome:"error"}),st("That did not go through",C&&C.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(it),U===q&&(U=null),_.isConnected?ht(!1):A=!1})}),document.body.style.overflow="hidden",document.body.appendChild(S),z.focus(),dt("suggest_edit_opened")},x=((b,v,H)=>{try{h(b,v,H)}catch{g=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return x.closeIfOpen=()=>g?.(),x}catch{return null}})(),Be="tb-pedit-style",hn=()=>{if(document.getElementById(Be))return;let t=document.createElement("style");t.id=Be,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n.popover button.tb-pedit { display: none; }\n@media print { button.tb-pedit { display: none !important; } }\n`,document.head.appendChild(t)},gn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",ve),o.setAttribute("fill","currentColor"),e.append(o),t.append(e),t},Nt=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let o of Array.from(Nt))e&&!o.panel.contains(e)&&!o.button.contains(e)&&o.d.close(!1)});var fn=t=>typeof t.showPopover=="function",_t=new Set,Ie=(t,e)=>{let o=t.closest(".tb-header")??t,d=(t.closest(".tb-header-slot")??o).getBoundingClientRect(),l=t.getBoundingClientRect(),u=document.documentElement.clientWidth,i=e.style;i.boxSizing="border-box",i.top=`${Math.max(d.bottom,0)+6}px`,i.maxHeight=`${Math.max(window.innerHeight-Math.max(d.bottom,0)-12,120)}px`;let n=()=>{i.left=`${Math.max(d.left,0)}px`,i.right="auto",i.width=`${Math.min(d.width,u)}px`};if(o.classList.contains("tb-hdr-icons")||o.getBoundingClientRect().width<=640)return n();i.left="auto",i.right=`${Math.max(u-l.right,0)}px`,i.width="",e.getBoundingClientRect().left<d.left&&n()},te=()=>{for(let t of Array.from(_t))Ie(t.button,t.panel)};window.addEventListener("resize",te);window.addEventListener("scroll",te,{passive:!0});var Re=(t,e)=>{e.hidden=!1,fn(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",_t.add({button:t,panel:e}),Ie(t,e))},Ne=t=>{for(let e of Array.from(_t))e.panel===t&&_t.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Vt=(t,e,o,r)=>{let d=()=>Array.from(e.querySelectorAll(o?\'[role="menuitem"]\':"input, button, a[href]")).filter(n=>!n.hidden&&!n.closest("[hidden]")),l={d:null,button:t,panel:e},u={open(){for(let s of Array.from(Nt))s!==l&&s.d.close(!1);Re(t,e),t.setAttribute("aria-expanded","true"),Nt.add(l),(o?d()[0]:e.querySelector("input:checked")??d()[0])?.focus()},close(n=!0){e.hidden||(Ne(e),t.setAttribute("aria-expanded","false"),Nt.delete(l),n&&t.focus())}};l.d=u,t.addEventListener("click",()=>{if(!e.hidden)return u.close();r?r(u.open):u.open()});let i=n=>{if(n.key==="Escape"&&!e.hidden){n.preventDefault(),n.stopPropagation(),u.close(!0);return}if(!o||e.hidden||!e.contains(n.target))return;let s=d(),c=s.indexOf(document.activeElement),p=g=>{n.preventDefault(),s[(g+s.length)%s.length]?.focus()};n.key==="ArrowDown"?p(c+1):n.key==="ArrowUp"?p(c-1):n.key==="Home"?p(0):n.key==="End"?p(s.length-1):n.key==="Tab"&&u.close(!1)};return e.addEventListener("keydown",i),t.addEventListener("keydown",i),o&&e.addEventListener("click",n=>{let s=n.target.closest(\'[role="menuitem"]\');if(s){if(s.getAttribute("aria-disabled")==="true"){n.preventDefault();return}u.close(!1)}}),u},E=(t,e={},...o)=>{let r=document.createElement(t);for(let[d,l]of Object.entries(e))d==="text"?r.textContent=l:d==="class"?r.className=l:r.setAttribute(d,l);for(let d of o)d!==null&&r.append(d);return r},_e=(t,e,...o)=>{let r=E("dialog",{class:"tb-dialog","aria-label":t}),d=E("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});d.addEventListener("click",()=>r.close()),r.append(d,...o);let l=null;return r.addEventListener("close",()=>{r.remove(),l?l():e.isConnected&&e.focus()}),document.body.append(r),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),{d:r,closeThen:u=>(l=u,r.close())}},Oe=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,Re(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Ne(e),e.hidden=!1)},4e3))},vn=(t,e,o)=>{let r=()=>{let d=E("textarea",{readonly:""});d.value=t,d.style.position="fixed",d.style.opacity="0",document.body.append(d),d.select();let l=!1;try{l=document.execCommand("copy")}catch{l=!1}return d.remove(),l};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>r()?e():o()):r()?e():o()},Pe="tb-contribute-explained",De=!1,xn=()=>{if(De)return!0;try{return localStorage.getItem(Pe)==="1"}catch{return!1}},Jt={edit:{title:"Edit this page",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Margin comment",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"]},comment:{title:"Public comment",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"]}},yn=["no","one","two","three"],ze=(t,e,o)=>{De=!0;try{localStorage.setItem(Pe,"1")}catch{}let r=({title:p,what:g,who:h,account:x,link:b})=>E("section",{class:"tb-route"},E("h3",{text:p}),E("p",{text:g}),E("p",{},E("strong",{text:"Who sees it: "}),h),E("p",{},E("strong",{text:"Account: "}),x,b?" ":null,b?E("a",{href:b[1],target:"_blank",rel:"noopener noreferrer",text:b[0]}):null)),d=E("div",{class:"tb-dialog-row"}),l=document.querySelector(".tb-header"),u=window.tbAnnotations,i=(l?.dataset.routes??"comment").split(" ").filter(p=>p!=="comment"||u).map(p=>p==="comment"&&u?.groupsOnly?"groupComment":p).filter(p=>p in Jt),n=i.includes("edit")||i.includes("note")?"book":"edition",s=_e("How contributing works",t,E("h2",{text:"How contributing works"}),E("p",{text:`There ${i.length===1?"is one way":`are ${yn[i.length]??i.length} ways`} to help with this ${n}. They differ in who sees what you write, and in which account you need.`}),...i.map(p=>r(Jt[p])),E("p",{},E("a",{href:e,text:"More about commenting and contributing"})),d),c=E("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>s.d.close()),o){let p=E("button",{type:"button",class:"tb-btn tb-btn-primary",text:o.label});p.addEventListener("click",()=>s.closeThen(o.run)),d.append(c,p),p.focus()}else d.append(c),c.focus()},Qt=(t,e,o,r)=>xn()?r():ze(t,e,{label:o,run:r}),wn=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},En=(t,e)=>{let o={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:wn(),accessed:new Date},r=u=>{let i=E("p",{class:"tb-cite-text"});for(let n of u)i.append(n.italic?E("i",{text:n.text}):n.text);return i},d=(u,i)=>{let n=E("span",{class:"tb-cite-said",role:"status"}),s=E("button",{type:"button",class:"tb-btn",text:"Copy"});return s.addEventListener("click",()=>vn(He(i),()=>n.textContent="Copied",()=>n.textContent="Couldn\'t copy: select the text instead")),E("section",{},E("h3",{text:u}),r(i),E("div",{class:"tb-dialog-row"},n,s))},l=Se(o.licence);_e("Cite this page",e,E("h2",{text:"Cite this page"}),d("APA 7",Ae(o)),d(l?`Attribution (${l})`:"Attribution",Me(o)))},kn=(t,e,o)=>{let r=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];o&&r.push(["annotations",o.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let d=E("p",{class:"tb-panel-note",role:"status"});for(let[l,u,i]of r){let n=E("div",{class:"tb-seg"});for(let[c,p]of i){let g=E("input",{type:"radio",name:`tb-pref-${l}`,value:c});g.checked=e.get(l)===c,g.addEventListener("change",()=>{if(l==="annotations"&&o){if(d.textContent="",c==="on")o.enable();else if(o.disable().reload){let h=E("button",{type:"button",class:"tb-btn",text:"Reload"});h.addEventListener("click",()=>location.reload()),d.append("Highlights hidden. The annotation tab goes away when the page reloads.",h)}return}e.set(l,c),l==="numbers"&&dt("paragraph_numbers_toggled",{to:c})}),n.append(E("label",{},g,p))}let s=E("fieldset",{},E("legend",{text:u}),n);l==="annotations"&&s.append(d),l==="width"&&Tn(t,s),t.append(s)}},Tn=(t,e)=>{let o=d=>E("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${d}) * var(--tb-size-body) * var(--tb-text-scale))`}),r=()=>{let d=document.querySelector("article");if(!d?.parentElement||t.hidden)return;let l=o("--tb-measure-standard-em"),u=o("--tb-measure-wide-em");d.parentElement.append(l,u);let i=l.getBoundingClientRect().width,n=u.getBoundingClientRect().width;l.remove(),u.remove(),e.hidden=!(n-i>=16)};new MutationObserver(r).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",r)},Zt=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Ln=t=>{let e=!1,o=()=>{e=!1;let d=t.getBoundingClientRect(),l=document.documentElement.style;l.setProperty("--tb-hdr-h",`${Math.round(d.height)}px`),l.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(d.bottom))}px`)},r=()=>{e||(e=!0,requestAnimationFrame(o))};o(),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),typeof ResizeObserver=="function"&&new ResizeObserver(r).observe(t)},ee=null;window.addEventListener("popstate",()=>ee?.(location.hash,!1));var $n=(t,e,o,r,d)=>{let l={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:d,track:dt};t.addEventListener("click",n=>{if(n.button!==0||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey){dt("edit_on_github_clicked");return}n.preventDefault(),Ot({...l,mode:"page",trigger:o})});let u=new Map,i=Array.from(document.querySelectorAll("[data-pnum]")).filter(n=>!n.closest(".popover")&&!n.querySelector(":scope > button.tb-pedit"));i.length&&hn();for(let n of i){let s=gn();s.addEventListener("click",c=>{c.stopPropagation(),Qt(s,r,`Continue: edit \\xB6${n.dataset.pnum}`,()=>Ot({...l,mode:"paragraph",para:n,trigger:s}))}),n.append(s),u.set(n.dataset.pnum??"",{p:n,b:s})}ee=(n,s)=>{let c=Tt.exec(n);if(!c)return;let p=c[1]?u.get(c[1]):void 0;Ot(p?{...l,mode:"paragraph",para:p.p,trigger:p.b,push:s}:{...l,mode:"page",trigger:o,push:s})}},Cn=(t,e,o)=>{t.addEventListener("click",r=>{r.button!==0||r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||(r.preventDefault(),Le({endpoint:e,listUrl:t.dataset.history??"",path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:o,track:dt}))})},Fn=t=>{let e=t.querySelector("[data-tb-reader]"),o=t.querySelector("[data-tb-reader-item]"),r=()=>t.scrollWidth>t.clientWidth+1,d=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,l=d?.querySelector(".home-link")?d:null,u=t.querySelector(".tb-hdr-label"),i=()=>!!u&&getComputedStyle(u).position!=="absolute",n=t.querySelector(".tb-hdr-where"),s=h=>!!h&&h.scrollWidth>h.clientWidth+1,c=h=>!r()&&i()===h&&!s(n)&&!Array.from(n?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(s),p=h=>{l?.classList.toggle("tb-logo-full",h),l?.classList.toggle("tb-logo-icon",!h)},g=()=>{let h=!!e&&!!o&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),h&&(e.hidden=!1,o.hidden=!0),r()&&t.classList.add("tb-hdr-icons"),r()&&(t.classList.add("tb-hdr-tight"),h&&(e.hidden=!0,o.hidden=!1));let x=i();l&&c(x)&&(p(!0),c(x)||p(!1)),te()};if(g(),window.addEventListener("resize",g),document.fonts?.ready.then(g),typeof ResizeObserver=="function"){let h=new ResizeObserver(()=>requestAnimationFrame(g));h.observe(t);let x=t.querySelector(".tb-hdr-actions");x&&h.observe(x)}return g},An=t=>{let e=n=>t.querySelector(n),o=t.dataset.howTo??"/how-to-comment",r=window,d=e("[data-tb-contribute]"),l=e("[data-tb-more]"),u=n=>{try{n()}catch{}};u(()=>{let n=e("[data-tb-search]"),s=document.querySelector(".search .search-button");!n||!s||(n.addEventListener("click",()=>s.click()),n.hidden=!1)}),u(()=>{let n=e("[data-tb-menu]"),s=document.querySelector(".explorer"),c=s?.querySelector(".mobile-explorer");if(!n||!s||!c)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(n);let g=s.querySelector(".explorer-content");g?.id&&n.setAttribute("aria-controls",g.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let h=n.querySelector(".tb-hdr-label"),x=()=>!s.classList.contains("collapsed"),b=()=>{let v=x();n.setAttribute("aria-expanded",String(v)),n.classList.toggle("tb-closes",v),h&&(h.textContent=v?"Close menu":"Menu")};new MutationObserver(b).observe(s,{attributes:!0,attributeFilter:["class"]}),n.addEventListener("click",()=>{x()||r.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",v=>{v.key!=="Escape"||!x()||!Zt()||(c.click(),n.focus())}),b(),n.hidden=!1}),u(()=>{let n=e("[data-tb-reader]"),s=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!n||!s||!c)return;let p=()=>n.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),n.addEventListener("click",()=>c.click()),s.addEventListener("click",()=>c.click()),p(),t.dataset.tbHasReader="1",n.hidden=!1});let i=()=>{dt("annotation_badge_clicked"),r.tbAnnotations.open().then(n=>{n||Oe("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};u(()=>{if(!r.tbAnnotations)return;let n=e("[data-tb-annotate]");if(n){let c=n.querySelector(".tb-hdr-label"),p=()=>Zt()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),g=()=>{let x=p();n.classList.toggle("tb-closes",x),c&&(c.textContent=x?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",g),window.addEventListener("resize",g);let h=null;n.addEventListener("pointerdown",()=>h=p(),!0),n.addEventListener("click",()=>{let x=h??p();if(h=null,x)return r.tbAnnotations.close?.();let b=document.querySelector(".explorer");b&&!b.classList.contains("collapsed")&&Zt()&&b.querySelector(".mobile-explorer")?.click(),Qt(n,o,"Continue: open annotations",i)}),n.querySelector(".tb-anno-count")||n.append(E("span",{class:"tb-anno-count"})),n.hidden=!1}let s=e("[data-tb-comment]");if(s){if(s.addEventListener("click",i),r.tbAnnotations.groupsOnly){let c=s.querySelector(".tb-mi-t"),p=s.querySelector(".tb-mi-s");c&&(c.textContent=Jt.groupComment.title),p&&(p.textContent="Hypothes.is account \\xB7 only your group sees it")}s.hidden=!1}}),u(()=>{let n=e("#tb-contribute-menu");if(!d||!n)return;Vt(d,n,!0,x=>Qt(d,o,"Continue to Contribute",x)),e("[data-tb-explain]")?.addEventListener("click",()=>ze(d,o));let s=e("button.tb-suggest-btn"),c=s?.dataset.endpoint,p=s&&c&&Xt?()=>Xt(c,s.dataset.path??"",d):void 0,g=e("a.edit-on-github"),h=g?.dataset.editEndpoint;if(g&&h){if($n(g,h,d,o,p),Tt.test(location.hash)){let x=location.hash,b=window.history.state?.tbEditor===!0;b||window.history.replaceState(window.history.state,"",location.pathname+location.search),ee?.(x,!b)}}else g?.addEventListener("click",()=>dt("edit_on_github_clicked"));s&&p&&(s.addEventListener("click",p),s.hidden=!1),d.hidden=!1}),u(()=>{let n=e("[data-tb-appearance]"),s=e("#tb-appearance");!n||!s||!r.tbPrefs||(kn(s,r.tbPrefs,r.tbAnnotations),Vt(n,s,!1),n.hidden=!1)}),u(()=>{let n=e("#tb-more-menu");if(!l||!n)return;Vt(l,n,!0),e("[data-tb-cite]")?.addEventListener("click",()=>En(t,l)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let s=e("a.tb-history-link");s?.dataset.revisionEndpoint&&Cn(s,s.dataset.revisionEndpoint,l);let c=e("[data-tb-backlinks]"),p=document.querySelector(".backlinks");c&&(!p||!p.querySelector("a.internal")?(c.setAttribute("aria-disabled","true"),c.append(E("span",{class:"tb-mi-s",text:"No other page links here"}))):c.addEventListener("click",()=>{let h=p.querySelector("h3")??p;h.tabIndex=-1,p.scrollIntoView({block:"start"}),h.focus({preventScroll:!0})}));let g=e("[data-tb-download]");g?.addEventListener("click",()=>{fetch(g.dataset.tbDownload).then(h=>h.ok?h.blob():Promise.reject(new Error(String(h.status)))).then(h=>{let x=URL.createObjectURL(h),b=E("a",{href:x,download:g.dataset.file??"page.md"});document.body.append(b),b.click(),b.remove(),setTimeout(()=>URL.revokeObjectURL(x),1e3)}).catch(()=>Oe("That didn\'t download just now. View source has the same file."))}),l.hidden=!1}),u(()=>{Fn(t)}),u(()=>{let n=t.parentElement;Ln(n?.classList.contains("tb-header-slot")?n:t)})},Mn=()=>{try{Xt?.closeIfOpen(),xe(),Te();for(let t of Array.from(document.querySelectorAll(".tb-page-controls")))t.dataset.tbWired||(t.dataset.tbWired="1",An(t))}catch{}};document.addEventListener("nav",Mn);\n';

// src/components/EditOnGitHub.tsx
var TYPE_LABELS = { book: "Book", paper: "Paper", report: "Report", article: "Article" };
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
          "data-path": path
        } : { class: "tb-history-link", href: historyHref, ...away },
        opts.editor && opts.revisionEndpoint && slug ? "Page history" : "Page history \u2197"
      ) : null,
      item("button", { "data-tb-backlinks": "" }, "What links here"),
      opts.statsUrl && opts.statsHost ? item("a", { class: "tb-stats-page", href: statsHref(opts.statsUrl, opts.statsHost, pagePath(slug)), ...away }, "Page statistics \u2197") : null,
      opts.statsUrl && opts.statsHost && slug === "index" ? item("a", { class: "tb-stats-book", href: statsHref(opts.statsUrl, opts.statsHost), ...away }, "Book statistics \u2197") : null,
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
        TYPE_LABELS[opts.type] ? _("span", { class: "tb-type-badge" }, TYPE_LABELS[opts.type]) : null,
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
/* What kind of text this is (registry type): a quiet pill after the title; the
   title keeps the room, the badge never wraps. */
.tb-type-badge {
  flex: 0 0 auto;
  padding: 0.05rem 0.45rem;
  border: 1px solid var(--lightgray);
  border-radius: 999px;
  font-size: 0.72rem;
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