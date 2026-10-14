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
var controls_inline_default = 'var We=/^\\s{0,3}(```|~~~)/,Gn=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,Wn=t=>{let e=t.split(`\n`),n=[],s=0;if(e[0]?.trim()==="---"){let l=e.findIndex((c,i)=>i>0&&(c.trim()==="---"||c.trim()==="..."));l>0&&(s=l+1)}let r=0;for(;s<e.length;){let l=e[s];if(!l.trim()){s++;continue}let c=We.exec(l);if(c||l.trim()==="$$"){let u=c?c[1]:"$$",p=s+1;for(;p<e.length&&!e[p].trim().startsWith(u);)p++;s=p+1;continue}let i=s;for(;i<e.length&&e[i].trim()&&!We.test(e[i]);)i++;let o=e.slice(s,i).join(`\n`),d=!Gn.test(l);n.push({start:s,text:o,ordinal:d?++r:0}),s=i}return n},Kn=t=>Ke(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),Ke=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],Yn=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let r of t)n.set(r,(n.get(r)??0)+1);let s=0;for(let r of e){let l=n.get(r)??0;l>0&&(s++,n.set(r,l-1))}return s/Math.max(t.length,e.length)};var Ye=(t,e,n)=>{let s=Ke(e);if(!s.length)return null;let r=null,l=0,c=1/0;for(let i of Wn(t)){let o=Yn(Kn(i.text),s);if(o<.75)continue;let d=i.ordinal?Math.abs(i.ordinal-n):1e6;(o>l+.02||Math.abs(o-l)<=.02&&d<c)&&(r=i,l=Math.max(o,l),c=d)}return r};var Zt=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let s=t.length,r=e.length;for(;s>n&&r>n&&t[s-1]===e[r-1];)s--,r--;let l=t.slice(0,n).map(u=>({t:"=",v:u})),c=t.slice(s).map(u=>({t:"=",v:u})),i=t.slice(n,s),o=e.slice(n,r),d;if((i.length+1)*(o.length+1)>4e5)d=[...i.map(u=>({t:"-",v:u})),...o.map(u=>({t:"+",v:u}))];else{let u=o.length+1,p=new Uint32Array((i.length+1)*u);for(let k=i.length-1;k>=0;k--)for(let b=o.length-1;b>=0;b--)p[k*u+b]=i[k]===o[b]?p[(k+1)*u+b+1]+1:Math.max(p[(k+1)*u+b],p[k*u+b+1]);d=[];let m=0,y=0;for(;m<i.length&&y<o.length;)i[m]===o[y]?(d.push({t:"=",v:i[m]}),m++,y++):p[(m+1)*u+y]>=p[m*u+y+1]?d.push({t:"-",v:i[m++]}):d.push({t:"+",v:o[y++]});for(;m<i.length;)d.push({t:"-",v:i[m++]});for(;y<o.length;)d.push({t:"+",v:o[y++]})}return[...l,...d,...c]},Vt=t=>t.split(/(\\s+)/).filter(e=>e!==""),Jt=(t,e)=>{let n=[];for(let s of Zt(t.split(`\n`),e.split(`\n`))){let r=n[n.length-1];s.v.trim()&&(s.t==="="?r&&"same"in r?r.same.push(s.v):n.push({same:[s.v]}):r&&"ops"in r?r.ops.push(s):n.push({ops:[s]}))}return n.some(s=>"ops"in s)?n:[]},Xt=t=>`${t} unchanged paragraph${t===1?"":"s"}`,Ve=t=>{let e=[];for(let n=0;n<t.length;){let s=[],r=[];for(;t[n]?.t==="=";)n++;for(;t[n]?.t==="-";)s.push(t[n++].v);for(;t[n]?.t==="+";)r.push(t[n++].v);let l=s.map(i=>({t:"-",words:[{v:i,changed:!0}]})),c=r.map(i=>({t:"+",words:[{v:i,changed:!0}]}));for(let i=0;i<Math.min(s.length,r.length);i++){let o=Zt(Vt(s[i]),Vt(r[i]));l[i].words=o.filter(d=>d.t!=="+").map(d=>({v:d.v,changed:d.t==="-"})),c[i].words=o.filter(d=>d.t!=="-").map(d=>({v:d.v,changed:d.t==="+"}))}for(let i of[...l,...c])i.words=i.words.reduce((o,d)=>{let u=o[o.length-1];return u&&u.changed===d.changed?u.v+=d.v:o.push({...d}),o},[]);e.push(...l,...c)}return e};var Qt="Saving\\u2026 this can take up to a minute.",ke={pollMs:3e3,waitMs:18e4,runningMs:35e3},Vn=Math.random().toString(36).slice(2)+Date.now().toString(36);async function Zn(t,e){let n=new TextEncoder().encode(`${Vn}\n${t}\n${e}`),s=new Uint8Array(await crypto.subtle.digest("SHA-256",n));return Array.from(s.slice(0,16),r=>r.toString(16).padStart(2,"0")).join("")}var Jn=t=>new Promise(e=>setTimeout(e,t));async function te(t,e,{signal:n,onWait:s}={}){let r=await Zn(t,e),l=new URL(t);l.searchParams.set("write_key",r);let c=(m={},y)=>{let k=new URL(l);for(let[b,L]of Object.entries(m))k.searchParams.set(b,L);return fetch(k,{method:"POST",headers:{"Content-Type":"application/json"},body:e,signal:y})},i=null,o="network";try{i=await c({},n)}catch{n?.aborted&&(o="timeout")}if(i&&i.status<500&&i.status!==202)return i;if(s?.(),i&&i.status>=500&&(o=String(i.status)),!i||i.status>=500){let m=await c({fallback:o}).catch(()=>null);if(!m)throw new Error("network");if(m.status!==202)return m}let d=new URL("write-status",l);d.searchParams.set("write_key",r);let u=Date.now(),p=!1;for(;Date.now()-u<ke.waitMs;){await Jn(ke.pollMs);let m=await fetch(d).catch(()=>null);if(!m)continue;if(m.status!==202)return m;(await m.json().catch(()=>null))?.state==="running"&&!p&&Date.now()-u>ke.runningMs&&(p=!0,await c({fallback:"timeout"}).catch(()=>null))}return new Response(JSON.stringify({error:"timeout",userMessage:"This is taking longer than it should. Nothing you wrote is lost: try again in a few minutes."}),{status:504,headers:{"Content-Type":"application/json"}})}var Mt=t=>(Array.isArray(t)?t:[]).filter(e=>!!e&&Number.isInteger(e.number)&&typeof e.date=="string"&&typeof e.url=="string"&&/^https:\\/\\/github\\.com\\//.test(e.url)&&["edit","note","suggestion"].includes(e.kind)&&Array.isArray(e.comments)),ee=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},$e=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},Ct=(t,e="",n={})=>{try{let s=new URL(t,"https://x.invalid"),r=new URL("history",s);r.searchParams.set("book",s.searchParams.get("book")??""),e&&r.searchParams.set("path",e);for(let[l,c]of Object.entries(n))r.searchParams.set(l,c);return t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},Ze=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(r=>r.toLowerCase());return e.find(r=>r.role&&r.role!=="contributor"&&n.includes(r.who.toLowerCase()))?.role??"contributor"},Tt=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",Je=(t,e)=>{let n=[],s=[...e].sort((r,l)=>l.date.localeCompare(r.date));for(let r of t){for(;s.length&&s[0].date>=r.date;)n.push({release:s.shift()});n.push({entry:r})}for(let r of s)n.push({release:r});return n},Xe=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),Qe=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state),At=(t,e)=>`${t==="edit"||t==="pr"?"pr":"issue"}-${e}`,ne=(t,e)=>{let n=typeof t=="string"?/^https:\\/\\/github\\.com\\/[^/]+\\/[^/]+\\/(issues|pull)\\/(\\d+)$/.exec(t):null;return n?`${e}/history#${At(n[1]==="pull"?"pr":"issue",Number(n[2]))}`:null},tn=t=>t.state==="open"?t.accepted?"drafts":"proposed":t.merged||t.reason==="completed"?"drafts":"declined";var Bt="tb-editor",en="tb-editor-style",Ae="tb-gh-identity",Le=10,Ce=500,Xn=7.5*60*60*1e3,nn=2e4,Qn=200,Pt=/^#edit(?:-(\\d+))?$/,to=t=>t?`#edit-${t}`:"#edit",on={tbEditor:!0},eo="This page has changes waiting for review; you\\u2019re editing the latest draft.",a=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,l]of Object.entries(e))l!==!1&&(r==="text"?s.textContent=String(l):r==="class"?s.className=String(l):s.setAttribute(r,l===!0?"":String(l)));for(let r of n)r&&s.append(r);return s},rn="http://www.w3.org/2000/svg",oe=t=>{let e=document.createElementNS(rn,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(rn,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},an="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",sn="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",no="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",oo="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",se=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,Qn):null},ro=()=>{try{let t=sessionStorage.getItem(Ae);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>Xn?null:e}catch{return null}},Te=t=>{try{t?sessionStorage.setItem(Ae,JSON.stringify(t)):sessionStorage.removeItem(Ae)}catch{}},Se=()=>{if(document.getElementById(en))return;let t=`#${Bt}`,e=a("style",{id:en});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-same + .tb-ed-hunk, ${t} .tb-ed-hunk + .tb-ed-same { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-ed-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline;\n  min-height: 24px; min-width: 24px; } /* a 24px target at least (batch 2b) */\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},so=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),ao="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",Fe=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(ao).forEach(s=>s.remove()),e.querySelectorAll("*").forEach(s=>{for(let r of Array.from(s.attributes)){let l=r.value.trim().toLowerCase();(r.name.startsWith("on")||(r.name==="href"||r.name==="src")&&/^(javascript|data|vbscript):/.test(l))&&s.removeAttribute(r.name)}s.tagName==="A"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},io=(t,e)=>{let n=a("div",{class:"tb-ed-diff"}),s=Jt(t,e);if(!s.length)return n.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let r=(l,c)=>{let i=a("div",{class:`tb-ed-line${l==="-"?" tb-ed-del":l==="+"?" tb-ed-add":""}`}),o=a("span");return typeof c=="string"?o.textContent=c||" ":o.append(...c),i.append(a("span",{"aria-hidden":"true",text:l==="="?" ":l==="-"?"\\u2212":"+"}),o),i};for(let l of s){if("same"in l){let i=a("details",{class:"tb-ed-same"},a("summary",{text:Xt(l.same.length)}));i.append(...l.same.map(o=>r("=",o))),n.append(i);continue}let c=a("div",{class:"tb-ed-hunk"});for(let i of Ve(l.ops))c.append(r(i.t,i.words.map(o=>o.changed?a(i.t==="-"?"del":"ins",{text:o.v}):document.createTextNode(o.v))));n.append(c)}return n},re=null,ln=()=>re?.(),ae=t=>{if(re)return;Se();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,s=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),r=t.path.split("/"),l=r.pop(),c=t.para&&Number(t.para.getAttribute("data-pnum"))||0,i=t.mode,o="",d="",u="drafts",p=null,m="",y=ro(),k=!1,b=!1,L=null,M=null,I=!1,g=window.scrollY,F=to(i==="paragraph"?c:0),f=a("div",{id:Bt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),R=a("span",{class:"tb-ed-pill"},oe(sn),a("span",{text:u})),T=a("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},oe(no));T.append(a("span",{text:t.repo.split("/").pop()||t.repo}));for(let w of r)T.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{text:w}));T.append(a("span",{class:"tb-ed-sep",text:"/"}),a("span",{class:"tb-ed-file",text:l}));let N=a("span",{class:"tb-ed-muted",text:c?` \\xB7 \\xB6${c}`:""});T.append(N,R);let j=a("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),V=a("div",{class:"tb-ed-head"},T,j),G=a("div",{class:"tb-ed-discard",role:"alert",hidden:!0},a("span",{text:"Discard your changes?"})),Z=a("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),et=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});G.append(Z,et);let dt=a("div",{class:"tb-ed-main"}),W=a("div",{class:"tb-ed-inner"}),at=a("p",{class:"tb-ed-note",hidden:!0}),nt=a("p",{class:"tb-ed-note",hidden:!0,text:eo}),z=a("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),h=a("div",{class:"tb-ed-gate",hidden:!0});W.append(nt,at,z,h),dt.append(W),f.append(V,G,dt);let x=["Edit","Preview","Changes"],v=a("div",{role:"tablist","aria-label":"Editor view"}),$=x.map((w,C)=>a("button",{type:"button",role:"tab",id:`tb-ed-tab-${C}`,"aria-controls":`tb-ed-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:w==="Edit"?"Edit":w==="Preview"?"Preview":"Changes"}));v.append(...$);let O=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),P=a("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),D=a("div",{class:"tb-ed-bar"},v,a("div",{class:"tb-ed-actions"},O,P)),B=a("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),K=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),J=a("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),mt=[a("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},K,B,J),a("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),a("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],ct=a("div",{class:"tb-ed-box"},D,...mt),vt=a("p",{class:"tb-ed-foot"}),X=()=>B.value,Et=()=>m,Ft=w=>{$.forEach((C,S)=>{C.setAttribute("aria-selected",S===w?"true":"false"),C.tabIndex=S===w?0:-1,mt[S].hidden=S!==w}),w===1&&wt(),w===2&&(mt[2].textContent="",mt[2].append(io(Et(),X())))};$.forEach((w,C)=>{w.addEventListener("click",()=>Ft(C)),w.addEventListener("keydown",S=>{let H=S.key==="ArrowRight"?1:S.key==="ArrowLeft"?-1:0;if(!H)return;S.preventDefault();let Q=(C+H+$.length)%$.length;Ft(Q),$[Q].focus()})});let yt=0,wt=()=>{let w=mt[1];w.textContent="",w.className="tb-ed-panel tb-ed-preview";let C=a("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});w.append(C);let S=++yt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:so(X()),mode:"markdown"})}).then(H=>H.ok?H.text():Promise.reject(new Error(String(H.status)))).then(H=>{S===yt&&(w.textContent="",w.append(Fe(H)))}).catch(()=>{S===yt&&(C.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};B.addEventListener("input",()=>{b=X()!==m,P.disabled=!b});let rt=a("div",{class:"tb-ed-scrim",hidden:!0}),kt=a("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});rt.append(kt),f.append(rt);let $t=(w,C,S,H=!1)=>{S.id=w;let Q=a("p",{class:"tb-ed-err",id:`${w}-err`}),it=a("label",{for:w,text:C},H?a("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:a("div",{class:"tb-ed-field"},it,S,Q),control:S,err:Q}},q=$t("tb-ed-msg","What did you change, and why?",a("textarea",{rows:2,maxlength:Ce,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));q.wrap.append(a("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let Gt=document.querySelector(".tb-page-controls")?.dataset.privacy,Ht=$t("tb-ed-desc","Extended description",a("textarea",{rows:3,maxlength:5e3}),!0),Lt=a("div",{class:"tb-ed-who"}),Dt=a("div",{class:"tb-ed-what"},oe(sn)),Nt=a("span");Dt.append(Nt);let Ot=a("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),A=a("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),U=a("form",{novalidate:!0},a("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),q.wrap,Ht.wrap,Lt,Dt,Gt?a("p",{class:"tb-ed-muted tb-ed-hint tb-ed-published"},"Your proposal is published openly on GitHub, under the book\'s licence. ",a("a",{href:Gt,text:"How contributions are handled"})):null,a("div",{class:"tb-ed-row"},Ot,A)),_=a("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});kt.append(U,_);let ot=()=>{if(Lt.textContent="",y){let w=a("img",{src:`https://avatars.githubusercontent.com/u/${y.id}?s=56`,alt:""}),C=a("button",{type:"button",class:"tb-ed-link",text:"Sign out"});C.addEventListener("click",()=>{y=null,Te(null),ot()}),Lt.append(w,a("span",{},"Signed in as ",a("strong",{text:`@${y.login}`})," \\u2014 this edit will be credited to your GitHub account."),C)}else Lt.append(ht(),a("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},ht=()=>{let w=a("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},oe(oo),"Sign in with GitHub");return w.addEventListener("click",()=>bt(w)),w},st=()=>{h.textContent="";let w=ht(),C=a("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let S=a("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});S.addEventListener("click",()=>{Kt(),t.suggest()}),C.append(S," instead: it needs no account.")}else C.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");h.append(a("h2",{text:"Sign in to edit"}),a("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),a("p",{},w),C),z.hidden=!0,h.hidden=!1,w.focus()},tt=w=>{if(w.origin!==n)return;let C=w.data;if(!(!C||C.type!=="tb-github-identity")){if(L=null,C.error||typeof C.token!="string"||typeof C.login!="string"){t.track("github_signin",{outcome:C.error==="denied"?"cancelled":"error"});return}if(y={token:C.token,login:C.login,id:Number(C.id)||0,name:C.name??"",at:Date.now()},Te(y),t.track("github_signin",{outcome:"success"}),!I)return Ge();ot(),rt.hidden||q.control.focus()}},bt=w=>{let C=`${s}?origin=${encodeURIComponent(location.origin)}`;L=window.open(C,"tb-github-signin","popup,width=560,height=720"),!L&&!w.parentElement?.querySelector(".tb-ed-err")&&w.after(a("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",tt);let ut=(w,C)=>{w.control.setAttribute("aria-invalid","true"),w.control.setAttribute("aria-describedby",w.err.id),w.err.textContent=C},gt=w=>{w.control.removeAttribute("aria-invalid"),w.control.removeAttribute("aria-describedby"),w.err.textContent=""};q.control.addEventListener("input",()=>gt(q));let Un=()=>{Nt.textContent="",Nt.append("This creates a new branch and opens a proposal to merge it into ",a("code",{text:u}),". Nothing changes in the book until an editor accepts it."),ot(),U.hidden=!1,_.hidden=!0,rt.hidden=!1,q.control.focus()},ve=()=>{rt.hidden=!0,P.focus()};P.addEventListener("click",Un),Ot.addEventListener("click",ve),rt.addEventListener("mousedown",w=>{w.target===rt&&!k&&ve()});let Ee=(w,C,S,H)=>{if(!f.isConnected)return;_.textContent="",_.append(a("h2",{text:w}),a("p",{text:C}));let Q=ne(S?.href,location.origin);Q&&_.append(a("p",{class:"tb-ed-follow"},"Follow your suggestion: ",a("a",{href:Q,text:Q}))),S&&_.append(a("p",{},a("a",{href:S.href,target:"_blank",rel:"noopener",text:S.text})));let it=a("button",{type:"button",class:`tb-ed-btn${H?" tb-ed-primary":""}`,text:H?"Back to my edit":"Close"});it.addEventListener("click",H?()=>{_.hidden=!0,U.hidden=!1,A.focus()}:()=>Wt(!0)),_.append(a("div",{class:"tb-ed-row"},it)),U.hidden=!0,_.hidden=!1,_.focus()};U.addEventListener("submit",w=>{if(w.preventDefault(),k)return;let C=null;gt(q);let S=q.control.value.trim().length;if(S<Le||S>Ce?(ut(q,S<Le?`Please say what you changed and why, in at least ${Le} characters.`:`Please keep it under ${Ce} characters.`),C=q.control):y||(C=Lt.querySelector("button")),C){C.focus();return}let H={mode:i,path:t.path,baseSha:d,title:i==="paragraph"&&c?`Edit \\xB6${c} of ${l}`:`Update ${l}`,summary:q.control.value.trim().replace(/\\s+/g," "),description:Ht.control.value.trim()};i==="page"?H.content=X():(H.startLine=p.start,H.original=p.text,H.replacement=X(),c&&(H.paragraph=c)),H.identity=y.token,k=!0,A.disabled=!0,A.textContent="Proposing\\u2026";let Q=M=new AbortController,it=setTimeout(()=>Q.abort(),nn);te(t.endpoint,JSON.stringify(H),{signal:Q.signal,onWait:()=>{clearTimeout(it),A.textContent=Qt}}).then(async Y=>{let Yt=null;try{Yt=await Y.json()}catch{Yt=null}if(Y.status===401&&y&&(y=null,Te(null),ot()),!Y.ok)throw Object.assign(new Error(String(Y.status)),{userMessage:se(Yt)});return Yt}).then(Y=>{b=!1,Y.fallback&&typeof Y.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:i}),Ee("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:Y.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:i}),Ee("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof Y.prUrl=="string"?{href:Y.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(Y=>{t.track("page_edit_submitted",{outcome:"error",mode:i}),Ee("That did not go through",Y&&Y.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(it),M===Q&&(M=null),k=!1,A.disabled=!1,A.textContent="Propose changes"})});let zn=w=>Array.from(w.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]")),Ue=w=>{if(w.key==="Escape"){w.preventDefault(),rt.hidden?_t():k||(!_.hidden&&U.hidden&&!b?Wt(!0):ve());return}if(w.key!=="Tab")return;let C=rt.hidden?f:kt,S=zn(C);if(!S.length){w.preventDefault(),C.focus();return}let H=S.indexOf(document.activeElement);(w.shiftKey?H<=0:H===-1||H===S.length-1)&&(w.preventDefault(),S[w.shiftKey?S.length-1:0].focus())},ze=w=>{b&&(w.preventDefault(),w.returnValue="")},Wt=(w=!1)=>{if(!w&&b)return _t();b=!1,Pt.test(location.hash)?history.back():Kt()},je=()=>{if(!Pt.test(location.hash)){if(b)return history.pushState(on,"",F),_t();Kt()}},Kt=()=>{re=null,M?.abort(),L?.close(),document.removeEventListener("keydown",Ue,!0),window.removeEventListener("message",tt),window.removeEventListener("beforeunload",ze),window.removeEventListener("popstate",je),f.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,g)},_t=()=>{if(!b)return Wt(!0);G.hidden=!1,et.focus()};Z.addEventListener("click",()=>Wt(!0)),et.addEventListener("click",()=>{G.hidden=!0,B.focus()}),j.addEventListener("click",_t),O.addEventListener("click",_t),document.addEventListener("keydown",Ue,!0),window.addEventListener("beforeunload",ze),window.addEventListener("popstate",je),re=Kt,t.push!==!1&&history.pushState(on,"",F),document.body.style.overflow="hidden",document.body.append(f),j.focus(),t.track("page_editor_opened",{mode:i});let jn=w=>{z.textContent="",z.removeAttribute("class"),z.append(w+" ",a("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},Ge=()=>{if(!y)return st();I=!0,h.hidden=!0,z.hidden=!1;let w=new AbortController,C=setTimeout(()=>w.abort(),nn);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:w.signal}).then(async S=>{let H=null;try{H=await S.json()}catch{H=null}if(!S.ok)throw Object.assign(new Error(String(S.status)),{userMessage:se(H)});return H}).then(S=>{if(f.isConnected){if(typeof S?.content!="string"||typeof S.sha!="string")throw new Error("bad source");if(o=S.content,d=S.sha,u=typeof S.branch=="string"?S.branch:u,R.lastChild.textContent=u,nt.hidden=!t.builtBlob||t.builtBlob===d,i==="paragraph"&&(p=t.para?Ye(o,t.para.textContent??"",c):null,p||(i="page",N.textContent="",at.textContent=`We couldn\\u2019t find \\xB6${c} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,at.hidden=!1)),i==="paragraph"&&p){ct.classList.add("tb-ed-para");let H=o.split(`\n`),Q=p.text.split(`\n`).length,it=H.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),Y=H.slice(p.start+Q,p.start+Q+3).join(`\n`).trim();K.textContent=it.length>220?`\\u2026${it.slice(-220)}`:it,J.textContent=Y.length>220?`${Y.slice(0,220)}\\u2026`:Y,K.hidden=!it,J.hidden=!Y,m=p.text,vt.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in."}else m=o,vt.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";B.value=m,z.remove(),W.append(ct,vt),B.setSelectionRange(0,0),B.focus()}}).catch(S=>{f.isConnected&&jn(S&&S.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(C))};Ge()};var St=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},ie=(t,e)=>Vt(t).map(n=>({v:n,s:{...e}})),It=(t,e={})=>{let n=[],s={...e},r="",l=()=>{r&&n.push(...ie(r,s)),r=""},c=i=>!!i&&/[\\p{L}\\p{N}]/u.test(i);for(let i=0;i<t.length;){let o=t.slice(i),d;if(o[0]==="\\\\"&&o.length>1)r+=o[1],i+=2;else if(d=/^`([^`]+)`/.exec(o))l(),n.push(...ie(d[1],{...s,code:!0})),i+=d[0].length;else if(d=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(o)){l();let u=d[2]??d[1].split("/").pop()??d[1];n.push(...ie(u,{...s,link:!0})),i+=d[0].length}else if(d=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(o))l(),n.push(...ie(`(image${d[1]?`: ${d[1]}`:""})`,{...s,i:!0})),i+=d[0].length;else if(d=/^\\[\\^([^\\]]+)\\]/.exec(o))l(),n.push({v:d[1],s:{...s,sup:!0}}),i+=d[0].length;else if(d=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(o))l(),n.push(...It(d[1],{...s,link:!0})),i+=d[0].length;else if(d=/^<\\/?[a-zA-Z][^>]*>/.exec(o))l(),i+=d[0].length;else if(o.startsWith("**")||o.startsWith("__")){let u=o.slice(0,2);s.b||t.indexOf(u,i+2)>i+2?(l(),s.b=!s.b):r+=u,i+=2}else(o[0]==="*"||o[0]==="_")&&!(o[0]==="_"&&c(t[i-1])&&c(t[i+1]))?(s.i||t.indexOf(o[0],i+1)>i+1?(l(),s.i=!s.i):r+=o[0],i+=1):(r+=o[0],i+=1)}return l(),n},le=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:It(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:It(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:It(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:It(e[2])}:{kind:"p",runs:It(t)}:{kind:"blank",runs:[]}},dn=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=a("code",{},e)),t.s.i&&(e=a("em",{},e)),t.s.b&&(e=a("strong",{},e)),t.s.link&&(e=a("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=a("sup",{},e)),e},de=(t,e,n)=>{let s=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,r=a("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),l=a("div",{class:"tb-rd-text"});e.marker&&l.append(a("span",{class:"tb-rd-marker",text:e.marker}));let c=null;for(let{run:i,changed:o}of n)o&&t!=="="?(c||(c=a(t==="-"?"del":"ins"),l.append(c)),c.append(dn(i))):(c=null,l.append(dn(i)));return a("div",{class:s},r,l)},ce=(t,e)=>t.map(n=>({run:n,changed:e})),qt=(t,e)=>{let n=a("div",{class:"tb-ed-diff tb-rd"}),s=St(t),r=St(e),l=Jt(s,r);if(!l.length)return n.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:s!==r||t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n;for(let c of l){if("same"in c){let o=a("details",{class:"tb-rd-same"},a("summary",{text:Xt(c.same.length)}));for(let d of c.same){let u=le(d);o.append(de("=",u,ce(u.runs,!1)))}n.append(o);continue}let i=c.ops;for(let o=0;o<i.length;){let d=i[o];if(d.t==="="){let b=le(d.v);n.append(de("=",b,ce(b.runs,!1))),o++;continue}let u=[],p=[];for(;i[o]?.t==="-";)u.push(le(i[o++].v));for(;i[o]?.t==="+";)p.push(le(i[o++].v));let m=Math.min(u.length,p.length),y=u.map(b=>ce(b.runs,!0)),k=p.map(b=>ce(b.runs,!0));for(let b=0;b<m;b++){let L=u[b].runs,M=p[b].runs,I=Zt(L.map(T=>T.v),M.map(T=>T.v)),g=0,F=0,f=[],R=[];for(let T of I)T.t!=="+"&&f.push({run:L[g++],changed:T.t==="-"}),T.t!=="-"&&R.push({run:M[F++],changed:T.t==="+"});y[b]=f,k[b]=R}u.forEach((b,L)=>n.append(de("-",b,y[L]))),p.forEach((b,L)=>n.append(de("+",b,k[L])))}}return n};var lo="No reason was recorded.",Ut=t=>t.kind==="edit"?"Declined proposed edit":t.kind==="note"?t.paragraph?`Declined note on \\xB6${t.paragraph}`:"Declined note":"Declined suggestion",He=t=>{let e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"}):t},co=async(t,e)=>{let n=await fetch(t,{signal:e,credentials:"omit"}),s=await n.json().catch(()=>null);if(!n.ok)throw Object.assign(new Error(`HTTP ${n.status}`),{userMessage:s?.userMessage});return s},ue=(t,e)=>{let n=a("div",{class:"tb-dc"});n.append(a("div",{class:"tb-dc-who",text:`Proposed by ${t.who?.name??"a reader"} on ${He(t.proposed)}. Declined${t.decliner?` by ${t.decliner}`:""} on ${He(t.date)}.`}),a("blockquote",{class:`tb-dc-reason${t.reason?"":" tb-dc-none"}`},a("span",{class:"tb-dc-label",text:"Why it was declined: "}),t.reason??lo));let s=a("div",{class:"tb-hi-actions tb-dc-actions"}),r=a("div",{class:"tb-hi-diff tb-dc-diff",hidden:!0});if(t.kind==="edit"&&e){let l=a("button",{type:"button","aria-pressed":"false",text:"Show changes"});l.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0,l.setAttribute("aria-pressed","false");return}l.setAttribute("aria-pressed","true"),r.hidden=!1,r.textContent="",r.append(a("p",{class:"tb-ed-muted",role:"status",text:"Loading what was proposed\\u2026"}));let c=new AbortController,i=setTimeout(()=>c.abort(),2e4);co(Ct(e,"",{change:String(t.number)}),c.signal).then(o=>{let d=o?.files??[];r.textContent="",d.length||r.append(a("p",{class:"tb-ed-muted",text:"The proposal changed no page."}));for(let u of d)r.append(qt(typeof u.before=="string"?u.before:"",typeof u.after=="string"?u.after:""))}).catch(o=>{r.textContent="",r.append(a("p",{class:"tb-ed-note",role:"alert",text:o?.userMessage||"What was proposed couldn\\u2019t be loaded just now."}))}).finally(()=>clearTimeout(i))}),s.append(l)}if(s.append(a("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",text:`See #${t.number} on GitHub \\u2197`})),n.append(s,r),t.comments.length){let l=a("ol",{class:"tb-dc-comments","aria-label":"Comments from the book\'s people"});for(let c of t.comments)l.append(a("li",{class:"tb-dc-comment"},a("div",{class:"tb-dc-cmeta",text:`${c.name} \\xB7 ${He(c.date)}`}),a("p",{class:"tb-dc-ctext",text:c.text})));n.append(a("div",{class:"tb-dc-chead",text:"Comments from the book\\u2019s people"}),l)}return n},pe=t=>`\n${t} .tb-dc { margin-top: 0.4rem; }\n${t} .tb-dc p, ${t} .tb-dc-who, ${t} .tb-dc-cmeta { margin: 0.15rem 0; overflow-wrap: anywhere; }\n${t} .tb-dc-who, ${t} .tb-dc-cmeta, ${t} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }\n${t} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }\n${t} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }\n${t} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }\n${t} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-dc-ctext { white-space: pre-line; }\n${t} .tb-hi-state.tb-hi-declined, ${t} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }\n`;var cn={author:"Author",editor:"Editor",contributor:"Contributor"},be=t=>{if(!t||!(t in cn))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=cn[t],e};var un="tb-history-style",uo=30,pn=2e4,bn="a reader",Me=t=>`\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-rd-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n`,po=()=>{if(document.getElementById(un))return;let t=`#${Bt}.tb-hi`,e=a("style",{id:un});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n${Me(t)}\n${pe(t)}\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},bo=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),s=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return s?`Paragraph ${s[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},ft=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},pt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),s=null;try{s=await n.json()}catch{}if(!n.ok){let r=new Error(`HTTP ${n.status}`);throw r.userMessage=se(s),r}return s},me=null,mn=()=>me?.(),hn=t=>{if(me||document.getElementById(Bt))return;Se(),po();let e=document.body.style.overflow,n=null,s=0,r=a("div",{id:Bt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),l=a("div",{class:"tb-hi-where",id:"tb-hi-title"},a("span",{class:"tb-hi-name",text:"Page history"}),t.title?a("span",{class:"tb-hi-page",text:t.title}):null),c=a("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},a("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),a("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),i=a("div",{class:"tb-ed-main"}),o=a("div",{class:"tb-ed-inner"});i.append(o),r.append(a("div",{class:"tb-hi-top"},l,c),i);let d=h=>a("p",{class:"tb-ed-muted",role:"status",text:h}),u=(h,x)=>{let v=a("div",{class:"tb-ed-note",role:"alert"});return v.append(a("span",{text:`${h?.userMessage||x} `}),a("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),v},p=()=>{n?.abort();let h=new AbortController;n=h;let x=setTimeout(()=>h.abort(),pn);return{signal:h.signal,done:()=>clearTimeout(x),current:()=>n===h}},m=null,y=[],k=[],b=[],L=null,M=h=>{let x=new URL(t.endpoint,location.href);for(let[v,$]of Object.entries(h))x.searchParams.set(v,$);return x.toString()},I=h=>h.path??m?.source??t.path,g=()=>m?.published[0]??null,F=(h,x)=>{let v=a("p",{class:"tb-hi-meta"});x&&v.append(a("span",{class:"tb-hi-state",text:x})),v.append(`${ft(h.date)}${h.who?` \\xB7 ${h.who}`:""}`);let $=be(h.role);return $&&v.append(" ",$),h.pr&&t.githubHref&&v.append(" \\xB7 ",a("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${h.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${h.pr}`})),v},f=(h,x,v)=>{if(!x.hidden){x.hidden=!0,v.setAttribute("aria-pressed","false");return}v.setAttribute("aria-pressed","true"),x.hidden=!1,x.textContent="",x.append(d("Loading what changed\\u2026")),t.track("page_revision_opened");let $=new AbortController,O=setTimeout(()=>$.abort(),pn);pt(M({sha:h.sha,path:I(h)}),$.signal).then(P=>{let D=P,B=typeof D.before=="string"?D.before:"",K=typeof D.after=="string"?D.after:"";x.textContent="",D.status==="added"&&x.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let J=typeof D.previousPath=="string"&&D.previousPath!==I(h);J&&x.append(a("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${St(B)===St(K)?"; its text didn\\u2019t change.":"."}`})),(!J||St(B)!==St(K))&&x.append(qt(B,K))}).catch(P=>{x.textContent="",x.append(u(P,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(O))},R=(h,x)=>{s=i.scrollTop,o.textContent="";let v=a("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});v.addEventListener("click",()=>{n?.abort(),Z()});let $=a("div",{});return o.append(v,a("div",{class:"tb-hi-banner",role:"status",text:x}),a("div",{class:"tb-hi-head"},a("h2",{text:h})),$),i.scrollTop=0,v.focus(),$},T=h=>{let x=R(h.summary,`You are reading the version of ${ft(h.date)}.`);x.append(d("Loading this version\\u2026")),t.track("page_version_read");let v=p();pt(M({sha:h.sha,path:I(h)}),v.signal).then($=>{if(!v.current())return;let O=$.html;x.textContent="",x.append(typeof O=="string"&&O?a("div",{class:"tb-ed-panel tb-ed-preview"},Fe(O)):a("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch($=>{v.current()&&(x.textContent="",x.append(u($,"This version couldn\\u2019t be loaded just now.")))}).finally(v.done)},N=(h,x)=>{let[v,$]=h.date<=x.date?[h,x]:[x,h],O=B=>`the version of ${ft(B.date)}${B===g()?" (the one you read now)":""}`,P=R("Compare versions",`Changes from ${O(v)} to ${O($)}.`);P.append(d("Loading the two versions\\u2026")),t.track("page_versions_compared");let D=p();pt(M({sha:$.sha,base:v.sha,path:I($)}),D.signal).then(B=>{if(!D.current())return;let K=B;P.textContent="",P.append(a("div",{class:"tb-hi-diff"},qt(typeof K.before=="string"?K.before:"",typeof K.after=="string"?K.after:"")))}).catch(B=>{D.current()&&(P.textContent="",P.append(u(B,"The versions couldn\\u2019t be compared just now.")))}).finally(D.done)},j=(h,x)=>{let v=a("li",{class:"tb-hi-entry"}),$=a("div",{class:"tb-hi-diff",hidden:!0}),O=a("button",{type:"button","aria-pressed":"false",text:"Show changes"});O.addEventListener("click",()=>f(h,$,O));let P=a("button",{type:"button",text:"Read this version"});P.addEventListener("click",()=>T(h));let D=a("button",{type:"button",text:L?L===h?"Cancel compare":"Compare with this":"Compare\\u2026"});D.addEventListener("click",()=>{if(!L)L=h,Z();else if(L===h)L=null,Z();else{let J=L;L=null,N(J,h)}});let B=a("div",{class:"tb-hi-actions"},O,P,D),K=g();if(!L&&K&&K.sha!==h.sha){let J=a("button",{type:"button",text:"Compare with now"});J.addEventListener("click",()=>N(h,K)),B.append(J)}return v.append(a("p",{class:"tb-hi-msg",text:h.summary}),F(h,x),B,$),v},V=h=>{let x=a("li",{class:"tb-hi-entry"});return x.append(a("p",{class:"tb-hi-msg",text:h.summary||Tt(h)}),F({date:h.date,who:h.who?.name??"A reader",role:Ze(h,[...m?.published??[],...m?.drafts??[]])},`Proposed \\xB7 ${Tt(h)}`),a("div",{class:"tb-hi-actions"},a("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",text:`See #${h.number} on GitHub \\u2197`}))),x},G=h=>a("li",{class:"tb-hi-entry tb-hi-declined-entry"},a("p",{class:"tb-hi-msg",text:h.summary||Ut(h)}),a("p",{class:"tb-hi-meta"},a("span",{class:"tb-hi-state tb-hi-declined",text:"Declined"}),`${Ut(h).replace(/^Declined /,"")} \\xB7 ${ft(h.date)}`),ue(h,t.endpoint)),Z=()=>{if(o.textContent="",!m)return;if(L&&o.append(a("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${ft(L.date)}: pick the other version, below.`})),k.length||m.drafts.length){let v=a("ol",{class:"tb-hi-list"});for(let $ of k)v.append(V($));for(let $ of m.drafts)v.append(j($,"Being edited"));o.append(a("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},a("h2",{id:"tb-hi-editing",text:"Being edited"}),a("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),v))}let h=a("ol",{class:"tb-hi-list"}),x=[...b].sort((v,$)=>$.date.localeCompare(v.date));for(let v of Je(m.published,y)){let $="release"in v?v.release.date:v.entry.date;for(;x.length&&x[0].date>$;)h.append(G(x.shift()));"release"in v?h.append(a("li",{class:"tb-hi-release",role:"separator","aria-label":`${$e(v.release.tag)}, ${ft(v.release.date)}`,text:`${$e(v.release.tag)} \\xB7 ${ft(v.release.date)}`})):h.append(j(v.entry,void 0))}for(let v of x)h.append(G(v));o.append(a("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},a("h2",{id:"tb-hi-published",text:b.length?"Published and declined":"Published"}),a("p",{text:m.published.length?b.length?"What readers have seen, and what the authors declined and why, newest first.":"What readers have seen, newest first.":b.length?"This page has no published versions yet. What the authors declined, and why:":"This page has no published versions yet."}),h)),i.scrollTop=s},et=h=>{if(h.key==="Escape"){h.preventDefault(),dt();return}if(h.key!=="Tab")return;let x=Array.from(r.querySelectorAll("a[href], button, [tabindex]")).filter($=>!$.disabled&&$.tabIndex>=0&&!$.closest("[hidden]"));if(!x.length)return;let v=x.indexOf(document.activeElement);(h.shiftKey?v<=0:v===-1||v===x.length-1)&&(h.preventDefault(),x[h.shiftKey?x.length-1:0].focus())},dt=()=>{me=null,n?.abort(),document.removeEventListener("keydown",et,!0),r.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};c.addEventListener("click",dt),document.addEventListener("keydown",et,!0),me=dt,document.body.style.overflow="hidden",document.body.append(r),c.focus(),t.track("page_history_opened"),o.append(d("Loading this page\\u2019s history\\u2026"));let W=p(),at=t.bookHistoryUrl?pt(t.bookHistoryUrl,W.signal).then(h=>{let x=ee(h),v=x?.pages.find($=>$.source===t.path)??null;return x&&(y=x.releases),x&&!b.length&&(b=Mt(x.declined).filter($=>$.files?.includes(t.path))),v}):Promise.resolve(null),nt=Ct(t.endpoint,t.path,{declined:"1"}),z=nt?pt(nt,W.signal).then(h=>(b=Mt(h?.declined),(h?.items??[]).filter(x=>x&&typeof x.url=="string"))).catch(()=>[]):Promise.resolve([]);at.catch(()=>null).then(async h=>{if(h)return h;let x=await pt(t.listUrl,W.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(x)?x:[]).map((v,$,O)=>({sha:v.sha,date:v.date,who:v.who,role:null,summary:bo(v.message??"",$===O.length-1),...v.path!==t.path?{path:v.path}:{}})),drafts:[],releases:{}}}).then(async h=>{m=h;let x=[...h.published,...h.drafts],v=[...new Set(x.filter(D=>D.who===bn).map(D=>D.sha))].slice(0,uo),$=v.length?pt(M({shas:v.join(",")}),W.signal).then(D=>D?.names??{}).catch(()=>({})):Promise.resolve({}),[O,P]=await Promise.all([$,z]);for(let D of x){let B=O[D.sha];D.who===bn&&typeof B=="string"&&B.trim()&&(D.who=B.trim().slice(0,80))}k=P,W.current()&&Z()}).catch(h=>{W.current()&&(o.textContent="",o.append(u(h,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(W.done)};var Rt="http://www.w3.org/2000/svg",gn={proposed:"Proposed",drafts:"Being edited",published:"Published",declined:"Declined"},fn="tb-bh-style",mo=(t,e)=>{let n=s=>{let r=s?.querySelector("title")?.textContent;if(r){for(let l of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))l.removeAttribute("aria-current");s.setAttribute("aria-current","true"),e.textContent=r}};t.addEventListener("click",s=>n(s.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",s=>n(s.target.closest(".tb-swim-dot")))},ho=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!s)return;let[r,l]=n.map(i=>({t:Date.parse(i.textContent??""),x:Number(i.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let c=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2;for(let i of e){let o=Math.min(Math.max(Date.parse(i.date),r.t),l.t),d=document.createElementNS(Rt,"circle");d.setAttribute("class","tb-swim-dot"),d.setAttribute("data-lane","0"),d.setAttribute("cx",(r.x+(o-r.t)/(l.t-r.t)*(l.x-r.x)).toFixed(1)),d.setAttribute("cy",String(c)),d.setAttribute("r","5"),d.setAttribute("tabindex","0");let u=document.createElementNS(Rt,"title");u.textContent=`${i.date} \\xB7 ${Tt(i)}: ${i.summary} (${i.who?.name??"a reader"})`,d.append(u),t.append(d)}},go=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),s=t.querySelector(\'.tb-swim-lane[data-lane="3"]\');if(n.length<2||!s)return;let[r,l]=n.map(o=>({t:Date.parse(o.textContent??""),x:Number(o.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let c=Number(s.getAttribute("y"))+Number(s.getAttribute("height"))/2,i=new Set(Array.from(t.querySelectorAll(".tb-swim-declined")).map(o=>o.getAttribute("data-number")));for(let o of e){if(i.has(String(o.number)))continue;let d=r.x+(Math.min(Math.max(Date.parse(o.date),r.t),l.t)-r.t)/(l.t-r.t)*(l.x-r.x),u=document.createElementNS(Rt,"g");for(let[k,b]of Object.entries({class:"tb-swim-dot tb-swim-declined","data-lane":"3","data-number":String(o.number),tabindex:"0",fill:"none",stroke:"currentColor","stroke-width":"1.5"}))u.setAttribute(k,b);let p=document.createElementNS(Rt,"title");p.textContent=`${o.date} \\xB7 declined: ${o.summary} (${o.who?.name??"a reader"})`;let m=document.createElementNS(Rt,"circle");m.setAttribute("cx",d.toFixed(1)),m.setAttribute("cy",String(c)),m.setAttribute("r","5");let y=document.createElementNS(Rt,"path");y.setAttribute("d",`M${(d-3).toFixed(1)} ${c-3}L${(d+3).toFixed(1)} ${c+3}M${(d+3).toFixed(1)} ${c-3}L${(d-3).toFixed(1)} ${c+3}`),u.append(p,m,y),t.append(u)}},Be=(t,e,n,s)=>{let r=a("select",{class:"tb-bh-select"});r.append(a("option",{value:"",text:"Any"}));for(let[l,c]of n)r.append(a("option",{value:l,text:c}));return r.addEventListener("change",()=>s(e,r.value)),a("label",{class:"tb-bh-filter"},a("span",{text:t}),r)},yn=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let s=document.querySelector("svg.tb-swimlane");if(s){let g=a("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});s.closest("figure")?.append(g),mo(s,g)}let r=new AbortController;setTimeout(()=>r.abort(),2e4);let l=ee(await pt(e,r.signal).catch(()=>null));if(!l)return;let c=n?Ct(n):"";document.getElementById(fn)||document.head.append(a("style",{id:fn,text:Me(".tb-bh-list")+pe(".tb-bh-list")}));let i=Mt(l.declined),o=c?await pt(Ct(n,"",{declined:"1"}),r.signal).then(g=>{let F=g?.declined;return Array.isArray(F)&&(i=Mt(F)),(g?.items??[]).filter(f=>f&&typeof f.url=="string")}).catch(()=>[]):[];s&&(ho(s,o),go(s,i));let d=new Map(l.pages.map(g=>[g.source,g])),u=[...o.map(g=>{let F=g.files?.map(f=>d.get(f)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||Tt(g),state:"proposed",page:F?.source??"",pageTitle:F?.title??"",href:g.url,ref:`#${g.number}`,anchor:At(g.kind,g.number)}}),...i.map(g=>{let F=g.files?.map(f=>d.get(f)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||Ut(g),state:"declined",page:F?.source??"",pageTitle:F?.title??"",href:g.url,ref:`#${g.number}`,anchor:At(g.kind,g.number),declined:g}}),...Xe(l).map(g=>({date:g.date,who:g.who,role:g.role,summary:g.summary,state:g.state,page:g.page.source,pageTitle:g.page.title,href:g.page.path,ref:g.pr?`#${g.pr}`:"",anchor:g.pr?At("pr",g.pr):g.issue?At("issue",g.issue):""}))].sort((g,F)=>F.date.localeCompare(g.date)),p={page:"",person:"",state:""},m=a("ol",{class:"tb-bh-list"}),y=a("p",{class:"tb-bh-count",role:"status"}),k=()=>{m.textContent="";let g=u.filter(f=>Qe(p,f));y.textContent=`${g.length} change${g.length===1?"":"s"}`;let F=new Set;for(let f of g){let R=a("p",{class:"tb-bh-meta"},a("span",{class:`tb-bh-state tb-bh-${f.state}`,text:gn[f.state]}),` ${ft(f.date)}${f.who?` \\xB7 ${f.who}`:""}`),T=f.anchor&&!F.has(f.anchor)?f.anchor:!1;T&&F.add(T);let N=be(f.role);N&&R.append(" ",N),f.state==="proposed"&&R.append(" \\xB7 ",a("a",{href:f.href,target:"_blank",rel:"noopener noreferrer",text:`${f.ref} on GitHub \\u2197`})),m.append(a("li",{class:"tb-bh-item",id:T,tabindex:T?"-1":!1},a("p",{class:"tb-bh-summary",text:f.summary}),f.pageTitle?a("p",{class:"tb-bh-page"},f.state==="proposed"||f.state==="declined"?f.pageTitle:a("a",{href:f.href,text:f.pageTitle})):null,R,f.note?a("p",{class:"tb-bh-note",text:f.note}):null,f.declined?ue(f.declined,n):null))}},b=(g,F)=>{Object.assign(p,{[g]:F}),k()},L=[...new Set(u.map(g=>g.who).filter(Boolean))].sort((g,F)=>g.localeCompare(F)),M=l.pages.filter(g=>g.published.length||g.drafts.length).map(g=>[g.source,g.title]);t.append(a("h2",{text:"All changes"}),a("div",{class:"tb-bh-filters"},Be("Chapter","page",M,b),Be("Person","person",L.map(g=>[g,g]),b),Be("State","state",Object.entries(gn),b)),y,m),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),k();let I=async()=>{let g=/^#((?:issue|pr)-(\\d+))$/.exec(location.hash);if(!g)return;let F=g[1];if(!document.getElementById(F)&&n){let R=new URL(n,location.href);R.searchParams.set("mode","item"),R.searchParams.set("number",g[2]);let T=await pt(R.toString(),AbortSignal.timeout(15e3)).catch(()=>null);if(T&&T.number===Number(g[2])&&At(T.kind,T.number)===F){let N=tn(T),j=T.files?.map(V=>d.get(V)).find(Boolean);u.unshift({date:String((N==="proposed"?T.created:T.closed)??T.created).slice(0,10),who:T.who?.name??"A reader",role:"contributor",summary:T.summary||Tt(T),state:N,page:j?.source??"",pageTitle:j?.title??"",href:N==="drafts"&&j?j.path:T.url,ref:`#${T.number}`,anchor:F,note:N==="drafts"?"The authors accepted this. It shows as Published once the book is next published.":N==="declined"?"The authors declined this.":void 0}),Object.assign(p,{page:"",person:"",state:""});for(let V of Array.from(t.querySelectorAll(".tb-bh-select")))V.value="";k()}}let f=document.getElementById(F);f&&(f.scrollIntoView({block:"start"}),f.focus({preventScroll:!0}))};window.addEventListener("hashchange",()=>{I()}),I()};var xn={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},vn=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),fo=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(s=>`${s.charAt(0).toUpperCase()}.`).join(" ")}`},yo=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,wn=t=>/[.?!]$/.test(t)?t:`${t}.`,En=t=>{let e=yo(vn(t.authors).map(fo)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),s=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=[],l=s?[{text:`${wn(s)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)r.push({text:`${wn(e)} (n.d.). `},...l);else if(l.length){let[c,...i]=l;r.push({...c,text:c.text.replace(/ $/,"")},{text:" (n.d.). "},...i)}else r.push({text:"(n.d.). "});return r.push({text:`Retrieved ${n}, from ${t.url}`}),r},Re=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=xn[t.licence],s=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&s.push({text:` by ${vn(t.authors).join(", ")}`}),e&&t.bookTitle&&s.push({text:", from "},{text:t.bookTitle,italic:!0}),s.push({text:`, ${t.url}`}),n?s.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&s.push({text:`, is licensed under ${t.licence}`}),s.push({text:"."}),s},De=t=>t.map(e=>e.text).join(""),Ne=t=>xn[t]?.name??t,he=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],kn=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},wo=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function $n(t,e,n,s=0){let r=e!=="book"&&t.chapter&&t.styles.chapter,l=r?t.chapter:t.book,c=r?t.styles.chapter:t.styles.book,i=e==="paragraph"&&r?s:0,o=i?`${l.URL}#p${i}`:l.URL,d=wo(n),u={};for(let[m]of he)u[m]=(c[m]??[]).map(y=>({...y,text:y.text.replaceAll("{accessed}",d).replace(l.URL,i?`${o} (para. ${i})`:o)}));return{item:{...l,id:o,URL:o,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...i?{note:`para. ${i}`}:{}},styles:u}}var zt=t=>t?.["date-parts"]?.[0]??[],xt=t=>String(t??"").padStart(2,"0"),Ln=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),xo=t=>{let e=r=>r.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),s=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(r=>r.length>3)??"");return`${n}${zt(t.issued)[0]??""}${s}`.toLowerCase()||"citation"},vo={chapter:"incollection",book:"book",report:"techreport"},Ie=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function Cn(t){let[e,n,s]=zt(t.issued),[r,l,c]=zt(t.accessed),i=u=>u?Ie(u):void 0,d=[["author",t.author?.map(u=>u.literal?`{${Ie(u.literal)}}`:Ie(Ln(u))).join(" and ")],["title",i(t.title)],["booktitle",t.type==="chapter"?i(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",i(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&s?`${e}-${xt(n)}-${xt(s)}`:void 0],["url",t.URL],["urldate",r?`${r}-${xt(l)}-${xt(c)}`:void 0],["doi",t.DOI],["language",i(t.language)],["note",i(t.note)],["keywords",i(t.keyword)],["abstract",i(t.abstract)]].filter(([,u])=>u).map(([u,p])=>`  ${u} = {${p}}`).join(`,\n`);return`@${vo[t.type]??"misc"}{${xo(t)},\n${d}\n}\n`}var Eo={chapter:"CHAP",book:"BOOK",report:"RPRT"};function Tn(t){let[e,n,s]=zt(t.issued),[r,l,c]=zt(t.accessed);return[["TY",Eo[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(o=>["AU",Ln(o)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${xt(n)}/${xt(s)}`:void 0],["UR",t.URL],["Y2",r?`${r}/${xt(l)}/${xt(c)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(o=>["KW",o]),["N1",t.note]].filter(([,o])=>o).map(([o,d])=>`${o}  - ${d.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var An=t=>JSON.stringify([t],null,2)+`\n`;var lt=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},ko=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},ge=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",c=b=>{let L=b?.userMessage,M=typeof L=="string"?L.trim():"";return M?M.slice(0,200):null},i=()=>{if(document.getElementById(e))return;let b=document.createElement("style");b.id=e,b.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(b)},o=(b,L,M,I=!1)=>{let g=document.createElement("div");g.className="tb-sg-field";let F=document.createElement("label");if(F.setAttribute("for",b),F.textContent=L,I){let R=document.createElement("span");R.className="tb-sg-opt",R.textContent=" (optional)",F.append(R)}let f=document.createElement("p");return f.className="tb-sg-err",f.id=b+"-err",M.id=b,!I&&!M.readOnly&&(M.required=!0),g.append(F,M,f),{wrap:g,control:M,err:f,hintId:null}},d=b=>{let L=[];b.err.textContent&&L.push(b.err.id),b.hintId&&L.push(b.hintId),L.length?b.control.setAttribute("aria-describedby",L.join(" ")):b.control.removeAttribute("aria-describedby")},u=(b,L)=>{b.control.setAttribute("aria-invalid","true"),b.err.textContent=L,d(b)},p=b=>{b.control.hasAttribute("aria-invalid")&&(b.control.removeAttribute("aria-invalid"),b.err.textContent="",d(b))},m=null,y=(b,L,M,I)=>{if(m)return;i();let g=M,F=document.body.style.overflow,f=null,R=!1,T=document.createElement("div");T.id=t;let N=document.createElement("div");N.className="tb-sg-dialog",N.tabIndex=-1,N.setAttribute("role","dialog"),N.setAttribute("aria-modal","true"),N.setAttribute("aria-labelledby",n);let j=document.createElement("div");j.className="tb-sg-head";let V=document.createElement("h2");V.id=n,V.textContent=I?`Note to the authors about \\xB6${I.paragraph}`:"Suggest an edit";let G=document.createElement("button");G.type="button",G.className="tb-sg-close",G.textContent="\\xD7",G.setAttribute("aria-label","Close suggestion form"),j.append(V,G);let Z=document.createElement("form");Z.noValidate=!0;let et=document.createElement("p");et.className="tb-sg-intro",et.textContent=I?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let dt=document.createElement("blockquote");dt.className="tb-sg-quote",dt.textContent=I?.quote??"";let W=I?.text??"";dt.hidden=!I?.quote||!!W;let at=ko(),nt=document.createElement("input");nt.type="text",nt.name="name",nt.autocomplete="name";let z=o("tb-sg-name","Your name",nt),h=document.createElement("p");if(h.className="tb-sg-count",h.id="tb-sg-credit",h.textContent="If the authors accept your suggestion, you\'ll be credited by this name.",z.wrap.append(h),z.hintId=h.id,d(z),at){nt.value=at.name||at.login;let A=document.createElement("p");A.className="tb-sg-count",A.id="tb-sg-who",A.textContent=`Signed in as @${at.login}: GitHub tells you when the authors answer.`,z.wrap.append(A),z.hintId=`${h.id} ${A.id}`,d(z)}let x=document.createElement("input");x.type="text",x.name="path",x.readOnly=!0,x.value=L;let v=o("tb-sg-path","Page you are editing",x),$=document.createElement("textarea");$.name="suggestion",$.rows=6,$.maxLength=5e3,$.value=W;let O=o("tb-sg-suggestion","Your suggested change",$),P=document.createElement("p");P.className="tb-sg-count",P.id="tb-sg-count",O.hintId=P.id;let D=()=>{let A=5e3-$.value.length;P.textContent=A+" character"+(A===1?"":"s")+" remaining"};D(),d(O),$.addEventListener("input",()=>{D(),p(O)}),O.wrap.append(P);let B=document.createElement("textarea");B.name="reasoning",B.rows=3;let K=o("tb-sg-reasoning","Comment",B,!0);z.control.addEventListener("input",()=>p(z));let J=document.createElement("div");J.className="tb-sg-hp",J.setAttribute("aria-hidden","true");let mt=document.createElement("label");mt.setAttribute("for","tb-sg-website"),mt.textContent="Leave this field empty";let ct=document.createElement("input");ct.type="text",ct.name="website",ct.id="tb-sg-website",ct.tabIndex=-1,ct.autocomplete="off",ct.setAttribute("aria-hidden","true"),J.append(mt,ct);let vt=document.createElement("div");vt.className="tb-sg-actions";let X=document.createElement("button");X.type="submit",X.className="tb-sg-btn",X.textContent="Send suggestion";let Et=document.createElement("button");Et.type="button",Et.className="tb-sg-quiet",Et.textContent="Cancel",vt.append(X,Et);let Ft=()=>$.value.replace(/\\s+/g," ").trim()===W.replace(/\\s+/g," ").trim(),yt=()=>Ft()&&!B.value.trim(),wt=document.createElement("p");wt.className="tb-sg-count",wt.id="tb-sg-why-not",wt.textContent=W?"Change the text above, or add a comment, to send.":"Describe the change, or add a comment, to send.",X.setAttribute("aria-describedby",wt.id);let rt=()=>{wt.hidden=!yt(),R||(X.disabled=yt())};$.addEventListener("input",rt),B.addEventListener("input",rt);let kt=document.querySelector(".tb-page-controls")?.dataset.privacy,$t=document.createElement("p");if($t.className="tb-sg-count tb-sg-published",$t.append("Your name and text are published openly, under the book\'s licence. "),kt){let A=document.createElement("a");A.href=kt,A.textContent="How contributions are handled",$t.append(A)}Z.append(et,dt,z.wrap,v.wrap,O.wrap,K.wrap,J,wt,...kt?[$t]:[],vt),rt();let q=document.createElement("div");q.className="tb-sg-pane",q.tabIndex=-1,q.hidden=!0,N.append(j,Z,q),T.append(N);let Gt=()=>{q.hidden=!0,Z.hidden=!1,$.focus()},Ht=(A,U,_,ot=!1)=>{if(!T.isConnected)return;q.textContent="";let ht=document.createElement("p");ht.className="tb-sg-pane-title",ht.textContent=A;let st=document.createElement("p");st.textContent=U,q.append(ht,st);let tt=ne(_,location.origin);if(tt){let ut=document.createElement("a");ut.href=tt,ut.textContent=tt;let gt=document.createElement("p");gt.className="tb-sg-follow",gt.append("Follow your suggestion: ",ut),q.append(gt)}if(_){let ut=document.createElement("a");ut.href=_,ut.target="_blank",ut.rel="noopener",ut.textContent="View your suggestion on GitHub";let gt=document.createElement("p");gt.append(ut),q.append(gt)}let bt=document.createElement("button");bt.type="button",bt.className=ot?"tb-sg-btn":"tb-sg-quiet",bt.textContent=ot?"Back to my suggestion":"Close",bt.addEventListener("click",ot?Gt:()=>m?.()),q.append(bt),Z.hidden=!0,q.hidden=!1,q.focus()},Lt=()=>Array.prototype.filter.call(N.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),A=>!A.disabled&&A.tabIndex>=0&&!A.closest("[hidden]")),Dt=A=>{if(A.key==="Escape"){A.preventDefault(),m?.();return}if(A.key!=="Tab")return;let U=Lt();if(!U.length){A.preventDefault(),N.focus();return}let _=U.indexOf(document.activeElement);A.shiftKey?_<=0&&(A.preventDefault(),U[U.length-1].focus()):(_===-1||_===U.length-1)&&(A.preventDefault(),U[0].focus())};m=()=>{if(m=null,f)try{f.abort()}catch{}document.removeEventListener("keydown",Dt,!0),T.remove(),document.body.style.overflow=F,g.isConnected&&g.focus()},T.addEventListener("mousedown",A=>{A.target===T&&m?.()}),G.addEventListener("click",()=>m?.()),Et.addEventListener("click",()=>m?.()),document.addEventListener("keydown",Dt,!0);let Nt=()=>{let A=null,U=(_,ot)=>{u(_,ot),A||(A=_.control)};for(let _ of[z,O])p(_);return nt.value.trim()||U(z,"Please add your name."),!$.value.trim()&&!Ft()?U(O,"Please describe the change you would like."):$.value.length>5e3&&U(O,"Please keep the suggestion under 5000 characters."),A&&A.focus(),!A},Ot=A=>{R=A,X.disabled=A||yt(),X.textContent=A?"Sending\\u2026":"Send suggestion"};Z.addEventListener("submit",A=>{if(A.preventDefault(),R||yt()||!Nt())return;let U=Ft(),_={name:nt.value.trim(),suggestion:(U?B:$).value.trim(),reasoning:U?"":B.value.trim(),path:L,website:ct.value,...I?{paragraph:I.paragraph,quote:!U&&W?W:I.quote,page:I.page}:{},...at?{identity:at.token}:{}};if(_.website){Ht("Thank you","Your suggestion has been received.");return}Ot(!0);let ot=f=new AbortController,ht=setTimeout(()=>ot.abort(),1e4);te(b,JSON.stringify(_),{signal:ot.signal,onWait:()=>{clearTimeout(ht),X.textContent=Qt}}).then(async st=>{let tt=null;try{tt=await st.json()}catch{tt=null}if(!st.ok){let bt=new Error(tt?.error||"HTTP "+st.status);throw bt.userMessage=c(tt),bt}return tt}).then(st=>{lt("suggest_edit_submitted",{outcome:"success"});let tt=st?.issueUrl;Ht("Thank you \\u2014 suggestion sent","A maintainer will pick this up. Keep this link to see what they decide:",typeof tt=="string"?tt:null)}).catch(st=>{lt("suggest_edit_submitted",{outcome:"error"}),Ht("That did not go through",st&&st.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(ht),f===ot&&(f=null),X.isConnected?Ot(!1):R=!1})}),document.body.style.overflow="hidden",document.body.appendChild(T),nt.focus(),lt(I?"section_note_opened":"suggest_edit_opened")},k=((b,L,M,I)=>{try{y(b,L,M,I)}catch{m=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return k.closeIfOpen=()=>m?.(),k}catch{return null}})(),Sn="tb-pedit-style",Hn=()=>{if(document.getElementById(Sn))return;let t=document.createElement("style");t.id=Sn,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},Mn=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",an),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},$o="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",Bn=t=>(t.textContent??"").replace(/\\s+/g," ").trim(),Lo=()=>{let t=window.getSelection?.(),e=t&&!t.isCollapsed?t.toString().replace(/\\s+/g," ").trim():"",n=e?t.anchorNode:null,s=(n instanceof Element?n:n?.parentElement)?.closest("article [data-pnum]");if(!s||s.closest(".popover"))return;let r=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");return{paragraph:Number(s.dataset.pnum),quote:In(s),page:r,text:e}},In=t=>{let e=Bn(t);if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},Co=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(r=>!r.closest(".popover")&&!r.querySelector(":scope > button.tb-pnote"));if(!n.length)return;Hn();let s=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let r of n){let l=Number(r.dataset.pnum),c=Mn();c.className="tb-pnote",c.title=`Note to the authors about \\xB6${l}`,c.querySelector("path").setAttribute("d",$o),c.addEventListener("click",i=>{i.stopPropagation(),we(c,e,`Continue: note on \\xB6${l}`,()=>t({paragraph:l,quote:In(r),page:s,text:Bn(r)},c))}),r.append(c)}},fe=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(fe))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var To=t=>typeof t.showPopover=="function",ye=new Set,Rn=(t,e)=>{let n=t.closest(".tb-header")??t,r=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),l=t.getBoundingClientRect(),c=document.documentElement.clientWidth,i=e.style;i.boxSizing="border-box",i.top=`${Math.max(r.bottom,0)+6}px`,i.maxHeight=`${Math.max(window.innerHeight-Math.max(r.bottom,0)-12,120)}px`;let o=()=>{i.left=`${Math.max(r.left,0)}px`,i.right="auto",i.width=`${Math.min(r.width,c)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return o();i.left="auto",i.right=`${Math.max(c-l.right,0)}px`,i.width="",e.getBoundingClientRect().left<r.left&&o()},Pe=()=>{for(let t of Array.from(ye))Rn(t.button,t.panel)};window.addEventListener("resize",Pe);window.addEventListener("scroll",Pe,{passive:!0});var Dn=(t,e)=>{e.hidden=!1,To(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",ye.add({button:t,panel:e}),Rn(t,e))},Nn=t=>{for(let e of Array.from(ye))e.panel===t&&ye.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Oe=(t,e,n,s)=>{let r=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(o=>!o.hidden&&!o.closest("[hidden]")),l={d:null,button:t,panel:e},c={open(){for(let d of Array.from(fe))d!==l&&d.d.close(!1);Dn(t,e),t.setAttribute("aria-expanded","true"),fe.add(l),(n?r()[0]:e.querySelector("input:checked")??r()[0])?.focus()},close(o=!0){e.hidden||(Nn(e),t.setAttribute("aria-expanded","false"),fe.delete(l),o&&t.focus())}};l.d=c,t.addEventListener("click",()=>{if(!e.hidden)return c.close();s?s(c.open):c.open()});let i=o=>{if(o.key==="Escape"&&!e.hidden){o.preventDefault(),o.stopPropagation(),c.close(!0);return}if(!n||e.hidden||!e.contains(o.target))return;let d=r(),u=d.indexOf(document.activeElement),p=m=>{o.preventDefault(),d[(m+d.length)%d.length]?.focus()};o.key==="ArrowDown"?p(u+1):o.key==="ArrowUp"?p(u-1):o.key==="Home"?p(0):o.key==="End"?p(d.length-1):o.key==="Tab"&&c.close(!1)};return e.addEventListener("keydown",i),t.addEventListener("keydown",i),n&&e.addEventListener("click",o=>{let d=o.target.closest(\'[role="menuitem"]\');if(d){if(d.getAttribute("aria-disabled")==="true"){o.preventDefault();return}c.close(!1)}}),c},E=(t,e={},...n)=>{let s=document.createElement(t);for(let[r,l]of Object.entries(e))r==="text"?s.textContent=l:r==="class"?s.className=l:s.setAttribute(r,l);for(let r of n)r!==null&&s.append(r);return s},xe=(t,e,...n)=>{let s=E("dialog",{class:"tb-dialog","aria-label":t}),r=E("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});r.addEventListener("click",()=>s.close()),s.append(r,...n);let l=null;return s.addEventListener("close",()=>{s.remove(),l?l():e.isConnected&&e.focus()}),document.body.append(s),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),{d:s,closeThen:c=>(l=c,s.close())}},Fn=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,Dn(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Nn(e),e.hidden=!1)},4e3))},On=(t,e,n)=>{let s=()=>{let r=E("textarea",{readonly:""});r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.append(r),r.select();let l=!1;try{l=document.execCommand("copy")}catch{l=!1}return r.remove(),l};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>s()?e():n()):s()?e():n()},_n="tb-contribute-explained",Pn=!1,Ao=()=>{if(Pn)return!0;try{return localStorage.getItem(_n)==="1"}catch{return!1}},jt={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Reword a paragraph where it stands, or tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},So=["no","one","two","three"],Fo="https://hypothes.is/logout",qn=(t,e,n)=>{Pn=!0;try{localStorage.setItem(_n,"1")}catch{}let s=({title:p,what:m,who:y,account:k,link:b,switchNote:L})=>E("section",{class:"tb-route"},E("h3",{text:p}),E("p",{text:m}),E("p",{},E("strong",{text:"Who sees it: "}),y),E("p",{},E("strong",{text:"Account: "}),k,b?" ":null,b?E("a",{href:b[1],target:"_blank",rel:"noopener noreferrer",text:b[0]}):null),L?E("p",{},`${L} `,E("a",{href:Fo,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),r=E("div",{class:"tb-dialog-row"}),l=document.querySelector(".tb-header"),c=window.tbAnnotations,i=(l?.dataset.routes??"comment").split(" ").filter(p=>p!=="comment"||c).map(p=>p==="comment"&&c?.groupsOnly?"groupComment":p).filter(p=>p in jt),o=i.includes("edit")||i.includes("note")?"book":"edition",d=xe("How contributing works",t,E("h2",{text:"How contributing works"}),E("p",{text:i.length===1?`There is one way to help with this ${o}: ${jt[i[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${So[i.length]??i.length} ways to help with this ${o}. They differ in who sees what you write, and in which account you need.`}),...i.map(p=>s(jt[p])),E("p",{},E("a",{href:e,text:"More about commenting and contributing"})),...l?.dataset.credits?[E("p",{},E("a",{href:`${l.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],r),u=E("button",{type:"button",class:"tb-btn",text:"Close"});if(u.addEventListener("click",()=>d.d.close()),n){let p=E("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});p.addEventListener("click",()=>d.closeThen(n.run)),r.append(u,p),p.focus()}else r.append(u),u.focus()},we=(t,e,n,s)=>Ao()?s():qn(t,e,{label:n,run:s}),Ho=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},Mo=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(l=>l.id===e):void 0;if(n)return Number(n.dataset.pnum);let s=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,r=t.find(l=>{let c=l.getBoundingClientRect();return c.bottom>s+8&&c.top<window.innerHeight});return Number((r??t[0]).dataset.pnum)||0},Bo=(t,e,n)=>{let s=URL.createObjectURL(new Blob([t],{type:e})),r=E("a",{href:s,download:n});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3)},Io=(t,e,n,s)=>{let r=t.chapter?Mo():0,l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),c=[...r?[["paragraph",`This paragraph (\\xB6${r})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${l}`]],i=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),o=r&&i?"paragraph":t.chapter?"chapter":"book",d="apa";try{let f=localStorage.getItem("tb-cite-style");f&&he.some(([R])=>R===f)&&(d=f)}catch{}let u=E("p",{class:"tb-cite-text","aria-live":"polite"}),p=E("span",{class:"tb-cite-said",role:"status"}),m=()=>$n(t,o,new Date,r),y=()=>{p.textContent="",u.textContent="";for(let f of m().styles[d])u.append(f.italic?E("i",{text:f.text}):f.text)},k=(f,R,T,N,j)=>{let V=E("div",{class:"tb-seg"});for(let[G,Z]of T){let et=E("input",{type:"radio",name:f,value:G});et.checked=N()===G,et.addEventListener("change",()=>{j(G),y()}),V.append(E("label",{},et,Z))}return E("fieldset",{},E("legend",{text:R}),V)},b=E("button",{type:"button",class:"tb-btn",text:"Copy"});b.addEventListener("click",()=>{On(De(m().styles[d]),()=>p.textContent="Copied",()=>p.textContent="Couldn\'t copy: select the text instead"),lt("citation_copied",{style:d,scope:o})});let L=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",M=[["BibTeX","bib","application/x-bibtex",Cn],["RIS","ris","application/x-research-info-systems",Tn],["CSL-JSON","json","application/vnd.citationstyles.csl+json",An]],I=E("div",{class:"tb-dialog-row tb-cite-files"},E("span",{class:"tb-cite-said",text:"Download"}));for(let[f,R,T,N]of M){let j=E("button",{type:"button",class:"tb-btn",text:f});j.addEventListener("click",()=>{let{item:V}=m();Bo(N(V),T,`${o==="book"?"book":L}${o==="paragraph"?`-p${r}`:""}.${R}`),lt("citation_downloaded",{format:R,scope:o})}),I.append(j)}let g=Ne(e.dataset.licence??""),F=E("p",{class:"tb-cite-text"});for(let f of s())F.append(f.italic?E("i",{text:f.text}):f.text);y(),xe("Cite",n,E("h2",{text:"Cite"}),k("tb-cite-scope","What",c,()=>o,f=>o=f),k("tb-cite-style","Style",he,()=>d,f=>{d=f;try{localStorage.setItem("tb-cite-style",d)}catch{}}),u,E("div",{class:"tb-dialog-row"},p,b),I,E("h3",{text:g?`Attribution (${g})`:"Attribution"}),F)},Ro=(t,e)=>{let n={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:Ho(),accessed:new Date},s=i=>{let o=E("p",{class:"tb-cite-text"});for(let d of i)o.append(d.italic?E("i",{text:d.text}):d.text);return o},r=(i,o)=>{let d=E("span",{class:"tb-cite-said",role:"status"}),u=E("button",{type:"button",class:"tb-btn",text:"Copy"});return u.addEventListener("click",()=>On(De(o),()=>d.textContent="Copied",()=>d.textContent="Couldn\'t copy: select the text instead")),E("section",{},E("h3",{text:i}),s(o),E("div",{class:"tb-dialog-row"},d,u))},l=kn(document);if(l)return Io(l,t,e,()=>Re(n));let c=Ne(n.licence);xe("Cite this page",e,E("h2",{text:"Cite this page"}),r("APA 7",En(n)),r(c?`Attribution (${c})`:"Attribution",Re(n)))},Do=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},No=(t,e,n,s)=>{let r=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),c=(o,d,u)=>{let p=r.filter(([m])=>d?.[m]).map(([m,y])=>{let k=E("a",{class:"tb-btn",href:d[m],download:"",text:y});return k.addEventListener("click",()=>lt("download",{format:m,scope:u})),k});return p.length?[E("h3",{text:o}),E("div",{class:"tb-dialog-row tb-cite-files"},...p)]:[]},i=E("button",{type:"button",class:"tb-btn",text:"Markdown"});i.addEventListener("click",s),xe("Download",n,E("h2",{text:"Download"}),...c("This page",t.chapter,"chapter"),...c(`Whole ${l}`,t.book,"book"),E("h3",{text:"Source"}),E("div",{class:"tb-dialog-row tb-cite-files"},i))},Oo=(t,e,n)=>{let s=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&s.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let r=E("p",{class:"tb-panel-note",role:"status"});for(let[l,c,i]of s){let o=E("div",{class:"tb-seg"});for(let[u,p]of i){let m=E("input",{type:"radio",name:`tb-pref-${l}`,value:u});m.checked=e.get(l)===u,m.addEventListener("change",()=>{if(l==="annotations"&&n){if(r.textContent="",u==="on")n.enable();else if(n.disable().reload){let y=E("button",{type:"button",class:"tb-btn",text:"Reload"});y.addEventListener("click",()=>location.reload()),r.append("Highlights hidden. The annotation tab goes away when the page reloads.",y)}return}e.set(l,u),l==="numbers"&&lt("paragraph_numbers_toggled",{to:u})}),o.append(E("label",{},m,p))}let d=E("fieldset",{},E("legend",{text:c}),o);l==="annotations"&&d.append(r),l==="width"&&_o(t,d),t.append(d)}},_o=(t,e)=>{let n=r=>E("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${r}) * var(--tb-size-body) * var(--tb-text-scale))`}),s=()=>{let r=document.querySelector("article");if(!r?.parentElement||t.hidden)return;let l=n("--tb-measure-standard-em"),c=n("--tb-measure-wide-em");r.parentElement.append(l,c);let i=l.getBoundingClientRect().width,o=c.getBoundingClientRect().width;l.remove(),c.remove(),e.hidden=!(o-i>=16)};new MutationObserver(s).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",s)},_e=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Po=t=>{let e=!1,n=()=>{e=!1;let r=t.getBoundingClientRect(),l=document.documentElement.style;l.setProperty("--tb-hdr-h",`${Math.round(r.height)}px`),l.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(r.bottom))}px`)},s=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s),typeof ResizeObserver=="function"&&new ResizeObserver(s).observe(t)},qe=null;window.addEventListener("popstate",()=>qe?.(location.hash,!1));var qo=(t,e,n,s,r)=>{let l={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:r,track:lt};t.addEventListener("click",o=>{if(o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey){lt("edit_on_github_clicked");return}o.preventDefault(),ae({...l,mode:"page",trigger:n})});let c=new Map,i=Array.from(document.querySelectorAll("[data-pnum]")).filter(o=>!o.closest(".popover")&&!o.querySelector(":scope > button.tb-pedit"));i.length&&Hn();for(let o of i){let d=Mn();d.addEventListener("click",u=>{u.stopPropagation(),we(d,s,`Continue: edit \\xB6${o.dataset.pnum}`,()=>ae({...l,mode:"paragraph",para:o,trigger:d}))}),o.append(d),c.set(o.dataset.pnum??"",{p:o,b:d})}qe=(o,d)=>{let u=Pt.exec(o);if(!u)return;let p=u[1]?c.get(u[1]):void 0;ae(p?{...l,mode:"paragraph",para:p.p,trigger:p.b,push:d}:{...l,mode:"page",trigger:n,push:d})}},Uo=(t,e,n)=>{t.addEventListener("click",s=>{s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),hn({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:lt}))})},zo=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),s=()=>t.scrollWidth>t.clientWidth+1,r=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,l=r?.querySelector(".home-link")?r:null,c=t.querySelector(".tb-hdr-label"),i=()=>!!c&&getComputedStyle(c).position!=="absolute",o=t.querySelector(".tb-hdr-where"),d=y=>!!y&&y.scrollWidth>y.clientWidth+1,u=y=>!s()&&i()===y&&!d(o)&&!Array.from(o?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(d),p=y=>{l?.classList.toggle("tb-logo-full",y),l?.classList.toggle("tb-logo-icon",!y)},m=()=>{let y=!!e&&!!n&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),y&&(e.hidden=!1,n.hidden=!0),s()&&t.classList.add("tb-hdr-icons"),s()&&(t.classList.add("tb-hdr-tight"),y&&(e.hidden=!0,n.hidden=!1));let k=i();l&&u(k)&&(p(!0),u(k)||p(!1)),Pe()};if(m(),window.addEventListener("resize",m),document.fonts?.ready.then(m),typeof ResizeObserver=="function"){let y=new ResizeObserver(()=>requestAnimationFrame(m));y.observe(t);let k=t.querySelector(".tb-hdr-actions");k&&y.observe(k)}return m},jo=t=>{let e=o=>t.querySelector(o),n=t.dataset.howTo??"/how-to-comment",s=window,r=e("[data-tb-contribute]"),l=e("[data-tb-more]"),c=o=>{try{o()}catch{}};c(()=>{let o=e("[data-tb-search]"),d=document.querySelector(".search .search-button");!o||!d||(o.addEventListener("click",()=>d.click()),o.hidden=!1)}),c(()=>{let o=e("[data-tb-menu]"),d=document.querySelector(".explorer"),u=d?.querySelector(".mobile-explorer");if(!o||!d||!u)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(o);let m=d.querySelector(".explorer-content");m?.id&&o.setAttribute("aria-controls",m.id),u.tabIndex=-1,u.setAttribute("aria-hidden","true");let y=o.querySelector(".tb-hdr-label"),k=()=>!d.classList.contains("collapsed"),b=()=>{let L=k();o.setAttribute("aria-expanded",String(L)),o.classList.toggle("tb-closes",L),y&&(y.textContent=L?"Close menu":"Menu")};new MutationObserver(b).observe(d,{attributes:!0,attributeFilter:["class"]}),o.addEventListener("click",()=>{k()||s.tbAnnotations?.close?.(),u.click()}),document.addEventListener("keydown",L=>{L.key!=="Escape"||!k()||!_e()||(u.click(),o.focus())}),b(),o.hidden=!1}),c(()=>{let o=e("[data-tb-reader]"),d=e("[data-tb-reader-item]"),u=document.querySelector(".sidebar .readermode");if(!o||!d||!u)return;let p=()=>o.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),o.addEventListener("click",()=>u.click()),d.addEventListener("click",()=>u.click()),p(),t.dataset.tbHasReader="1",o.hidden=!1});let i=()=>{lt("annotation_badge_clicked"),s.tbAnnotations.open().then(o=>{o||Fn("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};c(()=>{if(!s.tbAnnotations){let u=e("[data-tb-comment]");if(u&&window.tbCommentsComing){let p=u.querySelector(".tb-mi-t"),m=u.querySelector(".tb-mi-s");p&&(p.textContent=jt.groupComment.title),m&&(m.textContent="Coming soon for classes"),u.setAttribute("aria-disabled","true"),u.hidden=!1}return}let o=e("[data-tb-annotate]");if(o){let u=o.querySelector(".tb-hdr-label"),p=()=>_e()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),m=()=>{let k=p();o.classList.toggle("tb-closes",k),u&&(u.textContent=k?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",m),window.addEventListener("resize",m);let y=null;o.addEventListener("pointerdown",()=>y=p(),!0),o.addEventListener("click",()=>{let k=y??p();if(y=null,k)return s.tbAnnotations.close?.();let b=document.querySelector(".explorer");b&&!b.classList.contains("collapsed")&&_e()&&b.querySelector(".mobile-explorer")?.click(),we(o,n,"Continue: open annotations",i)}),o.querySelector(".tb-anno-count")||o.append(E("span",{class:"tb-anno-count"})),o.hidden=!1}let d=e("[data-tb-comment]");if(d){if(d.addEventListener("click",i),s.tbAnnotations.groupsOnly){let u=d.querySelector(".tb-mi-t"),p=d.querySelector(".tb-mi-s");u&&(u.textContent=jt.groupComment.title),p&&(p.textContent="Hypothes.is account \\xB7 only your group sees it")}d.hidden=!1}}),c(()=>{let o=e("#tb-contribute-menu");if(!r||!o)return;Oe(r,o,!0,k=>we(r,n,"Continue to Contribute",k)),e("[data-tb-explain]")?.addEventListener("click",()=>qn(r,n));let d=e("button.tb-suggest-btn"),u=d?.dataset.endpoint,p=d&&u&&ge?()=>ge(u,d.dataset.path??"",r,Lo()):void 0,m=e("a.edit-on-github"),y=m?.dataset.editEndpoint;if(m&&y){if(qo(m,y,r,n,p),Pt.test(location.hash)){let k=location.hash,b=window.history.state?.tbEditor===!0;b||window.history.replaceState(window.history.state,"",location.pathname+location.search),qe?.(k,!b)}}else m?.addEventListener("click",()=>lt("edit_on_github_clicked"));d&&p&&(d.addEventListener("click",p),d.hidden=!1,Co((k,b)=>ge(u,d.dataset.path??"",b,k),n)),r.hidden=!1}),c(()=>{let o=e("[data-tb-appearance]"),d=e("#tb-appearance");!o||!d||!s.tbPrefs||(Oo(d,s.tbPrefs,s.tbAnnotations),Oe(o,d,!1),o.hidden=!1)}),c(()=>{let o=e("#tb-more-menu");if(!l||!o)return;Oe(l,o,!0),e("[data-tb-cite]")?.addEventListener("click",()=>Ro(t,l)),e("[data-tb-print]")?.addEventListener("click",()=>window.print());let d=e("a.tb-history-link");d?.dataset.revisionEndpoint&&Uo(d,d.dataset.revisionEndpoint,l);let u=e("[data-tb-backlinks]"),p=document.querySelector(".backlinks");u&&(!p||!p.querySelector("a.internal")?(u.setAttribute("aria-disabled","true"),u.append(E("span",{class:"tb-mi-s",text:"No other page links here"}))):u.addEventListener("click",()=>{let b=p.querySelector("h3")??p;b.tabIndex=-1,p.scrollIntoView({block:"start"}),b.focus({preventScroll:!0})}));let m=e("[data-tb-download]"),y=Do();if(m&&y){let b=m.querySelector(".tb-mi-t");b&&(b.textContent="Download\\u2026")}let k=()=>fetch(m.dataset.tbDownload).then(b=>b.ok?b.blob():Promise.reject(new Error(String(b.status)))).then(b=>{let L=URL.createObjectURL(b),M=E("a",{href:L,download:m.dataset.file??"page.md"});document.body.append(M),M.click(),M.remove(),setTimeout(()=>URL.revokeObjectURL(L),1e3)}).catch(()=>Fn("That didn\'t download just now. View source has the same file."));m?.addEventListener("click",()=>y?No(y,t,l,k):k()),l.hidden=!1}),c(()=>{zo(t)}),c(()=>{let o=t.parentElement;Po(o?.classList.contains("tb-header-slot")?o:t)})},Go=()=>{try{ge?.closeIfOpen(),ln(),mn();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",jo(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&yn(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",Go);\n';

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
  privacyUrl: "",
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
        ...opts.privacyUrl ? { "data-privacy": `${opts.privacyUrl}#contributions` } : {},
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
.tb-bh-item { scroll-margin-top: 5rem; }
.tb-bh-item:target, .tb-bh-item:focus { outline: 2px solid var(--tb-accent, var(--secondary)); outline-offset: 4px; border-radius: 2px; }
.tb-bh-note { font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; }
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