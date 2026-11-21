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
var controls_inline_default = 'var Je=/^\\s{0,3}(```|~~~)/,Jn=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,Qn=t=>{let e=t.split(`\n`),n=[],o=0;if(e[0]?.trim()==="---"){let l=e.findIndex((u,a)=>a>0&&(u.trim()==="---"||u.trim()==="..."));l>0&&(o=l+1)}let r=0;for(;o<e.length;){let l=e[o];if(!l.trim()){o++;continue}let u=Je.exec(l);if(u||l.trim()==="$$"){let c=u?u[1]:"$$",p=o+1;for(;p<e.length&&!e[p].trim().startsWith(c);)p++;o=p+1;continue}let a=o;for(;a<e.length&&e[a].trim()&&!Je.test(e[a]);)a++;let s=e.slice(o,a).join(`\n`),d=!Jn.test(l);n.push({start:o,text:s,ordinal:d?++r:0}),o=a}return n},to=t=>Qe(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),Qe=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],eo=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let r of t)n.set(r,(n.get(r)??0)+1);let o=0;for(let r of e){let l=n.get(r)??0;l>0&&(o++,n.set(r,l-1))}return o/Math.max(t.length,e.length)};var tn=(t,e,n)=>{let o=Qe(e);if(!o.length)return null;let r=null,l=0,u=1/0;for(let a of Qn(t)){let s=eo(to(a.text),o);if(s<.75)continue;let d=a.ordinal?Math.abs(a.ordinal-n):1e6;(s>l+.02||Math.abs(s-l)<=.02&&d<u)&&(r=a,l=Math.max(s,l),u=d)}return r};var ee=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let o=t.length,r=e.length;for(;o>n&&r>n&&t[o-1]===e[r-1];)o--,r--;let l=t.slice(0,n).map(c=>({t:"=",v:c})),u=t.slice(o).map(c=>({t:"=",v:c})),a=t.slice(n,o),s=e.slice(n,r),d;if((a.length+1)*(s.length+1)>4e5)d=[...a.map(c=>({t:"-",v:c})),...s.map(c=>({t:"+",v:c}))];else{let c=s.length+1,p=new Uint32Array((a.length+1)*c);for(let k=a.length-1;k>=0;k--)for(let m=s.length-1;m>=0;m--)p[k*c+m]=a[k]===s[m]?p[(k+1)*c+m+1]+1:Math.max(p[(k+1)*c+m],p[k*c+m+1]);d=[];let b=0,f=0;for(;b<a.length&&f<s.length;)a[b]===s[f]?(d.push({t:"=",v:a[b]}),b++,f++):p[(b+1)*c+f]>=p[b*c+f+1]?d.push({t:"-",v:a[b++]}):d.push({t:"+",v:s[f++]});for(;b<a.length;)d.push({t:"-",v:a[b++]});for(;f<s.length;)d.push({t:"+",v:s[f++]})}return[...l,...d,...u]},te=t=>t.split(/(\\s+)/).filter(e=>e!==""),ne=(t,e)=>{let n=[];for(let o of ee(t.split(`\n`),e.split(`\n`))){let r=n[n.length-1];o.v.trim()&&(o.t==="="?r&&"same"in r?r.same.push(o.v):n.push({same:[o.v]}):r&&"ops"in r?r.ops.push(o):n.push({ops:[o]}))}return n.some(o=>"ops"in o)?n:[]},oe=t=>`${t} unchanged paragraph${t===1?"":"s"}`,en=t=>{let e=[];for(let n=0;n<t.length;){let o=[],r=[];for(;t[n]?.t==="=";)n++;for(;t[n]?.t==="-";)o.push(t[n++].v);for(;t[n]?.t==="+";)r.push(t[n++].v);let l=o.map(a=>({t:"-",words:[{v:a,changed:!0}]})),u=r.map(a=>({t:"+",words:[{v:a,changed:!0}]}));for(let a=0;a<Math.min(o.length,r.length);a++){let s=ee(te(o[a]),te(r[a]));l[a].words=s.filter(d=>d.t!=="+").map(d=>({v:d.v,changed:d.t==="-"})),u[a].words=s.filter(d=>d.t!=="-").map(d=>({v:d.v,changed:d.t==="+"}))}for(let a of[...l,...u])a.words=a.words.reduce((s,d)=>{let c=s[s.length-1];return c&&c.changed===d.changed?c.v+=d.v:s.push({...d}),s},[]);e.push(...l,...u)}return e};var re="Saving\\u2026 this can take up to a minute.",Le={pollMs:3e3,waitMs:18e4,runningMs:35e3},no=Math.random().toString(36).slice(2)+Date.now().toString(36);async function oo(t,e){let n=new TextEncoder().encode(`${no}\n${t}\n${e}`),o=new Uint8Array(await crypto.subtle.digest("SHA-256",n));return Array.from(o.slice(0,16),r=>r.toString(16).padStart(2,"0")).join("")}var ro=t=>new Promise(e=>setTimeout(e,t));async function se(t,e,{signal:n,onWait:o}={}){let r=await oo(t,e),l=new URL(t);l.searchParams.set("write_key",r);let u=(b={},f)=>{let k=new URL(l);for(let[m,x]of Object.entries(b))k.searchParams.set(m,x);return fetch(k,{method:"POST",headers:{"Content-Type":"application/json"},body:e,signal:f})},a=null,s="network";try{a=await u({},n)}catch{n?.aborted&&(s="timeout")}if(a&&a.status<500&&a.status!==202)return a;if(o?.(),a&&a.status>=500&&(s=String(a.status)),!a||a.status>=500){let b=await u({fallback:s}).catch(()=>null);if(!b)throw new Error("network");if(b.status!==202)return b}let d=new URL("write-status",l);d.searchParams.set("write_key",r);let c=Date.now(),p=!1;for(;Date.now()-c<Le.waitMs;){await ro(Le.pollMs);let b=await fetch(d).catch(()=>null);if(!b)continue;if(b.status!==202)return b;(await b.json().catch(()=>null))?.state==="running"&&!p&&Date.now()-c>Le.runningMs&&(p=!0,await u({fallback:"timeout"}).catch(()=>null))}return new Response(JSON.stringify({error:"timeout",userMessage:"This is taking longer than it should. Nothing you wrote is lost: try again in a few minutes."}),{status:504,headers:{"Content-Type":"application/json"}})}var It=t=>(Array.isArray(t)?t:[]).filter(e=>!!e&&Number.isInteger(e.number)&&typeof e.date=="string"&&typeof e.url=="string"&&/^https:\\/\\/github\\.com\\//.test(e.url)&&["edit","note","suggestion"].includes(e.kind)&&Array.isArray(e.comments)),ae=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},Te=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},At=(t,e="",n={})=>{try{let o=new URL(t,"https://x.invalid"),r=new URL("history",o);r.searchParams.set("book",o.searchParams.get("book")??""),e&&r.searchParams.set("path",e);for(let[l,u]of Object.entries(n))r.searchParams.set(l,u);return t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},nn=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(r=>r.toLowerCase());return e.find(r=>r.role&&r.role!=="contributor"&&n.includes(r.who.toLowerCase()))?.role??"contributor"},St=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",on=(t,e)=>{let n=[],o=[...e].sort((r,l)=>l.date.localeCompare(r.date));for(let r of t){for(;o.length&&o[0].date>=r.date;)n.push({release:o.shift()});n.push({entry:r})}for(let r of o)n.push({release:r});return n},rn=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),sn=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state),Ft=(t,e)=>`${t==="edit"||t==="pr"?"pr":"issue"}-${e}`,ie=(t,e)=>{let n=typeof t=="string"?/^https:\\/\\/github\\.com\\/[^/]+\\/[^/]+\\/(issues|pull)\\/(\\d+)$/.exec(t):null;return n?`${e}/history#${Ft(n[1]==="pull"?"pr":"issue",Number(n[2]))}`:null},an=t=>t.state==="open"?t.accepted?"drafts":"proposed":t.merged||t.reason==="completed"?"drafts":"declined";var Nt="tb-editor",ln="tb-editor-style",Me="tb-gh-identity",Ae=10,Se=500,so=7.5*60*60*1e3,dn=2e4,ao=200,jt=/^#edit(?:-(\\d+))?$/,io=t=>t?`#edit-${t}`:"#edit",cn={tbEditor:!0},lo="This page has changes waiting for review; you\\u2019re editing the latest draft.",i=(t,e={},...n)=>{let o=document.createElement(t);for(let[r,l]of Object.entries(e))l!==!1&&(r==="text"?o.textContent=String(l):r==="class"?o.className=String(l):o.setAttribute(r,l===!0?"":String(l)));for(let r of n)r&&o.append(r);return o},un="http://www.w3.org/2000/svg",le=t=>{let e=document.createElementNS(un,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(un,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},bn="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",pn="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",co="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",uo="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",ce=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,ao):null},po=()=>{try{let t=sessionStorage.getItem(Me);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>so?null:e}catch{return null}},Fe=t=>{try{t?sessionStorage.setItem(Me,JSON.stringify(t)):sessionStorage.removeItem(Me)}catch{}},He=()=>{if(document.getElementById(ln))return;let t=`#${Nt}`,e=i("style",{id:ln});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-same + .tb-ed-hunk, ${t} .tb-ed-hunk + .tb-ed-same { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-ed-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline;\n  min-height: 24px; min-width: 24px; } /* a 24px target at least (batch 2b) */\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},bo=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),mo="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",Be=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(mo).forEach(o=>o.remove()),e.querySelectorAll("*").forEach(o=>{for(let r of Array.from(o.attributes)){let l=r.value.trim().toLowerCase();(r.name.startsWith("on")||(r.name==="href"||r.name==="src")&&/^(javascript|data|vbscript):/.test(l))&&o.removeAttribute(r.name)}o.tagName==="A"&&(o.setAttribute("target","_blank"),o.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},ho=(t,e)=>{let n=i("div",{class:"tb-ed-diff"}),o=ne(t,e);if(!o.length)return n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let r=(l,u)=>{let a=i("div",{class:`tb-ed-line${l==="-"?" tb-ed-del":l==="+"?" tb-ed-add":""}`}),s=i("span");return typeof u=="string"?s.textContent=u||" ":s.append(...u),a.append(i("span",{"aria-hidden":"true",text:l==="="?" ":l==="-"?"\\u2212":"+"}),s),a};for(let l of o){if("same"in l){let a=i("details",{class:"tb-ed-same"},i("summary",{text:oe(l.same.length)}));a.append(...l.same.map(s=>r("=",s))),n.append(a);continue}let u=i("div",{class:"tb-ed-hunk"});for(let a of en(l.ops))u.append(r(a.t,a.words.map(s=>s.changed?i(a.t==="-"?"del":"ins",{text:s.v}):document.createTextNode(s.v))));n.append(u)}return n},de=null,mn=()=>de?.(),ue=t=>{if(de)return;He();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,o=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),r=t.path.split("/"),l=r.pop(),u=t.para&&Number(t.para.getAttribute("data-pnum"))||0,a=t.mode,s="",d="",c="drafts",p=null,b="",f=po(),k=!1,m=!1,x=null,R=null,H=!1,g=window.scrollY,L=io(a==="paragraph"?u:0),$=i("div",{id:Nt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),M=i("span",{class:"tb-ed-pill"},le(pn),i("span",{text:c})),S=i("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},le(co));S.append(i("span",{text:t.repo.split("/").pop()||t.repo}));for(let w of r)S.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{text:w}));S.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{class:"tb-ed-file",text:l}));let P=i("span",{class:"tb-ed-muted",text:u?` \\xB7 \\xB6${u}`:""});S.append(P,M);let q=i("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),j=i("div",{class:"tb-ed-head"},S,q),Z=i("div",{class:"tb-ed-discard",role:"alert",hidden:!0},i("span",{text:"Discard your changes?"})),X=i("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),J=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});Z.append(X,J);let V=i("div",{class:"tb-ed-main"}),Q=i("div",{class:"tb-ed-inner"}),ct=i("p",{class:"tb-ed-note",hidden:!0}),st=i("p",{class:"tb-ed-note",hidden:!0,text:lo}),at=i("p",{class:"tb-ed-note tb-ed-pending",hidden:!0}),h=i("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),y=i("div",{class:"tb-ed-gate",hidden:!0});Q.append(st,at,ct,h,y),V.append(Q),$.append(j,Z,V);let v=["Edit","Preview","Changes"],A=i("div",{role:"tablist","aria-label":"Editor view"}),D=v.map((w,C)=>i("button",{type:"button",role:"tab",id:`tb-ed-tab-${C}`,"aria-controls":`tb-ed-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:w==="Edit"?"Edit":w==="Preview"?"Preview":"Changes"}));A.append(...D);let N=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),B=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),O=i("div",{class:"tb-ed-bar"},A,i("div",{class:"tb-ed-actions"},N,B)),U=i("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),_=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),$t=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),ht=[i("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},_,U,$t),i("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),i("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],Ht=i("div",{class:"tb-ed-box"},O,...ht),it=i("p",{class:"tb-ed-foot"}),yt=()=>U.value,lt=()=>b,_t=w=>{D.forEach((C,F)=>{C.setAttribute("aria-selected",F===w?"true":"false"),C.tabIndex=F===w?0:-1,ht[F].hidden=F!==w}),w===1&&Pt(),w===2&&(ht[2].textContent="",ht[2].append(ho(lt(),yt())))};D.forEach((w,C)=>{w.addEventListener("click",()=>_t(C)),w.addEventListener("keydown",F=>{let I=F.key==="ArrowRight"?1:F.key==="ArrowLeft"?-1:0;if(!I)return;F.preventDefault();let G=(C+I+D.length)%D.length;_t(G),D[G].focus()})});let wt=0,Pt=()=>{let w=ht[1];w.textContent="",w.className="tb-ed-panel tb-ed-preview";let C=i("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});w.append(C);let F=++wt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:bo(yt()),mode:"markdown"})}).then(I=>I.ok?I.text():Promise.reject(new Error(String(I.status)))).then(I=>{F===wt&&(w.textContent="",w.append(Be(I)))}).catch(()=>{F===wt&&(C.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};U.addEventListener("input",()=>{m=yt()!==b,B.disabled=!m});let nt=i("div",{class:"tb-ed-scrim",hidden:!0}),gt=i("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});nt.append(gt),$.append(nt);let Bt=(w,C,F,I=!1)=>{F.id=w;let G=i("p",{class:"tb-ed-err",id:`${w}-err`}),K=i("label",{for:w,text:C},I?i("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:i("div",{class:"tb-ed-field"},K,F,G),control:F,err:G}},tt=Bt("tb-ed-msg","What did you change, and why?",i("textarea",{rows:2,maxlength:Se,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));tt.wrap.append(i("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let Lt=document.querySelector(".tb-page-controls")?.dataset.privacy,et=Bt("tb-ed-desc","Extended description",i("textarea",{rows:3,maxlength:5e3}),!0),Tt=i("div",{class:"tb-ed-who"}),Rt=i("div",{class:"tb-ed-what"},le(pn)),qt=i("span");Rt.append(qt);let Ut=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),xt=i("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),vt=i("form",{novalidate:!0},i("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),tt.wrap,et.wrap,Tt,Rt,Lt?i("p",{class:"tb-ed-muted tb-ed-hint tb-ed-published"},"Your proposal is published openly on GitHub, under the book\'s licence. ",i("a",{href:Lt,text:"How contributions are handled"})):null,i("div",{class:"tb-ed-row"},Ut,xt)),T=i("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});gt.append(vt,T);let z=()=>{if(Tt.textContent="",f){let w=i("img",{src:`https://avatars.githubusercontent.com/u/${f.id}?s=56`,alt:""}),C=i("button",{type:"button",class:"tb-ed-link",text:"Sign out"});C.addEventListener("click",()=>{f=null,Fe(null),z()}),Tt.append(w,i("span",{},"Signed in as ",i("strong",{text:`@${f.login}`})," \\u2014 this edit will be credited to your GitHub account."),C)}else Tt.append(Y(),i("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Y=()=>{let w=i("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},le(uo),"Sign in with GitHub");return w.addEventListener("click",()=>rt(w)),w},ut=()=>{y.textContent="";let w=Y(),C=i("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let F=i("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});F.addEventListener("click",()=>{Jt(),t.suggest()}),C.append(F," instead: it needs no account.")}else C.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");y.append(i("h2",{text:"Sign in to edit"}),i("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),i("p",{},w),C),h.hidden=!0,y.hidden=!1,w.focus()},Et=w=>{if(w.origin!==n)return;let C=w.data;if(!(!C||C.type!=="tb-github-identity")){if(x=null,C.error||typeof C.token!="string"||typeof C.login!="string"){t.track("github_signin",{outcome:C.error==="denied"?"cancelled":"error"});return}if(f={token:C.token,login:C.login,id:Number(C.id)||0,name:C.name??"",at:Date.now()},Fe(f),t.track("github_signin",{outcome:"success"}),!H)return Xe();z(),nt.hidden||tt.control.focus()}},rt=w=>{let C=`${o}?origin=${encodeURIComponent(location.origin)}`;x=window.open(C,"tb-github-signin","popup,width=560,height=720"),!x&&!w.parentElement?.querySelector(".tb-ed-err")&&w.after(i("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Et);let ot=(w,C)=>{w.control.setAttribute("aria-invalid","true"),w.control.setAttribute("aria-describedby",w.err.id),w.err.textContent=C},pt=w=>{w.control.removeAttribute("aria-invalid"),w.control.removeAttribute("aria-describedby"),w.err.textContent=""};tt.control.addEventListener("input",()=>pt(tt));let bt=()=>{qt.textContent="",qt.append("This creates a new branch and opens a proposal to merge it into ",i("code",{text:c}),". Nothing changes in the book until an editor accepts it."),z(),vt.hidden=!1,T.hidden=!0,nt.hidden=!1,tt.control.focus()},ft=()=>{nt.hidden=!0,B.focus()};B.addEventListener("click",bt),Ut.addEventListener("click",ft),nt.addEventListener("mousedown",w=>{w.target===nt&&!k&&ft()});let Ce=(w,C,F,I)=>{if(!$.isConnected)return;T.textContent="",T.append(i("h2",{text:w}),i("p",{text:C}));let G=ie(F?.href,location.origin);G&&T.append(i("p",{class:"tb-ed-follow"},"Follow your suggestion: ",i("a",{href:G,text:G}))),F&&T.append(i("p",{},i("a",{href:F.href,target:"_blank",rel:"noopener",text:F.text})));let K=i("button",{type:"button",class:`tb-ed-btn${I?" tb-ed-primary":""}`,text:I?"Back to my edit":"Close"});K.addEventListener("click",I?()=>{T.hidden=!0,vt.hidden=!1,xt.focus()}:()=>Xt(!0)),T.append(i("div",{class:"tb-ed-row"},K)),vt.hidden=!0,T.hidden=!1,T.focus()};vt.addEventListener("submit",w=>{if(w.preventDefault(),k)return;let C=null;pt(tt);let F=tt.control.value.trim().length;if(F<Ae||F>Se?(ot(tt,F<Ae?`Please say what you changed and why, in at least ${Ae} characters.`:`Please keep it under ${Se} characters.`),C=tt.control):f||(C=Tt.querySelector("button")),C){C.focus();return}let I={mode:a,path:t.path,baseSha:d,title:a==="paragraph"&&u?`Edit \\xB6${u} of ${l}`:`Update ${l}`,summary:tt.control.value.trim().replace(/\\s+/g," "),description:et.control.value.trim()};a==="page"?I.content=yt():(I.startLine=p.start,I.original=p.text,I.replacement=yt(),u&&(I.paragraph=u)),I.identity=f.token,k=!0,xt.disabled=!0,xt.textContent="Proposing\\u2026";let G=R=new AbortController,K=setTimeout(()=>G.abort(),dn);se(t.endpoint,JSON.stringify(I),{signal:G.signal,onWait:()=>{clearTimeout(K),xt.textContent=re}}).then(async W=>{let Qt=null;try{Qt=await W.json()}catch{Qt=null}if(W.status===401&&f&&(f=null,Fe(null),z()),!W.ok)throw Object.assign(new Error(String(W.status)),{userMessage:ce(Qt)});return Qt}).then(W=>{m=!1,W.fallback&&typeof W.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:a}),Ce("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:W.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:a}),Ce("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof W.prUrl=="string"?{href:W.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(W=>{t.track("page_edit_submitted",{outcome:"error",mode:a}),Ce("That did not go through",W&&W.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(K),R===G&&(R=null),k=!1,xt.disabled=!1,xt.textContent="Propose changes"})});let Vn=w=>Array.from(w.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]")),Ye=w=>{if(w.key==="Escape"){w.preventDefault(),nt.hidden?zt():k||(!T.hidden&&vt.hidden&&!m?Xt(!0):ft());return}if(w.key!=="Tab")return;let C=nt.hidden?$:gt,F=Vn(C);if(!F.length){w.preventDefault(),C.focus();return}let I=F.indexOf(document.activeElement);(w.shiftKey?I<=0:I===-1||I===F.length-1)&&(w.preventDefault(),F[w.shiftKey?F.length-1:0].focus())},Ve=w=>{m&&(w.preventDefault(),w.returnValue="")},Xt=(w=!1)=>{if(!w&&m)return zt();m=!1,jt.test(location.hash)?history.back():Jt()},Ze=()=>{if(!jt.test(location.hash)){if(m)return history.pushState(cn,"",L),zt();Jt()}},Jt=()=>{de=null,R?.abort(),x?.close(),document.removeEventListener("keydown",Ye,!0),window.removeEventListener("message",Et),window.removeEventListener("beforeunload",Ve),window.removeEventListener("popstate",Ze),$.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,g)},zt=()=>{if(!m)return Xt(!0);Z.hidden=!1,J.focus()};X.addEventListener("click",()=>Xt(!0)),J.addEventListener("click",()=>{Z.hidden=!0,U.focus()}),q.addEventListener("click",zt),N.addEventListener("click",zt),document.addEventListener("keydown",Ye,!0),window.addEventListener("beforeunload",Ve),window.addEventListener("popstate",Ze),de=Jt,t.push!==!1&&history.pushState(cn,"",L),document.body.style.overflow="hidden",document.body.append($),q.focus(),t.track("page_editor_opened",{mode:a});let Zn=w=>{h.textContent="",h.removeAttribute("class"),h.append(w+" ",i("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},Xe=()=>{if(!f)return ut();H=!0,y.hidden=!0,h.hidden=!1;let w=new AbortController,C=setTimeout(()=>w.abort(),dn);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:w.signal}).then(async F=>{let I=null;try{I=await F.json()}catch{I=null}if(!F.ok)throw Object.assign(new Error(String(F.status)),{userMessage:ce(I)});return I}).then(F=>{if($.isConnected){if(typeof F?.content!="string"||typeof F.sha!="string")throw new Error("bad source");if(s=F.content,d=F.sha,c=typeof F.branch=="string"?F.branch:c,M.lastChild.textContent=c,st.hidden=!t.builtBlob||t.builtBlob===d,a==="paragraph"&&(p=t.para?tn(s,t.para.textContent??"",u):null,p||(a="page",P.textContent="",ct.textContent=`We couldn\\u2019t find \\xB6${u} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,ct.hidden=!1)),a==="paragraph"&&p){Ht.classList.add("tb-ed-para");let I=s.split(`\n`),G=p.text.split(`\n`).length,K=I.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),W=I.slice(p.start+G,p.start+G+3).join(`\n`).trim();_.textContent=K.length>220?`\\u2026${K.slice(-220)}`:K,$t.textContent=W.length>220?`${W.slice(0,220)}\\u2026`:W,_.hidden=!K,$t.hidden=!W,b=p.text,it.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in.",Xn(p.text)}else b=s,it.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";U.value=b,h.remove(),Q.append(Ht,it),U.setSelectionRange(0,0),U.focus()}}).catch(F=>{$.isConnected&&Zn(F&&F.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(C))},Xn=async w=>{try{let F=await(await fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}&pending=1`)).json(),I=await go(w),G=(F.pending??[]).filter(K=>typeof K.url=="string"&&/^https:\\/\\/github\\.com\\//.test(K.url)&&(K.original?K.original===I:K.paragraph===u));if(!G.length||!$.isConnected)return;at.replaceChildren(`${G.length} pending change${G.length===1?"":"s"} on this paragraph \\xB7 `,...G.flatMap((K,W)=>[...W?[", "]:[],i("a",{href:K.url,target:"_blank",rel:"noopener",text:G.length===1?"view it":`view ${W+1}`})])),at.hidden=!1}catch{}};Xe()};async function go(t){let e=new TextEncoder().encode(t.replace(/\\r\\n/g,`\n`).trim()),n=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("").slice(0,16)}var Mt=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},pe=(t,e)=>te(t).map(n=>({v:n,s:{...e}})),Dt=(t,e={})=>{let n=[],o={...e},r="",l=()=>{r&&n.push(...pe(r,o)),r=""},u=a=>!!a&&/[\\p{L}\\p{N}]/u.test(a);for(let a=0;a<t.length;){let s=t.slice(a),d;if(s[0]==="\\\\"&&s.length>1)r+=s[1],a+=2;else if(d=/^`([^`]+)`/.exec(s))l(),n.push(...pe(d[1],{...o,code:!0})),a+=d[0].length;else if(d=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(s)){l();let c=d[2]??d[1].split("/").pop()??d[1];n.push(...pe(c,{...o,link:!0})),a+=d[0].length}else if(d=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(s))l(),n.push(...pe(`(image${d[1]?`: ${d[1]}`:""})`,{...o,i:!0})),a+=d[0].length;else if(d=/^\\[\\^([^\\]]+)\\]/.exec(s))l(),n.push({v:d[1],s:{...o,sup:!0}}),a+=d[0].length;else if(d=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(s))l(),n.push(...Dt(d[1],{...o,link:!0})),a+=d[0].length;else if(d=/^<\\/?[a-zA-Z][^>]*>/.exec(s))l(),a+=d[0].length;else if(s.startsWith("**")||s.startsWith("__")){let c=s.slice(0,2);o.b||t.indexOf(c,a+2)>a+2?(l(),o.b=!o.b):r+=c,a+=2}else(s[0]==="*"||s[0]==="_")&&!(s[0]==="_"&&u(t[a-1])&&u(t[a+1]))?(o.i||t.indexOf(s[0],a+1)>a+1?(l(),o.i=!o.i):r+=s[0],a+=1):(r+=s[0],a+=1)}return l(),n},be=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:Dt(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:Dt(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:Dt(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:Dt(e[2])}:{kind:"p",runs:Dt(t)}:{kind:"blank",runs:[]}},hn=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=i("code",{},e)),t.s.i&&(e=i("em",{},e)),t.s.b&&(e=i("strong",{},e)),t.s.link&&(e=i("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=i("sup",{},e)),e},me=(t,e,n)=>{let o=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,r=i("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),l=i("div",{class:"tb-rd-text"});e.marker&&l.append(i("span",{class:"tb-rd-marker",text:e.marker}));let u=null;for(let{run:a,changed:s}of n)s&&t!=="="?(u||(u=i(t==="-"?"del":"ins"),l.append(u)),u.append(hn(a))):(u=null,l.append(hn(a)));return i("div",{class:o},r,l)},he=(t,e)=>t.map(n=>({run:n,changed:e})),Gt=(t,e)=>{let n=i("div",{class:"tb-ed-diff tb-rd"}),o=Mt(t),r=Mt(e),l=ne(o,r);if(!l.length)return n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:o!==r||t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n;for(let u of l){if("same"in u){let s=i("details",{class:"tb-rd-same"},i("summary",{text:oe(u.same.length)}));for(let d of u.same){let c=be(d);s.append(me("=",c,he(c.runs,!1)))}n.append(s);continue}let a=u.ops;for(let s=0;s<a.length;){let d=a[s];if(d.t==="="){let m=be(d.v);n.append(me("=",m,he(m.runs,!1))),s++;continue}let c=[],p=[];for(;a[s]?.t==="-";)c.push(be(a[s++].v));for(;a[s]?.t==="+";)p.push(be(a[s++].v));let b=Math.min(c.length,p.length),f=c.map(m=>he(m.runs,!0)),k=p.map(m=>he(m.runs,!0));for(let m=0;m<b;m++){let x=c[m].runs,R=p[m].runs,H=ee(x.map(S=>S.v),R.map(S=>S.v)),g=0,L=0,$=[],M=[];for(let S of H)S.t!=="+"&&$.push({run:x[g++],changed:S.t==="-"}),S.t!=="-"&&M.push({run:R[L++],changed:S.t==="+"});f[m]=$,k[m]=M}c.forEach((m,x)=>n.append(me("-",m,f[x]))),p.forEach((m,x)=>n.append(me("+",m,k[x])))}}return n};var fo="No reason was recorded.",Wt=t=>t.kind==="edit"?"Declined proposed edit":t.kind==="note"?t.paragraph?`Declined note on \\xB6${t.paragraph}`:"Declined note":"Declined suggestion",Re=t=>{let e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"}):t},yo=async(t,e)=>{let n=await fetch(t,{signal:e,credentials:"omit"}),o=await n.json().catch(()=>null);if(!n.ok)throw Object.assign(new Error(`HTTP ${n.status}`),{userMessage:o?.userMessage});return o},ge=(t,e)=>{let n=i("div",{class:"tb-dc"});n.append(i("div",{class:"tb-dc-who",text:`Proposed by ${t.who?.name??"a reader"} on ${Re(t.proposed)}. Declined${t.decliner?` by ${t.decliner}`:""} on ${Re(t.date)}.`}),i("blockquote",{class:`tb-dc-reason${t.reason?"":" tb-dc-none"}`},i("span",{class:"tb-dc-label",text:"Why it was declined: "}),t.reason??fo));let o=i("div",{class:"tb-hi-actions tb-dc-actions"}),r=i("div",{class:"tb-hi-diff tb-dc-diff",hidden:!0});if(t.kind==="edit"&&e){let l=i("button",{type:"button","aria-pressed":"false",text:"Show changes"});l.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0,l.setAttribute("aria-pressed","false");return}l.setAttribute("aria-pressed","true"),r.hidden=!1,r.textContent="",r.append(i("p",{class:"tb-ed-muted",role:"status",text:"Loading what was proposed\\u2026"}));let u=new AbortController,a=setTimeout(()=>u.abort(),2e4);yo(At(e,"",{change:String(t.number)}),u.signal).then(s=>{let d=s?.files??[];r.textContent="",d.length||r.append(i("p",{class:"tb-ed-muted",text:"The proposal changed no page."}));for(let c of d)r.append(Gt(typeof c.before=="string"?c.before:"",typeof c.after=="string"?c.after:""))}).catch(s=>{r.textContent="",r.append(i("p",{class:"tb-ed-note",role:"alert",text:s?.userMessage||"What was proposed couldn\\u2019t be loaded just now."}))}).finally(()=>clearTimeout(a))}),o.append(l)}if(o.append(i("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",text:`See #${t.number} on GitHub \\u2197`})),n.append(o,r),t.comments.length){let l=i("ol",{class:"tb-dc-comments","aria-label":"Comments from the book\'s people"});for(let u of t.comments)l.append(i("li",{class:"tb-dc-comment"},i("div",{class:"tb-dc-cmeta",text:`${u.name} \\xB7 ${Re(u.date)}`}),i("p",{class:"tb-dc-ctext",text:u.text})));n.append(i("div",{class:"tb-dc-chead",text:"Comments from the book\\u2019s people"}),l)}return n},fe=t=>`\n${t} .tb-dc { margin-top: 0.4rem; }\n${t} .tb-dc p, ${t} .tb-dc-who, ${t} .tb-dc-cmeta { margin: 0.15rem 0; overflow-wrap: anywhere; }\n${t} .tb-dc-who, ${t} .tb-dc-cmeta, ${t} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }\n${t} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }\n${t} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }\n${t} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }\n${t} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-dc-ctext { white-space: pre-line; }\n${t} .tb-hi-state.tb-hi-declined, ${t} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }\n`;var gn={author:"Author",editor:"Editor",contributor:"Contributor"},ye=t=>{if(!t||!(t in gn))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=gn[t],e};var fn="tb-history-style",wo=30,yn=2e4,wn="a reader",Ie=t=>`\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-rd-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n`,xo=()=>{if(document.getElementById(fn))return;let t=`#${Nt}.tb-hi`,e=i("style",{id:fn});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n${Ie(t)}\n${fe(t)}\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},vo=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),o=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return o?`Paragraph ${o[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},kt=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},mt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),o=null;try{o=await n.json()}catch{}if(!n.ok){let r=new Error(`HTTP ${n.status}`);throw r.userMessage=ce(o),r}return o},we=null,xn=()=>we?.(),vn=t=>{if(we||document.getElementById(Nt))return;He(),xo();let e=document.body.style.overflow,n=null,o=0,r=i("div",{id:Nt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),l=i("div",{class:"tb-hi-where",id:"tb-hi-title"},i("span",{class:"tb-hi-name",text:"Page history"}),t.title?i("span",{class:"tb-hi-page",text:t.title}):null),u=i("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},i("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),i("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),a=i("div",{class:"tb-ed-main"}),s=i("div",{class:"tb-ed-inner"});a.append(s),r.append(i("div",{class:"tb-hi-top"},l,u),a);let d=h=>i("p",{class:"tb-ed-muted",role:"status",text:h}),c=(h,y)=>{let v=i("div",{class:"tb-ed-note",role:"alert"});return v.append(i("span",{text:`${h?.userMessage||y} `}),i("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),v},p=()=>{n?.abort();let h=new AbortController;n=h;let y=setTimeout(()=>h.abort(),yn);return{signal:h.signal,done:()=>clearTimeout(y),current:()=>n===h}},b=null,f=[],k=[],m=[],x=null,R=h=>{let y=new URL(t.endpoint,location.href);for(let[v,A]of Object.entries(h))y.searchParams.set(v,A);return y.toString()},H=h=>h.path??b?.source??t.path,g=()=>b?.published[0]??null,L=(h,y)=>{let v=i("p",{class:"tb-hi-meta"});y&&v.append(i("span",{class:"tb-hi-state",text:y})),v.append(`${kt(h.date)}${h.who?` \\xB7 ${h.who}`:""}`);let A=ye(h.role);return A&&v.append(" ",A),h.pr&&t.githubHref&&v.append(" \\xB7 ",i("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${h.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${h.pr}`})),v},$=(h,y,v)=>{if(!y.hidden){y.hidden=!0,v.setAttribute("aria-pressed","false");return}v.setAttribute("aria-pressed","true"),y.hidden=!1,y.textContent="",y.append(d("Loading what changed\\u2026")),t.track("page_revision_opened");let A=new AbortController,D=setTimeout(()=>A.abort(),yn);mt(R({sha:h.sha,path:H(h)}),A.signal).then(N=>{let B=N,O=typeof B.before=="string"?B.before:"",U=typeof B.after=="string"?B.after:"";y.textContent="",B.status==="added"&&y.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let _=typeof B.previousPath=="string"&&B.previousPath!==H(h);_&&y.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${Mt(O)===Mt(U)?"; its text didn\\u2019t change.":"."}`})),(!_||Mt(O)!==Mt(U))&&y.append(Gt(O,U))}).catch(N=>{y.textContent="",y.append(c(N,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(D))},M=(h,y)=>{o=a.scrollTop,s.textContent="";let v=i("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});v.addEventListener("click",()=>{n?.abort(),X()});let A=i("div",{});return s.append(v,i("div",{class:"tb-hi-banner",role:"status",text:y}),i("div",{class:"tb-hi-head"},i("h2",{text:h})),A),a.scrollTop=0,v.focus(),A},S=h=>{let y=M(h.summary,`You are reading the version of ${kt(h.date)}.`);y.append(d("Loading this version\\u2026")),t.track("page_version_read");let v=p();mt(R({sha:h.sha,path:H(h)}),v.signal).then(A=>{if(!v.current())return;let D=A.html;y.textContent="",y.append(typeof D=="string"&&D?i("div",{class:"tb-ed-panel tb-ed-preview"},Be(D)):i("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch(A=>{v.current()&&(y.textContent="",y.append(c(A,"This version couldn\\u2019t be loaded just now.")))}).finally(v.done)},P=(h,y)=>{let[v,A]=h.date<=y.date?[h,y]:[y,h],D=O=>`the version of ${kt(O.date)}${O===g()?" (the one you read now)":""}`,N=M("Compare versions",`Changes from ${D(v)} to ${D(A)}.`);N.append(d("Loading the two versions\\u2026")),t.track("page_versions_compared");let B=p();mt(R({sha:A.sha,base:v.sha,path:H(A)}),B.signal).then(O=>{if(!B.current())return;let U=O;N.textContent="",N.append(i("div",{class:"tb-hi-diff"},Gt(typeof U.before=="string"?U.before:"",typeof U.after=="string"?U.after:"")))}).catch(O=>{B.current()&&(N.textContent="",N.append(c(O,"The versions couldn\\u2019t be compared just now.")))}).finally(B.done)},q=(h,y)=>{let v=i("li",{class:"tb-hi-entry"}),A=i("div",{class:"tb-hi-diff",hidden:!0}),D=i("button",{type:"button","aria-pressed":"false",text:"Show changes"});D.addEventListener("click",()=>$(h,A,D));let N=i("button",{type:"button",text:"Read this version"});N.addEventListener("click",()=>S(h));let B=i("button",{type:"button",text:x?x===h?"Cancel compare":"Compare with this":"Compare\\u2026"});B.addEventListener("click",()=>{if(!x)x=h,X();else if(x===h)x=null,X();else{let _=x;x=null,P(_,h)}});let O=i("div",{class:"tb-hi-actions"},D,N,B),U=g();if(!x&&U&&U.sha!==h.sha){let _=i("button",{type:"button",text:"Compare with now"});_.addEventListener("click",()=>P(h,U)),O.append(_)}return v.append(i("p",{class:"tb-hi-msg",text:h.summary}),L(h,y),O,A),v},j=h=>{let y=i("li",{class:"tb-hi-entry"});return y.append(i("p",{class:"tb-hi-msg",text:h.summary||St(h)}),L({date:h.date,who:h.who?.name??"A reader",role:nn(h,[...b?.published??[],...b?.drafts??[]])},`Proposed \\xB7 ${St(h)}`),i("div",{class:"tb-hi-actions"},i("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",text:`See #${h.number} on GitHub \\u2197`}))),y},Z=h=>i("li",{class:"tb-hi-entry tb-hi-declined-entry"},i("p",{class:"tb-hi-msg",text:h.summary||Wt(h)}),i("p",{class:"tb-hi-meta"},i("span",{class:"tb-hi-state tb-hi-declined",text:"Declined"}),`${Wt(h).replace(/^Declined /,"")} \\xB7 ${kt(h.date)}`),ge(h,t.endpoint)),X=()=>{if(s.textContent="",!b)return;if(x&&s.append(i("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${kt(x.date)}: pick the other version, below.`})),k.length||b.drafts.length){let v=i("ol",{class:"tb-hi-list"});for(let A of k)v.append(j(A));for(let A of b.drafts)v.append(q(A,"Being edited"));s.append(i("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},i("h2",{id:"tb-hi-editing",text:"Being edited"}),i("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),v))}let h=i("ol",{class:"tb-hi-list"}),y=[...m].sort((v,A)=>A.date.localeCompare(v.date));for(let v of on(b.published,f)){let A="release"in v?v.release.date:v.entry.date;for(;y.length&&y[0].date>A;)h.append(Z(y.shift()));"release"in v?h.append(i("li",{class:"tb-hi-release",role:"separator","aria-label":`${Te(v.release.tag)}, ${kt(v.release.date)}`,text:`${Te(v.release.tag)} \\xB7 ${kt(v.release.date)}`})):h.append(q(v.entry,void 0))}for(let v of y)h.append(Z(v));s.append(i("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},i("h2",{id:"tb-hi-published",text:m.length?"Published and declined":"Published"}),i("p",{text:b.published.length?m.length?"What readers have seen, and what the authors declined and why, newest first.":"What readers have seen, newest first.":m.length?"This page has no published versions yet. What the authors declined, and why:":"This page has no published versions yet."}),h)),a.scrollTop=o},J=h=>{if(h.key==="Escape"){h.preventDefault(),V();return}if(h.key!=="Tab")return;let y=Array.from(r.querySelectorAll("a[href], button, [tabindex]")).filter(A=>!A.disabled&&A.tabIndex>=0&&!A.closest("[hidden]"));if(!y.length)return;let v=y.indexOf(document.activeElement);(h.shiftKey?v<=0:v===-1||v===y.length-1)&&(h.preventDefault(),y[h.shiftKey?y.length-1:0].focus())},V=()=>{we=null,n?.abort(),document.removeEventListener("keydown",J,!0),r.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};u.addEventListener("click",V),document.addEventListener("keydown",J,!0),we=V,document.body.style.overflow="hidden",document.body.append(r),u.focus(),t.track("page_history_opened"),s.append(d("Loading this page\\u2019s history\\u2026"));let Q=p(),ct=t.bookHistoryUrl?mt(t.bookHistoryUrl,Q.signal).then(h=>{let y=ae(h),v=y?.pages.find(A=>A.source===t.path)??null;return y&&(f=y.releases),y&&!m.length&&(m=It(y.declined).filter(A=>A.files?.includes(t.path))),v}):Promise.resolve(null),st=At(t.endpoint,t.path,{declined:"1"}),at=st?mt(st,Q.signal).then(h=>(m=It(h?.declined),(h?.items??[]).filter(y=>y&&typeof y.url=="string"))).catch(()=>[]):Promise.resolve([]);ct.catch(()=>null).then(async h=>{if(h)return h;let y=await mt(t.listUrl,Q.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(y)?y:[]).map((v,A,D)=>({sha:v.sha,date:v.date,who:v.who,role:null,summary:vo(v.message??"",A===D.length-1),...v.path!==t.path?{path:v.path}:{}})),drafts:[],releases:{}}}).then(async h=>{b=h;let y=[...h.published,...h.drafts],v=[...new Set(y.filter(B=>B.who===wn).map(B=>B.sha))].slice(0,wo),A=v.length?mt(R({shas:v.join(",")}),Q.signal).then(B=>B?.names??{}).catch(()=>({})):Promise.resolve({}),[D,N]=await Promise.all([A,at]);for(let B of y){let O=D[B.sha];B.who===wn&&typeof O=="string"&&O.trim()&&(B.who=O.trim().slice(0,80))}k=N,Q.current()&&X()}).catch(h=>{Q.current()&&(s.textContent="",s.append(c(h,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(Q.done)};var Ot="http://www.w3.org/2000/svg",En={proposed:"Proposed",drafts:"Being edited",published:"Published",declined:"Declined"},kn="tb-bh-style",Eo=(t,e)=>{let n=o=>{let r=o?.querySelector("title")?.textContent;if(r){for(let l of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))l.removeAttribute("aria-current");o.setAttribute("aria-current","true"),e.textContent=r}};t.addEventListener("click",o=>n(o.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",o=>n(o.target.closest(".tb-swim-dot")))},ko=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),o=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!o)return;let[r,l]=n.map(a=>({t:Date.parse(a.textContent??""),x:Number(a.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let u=Number(o.getAttribute("y"))+Number(o.getAttribute("height"))/2;for(let a of e){let s=Math.min(Math.max(Date.parse(a.date),r.t),l.t),d=document.createElementNS(Ot,"circle");d.setAttribute("class","tb-swim-dot"),d.setAttribute("data-lane","0"),d.setAttribute("cx",(r.x+(s-r.t)/(l.t-r.t)*(l.x-r.x)).toFixed(1)),d.setAttribute("cy",String(u)),d.setAttribute("r","5"),d.setAttribute("tabindex","0");let c=document.createElementNS(Ot,"title");c.textContent=`${a.date} \\xB7 ${St(a)}: ${a.summary} (${a.who?.name??"a reader"})`,d.append(c),t.append(d)}},$o=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),o=t.querySelector(\'.tb-swim-lane[data-lane="3"]\');if(n.length<2||!o)return;let[r,l]=n.map(s=>({t:Date.parse(s.textContent??""),x:Number(s.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let u=Number(o.getAttribute("y"))+Number(o.getAttribute("height"))/2,a=new Set(Array.from(t.querySelectorAll(".tb-swim-declined")).map(s=>s.getAttribute("data-number")));for(let s of e){if(a.has(String(s.number)))continue;let d=r.x+(Math.min(Math.max(Date.parse(s.date),r.t),l.t)-r.t)/(l.t-r.t)*(l.x-r.x),c=document.createElementNS(Ot,"g");for(let[k,m]of Object.entries({class:"tb-swim-dot tb-swim-declined","data-lane":"3","data-number":String(s.number),tabindex:"0",fill:"none",stroke:"currentColor","stroke-width":"1.5"}))c.setAttribute(k,m);let p=document.createElementNS(Ot,"title");p.textContent=`${s.date} \\xB7 declined: ${s.summary} (${s.who?.name??"a reader"})`;let b=document.createElementNS(Ot,"circle");b.setAttribute("cx",d.toFixed(1)),b.setAttribute("cy",String(u)),b.setAttribute("r","5");let f=document.createElementNS(Ot,"path");f.setAttribute("d",`M${(d-3).toFixed(1)} ${u-3}L${(d+3).toFixed(1)} ${u+3}M${(d+3).toFixed(1)} ${u-3}L${(d-3).toFixed(1)} ${u+3}`),c.append(p,b,f),t.append(c)}},Ne=(t,e,n,o)=>{let r=i("select",{class:"tb-bh-select"});r.append(i("option",{value:"",text:"Any"}));for(let[l,u]of n)r.append(i("option",{value:l,text:u}));return r.addEventListener("change",()=>o(e,r.value)),i("label",{class:"tb-bh-filter"},i("span",{text:t}),r)},$n=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let o=document.querySelector("svg.tb-swimlane");if(o){let g=i("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});o.closest("figure")?.append(g),Eo(o,g)}let r=new AbortController;setTimeout(()=>r.abort(),2e4);let l=ae(await mt(e,r.signal).catch(()=>null));if(!l)return;let u=n?At(n):"";document.getElementById(kn)||document.head.append(i("style",{id:kn,text:Ie(".tb-bh-list")+fe(".tb-bh-list")}));let a=It(l.declined),s=u?await mt(At(n,"",{declined:"1"}),r.signal).then(g=>{let L=g?.declined;return Array.isArray(L)&&(a=It(L)),(g?.items??[]).filter($=>$&&typeof $.url=="string")}).catch(()=>[]):[];o&&(ko(o,s),$o(o,a));let d=new Map(l.pages.map(g=>[g.source,g])),c=[...s.map(g=>{let L=g.files?.map($=>d.get($)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||St(g),state:"proposed",page:L?.source??"",pageTitle:L?.title??"",href:g.url,ref:`#${g.number}`,anchor:Ft(g.kind,g.number)}}),...a.map(g=>{let L=g.files?.map($=>d.get($)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||Wt(g),state:"declined",page:L?.source??"",pageTitle:L?.title??"",href:g.url,ref:`#${g.number}`,anchor:Ft(g.kind,g.number),declined:g}}),...rn(l).map(g=>({date:g.date,who:g.who,role:g.role,summary:g.summary,state:g.state,page:g.page.source,pageTitle:g.page.title,href:g.page.path,ref:g.pr?`#${g.pr}`:"",anchor:g.pr?Ft("pr",g.pr):g.issue?Ft("issue",g.issue):""}))].sort((g,L)=>L.date.localeCompare(g.date)),p={page:"",person:"",state:""},b=i("ol",{class:"tb-bh-list"}),f=i("p",{class:"tb-bh-count",role:"status"}),k=()=>{b.textContent="";let g=c.filter($=>sn(p,$));f.textContent=`${g.length} change${g.length===1?"":"s"}`;let L=new Set;for(let $ of g){let M=i("p",{class:"tb-bh-meta"},i("span",{class:`tb-bh-state tb-bh-${$.state}`,text:En[$.state]}),` ${kt($.date)}${$.who?` \\xB7 ${$.who}`:""}`),S=$.anchor&&!L.has($.anchor)?$.anchor:!1;S&&L.add(S);let P=ye($.role);P&&M.append(" ",P),$.state==="proposed"&&M.append(" \\xB7 ",i("a",{href:$.href,target:"_blank",rel:"noopener noreferrer",text:`${$.ref} on GitHub \\u2197`})),b.append(i("li",{class:"tb-bh-item",id:S,tabindex:S?"-1":!1},i("p",{class:"tb-bh-summary",text:$.summary}),$.pageTitle?i("p",{class:"tb-bh-page"},$.state==="proposed"||$.state==="declined"?$.pageTitle:i("a",{href:$.href,text:$.pageTitle})):null,M,$.note?i("p",{class:"tb-bh-note",text:$.note}):null,$.declined?ge($.declined,n):null))}},m=(g,L)=>{Object.assign(p,{[g]:L}),k()},x=[...new Set(c.map(g=>g.who).filter(Boolean))].sort((g,L)=>g.localeCompare(L)),R=l.pages.filter(g=>g.published.length||g.drafts.length).map(g=>[g.source,g.title]);t.append(i("h2",{text:"All changes"}),i("div",{class:"tb-bh-filters"},Ne("Chapter","page",R,m),Ne("Person","person",x.map(g=>[g,g]),m),Ne("State","state",Object.entries(En),m)),f,b),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),k();let H=async()=>{let g=/^#((?:issue|pr)-(\\d+))$/.exec(location.hash);if(!g)return;let L=g[1];if(!document.getElementById(L)&&n){let M=new URL(n,location.href);M.searchParams.set("mode","item"),M.searchParams.set("number",g[2]);let S=await mt(M.toString(),AbortSignal.timeout(15e3)).catch(()=>null);if(S&&S.number===Number(g[2])&&Ft(S.kind,S.number)===L){let P=an(S),q=S.files?.map(j=>d.get(j)).find(Boolean);c.unshift({date:String((P==="proposed"?S.created:S.closed)??S.created).slice(0,10),who:S.who?.name??"A reader",role:"contributor",summary:S.summary||St(S),state:P,page:q?.source??"",pageTitle:q?.title??"",href:P==="drafts"&&q?q.path:S.url,ref:`#${S.number}`,anchor:L,note:P==="drafts"?"The authors accepted this. It shows as Published once the book is next published.":P==="declined"?"The authors declined this.":void 0}),Object.assign(p,{page:"",person:"",state:""});for(let j of Array.from(t.querySelectorAll(".tb-bh-select")))j.value="";k()}}let $=document.getElementById(L);$&&($.scrollIntoView({block:"start"}),$.focus({preventScroll:!0}))};window.addEventListener("hashchange",()=>{H()}),H()};var Ln={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},Tn=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),Co=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(o=>`${o.charAt(0).toUpperCase()}.`).join(" ")}`},Lo=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,Cn=t=>/[.?!]$/.test(t)?t:`${t}.`,An=t=>{let e=Lo(Tn(t.authors).map(Co)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),o=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=[],l=o?[{text:`${Cn(o)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)r.push({text:`${Cn(e)} (n.d.). `},...l);else if(l.length){let[u,...a]=l;r.push({...u,text:u.text.replace(/ $/,"")},{text:" (n.d.). "},...a)}else r.push({text:"(n.d.). "});return r.push({text:`Retrieved ${n}, from ${t.url}`}),r},Oe=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=Ln[t.licence],o=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&o.push({text:` by ${Tn(t.authors).join(", ")}`}),e&&t.bookTitle&&o.push({text:", from "},{text:t.bookTitle,italic:!0}),o.push({text:`, ${t.url}`}),n?o.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&o.push({text:`, is licensed under ${t.licence}`}),o.push({text:"."}),o},_e=t=>t.map(e=>e.text).join(""),Pe=t=>Ln[t]?.name??t,xe=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],Sn=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},To=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function Fn(t,e,n,o=0){let r=e!=="book"&&t.chapter&&t.styles.chapter,l=r?t.chapter:t.book,u=r?t.styles.chapter:t.styles.book,a=e==="paragraph"&&r?o:0,s=a?`${l.URL}#p${a}`:l.URL,d=To(n),c={};for(let[b]of xe)c[b]=(u[b]??[]).map(f=>({...f,text:f.text.replaceAll("{accessed}",d).replace(l.URL,a?`${s} (para. ${a})`:s)}));return{item:{...l,id:s,URL:s,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...a?{note:`para. ${a}`}:{}},styles:c}}var Kt=t=>t?.["date-parts"]?.[0]??[],Ct=t=>String(t??"").padStart(2,"0"),Mn=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),Ao=t=>{let e=r=>r.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),o=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(r=>r.length>3)??"");return`${n}${Kt(t.issued)[0]??""}${o}`.toLowerCase()||"citation"},So={chapter:"incollection",book:"book",report:"techreport"},De=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function Hn(t){let[e,n,o]=Kt(t.issued),[r,l,u]=Kt(t.accessed),a=c=>c?De(c):void 0,d=[["author",t.author?.map(c=>c.literal?`{${De(c.literal)}}`:De(Mn(c))).join(" and ")],["title",a(t.title)],["booktitle",t.type==="chapter"?a(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",a(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&o?`${e}-${Ct(n)}-${Ct(o)}`:void 0],["url",t.URL],["urldate",r?`${r}-${Ct(l)}-${Ct(u)}`:void 0],["doi",t.DOI],["language",a(t.language)],["note",a(t.note)],["keywords",a(t.keyword)],["abstract",a(t.abstract)]].filter(([,c])=>c).map(([c,p])=>`  ${c} = {${p}}`).join(`,\n`);return`@${So[t.type]??"misc"}{${Ao(t)},\n${d}\n}\n`}var Fo={chapter:"CHAP",book:"BOOK",report:"RPRT"};function Bn(t){let[e,n,o]=Kt(t.issued),[r,l,u]=Kt(t.accessed);return[["TY",Fo[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(s=>["AU",Mn(s)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${Ct(n)}/${Ct(o)}`:void 0],["UR",t.URL],["Y2",r?`${r}/${Ct(l)}/${Ct(u)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(s=>["KW",s]),["N1",t.note]].filter(([,s])=>s).map(([s,d])=>`${s}  - ${d.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var Rn=t=>JSON.stringify([t],null,2)+`\n`;var dt=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},Mo=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},Yt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",u=m=>{let x=m?.userMessage,R=typeof x=="string"?x.trim():"";return R?R.slice(0,200):null},a=()=>{if(document.getElementById(e))return;let m=document.createElement("style");m.id=e,m.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(m)},s=(m,x,R,H=!1)=>{let g=document.createElement("div");g.className="tb-sg-field";let L=document.createElement("label");if(L.setAttribute("for",m),L.textContent=x,H){let M=document.createElement("span");M.className="tb-sg-opt",M.textContent=" (optional)",L.append(M)}let $=document.createElement("p");return $.className="tb-sg-err",$.id=m+"-err",R.id=m,!H&&!R.readOnly&&(R.required=!0),g.append(L,R,$),{wrap:g,control:R,err:$,hintId:null}},d=m=>{let x=[];m.err.textContent&&x.push(m.err.id),m.hintId&&x.push(m.hintId),x.length?m.control.setAttribute("aria-describedby",x.join(" ")):m.control.removeAttribute("aria-describedby")},c=(m,x)=>{m.control.setAttribute("aria-invalid","true"),m.err.textContent=x,d(m)},p=m=>{m.control.hasAttribute("aria-invalid")&&(m.control.removeAttribute("aria-invalid"),m.err.textContent="",d(m))},b=null,f=(m,x,R,H,g)=>{if(b)return;let L=g==="note"&&!!H;a();let $=R,M=document.body.style.overflow,S=null,P=!1,q=document.createElement("div");q.id=t;let j=document.createElement("div");j.className="tb-sg-dialog",j.tabIndex=-1,j.setAttribute("role","dialog"),j.setAttribute("aria-modal","true"),j.setAttribute("aria-labelledby",n);let Z=document.createElement("div");Z.className="tb-sg-head";let X=document.createElement("h2");X.id=n,X.textContent=H?`Note to the authors about \\xB6${H.paragraph}`:"Suggest an edit";let J=document.createElement("button");J.type="button",J.className="tb-sg-close",J.textContent="\\xD7",J.setAttribute("aria-label",L?"Close note form":"Close suggestion form"),Z.append(X,J);let V=document.createElement("form");V.noValidate=!0;let Q=document.createElement("p");Q.className="tb-sg-intro",Q.textContent=H?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let ct=document.createElement("blockquote");ct.className="tb-sg-quote",ct.textContent=L?H.text??H.quote:H?.quote??"";let st=L?"":H?.text??"";ct.hidden=!ct.textContent||!!st;let at=Mo(),h=document.createElement("input");h.type="text",h.name="name",h.autocomplete="name";let y=s("tb-sg-name","Your name",h),v=document.createElement("p");if(v.className="tb-sg-count",v.id="tb-sg-credit",v.textContent=L?"If the authors act on your note, you\'ll be credited by this name.":"If the authors accept your suggestion, you\'ll be credited by this name.",y.wrap.append(v),y.hintId=v.id,d(y),at){h.value=at.name||at.login;let T=document.createElement("p");T.className="tb-sg-count",T.id="tb-sg-who",T.textContent=`Signed in as @${at.login}: GitHub tells you when the authors answer.`,y.wrap.append(T),y.hintId=`${v.id} ${T.id}`,d(y)}let A=document.createElement("input");A.type="text",A.name="path",A.readOnly=!0,A.value=x;let D=s("tb-sg-path","Page you are editing",A),N=document.createElement("textarea");N.name="suggestion",N.rows=6,N.maxLength=5e3,N.value=st;let B=s("tb-sg-suggestion","Your suggested change",N),O=document.createElement("p");O.className="tb-sg-count",O.id="tb-sg-count",B.hintId=O.id;let U=()=>{let T=5e3-N.value.length;O.textContent=T+" character"+(T===1?"":"s")+" remaining"};U(),d(B),N.addEventListener("input",()=>{U(),p(B)}),B.wrap.append(O);let _=document.createElement("textarea");_.name="reasoning",_.rows=3;let $t=L?s("tb-sg-reasoning","Your comment",_):s("tb-sg-reasoning","Comment",_,!0);L&&(_.rows=6,_.maxLength=5e3,_.addEventListener("input",()=>p($t))),y.control.addEventListener("input",()=>p(y));let ht=document.createElement("div");ht.className="tb-sg-hp",ht.setAttribute("aria-hidden","true");let Ht=document.createElement("label");Ht.setAttribute("for","tb-sg-website"),Ht.textContent="Leave this field empty";let it=document.createElement("input");it.type="text",it.name="website",it.id="tb-sg-website",it.tabIndex=-1,it.autocomplete="off",it.setAttribute("aria-hidden","true"),ht.append(Ht,it);let yt=document.createElement("div");yt.className="tb-sg-actions";let lt=document.createElement("button");lt.type="submit",lt.className="tb-sg-btn";let _t=L?"Send comment":"Send suggestion";lt.textContent=_t;let wt=document.createElement("button");wt.type="button",wt.className="tb-sg-quiet",wt.textContent="Cancel",yt.append(lt,wt);let Pt=()=>N.value.replace(/\\s+/g," ").trim()===st.replace(/\\s+/g," ").trim(),nt=()=>(L||Pt())&&!_.value.trim(),gt=document.createElement("p");gt.className="tb-sg-count",gt.id="tb-sg-why-not",gt.textContent=L?"Write your comment to send.":st?"Change the text above, or add a comment, to send.":"Describe the change, or add a comment, to send.",lt.setAttribute("aria-describedby",gt.id);let Bt=()=>{gt.hidden=!nt(),P||(lt.disabled=nt())};N.addEventListener("input",Bt),_.addEventListener("input",Bt);let tt=document.querySelector(".tb-page-controls")?.dataset.privacy,Lt=document.createElement("p");if(Lt.className="tb-sg-count tb-sg-published",Lt.append("Your name and text are published openly, under the book\'s licence. "),tt){let T=document.createElement("a");T.href=tt,T.textContent="How contributions are handled",Lt.append(T)}V.append(Q,ct,y.wrap,D.wrap,...L?[]:[B.wrap],$t.wrap,ht,gt,...tt?[Lt]:[],yt),Bt();let et=document.createElement("div");et.className="tb-sg-pane",et.tabIndex=-1,et.hidden=!0,j.append(Z,V,et),q.append(j);let Tt=()=>{et.hidden=!0,V.hidden=!1,N.focus()},Rt=(T,z,Y,ut=!1)=>{if(!q.isConnected)return;et.textContent="";let Et=document.createElement("p");Et.className="tb-sg-pane-title",Et.textContent=T;let rt=document.createElement("p");rt.textContent=z,et.append(Et,rt);let ot=ie(Y,location.origin);if(ot){let bt=document.createElement("a");bt.href=ot,bt.textContent=ot;let ft=document.createElement("p");ft.className="tb-sg-follow",ft.append("Follow your suggestion: ",bt),et.append(ft)}if(Y){let bt=document.createElement("a");bt.href=Y,bt.target="_blank",bt.rel="noopener",bt.textContent="View your suggestion on GitHub";let ft=document.createElement("p");ft.append(bt),et.append(ft)}let pt=document.createElement("button");pt.type="button",pt.className=ut?"tb-sg-btn":"tb-sg-quiet",pt.textContent=ut?"Back to my suggestion":"Close",pt.addEventListener("click",ut?Tt:()=>b?.()),et.append(pt),V.hidden=!0,et.hidden=!1,et.focus()},qt=()=>Array.prototype.filter.call(j.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),T=>!T.disabled&&T.tabIndex>=0&&!T.closest("[hidden]")),Ut=T=>{if(T.key==="Escape"){T.preventDefault(),b?.();return}if(T.key!=="Tab")return;let z=qt();if(!z.length){T.preventDefault(),j.focus();return}let Y=z.indexOf(document.activeElement);T.shiftKey?Y<=0&&(T.preventDefault(),z[z.length-1].focus()):(Y===-1||Y===z.length-1)&&(T.preventDefault(),z[0].focus())};b=()=>{if(b=null,S)try{S.abort()}catch{}document.removeEventListener("keydown",Ut,!0),q.remove(),document.body.style.overflow=M,$.isConnected&&$.focus()},q.addEventListener("mousedown",T=>{T.target===q&&b?.()}),J.addEventListener("click",()=>b?.()),wt.addEventListener("click",()=>b?.()),document.addEventListener("keydown",Ut,!0);let xt=()=>{let T=null,z=(Y,ut)=>{c(Y,ut),T||(T=Y.control)};for(let Y of[y,B,$t])p(Y);return h.value.trim()||z(y,"Please add your name."),L&&!_.value.trim()?z($t,"Please write your comment."):!L&&!N.value.trim()&&!Pt()?z(B,"Please describe the change you would like."):N.value.length>5e3&&z(B,"Please keep the suggestion under 5000 characters."),T&&T.focus(),!T},vt=T=>{P=T,lt.disabled=T||nt(),lt.textContent=T?"Sending\\u2026":_t};V.addEventListener("submit",T=>{if(T.preventDefault(),P||nt()||!xt())return;let z=L||Pt(),Y={name:h.value.trim(),suggestion:(z?_:N).value.trim(),reasoning:z?"":_.value.trim(),path:x,website:it.value,...H?{paragraph:H.paragraph,quote:!z&&st?st:H.quote,page:H.page,...H.anchor?{anchor:H.anchor}:{},...z?{note:!0}:{}}:{},...at?{identity:at.token}:{}};if(Y.website){Rt("Thank you","Your suggestion has been received.");return}vt(!0);let ut=S=new AbortController,Et=setTimeout(()=>ut.abort(),1e4);se(m,JSON.stringify(Y),{signal:ut.signal,onWait:()=>{clearTimeout(Et),lt.textContent=re}}).then(async rt=>{let ot=null;try{ot=await rt.json()}catch{ot=null}if(!rt.ok){let pt=new Error(ot?.error||"HTTP "+rt.status);throw pt.userMessage=u(ot),pt}return ot}).then(rt=>{dt("suggest_edit_submitted",{outcome:"success"});let ot=rt?.issueUrl;Rt(L?"Thank you \\u2014 comment sent":"Thank you \\u2014 suggestion sent","A maintainer will pick this up. Keep this link to see what they decide:",typeof ot=="string"?ot:null)}).catch(rt=>{dt("suggest_edit_submitted",{outcome:"error"}),Rt("That did not go through",rt&&rt.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(Et),S===ut&&(S=null),lt.isConnected?vt(!1):P=!1})}),document.body.style.overflow="hidden",document.body.appendChild(q),h.focus(),dt(H?"section_note_opened":"suggest_edit_opened")},k=((m,x,R,H,g)=>{try{f(m,x,R,H,g)}catch{b=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return k.closeIfOpen=()=>b?.(),k}catch{return null}})(),In="tb-pedit-style",On=()=>{if(document.getElementById(In))return;let t=document.createElement("style");t.id=In,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},_n=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",bn),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},Ho="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",Ee=t=>(t.textContent??"").replace(/\\s+/g," ").trim(),je=()=>{let t=window.getSelection?.();if(!t||t.isCollapsed||!t.rangeCount)return;let e=Ro(t.getRangeAt(0));if(!e)return;let n=Ge(t.getRangeAt(0).startContainer);return{paragraph:e.start,quote:qn(n),page:Bo(),text:e.exact,anchor:e}},Bo=()=>location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/"),Ge=t=>(t instanceof Element?t:t.parentElement)?.closest("article [data-pnum]"),qe=t=>t.replace(/\\s+/g," "),Pn=()=>document.querySelector("[data-source-commit]")?.dataset.sourceCommit??"",Ro=t=>{let e=Ge(t.startContainer),n=Ge(t.endContainer)??e;if(!e||!n||e.closest(".popover"))return;let o=qe(t.toString()).trim();if(!o)return;let r=document.createRange();r.setStart(e,0),r.setEnd(t.startContainer,t.startOffset);let l=document.createRange();return l.setStart(t.endContainer,t.endOffset),l.setEnd(n,n.childNodes.length),{start:Number(e.dataset.pnum),end:Number(n.dataset.pnum),exact:o.slice(0,2e3),prefix:qe(r.toString()).trimStart().slice(-32),suffix:qe(l.toString()).trimEnd().slice(0,32),text:Ee(e),commit:Pn()}},Io=t=>{let e=Number(t.dataset.pnum);return{start:e,end:e,exact:Ee(t),prefix:"",suffix:"",text:Ee(t),commit:Pn()}},No=t=>{let e=window,n=!e.tbSelectionComment;if(e.tbSelectionComment=t,!n)return;let o=document.createElement("button");o.type="button",o.className="tb-sel-comment",o.textContent="Comment on this",o.hidden=!0,document.body.append(o);let r,l=0,u=()=>{o.hidden=!0,r=void 0};o.addEventListener("pointerdown",a=>a.preventDefault()),o.addEventListener("click",()=>{let a=r;u(),a&&e.tbSelectionComment?.(a,o)}),o.addEventListener("keydown",a=>{a.key==="Escape"&&u()}),document.addEventListener("selectionchange",()=>{clearTimeout(l);let a=window.matchMedia?.("(pointer: coarse)").matches;l=window.setTimeout(()=>{let s=je();if(!s)return u();let d=window.getSelection().getRangeAt(0).getClientRects(),c=d[d.length-1];if(!c)return u();r=s,o.hidden=!1;let p=o.offsetWidth||130,b=Math.max(8,Math.min(c.right-p/2,document.documentElement.clientWidth-p-8));o.style.left=`${b+window.scrollX}px`,o.style.top=`${c.bottom+window.scrollY+(a?28:8)}px`},a?700:250)})},qn=t=>{let e=Ee(t);if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},Do=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(r=>!r.closest(".popover")&&!r.querySelector(":scope > button.tb-pnote"));if(!n.length)return;On();let o=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let r of n){let l=Number(r.dataset.pnum),u=_n();u.className="tb-pnote",u.title=`Note to the authors about \\xB6${l}`,u.querySelector("path").setAttribute("d",Ho),u.addEventListener("click",a=>{a.stopPropagation(),$e(u,e,`Continue: note on \\xB6${l}`,()=>t({paragraph:l,quote:qn(r),page:o,anchor:Io(r)},u))}),r.append(u)}},ve=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(ve))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var Oo=t=>typeof t.showPopover=="function",ke=new Set,Un=(t,e)=>{let n=t.closest(".tb-header")??t,r=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),l=t.getBoundingClientRect(),u=document.documentElement.clientWidth,a=e.style;a.boxSizing="border-box",a.top=`${Math.max(r.bottom,0)+6}px`,a.maxHeight=`${Math.max(window.innerHeight-Math.max(r.bottom,0)-12,120)}px`;let s=()=>{a.left=`${Math.max(r.left,0)}px`,a.right="auto",a.width=`${Math.min(r.width,u)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return s();a.left="auto",a.right=`${Math.max(u-l.right,0)}px`,a.width="",e.getBoundingClientRect().left<r.left&&s()},We=()=>{for(let t of Array.from(ke))Un(t.button,t.panel)};window.addEventListener("resize",We);window.addEventListener("scroll",We,{passive:!0});var zn=(t,e)=>{e.hidden=!1,Oo(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",ke.add({button:t,panel:e}),Un(t,e))},jn=t=>{for(let e of Array.from(ke))e.panel===t&&ke.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Ue=(t,e,n,o)=>{let r=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(s=>!s.hidden&&!s.closest("[hidden]")),l={d:null,button:t,panel:e},u={open(){for(let d of Array.from(ve))d!==l&&d.d.close(!1);zn(t,e),t.setAttribute("aria-expanded","true"),ve.add(l),(n?r()[0]:e.querySelector("input:checked")??r()[0])?.focus()},close(s=!0){e.hidden||(jn(e),t.setAttribute("aria-expanded","false"),ve.delete(l),s&&t.focus())}};l.d=u,t.addEventListener("click",()=>{if(!e.hidden)return u.close();o?o(u.open):u.open()});let a=s=>{if(s.key==="Escape"&&!e.hidden){s.preventDefault(),s.stopPropagation(),u.close(!0);return}if(!n||e.hidden||!e.contains(s.target))return;let d=r(),c=d.indexOf(document.activeElement),p=b=>{s.preventDefault(),d[(b+d.length)%d.length]?.focus()};s.key==="ArrowDown"?p(c+1):s.key==="ArrowUp"?p(c-1):s.key==="Home"?p(0):s.key==="End"?p(d.length-1):s.key==="Tab"&&u.close(!1)};return e.addEventListener("keydown",a),t.addEventListener("keydown",a),n&&e.addEventListener("click",s=>{let d=s.target.closest(\'[role="menuitem"]\');if(d){if(d.getAttribute("aria-disabled")==="true"){s.preventDefault();return}u.close(!1)}}),u},E=(t,e={},...n)=>{let o=document.createElement(t);for(let[r,l]of Object.entries(e))r==="text"?o.textContent=l:r==="class"?o.className=l:o.setAttribute(r,l);for(let r of n)r!==null&&o.append(r);return o},Zt=(t,e,...n)=>{let o=E("dialog",{class:"tb-dialog","aria-label":t}),r=E("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});r.addEventListener("click",()=>o.close()),o.append(r,...n);let l=null;return o.addEventListener("close",()=>{o.remove(),l?l():e.isConnected&&e.focus()}),document.body.append(o),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""),{d:o,closeThen:u=>(l=u,o.close())}},Nn=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,zn(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",jn(e),e.hidden=!1)},4e3))},Gn=(t,e,n)=>{let o=()=>{let r=E("textarea",{readonly:""});r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.append(r),r.select();let l=!1;try{l=document.execCommand("copy")}catch{l=!1}return r.remove(),l};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>o()?e():n()):o()?e():n()},Wn="tb-contribute-explained",Kn=!1,_o=()=>{if(Kn)return!0;try{return localStorage.getItem(Wn)==="1"}catch{return!1}},Vt={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Reword a paragraph where it stands, or tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},Po=["no","one","two","three"],qo="https://hypothes.is/logout",Yn=(t,e,n)=>{Kn=!0;try{localStorage.setItem(Wn,"1")}catch{}let o=({title:p,what:b,who:f,account:k,link:m,switchNote:x})=>E("section",{class:"tb-route"},E("h3",{text:p}),E("p",{text:b}),E("p",{},E("strong",{text:"Who sees it: "}),f),E("p",{},E("strong",{text:"Account: "}),k,m?" ":null,m?E("a",{href:m[1],target:"_blank",rel:"noopener noreferrer",text:m[0]}):null),x?E("p",{},`${x} `,E("a",{href:qo,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),r=E("div",{class:"tb-dialog-row"}),l=document.querySelector(".tb-header"),u=window.tbAnnotations,a=(l?.dataset.routes??"comment").split(" ").filter(p=>p!=="comment"||u).map(p=>p==="comment"&&u?.groupsOnly?"groupComment":p).filter(p=>p in Vt),s=a.includes("edit")||a.includes("note")?"book":"edition",d=Zt("How contributing works",t,E("h2",{text:"How contributing works"}),E("p",{text:a.length===1?`There is one way to help with this ${s}: ${Vt[a[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${Po[a.length]??a.length} ways to help with this ${s}. They differ in who sees what you write, and in which account you need.`}),...a.map(p=>o(Vt[p])),E("p",{},E("a",{href:e,text:"More about commenting and contributing"})),...l?.dataset.credits?[E("p",{},E("a",{href:`${l.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],r),c=E("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>d.d.close()),n){let p=E("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});p.addEventListener("click",()=>d.closeThen(n.run)),r.append(c,p),p.focus()}else r.append(c),c.focus()},$e=(t,e,n,o)=>_o()?o():Yn(t,e,{label:n,run:o}),Uo=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},zo=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(l=>l.id===e):void 0;if(n)return Number(n.dataset.pnum);let o=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,r=t.find(l=>{let u=l.getBoundingClientRect();return u.bottom>o+8&&u.top<window.innerHeight});return Number((r??t[0]).dataset.pnum)||0},jo=(t,e,n)=>{let o=URL.createObjectURL(new Blob([t],{type:e})),r=E("a",{href:o,download:n});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},Go=(t,e,n,o,r=!1)=>{let l=t.chapter?zo():0,u=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),a=[...l?[["paragraph",`This paragraph (\\xB6${l})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${u}`]],s=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),d=l&&s&&!r?"paragraph":t.chapter?"chapter":"book",c="apa";try{let M=localStorage.getItem("tb-cite-style");M&&xe.some(([S])=>S===M)&&(c=M)}catch{}let p=E("p",{class:"tb-cite-text","aria-live":"polite"}),b=E("span",{class:"tb-cite-said",role:"status"}),f=()=>Fn(t,d,new Date,l),k=()=>{b.textContent="",p.textContent="";for(let M of f().styles[c])p.append(M.italic?E("i",{text:M.text}):M.text)},m=(M,S,P,q,j)=>{let Z=E("div",{class:"tb-seg"});for(let[X,J]of P){let V=E("input",{type:"radio",name:M,value:X});V.checked=q()===X,V.addEventListener("change",()=>{j(X),k()}),Z.append(E("label",{},V,J))}return E("fieldset",{},E("legend",{text:S}),Z)},x=E("button",{type:"button",class:"tb-btn",text:"Copy"});x.addEventListener("click",()=>{Gn(_e(f().styles[c]),()=>b.textContent="Copied",()=>b.textContent="Couldn\'t copy: select the text instead"),dt("citation_copied",{style:c,scope:d})});let R=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",H=[["BibTeX","bib","application/x-bibtex",Hn],["RIS","ris","application/x-research-info-systems",Bn],["CSL-JSON","json","application/vnd.citationstyles.csl+json",Rn]],g=E("div",{class:"tb-dialog-row tb-cite-files"},E("span",{class:"tb-cite-said",text:"Download"}));for(let[M,S,P,q]of H){let j=E("button",{type:"button",class:"tb-btn",text:M});j.addEventListener("click",()=>{let{item:Z}=f();jo(q(Z),P,`${d==="book"?"book":R}${d==="paragraph"?`-p${l}`:""}.${S}`),dt("citation_downloaded",{format:S,scope:d})}),g.append(j)}let L=Pe(e.dataset.licence??""),$=E("p",{class:"tb-cite-text"});for(let M of o())$.append(M.italic?E("i",{text:M.text}):M.text);k(),Zt("Cite",n,E("h2",{text:"Cite"}),m("tb-cite-scope","What",a,()=>d,M=>d=M),m("tb-cite-style","Style",xe,()=>c,M=>{c=M;try{localStorage.setItem("tb-cite-style",c)}catch{}}),p,E("div",{class:"tb-dialog-row"},b,x),g,E("h3",{text:L?`Attribution (${L})`:"Attribution"}),$)},Dn=(t,e,n=!1)=>{let o={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:Uo(),accessed:new Date},r=s=>{let d=E("p",{class:"tb-cite-text"});for(let c of s)d.append(c.italic?E("i",{text:c.text}):c.text);return d},l=(s,d)=>{let c=E("span",{class:"tb-cite-said",role:"status"}),p=E("button",{type:"button",class:"tb-btn",text:"Copy"});return p.addEventListener("click",()=>Gn(_e(d),()=>c.textContent="Copied",()=>c.textContent="Couldn\'t copy: select the text instead")),E("section",{},E("h3",{text:s}),r(d),E("div",{class:"tb-dialog-row"},c,p))},u=Sn(document);if(u)return Go(u,t,e,()=>Oe(o),n);let a=Pe(o.licence);Zt("Cite this page",e,E("h2",{text:"Cite this page"}),l("APA 7",An(o)),l(a?`Attribution (${a})`:"Attribution",Oe(o)))},Wo=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},Ko=(t,e,n,o)=>{let r=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),u=(s,d,c)=>{let p=r.filter(([b])=>d?.[b]).map(([b,f])=>{let k=E("a",{class:"tb-btn",href:d[b],download:"",text:f});return k.addEventListener("click",()=>dt("download",{format:b,scope:c})),k});return p.length?[E("h3",{text:s}),E("div",{class:"tb-dialog-row tb-cite-files"},...p)]:[]},a=E("button",{type:"button",class:"tb-btn",text:"Markdown"});a.addEventListener("click",o),Zt("Download",n,E("h2",{text:"Download"}),...u("This page",t.chapter,"chapter"),...u(`Whole ${l}`,t.book,"book"),E("h3",{text:"Source"}),E("div",{class:"tb-dialog-row tb-cite-files"},a))},Yo=(t,e,n)=>{let o=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&o.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let r=E("p",{class:"tb-panel-note",role:"status"});for(let[l,u,a]of o){let s=E("div",{class:"tb-seg"});for(let[c,p]of a){let b=E("input",{type:"radio",name:`tb-pref-${l}`,value:c});b.checked=e.get(l)===c,b.addEventListener("change",()=>{if(l==="annotations"&&n){if(r.textContent="",c==="on")n.enable();else if(n.disable().reload){let f=E("button",{type:"button",class:"tb-btn",text:"Reload"});f.addEventListener("click",()=>location.reload()),r.append("Highlights hidden. The annotation tab goes away when the page reloads.",f)}return}e.set(l,c),l==="numbers"&&dt("paragraph_numbers_toggled",{to:c})}),s.append(E("label",{},b,p))}let d=E("fieldset",{},E("legend",{text:u}),s);l==="annotations"&&d.append(r),l==="width"&&Vo(t,d),t.append(d)}},Vo=(t,e)=>{let n=r=>E("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${r}) * var(--tb-size-body) * var(--tb-text-scale))`}),o=()=>{let r=document.querySelector("article");if(!r?.parentElement||t.hidden)return;let l=n("--tb-measure-standard-em"),u=n("--tb-measure-wide-em");r.parentElement.append(l,u);let a=l.getBoundingClientRect().width,s=u.getBoundingClientRect().width;l.remove(),u.remove(),e.hidden=!(s-a>=16)};new MutationObserver(o).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",o)},ze=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Zo=t=>{let e=!1,n=()=>{e=!1;let r=t.getBoundingClientRect(),l=document.documentElement.style;l.setProperty("--tb-hdr-h",`${Math.round(r.height)}px`),l.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(r.bottom))}px`)},o=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),typeof ResizeObserver=="function"&&new ResizeObserver(o).observe(t)},Ke=null;window.addEventListener("popstate",()=>Ke?.(location.hash,!1));var Xo=(t,e,n,o,r)=>{let l={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:r,track:dt};t.addEventListener("click",s=>{if(s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey){dt("edit_on_github_clicked");return}s.preventDefault(),ue({...l,mode:"page",trigger:n})});let u=new Map,a=Array.from(document.querySelectorAll("[data-pnum]")).filter(s=>!s.closest(".popover")&&!s.querySelector(":scope > button.tb-pedit"));a.length&&On();for(let s of a){let d=_n();d.addEventListener("click",c=>{c.stopPropagation(),$e(d,o,`Continue: edit \\xB6${s.dataset.pnum}`,()=>ue({...l,mode:"paragraph",para:s,trigger:d}))}),s.append(d),u.set(s.dataset.pnum??"",{p:s,b:d})}Ke=(s,d)=>{let c=jt.exec(s);if(!c)return;let p=c[1]?u.get(c[1]):void 0;ue(p?{...l,mode:"paragraph",para:p.p,trigger:p.b,push:d}:{...l,mode:"page",trigger:n,push:d})}},Jo=(t,e,n)=>{t.addEventListener("click",o=>{o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||(o.preventDefault(),vn({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:dt}))})},Qo=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),o=()=>t.scrollWidth>t.clientWidth+1,r=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,l=r?.querySelector(".home-link")?r:null,u=t.querySelector(".tb-hdr-label"),a=()=>!!u&&getComputedStyle(u).position!=="absolute",s=t.querySelector(".tb-hdr-where"),d=f=>!!f&&f.scrollWidth>f.clientWidth+1,c=f=>!o()&&a()===f&&!d(s)&&!Array.from(s?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(d),p=f=>{l?.classList.toggle("tb-logo-full",f),l?.classList.toggle("tb-logo-icon",!f)},b=()=>{let f=!!e&&!!n&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),f&&(e.hidden=!1,n.hidden=!0),o()&&t.classList.add("tb-hdr-icons"),o()&&(t.classList.add("tb-hdr-tight"),f&&(e.hidden=!0,n.hidden=!1));let k=a();l&&c(k)&&(p(!0),c(k)||p(!1)),We()};if(b(),window.addEventListener("resize",b),document.fonts?.ready.then(b),typeof ResizeObserver=="function"){let f=new ResizeObserver(()=>requestAnimationFrame(b));f.observe(t);let k=t.querySelector(".tb-hdr-actions");k&&f.observe(k)}return b},tr=t=>{let e=s=>t.querySelector(s),n=t.dataset.howTo??"/how-to-comment",o=window,r=e("[data-tb-contribute]"),l=e("[data-tb-more]"),u=s=>{try{s()}catch{}};u(()=>{let s=e("[data-tb-search]"),d=document.querySelector(".search .search-button");!s||!d||(s.addEventListener("click",()=>d.click()),s.hidden=!1)}),u(()=>{let s=e("[data-tb-menu]"),d=document.querySelector(".explorer"),c=d?.querySelector(".mobile-explorer");if(!s||!d||!c)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(s);let b=d.querySelector(".explorer-content");b?.id&&s.setAttribute("aria-controls",b.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let f=s.querySelector(".tb-hdr-label"),k=()=>!d.classList.contains("collapsed"),m=()=>{let x=k();s.setAttribute("aria-expanded",String(x)),s.classList.toggle("tb-closes",x),f&&(f.textContent=x?"Close menu":"Menu")};new MutationObserver(m).observe(d,{attributes:!0,attributeFilter:["class"]}),s.addEventListener("click",()=>{k()||o.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",x=>{x.key!=="Escape"||!k()||!ze()||(c.click(),s.focus())}),m(),s.hidden=!1}),u(()=>{let s=e("[data-tb-reader]"),d=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!s||!d||!c)return;let p=()=>s.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),s.addEventListener("click",()=>c.click()),d.addEventListener("click",()=>c.click()),p(),t.dataset.tbHasReader="1",s.hidden=!1});let a=()=>{dt("annotation_badge_clicked"),o.tbAnnotations.open().then(s=>{s||Nn("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};u(()=>{if(!o.tbAnnotations){let c=e("[data-tb-comment]");if(c&&window.tbCommentsComing){let p=c.querySelector(".tb-mi-t"),b=c.querySelector(".tb-mi-s");p&&(p.textContent=Vt.groupComment.title),b&&(b.textContent="Coming soon for classes"),c.setAttribute("aria-disabled","true"),c.hidden=!1}return}let s=e("[data-tb-annotate]");if(s){let c=s.querySelector(".tb-hdr-label"),p=()=>ze()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),b=()=>{let k=p();s.classList.toggle("tb-closes",k),c&&(c.textContent=k?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",b),window.addEventListener("resize",b);let f=null;s.addEventListener("pointerdown",()=>f=p(),!0),s.addEventListener("click",()=>{let k=f??p();if(f=null,k)return o.tbAnnotations.close?.();let m=document.querySelector(".explorer");m&&!m.classList.contains("collapsed")&&ze()&&m.querySelector(".mobile-explorer")?.click(),$e(s,n,"Continue: open annotations",a)}),s.querySelector(".tb-anno-count")||s.append(E("span",{class:"tb-anno-count"})),s.hidden=!1}let d=e("[data-tb-comment]");if(d){if(d.addEventListener("click",a),o.tbAnnotations.groupsOnly){let c=d.querySelector(".tb-mi-t"),p=d.querySelector(".tb-mi-s");c&&(c.textContent=Vt.groupComment.title),p&&(p.textContent="Hypothes.is account \\xB7 only your group sees it")}d.hidden=!1}}),u(()=>{let s=e("#tb-contribute-menu");if(!r||!s)return;Ue(r,s,!0,k=>$e(r,n,"Continue to Contribute",k)),e("[data-tb-explain]")?.addEventListener("click",()=>Yn(r,n));let d=e("button.tb-suggest-btn"),c=d?.dataset.endpoint,p=d&&c&&Yt?()=>Yt(c,d.dataset.path??"",r,je()):void 0,b=e("a.edit-on-github"),f=b?.dataset.editEndpoint;if(b&&f){if(Xo(b,f,r,n,p),jt.test(location.hash)){let k=location.hash,m=window.history.state?.tbEditor===!0;m||window.history.replaceState(window.history.state,"",location.pathname+location.search),Ke?.(k,!m)}}else b?.addEventListener("click",()=>dt("edit_on_github_clicked"));if(d&&p){d.addEventListener("click",()=>{let m=je();if(m)return Yt(c,d.dataset.path??"",r,m,"note");if(!document.querySelector("article [data-pnum]"))return p();Zt("Note to the authors",r,E("h2",{text:"Note to the authors"}),E("p",{text:"Select the words your note is about, then choose Note to the authors again. Or use the note button beside a paragraph."}))}),d.hidden=!1;let k=(m,x)=>Yt(c,d.dataset.path??"",x,m,"note");Do(k,n),No(k)}r.hidden=!1}),u(()=>{let s=e("[data-tb-appearance]"),d=e("#tb-appearance");!s||!d||!o.tbPrefs||(Yo(d,o.tbPrefs,o.tbAnnotations),Ue(s,d,!1),s.hidden=!1)}),u(()=>{let s=e("#tb-more-menu");if(!l||!s)return;Ue(l,s,!0),e("[data-tb-cite]")?.addEventListener("click",()=>Dn(t,l));let d=document.querySelector(".page-header h1.article-title");if(e("[data-tb-cite]")&&d&&!document.querySelector(".tb-cite-page")){let x=d.parentElement.querySelector(".content-meta")??d,R=E("button",{type:"button",class:"tb-btn tb-cite-page",text:"Cite this page"});R.addEventListener("click",()=>Dn(t,R,!0)),x.after(R)}e("[data-tb-print]")?.addEventListener("click",()=>window.print());let c=e("a.tb-history-link");c?.dataset.revisionEndpoint&&Jo(c,c.dataset.revisionEndpoint,l);let p=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");p&&(!b||!b.querySelector("a.internal")?(p.setAttribute("aria-disabled","true"),p.append(E("span",{class:"tb-mi-s",text:"No other page links here"}))):p.addEventListener("click",()=>{let x=b.querySelector("h3")??b;x.tabIndex=-1,b.scrollIntoView({block:"start"}),x.focus({preventScroll:!0})}));let f=e("[data-tb-download]"),k=Wo();if(f&&k){let x=f.querySelector(".tb-mi-t");x&&(x.textContent="Download\\u2026")}let m=()=>fetch(f.dataset.tbDownload).then(x=>x.ok?x.blob():Promise.reject(new Error(String(x.status)))).then(x=>{let R=URL.createObjectURL(x),H=E("a",{href:R,download:f.dataset.file??"page.md"});document.body.append(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(R),1e3)}).catch(()=>Nn("That didn\'t download just now. View source has the same file."));f?.addEventListener("click",()=>k?Ko(k,t,l,m):m()),l.hidden=!1}),u(()=>{Qo(t)}),u(()=>{let s=t.parentElement;Zo(s?.classList.contains("tb-header-slot")?s:t)})},er=()=>{try{Yt?.closeIfOpen(),mn(),xn();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",tr(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&$n(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",er);\n';

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
.tb-cite-page { display: inline-block; margin: 0 0 0.75rem; font-size: 0.9rem; font-weight: 400; }
@media print { .tb-header, .tb-dialog { display: none !important; } }
@media print { .tb-cite-page { display: none !important; } }
.tb-sel-comment {
  position: absolute; z-index: 30; padding: 0.3rem 0.75rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 6px;
  background: var(--tb-bg, var(--light)); color: var(--tb-ink, var(--dark)); font: inherit; font-size: 0.85rem; cursor: pointer;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
}
.tb-sel-comment[hidden] { display: none; }
.tb-sel-comment:focus-visible { outline: 2px solid var(--tb-accent, var(--secondary)); outline-offset: 2px; }
@media print { .tb-sel-comment { display: none !important; } }
`;
  Component.afterDOMLoaded = controls_inline_default;
  Component.tbHeader = true;
  return Component;
};
var EditOnGitHub_default = EditOnGitHub;

export { EditOnGitHub_default as EditOnGitHub };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map