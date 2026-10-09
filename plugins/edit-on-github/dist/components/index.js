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
var controls_inline_default = 'var we=/^\\s{0,3}(```|~~~)/,un=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,pn=t=>{let e=t.split(`\n`),o=[],r=0;if(e[0]?.trim()==="---"){let l=e.findIndex((u,a)=>a>0&&(u.trim()==="---"||u.trim()==="..."));l>0&&(r=l+1)}let i=0;for(;r<e.length;){let l=e[r];if(!l.trim()){r++;continue}let u=we.exec(l);if(u||l.trim()==="$$"){let c=u?u[1]:"$$",p=r+1;for(;p<e.length&&!e[p].trim().startsWith(c);)p++;r=p+1;continue}let a=r;for(;a<e.length&&e[a].trim()&&!we.test(e[a]);)a++;let n=e.slice(r,a).join(`\n`),s=!un.test(l);o.push({start:r,text:n,ordinal:s?++i:0}),r=a}return o},bn=t=>Ee(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,o)=>o.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),Ee=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],gn=(t,e)=>{if(!t.length||!e.length)return 0;let o=new Map;for(let i of t)o.set(i,(o.get(i)??0)+1);let r=0;for(let i of e){let l=o.get(i)??0;l>0&&(r++,o.set(i,l-1))}return r/Math.max(t.length,e.length)};var ke=(t,e,o)=>{let r=Ee(e);if(!r.length)return null;let i=null,l=0,u=1/0;for(let a of pn(t)){let n=gn(bn(a.text),r);if(n<.75)continue;let s=a.ordinal?Math.abs(a.ordinal-o):1e6;(n>l+.02||Math.abs(n-l)<=.02&&s<u)&&(i=a,l=Math.max(n,l),u=s)}return i};var $t=(t,e)=>{let o=0;for(;o<t.length&&o<e.length&&t[o]===e[o];)o++;let r=t.length,i=e.length;for(;r>o&&i>o&&t[r-1]===e[i-1];)r--,i--;let l=t.slice(0,o).map(c=>({t:"=",v:c})),u=t.slice(r).map(c=>({t:"=",v:c})),a=t.slice(o,r),n=e.slice(o,i),s;if((a.length+1)*(n.length+1)>4e5)s=[...a.map(c=>({t:"-",v:c})),...n.map(c=>({t:"+",v:c}))];else{let c=n.length+1,p=new Uint32Array((a.length+1)*c);for(let x=a.length-1;x>=0;x--)for(let b=n.length-1;b>=0;b--)p[x*c+b]=a[x]===n[b]?p[(x+1)*c+b+1]+1:Math.max(p[(x+1)*c+b],p[x*c+b+1]);s=[];let g=0,h=0;for(;g<a.length&&h<n.length;)a[g]===n[h]?(s.push({t:"=",v:a[g]}),g++,h++):p[(g+1)*c+h]>=p[g*c+h+1]?s.push({t:"-",v:a[g++]}):s.push({t:"+",v:n[h++]});for(;g<a.length;)s.push({t:"-",v:a[g++]});for(;h<n.length;)s.push({t:"+",v:n[h++]})}return[...l,...s,...u]},Lt=t=>t.split(/(\\s+)/).filter(e=>e!==""),Rt=(t,e,o=2)=>{let r=$t(t.split(`\n`),e.split(`\n`)),i=[],l=1,u=1,a=null,n=0;return r.forEach((s,c)=>{r.slice(Math.max(0,c-o),c+o+1).some(g=>g.t!=="=")?((!a||s.t==="="&&n>2*o)&&(a={a:l,b:u,ops:[]},i.push(a)),a.ops.push(s),n=s.t==="="?n+1:0):(a=null,n=0),s.t!=="+"&&l++,s.t!=="-"&&u++}),i};var vt="tb-editor",$e="tb-editor-style",Qt="tb-gh-identity",Zt=10,Xt=500,hn=7.5*60*60*1e3,Le=2e4,mn=200,Tt=/^#edit(?:-(\\d+))?$/,fn=t=>t?`#edit-${t}`:"#edit",Te={tbEditor:!0},yn="This page has changes waiting for review; you\\u2019re editing the latest draft.",d=(t,e={},...o)=>{let r=document.createElement(t);for(let[i,l]of Object.entries(e))l!==!1&&(i==="text"?r.textContent=String(l):i==="class"?r.className=String(l):r.setAttribute(i,l===!0?"":String(l)));for(let i of o)i&&r.append(i);return r},Ce="http://www.w3.org/2000/svg",It=t=>{let e=document.createElementNS(Ce,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let o=document.createElementNS(Ce,"path");return o.setAttribute("d",t),o.setAttribute("fill","currentColor"),e.append(o),e},Ae="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",Se="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",vn="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",xn="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Ot=t=>{let e=t?.userMessage,o=typeof e=="string"?e.trim():"";return o?o.slice(0,mn):null},wn=()=>{try{let t=sessionStorage.getItem(Qt);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>hn?null:e}catch{return null}},Jt=t=>{try{t?sessionStorage.setItem(Qt,JSON.stringify(t)):sessionStorage.removeItem(Qt)}catch{}},te=()=>{if(document.getElementById($e))return;let t=`#${vt}`,e=d("style",{id:$e});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-faint, #9B9BA1); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-faint, #9B9BA1); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: #FFFFFF; }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-faint, #9B9BA1); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n${t} .tb-ed-del { background: #FFEBE9; }\n${t} .tb-ed-add { background: #E6FFEC; }\n${t} .tb-ed-del del { background: #FFC1C0; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: #ABF2BC; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},En=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,o)=>o.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),kn="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",ee=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(kn).forEach(r=>r.remove()),e.querySelectorAll("*").forEach(r=>{for(let i of Array.from(r.attributes)){let l=i.value.trim().toLowerCase();(i.name.startsWith("on")||(i.name==="href"||i.name==="src")&&/^(javascript|data|vbscript):/.test(l))&&r.removeAttribute(i.name)}r.tagName==="A"&&(r.setAttribute("target","_blank"),r.setAttribute("rel","noopener noreferrer"))});let o=document.createDocumentFragment();return o.append(...Array.from(e.body.childNodes)),o},$n=(t,e)=>{let o=d("div",{class:"tb-ed-diff"}),r=Rt(t,e);if(!r.length)return o.append(d("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),o;let i=(l,u)=>{let a=d("div",{class:`tb-ed-line${l==="-"?" tb-ed-del":l==="+"?" tb-ed-add":""}`}),n=d("span");return typeof u=="string"?n.textContent=u||" ":n.append(...u),a.append(d("span",{text:l==="="?" ":l}),n),a};for(let l of r){let u=d("div",{class:"tb-ed-hunk"},d("div",{class:"tb-ed-hh",text:`Line ${l.b}`}));for(let a=0;a<l.ops.length;){let n=l.ops[a];if(n.t==="="){u.append(i("=",n.v)),a++;continue}let s=[],c=[];for(;l.ops[a]?.t==="-";)s.push(l.ops[a++].v);for(;l.ops[a]?.t==="+";)c.push(l.ops[a++].v);let p=Math.min(s.length,c.length),g=s.map((h,x)=>x<p?$t(Lt(h),Lt(c[x])):null);s.forEach((h,x)=>{let b=g[x];u.append(i("-",b?b.filter(v=>v.t!=="+").map(v=>v.t==="-"?d("del",{text:v.v}):document.createTextNode(v.v)):h))}),c.forEach((h,x)=>{let b=g[x];u.append(i("+",b?b.filter(v=>v.t!=="-").map(v=>v.t==="+"?d("ins",{text:v.v}):document.createTextNode(v.v)):h))})}o.append(u)}return o},Nt=null,Fe=()=>Nt?.(),Dt=t=>{if(Nt)return;te();let e=document.body.style.overflow,o=new URL(t.endpoint,location.href).origin,r=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),i=t.path.split("/"),l=i.pop(),u=t.para&&Number(t.para.getAttribute("data-pnum"))||0,a=t.mode,n="",s="",c="drafts",p=null,g="",h=wn(),x=!1,b=!1,v=null,C=null,F=!1,V=window.scrollY,G=fn(a==="paragraph"?u:0),k=d("div",{id:vt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),H=d("span",{class:"tb-ed-pill"},It(Se),d("span",{text:c})),f=d("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},It(vn));f.append(d("span",{text:t.repo.split("/").pop()||t.repo}));for(let m of i)f.append(d("span",{class:"tb-ed-sep",text:"/"}),d("span",{text:m}));f.append(d("span",{class:"tb-ed-sep",text:"/"}),d("span",{class:"tb-ed-file",text:l}));let L=d("span",{class:"tb-ed-muted",text:u?` \\xB7 \\xB6${u}`:""});f.append(L,H);let S=d("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),R=d("div",{class:"tb-ed-head"},f,S),M=d("div",{class:"tb-ed-discard",role:"alert",hidden:!0},d("span",{text:"Discard your changes?"})),K=d("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),_=d("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});M.append(K,_);let Z=d("div",{class:"tb-ed-main"}),I=d("div",{class:"tb-ed-inner"}),A=d("p",{class:"tb-ed-note",hidden:!0}),P=d("p",{class:"tb-ed-note",hidden:!0,text:yn}),q=d("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),et=d("div",{class:"tb-ed-gate",hidden:!0});I.append(P,A,q,et),Z.append(I),k.append(R,M,Z);let yt=["Edit","Preview","Changes"],O=d("div",{role:"tablist","aria-label":"Editor view"}),D=yt.map((m,w)=>d("button",{type:"button",role:"tab",id:`tb-ed-tab-${w}`,"aria-controls":`tb-ed-panel-${w}`,"aria-selected":w===0?"true":"false",tabindex:w===0?0:-1,text:m==="Edit"?"Edit":m==="Preview"?"Preview":"Changes"}));O.append(...D);let lt=d("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),dt=d("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),pt=d("div",{class:"tb-ed-bar"},O,d("div",{class:"tb-ed-actions"},lt,dt)),rt=d("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),Y=d("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),U=d("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),B=[d("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},Y,rt,U),d("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),d("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],bt=d("div",{class:"tb-ed-box"},pt,...B),Q=d("p",{class:"tb-ed-foot"}),ct=()=>rt.value,nt=()=>g,At=m=>{D.forEach((w,$)=>{w.setAttribute("aria-selected",$===m?"true":"false"),w.tabIndex=$===m?0:-1,B[$].hidden=$!==m}),m===1&&Yt(),m===2&&(B[2].textContent="",B[2].append($n(nt(),ct())))};D.forEach((m,w)=>{m.addEventListener("click",()=>At(w)),m.addEventListener("keydown",$=>{let T=$.key==="ArrowRight"?1:$.key==="ArrowLeft"?-1:0;if(!T)return;$.preventDefault();let J=(w+T+D.length)%D.length;At(J),D[J].focus()})});let mt=0,Yt=()=>{let m=B[1];m.textContent="",m.className="tb-ed-panel tb-ed-preview";let w=d("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});m.append(w);let $=++mt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:En(ct()),mode:"markdown"})}).then(T=>T.ok?T.text():Promise.reject(new Error(String(T.status)))).then(T=>{$===mt&&(m.textContent="",m.append(ee(T)))}).catch(()=>{$===mt&&(w.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};rt.addEventListener("input",()=>{b=ct()!==g,dt.disabled=!b});let st=d("div",{class:"tb-ed-scrim",hidden:!0}),wt=d("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});st.append(wt),k.append(st);let Et=(m,w,$,T=!1)=>{$.id=m;let J=d("p",{class:"tb-ed-err",id:`${m}-err`}),gt=d("label",{for:m,text:w},T?d("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:d("div",{class:"tb-ed-field"},gt,$,J),control:$,err:J}},E=Et("tb-ed-msg","What did you change, and why?",d("textarea",{rows:2,maxlength:Xt,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));E.wrap.append(d("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let z=Et("tb-ed-desc","Extended description",d("textarea",{rows:3,maxlength:5e3}),!0),N=d("div",{class:"tb-ed-who"}),ut=d("div",{class:"tb-ed-what"},It(Se)),W=d("span");ut.append(W);let tt=d("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),X=d("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),it=d("form",{novalidate:!0},d("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),E.wrap,z.wrap,N,ut,d("div",{class:"tb-ed-row"},tt,X)),ot=d("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});wt.append(it,ot);let Ft=()=>{if(N.textContent="",h){let m=d("img",{src:`https://avatars.githubusercontent.com/u/${h.id}?s=56`,alt:""}),w=d("button",{type:"button",class:"tb-ed-link",text:"Sign out"});w.addEventListener("click",()=>{h=null,Jt(null),Ft()}),N.append(m,d("span",{},"Signed in as ",d("strong",{text:`@${h.login}`})," \\u2014 this edit will be credited to your GitHub account."),w)}else N.append(ge(),d("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},ge=()=>{let m=d("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},It(xn),"Sign in with GitHub");return m.addEventListener("click",()=>sn(m)),m},rn=()=>{et.textContent="";let m=ge(),w=d("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let $=d("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});$.addEventListener("click",()=>{Ht(),t.suggest()}),w.append($," instead: it needs no account.")}else w.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");et.append(d("h2",{text:"Sign in to edit"}),d("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),d("p",{},m),w),q.hidden=!0,et.hidden=!1,m.focus()},he=m=>{if(m.origin!==o)return;let w=m.data;if(!(!w||w.type!=="tb-github-identity")){if(v=null,w.error||typeof w.token!="string"||typeof w.login!="string"){t.track("github_signin",{outcome:w.error==="denied"?"cancelled":"error"});return}if(h={token:w.token,login:w.login,id:Number(w.id)||0,name:w.name??"",at:Date.now()},Jt(h),t.track("github_signin",{outcome:"success"}),!F)return xe();Ft(),st.hidden||E.control.focus()}},sn=m=>{let w=`${r}?origin=${encodeURIComponent(location.origin)}`;v=window.open(w,"tb-github-signin","popup,width=560,height=720"),!v&&!m.parentElement?.querySelector(".tb-ed-err")&&m.after(d("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",he);let an=(m,w)=>{m.control.setAttribute("aria-invalid","true"),m.control.setAttribute("aria-describedby",m.err.id),m.err.textContent=w},me=m=>{m.control.removeAttribute("aria-invalid"),m.control.removeAttribute("aria-describedby"),m.err.textContent=""};E.control.addEventListener("input",()=>me(E));let ln=()=>{W.textContent="",W.append("This creates a new branch and opens a proposal to merge it into ",d("code",{text:c}),". Nothing changes in the book until an editor accepts it."),Ft(),it.hidden=!1,ot.hidden=!0,st.hidden=!1,E.control.focus()},Wt=()=>{st.hidden=!0,dt.focus()};dt.addEventListener("click",ln),tt.addEventListener("click",Wt),st.addEventListener("mousedown",m=>{m.target===st&&!x&&Wt()});let Vt=(m,w,$,T)=>{if(!k.isConnected)return;ot.textContent="",ot.append(d("h2",{text:m}),d("p",{text:w})),$&&ot.append(d("p",{},d("a",{href:$.href,target:"_blank",rel:"noopener",text:$.text})));let J=d("button",{type:"button",class:`tb-ed-btn${T?" tb-ed-primary":""}`,text:T?"Back to my edit":"Close"});J.addEventListener("click",T?()=>{ot.hidden=!0,it.hidden=!1,X.focus()}:()=>Mt(!0)),ot.append(d("div",{class:"tb-ed-row"},J)),it.hidden=!0,ot.hidden=!1,ot.focus()};it.addEventListener("submit",m=>{if(m.preventDefault(),x)return;let w=null;me(E);let $=E.control.value.trim().length;if($<Zt||$>Xt?(an(E,$<Zt?`Please say what you changed and why, in at least ${Zt} characters.`:`Please keep it under ${Xt} characters.`),w=E.control):h||(w=N.querySelector("button")),w){w.focus();return}let T={mode:a,path:t.path,baseSha:s,title:a==="paragraph"&&u?`Edit \\xB6${u} of ${l}`:`Update ${l}`,summary:E.control.value.trim().replace(/\\s+/g," "),description:z.control.value.trim()};a==="page"?T.content=ct():(T.startLine=p.start,T.original=p.text,T.replacement=ct(),u&&(T.paragraph=u)),T.identity=h.token,x=!0,X.disabled=!0,X.textContent="Proposing\\u2026";let J=C=new AbortController,gt=setTimeout(()=>J.abort(),Le);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(T),signal:J.signal}).then(async j=>{let Bt=null;try{Bt=await j.json()}catch{Bt=null}if(j.status===401&&h&&(h=null,Jt(null),Ft()),!j.ok)throw Object.assign(new Error(String(j.status)),{userMessage:Ot(Bt)});return Bt}).then(j=>{b=!1,j.fallback&&typeof j.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:a}),Vt("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:j.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:a}),Vt("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof j.prUrl=="string"?{href:j.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(j=>{t.track("page_edit_submitted",{outcome:"error",mode:a}),Vt("That did not go through",j&&j.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(gt),C===J&&(C=null),x=!1,X.disabled=!1,X.textContent="Propose changes"})});let dn=m=>Array.from(m.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(w=>!w.disabled&&w.tabIndex>=0&&!w.closest("[hidden]")),fe=m=>{if(m.key==="Escape"){m.preventDefault(),st.hidden?kt():x||(!ot.hidden&&it.hidden&&!b?Mt(!0):Wt());return}if(m.key!=="Tab")return;let w=st.hidden?k:wt,$=dn(w);if(!$.length){m.preventDefault(),w.focus();return}let T=$.indexOf(document.activeElement);(m.shiftKey?T<=0:T===-1||T===$.length-1)&&(m.preventDefault(),$[m.shiftKey?$.length-1:0].focus())},ye=m=>{b&&(m.preventDefault(),m.returnValue="")},Mt=(m=!1)=>{if(!m&&b)return kt();b=!1,Tt.test(location.hash)?history.back():Ht()},ve=()=>{if(!Tt.test(location.hash)){if(b)return history.pushState(Te,"",G),kt();Ht()}},Ht=()=>{Nt=null,C?.abort(),v?.close(),document.removeEventListener("keydown",fe,!0),window.removeEventListener("message",he),window.removeEventListener("beforeunload",ye),window.removeEventListener("popstate",ve),k.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,V)},kt=()=>{if(!b)return Mt(!0);M.hidden=!1,_.focus()};K.addEventListener("click",()=>Mt(!0)),_.addEventListener("click",()=>{M.hidden=!0,rt.focus()}),S.addEventListener("click",kt),lt.addEventListener("click",kt),document.addEventListener("keydown",fe,!0),window.addEventListener("beforeunload",ye),window.addEventListener("popstate",ve),Nt=Ht,t.push!==!1&&history.pushState(Te,"",G),document.body.style.overflow="hidden",document.body.append(k),S.focus(),t.track("page_editor_opened",{mode:a});let cn=m=>{q.textContent="",q.removeAttribute("class"),q.append(m+" ",d("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},xe=()=>{if(!h)return rn();F=!0,et.hidden=!0,q.hidden=!1;let m=new AbortController,w=setTimeout(()=>m.abort(),Le);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:m.signal}).then(async $=>{let T=null;try{T=await $.json()}catch{T=null}if(!$.ok)throw Object.assign(new Error(String($.status)),{userMessage:Ot(T)});return T}).then($=>{if(k.isConnected){if(typeof $?.content!="string"||typeof $.sha!="string")throw new Error("bad source");if(n=$.content,s=$.sha,c=typeof $.branch=="string"?$.branch:c,H.lastChild.textContent=c,P.hidden=!t.builtBlob||t.builtBlob===s,a==="paragraph"&&(p=t.para?ke(n,t.para.textContent??"",u):null,p||(a="page",L.textContent="",A.textContent=`We couldn\\u2019t find \\xB6${u} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,A.hidden=!1)),a==="paragraph"&&p){bt.classList.add("tb-ed-para");let T=n.split(`\n`),J=p.text.split(`\n`).length,gt=T.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),j=T.slice(p.start+J,p.start+J+3).join(`\n`).trim();Y.textContent=gt.length>220?`\\u2026${gt.slice(-220)}`:gt,U.textContent=j.length>220?`${j.slice(0,220)}\\u2026`:j,Y.hidden=!gt,U.hidden=!j,g=p.text,Q.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else g=n,Q.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";rt.value=g,q.remove(),I.append(bt,Q),rt.setSelectionRange(0,0),rt.focus()}}).catch($=>{k.isConnected&&cn($&&$.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(w))};xe()};var ft=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},_t=(t,e)=>Lt(t).map(o=>({v:o,s:{...e}})),xt=(t,e={})=>{let o=[],r={...e},i="",l=()=>{i&&o.push(..._t(i,r)),i=""},u=a=>!!a&&/[\\p{L}\\p{N}]/u.test(a);for(let a=0;a<t.length;){let n=t.slice(a),s;if(n[0]==="\\\\"&&n.length>1)i+=n[1],a+=2;else if(s=/^`([^`]+)`/.exec(n))l(),o.push(..._t(s[1],{...r,code:!0})),a+=s[0].length;else if(s=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(n)){l();let c=s[2]??s[1].split("/").pop()??s[1];o.push(..._t(c,{...r,link:!0})),a+=s[0].length}else if(s=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(n))l(),o.push(..._t(`(image${s[1]?`: ${s[1]}`:""})`,{...r,i:!0})),a+=s[0].length;else if(s=/^\\[\\^([^\\]]+)\\]/.exec(n))l(),o.push({v:s[1],s:{...r,sup:!0}}),a+=s[0].length;else if(s=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(n))l(),o.push(...xt(s[1],{...r,link:!0})),a+=s[0].length;else if(s=/^<\\/?[a-zA-Z][^>]*>/.exec(n))l(),a+=s[0].length;else if(n.startsWith("**")||n.startsWith("__")){let c=n.slice(0,2);r.b||t.indexOf(c,a+2)>a+2?(l(),r.b=!r.b):i+=c,a+=2}else(n[0]==="*"||n[0]==="_")&&!(n[0]==="_"&&u(t[a-1])&&u(t[a+1]))?(r.i||t.indexOf(n[0],a+1)>a+1?(l(),r.i=!r.i):i+=n[0],a+=1):(i+=n[0],a+=1)}return l(),o},ne=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:xt(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:xt(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:xt(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:xt(e[2])}:{kind:"p",runs:xt(t)}:{kind:"blank",runs:[]}},Me=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=d("code",{},e)),t.s.i&&(e=d("em",{},e)),t.s.b&&(e=d("strong",{},e)),t.s.link&&(e=d("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=d("sup",{},e)),e},oe=(t,e,o)=>{let r=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,i=d("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),l=d("div",{class:"tb-rd-text"});e.marker&&l.append(d("span",{class:"tb-rd-marker",text:e.marker}));let u=null;for(let{run:a,changed:n}of o)n&&t!=="="?(u||(u=d(t==="-"?"del":"ins"),l.append(u)),u.append(Me(a))):(u=null,l.append(Me(a)));return d("div",{class:r},i,l)},re=(t,e)=>t.map(o=>({run:o,changed:e})),He=(t,e)=>{let o=d("div",{class:"tb-ed-diff tb-rd"}),r=ft(t),i=ft(e);return r===i?(o.append(d("p",{class:"tb-ed-panel tb-ed-muted",text:t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),o):(Rt(r,i).forEach((l,u)=>{u>0&&o.append(d("div",{class:"tb-rd-gap","aria-hidden":"true",text:"\\u22EF"}));let a=l.ops;for(let n=0;n<a.length;){let s=a[n];if(s.t==="="){let b=ne(s.v);o.append(oe("=",b,re(b.runs,!1))),n++;continue}let c=[],p=[];for(;a[n]?.t==="-";)c.push(ne(a[n++].v));for(;a[n]?.t==="+";)p.push(ne(a[n++].v));let g=Math.min(c.length,p.length),h=c.map(b=>re(b.runs,!0)),x=p.map(b=>re(b.runs,!0));for(let b=0;b<g;b++){let v=c[b].runs,C=p[b].runs,F=$t(v.map(f=>f.v),C.map(f=>f.v)),V=0,G=0,k=[],H=[];for(let f of F)f.t!=="+"&&k.push({run:v[V++],changed:f.t==="-"}),f.t!=="-"&&H.push({run:C[G++],changed:f.t==="+"});h[b]=k,x[b]=H}c.forEach((b,v)=>o.append(oe("-",b,h[v]))),p.forEach((b,v)=>o.append(oe("+",b,x[v])))}}),o)};var Be="tb-history-style",Ln=30,Re=2e4,Tn=()=>{if(document.getElementById(Be))return;let t=`#${vt}.tb-hi`,e=d("style",{id:Be});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n${t} .tb-rd-gap { padding: 0.3rem 0; text-align: center; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-ui, sans-serif); }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},Cn=(t,e)=>{let o=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),r=/^Edit \xB6(\\d+) of \\S+$/.exec(o);return r?`Paragraph ${r[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(o)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(o)||e&&/a new book from request/i.test(o)?"First published":o||(e?"First published":"Changed (no description given)")},Sn=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric"})},se=async(t,e)=>{let o=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),r=null;try{r=await o.json()}catch{}if(!o.ok){let i=new Error(`HTTP ${o.status}`);throw i.userMessage=Ot(r),i}return r},Pt=null,Ie=()=>Pt?.(),Ne=t=>{if(Pt||document.getElementById(vt))return;te(),Tn();let e=document.body.style.overflow,o=null,r=0,i=new Map,l=d("div",{id:vt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),u=d("div",{class:"tb-hi-where",id:"tb-hi-title"},d("span",{class:"tb-hi-name",text:"Page history"}),t.title?d("span",{class:"tb-hi-page",text:t.title}):null),a=d("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},d("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),d("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),n=d("div",{class:"tb-ed-main"}),s=d("div",{class:"tb-ed-inner"});n.append(s),l.append(d("div",{class:"tb-hi-top"},u,a),n);let c=f=>d("p",{class:"tb-ed-muted",role:"status",text:f}),p=(f,L)=>{let S=d("div",{class:"tb-ed-note",role:"alert"});return S.append(d("span",{text:`${f?.userMessage||L} `}),d("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),S},g=()=>{o?.abort();let f=new AbortController;o=f;let L=setTimeout(()=>f.abort(),Re);return{signal:f.signal,done:()=>clearTimeout(L),current:()=>o===f}},h=f=>f.reader&&i.get(f.sha)||f.who,x=f=>`Published ${Sn(f.date)}, by ${h(f)}`,b=f=>Cn(v[f].message||"",f===v.length-1),v=null,C=()=>{let f=[...new Set((v??[]).filter(M=>M.reader).map(M=>M.sha))].slice(0,Ln);if(!f.length)return;let L=new URL(t.endpoint,location.href);L.searchParams.set("shas",f.join(","));let S=new AbortController,R=setTimeout(()=>S.abort(),Re);se(L.toString(),S.signal).then(M=>{let K=M?.names??{};for(let[Z,I]of Object.entries(K))typeof I=="string"&&I.trim()&&i.set(Z,I.trim().slice(0,80));let _=s.querySelectorAll(".tb-hi-list .tb-hi-meta");v?.forEach((Z,I)=>{_[I]&&(_[I].textContent=x(Z))})}).catch(()=>{}).finally(()=>clearTimeout(R))},F=()=>{if(s.textContent="",!v)return;if(!v.length){s.append(c("This page has no published revisions yet."));return}let f=v.length;s.append(d("p",{class:"tb-hi-intro",text:`${f===1?"One published version":`${f} published versions`} of ${t.title?`\\u201C${t.title}\\u201D`:"this page"}, newest first. Open one to see what changed.`}));let L=d("ol",{class:"tb-hi-list"});v.forEach((S,R)=>{let M=d("button",{type:"button",class:"tb-hi-rev"},d("span",{class:"tb-hi-msg",text:b(R)}),d("span",{class:"tb-hi-meta",text:x(S)}));M.addEventListener("click",()=>{r=n.scrollTop,V(R)}),L.append(d("li",{},M))}),s.append(L),n.scrollTop=r},V=f=>{let L=v[f];s.textContent="";let S=d("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 All versions"});S.addEventListener("click",()=>{o?.abort(),F(),(s.querySelectorAll(".tb-hi-rev")[f]??a).focus()});let R=d("p",{class:"tb-ed-muted",text:x(L)}),M=d("div",{class:"tb-hi-head"},d("h2",{text:b(f)}),R),K=c("Loading this revision\\u2026");s.append(S,M,K),n.scrollTop=0,S.focus(),t.track("page_revision_opened");let _=g(),Z=new URL(t.endpoint,location.href);Z.searchParams.set("sha",L.sha),Z.searchParams.set("path",L.path),se(Z.toString(),_.signal).then(I=>{if(!_.current())return;let A=I;L.reader&&typeof A.proposer=="string"&&A.proposer.trim()&&(i.set(L.sha,A.proposer.trim().slice(0,80)),R.textContent=x(L));let P=typeof A.before=="string"?A.before:"",q=typeof A.after=="string"?A.after:"",et=["What changed","The page as it was"],yt=d("div",{role:"tablist","aria-label":"Revision view"}),O=et.map((Y,U)=>d("button",{type:"button",role:"tab",id:`tb-hi-tab-${U}`,"aria-controls":`tb-hi-panel-${U}`,"aria-selected":U===0?"true":"false",tabindex:U===0?0:-1,text:Y}));yt.append(...O);let D=d("div",{role:"tabpanel",id:"tb-hi-panel-0","aria-labelledby":"tb-hi-tab-0",tabindex:0});A.status==="added"&&D.append(d("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let lt=typeof A.previousPath=="string"&&A.previousPath!==L.path?A.previousPath:"";lt&&D.append(d("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${ft(P)===ft(q)?"; its text didn\\u2019t change.":"."}`})),(!lt||ft(P)!==ft(q))&&D.append(He(P,q));let dt=d("div",{role:"tabpanel",id:"tb-hi-panel-1","aria-labelledby":"tb-hi-tab-1",tabindex:0,hidden:!0,class:"tb-ed-panel tb-ed-preview"});typeof A.html=="string"&&A.html?dt.append(ee(A.html)):dt.append(d("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}));let pt=[D,dt],rt=Y=>O.forEach((U,B)=>{U.setAttribute("aria-selected",B===Y?"true":"false"),U.tabIndex=B===Y?0:-1,pt[B].hidden=B!==Y});O.forEach((Y,U)=>{Y.addEventListener("click",()=>rt(U)),Y.addEventListener("keydown",B=>{let bt=B.key==="ArrowRight"?1:B.key==="ArrowLeft"?-1:0;if(!bt)return;B.preventDefault();let Q=(U+bt+O.length)%O.length;rt(Q),O[Q].focus()})}),K.replaceWith(d("div",{class:"tb-ed-box"},d("div",{class:"tb-ed-bar"},yt),...pt))}).catch(I=>{_.current()&&K.replaceWith(p(I,"This version couldn\\u2019t be loaded just now. Please try again in a moment."))}).finally(_.done)},G=f=>{if(f.key==="Escape"){f.preventDefault(),k();return}if(f.key!=="Tab")return;let L=Array.from(l.querySelectorAll("a[href], button, [tabindex]")).filter(R=>!R.disabled&&R.tabIndex>=0&&!R.closest("[hidden]"));if(!L.length)return;let S=L.indexOf(document.activeElement);(f.shiftKey?S<=0:S===-1||S===L.length-1)&&(f.preventDefault(),L[f.shiftKey?L.length-1:0].focus())},k=()=>{Pt=null,o?.abort(),document.removeEventListener("keydown",G,!0),l.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};a.addEventListener("click",k),document.addEventListener("keydown",G,!0),Pt=k,document.body.style.overflow="hidden",document.body.append(l),a.focus(),t.track("page_history_opened"),s.append(c("Loading this page\\u2019s history\\u2026"));let H=g();se(t.listUrl,H.signal).then(f=>{H.current()&&(v=(Array.isArray(f)?f:[]).filter(L=>!!L&&typeof L.sha=="string"&&typeof L.path=="string"),F(),C())}).catch(f=>{H.current()&&(s.textContent="",s.append(p(f,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(H.done)};var De={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},_e=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),An=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(r=>`${r.charAt(0).toUpperCase()}.`).join(" ")}`},Fn=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,Oe=t=>/[.?!]$/.test(t)?t:`${t}.`,Pe=t=>{let e=Fn(_e(t.authors).map(An)),o=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),r=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",i=[],l=r?[{text:`${Oe(r)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)i.push({text:`${Oe(e)} (n.d.). `},...l);else if(l.length){let[u,...a]=l;i.push({...u,text:u.text.replace(/ $/,"")},{text:" (n.d.). "},...a)}else i.push({text:"(n.d.). "});return i.push({text:`Retrieved ${o}, from ${t.url}`}),i},ae=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",o=De[t.licence],r=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&r.push({text:` by ${_e(t.authors).join(", ")}`}),e&&t.bookTitle&&r.push({text:", from "},{text:t.bookTitle,italic:!0}),r.push({text:`, ${t.url}`}),o?r.push({text:`, is licensed under ${o.name} (${o.url})`}):t.licence&&r.push({text:`, is licensed under ${t.licence}`}),r.push({text:"."}),r},le=t=>t.map(e=>e.text).join(""),de=t=>De[t]?.name??t,qt=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],qe=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},Mn=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function Ue(t,e,o,r=0){let i=e!=="book"&&t.chapter&&t.styles.chapter,l=i?t.chapter:t.book,u=i?t.styles.chapter:t.styles.book,a=e==="paragraph"&&i?r:0,n=a?`${l.URL}#p${a}`:l.URL,s=Mn(o),c={};for(let[g]of qt)c[g]=(u[g]??[]).map(h=>({...h,text:h.text.replaceAll("{accessed}",s).replace(l.URL,a?`${n} (para. ${a})`:n)}));return{item:{...l,id:n,URL:n,accessed:{"date-parts":[[o.getFullYear(),o.getMonth()+1,o.getDate()]]},...a?{note:`para. ${a}`}:{}},styles:c}}var Ct=t=>t?.["date-parts"]?.[0]??[],ht=t=>String(t??"").padStart(2,"0"),ze=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),Hn=t=>{let e=i=>i.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),o=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),r=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(i=>i.length>3)??"");return`${o}${Ct(t.issued)[0]??""}${r}`.toLowerCase()||"citation"},Bn={chapter:"incollection",book:"book",report:"techreport"},ie=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function je(t){let[e,o,r]=Ct(t.issued),[i,l,u]=Ct(t.accessed),a=c=>c?ie(c):void 0,s=[["author",t.author?.map(c=>c.literal?`{${ie(c.literal)}}`:ie(ze(c))).join(" and ")],["title",a(t.title)],["booktitle",t.type==="chapter"?a(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",a(t.publisher)],["year",e?String(e):void 0],["date",e&&o&&r?`${e}-${ht(o)}-${ht(r)}`:void 0],["url",t.URL],["urldate",i?`${i}-${ht(l)}-${ht(u)}`:void 0],["doi",t.DOI],["language",a(t.language)],["note",a(t.note)],["keywords",a(t.keyword)],["abstract",a(t.abstract)]].filter(([,c])=>c).map(([c,p])=>`  ${c} = {${p}}`).join(`,\n`);return`@${Bn[t.type]??"misc"}{${Hn(t)},\n${s}\n}\n`}var Rn={chapter:"CHAP",book:"BOOK",report:"RPRT"};function Ge(t){let[e,o,r]=Ct(t.issued),[i,l,u]=Ct(t.accessed);return[["TY",Rn[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(n=>["AU",ze(n)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${ht(o)}/${ht(r)}`:void 0],["UR",t.URL],["Y2",i?`${i}/${ht(l)}/${ht(u)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(n=>["KW",n]),["N1",t.note]].filter(([,n])=>n).map(([n,s])=>`${n}  - ${s.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var Ke=t=>JSON.stringify([t],null,2)+`\n`;var at=(t,e)=>{try{let o=window.tbTrack;typeof o=="function"&&(e?o(t,e):o(t))}catch{}},In=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},Ut=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",o="tb-suggest-title",u=b=>{let v=b?.userMessage,C=typeof v=="string"?v.trim():"";return C?C.slice(0,200):null},a=()=>{if(document.getElementById(e))return;let b=document.createElement("style");b.id=e,b.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: #FFFFFF; cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(b)},n=(b,v,C,F=!1)=>{let V=document.createElement("div");V.className="tb-sg-field";let G=document.createElement("label");if(G.setAttribute("for",b),G.textContent=v,F){let H=document.createElement("span");H.className="tb-sg-opt",H.textContent=" (optional)",G.append(H)}let k=document.createElement("p");return k.className="tb-sg-err",k.id=b+"-err",C.id=b,!F&&!C.readOnly&&(C.required=!0),V.append(G,C,k),{wrap:V,control:C,err:k,hintId:null}},s=b=>{let v=[];b.err.textContent&&v.push(b.err.id),b.hintId&&v.push(b.hintId),v.length?b.control.setAttribute("aria-describedby",v.join(" ")):b.control.removeAttribute("aria-describedby")},c=(b,v)=>{b.control.setAttribute("aria-invalid","true"),b.err.textContent=v,s(b)},p=b=>{b.control.hasAttribute("aria-invalid")&&(b.control.removeAttribute("aria-invalid"),b.err.textContent="",s(b))},g=null,h=(b,v,C,F)=>{if(g)return;a();let V=C,G=document.body.style.overflow,k=null,H=!1,f=document.createElement("div");f.id=t;let L=document.createElement("div");L.className="tb-sg-dialog",L.tabIndex=-1,L.setAttribute("role","dialog"),L.setAttribute("aria-modal","true"),L.setAttribute("aria-labelledby",o);let S=document.createElement("div");S.className="tb-sg-head";let R=document.createElement("h2");R.id=o,R.textContent=F?`Note to the authors about \\xB6${F.paragraph}`:"Suggest an edit";let M=document.createElement("button");M.type="button",M.className="tb-sg-close",M.textContent="\\xD7",M.setAttribute("aria-label","Close suggestion form"),S.append(R,M);let K=document.createElement("form");K.noValidate=!0;let _=document.createElement("p");_.className="tb-sg-intro",_.textContent=F?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let Z=document.createElement("blockquote");Z.className="tb-sg-quote",Z.textContent=F?.quote??"",Z.hidden=!F?.quote;let I=In(),A=document.createElement("input");A.type="text",A.name="name",A.autocomplete="name";let P=n("tb-sg-name","Your name",A),q=document.createElement("p");if(q.className="tb-sg-count",q.id="tb-sg-credit",q.textContent="If the authors accept your suggestion, you\'ll be credited by this name.",P.wrap.append(q),P.hintId=q.id,s(P),I){A.value=I.name||I.login;let E=document.createElement("p");E.className="tb-sg-count",E.id="tb-sg-who",E.textContent=`Signed in as @${I.login}: GitHub tells you when the authors answer.`,P.wrap.append(E),P.hintId=`${q.id} ${E.id}`,s(P)}let et=document.createElement("input");et.type="text",et.name="path",et.readOnly=!0,et.value=v;let yt=n("tb-sg-path","Page you are editing",et),O=document.createElement("textarea");O.name="suggestion",O.rows=6,O.maxLength=5e3;let D=n("tb-sg-suggestion","Your suggested change",O),lt=document.createElement("p");lt.className="tb-sg-count",lt.id="tb-sg-count",D.hintId=lt.id;let dt=()=>{let E=5e3-O.value.length;lt.textContent=E+" character"+(E===1?"":"s")+" remaining"};dt(),s(D),O.addEventListener("input",()=>{dt(),p(D)}),D.wrap.append(lt);let pt=document.createElement("textarea");pt.name="reasoning",pt.rows=3;let rt=n("tb-sg-reasoning","Why",pt,!0);P.control.addEventListener("input",()=>p(P));let Y=document.createElement("div");Y.className="tb-sg-hp",Y.setAttribute("aria-hidden","true");let U=document.createElement("label");U.setAttribute("for","tb-sg-website"),U.textContent="Leave this field empty";let B=document.createElement("input");B.type="text",B.name="website",B.id="tb-sg-website",B.tabIndex=-1,B.autocomplete="off",B.setAttribute("aria-hidden","true"),Y.append(U,B);let bt=document.createElement("div");bt.className="tb-sg-actions";let Q=document.createElement("button");Q.type="submit",Q.className="tb-sg-btn",Q.textContent="Send suggestion";let ct=document.createElement("button");ct.type="button",ct.className="tb-sg-quiet",ct.textContent="Cancel",bt.append(Q,ct),K.append(_,Z,P.wrap,yt.wrap,D.wrap,rt.wrap,Y,bt);let nt=document.createElement("div");nt.className="tb-sg-pane",nt.tabIndex=-1,nt.hidden=!0,L.append(S,K,nt),f.append(L);let At=()=>{nt.hidden=!0,K.hidden=!1,O.focus()},mt=(E,z,N,ut=!1)=>{if(!f.isConnected)return;nt.textContent="";let W=document.createElement("p");W.className="tb-sg-pane-title",W.textContent=E;let tt=document.createElement("p");if(tt.textContent=z,nt.append(W,tt),N){let it=document.createElement("a");it.href=N,it.target="_blank",it.rel="noopener",it.textContent="View your suggestion on GitHub";let ot=document.createElement("p");ot.append(it),nt.append(ot)}let X=document.createElement("button");X.type="button",X.className=ut?"tb-sg-btn":"tb-sg-quiet",X.textContent=ut?"Back to my suggestion":"Close",X.addEventListener("click",ut?At:()=>g?.()),nt.append(X),K.hidden=!0,nt.hidden=!1,nt.focus()},Yt=()=>Array.prototype.filter.call(L.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),E=>!E.disabled&&E.tabIndex>=0&&!E.closest("[hidden]")),st=E=>{if(E.key==="Escape"){E.preventDefault(),g?.();return}if(E.key!=="Tab")return;let z=Yt();if(!z.length){E.preventDefault(),L.focus();return}let N=z.indexOf(document.activeElement);E.shiftKey?N<=0&&(E.preventDefault(),z[z.length-1].focus()):(N===-1||N===z.length-1)&&(E.preventDefault(),z[0].focus())};g=()=>{if(g=null,k)try{k.abort()}catch{}document.removeEventListener("keydown",st,!0),f.remove(),document.body.style.overflow=G,V.isConnected&&V.focus()},f.addEventListener("mousedown",E=>{E.target===f&&g?.()}),M.addEventListener("click",()=>g?.()),ct.addEventListener("click",()=>g?.()),document.addEventListener("keydown",st,!0);let wt=()=>{let E=null,z=(N,ut)=>{c(N,ut),E||(E=N.control)};for(let N of[P,D])p(N);return A.value.trim()||z(P,"Please add your name."),O.value.trim()?O.value.length>5e3&&z(D,"Please keep the suggestion under 5000 characters."):z(D,"Please describe the change you would like."),E&&E.focus(),!E},Et=E=>{H=E,Q.disabled=E,Q.textContent=E?"Sending\\u2026":"Send suggestion"};K.addEventListener("submit",E=>{if(E.preventDefault(),H||!wt())return;let z={name:A.value.trim(),suggestion:O.value.trim(),reasoning:pt.value.trim(),path:v,website:B.value,...F?{paragraph:F.paragraph,quote:F.quote,page:F.page}:{},...I?{identity:I.token}:{}};if(z.website){mt("Thank you","Your suggestion has been received.");return}Et(!0);let N=k=new AbortController,ut=setTimeout(()=>N.abort(),1e4);fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(z),signal:N.signal}).then(async W=>{let tt=null;try{tt=await W.json()}catch{tt=null}if(!W.ok){let X=new Error(tt?.error||"HTTP "+W.status);throw X.userMessage=u(tt),X}return tt}).then(W=>{at("suggest_edit_submitted",{outcome:"success"});let tt=W?.issueUrl;mt("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof tt=="string"?tt:null)}).catch(W=>{at("suggest_edit_submitted",{outcome:"error"}),mt("That did not go through",W&&W.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(ut),k===N&&(k=null),Q.isConnected?Et(!1):H=!1})}),document.body.style.overflow="hidden",document.body.appendChild(f),A.focus(),at(F?"section_note_opened":"suggest_edit_opened")},x=((b,v,C,F)=>{try{h(b,v,C,F)}catch{g=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return x.closeIfOpen=()=>g?.(),x}catch{return null}})(),Ye="tb-pedit-style",Ve=()=>{if(document.getElementById(Ye))return;let t=document.createElement("style");t.id=Ye,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},Ze=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",Ae),o.setAttribute("fill","currentColor"),e.append(o),t.append(e),t},Nn="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",On=t=>{let e=(t.textContent??"").replace(/\\s+/g," ").trim();if(e.length<=200)return e;let o=e.slice(0,199);return`${o.slice(0,o.lastIndexOf(" ")>100?o.lastIndexOf(" "):199)}\\u2026`},Dn=(t,e)=>{let o=Array.from(document.querySelectorAll("[data-pnum]")).filter(i=>!i.closest(".popover")&&!i.querySelector(":scope > button.tb-pnote"));if(!o.length)return;Ve();let r=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let i of o){let l=Number(i.dataset.pnum),u=Ze();u.className="tb-pnote",u.title=`Note to the authors about \\xB6${l}`,u.querySelector("path").setAttribute("d",Nn),u.addEventListener("click",a=>{a.stopPropagation(),Gt(u,e,`Continue: note on \\xB6${l}`,()=>t({paragraph:l,quote:On(i),page:r},u))}),i.append(u)}},zt=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let o of Array.from(zt))e&&!o.panel.contains(e)&&!o.button.contains(e)&&o.d.close(!1)});var _n=t=>typeof t.showPopover=="function",jt=new Set,Xe=(t,e)=>{let o=t.closest(".tb-header")??t,i=(t.closest(".tb-header-slot")??o).getBoundingClientRect(),l=t.getBoundingClientRect(),u=document.documentElement.clientWidth,a=e.style;a.boxSizing="border-box",a.top=`${Math.max(i.bottom,0)+6}px`,a.maxHeight=`${Math.max(window.innerHeight-Math.max(i.bottom,0)-12,120)}px`;let n=()=>{a.left=`${Math.max(i.left,0)}px`,a.right="auto",a.width=`${Math.min(i.width,u)}px`};if(o.classList.contains("tb-hdr-icons")||o.getBoundingClientRect().width<=640)return n();a.left="auto",a.right=`${Math.max(u-l.right,0)}px`,a.width="",e.getBoundingClientRect().left<i.left&&n()},pe=()=>{for(let t of Array.from(jt))Xe(t.button,t.panel)};window.addEventListener("resize",pe);window.addEventListener("scroll",pe,{passive:!0});var Je=(t,e)=>{e.hidden=!1,_n(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",jt.add({button:t,panel:e}),Xe(t,e))},Qe=t=>{for(let e of Array.from(jt))e.panel===t&&jt.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},ce=(t,e,o,r)=>{let i=()=>Array.from(e.querySelectorAll(o?\'[role="menuitem"]\':"input, button, a[href]")).filter(n=>!n.hidden&&!n.closest("[hidden]")),l={d:null,button:t,panel:e},u={open(){for(let s of Array.from(zt))s!==l&&s.d.close(!1);Je(t,e),t.setAttribute("aria-expanded","true"),zt.add(l),(o?i()[0]:e.querySelector("input:checked")??i()[0])?.focus()},close(n=!0){e.hidden||(Qe(e),t.setAttribute("aria-expanded","false"),zt.delete(l),n&&t.focus())}};l.d=u,t.addEventListener("click",()=>{if(!e.hidden)return u.close();r?r(u.open):u.open()});let a=n=>{if(n.key==="Escape"&&!e.hidden){n.preventDefault(),n.stopPropagation(),u.close(!0);return}if(!o||e.hidden||!e.contains(n.target))return;let s=i(),c=s.indexOf(document.activeElement),p=g=>{n.preventDefault(),s[(g+s.length)%s.length]?.focus()};n.key==="ArrowDown"?p(c+1):n.key==="ArrowUp"?p(c-1):n.key==="Home"?p(0):n.key==="End"?p(s.length-1):n.key==="Tab"&&u.close(!1)};return e.addEventListener("keydown",a),t.addEventListener("keydown",a),o&&e.addEventListener("click",n=>{let s=n.target.closest(\'[role="menuitem"]\');if(s){if(s.getAttribute("aria-disabled")==="true"){n.preventDefault();return}u.close(!1)}}),u},y=(t,e={},...o)=>{let r=document.createElement(t);for(let[i,l]of Object.entries(e))i==="text"?r.textContent=l:i==="class"?r.className=l:r.setAttribute(i,l);for(let i of o)i!==null&&r.append(i);return r},Kt=(t,e,...o)=>{let r=y("dialog",{class:"tb-dialog","aria-label":t}),i=y("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});i.addEventListener("click",()=>r.close()),r.append(i,...o);let l=null;return r.addEventListener("close",()=>{r.remove(),l?l():e.isConnected&&e.focus()}),document.body.append(r),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),{d:r,closeThen:u=>(l=u,r.close())}},We=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,Je(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Qe(e),e.hidden=!1)},4e3))},tn=(t,e,o)=>{let r=()=>{let i=y("textarea",{readonly:""});i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.append(i),i.select();let l=!1;try{l=document.execCommand("copy")}catch{l=!1}return i.remove(),l};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>r()?e():o()):r()?e():o()},en="tb-contribute-explained",nn=!1,Pn=()=>{if(nn)return!0;try{return localStorage.getItem(en)==="1"}catch{return!1}},St={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},qn=["no","one","two","three"],Un="https://hypothes.is/logout",on=(t,e,o)=>{nn=!0;try{localStorage.setItem(en,"1")}catch{}let r=({title:p,what:g,who:h,account:x,link:b,switchNote:v})=>y("section",{class:"tb-route"},y("h3",{text:p}),y("p",{text:g}),y("p",{},y("strong",{text:"Who sees it: "}),h),y("p",{},y("strong",{text:"Account: "}),x,b?" ":null,b?y("a",{href:b[1],target:"_blank",rel:"noopener noreferrer",text:b[0]}):null),v?y("p",{},`${v} `,y("a",{href:Un,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),i=y("div",{class:"tb-dialog-row"}),l=document.querySelector(".tb-header"),u=window.tbAnnotations,a=(l?.dataset.routes??"comment").split(" ").filter(p=>p!=="comment"||u).map(p=>p==="comment"&&u?.groupsOnly?"groupComment":p).filter(p=>p in St),n=a.includes("edit")||a.includes("note")?"book":"edition",s=Kt("How contributing works",t,y("h2",{text:"How contributing works"}),y("p",{text:a.length===1?`There is one way to help with this ${n}: ${St[a[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${qn[a.length]??a.length} ways to help with this ${n}. They differ in who sees what you write, and in which account you need.`}),...a.map(p=>r(St[p])),y("p",{},y("a",{href:e,text:"More about commenting and contributing"})),l?.dataset.credits?y("p",{},y("a",{href:`${l.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor."):null,i),c=y("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>s.d.close()),o){let p=y("button",{type:"button",class:"tb-btn tb-btn-primary",text:o.label});p.addEventListener("click",()=>s.closeThen(o.run)),i.append(c,p),p.focus()}else i.append(c),c.focus()},Gt=(t,e,o,r)=>Pn()?r():on(t,e,{label:o,run:r}),zn=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},jn=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),o=e?t.find(l=>l.id===e):void 0;if(o)return Number(o.dataset.pnum);let r=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,i=t.find(l=>{let u=l.getBoundingClientRect();return u.bottom>r+8&&u.top<window.innerHeight});return Number((i??t[0]).dataset.pnum)||0},Gn=(t,e,o)=>{let r=URL.createObjectURL(new Blob([t],{type:e})),i=y("a",{href:r,download:o});document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)},Kn=(t,e,o,r)=>{let i=t.chapter?jn():0,l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),u=[...i?[["paragraph",`This paragraph (\\xB6${i})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${l}`]],a=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),n=i&&a?"paragraph":t.chapter?"chapter":"book",s="apa";try{let k=localStorage.getItem("tb-cite-style");k&&qt.some(([H])=>H===k)&&(s=k)}catch{}let c=y("p",{class:"tb-cite-text","aria-live":"polite"}),p=y("span",{class:"tb-cite-said",role:"status"}),g=()=>Ue(t,n,new Date,i),h=()=>{p.textContent="",c.textContent="";for(let k of g().styles[s])c.append(k.italic?y("i",{text:k.text}):k.text)},x=(k,H,f,L,S)=>{let R=y("div",{class:"tb-seg"});for(let[M,K]of f){let _=y("input",{type:"radio",name:k,value:M});_.checked=L()===M,_.addEventListener("change",()=>{S(M),h()}),R.append(y("label",{},_,K))}return y("fieldset",{},y("legend",{text:H}),R)},b=y("button",{type:"button",class:"tb-btn",text:"Copy"});b.addEventListener("click",()=>{tn(le(g().styles[s]),()=>p.textContent="Copied",()=>p.textContent="Couldn\'t copy: select the text instead"),at("citation_copied",{style:s,scope:n})});let v=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",C=[["BibTeX","bib","application/x-bibtex",je],["RIS","ris","application/x-research-info-systems",Ge],["CSL-JSON","json","application/vnd.citationstyles.csl+json",Ke]],F=y("div",{class:"tb-dialog-row tb-cite-files"},y("span",{class:"tb-cite-said",text:"Download"}));for(let[k,H,f,L]of C){let S=y("button",{type:"button",class:"tb-btn",text:k});S.addEventListener("click",()=>{let{item:R}=g();Gn(L(R),f,`${n==="book"?"book":v}${n==="paragraph"?`-p${i}`:""}.${H}`),at("citation_downloaded",{format:H,scope:n})}),F.append(S)}let V=de(e.dataset.licence??""),G=y("p",{class:"tb-cite-text"});for(let k of r())G.append(k.italic?y("i",{text:k.text}):k.text);h(),Kt("Cite",o,y("h2",{text:"Cite"}),x("tb-cite-scope","What",u,()=>n,k=>n=k),x("tb-cite-style","Style",qt,()=>s,k=>{s=k;try{localStorage.setItem("tb-cite-style",s)}catch{}}),c,y("div",{class:"tb-dialog-row"},p,b),F,y("h3",{text:V?`Attribution (${V})`:"Attribution"}),G)},Yn=(t,e)=>{let o={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:zn(),accessed:new Date},r=a=>{let n=y("p",{class:"tb-cite-text"});for(let s of a)n.append(s.italic?y("i",{text:s.text}):s.text);return n},i=(a,n)=>{let s=y("span",{class:"tb-cite-said",role:"status"}),c=y("button",{type:"button",class:"tb-btn",text:"Copy"});return c.addEventListener("click",()=>tn(le(n),()=>s.textContent="Copied",()=>s.textContent="Couldn\'t copy: select the text instead")),y("section",{},y("h3",{text:a}),r(n),y("div",{class:"tb-dialog-row"},s,c))},l=qe(document);if(l)return Kn(l,t,e,()=>ae(o));let u=de(o.licence);Kt("Cite this page",e,y("h2",{text:"Cite this page"}),i("APA 7",Pe(o)),i(u?`Attribution (${u})`:"Attribution",ae(o)))},Wn=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},Vn=(t,e,o,r)=>{let i=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),u=(n,s,c)=>{let p=i.filter(([g])=>s?.[g]).map(([g,h])=>{let x=y("a",{class:"tb-btn",href:s[g],download:"",text:h});return x.addEventListener("click",()=>at("download",{format:g,scope:c})),x});return p.length?[y("h3",{text:n}),y("div",{class:"tb-dialog-row tb-cite-files"},...p)]:[]},a=y("button",{type:"button",class:"tb-btn",text:"Markdown"});a.addEventListener("click",r),Kt("Download",o,y("h2",{text:"Download"}),...u("This page",t.chapter,"chapter"),...u(`Whole ${l}`,t.book,"book"),y("h3",{text:"Source"}),y("div",{class:"tb-dialog-row tb-cite-files"},a))},Zn=(t,e,o)=>{let r=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];o&&r.push(["annotations",o.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let i=y("p",{class:"tb-panel-note",role:"status"});for(let[l,u,a]of r){let n=y("div",{class:"tb-seg"});for(let[c,p]of a){let g=y("input",{type:"radio",name:`tb-pref-${l}`,value:c});g.checked=e.get(l)===c,g.addEventListener("change",()=>{if(l==="annotations"&&o){if(i.textContent="",c==="on")o.enable();else if(o.disable().reload){let h=y("button",{type:"button",class:"tb-btn",text:"Reload"});h.addEventListener("click",()=>location.reload()),i.append("Highlights hidden. The annotation tab goes away when the page reloads.",h)}return}e.set(l,c),l==="numbers"&&at("paragraph_numbers_toggled",{to:c})}),n.append(y("label",{},g,p))}let s=y("fieldset",{},y("legend",{text:u}),n);l==="annotations"&&s.append(i),l==="width"&&Xn(t,s),t.append(s)}},Xn=(t,e)=>{let o=i=>y("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${i}) * var(--tb-size-body) * var(--tb-text-scale))`}),r=()=>{let i=document.querySelector("article");if(!i?.parentElement||t.hidden)return;let l=o("--tb-measure-standard-em"),u=o("--tb-measure-wide-em");i.parentElement.append(l,u);let a=l.getBoundingClientRect().width,n=u.getBoundingClientRect().width;l.remove(),u.remove(),e.hidden=!(n-a>=16)};new MutationObserver(r).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",r)},ue=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Jn=t=>{let e=!1,o=()=>{e=!1;let i=t.getBoundingClientRect(),l=document.documentElement.style;l.setProperty("--tb-hdr-h",`${Math.round(i.height)}px`),l.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(i.bottom))}px`)},r=()=>{e||(e=!0,requestAnimationFrame(o))};o(),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),typeof ResizeObserver=="function"&&new ResizeObserver(r).observe(t)},be=null;window.addEventListener("popstate",()=>be?.(location.hash,!1));var Qn=(t,e,o,r,i)=>{let l={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:i,track:at};t.addEventListener("click",n=>{if(n.button!==0||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey){at("edit_on_github_clicked");return}n.preventDefault(),Dt({...l,mode:"page",trigger:o})});let u=new Map,a=Array.from(document.querySelectorAll("[data-pnum]")).filter(n=>!n.closest(".popover")&&!n.querySelector(":scope > button.tb-pedit"));a.length&&Ve();for(let n of a){let s=Ze();s.addEventListener("click",c=>{c.stopPropagation(),Gt(s,r,`Continue: edit \\xB6${n.dataset.pnum}`,()=>Dt({...l,mode:"paragraph",para:n,trigger:s}))}),n.append(s),u.set(n.dataset.pnum??"",{p:n,b:s})}be=(n,s)=>{let c=Tt.exec(n);if(!c)return;let p=c[1]?u.get(c[1]):void 0;Dt(p?{...l,mode:"paragraph",para:p.p,trigger:p.b,push:s}:{...l,mode:"page",trigger:o,push:s})}},to=(t,e,o)=>{t.addEventListener("click",r=>{r.button!==0||r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||(r.preventDefault(),Ne({endpoint:e,listUrl:t.dataset.history??"",path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:o,track:at}))})},eo=t=>{let e=t.querySelector("[data-tb-reader]"),o=t.querySelector("[data-tb-reader-item]"),r=()=>t.scrollWidth>t.clientWidth+1,i=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,l=i?.querySelector(".home-link")?i:null,u=t.querySelector(".tb-hdr-label"),a=()=>!!u&&getComputedStyle(u).position!=="absolute",n=t.querySelector(".tb-hdr-where"),s=h=>!!h&&h.scrollWidth>h.clientWidth+1,c=h=>!r()&&a()===h&&!s(n)&&!Array.from(n?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(s),p=h=>{l?.classList.toggle("tb-logo-full",h),l?.classList.toggle("tb-logo-icon",!h)},g=()=>{let h=!!e&&!!o&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),h&&(e.hidden=!1,o.hidden=!0),r()&&t.classList.add("tb-hdr-icons"),r()&&(t.classList.add("tb-hdr-tight"),h&&(e.hidden=!0,o.hidden=!1));let x=a();l&&c(x)&&(p(!0),c(x)||p(!1)),pe()};if(g(),window.addEventListener("resize",g),document.fonts?.ready.then(g),typeof ResizeObserver=="function"){let h=new ResizeObserver(()=>requestAnimationFrame(g));h.observe(t);let x=t.querySelector(".tb-hdr-actions");x&&h.observe(x)}return g},no=t=>{let e=n=>t.querySelector(n),o=t.dataset.howTo??"/how-to-comment",r=window,i=e("[data-tb-contribute]"),l=e("[data-tb-more]"),u=n=>{try{n()}catch{}};u(()=>{let n=e("[data-tb-search]"),s=document.querySelector(".search .search-button");!n||!s||(n.addEventListener("click",()=>s.click()),n.hidden=!1)}),u(()=>{let n=e("[data-tb-menu]"),s=document.querySelector(".explorer"),c=s?.querySelector(".mobile-explorer");if(!n||!s||!c)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(n);let g=s.querySelector(".explorer-content");g?.id&&n.setAttribute("aria-controls",g.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let h=n.querySelector(".tb-hdr-label"),x=()=>!s.classList.contains("collapsed"),b=()=>{let v=x();n.setAttribute("aria-expanded",String(v)),n.classList.toggle("tb-closes",v),h&&(h.textContent=v?"Close menu":"Menu")};new MutationObserver(b).observe(s,{attributes:!0,attributeFilter:["class"]}),n.addEventListener("click",()=>{x()||r.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",v=>{v.key!=="Escape"||!x()||!ue()||(c.click(),n.focus())}),b(),n.hidden=!1}),u(()=>{let n=e("[data-tb-reader]"),s=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!n||!s||!c)return;let p=()=>n.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),n.addEventListener("click",()=>c.click()),s.addEventListener("click",()=>c.click()),p(),t.dataset.tbHasReader="1",n.hidden=!1});let a=()=>{at("annotation_badge_clicked"),r.tbAnnotations.open().then(n=>{n||We("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};u(()=>{if(!r.tbAnnotations){let c=e("[data-tb-comment]");if(c&&window.tbCommentsComing){let p=c.querySelector(".tb-mi-t"),g=c.querySelector(".tb-mi-s");p&&(p.textContent=St.groupComment.title),g&&(g.textContent="Coming soon for classes"),c.setAttribute("aria-disabled","true"),c.hidden=!1}return}let n=e("[data-tb-annotate]");if(n){let c=n.querySelector(".tb-hdr-label"),p=()=>ue()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),g=()=>{let x=p();n.classList.toggle("tb-closes",x),c&&(c.textContent=x?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",g),window.addEventListener("resize",g);let h=null;n.addEventListener("pointerdown",()=>h=p(),!0),n.addEventListener("click",()=>{let x=h??p();if(h=null,x)return r.tbAnnotations.close?.();let b=document.querySelector(".explorer");b&&!b.classList.contains("collapsed")&&ue()&&b.querySelector(".mobile-explorer")?.click(),Gt(n,o,"Continue: open annotations",a)}),n.querySelector(".tb-anno-count")||n.append(y("span",{class:"tb-anno-count"})),n.hidden=!1}let s=e("[data-tb-comment]");if(s){if(s.addEventListener("click",a),r.tbAnnotations.groupsOnly){let c=s.querySelector(".tb-mi-t"),p=s.querySelector(".tb-mi-s");c&&(c.textContent=St.groupComment.title),p&&(p.textContent="Hypothes.is account \\xB7 only your group sees it")}s.hidden=!1}}),u(()=>{let n=e("#tb-contribute-menu");if(!i||!n)return;ce(i,n,!0,x=>Gt(i,o,"Continue to Contribute",x)),e("[data-tb-explain]")?.addEventListener("click",()=>on(i,o));let s=e("button.tb-suggest-btn"),c=s?.dataset.endpoint,p=s&&c&&Ut?()=>Ut(c,s.dataset.path??"",i):void 0,g=e("a.edit-on-github"),h=g?.dataset.editEndpoint;if(g&&h){if(Qn(g,h,i,o,p),Tt.test(location.hash)){let x=location.hash,b=window.history.state?.tbEditor===!0;b||window.history.replaceState(window.history.state,"",location.pathname+location.search),be?.(x,!b)}}else g?.addEventListener("click",()=>at("edit_on_github_clicked"));s&&p&&(s.addEventListener("click",p),s.hidden=!1,Dn((x,b)=>Ut(c,s.dataset.path??"",b,x),o)),i.hidden=!1}),u(()=>{let n=e("[data-tb-appearance]"),s=e("#tb-appearance");!n||!s||!r.tbPrefs||(Zn(s,r.tbPrefs,r.tbAnnotations),ce(n,s,!1),n.hidden=!1)}),u(()=>{let n=e("#tb-more-menu");if(!l||!n)return;ce(l,n,!0),e("[data-tb-cite]")?.addEventListener("click",()=>Yn(t,l)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let s=e("a.tb-history-link");s?.dataset.revisionEndpoint&&to(s,s.dataset.revisionEndpoint,l);let c=e("[data-tb-backlinks]"),p=document.querySelector(".backlinks");c&&(!p||!p.querySelector("a.internal")?(c.setAttribute("aria-disabled","true"),c.append(y("span",{class:"tb-mi-s",text:"No other page links here"}))):c.addEventListener("click",()=>{let b=p.querySelector("h3")??p;b.tabIndex=-1,p.scrollIntoView({block:"start"}),b.focus({preventScroll:!0})}));let g=e("[data-tb-download]"),h=Wn();if(g&&h){let b=g.querySelector(".tb-mi-t");b&&(b.textContent="Download\\u2026")}let x=()=>fetch(g.dataset.tbDownload).then(b=>b.ok?b.blob():Promise.reject(new Error(String(b.status)))).then(b=>{let v=URL.createObjectURL(b),C=y("a",{href:v,download:g.dataset.file??"page.md"});document.body.append(C),C.click(),C.remove(),setTimeout(()=>URL.revokeObjectURL(v),1e3)}).catch(()=>We("That didn\'t download just now. View source has the same file."));g?.addEventListener("click",()=>h?Vn(h,t,l,x):x()),l.hidden=!1}),u(()=>{eo(t)}),u(()=>{let n=t.parentElement;Jn(n?.classList.contains("tb-header-slot")?n:t)})},oo=()=>{try{Ut?.closeIfOpen(),Fe(),Ie();for(let t of Array.from(document.querySelectorAll(".tb-page-controls")))t.dataset.tbWired||(t.dataset.tbWired="1",no(t))}catch{}};document.addEventListener("nav",oo);\n';

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
  font-size: 0.7rem;
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
.tb-byline .tb-sep { margin: 0 0.4rem; color: var(--tb-faint, var(--gray)); }
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