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
var controls_inline_default = 'var Se=/^\\s{0,3}(```|~~~)/,Tn=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,Fn=t=>{let e=t.split(`\n`),n=[],r=0;if(e[0]?.trim()==="---"){let d=e.findIndex((p,a)=>a>0&&(p.trim()==="---"||p.trim()==="..."));d>0&&(r=d+1)}let s=0;for(;r<e.length;){let d=e[r];if(!d.trim()){r++;continue}let p=Se.exec(d);if(p||d.trim()==="$$"){let c=p?p[1]:"$$",b=r+1;for(;b<e.length&&!e[b].trim().startsWith(c);)b++;r=b+1;continue}let a=r;for(;a<e.length&&e[a].trim()&&!Se.test(e[a]);)a++;let o=e.slice(r,a).join(`\n`),l=!Tn.test(d);n.push({start:r,text:o,ordinal:l?++s:0}),r=a}return n},Sn=t=>Ae(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),Ae=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],An=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let s of t)n.set(s,(n.get(s)??0)+1);let r=0;for(let s of e){let d=n.get(s)??0;d>0&&(r++,n.set(s,d-1))}return r/Math.max(t.length,e.length)};var He=(t,e,n)=>{let r=Ae(e);if(!r.length)return null;let s=null,d=0,p=1/0;for(let a of Fn(t)){let o=An(Sn(a.text),r);if(o<.75)continue;let l=a.ordinal?Math.abs(a.ordinal-n):1e6;(o>d+.02||Math.abs(o-d)<=.02&&l<p)&&(s=a,d=Math.max(o,d),p=l)}return s};var Tt=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let r=t.length,s=e.length;for(;r>n&&s>n&&t[r-1]===e[s-1];)r--,s--;let d=t.slice(0,n).map(c=>({t:"=",v:c})),p=t.slice(r).map(c=>({t:"=",v:c})),a=t.slice(n,r),o=e.slice(n,s),l;if((a.length+1)*(o.length+1)>4e5)l=[...a.map(c=>({t:"-",v:c})),...o.map(c=>({t:"+",v:c}))];else{let c=o.length+1,b=new Uint32Array((a.length+1)*c);for(let w=a.length-1;w>=0;w--)for(let u=o.length-1;u>=0;u--)b[w*c+u]=a[w]===o[u]?b[(w+1)*c+u+1]+1:Math.max(b[(w+1)*c+u],b[w*c+u+1]);l=[];let g=0,f=0;for(;g<a.length&&f<o.length;)a[g]===o[f]?(l.push({t:"=",v:a[g]}),g++,f++):b[(g+1)*c+f]>=b[g*c+f+1]?l.push({t:"-",v:a[g++]}):l.push({t:"+",v:o[f++]});for(;g<a.length;)l.push({t:"-",v:a[g++]});for(;f<o.length;)l.push({t:"+",v:o[f++]})}return[...d,...l,...p]},Ft=t=>t.split(/(\\s+)/).filter(e=>e!==""),Nt=(t,e,n=2)=>{let r=Tt(t.split(`\n`),e.split(`\n`)),s=[],d=1,p=1,a=null,o=0;return r.forEach((l,c)=>{r.slice(Math.max(0,c-n),c+n+1).some(g=>g.t!=="=")?((!a||l.t==="="&&o>2*n)&&(a={a:d,b:p,ops:[]},s.push(a)),a.ops.push(l),o=l.t==="="?o+1:0):(a=null,o=0),l.t!=="+"&&d++,l.t!=="-"&&p++}),s};var vt="tb-editor",Me="tb-editor-style",se="tb-gh-identity",ne=10,oe=500,Hn=7.5*60*60*1e3,Be=2e4,Mn=200,St=/^#edit(?:-(\\d+))?$/,Bn=t=>t?`#edit-${t}`:"#edit",Re={tbEditor:!0},Rn="This page has changes waiting for review; you\\u2019re editing the latest draft.",i=(t,e={},...n)=>{let r=document.createElement(t);for(let[s,d]of Object.entries(e))d!==!1&&(s==="text"?r.textContent=String(d):s==="class"?r.className=String(d):r.setAttribute(s,d===!0?"":String(d)));for(let s of n)s&&r.append(s);return r},Ie="http://www.w3.org/2000/svg",Dt=t=>{let e=document.createElementNS(Ie,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(Ie,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},Ne="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",Oe="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",In="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",On="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Pt=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,Mn):null},Nn=()=>{try{let t=sessionStorage.getItem(se);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Hn?null:e}catch{return null}},re=t=>{try{t?sessionStorage.setItem(se,JSON.stringify(t)):sessionStorage.removeItem(se)}catch{}},ae=()=>{if(document.getElementById(Me))return;let t=`#${vt}`,e=i("style",{id:Me});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},Dn=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),_n="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",ie=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(_n).forEach(r=>r.remove()),e.querySelectorAll("*").forEach(r=>{for(let s of Array.from(r.attributes)){let d=s.value.trim().toLowerCase();(s.name.startsWith("on")||(s.name==="href"||s.name==="src")&&/^(javascript|data|vbscript):/.test(d))&&r.removeAttribute(s.name)}r.tagName==="A"&&(r.setAttribute("target","_blank"),r.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},Pn=(t,e)=>{let n=i("div",{class:"tb-ed-diff"}),r=Nt(t,e);if(!r.length)return n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let s=(d,p)=>{let a=i("div",{class:`tb-ed-line${d==="-"?" tb-ed-del":d==="+"?" tb-ed-add":""}`}),o=i("span");return typeof p=="string"?o.textContent=p||" ":o.append(...p),a.append(i("span",{text:d==="="?" ":d}),o),a};for(let d of r){let p=i("div",{class:"tb-ed-hunk"},i("div",{class:"tb-ed-hh",text:`Line ${d.b}`}));for(let a=0;a<d.ops.length;){let o=d.ops[a];if(o.t==="="){p.append(s("=",o.v)),a++;continue}let l=[],c=[];for(;d.ops[a]?.t==="-";)l.push(d.ops[a++].v);for(;d.ops[a]?.t==="+";)c.push(d.ops[a++].v);let b=Math.min(l.length,c.length),g=l.map((f,w)=>w<b?Tt(Ft(f),Ft(c[w])):null);l.forEach((f,w)=>{let u=g[w];p.append(s("-",u?u.filter(E=>E.t!=="+").map(E=>E.t==="-"?i("del",{text:E.v}):document.createTextNode(E.v)):f))}),c.forEach((f,w)=>{let u=g[w];p.append(s("+",u?u.filter(E=>E.t!=="-").map(E=>E.t==="+"?i("ins",{text:E.v}):document.createTextNode(E.v)):f))})}n.append(p)}return n},_t=null,De=()=>_t?.(),qt=t=>{if(_t)return;ae();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,r=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),s=t.path.split("/"),d=s.pop(),p=t.para&&Number(t.para.getAttribute("data-pnum"))||0,a=t.mode,o="",l="",c="drafts",b=null,g="",f=Nn(),w=!1,u=!1,E=null,y=null,$=!1,O=window.scrollY,_=Bn(a==="paragraph"?p:0),F=i("div",{id:vt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),N=i("span",{class:"tb-ed-pill"},Dt(Oe),i("span",{text:c})),R=i("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},Dt(In));R.append(i("span",{text:t.repo.split("/").pop()||t.repo}));for(let x of s)R.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{text:x}));R.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{class:"tb-ed-file",text:d}));let P=i("span",{class:"tb-ed-muted",text:p?` \\xB7 \\xB6${p}`:""});R.append(P,N);let J=i("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),W=i("div",{class:"tb-ed-head"},R,J),z=i("div",{class:"tb-ed-discard",role:"alert",hidden:!0},i("span",{text:"Discard your changes?"})),V=i("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),q=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});z.append(V,q);let ut=i("div",{class:"tb-ed-main"}),nt=i("div",{class:"tb-ed-inner"}),Q=i("p",{class:"tb-ed-note",hidden:!0}),h=i("p",{class:"tb-ed-note",hidden:!0,text:Rn}),m=i("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),k=i("div",{class:"tb-ed-gate",hidden:!0});nt.append(h,Q,m,k),ut.append(nt),F.append(W,z,ut);let S=["Edit","Preview","Changes"],M=i("div",{role:"tablist","aria-label":"Editor view"}),B=S.map((x,L)=>i("button",{type:"button",role:"tab",id:`tb-ed-tab-${L}`,"aria-controls":`tb-ed-panel-${L}`,"aria-selected":L===0?"true":"false",tabindex:L===0?0:-1,text:x==="Edit"?"Edit":x==="Preview"?"Preview":"Changes"}));M.append(...B);let A=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),I=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),U=i("div",{class:"tb-ed-bar"},M,i("div",{class:"tb-ed-actions"},A,I)),K=i("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),bt=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),ft=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),tt=[i("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},bt,K,ft),i("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),i("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],wt=i("div",{class:"tb-ed-box"},U,...tt),lt=i("p",{class:"tb-ed-foot"}),dt=()=>K.value,ot=()=>g,Mt=x=>{B.forEach((L,T)=>{L.setAttribute("aria-selected",T===x?"true":"false"),L.tabIndex=T===x?0:-1,tt[T].hidden=T!==x}),x===1&&Qt(),x===2&&(tt[2].textContent="",tt[2].append(Pn(ot(),dt())))};B.forEach((x,L)=>{x.addEventListener("click",()=>Mt(L)),x.addEventListener("keydown",T=>{let H=T.key==="ArrowRight"?1:T.key==="ArrowLeft"?-1:0;if(!H)return;T.preventDefault();let X=(L+H+B.length)%B.length;Mt(X),B[X].focus()})});let yt=0,Qt=()=>{let x=tt[1];x.textContent="",x.className="tb-ed-panel tb-ed-preview";let L=i("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});x.append(L);let T=++yt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:Dn(dt()),mode:"markdown"})}).then(H=>H.ok?H.text():Promise.reject(new Error(String(H.status)))).then(H=>{T===yt&&(x.textContent="",x.append(ie(H)))}).catch(()=>{T===yt&&(L.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};K.addEventListener("input",()=>{u=dt()!==g,I.disabled=!u});let st=i("div",{class:"tb-ed-scrim",hidden:!0}),$t=i("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});st.append($t),F.append(st);let Lt=(x,L,T,H=!1)=>{T.id=x;let X=i("p",{class:"tb-ed-err",id:`${x}-err`}),gt=i("label",{for:x,text:L},H?i("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:i("div",{class:"tb-ed-field"},gt,T,X),control:T,err:X}},C=Lt("tb-ed-msg","What did you change, and why?",i("textarea",{rows:2,maxlength:oe,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));C.wrap.append(i("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let j=Lt("tb-ed-desc","Extended description",i("textarea",{rows:3,maxlength:5e3}),!0),D=i("div",{class:"tb-ed-who"}),ct=i("div",{class:"tb-ed-what"},Dt(Oe)),Y=i("span");ct.append(Y);let et=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),Z=i("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),at=i("form",{novalidate:!0},i("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),C.wrap,j.wrap,D,ct,i("div",{class:"tb-ed-row"},et,Z)),rt=i("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});$t.append(at,rt);let Bt=()=>{if(D.textContent="",f){let x=i("img",{src:`https://avatars.githubusercontent.com/u/${f.id}?s=56`,alt:""}),L=i("button",{type:"button",class:"tb-ed-link",text:"Sign out"});L.addEventListener("click",()=>{f=null,re(null),Bt()}),D.append(x,i("span",{},"Signed in as ",i("strong",{text:`@${f.login}`})," \\u2014 this edit will be credited to your GitHub account."),L)}else D.append(Ee(),i("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Ee=()=>{let x=i("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},Dt(On),"Sign in with GitHub");return x.addEventListener("click",()=>En(x)),x},vn=()=>{k.textContent="";let x=Ee(),L=i("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let T=i("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});T.addEventListener("click",()=>{It(),t.suggest()}),L.append(T," instead: it needs no account.")}else L.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");k.append(i("h2",{text:"Sign in to edit"}),i("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),i("p",{},x),L),m.hidden=!0,k.hidden=!1,x.focus()},ke=x=>{if(x.origin!==n)return;let L=x.data;if(!(!L||L.type!=="tb-github-identity")){if(E=null,L.error||typeof L.token!="string"||typeof L.login!="string"){t.track("github_signin",{outcome:L.error==="denied"?"cancelled":"error"});return}if(f={token:L.token,login:L.login,id:Number(L.id)||0,name:L.name??"",at:Date.now()},re(f),t.track("github_signin",{outcome:"success"}),!$)return Fe();Bt(),st.hidden||C.control.focus()}},En=x=>{let L=`${r}?origin=${encodeURIComponent(location.origin)}`;E=window.open(L,"tb-github-signin","popup,width=560,height=720"),!E&&!x.parentElement?.querySelector(".tb-ed-err")&&x.after(i("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",ke);let kn=(x,L)=>{x.control.setAttribute("aria-invalid","true"),x.control.setAttribute("aria-describedby",x.err.id),x.err.textContent=L},$e=x=>{x.control.removeAttribute("aria-invalid"),x.control.removeAttribute("aria-describedby"),x.err.textContent=""};C.control.addEventListener("input",()=>$e(C));let $n=()=>{Y.textContent="",Y.append("This creates a new branch and opens a proposal to merge it into ",i("code",{text:c}),". Nothing changes in the book until an editor accepts it."),Bt(),at.hidden=!1,rt.hidden=!0,st.hidden=!1,C.control.focus()},te=()=>{st.hidden=!0,I.focus()};I.addEventListener("click",$n),et.addEventListener("click",te),st.addEventListener("mousedown",x=>{x.target===st&&!w&&te()});let ee=(x,L,T,H)=>{if(!F.isConnected)return;rt.textContent="",rt.append(i("h2",{text:x}),i("p",{text:L})),T&&rt.append(i("p",{},i("a",{href:T.href,target:"_blank",rel:"noopener",text:T.text})));let X=i("button",{type:"button",class:`tb-ed-btn${H?" tb-ed-primary":""}`,text:H?"Back to my edit":"Close"});X.addEventListener("click",H?()=>{rt.hidden=!0,at.hidden=!1,Z.focus()}:()=>Rt(!0)),rt.append(i("div",{class:"tb-ed-row"},X)),at.hidden=!0,rt.hidden=!1,rt.focus()};at.addEventListener("submit",x=>{if(x.preventDefault(),w)return;let L=null;$e(C);let T=C.control.value.trim().length;if(T<ne||T>oe?(kn(C,T<ne?`Please say what you changed and why, in at least ${ne} characters.`:`Please keep it under ${oe} characters.`),L=C.control):f||(L=D.querySelector("button")),L){L.focus();return}let H={mode:a,path:t.path,baseSha:l,title:a==="paragraph"&&p?`Edit \\xB6${p} of ${d}`:`Update ${d}`,summary:C.control.value.trim().replace(/\\s+/g," "),description:j.control.value.trim()};a==="page"?H.content=dt():(H.startLine=b.start,H.original=b.text,H.replacement=dt(),p&&(H.paragraph=p)),H.identity=f.token,w=!0,Z.disabled=!0,Z.textContent="Proposing\\u2026";let X=y=new AbortController,gt=setTimeout(()=>X.abort(),Be);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(H),signal:X.signal}).then(async G=>{let Ot=null;try{Ot=await G.json()}catch{Ot=null}if(G.status===401&&f&&(f=null,re(null),Bt()),!G.ok)throw Object.assign(new Error(String(G.status)),{userMessage:Pt(Ot)});return Ot}).then(G=>{u=!1,G.fallback&&typeof G.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:a}),ee("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:G.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:a}),ee("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof G.prUrl=="string"?{href:G.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(G=>{t.track("page_edit_submitted",{outcome:"error",mode:a}),ee("That did not go through",G&&G.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(gt),y===X&&(y=null),w=!1,Z.disabled=!1,Z.textContent="Propose changes"})});let Ln=x=>Array.from(x.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(L=>!L.disabled&&L.tabIndex>=0&&!L.closest("[hidden]")),Le=x=>{if(x.key==="Escape"){x.preventDefault(),st.hidden?Ct():w||(!rt.hidden&&at.hidden&&!u?Rt(!0):te());return}if(x.key!=="Tab")return;let L=st.hidden?F:$t,T=Ln(L);if(!T.length){x.preventDefault(),L.focus();return}let H=T.indexOf(document.activeElement);(x.shiftKey?H<=0:H===-1||H===T.length-1)&&(x.preventDefault(),T[x.shiftKey?T.length-1:0].focus())},Ce=x=>{u&&(x.preventDefault(),x.returnValue="")},Rt=(x=!1)=>{if(!x&&u)return Ct();u=!1,St.test(location.hash)?history.back():It()},Te=()=>{if(!St.test(location.hash)){if(u)return history.pushState(Re,"",_),Ct();It()}},It=()=>{_t=null,y?.abort(),E?.close(),document.removeEventListener("keydown",Le,!0),window.removeEventListener("message",ke),window.removeEventListener("beforeunload",Ce),window.removeEventListener("popstate",Te),F.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,O)},Ct=()=>{if(!u)return Rt(!0);z.hidden=!1,q.focus()};V.addEventListener("click",()=>Rt(!0)),q.addEventListener("click",()=>{z.hidden=!0,K.focus()}),J.addEventListener("click",Ct),A.addEventListener("click",Ct),document.addEventListener("keydown",Le,!0),window.addEventListener("beforeunload",Ce),window.addEventListener("popstate",Te),_t=It,t.push!==!1&&history.pushState(Re,"",_),document.body.style.overflow="hidden",document.body.append(F),J.focus(),t.track("page_editor_opened",{mode:a});let Cn=x=>{m.textContent="",m.removeAttribute("class"),m.append(x+" ",i("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},Fe=()=>{if(!f)return vn();$=!0,k.hidden=!0,m.hidden=!1;let x=new AbortController,L=setTimeout(()=>x.abort(),Be);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:x.signal}).then(async T=>{let H=null;try{H=await T.json()}catch{H=null}if(!T.ok)throw Object.assign(new Error(String(T.status)),{userMessage:Pt(H)});return H}).then(T=>{if(F.isConnected){if(typeof T?.content!="string"||typeof T.sha!="string")throw new Error("bad source");if(o=T.content,l=T.sha,c=typeof T.branch=="string"?T.branch:c,N.lastChild.textContent=c,h.hidden=!t.builtBlob||t.builtBlob===l,a==="paragraph"&&(b=t.para?He(o,t.para.textContent??"",p):null,b||(a="page",P.textContent="",Q.textContent=`We couldn\\u2019t find \\xB6${p} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,Q.hidden=!1)),a==="paragraph"&&b){wt.classList.add("tb-ed-para");let H=o.split(`\n`),X=b.text.split(`\n`).length,gt=H.slice(Math.max(0,b.start-3),b.start).join(`\n`).trim(),G=H.slice(b.start+X,b.start+X+3).join(`\n`).trim();bt.textContent=gt.length>220?`\\u2026${gt.slice(-220)}`:gt,ft.textContent=G.length>220?`${G.slice(0,220)}\\u2026`:G,bt.hidden=!gt,ft.hidden=!G,g=b.text,lt.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else g=o,lt.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";K.value=g,m.remove(),nt.append(wt,lt),K.setSelectionRange(0,0),K.focus()}}).catch(T=>{F.isConnected&&Cn(T&&T.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(L))};Fe()};var xt=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},Ut=(t,e)=>Ft(t).map(n=>({v:n,s:{...e}})),Et=(t,e={})=>{let n=[],r={...e},s="",d=()=>{s&&n.push(...Ut(s,r)),s=""},p=a=>!!a&&/[\\p{L}\\p{N}]/u.test(a);for(let a=0;a<t.length;){let o=t.slice(a),l;if(o[0]==="\\\\"&&o.length>1)s+=o[1],a+=2;else if(l=/^`([^`]+)`/.exec(o))d(),n.push(...Ut(l[1],{...r,code:!0})),a+=l[0].length;else if(l=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(o)){d();let c=l[2]??l[1].split("/").pop()??l[1];n.push(...Ut(c,{...r,link:!0})),a+=l[0].length}else if(l=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(o))d(),n.push(...Ut(`(image${l[1]?`: ${l[1]}`:""})`,{...r,i:!0})),a+=l[0].length;else if(l=/^\\[\\^([^\\]]+)\\]/.exec(o))d(),n.push({v:l[1],s:{...r,sup:!0}}),a+=l[0].length;else if(l=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(o))d(),n.push(...Et(l[1],{...r,link:!0})),a+=l[0].length;else if(l=/^<\\/?[a-zA-Z][^>]*>/.exec(o))d(),a+=l[0].length;else if(o.startsWith("**")||o.startsWith("__")){let c=o.slice(0,2);r.b||t.indexOf(c,a+2)>a+2?(d(),r.b=!r.b):s+=c,a+=2}else(o[0]==="*"||o[0]==="_")&&!(o[0]==="_"&&p(t[a-1])&&p(t[a+1]))?(r.i||t.indexOf(o[0],a+1)>a+1?(d(),r.i=!r.i):s+=o[0],a+=1):(s+=o[0],a+=1)}return d(),n},le=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:Et(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:Et(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:Et(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:Et(e[2])}:{kind:"p",runs:Et(t)}:{kind:"blank",runs:[]}},_e=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=i("code",{},e)),t.s.i&&(e=i("em",{},e)),t.s.b&&(e=i("strong",{},e)),t.s.link&&(e=i("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=i("sup",{},e)),e},de=(t,e,n)=>{let r=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,s=i("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),d=i("div",{class:"tb-rd-text"});e.marker&&d.append(i("span",{class:"tb-rd-marker",text:e.marker}));let p=null;for(let{run:a,changed:o}of n)o&&t!=="="?(p||(p=i(t==="-"?"del":"ins"),d.append(p)),p.append(_e(a))):(p=null,d.append(_e(a)));return i("div",{class:r},s,d)},ce=(t,e)=>t.map(n=>({run:n,changed:e})),pe=(t,e)=>{let n=i("div",{class:"tb-ed-diff tb-rd"}),r=xt(t),s=xt(e);return r===s?(n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n):(Nt(r,s).forEach((d,p)=>{p>0&&n.append(i("div",{class:"tb-rd-gap","aria-hidden":"true",text:"\\u22EF"}));let a=d.ops;for(let o=0;o<a.length;){let l=a[o];if(l.t==="="){let u=le(l.v);n.append(de("=",u,ce(u.runs,!1))),o++;continue}let c=[],b=[];for(;a[o]?.t==="-";)c.push(le(a[o++].v));for(;a[o]?.t==="+";)b.push(le(a[o++].v));let g=Math.min(c.length,b.length),f=c.map(u=>ce(u.runs,!0)),w=b.map(u=>ce(u.runs,!0));for(let u=0;u<g;u++){let E=c[u].runs,y=b[u].runs,$=Tt(E.map(R=>R.v),y.map(R=>R.v)),O=0,_=0,F=[],N=[];for(let R of $)R.t!=="+"&&F.push({run:E[O++],changed:R.t==="-"}),R.t!=="-"&&N.push({run:y[_++],changed:R.t==="+"});f[u]=F,w[u]=N}c.forEach((u,E)=>n.append(de("-",u,f[E]))),b.forEach((u,E)=>n.append(de("+",u,w[E])))}}),n)};var Pe={author:"Author",editor:"Editor",contributor:"Contributor"},zt=t=>{if(!t||!(t in Pe))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=Pe[t],e};var jt=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},ue=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},Gt=(t,e="")=>{try{let n=new URL(t,"https://x.invalid"),r=new URL("history",n);return r.searchParams.set("book",n.searchParams.get("book")??""),e&&r.searchParams.set("path",e),t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},qe=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(s=>s.toLowerCase());return e.find(s=>s.role&&s.role!=="contributor"&&n.includes(s.who.toLowerCase()))?.role??"contributor"},kt=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",Ue=(t,e)=>{let n=[],r=[...e].sort((s,d)=>d.date.localeCompare(s.date));for(let s of t){for(;r.length&&r[0].date>=s.date;)n.push({release:r.shift()});n.push({entry:s})}for(let s of r)n.push({release:s});return n},ze=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),je=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state);var Ge="tb-history-style",qn=30,Ke=2e4,Ye="a reader",Un=()=>{if(document.getElementById(Ge))return;let t=`#${vt}.tb-hi`,e=i("style",{id:Ge});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n${t} .tb-rd-gap { padding: 0.3rem 0; text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},zn=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),r=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return r?`Paragraph ${r[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},ht=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},pt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),r=null;try{r=await n.json()}catch{}if(!n.ok){let s=new Error(`HTTP ${n.status}`);throw s.userMessage=Pt(r),s}return r},Kt=null,We=()=>Kt?.(),Ve=t=>{if(Kt||document.getElementById(vt))return;ae(),Un();let e=document.body.style.overflow,n=null,r=0,s=i("div",{id:vt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),d=i("div",{class:"tb-hi-where",id:"tb-hi-title"},i("span",{class:"tb-hi-name",text:"Page history"}),t.title?i("span",{class:"tb-hi-page",text:t.title}):null),p=i("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},i("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),i("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),a=i("div",{class:"tb-ed-main"}),o=i("div",{class:"tb-ed-inner"});a.append(o),s.append(i("div",{class:"tb-hi-top"},d,p),a);let l=h=>i("p",{class:"tb-ed-muted",role:"status",text:h}),c=(h,m)=>{let k=i("div",{class:"tb-ed-note",role:"alert"});return k.append(i("span",{text:`${h?.userMessage||m} `}),i("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),k},b=()=>{n?.abort();let h=new AbortController;n=h;let m=setTimeout(()=>h.abort(),Ke);return{signal:h.signal,done:()=>clearTimeout(m),current:()=>n===h}},g=null,f=[],w=[],u=null,E=h=>{let m=new URL(t.endpoint,location.href);for(let[k,S]of Object.entries(h))m.searchParams.set(k,S);return m.toString()},y=h=>h.path??g?.source??t.path,$=()=>g?.published[0]??null,O=(h,m)=>{let k=i("p",{class:"tb-hi-meta"});m&&k.append(i("span",{class:"tb-hi-state",text:m})),k.append(`${ht(h.date)} \\xB7 ${h.who}`);let S=zt(h.role);return S&&k.append(" ",S),h.pr&&t.githubHref&&k.append(" \\xB7 ",i("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${h.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${h.pr}`})),k},_=(h,m,k)=>{if(!m.hidden){m.hidden=!0,k.setAttribute("aria-pressed","false");return}k.setAttribute("aria-pressed","true"),m.hidden=!1,m.textContent="",m.append(l("Loading what changed\\u2026")),t.track("page_revision_opened");let S=new AbortController,M=setTimeout(()=>S.abort(),Ke);pt(E({sha:h.sha,path:y(h)}),S.signal).then(B=>{let A=B,I=typeof A.before=="string"?A.before:"",U=typeof A.after=="string"?A.after:"";m.textContent="",A.status==="added"&&m.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let K=typeof A.previousPath=="string"&&A.previousPath!==y(h);K&&m.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${xt(I)===xt(U)?"; its text didn\\u2019t change.":"."}`})),(!K||xt(I)!==xt(U))&&m.append(pe(I,U))}).catch(B=>{m.textContent="",m.append(c(B,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(M))},F=(h,m)=>{r=a.scrollTop,o.textContent="";let k=i("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});k.addEventListener("click",()=>{n?.abort(),W()});let S=i("div",{});return o.append(k,i("div",{class:"tb-hi-banner",role:"status",text:m}),i("div",{class:"tb-hi-head"},i("h2",{text:h})),S),a.scrollTop=0,k.focus(),S},N=h=>{let m=F(h.summary,`You are reading the version of ${ht(h.date)}.`);m.append(l("Loading this version\\u2026")),t.track("page_version_read");let k=b();pt(E({sha:h.sha,path:y(h)}),k.signal).then(S=>{if(!k.current())return;let M=S.html;m.textContent="",m.append(typeof M=="string"&&M?i("div",{class:"tb-ed-panel tb-ed-preview"},ie(M)):i("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch(S=>{k.current()&&(m.textContent="",m.append(c(S,"This version couldn\\u2019t be loaded just now.")))}).finally(k.done)},R=(h,m)=>{let[k,S]=h.date<=m.date?[h,m]:[m,h],M=I=>`the version of ${ht(I.date)}${I===$()?" (the one you read now)":""}`,B=F("Compare versions",`Changes from ${M(k)} to ${M(S)}.`);B.append(l("Loading the two versions\\u2026")),t.track("page_versions_compared");let A=b();pt(E({sha:S.sha,base:k.sha,path:y(S)}),A.signal).then(I=>{if(!A.current())return;let U=I;B.textContent="",B.append(i("div",{class:"tb-hi-diff"},pe(typeof U.before=="string"?U.before:"",typeof U.after=="string"?U.after:"")))}).catch(I=>{A.current()&&(B.textContent="",B.append(c(I,"The versions couldn\\u2019t be compared just now.")))}).finally(A.done)},P=(h,m)=>{let k=i("li",{class:"tb-hi-entry"}),S=i("div",{class:"tb-hi-diff",hidden:!0}),M=i("button",{type:"button","aria-pressed":"false",text:"Show changes"});M.addEventListener("click",()=>_(h,S,M));let B=i("button",{type:"button",text:"Read this version"});B.addEventListener("click",()=>N(h));let A=i("button",{type:"button",text:u?u===h?"Cancel compare":"Compare with this":"Compare\\u2026"});A.addEventListener("click",()=>{if(!u)u=h,W();else if(u===h)u=null,W();else{let K=u;u=null,R(K,h)}});let I=i("div",{class:"tb-hi-actions"},M,B,A),U=$();if(!u&&U&&U.sha!==h.sha){let K=i("button",{type:"button",text:"Compare with now"});K.addEventListener("click",()=>R(h,U)),I.append(K)}return k.append(i("p",{class:"tb-hi-msg",text:h.summary}),O(h,m),I,S),k},J=h=>{let m=i("li",{class:"tb-hi-entry"});return m.append(i("p",{class:"tb-hi-msg",text:h.summary||kt(h)}),O({date:h.date,who:h.who?.name??"A reader",role:qe(h,[...g?.published??[],...g?.drafts??[]])},`Proposed \\xB7 ${kt(h)}`),i("div",{class:"tb-hi-actions"},i("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",text:`See #${h.number} on GitHub \\u2197`}))),m},W=()=>{if(o.textContent="",!g)return;if(u&&o.append(i("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${ht(u.date)}: pick the other version, below.`})),w.length||g.drafts.length){let m=i("ol",{class:"tb-hi-list"});for(let k of w)m.append(J(k));for(let k of g.drafts)m.append(P(k,"Being edited"));o.append(i("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},i("h2",{id:"tb-hi-editing",text:"Being edited"}),i("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),m))}let h=i("ol",{class:"tb-hi-list"});for(let m of Ue(g.published,f))"release"in m?h.append(i("li",{class:"tb-hi-release",role:"separator","aria-label":`${ue(m.release.tag)}, ${ht(m.release.date)}`,text:`${ue(m.release.tag)} \\xB7 ${ht(m.release.date)}`})):h.append(P(m.entry,void 0));o.append(i("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},i("h2",{id:"tb-hi-published",text:"Published"}),i("p",{text:g.published.length?"What readers have seen, newest first.":"This page has no published versions yet."}),h)),a.scrollTop=r},z=h=>{if(h.key==="Escape"){h.preventDefault(),V();return}if(h.key!=="Tab")return;let m=Array.from(s.querySelectorAll("a[href], button, [tabindex]")).filter(S=>!S.disabled&&S.tabIndex>=0&&!S.closest("[hidden]"));if(!m.length)return;let k=m.indexOf(document.activeElement);(h.shiftKey?k<=0:k===-1||k===m.length-1)&&(h.preventDefault(),m[h.shiftKey?m.length-1:0].focus())},V=()=>{Kt=null,n?.abort(),document.removeEventListener("keydown",z,!0),s.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};p.addEventListener("click",V),document.addEventListener("keydown",z,!0),Kt=V,document.body.style.overflow="hidden",document.body.append(s),p.focus(),t.track("page_history_opened"),o.append(l("Loading this page\\u2019s history\\u2026"));let q=b(),ut=t.bookHistoryUrl?pt(t.bookHistoryUrl,q.signal).then(h=>{let m=jt(h),k=m?.pages.find(S=>S.source===t.path)??null;return m&&(f=m.releases),k}):Promise.resolve(null),nt=Gt(t.endpoint,t.path),Q=nt?pt(nt,q.signal).then(h=>(h?.items??[]).filter(m=>m&&typeof m.url=="string")).catch(()=>[]):Promise.resolve([]);ut.catch(()=>null).then(async h=>{if(h)return h;let m=await pt(t.listUrl,q.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(m)?m:[]).map((k,S,M)=>({sha:k.sha,date:k.date,who:k.who,role:null,summary:zn(k.message??"",S===M.length-1),...k.path!==t.path?{path:k.path}:{}})),drafts:[],releases:{}}}).then(async h=>{g=h;let m=[...h.published,...h.drafts],k=[...new Set(m.filter(A=>A.who===Ye).map(A=>A.sha))].slice(0,qn),S=k.length?pt(E({shas:k.join(",")}),q.signal).then(A=>A?.names??{}).catch(()=>({})):Promise.resolve({}),[M,B]=await Promise.all([S,Q]);for(let A of m){let I=M[A.sha];A.who===Ye&&typeof I=="string"&&I.trim()&&(A.who=I.trim().slice(0,80))}w=B,q.current()&&W()}).catch(h=>{q.current()&&(o.textContent="",o.append(c(h,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(q.done)};var Ze="http://www.w3.org/2000/svg",Xe={proposed:"Proposed",drafts:"Being edited",published:"Published"},jn=(t,e)=>{let n=r=>{let s=r?.querySelector("title")?.textContent;if(s){for(let d of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))d.removeAttribute("aria-current");r.setAttribute("aria-current","true"),e.textContent=s}};t.addEventListener("click",r=>n(r.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",r=>n(r.target.closest(".tb-swim-dot")))},Gn=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),r=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!r)return;let[s,d]=n.map(a=>({t:Date.parse(a.textContent??""),x:Number(a.getAttribute("x"))}));if(!Number.isFinite(s.t)||!Number.isFinite(d.t)||d.t<=s.t)return;let p=Number(r.getAttribute("y"))+Number(r.getAttribute("height"))/2;for(let a of e){let o=Math.min(Math.max(Date.parse(a.date),s.t),d.t),l=document.createElementNS(Ze,"circle");l.setAttribute("class","tb-swim-dot"),l.setAttribute("data-lane","0"),l.setAttribute("cx",(s.x+(o-s.t)/(d.t-s.t)*(d.x-s.x)).toFixed(1)),l.setAttribute("cy",String(p)),l.setAttribute("r","5"),l.setAttribute("tabindex","0");let c=document.createElementNS(Ze,"title");c.textContent=`${a.date} \\xB7 ${kt(a)}: ${a.summary} (${a.who?.name??"a reader"})`,l.append(c),t.append(l)}},be=(t,e,n,r)=>{let s=i("select",{class:"tb-bh-select"});s.append(i("option",{value:"",text:"Any"}));for(let[d,p]of n)s.append(i("option",{value:d,text:p}));return s.addEventListener("change",()=>r(e,s.value)),i("label",{class:"tb-bh-filter"},i("span",{text:t}),s)},Je=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let r=document.querySelector("svg.tb-swimlane");if(r){let y=i("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});r.closest("figure")?.append(y),jn(r,y)}let s=new AbortController;setTimeout(()=>s.abort(),2e4);let d=jt(await pt(e,s.signal).catch(()=>null));if(!d)return;let p=n?Gt(n):"",a=p?await pt(p,s.signal).then(y=>(y?.items??[]).filter($=>$&&typeof $.url=="string")).catch(()=>[]):[];r&&Gn(r,a);let o=new Map(d.pages.map(y=>[y.source,y])),l=[...a.map(y=>{let $=y.files?.map(O=>o.get(O)).find(Boolean);return{date:y.date,who:y.who?.name??"A reader",role:"contributor",summary:y.summary||kt(y),state:"proposed",page:$?.source??"",pageTitle:$?.title??"",href:y.url,ref:`#${y.number}`}}),...ze(d).map(y=>({date:y.date,who:y.who,role:y.role,summary:y.summary,state:y.state,page:y.page.source,pageTitle:y.page.title,href:y.page.path,ref:y.pr?`#${y.pr}`:""}))],c={page:"",person:"",state:""},b=i("ol",{class:"tb-bh-list"}),g=i("p",{class:"tb-bh-count",role:"status"}),f=()=>{b.textContent="";let y=l.filter($=>je(c,$));g.textContent=`${y.length} change${y.length===1?"":"s"}`;for(let $ of y){let O=i("p",{class:"tb-bh-meta"},i("span",{class:`tb-bh-state tb-bh-${$.state}`,text:Xe[$.state]}),` ${ht($.date)} \\xB7 ${$.who}`),_=zt($.role);_&&O.append(" ",_),$.state==="proposed"&&O.append(" \\xB7 ",i("a",{href:$.href,target:"_blank",rel:"noopener noreferrer",text:`${$.ref} on GitHub \\u2197`})),b.append(i("li",{class:"tb-bh-item"},i("p",{class:"tb-bh-summary",text:$.summary}),$.pageTitle?i("p",{class:"tb-bh-page"},$.state==="proposed"?$.pageTitle:i("a",{href:$.href,text:$.pageTitle})):null,O))}},w=(y,$)=>{Object.assign(c,{[y]:$}),f()},u=[...new Set(l.map(y=>y.who))].sort((y,$)=>y.localeCompare($)),E=d.pages.filter(y=>y.published.length||y.drafts.length).map(y=>[y.source,y.title]);t.append(i("h2",{text:"All changes"}),i("div",{class:"tb-bh-filters"},be("Chapter","page",E,w),be("Person","person",u.map(y=>[y,y]),w),be("State","state",Object.entries(Xe),w)),g,b),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),f()};var tn={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},en=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),Kn=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(r=>`${r.charAt(0).toUpperCase()}.`).join(" ")}`},Yn=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,Qe=t=>/[.?!]$/.test(t)?t:`${t}.`,nn=t=>{let e=Yn(en(t.authors).map(Kn)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),r=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",s=[],d=r?[{text:`${Qe(r)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)s.push({text:`${Qe(e)} (n.d.). `},...d);else if(d.length){let[p,...a]=d;s.push({...p,text:p.text.replace(/ $/,"")},{text:" (n.d.). "},...a)}else s.push({text:"(n.d.). "});return s.push({text:`Retrieved ${n}, from ${t.url}`}),s},he=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=tn[t.licence],r=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&r.push({text:` by ${en(t.authors).join(", ")}`}),e&&t.bookTitle&&r.push({text:", from "},{text:t.bookTitle,italic:!0}),r.push({text:`, ${t.url}`}),n?r.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&r.push({text:`, is licensed under ${t.licence}`}),r.push({text:"."}),r},me=t=>t.map(e=>e.text).join(""),fe=t=>tn[t]?.name??t,Yt=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],on=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},Wn=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function rn(t,e,n,r=0){let s=e!=="book"&&t.chapter&&t.styles.chapter,d=s?t.chapter:t.book,p=s?t.styles.chapter:t.styles.book,a=e==="paragraph"&&s?r:0,o=a?`${d.URL}#p${a}`:d.URL,l=Wn(n),c={};for(let[g]of Yt)c[g]=(p[g]??[]).map(f=>({...f,text:f.text.replaceAll("{accessed}",l).replace(d.URL,a?`${o} (para. ${a})`:o)}));return{item:{...d,id:o,URL:o,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...a?{note:`para. ${a}`}:{}},styles:c}}var At=t=>t?.["date-parts"]?.[0]??[],mt=t=>String(t??"").padStart(2,"0"),sn=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),Vn=t=>{let e=s=>s.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),r=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(s=>s.length>3)??"");return`${n}${At(t.issued)[0]??""}${r}`.toLowerCase()||"citation"},Zn={chapter:"incollection",book:"book",report:"techreport"},ge=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function an(t){let[e,n,r]=At(t.issued),[s,d,p]=At(t.accessed),a=c=>c?ge(c):void 0,l=[["author",t.author?.map(c=>c.literal?`{${ge(c.literal)}}`:ge(sn(c))).join(" and ")],["title",a(t.title)],["booktitle",t.type==="chapter"?a(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",a(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&r?`${e}-${mt(n)}-${mt(r)}`:void 0],["url",t.URL],["urldate",s?`${s}-${mt(d)}-${mt(p)}`:void 0],["doi",t.DOI],["language",a(t.language)],["note",a(t.note)],["keywords",a(t.keyword)],["abstract",a(t.abstract)]].filter(([,c])=>c).map(([c,b])=>`  ${c} = {${b}}`).join(`,\n`);return`@${Zn[t.type]??"misc"}{${Vn(t)},\n${l}\n}\n`}var Xn={chapter:"CHAP",book:"BOOK",report:"RPRT"};function ln(t){let[e,n,r]=At(t.issued),[s,d,p]=At(t.accessed);return[["TY",Xn[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(o=>["AU",sn(o)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${mt(n)}/${mt(r)}`:void 0],["UR",t.URL],["Y2",s?`${s}/${mt(d)}/${mt(p)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(o=>["KW",o]),["N1",t.note]].filter(([,o])=>o).map(([o,l])=>`${o}  - ${l.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var dn=t=>JSON.stringify([t],null,2)+`\n`;var it=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},Jn=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},Wt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",p=u=>{let E=u?.userMessage,y=typeof E=="string"?E.trim():"";return y?y.slice(0,200):null},a=()=>{if(document.getElementById(e))return;let u=document.createElement("style");u.id=e,u.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(u)},o=(u,E,y,$=!1)=>{let O=document.createElement("div");O.className="tb-sg-field";let _=document.createElement("label");if(_.setAttribute("for",u),_.textContent=E,$){let N=document.createElement("span");N.className="tb-sg-opt",N.textContent=" (optional)",_.append(N)}let F=document.createElement("p");return F.className="tb-sg-err",F.id=u+"-err",y.id=u,!$&&!y.readOnly&&(y.required=!0),O.append(_,y,F),{wrap:O,control:y,err:F,hintId:null}},l=u=>{let E=[];u.err.textContent&&E.push(u.err.id),u.hintId&&E.push(u.hintId),E.length?u.control.setAttribute("aria-describedby",E.join(" ")):u.control.removeAttribute("aria-describedby")},c=(u,E)=>{u.control.setAttribute("aria-invalid","true"),u.err.textContent=E,l(u)},b=u=>{u.control.hasAttribute("aria-invalid")&&(u.control.removeAttribute("aria-invalid"),u.err.textContent="",l(u))},g=null,f=(u,E,y,$)=>{if(g)return;a();let O=y,_=document.body.style.overflow,F=null,N=!1,R=document.createElement("div");R.id=t;let P=document.createElement("div");P.className="tb-sg-dialog",P.tabIndex=-1,P.setAttribute("role","dialog"),P.setAttribute("aria-modal","true"),P.setAttribute("aria-labelledby",n);let J=document.createElement("div");J.className="tb-sg-head";let W=document.createElement("h2");W.id=n,W.textContent=$?`Note to the authors about \\xB6${$.paragraph}`:"Suggest an edit";let z=document.createElement("button");z.type="button",z.className="tb-sg-close",z.textContent="\\xD7",z.setAttribute("aria-label","Close suggestion form"),J.append(W,z);let V=document.createElement("form");V.noValidate=!0;let q=document.createElement("p");q.className="tb-sg-intro",q.textContent=$?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let ut=document.createElement("blockquote");ut.className="tb-sg-quote",ut.textContent=$?.quote??"",ut.hidden=!$?.quote;let nt=Jn(),Q=document.createElement("input");Q.type="text",Q.name="name",Q.autocomplete="name";let h=o("tb-sg-name","Your name",Q),m=document.createElement("p");if(m.className="tb-sg-count",m.id="tb-sg-credit",m.textContent="If the authors accept your suggestion, you\'ll be credited by this name.",h.wrap.append(m),h.hintId=m.id,l(h),nt){Q.value=nt.name||nt.login;let C=document.createElement("p");C.className="tb-sg-count",C.id="tb-sg-who",C.textContent=`Signed in as @${nt.login}: GitHub tells you when the authors answer.`,h.wrap.append(C),h.hintId=`${m.id} ${C.id}`,l(h)}let k=document.createElement("input");k.type="text",k.name="path",k.readOnly=!0,k.value=E;let S=o("tb-sg-path","Page you are editing",k),M=document.createElement("textarea");M.name="suggestion",M.rows=6,M.maxLength=5e3;let B=o("tb-sg-suggestion","Your suggested change",M),A=document.createElement("p");A.className="tb-sg-count",A.id="tb-sg-count",B.hintId=A.id;let I=()=>{let C=5e3-M.value.length;A.textContent=C+" character"+(C===1?"":"s")+" remaining"};I(),l(B),M.addEventListener("input",()=>{I(),b(B)}),B.wrap.append(A);let U=document.createElement("textarea");U.name="reasoning",U.rows=3;let K=o("tb-sg-reasoning","Why",U,!0);h.control.addEventListener("input",()=>b(h));let bt=document.createElement("div");bt.className="tb-sg-hp",bt.setAttribute("aria-hidden","true");let ft=document.createElement("label");ft.setAttribute("for","tb-sg-website"),ft.textContent="Leave this field empty";let tt=document.createElement("input");tt.type="text",tt.name="website",tt.id="tb-sg-website",tt.tabIndex=-1,tt.autocomplete="off",tt.setAttribute("aria-hidden","true"),bt.append(ft,tt);let wt=document.createElement("div");wt.className="tb-sg-actions";let lt=document.createElement("button");lt.type="submit",lt.className="tb-sg-btn",lt.textContent="Send suggestion";let dt=document.createElement("button");dt.type="button",dt.className="tb-sg-quiet",dt.textContent="Cancel",wt.append(lt,dt),V.append(q,ut,h.wrap,S.wrap,B.wrap,K.wrap,bt,wt);let ot=document.createElement("div");ot.className="tb-sg-pane",ot.tabIndex=-1,ot.hidden=!0,P.append(J,V,ot),R.append(P);let Mt=()=>{ot.hidden=!0,V.hidden=!1,M.focus()},yt=(C,j,D,ct=!1)=>{if(!R.isConnected)return;ot.textContent="";let Y=document.createElement("p");Y.className="tb-sg-pane-title",Y.textContent=C;let et=document.createElement("p");if(et.textContent=j,ot.append(Y,et),D){let at=document.createElement("a");at.href=D,at.target="_blank",at.rel="noopener",at.textContent="View your suggestion on GitHub";let rt=document.createElement("p");rt.append(at),ot.append(rt)}let Z=document.createElement("button");Z.type="button",Z.className=ct?"tb-sg-btn":"tb-sg-quiet",Z.textContent=ct?"Back to my suggestion":"Close",Z.addEventListener("click",ct?Mt:()=>g?.()),ot.append(Z),V.hidden=!0,ot.hidden=!1,ot.focus()},Qt=()=>Array.prototype.filter.call(P.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]")),st=C=>{if(C.key==="Escape"){C.preventDefault(),g?.();return}if(C.key!=="Tab")return;let j=Qt();if(!j.length){C.preventDefault(),P.focus();return}let D=j.indexOf(document.activeElement);C.shiftKey?D<=0&&(C.preventDefault(),j[j.length-1].focus()):(D===-1||D===j.length-1)&&(C.preventDefault(),j[0].focus())};g=()=>{if(g=null,F)try{F.abort()}catch{}document.removeEventListener("keydown",st,!0),R.remove(),document.body.style.overflow=_,O.isConnected&&O.focus()},R.addEventListener("mousedown",C=>{C.target===R&&g?.()}),z.addEventListener("click",()=>g?.()),dt.addEventListener("click",()=>g?.()),document.addEventListener("keydown",st,!0);let $t=()=>{let C=null,j=(D,ct)=>{c(D,ct),C||(C=D.control)};for(let D of[h,B])b(D);return Q.value.trim()||j(h,"Please add your name."),M.value.trim()?M.value.length>5e3&&j(B,"Please keep the suggestion under 5000 characters."):j(B,"Please describe the change you would like."),C&&C.focus(),!C},Lt=C=>{N=C,lt.disabled=C,lt.textContent=C?"Sending\\u2026":"Send suggestion"};V.addEventListener("submit",C=>{if(C.preventDefault(),N||!$t())return;let j={name:Q.value.trim(),suggestion:M.value.trim(),reasoning:U.value.trim(),path:E,website:tt.value,...$?{paragraph:$.paragraph,quote:$.quote,page:$.page}:{},...nt?{identity:nt.token}:{}};if(j.website){yt("Thank you","Your suggestion has been received.");return}Lt(!0);let D=F=new AbortController,ct=setTimeout(()=>D.abort(),1e4);fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(j),signal:D.signal}).then(async Y=>{let et=null;try{et=await Y.json()}catch{et=null}if(!Y.ok){let Z=new Error(et?.error||"HTTP "+Y.status);throw Z.userMessage=p(et),Z}return et}).then(Y=>{it("suggest_edit_submitted",{outcome:"success"});let et=Y?.issueUrl;yt("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof et=="string"?et:null)}).catch(Y=>{it("suggest_edit_submitted",{outcome:"error"}),yt("That did not go through",Y&&Y.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(ct),F===D&&(F=null),lt.isConnected?Lt(!1):N=!1})}),document.body.style.overflow="hidden",document.body.appendChild(R),Q.focus(),it($?"section_note_opened":"suggest_edit_opened")},w=((u,E,y,$)=>{try{f(u,E,y,$)}catch{g=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return w.closeIfOpen=()=>g?.(),w}catch{return null}})(),cn="tb-pedit-style",un=()=>{if(document.getElementById(cn))return;let t=document.createElement("style");t.id=cn,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},bn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",Ne),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},Qn="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",to=t=>{let e=(t.textContent??"").replace(/\\s+/g," ").trim();if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},eo=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(s=>!s.closest(".popover")&&!s.querySelector(":scope > button.tb-pnote"));if(!n.length)return;un();let r=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let s of n){let d=Number(s.dataset.pnum),p=bn();p.className="tb-pnote",p.title=`Note to the authors about \\xB6${d}`,p.querySelector("path").setAttribute("d",Qn),p.addEventListener("click",a=>{a.stopPropagation(),Xt(p,e,`Continue: note on \\xB6${d}`,()=>t({paragraph:d,quote:to(s),page:r},p))}),s.append(p)}},Vt=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(Vt))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var no=t=>typeof t.showPopover=="function",Zt=new Set,gn=(t,e)=>{let n=t.closest(".tb-header")??t,s=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),d=t.getBoundingClientRect(),p=document.documentElement.clientWidth,a=e.style;a.boxSizing="border-box",a.top=`${Math.max(s.bottom,0)+6}px`,a.maxHeight=`${Math.max(window.innerHeight-Math.max(s.bottom,0)-12,120)}px`;let o=()=>{a.left=`${Math.max(s.left,0)}px`,a.right="auto",a.width=`${Math.min(s.width,p)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return o();a.left="auto",a.right=`${Math.max(p-d.right,0)}px`,a.width="",e.getBoundingClientRect().left<s.left&&o()},we=()=>{for(let t of Array.from(Zt))gn(t.button,t.panel)};window.addEventListener("resize",we);window.addEventListener("scroll",we,{passive:!0});var hn=(t,e)=>{e.hidden=!1,no(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",Zt.add({button:t,panel:e}),gn(t,e))},mn=t=>{for(let e of Array.from(Zt))e.panel===t&&Zt.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},ye=(t,e,n,r)=>{let s=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(o=>!o.hidden&&!o.closest("[hidden]")),d={d:null,button:t,panel:e},p={open(){for(let l of Array.from(Vt))l!==d&&l.d.close(!1);hn(t,e),t.setAttribute("aria-expanded","true"),Vt.add(d),(n?s()[0]:e.querySelector("input:checked")??s()[0])?.focus()},close(o=!0){e.hidden||(mn(e),t.setAttribute("aria-expanded","false"),Vt.delete(d),o&&t.focus())}};d.d=p,t.addEventListener("click",()=>{if(!e.hidden)return p.close();r?r(p.open):p.open()});let a=o=>{if(o.key==="Escape"&&!e.hidden){o.preventDefault(),o.stopPropagation(),p.close(!0);return}if(!n||e.hidden||!e.contains(o.target))return;let l=s(),c=l.indexOf(document.activeElement),b=g=>{o.preventDefault(),l[(g+l.length)%l.length]?.focus()};o.key==="ArrowDown"?b(c+1):o.key==="ArrowUp"?b(c-1):o.key==="Home"?b(0):o.key==="End"?b(l.length-1):o.key==="Tab"&&p.close(!1)};return e.addEventListener("keydown",a),t.addEventListener("keydown",a),n&&e.addEventListener("click",o=>{let l=o.target.closest(\'[role="menuitem"]\');if(l){if(l.getAttribute("aria-disabled")==="true"){o.preventDefault();return}p.close(!1)}}),p},v=(t,e={},...n)=>{let r=document.createElement(t);for(let[s,d]of Object.entries(e))s==="text"?r.textContent=d:s==="class"?r.className=d:r.setAttribute(s,d);for(let s of n)s!==null&&r.append(s);return r},Jt=(t,e,...n)=>{let r=v("dialog",{class:"tb-dialog","aria-label":t}),s=v("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});s.addEventListener("click",()=>r.close()),r.append(s,...n);let d=null;return r.addEventListener("close",()=>{r.remove(),d?d():e.isConnected&&e.focus()}),document.body.append(r),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),{d:r,closeThen:p=>(d=p,r.close())}},pn=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,hn(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",mn(e),e.hidden=!1)},4e3))},fn=(t,e,n)=>{let r=()=>{let s=v("textarea",{readonly:""});s.value=t,s.style.position="fixed",s.style.opacity="0",document.body.append(s),s.select();let d=!1;try{d=document.execCommand("copy")}catch{d=!1}return s.remove(),d};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>r()?e():n()):r()?e():n()},yn="tb-contribute-explained",xn=!1,oo=()=>{if(xn)return!0;try{return localStorage.getItem(yn)==="1"}catch{return!1}},Ht={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},ro=["no","one","two","three"],so="https://hypothes.is/logout",wn=(t,e,n)=>{xn=!0;try{localStorage.setItem(yn,"1")}catch{}let r=({title:b,what:g,who:f,account:w,link:u,switchNote:E})=>v("section",{class:"tb-route"},v("h3",{text:b}),v("p",{text:g}),v("p",{},v("strong",{text:"Who sees it: "}),f),v("p",{},v("strong",{text:"Account: "}),w,u?" ":null,u?v("a",{href:u[1],target:"_blank",rel:"noopener noreferrer",text:u[0]}):null),E?v("p",{},`${E} `,v("a",{href:so,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),s=v("div",{class:"tb-dialog-row"}),d=document.querySelector(".tb-header"),p=window.tbAnnotations,a=(d?.dataset.routes??"comment").split(" ").filter(b=>b!=="comment"||p).map(b=>b==="comment"&&p?.groupsOnly?"groupComment":b).filter(b=>b in Ht),o=a.includes("edit")||a.includes("note")?"book":"edition",l=Jt("How contributing works",t,v("h2",{text:"How contributing works"}),v("p",{text:a.length===1?`There is one way to help with this ${o}: ${Ht[a[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${ro[a.length]??a.length} ways to help with this ${o}. They differ in who sees what you write, and in which account you need.`}),...a.map(b=>r(Ht[b])),v("p",{},v("a",{href:e,text:"More about commenting and contributing"})),...d?.dataset.credits?[v("p",{},v("a",{href:`${d.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],s),c=v("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>l.d.close()),n){let b=v("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});b.addEventListener("click",()=>l.closeThen(n.run)),s.append(c,b),b.focus()}else s.append(c),c.focus()},Xt=(t,e,n,r)=>oo()?r():wn(t,e,{label:n,run:r}),ao=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},io=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(d=>d.id===e):void 0;if(n)return Number(n.dataset.pnum);let r=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,s=t.find(d=>{let p=d.getBoundingClientRect();return p.bottom>r+8&&p.top<window.innerHeight});return Number((s??t[0]).dataset.pnum)||0},lo=(t,e,n)=>{let r=URL.createObjectURL(new Blob([t],{type:e})),s=v("a",{href:r,download:n});document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)},co=(t,e,n,r)=>{let s=t.chapter?io():0,d=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),p=[...s?[["paragraph",`This paragraph (\\xB6${s})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${d}`]],a=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),o=s&&a?"paragraph":t.chapter?"chapter":"book",l="apa";try{let F=localStorage.getItem("tb-cite-style");F&&Yt.some(([N])=>N===F)&&(l=F)}catch{}let c=v("p",{class:"tb-cite-text","aria-live":"polite"}),b=v("span",{class:"tb-cite-said",role:"status"}),g=()=>rn(t,o,new Date,s),f=()=>{b.textContent="",c.textContent="";for(let F of g().styles[l])c.append(F.italic?v("i",{text:F.text}):F.text)},w=(F,N,R,P,J)=>{let W=v("div",{class:"tb-seg"});for(let[z,V]of R){let q=v("input",{type:"radio",name:F,value:z});q.checked=P()===z,q.addEventListener("change",()=>{J(z),f()}),W.append(v("label",{},q,V))}return v("fieldset",{},v("legend",{text:N}),W)},u=v("button",{type:"button",class:"tb-btn",text:"Copy"});u.addEventListener("click",()=>{fn(me(g().styles[l]),()=>b.textContent="Copied",()=>b.textContent="Couldn\'t copy: select the text instead"),it("citation_copied",{style:l,scope:o})});let E=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",y=[["BibTeX","bib","application/x-bibtex",an],["RIS","ris","application/x-research-info-systems",ln],["CSL-JSON","json","application/vnd.citationstyles.csl+json",dn]],$=v("div",{class:"tb-dialog-row tb-cite-files"},v("span",{class:"tb-cite-said",text:"Download"}));for(let[F,N,R,P]of y){let J=v("button",{type:"button",class:"tb-btn",text:F});J.addEventListener("click",()=>{let{item:W}=g();lo(P(W),R,`${o==="book"?"book":E}${o==="paragraph"?`-p${s}`:""}.${N}`),it("citation_downloaded",{format:N,scope:o})}),$.append(J)}let O=fe(e.dataset.licence??""),_=v("p",{class:"tb-cite-text"});for(let F of r())_.append(F.italic?v("i",{text:F.text}):F.text);f(),Jt("Cite",n,v("h2",{text:"Cite"}),w("tb-cite-scope","What",p,()=>o,F=>o=F),w("tb-cite-style","Style",Yt,()=>l,F=>{l=F;try{localStorage.setItem("tb-cite-style",l)}catch{}}),c,v("div",{class:"tb-dialog-row"},b,u),$,v("h3",{text:O?`Attribution (${O})`:"Attribution"}),_)},po=(t,e)=>{let n={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:ao(),accessed:new Date},r=a=>{let o=v("p",{class:"tb-cite-text"});for(let l of a)o.append(l.italic?v("i",{text:l.text}):l.text);return o},s=(a,o)=>{let l=v("span",{class:"tb-cite-said",role:"status"}),c=v("button",{type:"button",class:"tb-btn",text:"Copy"});return c.addEventListener("click",()=>fn(me(o),()=>l.textContent="Copied",()=>l.textContent="Couldn\'t copy: select the text instead")),v("section",{},v("h3",{text:a}),r(o),v("div",{class:"tb-dialog-row"},l,c))},d=on(document);if(d)return co(d,t,e,()=>he(n));let p=fe(n.licence);Jt("Cite this page",e,v("h2",{text:"Cite this page"}),s("APA 7",nn(n)),s(p?`Attribution (${p})`:"Attribution",he(n)))},uo=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},bo=(t,e,n,r)=>{let s=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],d=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),p=(o,l,c)=>{let b=s.filter(([g])=>l?.[g]).map(([g,f])=>{let w=v("a",{class:"tb-btn",href:l[g],download:"",text:f});return w.addEventListener("click",()=>it("download",{format:g,scope:c})),w});return b.length?[v("h3",{text:o}),v("div",{class:"tb-dialog-row tb-cite-files"},...b)]:[]},a=v("button",{type:"button",class:"tb-btn",text:"Markdown"});a.addEventListener("click",r),Jt("Download",n,v("h2",{text:"Download"}),...p("This page",t.chapter,"chapter"),...p(`Whole ${d}`,t.book,"book"),v("h3",{text:"Source"}),v("div",{class:"tb-dialog-row tb-cite-files"},a))},go=(t,e,n)=>{let r=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&r.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let s=v("p",{class:"tb-panel-note",role:"status"});for(let[d,p,a]of r){let o=v("div",{class:"tb-seg"});for(let[c,b]of a){let g=v("input",{type:"radio",name:`tb-pref-${d}`,value:c});g.checked=e.get(d)===c,g.addEventListener("change",()=>{if(d==="annotations"&&n){if(s.textContent="",c==="on")n.enable();else if(n.disable().reload){let f=v("button",{type:"button",class:"tb-btn",text:"Reload"});f.addEventListener("click",()=>location.reload()),s.append("Highlights hidden. The annotation tab goes away when the page reloads.",f)}return}e.set(d,c),d==="numbers"&&it("paragraph_numbers_toggled",{to:c})}),o.append(v("label",{},g,b))}let l=v("fieldset",{},v("legend",{text:p}),o);d==="annotations"&&l.append(s),d==="width"&&ho(t,l),t.append(l)}},ho=(t,e)=>{let n=s=>v("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${s}) * var(--tb-size-body) * var(--tb-text-scale))`}),r=()=>{let s=document.querySelector("article");if(!s?.parentElement||t.hidden)return;let d=n("--tb-measure-standard-em"),p=n("--tb-measure-wide-em");s.parentElement.append(d,p);let a=d.getBoundingClientRect().width,o=p.getBoundingClientRect().width;d.remove(),p.remove(),e.hidden=!(o-a>=16)};new MutationObserver(r).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",r)},xe=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,mo=t=>{let e=!1,n=()=>{e=!1;let s=t.getBoundingClientRect(),d=document.documentElement.style;d.setProperty("--tb-hdr-h",`${Math.round(s.height)}px`),d.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(s.bottom))}px`)},r=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),typeof ResizeObserver=="function"&&new ResizeObserver(r).observe(t)},ve=null;window.addEventListener("popstate",()=>ve?.(location.hash,!1));var fo=(t,e,n,r,s)=>{let d={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:s,track:it};t.addEventListener("click",o=>{if(o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey){it("edit_on_github_clicked");return}o.preventDefault(),qt({...d,mode:"page",trigger:n})});let p=new Map,a=Array.from(document.querySelectorAll("[data-pnum]")).filter(o=>!o.closest(".popover")&&!o.querySelector(":scope > button.tb-pedit"));a.length&&un();for(let o of a){let l=bn();l.addEventListener("click",c=>{c.stopPropagation(),Xt(l,r,`Continue: edit \\xB6${o.dataset.pnum}`,()=>qt({...d,mode:"paragraph",para:o,trigger:l}))}),o.append(l),p.set(o.dataset.pnum??"",{p:o,b:l})}ve=(o,l)=>{let c=St.exec(o);if(!c)return;let b=c[1]?p.get(c[1]):void 0;qt(b?{...d,mode:"paragraph",para:b.p,trigger:b.b,push:l}:{...d,mode:"page",trigger:n,push:l})}},yo=(t,e,n)=>{t.addEventListener("click",r=>{r.button!==0||r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||(r.preventDefault(),Ve({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:it}))})},xo=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),r=()=>t.scrollWidth>t.clientWidth+1,s=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,d=s?.querySelector(".home-link")?s:null,p=t.querySelector(".tb-hdr-label"),a=()=>!!p&&getComputedStyle(p).position!=="absolute",o=t.querySelector(".tb-hdr-where"),l=f=>!!f&&f.scrollWidth>f.clientWidth+1,c=f=>!r()&&a()===f&&!l(o)&&!Array.from(o?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(l),b=f=>{d?.classList.toggle("tb-logo-full",f),d?.classList.toggle("tb-logo-icon",!f)},g=()=>{let f=!!e&&!!n&&t.dataset.tbHasReader==="1";b(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),f&&(e.hidden=!1,n.hidden=!0),r()&&t.classList.add("tb-hdr-icons"),r()&&(t.classList.add("tb-hdr-tight"),f&&(e.hidden=!0,n.hidden=!1));let w=a();d&&c(w)&&(b(!0),c(w)||b(!1)),we()};if(g(),window.addEventListener("resize",g),document.fonts?.ready.then(g),typeof ResizeObserver=="function"){let f=new ResizeObserver(()=>requestAnimationFrame(g));f.observe(t);let w=t.querySelector(".tb-hdr-actions");w&&f.observe(w)}return g},wo=t=>{let e=o=>t.querySelector(o),n=t.dataset.howTo??"/how-to-comment",r=window,s=e("[data-tb-contribute]"),d=e("[data-tb-more]"),p=o=>{try{o()}catch{}};p(()=>{let o=e("[data-tb-search]"),l=document.querySelector(".search .search-button");!o||!l||(o.addEventListener("click",()=>l.click()),o.hidden=!1)}),p(()=>{let o=e("[data-tb-menu]"),l=document.querySelector(".explorer"),c=l?.querySelector(".mobile-explorer");if(!o||!l||!c)return;let b=t.parentElement;b?.classList.contains("tb-header-slot")&&b.prepend(o);let g=l.querySelector(".explorer-content");g?.id&&o.setAttribute("aria-controls",g.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let f=o.querySelector(".tb-hdr-label"),w=()=>!l.classList.contains("collapsed"),u=()=>{let E=w();o.setAttribute("aria-expanded",String(E)),o.classList.toggle("tb-closes",E),f&&(f.textContent=E?"Close menu":"Menu")};new MutationObserver(u).observe(l,{attributes:!0,attributeFilter:["class"]}),o.addEventListener("click",()=>{w()||r.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",E=>{E.key!=="Escape"||!w()||!xe()||(c.click(),o.focus())}),u(),o.hidden=!1}),p(()=>{let o=e("[data-tb-reader]"),l=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!o||!l||!c)return;let b=()=>o.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",b),o.addEventListener("click",()=>c.click()),l.addEventListener("click",()=>c.click()),b(),t.dataset.tbHasReader="1",o.hidden=!1});let a=()=>{it("annotation_badge_clicked"),r.tbAnnotations.open().then(o=>{o||pn("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};p(()=>{if(!r.tbAnnotations){let c=e("[data-tb-comment]");if(c&&window.tbCommentsComing){let b=c.querySelector(".tb-mi-t"),g=c.querySelector(".tb-mi-s");b&&(b.textContent=Ht.groupComment.title),g&&(g.textContent="Coming soon for classes"),c.setAttribute("aria-disabled","true"),c.hidden=!1}return}let o=e("[data-tb-annotate]");if(o){let c=o.querySelector(".tb-hdr-label"),b=()=>xe()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),g=()=>{let w=b();o.classList.toggle("tb-closes",w),c&&(c.textContent=w?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",g),window.addEventListener("resize",g);let f=null;o.addEventListener("pointerdown",()=>f=b(),!0),o.addEventListener("click",()=>{let w=f??b();if(f=null,w)return r.tbAnnotations.close?.();let u=document.querySelector(".explorer");u&&!u.classList.contains("collapsed")&&xe()&&u.querySelector(".mobile-explorer")?.click(),Xt(o,n,"Continue: open annotations",a)}),o.querySelector(".tb-anno-count")||o.append(v("span",{class:"tb-anno-count"})),o.hidden=!1}let l=e("[data-tb-comment]");if(l){if(l.addEventListener("click",a),r.tbAnnotations.groupsOnly){let c=l.querySelector(".tb-mi-t"),b=l.querySelector(".tb-mi-s");c&&(c.textContent=Ht.groupComment.title),b&&(b.textContent="Hypothes.is account \\xB7 only your group sees it")}l.hidden=!1}}),p(()=>{let o=e("#tb-contribute-menu");if(!s||!o)return;ye(s,o,!0,w=>Xt(s,n,"Continue to Contribute",w)),e("[data-tb-explain]")?.addEventListener("click",()=>wn(s,n));let l=e("button.tb-suggest-btn"),c=l?.dataset.endpoint,b=l&&c&&Wt?()=>Wt(c,l.dataset.path??"",s):void 0,g=e("a.edit-on-github"),f=g?.dataset.editEndpoint;if(g&&f){if(fo(g,f,s,n,b),St.test(location.hash)){let w=location.hash,u=window.history.state?.tbEditor===!0;u||window.history.replaceState(window.history.state,"",location.pathname+location.search),ve?.(w,!u)}}else g?.addEventListener("click",()=>it("edit_on_github_clicked"));l&&b&&(l.addEventListener("click",b),l.hidden=!1,eo((w,u)=>Wt(c,l.dataset.path??"",u,w),n)),s.hidden=!1}),p(()=>{let o=e("[data-tb-appearance]"),l=e("#tb-appearance");!o||!l||!r.tbPrefs||(go(l,r.tbPrefs,r.tbAnnotations),ye(o,l,!1),o.hidden=!1)}),p(()=>{let o=e("#tb-more-menu");if(!d||!o)return;ye(d,o,!0),e("[data-tb-cite]")?.addEventListener("click",()=>po(t,d)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let l=e("a.tb-history-link");l?.dataset.revisionEndpoint&&yo(l,l.dataset.revisionEndpoint,d);let c=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");c&&(!b||!b.querySelector("a.internal")?(c.setAttribute("aria-disabled","true"),c.append(v("span",{class:"tb-mi-s",text:"No other page links here"}))):c.addEventListener("click",()=>{let u=b.querySelector("h3")??b;u.tabIndex=-1,b.scrollIntoView({block:"start"}),u.focus({preventScroll:!0})}));let g=e("[data-tb-download]"),f=uo();if(g&&f){let u=g.querySelector(".tb-mi-t");u&&(u.textContent="Download\\u2026")}let w=()=>fetch(g.dataset.tbDownload).then(u=>u.ok?u.blob():Promise.reject(new Error(String(u.status)))).then(u=>{let E=URL.createObjectURL(u),y=v("a",{href:E,download:g.dataset.file??"page.md"});document.body.append(y),y.click(),y.remove(),setTimeout(()=>URL.revokeObjectURL(E),1e3)}).catch(()=>pn("That didn\'t download just now. View source has the same file."));g?.addEventListener("click",()=>f?bo(f,t,d,w):w()),d.hidden=!1}),p(()=>{xo(t)}),p(()=>{let o=t.parentElement;mo(o?.classList.contains("tb-header-slot")?o:t)})},vo=()=>{try{Wt?.closeIfOpen(),De(),We();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",wo(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&Je(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",vo);\n';

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
          ...hasBookHistory ? { "data-book-history": BOOK_HISTORY_URL } : {},
          "data-path": path
        } : { class: "tb-history-link", href: historyHref, ...away },
        opts.editor && opts.revisionEndpoint && slug ? "Page history" : "Page history \u2197"
      ) : null,
      // The book's /history page (quartz-book writes it), where it has one.
      hasBookHistory && slug !== "history" ? item("a", { class: "tb-book-history", href: `${root}history` }, "Book history") : null,
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
        // The book's /history page asks the function what is proposed.
        ...slug === "history" && hasBookHistory && opts.revisionEndpoint ? { "data-book-history": BOOK_HISTORY_URL, "data-revision-endpoint": opts.revisionEndpoint } : {},
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