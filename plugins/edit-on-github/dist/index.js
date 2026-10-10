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
var controls_inline_default = 'var De=/^\\s{0,3}(```|~~~)/,Rn=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,In=t=>{let e=t.split(`\n`),n=[],s=0;if(e[0]?.trim()==="---"){let i=e.findIndex((p,l)=>l>0&&(p.trim()==="---"||p.trim()==="..."));i>0&&(s=i+1)}let r=0;for(;s<e.length;){let i=e[s];if(!i.trim()){s++;continue}let p=De.exec(i);if(p||i.trim()==="$$"){let c=p?p[1]:"$$",b=s+1;for(;b<e.length&&!e[b].trim().startsWith(c);)b++;s=b+1;continue}let l=s;for(;l<e.length&&e[l].trim()&&!De.test(e[l]);)l++;let o=e.slice(s,l).join(`\n`),d=!Rn.test(i);n.push({start:s,text:o,ordinal:d?++r:0}),s=l}return n},Dn=t=>Ne(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),Ne=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],Nn=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let r of t)n.set(r,(n.get(r)??0)+1);let s=0;for(let r of e){let i=n.get(r)??0;i>0&&(s++,n.set(r,i-1))}return s/Math.max(t.length,e.length)};var Oe=(t,e,n)=>{let s=Ne(e);if(!s.length)return null;let r=null,i=0,p=1/0;for(let l of In(t)){let o=Nn(Dn(l.text),s);if(o<.75)continue;let d=l.ordinal?Math.abs(l.ordinal-n):1e6;(o>i+.02||Math.abs(o-i)<=.02&&d<p)&&(r=l,i=Math.max(o,i),p=d)}return r};var St=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let s=t.length,r=e.length;for(;s>n&&r>n&&t[s-1]===e[r-1];)s--,r--;let i=t.slice(0,n).map(c=>({t:"=",v:c})),p=t.slice(s).map(c=>({t:"=",v:c})),l=t.slice(n,s),o=e.slice(n,r),d;if((l.length+1)*(o.length+1)>4e5)d=[...l.map(c=>({t:"-",v:c})),...o.map(c=>({t:"+",v:c}))];else{let c=o.length+1,b=new Uint32Array((l.length+1)*c);for(let E=l.length-1;E>=0;E--)for(let u=o.length-1;u>=0;u--)b[E*c+u]=l[E]===o[u]?b[(E+1)*c+u+1]+1:Math.max(b[(E+1)*c+u],b[E*c+u+1]);d=[];let m=0,f=0;for(;m<l.length&&f<o.length;)l[m]===o[f]?(d.push({t:"=",v:l[m]}),m++,f++):b[(m+1)*c+f]>=b[m*c+f+1]?d.push({t:"-",v:l[m++]}):d.push({t:"+",v:o[f++]});for(;m<l.length;)d.push({t:"-",v:l[m++]});for(;f<o.length;)d.push({t:"+",v:o[f++]})}return[...i,...d,...p]},Ht=t=>t.split(/(\\s+)/).filter(e=>e!==""),Ut=(t,e,n=2)=>{let s=St(t.split(`\n`),e.split(`\n`)),r=[],i=1,p=1,l=null,o=0;return s.forEach((d,c)=>{s.slice(Math.max(0,c-n),c+n+1).some(m=>m.t!=="=")?((!l||d.t==="="&&o>2*n)&&(l={a:i,b:p,ops:[]},r.push(l)),l.ops.push(d),o=d.t==="="?o+1:0):(l=null,o=0),d.t!=="+"&&i++,d.t!=="-"&&p++}),r};var Et="tb-editor",_e="tb-editor-style",pe="tb-gh-identity",le=10,de=500,On=7.5*60*60*1e3,Pe=2e4,_n=200,Mt=/^#edit(?:-(\\d+))?$/,Pn=t=>t?`#edit-${t}`:"#edit",qe={tbEditor:!0},qn="This page has changes waiting for review; you\\u2019re editing the latest draft.",a=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,i]of Object.entries(e))i!==!1&&(r==="text"?s.textContent=String(i):r==="class"?s.className=String(i):s.setAttribute(r,i===!0?"":String(i)));for(let r of n)r&&s.append(r);return s},Ue="http://www.w3.org/2000/svg",zt=t=>{let e=document.createElementNS(Ue,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(Ue,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},je="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",ze="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",Un="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",zn="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",Gt=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,_n):null},jn=()=>{try{let t=sessionStorage.getItem(pe);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>On?null:e}catch{return null}},ce=t=>{try{t?sessionStorage.setItem(pe,JSON.stringify(t)):sessionStorage.removeItem(pe)}catch{}},ue=()=>{if(document.getElementById(_e))return;let t=`#${Et}`,e=a("style",{id:_e});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline;\n  min-height: 24px; min-width: 24px; } /* a 24px target at least (batch 2b) */\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},Gn=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),Kn="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",be=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(Kn).forEach(s=>s.remove()),e.querySelectorAll("*").forEach(s=>{for(let r of Array.from(s.attributes)){let i=r.value.trim().toLowerCase();(r.name.startsWith("on")||(r.name==="href"||r.name==="src")&&/^(javascript|data|vbscript):/.test(i))&&s.removeAttribute(r.name)}s.tagName==="A"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},Yn=(t,e)=>{let n=a("div",{class:"tb-ed-diff"}),s=Ut(t,e);if(!s.length)return n.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let r=(i,p)=>{let l=a("div",{class:`tb-ed-line${i==="-"?" tb-ed-del":i==="+"?" tb-ed-add":""}`}),o=a("span");return typeof p=="string"?o.textContent=p||" ":o.append(...p),l.append(a("span",{text:i==="="?" ":i}),o),l};for(let i of s){let p=a("div",{class:"tb-ed-hunk"},a("div",{class:"tb-ed-hh",text:`Line ${i.b}`}));for(let l=0;l<i.ops.length;){let o=i.ops[l];if(o.t==="="){p.append(r("=",o.v)),l++;continue}let d=[],c=[];for(;i.ops[l]?.t==="-";)d.push(i.ops[l++].v);for(;i.ops[l]?.t==="+";)c.push(i.ops[l++].v);let b=Math.min(d.length,c.length),m=d.map((f,E)=>E<b?St(Ht(f),Ht(c[E])):null);d.forEach((f,E)=>{let u=m[E];p.append(r("-",u?u.filter(w=>w.t!=="+").map(w=>w.t==="-"?a("del",{text:w.v}):document.createTextNode(w.v)):f))}),c.forEach((f,E)=>{let u=m[E];p.append(r("+",u?u.filter(w=>w.t!=="-").map(w=>w.t==="+"?a("ins",{text:w.v}):document.createTextNode(w.v)):f))})}n.append(p)}return n},jt=null,Ge=()=>jt?.(),Kt=t=>{if(jt)return;ue();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,s=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),r=t.path.split("/"),i=r.pop(),p=t.para&&Number(t.para.getAttribute("data-pnum"))||0,l=t.mode,o="",d="",c="drafts",b=null,m="",f=jn(),E=!1,u=!1,w=null,H=null,g=!1,L=window.scrollY,B=Pn(l==="paragraph"?p:0),A=a("div",{id:Et,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),N=a("span",{class:"tb-ed-pill"},zt(ze),a("span",{text:c})),R=a("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},zt(Un));R.append(a("span",{text:t.repo.split("/").pop()||t.repo}));for(let x of r)R.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{text:x}));R.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{class:"tb-ed-file",text:i}));let q=a("span",{class:"tb-ed-muted",text:p?` \\xB7 \\xB6${p}`:""});R.append(q,N);let Z=a("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),at=a("div",{class:"tb-ed-head"},R,Z),U=a("div",{class:"tb-ed-discard",role:"alert",hidden:!0},a("span",{text:"Discard your changes?"})),Y=a("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),tt=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});U.append(Y,tt);let ct=a("div",{class:"tb-ed-main"}),z=a("div",{class:"tb-ed-inner"}),et=a("p",{class:"tb-ed-note",hidden:!0}),K=a("p",{class:"tb-ed-note",hidden:!0,text:qn}),W=a("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),h=a("div",{class:"tb-ed-gate",hidden:!0});z.append(K,et,W,h),ct.append(z),A.append(at,U,ct);let v=["Edit","Preview","Changes"],y=a("div",{role:"tablist","aria-label":"Editor view"}),$=v.map((x,C)=>a("button",{type:"button",role:"tab",id:`tb-ed-tab-${C}`,"aria-controls":`tb-ed-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:x==="Edit"?"Edit":x==="Preview"?"Preview":"Changes"}));y.append(...$);let D=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),O=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),M=a("div",{class:"tb-ed-bar"},y,a("div",{class:"tb-ed-actions"},D,O)),I=a("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),_=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),J=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),nt=[a("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},_,I,J),a("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),a("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],vt=a("div",{class:"tb-ed-box"},M,...nt),pt=a("p",{class:"tb-ed-foot"}),ut=()=>I.value,rt=()=>m,Nt=x=>{$.forEach((C,F)=>{C.setAttribute("aria-selected",F===x?"true":"false"),C.tabIndex=F===x?0:-1,nt[F].hidden=F!==x}),x===1&&se(),x===2&&(nt[2].textContent="",nt[2].append(Yn(rt(),ut())))};$.forEach((x,C)=>{x.addEventListener("click",()=>Nt(C)),x.addEventListener("keydown",F=>{let S=F.key==="ArrowRight"?1:F.key==="ArrowLeft"?-1:0;if(!S)return;F.preventDefault();let Q=(C+S+$.length)%$.length;Nt(Q),$[Q].focus()})});let yt=0,se=()=>{let x=nt[1];x.textContent="",x.className="tb-ed-panel tb-ed-preview";let C=a("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});x.append(C);let F=++yt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:Gn(ut()),mode:"markdown"})}).then(S=>S.ok?S.text():Promise.reject(new Error(String(S.status)))).then(S=>{F===yt&&(x.textContent="",x.append(be(S)))}).catch(()=>{F===yt&&(C.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};I.addEventListener("input",()=>{u=ut()!==m,O.disabled=!u});let it=a("div",{class:"tb-ed-scrim",hidden:!0}),Tt=a("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});it.append(Tt),A.append(it);let At=(x,C,F,S=!1)=>{F.id=x;let Q=a("p",{class:"tb-ed-err",id:`${x}-err`}),gt=a("label",{for:x,text:C},S?a("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:a("div",{class:"tb-ed-field"},gt,F,Q),control:F,err:Q}},T=At("tb-ed-msg","What did you change, and why?",a("textarea",{rows:2,maxlength:de,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));T.wrap.append(a("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let j=At("tb-ed-desc","Extended description",a("textarea",{rows:3,maxlength:5e3}),!0),P=a("div",{class:"tb-ed-who"}),bt=a("div",{class:"tb-ed-what"},zt(ze)),V=a("span");bt.append(V);let ot=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),X=a("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),lt=a("form",{novalidate:!0},a("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),T.wrap,j.wrap,P,bt,a("div",{class:"tb-ed-row"},ot,X)),st=a("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});Tt.append(lt,st);let Ot=()=>{if(P.textContent="",f){let x=a("img",{src:`https://avatars.githubusercontent.com/u/${f.id}?s=56`,alt:""}),C=a("button",{type:"button",class:"tb-ed-link",text:"Sign out"});C.addEventListener("click",()=>{f=null,ce(null),Ot()}),P.append(x,a("span",{},"Signed in as ",a("strong",{text:`@${f.login}`})," \\u2014 this edit will be credited to your GitHub account."),C)}else P.append(Fe(),a("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Fe=()=>{let x=a("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},zt(zn),"Sign in with GitHub");return x.addEventListener("click",()=>Fn(x)),x},An=()=>{h.textContent="";let x=Fe(),C=a("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let F=a("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});F.addEventListener("click",()=>{Pt(),t.suggest()}),C.append(F," instead: it needs no account.")}else C.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");h.append(a("h2",{text:"Sign in to edit"}),a("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),a("p",{},x),C),W.hidden=!0,h.hidden=!1,x.focus()},Se=x=>{if(x.origin!==n)return;let C=x.data;if(!(!C||C.type!=="tb-github-identity")){if(w=null,C.error||typeof C.token!="string"||typeof C.login!="string"){t.track("github_signin",{outcome:C.error==="denied"?"cancelled":"error"});return}if(f={token:C.token,login:C.login,id:Number(C.id)||0,name:C.name??"",at:Date.now()},ce(f),t.track("github_signin",{outcome:"success"}),!g)return Ie();Ot(),it.hidden||T.control.focus()}},Fn=x=>{let C=`${s}?origin=${encodeURIComponent(location.origin)}`;w=window.open(C,"tb-github-signin","popup,width=560,height=720"),!w&&!x.parentElement?.querySelector(".tb-ed-err")&&x.after(a("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Se);let Sn=(x,C)=>{x.control.setAttribute("aria-invalid","true"),x.control.setAttribute("aria-describedby",x.err.id),x.err.textContent=C},He=x=>{x.control.removeAttribute("aria-invalid"),x.control.removeAttribute("aria-describedby"),x.err.textContent=""};T.control.addEventListener("input",()=>He(T));let Hn=()=>{V.textContent="",V.append("This creates a new branch and opens a proposal to merge it into ",a("code",{text:c}),". Nothing changes in the book until an editor accepts it."),Ot(),lt.hidden=!1,st.hidden=!0,it.hidden=!1,T.control.focus()},ae=()=>{it.hidden=!0,O.focus()};O.addEventListener("click",Hn),ot.addEventListener("click",ae),it.addEventListener("mousedown",x=>{x.target===it&&!E&&ae()});let ie=(x,C,F,S)=>{if(!A.isConnected)return;st.textContent="",st.append(a("h2",{text:x}),a("p",{text:C})),F&&st.append(a("p",{},a("a",{href:F.href,target:"_blank",rel:"noopener",text:F.text})));let Q=a("button",{type:"button",class:`tb-ed-btn${S?" tb-ed-primary":""}`,text:S?"Back to my edit":"Close"});Q.addEventListener("click",S?()=>{st.hidden=!0,lt.hidden=!1,X.focus()}:()=>_t(!0)),st.append(a("div",{class:"tb-ed-row"},Q)),lt.hidden=!0,st.hidden=!1,st.focus()};lt.addEventListener("submit",x=>{if(x.preventDefault(),E)return;let C=null;He(T);let F=T.control.value.trim().length;if(F<le||F>de?(Sn(T,F<le?`Please say what you changed and why, in at least ${le} characters.`:`Please keep it under ${de} characters.`),C=T.control):f||(C=P.querySelector("button")),C){C.focus();return}let S={mode:l,path:t.path,baseSha:d,title:l==="paragraph"&&p?`Edit \\xB6${p} of ${i}`:`Update ${i}`,summary:T.control.value.trim().replace(/\\s+/g," "),description:j.control.value.trim()};l==="page"?S.content=ut():(S.startLine=b.start,S.original=b.text,S.replacement=ut(),p&&(S.paragraph=p)),S.identity=f.token,E=!0,X.disabled=!0,X.textContent="Proposing\\u2026";let Q=H=new AbortController,gt=setTimeout(()=>Q.abort(),Pe);fetch(t.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(S),signal:Q.signal}).then(async G=>{let qt=null;try{qt=await G.json()}catch{qt=null}if(G.status===401&&f&&(f=null,ce(null),Ot()),!G.ok)throw Object.assign(new Error(String(G.status)),{userMessage:Gt(qt)});return qt}).then(G=>{u=!1,G.fallback&&typeof G.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:l}),ie("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:G.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:l}),ie("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof G.prUrl=="string"?{href:G.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(G=>{t.track("page_edit_submitted",{outcome:"error",mode:l}),ie("That did not go through",G&&G.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(gt),H===Q&&(H=null),E=!1,X.disabled=!1,X.textContent="Propose changes"})});let Mn=x=>Array.from(x.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]")),Me=x=>{if(x.key==="Escape"){x.preventDefault(),it.hidden?Ft():E||(!st.hidden&&lt.hidden&&!u?_t(!0):ae());return}if(x.key!=="Tab")return;let C=it.hidden?A:Tt,F=Mn(C);if(!F.length){x.preventDefault(),C.focus();return}let S=F.indexOf(document.activeElement);(x.shiftKey?S<=0:S===-1||S===F.length-1)&&(x.preventDefault(),F[x.shiftKey?F.length-1:0].focus())},Be=x=>{u&&(x.preventDefault(),x.returnValue="")},_t=(x=!1)=>{if(!x&&u)return Ft();u=!1,Mt.test(location.hash)?history.back():Pt()},Re=()=>{if(!Mt.test(location.hash)){if(u)return history.pushState(qe,"",B),Ft();Pt()}},Pt=()=>{jt=null,H?.abort(),w?.close(),document.removeEventListener("keydown",Me,!0),window.removeEventListener("message",Se),window.removeEventListener("beforeunload",Be),window.removeEventListener("popstate",Re),A.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,L)},Ft=()=>{if(!u)return _t(!0);U.hidden=!1,tt.focus()};Y.addEventListener("click",()=>_t(!0)),tt.addEventListener("click",()=>{U.hidden=!0,I.focus()}),Z.addEventListener("click",Ft),D.addEventListener("click",Ft),document.addEventListener("keydown",Me,!0),window.addEventListener("beforeunload",Be),window.addEventListener("popstate",Re),jt=Pt,t.push!==!1&&history.pushState(qe,"",B),document.body.style.overflow="hidden",document.body.append(A),Z.focus(),t.track("page_editor_opened",{mode:l});let Bn=x=>{W.textContent="",W.removeAttribute("class"),W.append(x+" ",a("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},Ie=()=>{if(!f)return An();g=!0,h.hidden=!0,W.hidden=!1;let x=new AbortController,C=setTimeout(()=>x.abort(),Pe);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:x.signal}).then(async F=>{let S=null;try{S=await F.json()}catch{S=null}if(!F.ok)throw Object.assign(new Error(String(F.status)),{userMessage:Gt(S)});return S}).then(F=>{if(A.isConnected){if(typeof F?.content!="string"||typeof F.sha!="string")throw new Error("bad source");if(o=F.content,d=F.sha,c=typeof F.branch=="string"?F.branch:c,N.lastChild.textContent=c,K.hidden=!t.builtBlob||t.builtBlob===d,l==="paragraph"&&(b=t.para?Oe(o,t.para.textContent??"",p):null,b||(l="page",q.textContent="",et.textContent=`We couldn\\u2019t find \\xB6${p} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,et.hidden=!1)),l==="paragraph"&&b){vt.classList.add("tb-ed-para");let S=o.split(`\n`),Q=b.text.split(`\n`).length,gt=S.slice(Math.max(0,b.start-3),b.start).join(`\n`).trim(),G=S.slice(b.start+Q,b.start+Q+3).join(`\n`).trim();_.textContent=gt.length>220?`\\u2026${gt.slice(-220)}`:gt,J.textContent=G.length>220?`${G.slice(0,220)}\\u2026`:G,_.hidden=!gt,J.hidden=!G,m=b.text,pt.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else m=o,pt.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";I.value=m,W.remove(),z.append(vt,pt),I.setSelectionRange(0,0),I.focus()}}).catch(F=>{A.isConnected&&Bn(F&&F.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(C))};Ie()};var xt=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},Yt=(t,e)=>Ht(t).map(n=>({v:n,s:{...e}})),kt=(t,e={})=>{let n=[],s={...e},r="",i=()=>{r&&n.push(...Yt(r,s)),r=""},p=l=>!!l&&/[\\p{L}\\p{N}]/u.test(l);for(let l=0;l<t.length;){let o=t.slice(l),d;if(o[0]==="\\\\"&&o.length>1)r+=o[1],l+=2;else if(d=/^`([^`]+)`/.exec(o))i(),n.push(...Yt(d[1],{...s,code:!0})),l+=d[0].length;else if(d=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(o)){i();let c=d[2]??d[1].split("/").pop()??d[1];n.push(...Yt(c,{...s,link:!0})),l+=d[0].length}else if(d=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(o))i(),n.push(...Yt(`(image${d[1]?`: ${d[1]}`:""})`,{...s,i:!0})),l+=d[0].length;else if(d=/^\\[\\^([^\\]]+)\\]/.exec(o))i(),n.push({v:d[1],s:{...s,sup:!0}}),l+=d[0].length;else if(d=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(o))i(),n.push(...kt(d[1],{...s,link:!0})),l+=d[0].length;else if(d=/^<\\/?[a-zA-Z][^>]*>/.exec(o))i(),l+=d[0].length;else if(o.startsWith("**")||o.startsWith("__")){let c=o.slice(0,2);s.b||t.indexOf(c,l+2)>l+2?(i(),s.b=!s.b):r+=c,l+=2}else(o[0]==="*"||o[0]==="_")&&!(o[0]==="_"&&p(t[l-1])&&p(t[l+1]))?(s.i||t.indexOf(o[0],l+1)>l+1?(i(),s.i=!s.i):r+=o[0],l+=1):(r+=o[0],l+=1)}return i(),n},me=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:kt(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:kt(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:kt(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:kt(e[2])}:{kind:"p",runs:kt(t)}:{kind:"blank",runs:[]}},Ke=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=a("code",{},e)),t.s.i&&(e=a("em",{},e)),t.s.b&&(e=a("strong",{},e)),t.s.link&&(e=a("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=a("sup",{},e)),e},he=(t,e,n)=>{let s=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,r=a("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),i=a("div",{class:"tb-rd-text"});e.marker&&i.append(a("span",{class:"tb-rd-marker",text:e.marker}));let p=null;for(let{run:l,changed:o}of n)o&&t!=="="?(p||(p=a(t==="-"?"del":"ins"),i.append(p)),p.append(Ke(l))):(p=null,i.append(Ke(l)));return a("div",{class:s},r,i)},ge=(t,e)=>t.map(n=>({run:n,changed:e})),Bt=(t,e)=>{let n=a("div",{class:"tb-ed-diff tb-rd"}),s=xt(t),r=xt(e);return s===r?(n.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n):(Ut(s,r).forEach((i,p)=>{p>0&&n.append(a("div",{class:"tb-rd-gap","aria-hidden":"true",text:"\\u22EF"}));let l=i.ops;for(let o=0;o<l.length;){let d=l[o];if(d.t==="="){let u=me(d.v);n.append(he("=",u,ge(u.runs,!1))),o++;continue}let c=[],b=[];for(;l[o]?.t==="-";)c.push(me(l[o++].v));for(;l[o]?.t==="+";)b.push(me(l[o++].v));let m=Math.min(c.length,b.length),f=c.map(u=>ge(u.runs,!0)),E=b.map(u=>ge(u.runs,!0));for(let u=0;u<m;u++){let w=c[u].runs,H=b[u].runs,g=St(w.map(R=>R.v),H.map(R=>R.v)),L=0,B=0,A=[],N=[];for(let R of g)R.t!=="+"&&A.push({run:w[L++],changed:R.t==="-"}),R.t!=="-"&&N.push({run:H[B++],changed:R.t==="+"});f[u]=A,E[u]=N}c.forEach((u,w)=>n.append(he("-",u,f[w]))),b.forEach((u,w)=>n.append(he("+",u,E[w])))}}),n)};var $t=t=>(Array.isArray(t)?t:[]).filter(e=>!!e&&Number.isInteger(e.number)&&typeof e.date=="string"&&typeof e.url=="string"&&/^https:\\/\\/github\\.com\\//.test(e.url)&&["edit","note","suggestion"].includes(e.kind)&&Array.isArray(e.comments)),Wt=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},fe=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},wt=(t,e="",n={})=>{try{let s=new URL(t,"https://x.invalid"),r=new URL("history",s);r.searchParams.set("book",s.searchParams.get("book")??""),e&&r.searchParams.set("path",e);for(let[i,p]of Object.entries(n))r.searchParams.set(i,p);return t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},Ye=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(r=>r.toLowerCase());return e.find(r=>r.role&&r.role!=="contributor"&&n.includes(r.who.toLowerCase()))?.role??"contributor"},Ct=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",We=(t,e)=>{let n=[],s=[...e].sort((r,i)=>i.date.localeCompare(r.date));for(let r of t){for(;s.length&&s[0].date>=r.date;)n.push({release:s.shift()});n.push({entry:r})}for(let r of s)n.push({release:r});return n},Ve=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),Ze=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state);var Wn="No reason was recorded.",Rt=t=>t.kind==="edit"?"Declined proposed edit":t.kind==="note"?t.paragraph?`Declined note on \\xB6${t.paragraph}`:"Declined note":"Declined suggestion",ye=t=>{let e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"}):t},Vn=async(t,e)=>{let n=await fetch(t,{signal:e,credentials:"omit"}),s=await n.json().catch(()=>null);if(!n.ok)throw Object.assign(new Error(`HTTP ${n.status}`),{userMessage:s?.userMessage});return s},Vt=(t,e)=>{let n=a("div",{class:"tb-dc"});n.append(a("p",{class:"tb-dc-who",text:`Proposed by ${t.who?.name??"a reader"} on ${ye(t.proposed)}. Declined${t.decliner?` by ${t.decliner}`:""} on ${ye(t.date)}.`}),a("blockquote",{class:`tb-dc-reason${t.reason?"":" tb-dc-none"}`},a("span",{class:"tb-dc-label",text:"Why it was declined: "}),t.reason??Wn));let s=a("div",{class:"tb-hi-actions tb-dc-actions"}),r=a("div",{class:"tb-hi-diff tb-dc-diff",hidden:!0});if(t.kind==="edit"&&e){let i=a("button",{type:"button","aria-pressed":"false",text:"Show changes"});i.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0,i.setAttribute("aria-pressed","false");return}i.setAttribute("aria-pressed","true"),r.hidden=!1,r.textContent="",r.append(a("p",{class:"tb-ed-muted",role:"status",text:"Loading what was proposed\\u2026"}));let p=new AbortController,l=setTimeout(()=>p.abort(),2e4);Vn(wt(e,"",{change:String(t.number)}),p.signal).then(o=>{let d=o?.files??[];r.textContent="",d.length||r.append(a("p",{class:"tb-ed-muted",text:"The proposal changed no page."}));for(let c of d)r.append(Bt(typeof c.before=="string"?c.before:"",typeof c.after=="string"?c.after:""))}).catch(o=>{r.textContent="",r.append(a("p",{class:"tb-ed-note",role:"alert",text:o?.userMessage||"What was proposed couldn\\u2019t be loaded just now."}))}).finally(()=>clearTimeout(l))}),s.append(i)}if(s.append(a("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",text:`See #${t.number} on GitHub \\u2197`})),n.append(s,r),t.comments.length){let i=a("ol",{class:"tb-dc-comments","aria-label":"Comments from the book\'s people"});for(let p of t.comments)i.append(a("li",{class:"tb-dc-comment"},a("p",{class:"tb-dc-cmeta",text:`${p.name} \\xB7 ${ye(p.date)}`}),a("p",{class:"tb-dc-ctext",text:p.text})));n.append(a("p",{class:"tb-dc-chead",text:"Comments from the book\\u2019s people"}),i)}return n},Zt=t=>`\n${t} .tb-dc { margin-top: 0.4rem; }\n${t} .tb-dc p { margin: 0.15rem 0; overflow-wrap: anywhere; }\n${t} .tb-dc-who, ${t} .tb-dc-cmeta, ${t} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }\n${t} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }\n${t} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }\n${t} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }\n${t} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-dc-ctext { white-space: pre-line; }\n${t} .tb-hi-state.tb-hi-declined, ${t} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }\n`;var Je={author:"Author",editor:"Editor",contributor:"Contributor"},Jt=t=>{if(!t||!(t in Je))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=Je[t],e};var Xe="tb-history-style",Zn=30,Qe=2e4,tn="a reader",xe=t=>`\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n${t} .tb-rd-gap { padding: 0.3rem 0; text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n`,Jn=()=>{if(document.getElementById(Xe))return;let t=`#${Et}.tb-hi`,e=a("style",{id:Xe});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n${xe(t)}\n${Zt(t)}\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},Xn=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),s=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return s?`Paragraph ${s[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},ht=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},mt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),s=null;try{s=await n.json()}catch{}if(!n.ok){let r=new Error(`HTTP ${n.status}`);throw r.userMessage=Gt(s),r}return s},Xt=null,en=()=>Xt?.(),nn=t=>{if(Xt||document.getElementById(Et))return;ue(),Jn();let e=document.body.style.overflow,n=null,s=0,r=a("div",{id:Et,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),i=a("div",{class:"tb-hi-where",id:"tb-hi-title"},a("span",{class:"tb-hi-name",text:"Page history"}),t.title?a("span",{class:"tb-hi-page",text:t.title}):null),p=a("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},a("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),a("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),l=a("div",{class:"tb-ed-main"}),o=a("div",{class:"tb-ed-inner"});l.append(o),r.append(a("div",{class:"tb-hi-top"},i,p),l);let d=h=>a("p",{class:"tb-ed-muted",role:"status",text:h}),c=(h,v)=>{let y=a("div",{class:"tb-ed-note",role:"alert"});return y.append(a("span",{text:`${h?.userMessage||v} `}),a("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),y},b=()=>{n?.abort();let h=new AbortController;n=h;let v=setTimeout(()=>h.abort(),Qe);return{signal:h.signal,done:()=>clearTimeout(v),current:()=>n===h}},m=null,f=[],E=[],u=[],w=null,H=h=>{let v=new URL(t.endpoint,location.href);for(let[y,$]of Object.entries(h))v.searchParams.set(y,$);return v.toString()},g=h=>h.path??m?.source??t.path,L=()=>m?.published[0]??null,B=(h,v)=>{let y=a("p",{class:"tb-hi-meta"});v&&y.append(a("span",{class:"tb-hi-state",text:v})),y.append(`${ht(h.date)} \\xB7 ${h.who}`);let $=Jt(h.role);return $&&y.append(" ",$),h.pr&&t.githubHref&&y.append(" \\xB7 ",a("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${h.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${h.pr}`})),y},A=(h,v,y)=>{if(!v.hidden){v.hidden=!0,y.setAttribute("aria-pressed","false");return}y.setAttribute("aria-pressed","true"),v.hidden=!1,v.textContent="",v.append(d("Loading what changed\\u2026")),t.track("page_revision_opened");let $=new AbortController,D=setTimeout(()=>$.abort(),Qe);mt(H({sha:h.sha,path:g(h)}),$.signal).then(O=>{let M=O,I=typeof M.before=="string"?M.before:"",_=typeof M.after=="string"?M.after:"";v.textContent="",M.status==="added"&&v.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let J=typeof M.previousPath=="string"&&M.previousPath!==g(h);J&&v.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${xt(I)===xt(_)?"; its text didn\\u2019t change.":"."}`})),(!J||xt(I)!==xt(_))&&v.append(Bt(I,_))}).catch(O=>{v.textContent="",v.append(c(O,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(D))},N=(h,v)=>{s=l.scrollTop,o.textContent="";let y=a("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});y.addEventListener("click",()=>{n?.abort(),Y()});let $=a("div",{});return o.append(y,a("div",{class:"tb-hi-banner",role:"status",text:v}),a("div",{class:"tb-hi-head"},a("h2",{text:h})),$),l.scrollTop=0,y.focus(),$},R=h=>{let v=N(h.summary,`You are reading the version of ${ht(h.date)}.`);v.append(d("Loading this version\\u2026")),t.track("page_version_read");let y=b();mt(H({sha:h.sha,path:g(h)}),y.signal).then($=>{if(!y.current())return;let D=$.html;v.textContent="",v.append(typeof D=="string"&&D?a("div",{class:"tb-ed-panel tb-ed-preview"},be(D)):a("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch($=>{y.current()&&(v.textContent="",v.append(c($,"This version couldn\\u2019t be loaded just now.")))}).finally(y.done)},q=(h,v)=>{let[y,$]=h.date<=v.date?[h,v]:[v,h],D=I=>`the version of ${ht(I.date)}${I===L()?" (the one you read now)":""}`,O=N("Compare versions",`Changes from ${D(y)} to ${D($)}.`);O.append(d("Loading the two versions\\u2026")),t.track("page_versions_compared");let M=b();mt(H({sha:$.sha,base:y.sha,path:g($)}),M.signal).then(I=>{if(!M.current())return;let _=I;O.textContent="",O.append(a("div",{class:"tb-hi-diff"},Bt(typeof _.before=="string"?_.before:"",typeof _.after=="string"?_.after:"")))}).catch(I=>{M.current()&&(O.textContent="",O.append(c(I,"The versions couldn\\u2019t be compared just now.")))}).finally(M.done)},Z=(h,v)=>{let y=a("li",{class:"tb-hi-entry"}),$=a("div",{class:"tb-hi-diff",hidden:!0}),D=a("button",{type:"button","aria-pressed":"false",text:"Show changes"});D.addEventListener("click",()=>A(h,$,D));let O=a("button",{type:"button",text:"Read this version"});O.addEventListener("click",()=>R(h));let M=a("button",{type:"button",text:w?w===h?"Cancel compare":"Compare with this":"Compare\\u2026"});M.addEventListener("click",()=>{if(!w)w=h,Y();else if(w===h)w=null,Y();else{let J=w;w=null,q(J,h)}});let I=a("div",{class:"tb-hi-actions"},D,O,M),_=L();if(!w&&_&&_.sha!==h.sha){let J=a("button",{type:"button",text:"Compare with now"});J.addEventListener("click",()=>q(h,_)),I.append(J)}return y.append(a("p",{class:"tb-hi-msg",text:h.summary}),B(h,v),I,$),y},at=h=>{let v=a("li",{class:"tb-hi-entry"});return v.append(a("p",{class:"tb-hi-msg",text:h.summary||Ct(h)}),B({date:h.date,who:h.who?.name??"A reader",role:Ye(h,[...m?.published??[],...m?.drafts??[]])},`Proposed \\xB7 ${Ct(h)}`),a("div",{class:"tb-hi-actions"},a("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",text:`See #${h.number} on GitHub \\u2197`}))),v},U=h=>a("li",{class:"tb-hi-entry tb-hi-declined-entry"},a("p",{class:"tb-hi-msg",text:h.summary||Rt(h)}),a("p",{class:"tb-hi-meta"},a("span",{class:"tb-hi-state tb-hi-declined",text:"Declined"}),`${Rt(h).replace(/^Declined /,"")} \\xB7 ${ht(h.date)}`),Vt(h,t.endpoint)),Y=()=>{if(o.textContent="",!m)return;if(w&&o.append(a("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${ht(w.date)}: pick the other version, below.`})),E.length||m.drafts.length){let y=a("ol",{class:"tb-hi-list"});for(let $ of E)y.append(at($));for(let $ of m.drafts)y.append(Z($,"Being edited"));o.append(a("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},a("h2",{id:"tb-hi-editing",text:"Being edited"}),a("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),y))}let h=a("ol",{class:"tb-hi-list"}),v=[...u].sort((y,$)=>$.date.localeCompare(y.date));for(let y of We(m.published,f)){let $="release"in y?y.release.date:y.entry.date;for(;v.length&&v[0].date>$;)h.append(U(v.shift()));"release"in y?h.append(a("li",{class:"tb-hi-release",role:"separator","aria-label":`${fe(y.release.tag)}, ${ht(y.release.date)}`,text:`${fe(y.release.tag)} \\xB7 ${ht(y.release.date)}`})):h.append(Z(y.entry,void 0))}for(let y of v)h.append(U(y));o.append(a("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},a("h2",{id:"tb-hi-published",text:u.length?"Published and declined":"Published"}),a("p",{text:m.published.length?u.length?"What readers have seen, and what the authors declined and why, newest first.":"What readers have seen, newest first.":u.length?"This page has no published versions yet. What the authors declined, and why:":"This page has no published versions yet."}),h)),l.scrollTop=s},tt=h=>{if(h.key==="Escape"){h.preventDefault(),ct();return}if(h.key!=="Tab")return;let v=Array.from(r.querySelectorAll("a[href], button, [tabindex]")).filter($=>!$.disabled&&$.tabIndex>=0&&!$.closest("[hidden]"));if(!v.length)return;let y=v.indexOf(document.activeElement);(h.shiftKey?y<=0:y===-1||y===v.length-1)&&(h.preventDefault(),v[h.shiftKey?v.length-1:0].focus())},ct=()=>{Xt=null,n?.abort(),document.removeEventListener("keydown",tt,!0),r.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};p.addEventListener("click",ct),document.addEventListener("keydown",tt,!0),Xt=ct,document.body.style.overflow="hidden",document.body.append(r),p.focus(),t.track("page_history_opened"),o.append(d("Loading this page\\u2019s history\\u2026"));let z=b(),et=t.bookHistoryUrl?mt(t.bookHistoryUrl,z.signal).then(h=>{let v=Wt(h),y=v?.pages.find($=>$.source===t.path)??null;return v&&(f=v.releases),v&&!u.length&&(u=$t(v.declined).filter($=>$.files?.includes(t.path))),y}):Promise.resolve(null),K=wt(t.endpoint,t.path,{declined:"1"}),W=K?mt(K,z.signal).then(h=>(u=$t(h?.declined),(h?.items??[]).filter(v=>v&&typeof v.url=="string"))).catch(()=>[]):Promise.resolve([]);et.catch(()=>null).then(async h=>{if(h)return h;let v=await mt(t.listUrl,z.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(v)?v:[]).map((y,$,D)=>({sha:y.sha,date:y.date,who:y.who,role:null,summary:Xn(y.message??"",$===D.length-1),...y.path!==t.path?{path:y.path}:{}})),drafts:[],releases:{}}}).then(async h=>{m=h;let v=[...h.published,...h.drafts],y=[...new Set(v.filter(M=>M.who===tn).map(M=>M.sha))].slice(0,Zn),$=y.length?mt(H({shas:y.join(",")}),z.signal).then(M=>M?.names??{}).catch(()=>({})):Promise.resolve({}),[D,O]=await Promise.all([$,W]);for(let M of v){let I=D[M.sha];M.who===tn&&typeof I=="string"&&I.trim()&&(M.who=I.trim().slice(0,80))}E=O,z.current()&&Y()}).catch(h=>{z.current()&&(o.textContent="",o.append(c(h,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(z.done)};var Lt="http://www.w3.org/2000/svg",on={proposed:"Proposed",drafts:"Being edited",published:"Published",declined:"Declined"},rn="tb-bh-style",Qn=(t,e)=>{let n=s=>{let r=s?.querySelector("title")?.textContent;if(r){for(let i of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))i.removeAttribute("aria-current");s.setAttribute("aria-current","true"),e.textContent=r}};t.addEventListener("click",s=>n(s.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",s=>n(s.target.closest(".tb-swim-dot")))},to=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!s)return;let[r,i]=n.map(l=>({t:Date.parse(l.textContent??""),x:Number(l.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(i.t)||i.t<=r.t)return;let p=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2;for(let l of e){let o=Math.min(Math.max(Date.parse(l.date),r.t),i.t),d=document.createElementNS(Lt,"circle");d.setAttribute("class","tb-swim-dot"),d.setAttribute("data-lane","0"),d.setAttribute("cx",(r.x+(o-r.t)/(i.t-r.t)*(i.x-r.x)).toFixed(1)),d.setAttribute("cy",String(p)),d.setAttribute("r","5"),d.setAttribute("tabindex","0");let c=document.createElementNS(Lt,"title");c.textContent=`${l.date} \\xB7 ${Ct(l)}: ${l.summary} (${l.who?.name??"a reader"})`,d.append(c),t.append(d)}},eo=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="3"]\');if(n.length<2||!s)return;let[r,i]=n.map(o=>({t:Date.parse(o.textContent??""),x:Number(o.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(i.t)||i.t<=r.t)return;let p=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2,l=new Set(Array.from(t.querySelectorAll(".tb-swim-declined")).map(o=>o.getAttribute("data-number")));for(let o of e){if(l.has(String(o.number)))continue;let d=r.x+(Math.min(Math.max(Date.parse(o.date),r.t),i.t)-r.t)/(i.t-r.t)*(i.x-r.x),c=document.createElementNS(Lt,"g");for(let[E,u]of Object.entries({class:"tb-swim-dot tb-swim-declined","data-lane":"3","data-number":String(o.number),tabindex:"0",fill:"none",stroke:"currentColor","stroke-width":"1.5"}))c.setAttribute(E,u);let b=document.createElementNS(Lt,"title");b.textContent=`${o.date} \\xB7 declined: ${o.summary} (${o.who?.name??"a reader"})`;let m=document.createElementNS(Lt,"circle");m.setAttribute("cx",d.toFixed(1)),m.setAttribute("cy",String(p)),m.setAttribute("r","5");let f=document.createElementNS(Lt,"path");f.setAttribute("d",`M${(d-3).toFixed(1)} ${p-3}L${(d+3).toFixed(1)} ${p+3}M${(d+3).toFixed(1)} ${p-3}L${(d-3).toFixed(1)} ${p+3}`),c.append(b,m,f),t.append(c)}},we=(t,e,n,s)=>{let r=a("select",{class:"tb-bh-select"});r.append(a("option",{value:"",text:"Any"}));for(let[i,p]of n)r.append(a("option",{value:i,text:p}));return r.addEventListener("change",()=>s(e,r.value)),a("label",{class:"tb-bh-filter"},a("span",{text:t}),r)},sn=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let s=document.querySelector("svg.tb-swimlane");if(s){let g=a("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});s.closest("figure")?.append(g),Qn(s,g)}let r=new AbortController;setTimeout(()=>r.abort(),2e4);let i=Wt(await mt(e,r.signal).catch(()=>null));if(!i)return;let p=n?wt(n):"";document.getElementById(rn)||document.head.append(a("style",{id:rn,text:xe(".tb-bh-list")+Zt(".tb-bh-list")}));let l=$t(i.declined),o=p?await mt(wt(n,"",{declined:"1"}),r.signal).then(g=>{let L=g?.declined;return Array.isArray(L)&&(l=$t(L)),(g?.items??[]).filter(B=>B&&typeof B.url=="string")}).catch(()=>[]):[];s&&(to(s,o),eo(s,l));let d=new Map(i.pages.map(g=>[g.source,g])),c=[...o.map(g=>{let L=g.files?.map(B=>d.get(B)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||Ct(g),state:"proposed",page:L?.source??"",pageTitle:L?.title??"",href:g.url,ref:`#${g.number}`}}),...l.map(g=>{let L=g.files?.map(B=>d.get(B)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||Rt(g),state:"declined",page:L?.source??"",pageTitle:L?.title??"",href:g.url,ref:`#${g.number}`,declined:g}}),...Ve(i).map(g=>({date:g.date,who:g.who,role:g.role,summary:g.summary,state:g.state,page:g.page.source,pageTitle:g.page.title,href:g.page.path,ref:g.pr?`#${g.pr}`:""}))].sort((g,L)=>L.date.localeCompare(g.date)),b={page:"",person:"",state:""},m=a("ol",{class:"tb-bh-list"}),f=a("p",{class:"tb-bh-count",role:"status"}),E=()=>{m.textContent="";let g=c.filter(L=>Ze(b,L));f.textContent=`${g.length} change${g.length===1?"":"s"}`;for(let L of g){let B=a("p",{class:"tb-bh-meta"},a("span",{class:`tb-bh-state tb-bh-${L.state}`,text:on[L.state]}),` ${ht(L.date)} \\xB7 ${L.who}`),A=Jt(L.role);A&&B.append(" ",A),L.state==="proposed"&&B.append(" \\xB7 ",a("a",{href:L.href,target:"_blank",rel:"noopener noreferrer",text:`${L.ref} on GitHub \\u2197`})),m.append(a("li",{class:"tb-bh-item"},a("p",{class:"tb-bh-summary",text:L.summary}),L.pageTitle?a("p",{class:"tb-bh-page"},L.state==="proposed"||L.state==="declined"?L.pageTitle:a("a",{href:L.href,text:L.pageTitle})):null,B,L.declined?Vt(L.declined,n):null))}},u=(g,L)=>{Object.assign(b,{[g]:L}),E()},w=[...new Set(c.map(g=>g.who))].sort((g,L)=>g.localeCompare(L)),H=i.pages.filter(g=>g.published.length||g.drafts.length).map(g=>[g.source,g.title]);t.append(a("h2",{text:"All changes"}),a("div",{class:"tb-bh-filters"},we("Chapter","page",H,u),we("Person","person",w.map(g=>[g,g]),u),we("State","state",Object.entries(on),u)),f,m),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),E()};var ln={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},dn=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),no=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(s=>`${s.charAt(0).toUpperCase()}.`).join(" ")}`},oo=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,an=t=>/[.?!]$/.test(t)?t:`${t}.`,cn=t=>{let e=oo(dn(t.authors).map(no)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),s=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=[],i=s?[{text:`${an(s)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)r.push({text:`${an(e)} (n.d.). `},...i);else if(i.length){let[p,...l]=i;r.push({...p,text:p.text.replace(/ $/,"")},{text:" (n.d.). "},...l)}else r.push({text:"(n.d.). "});return r.push({text:`Retrieved ${n}, from ${t.url}`}),r},Ee=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=ln[t.licence],s=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&s.push({text:` by ${dn(t.authors).join(", ")}`}),e&&t.bookTitle&&s.push({text:", from "},{text:t.bookTitle,italic:!0}),s.push({text:`, ${t.url}`}),n?s.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&s.push({text:`, is licensed under ${t.licence}`}),s.push({text:"."}),s},ke=t=>t.map(e=>e.text).join(""),$e=t=>ln[t]?.name??t,Qt=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],pn=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},ro=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function un(t,e,n,s=0){let r=e!=="book"&&t.chapter&&t.styles.chapter,i=r?t.chapter:t.book,p=r?t.styles.chapter:t.styles.book,l=e==="paragraph"&&r?s:0,o=l?`${i.URL}#p${l}`:i.URL,d=ro(n),c={};for(let[m]of Qt)c[m]=(p[m]??[]).map(f=>({...f,text:f.text.replaceAll("{accessed}",d).replace(i.URL,l?`${o} (para. ${l})`:o)}));return{item:{...i,id:o,URL:o,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...l?{note:`para. ${l}`}:{}},styles:c}}var It=t=>t?.["date-parts"]?.[0]??[],ft=t=>String(t??"").padStart(2,"0"),bn=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),so=t=>{let e=r=>r.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),s=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(r=>r.length>3)??"");return`${n}${It(t.issued)[0]??""}${s}`.toLowerCase()||"citation"},ao={chapter:"incollection",book:"book",report:"techreport"},ve=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function mn(t){let[e,n,s]=It(t.issued),[r,i,p]=It(t.accessed),l=c=>c?ve(c):void 0,d=[["author",t.author?.map(c=>c.literal?`{${ve(c.literal)}}`:ve(bn(c))).join(" and ")],["title",l(t.title)],["booktitle",t.type==="chapter"?l(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",l(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&s?`${e}-${ft(n)}-${ft(s)}`:void 0],["url",t.URL],["urldate",r?`${r}-${ft(i)}-${ft(p)}`:void 0],["doi",t.DOI],["language",l(t.language)],["note",l(t.note)],["keywords",l(t.keyword)],["abstract",l(t.abstract)]].filter(([,c])=>c).map(([c,b])=>`  ${c} = {${b}}`).join(`,\n`);return`@${ao[t.type]??"misc"}{${so(t)},\n${d}\n}\n`}var io={chapter:"CHAP",book:"BOOK",report:"RPRT"};function hn(t){let[e,n,s]=It(t.issued),[r,i,p]=It(t.accessed);return[["TY",io[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(o=>["AU",bn(o)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${ft(n)}/${ft(s)}`:void 0],["UR",t.URL],["Y2",r?`${r}/${ft(i)}/${ft(p)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(o=>["KW",o]),["N1",t.note]].filter(([,o])=>o).map(([o,d])=>`${o}  - ${d.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var gn=t=>JSON.stringify([t],null,2)+`\n`;var dt=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},lo=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},te=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",p=u=>{let w=u?.userMessage,H=typeof w=="string"?w.trim():"";return H?H.slice(0,200):null},l=()=>{if(document.getElementById(e))return;let u=document.createElement("style");u.id=e,u.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(u)},o=(u,w,H,g=!1)=>{let L=document.createElement("div");L.className="tb-sg-field";let B=document.createElement("label");if(B.setAttribute("for",u),B.textContent=w,g){let N=document.createElement("span");N.className="tb-sg-opt",N.textContent=" (optional)",B.append(N)}let A=document.createElement("p");return A.className="tb-sg-err",A.id=u+"-err",H.id=u,!g&&!H.readOnly&&(H.required=!0),L.append(B,H,A),{wrap:L,control:H,err:A,hintId:null}},d=u=>{let w=[];u.err.textContent&&w.push(u.err.id),u.hintId&&w.push(u.hintId),w.length?u.control.setAttribute("aria-describedby",w.join(" ")):u.control.removeAttribute("aria-describedby")},c=(u,w)=>{u.control.setAttribute("aria-invalid","true"),u.err.textContent=w,d(u)},b=u=>{u.control.hasAttribute("aria-invalid")&&(u.control.removeAttribute("aria-invalid"),u.err.textContent="",d(u))},m=null,f=(u,w,H,g)=>{if(m)return;l();let L=H,B=document.body.style.overflow,A=null,N=!1,R=document.createElement("div");R.id=t;let q=document.createElement("div");q.className="tb-sg-dialog",q.tabIndex=-1,q.setAttribute("role","dialog"),q.setAttribute("aria-modal","true"),q.setAttribute("aria-labelledby",n);let Z=document.createElement("div");Z.className="tb-sg-head";let at=document.createElement("h2");at.id=n,at.textContent=g?`Note to the authors about \\xB6${g.paragraph}`:"Suggest an edit";let U=document.createElement("button");U.type="button",U.className="tb-sg-close",U.textContent="\\xD7",U.setAttribute("aria-label","Close suggestion form"),Z.append(at,U);let Y=document.createElement("form");Y.noValidate=!0;let tt=document.createElement("p");tt.className="tb-sg-intro",tt.textContent=g?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let ct=document.createElement("blockquote");ct.className="tb-sg-quote",ct.textContent=g?.quote??"",ct.hidden=!g?.quote;let z=lo(),et=document.createElement("input");et.type="text",et.name="name",et.autocomplete="name";let K=o("tb-sg-name","Your name",et),W=document.createElement("p");if(W.className="tb-sg-count",W.id="tb-sg-credit",W.textContent="If the authors accept your suggestion, you\'ll be credited by this name.",K.wrap.append(W),K.hintId=W.id,d(K),z){et.value=z.name||z.login;let T=document.createElement("p");T.className="tb-sg-count",T.id="tb-sg-who",T.textContent=`Signed in as @${z.login}: GitHub tells you when the authors answer.`,K.wrap.append(T),K.hintId=`${W.id} ${T.id}`,d(K)}let h=document.createElement("input");h.type="text",h.name="path",h.readOnly=!0,h.value=w;let v=o("tb-sg-path","Page you are editing",h),y=document.createElement("textarea");y.name="suggestion",y.rows=6,y.maxLength=5e3;let $=o("tb-sg-suggestion","Your suggested change",y),D=document.createElement("p");D.className="tb-sg-count",D.id="tb-sg-count",$.hintId=D.id;let O=()=>{let T=5e3-y.value.length;D.textContent=T+" character"+(T===1?"":"s")+" remaining"};O(),d($),y.addEventListener("input",()=>{O(),b($)}),$.wrap.append(D);let M=document.createElement("textarea");M.name="reasoning",M.rows=3;let I=o("tb-sg-reasoning","Why",M,!0);K.control.addEventListener("input",()=>b(K));let _=document.createElement("div");_.className="tb-sg-hp",_.setAttribute("aria-hidden","true");let J=document.createElement("label");J.setAttribute("for","tb-sg-website"),J.textContent="Leave this field empty";let nt=document.createElement("input");nt.type="text",nt.name="website",nt.id="tb-sg-website",nt.tabIndex=-1,nt.autocomplete="off",nt.setAttribute("aria-hidden","true"),_.append(J,nt);let vt=document.createElement("div");vt.className="tb-sg-actions";let pt=document.createElement("button");pt.type="submit",pt.className="tb-sg-btn",pt.textContent="Send suggestion";let ut=document.createElement("button");ut.type="button",ut.className="tb-sg-quiet",ut.textContent="Cancel",vt.append(pt,ut),Y.append(tt,ct,K.wrap,v.wrap,$.wrap,I.wrap,_,vt);let rt=document.createElement("div");rt.className="tb-sg-pane",rt.tabIndex=-1,rt.hidden=!0,q.append(Z,Y,rt),R.append(q);let Nt=()=>{rt.hidden=!0,Y.hidden=!1,y.focus()},yt=(T,j,P,bt=!1)=>{if(!R.isConnected)return;rt.textContent="";let V=document.createElement("p");V.className="tb-sg-pane-title",V.textContent=T;let ot=document.createElement("p");if(ot.textContent=j,rt.append(V,ot),P){let lt=document.createElement("a");lt.href=P,lt.target="_blank",lt.rel="noopener",lt.textContent="View your suggestion on GitHub";let st=document.createElement("p");st.append(lt),rt.append(st)}let X=document.createElement("button");X.type="button",X.className=bt?"tb-sg-btn":"tb-sg-quiet",X.textContent=bt?"Back to my suggestion":"Close",X.addEventListener("click",bt?Nt:()=>m?.()),rt.append(X),Y.hidden=!0,rt.hidden=!1,rt.focus()},se=()=>Array.prototype.filter.call(q.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),T=>!T.disabled&&T.tabIndex>=0&&!T.closest("[hidden]")),it=T=>{if(T.key==="Escape"){T.preventDefault(),m?.();return}if(T.key!=="Tab")return;let j=se();if(!j.length){T.preventDefault(),q.focus();return}let P=j.indexOf(document.activeElement);T.shiftKey?P<=0&&(T.preventDefault(),j[j.length-1].focus()):(P===-1||P===j.length-1)&&(T.preventDefault(),j[0].focus())};m=()=>{if(m=null,A)try{A.abort()}catch{}document.removeEventListener("keydown",it,!0),R.remove(),document.body.style.overflow=B,L.isConnected&&L.focus()},R.addEventListener("mousedown",T=>{T.target===R&&m?.()}),U.addEventListener("click",()=>m?.()),ut.addEventListener("click",()=>m?.()),document.addEventListener("keydown",it,!0);let Tt=()=>{let T=null,j=(P,bt)=>{c(P,bt),T||(T=P.control)};for(let P of[K,$])b(P);return et.value.trim()||j(K,"Please add your name."),y.value.trim()?y.value.length>5e3&&j($,"Please keep the suggestion under 5000 characters."):j($,"Please describe the change you would like."),T&&T.focus(),!T},At=T=>{N=T,pt.disabled=T,pt.textContent=T?"Sending\\u2026":"Send suggestion"};Y.addEventListener("submit",T=>{if(T.preventDefault(),N||!Tt())return;let j={name:et.value.trim(),suggestion:y.value.trim(),reasoning:M.value.trim(),path:w,website:nt.value,...g?{paragraph:g.paragraph,quote:g.quote,page:g.page}:{},...z?{identity:z.token}:{}};if(j.website){yt("Thank you","Your suggestion has been received.");return}At(!0);let P=A=new AbortController,bt=setTimeout(()=>P.abort(),1e4);fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(j),signal:P.signal}).then(async V=>{let ot=null;try{ot=await V.json()}catch{ot=null}if(!V.ok){let X=new Error(ot?.error||"HTTP "+V.status);throw X.userMessage=p(ot),X}return ot}).then(V=>{dt("suggest_edit_submitted",{outcome:"success"});let ot=V?.issueUrl;yt("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof ot=="string"?ot:null)}).catch(V=>{dt("suggest_edit_submitted",{outcome:"error"}),yt("That did not go through",V&&V.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(bt),A===P&&(A=null),pt.isConnected?At(!1):N=!1})}),document.body.style.overflow="hidden",document.body.appendChild(R),et.focus(),dt(g?"section_note_opened":"suggest_edit_opened")},E=((u,w,H,g)=>{try{f(u,w,H,g)}catch{m=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return E.closeIfOpen=()=>m?.(),E}catch{return null}})(),fn="tb-pedit-style",xn=()=>{if(document.getElementById(fn))return;let t=document.createElement("style");t.id=fn,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},wn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",je),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},co="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",po=t=>{let e=(t.textContent??"").replace(/\\s+/g," ").trim();if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},uo=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(r=>!r.closest(".popover")&&!r.querySelector(":scope > button.tb-pnote"));if(!n.length)return;xn();let s=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let r of n){let i=Number(r.dataset.pnum),p=wn();p.className="tb-pnote",p.title=`Note to the authors about \\xB6${i}`,p.querySelector("path").setAttribute("d",co),p.addEventListener("click",l=>{l.stopPropagation(),oe(p,e,`Continue: note on \\xB6${i}`,()=>t({paragraph:i,quote:po(r),page:s},p))}),r.append(p)}},ee=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(ee))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var bo=t=>typeof t.showPopover=="function",ne=new Set,vn=(t,e)=>{let n=t.closest(".tb-header")??t,r=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),i=t.getBoundingClientRect(),p=document.documentElement.clientWidth,l=e.style;l.boxSizing="border-box",l.top=`${Math.max(r.bottom,0)+6}px`,l.maxHeight=`${Math.max(window.innerHeight-Math.max(r.bottom,0)-12,120)}px`;let o=()=>{l.left=`${Math.max(r.left,0)}px`,l.right="auto",l.width=`${Math.min(r.width,p)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return o();l.left="auto",l.right=`${Math.max(p-i.right,0)}px`,l.width="",e.getBoundingClientRect().left<r.left&&o()},Te=()=>{for(let t of Array.from(ne))vn(t.button,t.panel)};window.addEventListener("resize",Te);window.addEventListener("scroll",Te,{passive:!0});var En=(t,e)=>{e.hidden=!1,bo(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",ne.add({button:t,panel:e}),vn(t,e))},kn=t=>{for(let e of Array.from(ne))e.panel===t&&ne.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Ce=(t,e,n,s)=>{let r=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(o=>!o.hidden&&!o.closest("[hidden]")),i={d:null,button:t,panel:e},p={open(){for(let d of Array.from(ee))d!==i&&d.d.close(!1);En(t,e),t.setAttribute("aria-expanded","true"),ee.add(i),(n?r()[0]:e.querySelector("input:checked")??r()[0])?.focus()},close(o=!0){e.hidden||(kn(e),t.setAttribute("aria-expanded","false"),ee.delete(i),o&&t.focus())}};i.d=p,t.addEventListener("click",()=>{if(!e.hidden)return p.close();s?s(p.open):p.open()});let l=o=>{if(o.key==="Escape"&&!e.hidden){o.preventDefault(),o.stopPropagation(),p.close(!0);return}if(!n||e.hidden||!e.contains(o.target))return;let d=r(),c=d.indexOf(document.activeElement),b=m=>{o.preventDefault(),d[(m+d.length)%d.length]?.focus()};o.key==="ArrowDown"?b(c+1):o.key==="ArrowUp"?b(c-1):o.key==="Home"?b(0):o.key==="End"?b(d.length-1):o.key==="Tab"&&p.close(!1)};return e.addEventListener("keydown",l),t.addEventListener("keydown",l),n&&e.addEventListener("click",o=>{let d=o.target.closest(\'[role="menuitem"]\');if(d){if(d.getAttribute("aria-disabled")==="true"){o.preventDefault();return}p.close(!1)}}),p},k=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,i]of Object.entries(e))r==="text"?s.textContent=i:r==="class"?s.className=i:s.setAttribute(r,i);for(let r of n)r!==null&&s.append(r);return s},re=(t,e,...n)=>{let s=k("dialog",{class:"tb-dialog","aria-label":t}),r=k("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});r.addEventListener("click",()=>s.close()),s.append(r,...n);let i=null;return s.addEventListener("close",()=>{s.remove(),i?i():e.isConnected&&e.focus()}),document.body.append(s),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),{d:s,closeThen:p=>(i=p,s.close())}},yn=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,En(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",kn(e),e.hidden=!1)},4e3))},$n=(t,e,n)=>{let s=()=>{let r=k("textarea",{readonly:""});r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.append(r),r.select();let i=!1;try{i=document.execCommand("copy")}catch{i=!1}return r.remove(),i};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>s()?e():n()):s()?e():n()},Cn="tb-contribute-explained",Ln=!1,mo=()=>{if(Ln)return!0;try{return localStorage.getItem(Cn)==="1"}catch{return!1}},Dt={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},ho=["no","one","two","three"],go="https://hypothes.is/logout",Tn=(t,e,n)=>{Ln=!0;try{localStorage.setItem(Cn,"1")}catch{}let s=({title:b,what:m,who:f,account:E,link:u,switchNote:w})=>k("section",{class:"tb-route"},k("h3",{text:b}),k("p",{text:m}),k("p",{},k("strong",{text:"Who sees it: "}),f),k("p",{},k("strong",{text:"Account: "}),E,u?" ":null,u?k("a",{href:u[1],target:"_blank",rel:"noopener noreferrer",text:u[0]}):null),w?k("p",{},`${w} `,k("a",{href:go,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),r=k("div",{class:"tb-dialog-row"}),i=document.querySelector(".tb-header"),p=window.tbAnnotations,l=(i?.dataset.routes??"comment").split(" ").filter(b=>b!=="comment"||p).map(b=>b==="comment"&&p?.groupsOnly?"groupComment":b).filter(b=>b in Dt),o=l.includes("edit")||l.includes("note")?"book":"edition",d=re("How contributing works",t,k("h2",{text:"How contributing works"}),k("p",{text:l.length===1?`There is one way to help with this ${o}: ${Dt[l[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${ho[l.length]??l.length} ways to help with this ${o}. They differ in who sees what you write, and in which account you need.`}),...l.map(b=>s(Dt[b])),k("p",{},k("a",{href:e,text:"More about commenting and contributing"})),...i?.dataset.credits?[k("p",{},k("a",{href:`${i.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],r),c=k("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>d.d.close()),n){let b=k("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});b.addEventListener("click",()=>d.closeThen(n.run)),r.append(c,b),b.focus()}else r.append(c),c.focus()},oe=(t,e,n,s)=>mo()?s():Tn(t,e,{label:n,run:s}),fo=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},yo=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(i=>i.id===e):void 0;if(n)return Number(n.dataset.pnum);let s=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,r=t.find(i=>{let p=i.getBoundingClientRect();return p.bottom>s+8&&p.top<window.innerHeight});return Number((r??t[0]).dataset.pnum)||0},xo=(t,e,n)=>{let s=URL.createObjectURL(new Blob([t],{type:e})),r=k("a",{href:s,download:n});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3)},wo=(t,e,n,s)=>{let r=t.chapter?yo():0,i=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),p=[...r?[["paragraph",`This paragraph (\\xB6${r})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${i}`]],l=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),o=r&&l?"paragraph":t.chapter?"chapter":"book",d="apa";try{let A=localStorage.getItem("tb-cite-style");A&&Qt.some(([N])=>N===A)&&(d=A)}catch{}let c=k("p",{class:"tb-cite-text","aria-live":"polite"}),b=k("span",{class:"tb-cite-said",role:"status"}),m=()=>un(t,o,new Date,r),f=()=>{b.textContent="",c.textContent="";for(let A of m().styles[d])c.append(A.italic?k("i",{text:A.text}):A.text)},E=(A,N,R,q,Z)=>{let at=k("div",{class:"tb-seg"});for(let[U,Y]of R){let tt=k("input",{type:"radio",name:A,value:U});tt.checked=q()===U,tt.addEventListener("change",()=>{Z(U),f()}),at.append(k("label",{},tt,Y))}return k("fieldset",{},k("legend",{text:N}),at)},u=k("button",{type:"button",class:"tb-btn",text:"Copy"});u.addEventListener("click",()=>{$n(ke(m().styles[d]),()=>b.textContent="Copied",()=>b.textContent="Couldn\'t copy: select the text instead"),dt("citation_copied",{style:d,scope:o})});let w=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",H=[["BibTeX","bib","application/x-bibtex",mn],["RIS","ris","application/x-research-info-systems",hn],["CSL-JSON","json","application/vnd.citationstyles.csl+json",gn]],g=k("div",{class:"tb-dialog-row tb-cite-files"},k("span",{class:"tb-cite-said",text:"Download"}));for(let[A,N,R,q]of H){let Z=k("button",{type:"button",class:"tb-btn",text:A});Z.addEventListener("click",()=>{let{item:at}=m();xo(q(at),R,`${o==="book"?"book":w}${o==="paragraph"?`-p${r}`:""}.${N}`),dt("citation_downloaded",{format:N,scope:o})}),g.append(Z)}let L=$e(e.dataset.licence??""),B=k("p",{class:"tb-cite-text"});for(let A of s())B.append(A.italic?k("i",{text:A.text}):A.text);f(),re("Cite",n,k("h2",{text:"Cite"}),E("tb-cite-scope","What",p,()=>o,A=>o=A),E("tb-cite-style","Style",Qt,()=>d,A=>{d=A;try{localStorage.setItem("tb-cite-style",d)}catch{}}),c,k("div",{class:"tb-dialog-row"},b,u),g,k("h3",{text:L?`Attribution (${L})`:"Attribution"}),B)},vo=(t,e)=>{let n={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:fo(),accessed:new Date},s=l=>{let o=k("p",{class:"tb-cite-text"});for(let d of l)o.append(d.italic?k("i",{text:d.text}):d.text);return o},r=(l,o)=>{let d=k("span",{class:"tb-cite-said",role:"status"}),c=k("button",{type:"button",class:"tb-btn",text:"Copy"});return c.addEventListener("click",()=>$n(ke(o),()=>d.textContent="Copied",()=>d.textContent="Couldn\'t copy: select the text instead")),k("section",{},k("h3",{text:l}),s(o),k("div",{class:"tb-dialog-row"},d,c))},i=pn(document);if(i)return wo(i,t,e,()=>Ee(n));let p=$e(n.licence);re("Cite this page",e,k("h2",{text:"Cite this page"}),r("APA 7",cn(n)),r(p?`Attribution (${p})`:"Attribution",Ee(n)))},Eo=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},ko=(t,e,n,s)=>{let r=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],i=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),p=(o,d,c)=>{let b=r.filter(([m])=>d?.[m]).map(([m,f])=>{let E=k("a",{class:"tb-btn",href:d[m],download:"",text:f});return E.addEventListener("click",()=>dt("download",{format:m,scope:c})),E});return b.length?[k("h3",{text:o}),k("div",{class:"tb-dialog-row tb-cite-files"},...b)]:[]},l=k("button",{type:"button",class:"tb-btn",text:"Markdown"});l.addEventListener("click",s),re("Download",n,k("h2",{text:"Download"}),...p("This page",t.chapter,"chapter"),...p(`Whole ${i}`,t.book,"book"),k("h3",{text:"Source"}),k("div",{class:"tb-dialog-row tb-cite-files"},l))},$o=(t,e,n)=>{let s=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&s.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let r=k("p",{class:"tb-panel-note",role:"status"});for(let[i,p,l]of s){let o=k("div",{class:"tb-seg"});for(let[c,b]of l){let m=k("input",{type:"radio",name:`tb-pref-${i}`,value:c});m.checked=e.get(i)===c,m.addEventListener("change",()=>{if(i==="annotations"&&n){if(r.textContent="",c==="on")n.enable();else if(n.disable().reload){let f=k("button",{type:"button",class:"tb-btn",text:"Reload"});f.addEventListener("click",()=>location.reload()),r.append("Highlights hidden. The annotation tab goes away when the page reloads.",f)}return}e.set(i,c),i==="numbers"&&dt("paragraph_numbers_toggled",{to:c})}),o.append(k("label",{},m,b))}let d=k("fieldset",{},k("legend",{text:p}),o);i==="annotations"&&d.append(r),i==="width"&&Co(t,d),t.append(d)}},Co=(t,e)=>{let n=r=>k("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${r}) * var(--tb-size-body) * var(--tb-text-scale))`}),s=()=>{let r=document.querySelector("article");if(!r?.parentElement||t.hidden)return;let i=n("--tb-measure-standard-em"),p=n("--tb-measure-wide-em");r.parentElement.append(i,p);let l=i.getBoundingClientRect().width,o=p.getBoundingClientRect().width;i.remove(),p.remove(),e.hidden=!(o-l>=16)};new MutationObserver(s).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",s)},Le=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Lo=t=>{let e=!1,n=()=>{e=!1;let r=t.getBoundingClientRect(),i=document.documentElement.style;i.setProperty("--tb-hdr-h",`${Math.round(r.height)}px`),i.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(r.bottom))}px`)},s=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s),typeof ResizeObserver=="function"&&new ResizeObserver(s).observe(t)},Ae=null;window.addEventListener("popstate",()=>Ae?.(location.hash,!1));var To=(t,e,n,s,r)=>{let i={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:r,track:dt};t.addEventListener("click",o=>{if(o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey){dt("edit_on_github_clicked");return}o.preventDefault(),Kt({...i,mode:"page",trigger:n})});let p=new Map,l=Array.from(document.querySelectorAll("[data-pnum]")).filter(o=>!o.closest(".popover")&&!o.querySelector(":scope > button.tb-pedit"));l.length&&xn();for(let o of l){let d=wn();d.addEventListener("click",c=>{c.stopPropagation(),oe(d,s,`Continue: edit \\xB6${o.dataset.pnum}`,()=>Kt({...i,mode:"paragraph",para:o,trigger:d}))}),o.append(d),p.set(o.dataset.pnum??"",{p:o,b:d})}Ae=(o,d)=>{let c=Mt.exec(o);if(!c)return;let b=c[1]?p.get(c[1]):void 0;Kt(b?{...i,mode:"paragraph",para:b.p,trigger:b.b,push:d}:{...i,mode:"page",trigger:n,push:d})}},Ao=(t,e,n)=>{t.addEventListener("click",s=>{s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),nn({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:dt}))})},Fo=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),s=()=>t.scrollWidth>t.clientWidth+1,r=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,i=r?.querySelector(".home-link")?r:null,p=t.querySelector(".tb-hdr-label"),l=()=>!!p&&getComputedStyle(p).position!=="absolute",o=t.querySelector(".tb-hdr-where"),d=f=>!!f&&f.scrollWidth>f.clientWidth+1,c=f=>!s()&&l()===f&&!d(o)&&!Array.from(o?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(d),b=f=>{i?.classList.toggle("tb-logo-full",f),i?.classList.toggle("tb-logo-icon",!f)},m=()=>{let f=!!e&&!!n&&t.dataset.tbHasReader==="1";b(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),f&&(e.hidden=!1,n.hidden=!0),s()&&t.classList.add("tb-hdr-icons"),s()&&(t.classList.add("tb-hdr-tight"),f&&(e.hidden=!0,n.hidden=!1));let E=l();i&&c(E)&&(b(!0),c(E)||b(!1)),Te()};if(m(),window.addEventListener("resize",m),document.fonts?.ready.then(m),typeof ResizeObserver=="function"){let f=new ResizeObserver(()=>requestAnimationFrame(m));f.observe(t);let E=t.querySelector(".tb-hdr-actions");E&&f.observe(E)}return m},So=t=>{let e=o=>t.querySelector(o),n=t.dataset.howTo??"/how-to-comment",s=window,r=e("[data-tb-contribute]"),i=e("[data-tb-more]"),p=o=>{try{o()}catch{}};p(()=>{let o=e("[data-tb-search]"),d=document.querySelector(".search .search-button");!o||!d||(o.addEventListener("click",()=>d.click()),o.hidden=!1)}),p(()=>{let o=e("[data-tb-menu]"),d=document.querySelector(".explorer"),c=d?.querySelector(".mobile-explorer");if(!o||!d||!c)return;let b=t.parentElement;b?.classList.contains("tb-header-slot")&&b.prepend(o);let m=d.querySelector(".explorer-content");m?.id&&o.setAttribute("aria-controls",m.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let f=o.querySelector(".tb-hdr-label"),E=()=>!d.classList.contains("collapsed"),u=()=>{let w=E();o.setAttribute("aria-expanded",String(w)),o.classList.toggle("tb-closes",w),f&&(f.textContent=w?"Close menu":"Menu")};new MutationObserver(u).observe(d,{attributes:!0,attributeFilter:["class"]}),o.addEventListener("click",()=>{E()||s.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",w=>{w.key!=="Escape"||!E()||!Le()||(c.click(),o.focus())}),u(),o.hidden=!1}),p(()=>{let o=e("[data-tb-reader]"),d=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!o||!d||!c)return;let b=()=>o.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",b),o.addEventListener("click",()=>c.click()),d.addEventListener("click",()=>c.click()),b(),t.dataset.tbHasReader="1",o.hidden=!1});let l=()=>{dt("annotation_badge_clicked"),s.tbAnnotations.open().then(o=>{o||yn("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};p(()=>{if(!s.tbAnnotations){let c=e("[data-tb-comment]");if(c&&window.tbCommentsComing){let b=c.querySelector(".tb-mi-t"),m=c.querySelector(".tb-mi-s");b&&(b.textContent=Dt.groupComment.title),m&&(m.textContent="Coming soon for classes"),c.setAttribute("aria-disabled","true"),c.hidden=!1}return}let o=e("[data-tb-annotate]");if(o){let c=o.querySelector(".tb-hdr-label"),b=()=>Le()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),m=()=>{let E=b();o.classList.toggle("tb-closes",E),c&&(c.textContent=E?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",m),window.addEventListener("resize",m);let f=null;o.addEventListener("pointerdown",()=>f=b(),!0),o.addEventListener("click",()=>{let E=f??b();if(f=null,E)return s.tbAnnotations.close?.();let u=document.querySelector(".explorer");u&&!u.classList.contains("collapsed")&&Le()&&u.querySelector(".mobile-explorer")?.click(),oe(o,n,"Continue: open annotations",l)}),o.querySelector(".tb-anno-count")||o.append(k("span",{class:"tb-anno-count"})),o.hidden=!1}let d=e("[data-tb-comment]");if(d){if(d.addEventListener("click",l),s.tbAnnotations.groupsOnly){let c=d.querySelector(".tb-mi-t"),b=d.querySelector(".tb-mi-s");c&&(c.textContent=Dt.groupComment.title),b&&(b.textContent="Hypothes.is account \\xB7 only your group sees it")}d.hidden=!1}}),p(()=>{let o=e("#tb-contribute-menu");if(!r||!o)return;Ce(r,o,!0,E=>oe(r,n,"Continue to Contribute",E)),e("[data-tb-explain]")?.addEventListener("click",()=>Tn(r,n));let d=e("button.tb-suggest-btn"),c=d?.dataset.endpoint,b=d&&c&&te?()=>te(c,d.dataset.path??"",r):void 0,m=e("a.edit-on-github"),f=m?.dataset.editEndpoint;if(m&&f){if(To(m,f,r,n,b),Mt.test(location.hash)){let E=location.hash,u=window.history.state?.tbEditor===!0;u||window.history.replaceState(window.history.state,"",location.pathname+location.search),Ae?.(E,!u)}}else m?.addEventListener("click",()=>dt("edit_on_github_clicked"));d&&b&&(d.addEventListener("click",b),d.hidden=!1,uo((E,u)=>te(c,d.dataset.path??"",u,E),n)),r.hidden=!1}),p(()=>{let o=e("[data-tb-appearance]"),d=e("#tb-appearance");!o||!d||!s.tbPrefs||($o(d,s.tbPrefs,s.tbAnnotations),Ce(o,d,!1),o.hidden=!1)}),p(()=>{let o=e("#tb-more-menu");if(!i||!o)return;Ce(i,o,!0),e("[data-tb-cite]")?.addEventListener("click",()=>vo(t,i)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let d=e("a.tb-history-link");d?.dataset.revisionEndpoint&&Ao(d,d.dataset.revisionEndpoint,i);let c=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");c&&(!b||!b.querySelector("a.internal")?(c.setAttribute("aria-disabled","true"),c.append(k("span",{class:"tb-mi-s",text:"No other page links here"}))):c.addEventListener("click",()=>{let u=b.querySelector("h3")??b;u.tabIndex=-1,b.scrollIntoView({block:"start"}),u.focus({preventScroll:!0})}));let m=e("[data-tb-download]"),f=Eo();if(m&&f){let u=m.querySelector(".tb-mi-t");u&&(u.textContent="Download\\u2026")}let E=()=>fetch(m.dataset.tbDownload).then(u=>u.ok?u.blob():Promise.reject(new Error(String(u.status)))).then(u=>{let w=URL.createObjectURL(u),H=k("a",{href:w,download:m.dataset.file??"page.md"});document.body.append(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(w),1e3)}).catch(()=>yn("That didn\'t download just now. View source has the same file."));m?.addEventListener("click",()=>f?ko(f,t,i,E):E()),i.hidden=!1}),p(()=>{Fo(t)}),p(()=>{let o=t.parentElement;Lo(o?.classList.contains("tb-header-slot")?o:t)})},Ho=()=>{try{te?.closeIfOpen(),Ge(),en();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",So(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&sn(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",Ho);\n';

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