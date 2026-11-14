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
var controls_inline_default = 'var Je=/^\\s{0,3}(```|~~~)/,Xn=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,Qn=t=>{let e=t.split(`\n`),n=[],o=0;if(e[0]?.trim()==="---"){let l=e.findIndex((u,a)=>a>0&&(u.trim()==="---"||u.trim()==="..."));l>0&&(o=l+1)}let r=0;for(;o<e.length;){let l=e[o];if(!l.trim()){o++;continue}let u=Je.exec(l);if(u||l.trim()==="$$"){let c=u?u[1]:"$$",p=o+1;for(;p<e.length&&!e[p].trim().startsWith(c);)p++;o=p+1;continue}let a=o;for(;a<e.length&&e[a].trim()&&!Je.test(e[a]);)a++;let s=e.slice(o,a).join(`\n`),d=!Xn.test(l);n.push({start:o,text:s,ordinal:d?++r:0}),o=a}return n},to=t=>Xe(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),Xe=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],eo=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let r of t)n.set(r,(n.get(r)??0)+1);let o=0;for(let r of e){let l=n.get(r)??0;l>0&&(o++,n.set(r,l-1))}return o/Math.max(t.length,e.length)};var Qe=(t,e,n)=>{let o=Xe(e);if(!o.length)return null;let r=null,l=0,u=1/0;for(let a of Qn(t)){let s=eo(to(a.text),o);if(s<.75)continue;let d=a.ordinal?Math.abs(a.ordinal-n):1e6;(s>l+.02||Math.abs(s-l)<=.02&&d<u)&&(r=a,l=Math.max(s,l),u=d)}return r};var Xt=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let o=t.length,r=e.length;for(;o>n&&r>n&&t[o-1]===e[r-1];)o--,r--;let l=t.slice(0,n).map(c=>({t:"=",v:c})),u=t.slice(o).map(c=>({t:"=",v:c})),a=t.slice(n,o),s=e.slice(n,r),d;if((a.length+1)*(s.length+1)>4e5)d=[...a.map(c=>({t:"-",v:c})),...s.map(c=>({t:"+",v:c}))];else{let c=s.length+1,p=new Uint32Array((a.length+1)*c);for(let E=a.length-1;E>=0;E--)for(let m=s.length-1;m>=0;m--)p[E*c+m]=a[E]===s[m]?p[(E+1)*c+m+1]+1:Math.max(p[(E+1)*c+m],p[E*c+m+1]);d=[];let b=0,f=0;for(;b<a.length&&f<s.length;)a[b]===s[f]?(d.push({t:"=",v:a[b]}),b++,f++):p[(b+1)*c+f]>=p[b*c+f+1]?d.push({t:"-",v:a[b++]}):d.push({t:"+",v:s[f++]});for(;b<a.length;)d.push({t:"-",v:a[b++]});for(;f<s.length;)d.push({t:"+",v:s[f++]})}return[...l,...d,...u]},Jt=t=>t.split(/(\\s+)/).filter(e=>e!==""),Qt=(t,e)=>{let n=[];for(let o of Xt(t.split(`\n`),e.split(`\n`))){let r=n[n.length-1];o.v.trim()&&(o.t==="="?r&&"same"in r?r.same.push(o.v):n.push({same:[o.v]}):r&&"ops"in r?r.ops.push(o):n.push({ops:[o]}))}return n.some(o=>"ops"in o)?n:[]},te=t=>`${t} unchanged paragraph${t===1?"":"s"}`,tn=t=>{let e=[];for(let n=0;n<t.length;){let o=[],r=[];for(;t[n]?.t==="=";)n++;for(;t[n]?.t==="-";)o.push(t[n++].v);for(;t[n]?.t==="+";)r.push(t[n++].v);let l=o.map(a=>({t:"-",words:[{v:a,changed:!0}]})),u=r.map(a=>({t:"+",words:[{v:a,changed:!0}]}));for(let a=0;a<Math.min(o.length,r.length);a++){let s=Xt(Jt(o[a]),Jt(r[a]));l[a].words=s.filter(d=>d.t!=="+").map(d=>({v:d.v,changed:d.t==="-"})),u[a].words=s.filter(d=>d.t!=="-").map(d=>({v:d.v,changed:d.t==="+"}))}for(let a of[...l,...u])a.words=a.words.reduce((s,d)=>{let c=s[s.length-1];return c&&c.changed===d.changed?c.v+=d.v:s.push({...d}),s},[]);e.push(...l,...u)}return e};var ee="Saving\\u2026 this can take up to a minute.",$e={pollMs:3e3,waitMs:18e4,runningMs:35e3},no=Math.random().toString(36).slice(2)+Date.now().toString(36);async function oo(t,e){let n=new TextEncoder().encode(`${no}\n${t}\n${e}`),o=new Uint8Array(await crypto.subtle.digest("SHA-256",n));return Array.from(o.slice(0,16),r=>r.toString(16).padStart(2,"0")).join("")}var ro=t=>new Promise(e=>setTimeout(e,t));async function ne(t,e,{signal:n,onWait:o}={}){let r=await oo(t,e),l=new URL(t);l.searchParams.set("write_key",r);let u=(b={},f)=>{let E=new URL(l);for(let[m,x]of Object.entries(b))E.searchParams.set(m,x);return fetch(E,{method:"POST",headers:{"Content-Type":"application/json"},body:e,signal:f})},a=null,s="network";try{a=await u({},n)}catch{n?.aborted&&(s="timeout")}if(a&&a.status<500&&a.status!==202)return a;if(o?.(),a&&a.status>=500&&(s=String(a.status)),!a||a.status>=500){let b=await u({fallback:s}).catch(()=>null);if(!b)throw new Error("network");if(b.status!==202)return b}let d=new URL("write-status",l);d.searchParams.set("write_key",r);let c=Date.now(),p=!1;for(;Date.now()-c<$e.waitMs;){await ro($e.pollMs);let b=await fetch(d).catch(()=>null);if(!b)continue;if(b.status!==202)return b;(await b.json().catch(()=>null))?.state==="running"&&!p&&Date.now()-c>$e.runningMs&&(p=!0,await u({fallback:"timeout"}).catch(()=>null))}return new Response(JSON.stringify({error:"timeout",userMessage:"This is taking longer than it should. Nothing you wrote is lost: try again in a few minutes."}),{status:504,headers:{"Content-Type":"application/json"}})}var Ht=t=>(Array.isArray(t)?t:[]).filter(e=>!!e&&Number.isInteger(e.number)&&typeof e.date=="string"&&typeof e.url=="string"&&/^https:\\/\\/github\\.com\\//.test(e.url)&&["edit","note","suggestion"].includes(e.kind)&&Array.isArray(e.comments)),oe=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},Ce=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},Ct=(t,e="",n={})=>{try{let o=new URL(t,"https://x.invalid"),r=new URL("history",o);r.searchParams.set("book",o.searchParams.get("book")??""),e&&r.searchParams.set("path",e);for(let[l,u]of Object.entries(n))r.searchParams.set(l,u);return t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},en=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(r=>r.toLowerCase());return e.find(r=>r.role&&r.role!=="contributor"&&n.includes(r.who.toLowerCase()))?.role??"contributor"},Lt=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",nn=(t,e)=>{let n=[],o=[...e].sort((r,l)=>l.date.localeCompare(r.date));for(let r of t){for(;o.length&&o[0].date>=r.date;)n.push({release:o.shift()});n.push({entry:r})}for(let r of o)n.push({release:r});return n},on=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),rn=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state),Tt=(t,e)=>`${t==="edit"||t==="pr"?"pr":"issue"}-${e}`,re=(t,e)=>{let n=typeof t=="string"?/^https:\\/\\/github\\.com\\/[^/]+\\/[^/]+\\/(issues|pull)\\/(\\d+)$/.exec(t):null;return n?`${e}/history#${Tt(n[1]==="pull"?"pr":"issue",Number(n[2]))}`:null},sn=t=>t.state==="open"?t.accepted?"drafts":"proposed":t.merged||t.reason==="completed"?"drafts":"declined";var Bt="tb-editor",an="tb-editor-style",Se="tb-gh-identity",Le=10,Te=500,so=7.5*60*60*1e3,ln=2e4,ao=200,_t=/^#edit(?:-(\\d+))?$/,io=t=>t?`#edit-${t}`:"#edit",dn={tbEditor:!0},lo="This page has changes waiting for review; you\\u2019re editing the latest draft.",i=(t,e={},...n)=>{let o=document.createElement(t);for(let[r,l]of Object.entries(e))l!==!1&&(r==="text"?o.textContent=String(l):r==="class"?o.className=String(l):o.setAttribute(r,l===!0?"":String(l)));for(let r of n)r&&o.append(r);return o},cn="http://www.w3.org/2000/svg",se=t=>{let e=document.createElementNS(cn,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(cn,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},pn="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",un="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",co="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",uo="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",ie=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,ao):null},po=()=>{try{let t=sessionStorage.getItem(Se);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>so?null:e}catch{return null}},Ae=t=>{try{t?sessionStorage.setItem(Se,JSON.stringify(t)):sessionStorage.removeItem(Se)}catch{}},Fe=()=>{if(document.getElementById(an))return;let t=`#${Bt}`,e=i("style",{id:an});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-same + .tb-ed-hunk, ${t} .tb-ed-hunk + .tb-ed-same { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-ed-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline;\n  min-height: 24px; min-width: 24px; } /* a 24px target at least (batch 2b) */\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},bo=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),mo="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",Me=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(mo).forEach(o=>o.remove()),e.querySelectorAll("*").forEach(o=>{for(let r of Array.from(o.attributes)){let l=r.value.trim().toLowerCase();(r.name.startsWith("on")||(r.name==="href"||r.name==="src")&&/^(javascript|data|vbscript):/.test(l))&&o.removeAttribute(r.name)}o.tagName==="A"&&(o.setAttribute("target","_blank"),o.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},ho=(t,e)=>{let n=i("div",{class:"tb-ed-diff"}),o=Qt(t,e);if(!o.length)return n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let r=(l,u)=>{let a=i("div",{class:`tb-ed-line${l==="-"?" tb-ed-del":l==="+"?" tb-ed-add":""}`}),s=i("span");return typeof u=="string"?s.textContent=u||" ":s.append(...u),a.append(i("span",{"aria-hidden":"true",text:l==="="?" ":l==="-"?"\\u2212":"+"}),s),a};for(let l of o){if("same"in l){let a=i("details",{class:"tb-ed-same"},i("summary",{text:te(l.same.length)}));a.append(...l.same.map(s=>r("=",s))),n.append(a);continue}let u=i("div",{class:"tb-ed-hunk"});for(let a of tn(l.ops))u.append(r(a.t,a.words.map(s=>s.changed?i(a.t==="-"?"del":"ins",{text:s.v}):document.createTextNode(s.v))));n.append(u)}return n},ae=null,bn=()=>ae?.(),le=t=>{if(ae)return;Fe();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,o=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),r=t.path.split("/"),l=r.pop(),u=t.para&&Number(t.para.getAttribute("data-pnum"))||0,a=t.mode,s="",d="",c="drafts",p=null,b="",f=po(),E=!1,m=!1,x=null,B=null,H=!1,g=window.scrollY,M=io(a==="paragraph"?u:0),$=i("div",{id:Bt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),S=i("span",{class:"tb-ed-pill"},se(un),i("span",{text:c})),T=i("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},se(co));T.append(i("span",{text:t.repo.split("/").pop()||t.repo}));for(let w of r)T.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{text:w}));T.append(i("span",{class:"tb-ed-sep",text:"/"}),i("span",{class:"tb-ed-file",text:l}));let N=i("span",{class:"tb-ed-muted",text:u?` \\xB7 \\xB6${u}`:""});T.append(N,S);let K=i("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),X=i("div",{class:"tb-ed-head"},T,K),Y=i("div",{class:"tb-ed-discard",role:"alert",hidden:!0},i("span",{text:"Discard your changes?"})),V=i("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),dt=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});Y.append(V,dt);let tt=i("div",{class:"tb-ed-main"}),Z=i("div",{class:"tb-ed-inner"}),ct=i("p",{class:"tb-ed-note",hidden:!0}),nt=i("p",{class:"tb-ed-note",hidden:!0,text:lo}),J=i("p",{class:"tb-ed-note tb-ed-pending",hidden:!0}),h=i("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),y=i("div",{class:"tb-ed-gate",hidden:!0});Z.append(nt,J,ct,h,y),tt.append(Z),$.append(X,Y,tt);let k=["Edit","Preview","Changes"],C=i("div",{role:"tablist","aria-label":"Editor view"}),D=k.map((w,L)=>i("button",{type:"button",role:"tab",id:`tb-ed-tab-${L}`,"aria-controls":`tb-ed-panel-${L}`,"aria-selected":L===0?"true":"false",tabindex:L===0?0:-1,text:w==="Edit"?"Edit":w==="Preview"?"Preview":"Changes"}));C.append(...D);let P=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),I=i("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),O=i("div",{class:"tb-ed-bar"},C,i("div",{class:"tb-ed-actions"},P,I)),q=i("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),Q=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),kt=i("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),ot=[i("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},Q,q,kt),i("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),i("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],St=i("div",{class:"tb-ed-box"},O,...ot),rt=i("p",{class:"tb-ed-foot"}),pt=()=>q.value,Dt=()=>b,$t=w=>{D.forEach((L,A)=>{L.setAttribute("aria-selected",A===w?"true":"false"),L.tabIndex=A===w?0:-1,ot[A].hidden=A!==w}),w===1&&Nt(),w===2&&(ot[2].textContent="",ot[2].append(ho(Dt(),pt())))};D.forEach((w,L)=>{w.addEventListener("click",()=>$t(L)),w.addEventListener("keydown",A=>{let R=A.key==="ArrowRight"?1:A.key==="ArrowLeft"?-1:0;if(!R)return;A.preventDefault();let z=(L+R+D.length)%D.length;$t(z),D[z].focus()})});let ft=0,Nt=()=>{let w=ot[1];w.textContent="",w.className="tb-ed-panel tb-ed-preview";let L=i("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});w.append(L);let A=++ft;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:bo(pt()),mode:"markdown"})}).then(R=>R.ok?R.text():Promise.reject(new Error(String(R.status)))).then(R=>{A===ft&&(w.textContent="",w.append(Me(R)))}).catch(()=>{A===ft&&(L.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};q.addEventListener("input",()=>{m=pt()!==b,I.disabled=!m});let it=i("div",{class:"tb-ed-scrim",hidden:!0}),wt=i("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});it.append(wt),$.append(it);let et=(w,L,A,R=!1)=>{A.id=w;let z=i("p",{class:"tb-ed-err",id:`${w}-err`}),W=i("label",{for:w,text:L},R?i("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:i("div",{class:"tb-ed-field"},W,A,z),control:A,err:z}},lt=et("tb-ed-msg","What did you change, and why?",i("textarea",{rows:2,maxlength:Te,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));lt.wrap.append(i("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let Ft=document.querySelector(".tb-page-controls")?.dataset.privacy,Wt=et("tb-ed-desc","Extended description",i("textarea",{rows:3,maxlength:5e3}),!0),xt=i("div",{class:"tb-ed-who"}),Kt=i("div",{class:"tb-ed-what"},se(un)),Mt=i("span");Kt.append(Mt);let F=i("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),_=i("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),U=i("form",{novalidate:!0},i("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),lt.wrap,Wt.wrap,xt,Kt,Ft?i("p",{class:"tb-ed-muted tb-ed-hint tb-ed-published"},"Your proposal is published openly on GitHub, under the book\'s licence. ",i("a",{href:Ft,text:"How contributions are handled"})):null,i("div",{class:"tb-ed-row"},F,_)),j=i("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});wt.append(U,j);let bt=()=>{if(xt.textContent="",f){let w=i("img",{src:`https://avatars.githubusercontent.com/u/${f.id}?s=56`,alt:""}),L=i("button",{type:"button",class:"tb-ed-link",text:"Sign out"});L.addEventListener("click",()=>{f=null,Ae(null),bt()}),xt.append(w,i("span",{},"Signed in as ",i("strong",{text:`@${f.login}`})," \\u2014 this edit will be credited to your GitHub account."),L)}else xt.append(st(),i("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},st=()=>{let w=i("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},se(uo),"Sign in with GitHub");return w.addEventListener("click",()=>ht(w)),w},at=()=>{y.textContent="";let w=st(),L=i("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let A=i("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});A.addEventListener("click",()=>{Vt(),t.suggest()}),L.append(A," instead: it needs no account.")}else L.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");y.append(i("h2",{text:"Sign in to edit"}),i("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),i("p",{},w),L),h.hidden=!0,y.hidden=!1,w.focus()},mt=w=>{if(w.origin!==n)return;let L=w.data;if(!(!L||L.type!=="tb-github-identity")){if(x=null,L.error||typeof L.token!="string"||typeof L.login!="string"){t.track("github_signin",{outcome:L.error==="denied"?"cancelled":"error"});return}if(f={token:L.token,login:L.login,id:Number(L.id)||0,name:L.name??"",at:Date.now()},Ae(f),t.track("github_signin",{outcome:"success"}),!H)return Ze();bt(),it.hidden||lt.control.focus()}},ht=w=>{let L=`${o}?origin=${encodeURIComponent(location.origin)}`;x=window.open(L,"tb-github-signin","popup,width=560,height=720"),!x&&!w.parentElement?.querySelector(".tb-ed-err")&&w.after(i("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",mt);let vt=(w,L)=>{w.control.setAttribute("aria-invalid","true"),w.control.setAttribute("aria-describedby",w.err.id),w.err.textContent=L},We=w=>{w.control.removeAttribute("aria-invalid"),w.control.removeAttribute("aria-describedby"),w.err.textContent=""};lt.control.addEventListener("input",()=>We(lt));let Yn=()=>{Mt.textContent="",Mt.append("This creates a new branch and opens a proposal to merge it into ",i("code",{text:c}),". Nothing changes in the book until an editor accepts it."),bt(),U.hidden=!1,j.hidden=!0,it.hidden=!1,lt.control.focus()},Ee=()=>{it.hidden=!0,I.focus()};I.addEventListener("click",Yn),F.addEventListener("click",Ee),it.addEventListener("mousedown",w=>{w.target===it&&!E&&Ee()});let ke=(w,L,A,R)=>{if(!$.isConnected)return;j.textContent="",j.append(i("h2",{text:w}),i("p",{text:L}));let z=re(A?.href,location.origin);z&&j.append(i("p",{class:"tb-ed-follow"},"Follow your suggestion: ",i("a",{href:z,text:z}))),A&&j.append(i("p",{},i("a",{href:A.href,target:"_blank",rel:"noopener",text:A.text})));let W=i("button",{type:"button",class:`tb-ed-btn${R?" tb-ed-primary":""}`,text:R?"Back to my edit":"Close"});W.addEventListener("click",R?()=>{j.hidden=!0,U.hidden=!1,_.focus()}:()=>Yt(!0)),j.append(i("div",{class:"tb-ed-row"},W)),U.hidden=!0,j.hidden=!1,j.focus()};U.addEventListener("submit",w=>{if(w.preventDefault(),E)return;let L=null;We(lt);let A=lt.control.value.trim().length;if(A<Le||A>Te?(vt(lt,A<Le?`Please say what you changed and why, in at least ${Le} characters.`:`Please keep it under ${Te} characters.`),L=lt.control):f||(L=xt.querySelector("button")),L){L.focus();return}let R={mode:a,path:t.path,baseSha:d,title:a==="paragraph"&&u?`Edit \\xB6${u} of ${l}`:`Update ${l}`,summary:lt.control.value.trim().replace(/\\s+/g," "),description:Wt.control.value.trim()};a==="page"?R.content=pt():(R.startLine=p.start,R.original=p.text,R.replacement=pt(),u&&(R.paragraph=u)),R.identity=f.token,E=!0,_.disabled=!0,_.textContent="Proposing\\u2026";let z=B=new AbortController,W=setTimeout(()=>z.abort(),ln);ne(t.endpoint,JSON.stringify(R),{signal:z.signal,onWait:()=>{clearTimeout(W),_.textContent=ee}}).then(async G=>{let Zt=null;try{Zt=await G.json()}catch{Zt=null}if(G.status===401&&f&&(f=null,Ae(null),bt()),!G.ok)throw Object.assign(new Error(String(G.status)),{userMessage:ie(Zt)});return Zt}).then(G=>{m=!1,G.fallback&&typeof G.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:a}),ke("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:G.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:a}),ke("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof G.prUrl=="string"?{href:G.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(G=>{t.track("page_edit_submitted",{outcome:"error",mode:a}),ke("That did not go through",G&&G.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(W),B===z&&(B=null),E=!1,_.disabled=!1,_.textContent="Propose changes"})});let Vn=w=>Array.from(w.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(L=>!L.disabled&&L.tabIndex>=0&&!L.closest("[hidden]")),Ke=w=>{if(w.key==="Escape"){w.preventDefault(),it.hidden?Ot():E||(!j.hidden&&U.hidden&&!m?Yt(!0):Ee());return}if(w.key!=="Tab")return;let L=it.hidden?$:wt,A=Vn(L);if(!A.length){w.preventDefault(),L.focus();return}let R=A.indexOf(document.activeElement);(w.shiftKey?R<=0:R===-1||R===A.length-1)&&(w.preventDefault(),A[w.shiftKey?A.length-1:0].focus())},Ye=w=>{m&&(w.preventDefault(),w.returnValue="")},Yt=(w=!1)=>{if(!w&&m)return Ot();m=!1,_t.test(location.hash)?history.back():Vt()},Ve=()=>{if(!_t.test(location.hash)){if(m)return history.pushState(dn,"",M),Ot();Vt()}},Vt=()=>{ae=null,B?.abort(),x?.close(),document.removeEventListener("keydown",Ke,!0),window.removeEventListener("message",mt),window.removeEventListener("beforeunload",Ye),window.removeEventListener("popstate",Ve),$.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,g)},Ot=()=>{if(!m)return Yt(!0);Y.hidden=!1,dt.focus()};V.addEventListener("click",()=>Yt(!0)),dt.addEventListener("click",()=>{Y.hidden=!0,q.focus()}),K.addEventListener("click",Ot),P.addEventListener("click",Ot),document.addEventListener("keydown",Ke,!0),window.addEventListener("beforeunload",Ye),window.addEventListener("popstate",Ve),ae=Vt,t.push!==!1&&history.pushState(dn,"",M),document.body.style.overflow="hidden",document.body.append($),K.focus(),t.track("page_editor_opened",{mode:a});let Zn=w=>{h.textContent="",h.removeAttribute("class"),h.append(w+" ",i("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},Ze=()=>{if(!f)return at();H=!0,y.hidden=!0,h.hidden=!1;let w=new AbortController,L=setTimeout(()=>w.abort(),ln);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:w.signal}).then(async A=>{let R=null;try{R=await A.json()}catch{R=null}if(!A.ok)throw Object.assign(new Error(String(A.status)),{userMessage:ie(R)});return R}).then(A=>{if($.isConnected){if(typeof A?.content!="string"||typeof A.sha!="string")throw new Error("bad source");if(s=A.content,d=A.sha,c=typeof A.branch=="string"?A.branch:c,S.lastChild.textContent=c,nt.hidden=!t.builtBlob||t.builtBlob===d,a==="paragraph"&&(p=t.para?Qe(s,t.para.textContent??"",u):null,p||(a="page",N.textContent="",ct.textContent=`We couldn\\u2019t find \\xB6${u} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,ct.hidden=!1)),a==="paragraph"&&p){St.classList.add("tb-ed-para");let R=s.split(`\n`),z=p.text.split(`\n`).length,W=R.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),G=R.slice(p.start+z,p.start+z+3).join(`\n`).trim();Q.textContent=W.length>220?`\\u2026${W.slice(-220)}`:W,kt.textContent=G.length>220?`${G.slice(0,220)}\\u2026`:G,Q.hidden=!W,kt.hidden=!G,b=p.text,rt.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in.",Jn(p.text)}else b=s,rt.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";q.value=b,h.remove(),Z.append(St,rt),q.setSelectionRange(0,0),q.focus()}}).catch(A=>{$.isConnected&&Zn(A&&A.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(L))},Jn=async w=>{try{let A=await(await fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}&pending=1`)).json(),R=await go(w),z=(A.pending??[]).filter(W=>typeof W.url=="string"&&/^https:\\/\\/github\\.com\\//.test(W.url)&&(W.original?W.original===R:W.paragraph===u));if(!z.length||!$.isConnected)return;J.replaceChildren(`${z.length} pending change${z.length===1?"":"s"} on this paragraph \\xB7 `,...z.flatMap((W,G)=>[...G?[", "]:[],i("a",{href:W.url,target:"_blank",rel:"noopener",text:z.length===1?"view it":`view ${G+1}`})])),J.hidden=!1}catch{}};Ze()};async function go(t){let e=new TextEncoder().encode(t.replace(/\\r\\n/g,`\n`).trim()),n=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("").slice(0,16)}var At=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},de=(t,e)=>Jt(t).map(n=>({v:n,s:{...e}})),Rt=(t,e={})=>{let n=[],o={...e},r="",l=()=>{r&&n.push(...de(r,o)),r=""},u=a=>!!a&&/[\\p{L}\\p{N}]/u.test(a);for(let a=0;a<t.length;){let s=t.slice(a),d;if(s[0]==="\\\\"&&s.length>1)r+=s[1],a+=2;else if(d=/^`([^`]+)`/.exec(s))l(),n.push(...de(d[1],{...o,code:!0})),a+=d[0].length;else if(d=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(s)){l();let c=d[2]??d[1].split("/").pop()??d[1];n.push(...de(c,{...o,link:!0})),a+=d[0].length}else if(d=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(s))l(),n.push(...de(`(image${d[1]?`: ${d[1]}`:""})`,{...o,i:!0})),a+=d[0].length;else if(d=/^\\[\\^([^\\]]+)\\]/.exec(s))l(),n.push({v:d[1],s:{...o,sup:!0}}),a+=d[0].length;else if(d=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(s))l(),n.push(...Rt(d[1],{...o,link:!0})),a+=d[0].length;else if(d=/^<\\/?[a-zA-Z][^>]*>/.exec(s))l(),a+=d[0].length;else if(s.startsWith("**")||s.startsWith("__")){let c=s.slice(0,2);o.b||t.indexOf(c,a+2)>a+2?(l(),o.b=!o.b):r+=c,a+=2}else(s[0]==="*"||s[0]==="_")&&!(s[0]==="_"&&u(t[a-1])&&u(t[a+1]))?(o.i||t.indexOf(s[0],a+1)>a+1?(l(),o.i=!o.i):r+=s[0],a+=1):(r+=s[0],a+=1)}return l(),n},ce=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:Rt(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:Rt(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:Rt(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:Rt(e[2])}:{kind:"p",runs:Rt(t)}:{kind:"blank",runs:[]}},mn=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=i("code",{},e)),t.s.i&&(e=i("em",{},e)),t.s.b&&(e=i("strong",{},e)),t.s.link&&(e=i("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=i("sup",{},e)),e},ue=(t,e,n)=>{let o=`tb-rd-line tb-rd-${e.kind}${t==="-"?" tb-ed-del":t==="+"?" tb-ed-add":""}`,r=i("span",{class:"tb-rd-sign","aria-hidden":"true",text:t==="-"?"\\u2212":t==="+"?"+":""}),l=i("div",{class:"tb-rd-text"});e.marker&&l.append(i("span",{class:"tb-rd-marker",text:e.marker}));let u=null;for(let{run:a,changed:s}of n)s&&t!=="="?(u||(u=i(t==="-"?"del":"ins"),l.append(u)),u.append(mn(a))):(u=null,l.append(mn(a)));return i("div",{class:o},r,l)},pe=(t,e)=>t.map(n=>({run:n,changed:e})),Pt=(t,e)=>{let n=i("div",{class:"tb-ed-diff tb-rd"}),o=At(t),r=At(e),l=Qt(o,r);if(!l.length)return n.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:o!==r||t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n;for(let u of l){if("same"in u){let s=i("details",{class:"tb-rd-same"},i("summary",{text:te(u.same.length)}));for(let d of u.same){let c=ce(d);s.append(ue("=",c,pe(c.runs,!1)))}n.append(s);continue}let a=u.ops;for(let s=0;s<a.length;){let d=a[s];if(d.t==="="){let m=ce(d.v);n.append(ue("=",m,pe(m.runs,!1))),s++;continue}let c=[],p=[];for(;a[s]?.t==="-";)c.push(ce(a[s++].v));for(;a[s]?.t==="+";)p.push(ce(a[s++].v));let b=Math.min(c.length,p.length),f=c.map(m=>pe(m.runs,!0)),E=p.map(m=>pe(m.runs,!0));for(let m=0;m<b;m++){let x=c[m].runs,B=p[m].runs,H=Xt(x.map(T=>T.v),B.map(T=>T.v)),g=0,M=0,$=[],S=[];for(let T of H)T.t!=="+"&&$.push({run:x[g++],changed:T.t==="-"}),T.t!=="-"&&S.push({run:B[M++],changed:T.t==="+"});f[m]=$,E[m]=S}c.forEach((m,x)=>n.append(ue("-",m,f[x]))),p.forEach((m,x)=>n.append(ue("+",m,E[x])))}}return n};var fo="No reason was recorded.",qt=t=>t.kind==="edit"?"Declined proposed edit":t.kind==="note"?t.paragraph?`Declined note on \\xB6${t.paragraph}`:"Declined note":"Declined suggestion",He=t=>{let e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"}):t},yo=async(t,e)=>{let n=await fetch(t,{signal:e,credentials:"omit"}),o=await n.json().catch(()=>null);if(!n.ok)throw Object.assign(new Error(`HTTP ${n.status}`),{userMessage:o?.userMessage});return o},be=(t,e)=>{let n=i("div",{class:"tb-dc"});n.append(i("div",{class:"tb-dc-who",text:`Proposed by ${t.who?.name??"a reader"} on ${He(t.proposed)}. Declined${t.decliner?` by ${t.decliner}`:""} on ${He(t.date)}.`}),i("blockquote",{class:`tb-dc-reason${t.reason?"":" tb-dc-none"}`},i("span",{class:"tb-dc-label",text:"Why it was declined: "}),t.reason??fo));let o=i("div",{class:"tb-hi-actions tb-dc-actions"}),r=i("div",{class:"tb-hi-diff tb-dc-diff",hidden:!0});if(t.kind==="edit"&&e){let l=i("button",{type:"button","aria-pressed":"false",text:"Show changes"});l.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0,l.setAttribute("aria-pressed","false");return}l.setAttribute("aria-pressed","true"),r.hidden=!1,r.textContent="",r.append(i("p",{class:"tb-ed-muted",role:"status",text:"Loading what was proposed\\u2026"}));let u=new AbortController,a=setTimeout(()=>u.abort(),2e4);yo(Ct(e,"",{change:String(t.number)}),u.signal).then(s=>{let d=s?.files??[];r.textContent="",d.length||r.append(i("p",{class:"tb-ed-muted",text:"The proposal changed no page."}));for(let c of d)r.append(Pt(typeof c.before=="string"?c.before:"",typeof c.after=="string"?c.after:""))}).catch(s=>{r.textContent="",r.append(i("p",{class:"tb-ed-note",role:"alert",text:s?.userMessage||"What was proposed couldn\\u2019t be loaded just now."}))}).finally(()=>clearTimeout(a))}),o.append(l)}if(o.append(i("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",text:`See #${t.number} on GitHub \\u2197`})),n.append(o,r),t.comments.length){let l=i("ol",{class:"tb-dc-comments","aria-label":"Comments from the book\'s people"});for(let u of t.comments)l.append(i("li",{class:"tb-dc-comment"},i("div",{class:"tb-dc-cmeta",text:`${u.name} \\xB7 ${He(u.date)}`}),i("p",{class:"tb-dc-ctext",text:u.text})));n.append(i("div",{class:"tb-dc-chead",text:"Comments from the book\\u2019s people"}),l)}return n},me=t=>`\n${t} .tb-dc { margin-top: 0.4rem; }\n${t} .tb-dc p, ${t} .tb-dc-who, ${t} .tb-dc-cmeta { margin: 0.15rem 0; overflow-wrap: anywhere; }\n${t} .tb-dc-who, ${t} .tb-dc-cmeta, ${t} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }\n${t} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }\n${t} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }\n${t} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }\n${t} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-dc-ctext { white-space: pre-line; }\n${t} .tb-hi-state.tb-hi-declined, ${t} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }\n`;var hn={author:"Author",editor:"Editor",contributor:"Contributor"},he=t=>{if(!t||!(t in hn))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=hn[t],e};var gn="tb-history-style",wo=30,fn=2e4,yn="a reader",Be=t=>`\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n${t} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }\n${t} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-rd-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n`,xo=()=>{if(document.getElementById(gn))return;let t=`#${Bt}.tb-hi`,e=i("style",{id:gn});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n${Be(t)}\n${me(t)}\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},vo=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),o=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return o?`Paragraph ${o[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},yt=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},gt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),o=null;try{o=await n.json()}catch{}if(!n.ok){let r=new Error(`HTTP ${n.status}`);throw r.userMessage=ie(o),r}return o},ge=null,wn=()=>ge?.(),xn=t=>{if(ge||document.getElementById(Bt))return;Fe(),xo();let e=document.body.style.overflow,n=null,o=0,r=i("div",{id:Bt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),l=i("div",{class:"tb-hi-where",id:"tb-hi-title"},i("span",{class:"tb-hi-name",text:"Page history"}),t.title?i("span",{class:"tb-hi-page",text:t.title}):null),u=i("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},i("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),i("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),a=i("div",{class:"tb-ed-main"}),s=i("div",{class:"tb-ed-inner"});a.append(s),r.append(i("div",{class:"tb-hi-top"},l,u),a);let d=h=>i("p",{class:"tb-ed-muted",role:"status",text:h}),c=(h,y)=>{let k=i("div",{class:"tb-ed-note",role:"alert"});return k.append(i("span",{text:`${h?.userMessage||y} `}),i("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),k},p=()=>{n?.abort();let h=new AbortController;n=h;let y=setTimeout(()=>h.abort(),fn);return{signal:h.signal,done:()=>clearTimeout(y),current:()=>n===h}},b=null,f=[],E=[],m=[],x=null,B=h=>{let y=new URL(t.endpoint,location.href);for(let[k,C]of Object.entries(h))y.searchParams.set(k,C);return y.toString()},H=h=>h.path??b?.source??t.path,g=()=>b?.published[0]??null,M=(h,y)=>{let k=i("p",{class:"tb-hi-meta"});y&&k.append(i("span",{class:"tb-hi-state",text:y})),k.append(`${yt(h.date)}${h.who?` \\xB7 ${h.who}`:""}`);let C=he(h.role);return C&&k.append(" ",C),h.pr&&t.githubHref&&k.append(" \\xB7 ",i("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${h.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${h.pr}`})),k},$=(h,y,k)=>{if(!y.hidden){y.hidden=!0,k.setAttribute("aria-pressed","false");return}k.setAttribute("aria-pressed","true"),y.hidden=!1,y.textContent="",y.append(d("Loading what changed\\u2026")),t.track("page_revision_opened");let C=new AbortController,D=setTimeout(()=>C.abort(),fn);gt(B({sha:h.sha,path:H(h)}),C.signal).then(P=>{let I=P,O=typeof I.before=="string"?I.before:"",q=typeof I.after=="string"?I.after:"";y.textContent="",I.status==="added"&&y.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let Q=typeof I.previousPath=="string"&&I.previousPath!==H(h);Q&&y.append(i("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${At(O)===At(q)?"; its text didn\\u2019t change.":"."}`})),(!Q||At(O)!==At(q))&&y.append(Pt(O,q))}).catch(P=>{y.textContent="",y.append(c(P,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(D))},S=(h,y)=>{o=a.scrollTop,s.textContent="";let k=i("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});k.addEventListener("click",()=>{n?.abort(),V()});let C=i("div",{});return s.append(k,i("div",{class:"tb-hi-banner",role:"status",text:y}),i("div",{class:"tb-hi-head"},i("h2",{text:h})),C),a.scrollTop=0,k.focus(),C},T=h=>{let y=S(h.summary,`You are reading the version of ${yt(h.date)}.`);y.append(d("Loading this version\\u2026")),t.track("page_version_read");let k=p();gt(B({sha:h.sha,path:H(h)}),k.signal).then(C=>{if(!k.current())return;let D=C.html;y.textContent="",y.append(typeof D=="string"&&D?i("div",{class:"tb-ed-panel tb-ed-preview"},Me(D)):i("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch(C=>{k.current()&&(y.textContent="",y.append(c(C,"This version couldn\\u2019t be loaded just now.")))}).finally(k.done)},N=(h,y)=>{let[k,C]=h.date<=y.date?[h,y]:[y,h],D=O=>`the version of ${yt(O.date)}${O===g()?" (the one you read now)":""}`,P=S("Compare versions",`Changes from ${D(k)} to ${D(C)}.`);P.append(d("Loading the two versions\\u2026")),t.track("page_versions_compared");let I=p();gt(B({sha:C.sha,base:k.sha,path:H(C)}),I.signal).then(O=>{if(!I.current())return;let q=O;P.textContent="",P.append(i("div",{class:"tb-hi-diff"},Pt(typeof q.before=="string"?q.before:"",typeof q.after=="string"?q.after:"")))}).catch(O=>{I.current()&&(P.textContent="",P.append(c(O,"The versions couldn\\u2019t be compared just now.")))}).finally(I.done)},K=(h,y)=>{let k=i("li",{class:"tb-hi-entry"}),C=i("div",{class:"tb-hi-diff",hidden:!0}),D=i("button",{type:"button","aria-pressed":"false",text:"Show changes"});D.addEventListener("click",()=>$(h,C,D));let P=i("button",{type:"button",text:"Read this version"});P.addEventListener("click",()=>T(h));let I=i("button",{type:"button",text:x?x===h?"Cancel compare":"Compare with this":"Compare\\u2026"});I.addEventListener("click",()=>{if(!x)x=h,V();else if(x===h)x=null,V();else{let Q=x;x=null,N(Q,h)}});let O=i("div",{class:"tb-hi-actions"},D,P,I),q=g();if(!x&&q&&q.sha!==h.sha){let Q=i("button",{type:"button",text:"Compare with now"});Q.addEventListener("click",()=>N(h,q)),O.append(Q)}return k.append(i("p",{class:"tb-hi-msg",text:h.summary}),M(h,y),O,C),k},X=h=>{let y=i("li",{class:"tb-hi-entry"});return y.append(i("p",{class:"tb-hi-msg",text:h.summary||Lt(h)}),M({date:h.date,who:h.who?.name??"A reader",role:en(h,[...b?.published??[],...b?.drafts??[]])},`Proposed \\xB7 ${Lt(h)}`),i("div",{class:"tb-hi-actions"},i("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",text:`See #${h.number} on GitHub \\u2197`}))),y},Y=h=>i("li",{class:"tb-hi-entry tb-hi-declined-entry"},i("p",{class:"tb-hi-msg",text:h.summary||qt(h)}),i("p",{class:"tb-hi-meta"},i("span",{class:"tb-hi-state tb-hi-declined",text:"Declined"}),`${qt(h).replace(/^Declined /,"")} \\xB7 ${yt(h.date)}`),be(h,t.endpoint)),V=()=>{if(s.textContent="",!b)return;if(x&&s.append(i("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${yt(x.date)}: pick the other version, below.`})),E.length||b.drafts.length){let k=i("ol",{class:"tb-hi-list"});for(let C of E)k.append(X(C));for(let C of b.drafts)k.append(K(C,"Being edited"));s.append(i("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},i("h2",{id:"tb-hi-editing",text:"Being edited"}),i("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),k))}let h=i("ol",{class:"tb-hi-list"}),y=[...m].sort((k,C)=>C.date.localeCompare(k.date));for(let k of nn(b.published,f)){let C="release"in k?k.release.date:k.entry.date;for(;y.length&&y[0].date>C;)h.append(Y(y.shift()));"release"in k?h.append(i("li",{class:"tb-hi-release",role:"separator","aria-label":`${Ce(k.release.tag)}, ${yt(k.release.date)}`,text:`${Ce(k.release.tag)} \\xB7 ${yt(k.release.date)}`})):h.append(K(k.entry,void 0))}for(let k of y)h.append(Y(k));s.append(i("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},i("h2",{id:"tb-hi-published",text:m.length?"Published and declined":"Published"}),i("p",{text:b.published.length?m.length?"What readers have seen, and what the authors declined and why, newest first.":"What readers have seen, newest first.":m.length?"This page has no published versions yet. What the authors declined, and why:":"This page has no published versions yet."}),h)),a.scrollTop=o},dt=h=>{if(h.key==="Escape"){h.preventDefault(),tt();return}if(h.key!=="Tab")return;let y=Array.from(r.querySelectorAll("a[href], button, [tabindex]")).filter(C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]"));if(!y.length)return;let k=y.indexOf(document.activeElement);(h.shiftKey?k<=0:k===-1||k===y.length-1)&&(h.preventDefault(),y[h.shiftKey?y.length-1:0].focus())},tt=()=>{ge=null,n?.abort(),document.removeEventListener("keydown",dt,!0),r.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};u.addEventListener("click",tt),document.addEventListener("keydown",dt,!0),ge=tt,document.body.style.overflow="hidden",document.body.append(r),u.focus(),t.track("page_history_opened"),s.append(d("Loading this page\\u2019s history\\u2026"));let Z=p(),ct=t.bookHistoryUrl?gt(t.bookHistoryUrl,Z.signal).then(h=>{let y=oe(h),k=y?.pages.find(C=>C.source===t.path)??null;return y&&(f=y.releases),y&&!m.length&&(m=Ht(y.declined).filter(C=>C.files?.includes(t.path))),k}):Promise.resolve(null),nt=Ct(t.endpoint,t.path,{declined:"1"}),J=nt?gt(nt,Z.signal).then(h=>(m=Ht(h?.declined),(h?.items??[]).filter(y=>y&&typeof y.url=="string"))).catch(()=>[]):Promise.resolve([]);ct.catch(()=>null).then(async h=>{if(h)return h;let y=await gt(t.listUrl,Z.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(y)?y:[]).map((k,C,D)=>({sha:k.sha,date:k.date,who:k.who,role:null,summary:vo(k.message??"",C===D.length-1),...k.path!==t.path?{path:k.path}:{}})),drafts:[],releases:{}}}).then(async h=>{b=h;let y=[...h.published,...h.drafts],k=[...new Set(y.filter(I=>I.who===yn).map(I=>I.sha))].slice(0,wo),C=k.length?gt(B({shas:k.join(",")}),Z.signal).then(I=>I?.names??{}).catch(()=>({})):Promise.resolve({}),[D,P]=await Promise.all([C,J]);for(let I of y){let O=D[I.sha];I.who===yn&&typeof O=="string"&&O.trim()&&(I.who=O.trim().slice(0,80))}E=P,Z.current()&&V()}).catch(h=>{Z.current()&&(s.textContent="",s.append(c(h,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(Z.done)};var It="http://www.w3.org/2000/svg",vn={proposed:"Proposed",drafts:"Being edited",published:"Published",declined:"Declined"},En="tb-bh-style",Eo=(t,e)=>{let n=o=>{let r=o?.querySelector("title")?.textContent;if(r){for(let l of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))l.removeAttribute("aria-current");o.setAttribute("aria-current","true"),e.textContent=r}};t.addEventListener("click",o=>n(o.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",o=>n(o.target.closest(".tb-swim-dot")))},ko=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),o=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!o)return;let[r,l]=n.map(a=>({t:Date.parse(a.textContent??""),x:Number(a.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let u=Number(o.getAttribute("y"))+Number(o.getAttribute("height"))/2;for(let a of e){let s=Math.min(Math.max(Date.parse(a.date),r.t),l.t),d=document.createElementNS(It,"circle");d.setAttribute("class","tb-swim-dot"),d.setAttribute("data-lane","0"),d.setAttribute("cx",(r.x+(s-r.t)/(l.t-r.t)*(l.x-r.x)).toFixed(1)),d.setAttribute("cy",String(u)),d.setAttribute("r","5"),d.setAttribute("tabindex","0");let c=document.createElementNS(It,"title");c.textContent=`${a.date} \\xB7 ${Lt(a)}: ${a.summary} (${a.who?.name??"a reader"})`,d.append(c),t.append(d)}},$o=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),o=t.querySelector(\'.tb-swim-lane[data-lane="3"]\');if(n.length<2||!o)return;let[r,l]=n.map(s=>({t:Date.parse(s.textContent??""),x:Number(s.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(l.t)||l.t<=r.t)return;let u=Number(o.getAttribute("y"))+Number(o.getAttribute("height"))/2,a=new Set(Array.from(t.querySelectorAll(".tb-swim-declined")).map(s=>s.getAttribute("data-number")));for(let s of e){if(a.has(String(s.number)))continue;let d=r.x+(Math.min(Math.max(Date.parse(s.date),r.t),l.t)-r.t)/(l.t-r.t)*(l.x-r.x),c=document.createElementNS(It,"g");for(let[E,m]of Object.entries({class:"tb-swim-dot tb-swim-declined","data-lane":"3","data-number":String(s.number),tabindex:"0",fill:"none",stroke:"currentColor","stroke-width":"1.5"}))c.setAttribute(E,m);let p=document.createElementNS(It,"title");p.textContent=`${s.date} \\xB7 declined: ${s.summary} (${s.who?.name??"a reader"})`;let b=document.createElementNS(It,"circle");b.setAttribute("cx",d.toFixed(1)),b.setAttribute("cy",String(u)),b.setAttribute("r","5");let f=document.createElementNS(It,"path");f.setAttribute("d",`M${(d-3).toFixed(1)} ${u-3}L${(d+3).toFixed(1)} ${u+3}M${(d+3).toFixed(1)} ${u-3}L${(d-3).toFixed(1)} ${u+3}`),c.append(p,b,f),t.append(c)}},Re=(t,e,n,o)=>{let r=i("select",{class:"tb-bh-select"});r.append(i("option",{value:"",text:"Any"}));for(let[l,u]of n)r.append(i("option",{value:l,text:u}));return r.addEventListener("change",()=>o(e,r.value)),i("label",{class:"tb-bh-filter"},i("span",{text:t}),r)},kn=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let o=document.querySelector("svg.tb-swimlane");if(o){let g=i("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});o.closest("figure")?.append(g),Eo(o,g)}let r=new AbortController;setTimeout(()=>r.abort(),2e4);let l=oe(await gt(e,r.signal).catch(()=>null));if(!l)return;let u=n?Ct(n):"";document.getElementById(En)||document.head.append(i("style",{id:En,text:Be(".tb-bh-list")+me(".tb-bh-list")}));let a=Ht(l.declined),s=u?await gt(Ct(n,"",{declined:"1"}),r.signal).then(g=>{let M=g?.declined;return Array.isArray(M)&&(a=Ht(M)),(g?.items??[]).filter($=>$&&typeof $.url=="string")}).catch(()=>[]):[];o&&(ko(o,s),$o(o,a));let d=new Map(l.pages.map(g=>[g.source,g])),c=[...s.map(g=>{let M=g.files?.map($=>d.get($)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||Lt(g),state:"proposed",page:M?.source??"",pageTitle:M?.title??"",href:g.url,ref:`#${g.number}`,anchor:Tt(g.kind,g.number)}}),...a.map(g=>{let M=g.files?.map($=>d.get($)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||qt(g),state:"declined",page:M?.source??"",pageTitle:M?.title??"",href:g.url,ref:`#${g.number}`,anchor:Tt(g.kind,g.number),declined:g}}),...on(l).map(g=>({date:g.date,who:g.who,role:g.role,summary:g.summary,state:g.state,page:g.page.source,pageTitle:g.page.title,href:g.page.path,ref:g.pr?`#${g.pr}`:"",anchor:g.pr?Tt("pr",g.pr):g.issue?Tt("issue",g.issue):""}))].sort((g,M)=>M.date.localeCompare(g.date)),p={page:"",person:"",state:""},b=i("ol",{class:"tb-bh-list"}),f=i("p",{class:"tb-bh-count",role:"status"}),E=()=>{b.textContent="";let g=c.filter($=>rn(p,$));f.textContent=`${g.length} change${g.length===1?"":"s"}`;let M=new Set;for(let $ of g){let S=i("p",{class:"tb-bh-meta"},i("span",{class:`tb-bh-state tb-bh-${$.state}`,text:vn[$.state]}),` ${yt($.date)}${$.who?` \\xB7 ${$.who}`:""}`),T=$.anchor&&!M.has($.anchor)?$.anchor:!1;T&&M.add(T);let N=he($.role);N&&S.append(" ",N),$.state==="proposed"&&S.append(" \\xB7 ",i("a",{href:$.href,target:"_blank",rel:"noopener noreferrer",text:`${$.ref} on GitHub \\u2197`})),b.append(i("li",{class:"tb-bh-item",id:T,tabindex:T?"-1":!1},i("p",{class:"tb-bh-summary",text:$.summary}),$.pageTitle?i("p",{class:"tb-bh-page"},$.state==="proposed"||$.state==="declined"?$.pageTitle:i("a",{href:$.href,text:$.pageTitle})):null,S,$.note?i("p",{class:"tb-bh-note",text:$.note}):null,$.declined?be($.declined,n):null))}},m=(g,M)=>{Object.assign(p,{[g]:M}),E()},x=[...new Set(c.map(g=>g.who).filter(Boolean))].sort((g,M)=>g.localeCompare(M)),B=l.pages.filter(g=>g.published.length||g.drafts.length).map(g=>[g.source,g.title]);t.append(i("h2",{text:"All changes"}),i("div",{class:"tb-bh-filters"},Re("Chapter","page",B,m),Re("Person","person",x.map(g=>[g,g]),m),Re("State","state",Object.entries(vn),m)),f,b),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),E();let H=async()=>{let g=/^#((?:issue|pr)-(\\d+))$/.exec(location.hash);if(!g)return;let M=g[1];if(!document.getElementById(M)&&n){let S=new URL(n,location.href);S.searchParams.set("mode","item"),S.searchParams.set("number",g[2]);let T=await gt(S.toString(),AbortSignal.timeout(15e3)).catch(()=>null);if(T&&T.number===Number(g[2])&&Tt(T.kind,T.number)===M){let N=sn(T),K=T.files?.map(X=>d.get(X)).find(Boolean);c.unshift({date:String((N==="proposed"?T.created:T.closed)??T.created).slice(0,10),who:T.who?.name??"A reader",role:"contributor",summary:T.summary||Lt(T),state:N,page:K?.source??"",pageTitle:K?.title??"",href:N==="drafts"&&K?K.path:T.url,ref:`#${T.number}`,anchor:M,note:N==="drafts"?"The authors accepted this. It shows as Published once the book is next published.":N==="declined"?"The authors declined this.":void 0}),Object.assign(p,{page:"",person:"",state:""});for(let X of Array.from(t.querySelectorAll(".tb-bh-select")))X.value="";E()}}let $=document.getElementById(M);$&&($.scrollIntoView({block:"start"}),$.focus({preventScroll:!0}))};window.addEventListener("hashchange",()=>{H()}),H()};var Cn={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},Ln=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),Co=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(o=>`${o.charAt(0).toUpperCase()}.`).join(" ")}`},Lo=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,$n=t=>/[.?!]$/.test(t)?t:`${t}.`,Tn=t=>{let e=Lo(Ln(t.authors).map(Co)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),o=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=[],l=o?[{text:`${$n(o)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)r.push({text:`${$n(e)} (n.d.). `},...l);else if(l.length){let[u,...a]=l;r.push({...u,text:u.text.replace(/ $/,"")},{text:" (n.d.). "},...a)}else r.push({text:"(n.d.). "});return r.push({text:`Retrieved ${n}, from ${t.url}`}),r},De=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=Cn[t.licence],o=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&o.push({text:` by ${Ln(t.authors).join(", ")}`}),e&&t.bookTitle&&o.push({text:", from "},{text:t.bookTitle,italic:!0}),o.push({text:`, ${t.url}`}),n?o.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&o.push({text:`, is licensed under ${t.licence}`}),o.push({text:"."}),o},Ne=t=>t.map(e=>e.text).join(""),Oe=t=>Cn[t]?.name??t,fe=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],An=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},To=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function Sn(t,e,n,o=0){let r=e!=="book"&&t.chapter&&t.styles.chapter,l=r?t.chapter:t.book,u=r?t.styles.chapter:t.styles.book,a=e==="paragraph"&&r?o:0,s=a?`${l.URL}#p${a}`:l.URL,d=To(n),c={};for(let[b]of fe)c[b]=(u[b]??[]).map(f=>({...f,text:f.text.replaceAll("{accessed}",d).replace(l.URL,a?`${s} (para. ${a})`:s)}));return{item:{...l,id:s,URL:s,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...a?{note:`para. ${a}`}:{}},styles:c}}var Ut=t=>t?.["date-parts"]?.[0]??[],Et=t=>String(t??"").padStart(2,"0"),Fn=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),Ao=t=>{let e=r=>r.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=e(t.author?.[0]?.family??t.author?.[0]?.literal??""),o=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(r=>r.length>3)??"");return`${n}${Ut(t.issued)[0]??""}${o}`.toLowerCase()||"citation"},So={chapter:"incollection",book:"book",report:"techreport"},Ie=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function Mn(t){let[e,n,o]=Ut(t.issued),[r,l,u]=Ut(t.accessed),a=c=>c?Ie(c):void 0,d=[["author",t.author?.map(c=>c.literal?`{${Ie(c.literal)}}`:Ie(Fn(c))).join(" and ")],["title",a(t.title)],["booktitle",t.type==="chapter"?a(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",a(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&o?`${e}-${Et(n)}-${Et(o)}`:void 0],["url",t.URL],["urldate",r?`${r}-${Et(l)}-${Et(u)}`:void 0],["doi",t.DOI],["language",a(t.language)],["note",a(t.note)],["keywords",a(t.keyword)],["abstract",a(t.abstract)]].filter(([,c])=>c).map(([c,p])=>`  ${c} = {${p}}`).join(`,\n`);return`@${So[t.type]??"misc"}{${Ao(t)},\n${d}\n}\n`}var Fo={chapter:"CHAP",book:"BOOK",report:"RPRT"};function Hn(t){let[e,n,o]=Ut(t.issued),[r,l,u]=Ut(t.accessed);return[["TY",Fo[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(s=>["AU",Fn(s)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${Et(n)}/${Et(o)}`:void 0],["UR",t.URL],["Y2",r?`${r}/${Et(l)}/${Et(u)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(s=>["KW",s]),["N1",t.note]].filter(([,s])=>s).map(([s,d])=>`${s}  - ${d.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var Bn=t=>JSON.stringify([t],null,2)+`\n`;var ut=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},Mo=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},ye=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",u=m=>{let x=m?.userMessage,B=typeof x=="string"?x.trim():"";return B?B.slice(0,200):null},a=()=>{if(document.getElementById(e))return;let m=document.createElement("style");m.id=e,m.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(m)},s=(m,x,B,H=!1)=>{let g=document.createElement("div");g.className="tb-sg-field";let M=document.createElement("label");if(M.setAttribute("for",m),M.textContent=x,H){let S=document.createElement("span");S.className="tb-sg-opt",S.textContent=" (optional)",M.append(S)}let $=document.createElement("p");return $.className="tb-sg-err",$.id=m+"-err",B.id=m,!H&&!B.readOnly&&(B.required=!0),g.append(M,B,$),{wrap:g,control:B,err:$,hintId:null}},d=m=>{let x=[];m.err.textContent&&x.push(m.err.id),m.hintId&&x.push(m.hintId),x.length?m.control.setAttribute("aria-describedby",x.join(" ")):m.control.removeAttribute("aria-describedby")},c=(m,x)=>{m.control.setAttribute("aria-invalid","true"),m.err.textContent=x,d(m)},p=m=>{m.control.hasAttribute("aria-invalid")&&(m.control.removeAttribute("aria-invalid"),m.err.textContent="",d(m))},b=null,f=(m,x,B,H)=>{if(b)return;a();let g=B,M=document.body.style.overflow,$=null,S=!1,T=document.createElement("div");T.id=t;let N=document.createElement("div");N.className="tb-sg-dialog",N.tabIndex=-1,N.setAttribute("role","dialog"),N.setAttribute("aria-modal","true"),N.setAttribute("aria-labelledby",n);let K=document.createElement("div");K.className="tb-sg-head";let X=document.createElement("h2");X.id=n,X.textContent=H?`Note to the authors about \\xB6${H.paragraph}`:"Suggest an edit";let Y=document.createElement("button");Y.type="button",Y.className="tb-sg-close",Y.textContent="\\xD7",Y.setAttribute("aria-label","Close suggestion form"),K.append(X,Y);let V=document.createElement("form");V.noValidate=!0;let dt=document.createElement("p");dt.className="tb-sg-intro",dt.textContent=H?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let tt=document.createElement("blockquote");tt.className="tb-sg-quote",tt.textContent=H?.quote??"";let Z=H?.text??"";tt.hidden=!H?.quote||!!Z;let ct=Mo(),nt=document.createElement("input");nt.type="text",nt.name="name",nt.autocomplete="name";let J=s("tb-sg-name","Your name",nt),h=document.createElement("p");if(h.className="tb-sg-count",h.id="tb-sg-credit",h.textContent="If the authors accept your suggestion, you\'ll be credited by this name.",J.wrap.append(h),J.hintId=h.id,d(J),ct){nt.value=ct.name||ct.login;let F=document.createElement("p");F.className="tb-sg-count",F.id="tb-sg-who",F.textContent=`Signed in as @${ct.login}: GitHub tells you when the authors answer.`,J.wrap.append(F),J.hintId=`${h.id} ${F.id}`,d(J)}let y=document.createElement("input");y.type="text",y.name="path",y.readOnly=!0,y.value=x;let k=s("tb-sg-path","Page you are editing",y),C=document.createElement("textarea");C.name="suggestion",C.rows=6,C.maxLength=5e3,C.value=Z;let D=s("tb-sg-suggestion","Your suggested change",C),P=document.createElement("p");P.className="tb-sg-count",P.id="tb-sg-count",D.hintId=P.id;let I=()=>{let F=5e3-C.value.length;P.textContent=F+" character"+(F===1?"":"s")+" remaining"};I(),d(D),C.addEventListener("input",()=>{I(),p(D)}),D.wrap.append(P);let O=document.createElement("textarea");O.name="reasoning",O.rows=3;let q=s("tb-sg-reasoning","Comment",O,!0);J.control.addEventListener("input",()=>p(J));let Q=document.createElement("div");Q.className="tb-sg-hp",Q.setAttribute("aria-hidden","true");let kt=document.createElement("label");kt.setAttribute("for","tb-sg-website"),kt.textContent="Leave this field empty";let ot=document.createElement("input");ot.type="text",ot.name="website",ot.id="tb-sg-website",ot.tabIndex=-1,ot.autocomplete="off",ot.setAttribute("aria-hidden","true"),Q.append(kt,ot);let St=document.createElement("div");St.className="tb-sg-actions";let rt=document.createElement("button");rt.type="submit",rt.className="tb-sg-btn",rt.textContent="Send suggestion";let pt=document.createElement("button");pt.type="button",pt.className="tb-sg-quiet",pt.textContent="Cancel",St.append(rt,pt);let Dt=()=>C.value.replace(/\\s+/g," ").trim()===Z.replace(/\\s+/g," ").trim(),$t=()=>Dt()&&!O.value.trim(),ft=document.createElement("p");ft.className="tb-sg-count",ft.id="tb-sg-why-not",ft.textContent=Z?"Change the text above, or add a comment, to send.":"Describe the change, or add a comment, to send.",rt.setAttribute("aria-describedby",ft.id);let Nt=()=>{ft.hidden=!$t(),S||(rt.disabled=$t())};C.addEventListener("input",Nt),O.addEventListener("input",Nt);let it=document.querySelector(".tb-page-controls")?.dataset.privacy,wt=document.createElement("p");if(wt.className="tb-sg-count tb-sg-published",wt.append("Your name and text are published openly, under the book\'s licence. "),it){let F=document.createElement("a");F.href=it,F.textContent="How contributions are handled",wt.append(F)}V.append(dt,tt,J.wrap,k.wrap,D.wrap,q.wrap,Q,ft,...it?[wt]:[],St),Nt();let et=document.createElement("div");et.className="tb-sg-pane",et.tabIndex=-1,et.hidden=!0,N.append(K,V,et),T.append(N);let lt=()=>{et.hidden=!0,V.hidden=!1,C.focus()},Ft=(F,_,U,j=!1)=>{if(!T.isConnected)return;et.textContent="";let bt=document.createElement("p");bt.className="tb-sg-pane-title",bt.textContent=F;let st=document.createElement("p");st.textContent=_,et.append(bt,st);let at=re(U,location.origin);if(at){let ht=document.createElement("a");ht.href=at,ht.textContent=at;let vt=document.createElement("p");vt.className="tb-sg-follow",vt.append("Follow your suggestion: ",ht),et.append(vt)}if(U){let ht=document.createElement("a");ht.href=U,ht.target="_blank",ht.rel="noopener",ht.textContent="View your suggestion on GitHub";let vt=document.createElement("p");vt.append(ht),et.append(vt)}let mt=document.createElement("button");mt.type="button",mt.className=j?"tb-sg-btn":"tb-sg-quiet",mt.textContent=j?"Back to my suggestion":"Close",mt.addEventListener("click",j?lt:()=>b?.()),et.append(mt),V.hidden=!0,et.hidden=!1,et.focus()},Wt=()=>Array.prototype.filter.call(N.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),F=>!F.disabled&&F.tabIndex>=0&&!F.closest("[hidden]")),xt=F=>{if(F.key==="Escape"){F.preventDefault(),b?.();return}if(F.key!=="Tab")return;let _=Wt();if(!_.length){F.preventDefault(),N.focus();return}let U=_.indexOf(document.activeElement);F.shiftKey?U<=0&&(F.preventDefault(),_[_.length-1].focus()):(U===-1||U===_.length-1)&&(F.preventDefault(),_[0].focus())};b=()=>{if(b=null,$)try{$.abort()}catch{}document.removeEventListener("keydown",xt,!0),T.remove(),document.body.style.overflow=M,g.isConnected&&g.focus()},T.addEventListener("mousedown",F=>{F.target===T&&b?.()}),Y.addEventListener("click",()=>b?.()),pt.addEventListener("click",()=>b?.()),document.addEventListener("keydown",xt,!0);let Kt=()=>{let F=null,_=(U,j)=>{c(U,j),F||(F=U.control)};for(let U of[J,D])p(U);return nt.value.trim()||_(J,"Please add your name."),!C.value.trim()&&!Dt()?_(D,"Please describe the change you would like."):C.value.length>5e3&&_(D,"Please keep the suggestion under 5000 characters."),F&&F.focus(),!F},Mt=F=>{S=F,rt.disabled=F||$t(),rt.textContent=F?"Sending\\u2026":"Send suggestion"};V.addEventListener("submit",F=>{if(F.preventDefault(),S||$t()||!Kt())return;let _=Dt(),U={name:nt.value.trim(),suggestion:(_?O:C).value.trim(),reasoning:_?"":O.value.trim(),path:x,website:ot.value,...H?{paragraph:H.paragraph,quote:!_&&Z?Z:H.quote,page:H.page,...H.anchor?{anchor:H.anchor}:{}}:{},...ct?{identity:ct.token}:{}};if(U.website){Ft("Thank you","Your suggestion has been received.");return}Mt(!0);let j=$=new AbortController,bt=setTimeout(()=>j.abort(),1e4);ne(m,JSON.stringify(U),{signal:j.signal,onWait:()=>{clearTimeout(bt),rt.textContent=ee}}).then(async st=>{let at=null;try{at=await st.json()}catch{at=null}if(!st.ok){let mt=new Error(at?.error||"HTTP "+st.status);throw mt.userMessage=u(at),mt}return at}).then(st=>{ut("suggest_edit_submitted",{outcome:"success"});let at=st?.issueUrl;Ft("Thank you \\u2014 suggestion sent","A maintainer will pick this up. Keep this link to see what they decide:",typeof at=="string"?at:null)}).catch(st=>{ut("suggest_edit_submitted",{outcome:"error"}),Ft("That did not go through",st&&st.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(bt),$===j&&($=null),rt.isConnected?Mt(!1):S=!1})}),document.body.style.overflow="hidden",document.body.appendChild(T),nt.focus(),ut(H?"section_note_opened":"suggest_edit_opened")},E=((m,x,B,H)=>{try{f(m,x,B,H)}catch{b=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return E.closeIfOpen=()=>b?.(),E}catch{return null}})(),Rn="tb-pedit-style",Nn=()=>{if(document.getElementById(Rn))return;let t=document.createElement("style");t.id=Rn,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},On=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",pn),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},Ho="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",jt=t=>(t.textContent??"").replace(/\\s+/g," ").trim(),Ue=()=>{let t=window.getSelection?.();if(!t||t.isCollapsed||!t.rangeCount)return;let e=Ro(t.getRangeAt(0));if(!e)return;let n=ze(t.getRangeAt(0).startContainer);return{paragraph:e.start,quote:Pn(n),page:Bo(),text:e.exact,anchor:e}},Bo=()=>location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/"),ze=t=>(t instanceof Element?t:t.parentElement)?.closest("article [data-pnum]"),_e=t=>t.replace(/\\s+/g," "),_n=()=>document.querySelector("[data-source-commit]")?.dataset.sourceCommit??"",Ro=t=>{let e=ze(t.startContainer),n=ze(t.endContainer)??e;if(!e||!n||e.closest(".popover"))return;let o=_e(t.toString()).trim();if(!o)return;let r=document.createRange();r.setStart(e,0),r.setEnd(t.startContainer,t.startOffset);let l=document.createRange();return l.setStart(t.endContainer,t.endOffset),l.setEnd(n,n.childNodes.length),{start:Number(e.dataset.pnum),end:Number(n.dataset.pnum),exact:o.slice(0,2e3),prefix:_e(r.toString()).trimStart().slice(-32),suffix:_e(l.toString()).trimEnd().slice(0,32),text:jt(e),commit:_n()}},Io=t=>{let e=Number(t.dataset.pnum);return{start:e,end:e,exact:jt(t),prefix:"",suffix:"",text:jt(t),commit:_n()}},Do=t=>{let e=window,n=!e.tbSelectionComment;if(e.tbSelectionComment=t,!n)return;let o=document.createElement("button");o.type="button",o.className="tb-sel-comment",o.textContent="Comment on this",o.hidden=!0,document.body.append(o);let r,l=0,u=()=>{o.hidden=!0,r=void 0};o.addEventListener("pointerdown",a=>a.preventDefault()),o.addEventListener("click",()=>{let a=r;u(),a&&e.tbSelectionComment?.(a,o)}),o.addEventListener("keydown",a=>{a.key==="Escape"&&u()}),document.addEventListener("selectionchange",()=>{clearTimeout(l);let a=window.matchMedia?.("(pointer: coarse)").matches;l=window.setTimeout(()=>{let s=Ue();if(!s)return u();let d=window.getSelection().getRangeAt(0).getClientRects(),c=d[d.length-1];if(!c)return u();r=s,o.hidden=!1;let p=o.offsetWidth||130,b=Math.max(8,Math.min(c.right-p/2,document.documentElement.clientWidth-p-8));o.style.left=`${b+window.scrollX}px`,o.style.top=`${c.bottom+window.scrollY+(a?28:8)}px`},a?700:250)})},Pn=t=>{let e=jt(t);if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},No=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(r=>!r.closest(".popover")&&!r.querySelector(":scope > button.tb-pnote"));if(!n.length)return;Nn();let o=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let r of n){let l=Number(r.dataset.pnum),u=On();u.className="tb-pnote",u.title=`Note to the authors about \\xB6${l}`,u.querySelector("path").setAttribute("d",Ho),u.addEventListener("click",a=>{a.stopPropagation(),ve(u,e,`Continue: note on \\xB6${l}`,()=>t({paragraph:l,quote:Pn(r),page:o,text:jt(r),anchor:Io(r)},u))}),r.append(u)}},we=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(we))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var Oo=t=>typeof t.showPopover=="function",xe=new Set,qn=(t,e)=>{let n=t.closest(".tb-header")??t,r=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),l=t.getBoundingClientRect(),u=document.documentElement.clientWidth,a=e.style;a.boxSizing="border-box",a.top=`${Math.max(r.bottom,0)+6}px`,a.maxHeight=`${Math.max(window.innerHeight-Math.max(r.bottom,0)-12,120)}px`;let s=()=>{a.left=`${Math.max(r.left,0)}px`,a.right="auto",a.width=`${Math.min(r.width,u)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return s();a.left="auto",a.right=`${Math.max(u-l.right,0)}px`,a.width="",e.getBoundingClientRect().left<r.left&&s()},je=()=>{for(let t of Array.from(xe))qn(t.button,t.panel)};window.addEventListener("resize",je);window.addEventListener("scroll",je,{passive:!0});var Un=(t,e)=>{e.hidden=!1,Oo(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",xe.add({button:t,panel:e}),qn(t,e))},zn=t=>{for(let e of Array.from(xe))e.panel===t&&xe.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},Pe=(t,e,n,o)=>{let r=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(s=>!s.hidden&&!s.closest("[hidden]")),l={d:null,button:t,panel:e},u={open(){for(let d of Array.from(we))d!==l&&d.d.close(!1);Un(t,e),t.setAttribute("aria-expanded","true"),we.add(l),(n?r()[0]:e.querySelector("input:checked")??r()[0])?.focus()},close(s=!0){e.hidden||(zn(e),t.setAttribute("aria-expanded","false"),we.delete(l),s&&t.focus())}};l.d=u,t.addEventListener("click",()=>{if(!e.hidden)return u.close();o?o(u.open):u.open()});let a=s=>{if(s.key==="Escape"&&!e.hidden){s.preventDefault(),s.stopPropagation(),u.close(!0);return}if(!n||e.hidden||!e.contains(s.target))return;let d=r(),c=d.indexOf(document.activeElement),p=b=>{s.preventDefault(),d[(b+d.length)%d.length]?.focus()};s.key==="ArrowDown"?p(c+1):s.key==="ArrowUp"?p(c-1):s.key==="Home"?p(0):s.key==="End"?p(d.length-1):s.key==="Tab"&&u.close(!1)};return e.addEventListener("keydown",a),t.addEventListener("keydown",a),n&&e.addEventListener("click",s=>{let d=s.target.closest(\'[role="menuitem"]\');if(d){if(d.getAttribute("aria-disabled")==="true"){s.preventDefault();return}u.close(!1)}}),u},v=(t,e={},...n)=>{let o=document.createElement(t);for(let[r,l]of Object.entries(e))r==="text"?o.textContent=l:r==="class"?o.className=l:o.setAttribute(r,l);for(let r of n)r!==null&&o.append(r);return o},Gt=(t,e,...n)=>{let o=v("dialog",{class:"tb-dialog","aria-label":t}),r=v("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});r.addEventListener("click",()=>o.close()),o.append(r,...n);let l=null;return o.addEventListener("close",()=>{o.remove(),l?l():e.isConnected&&e.focus()}),document.body.append(o),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""),{d:o,closeThen:u=>(l=u,o.close())}},In=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,Un(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",zn(e),e.hidden=!1)},4e3))},jn=(t,e,n)=>{let o=()=>{let r=v("textarea",{readonly:""});r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.append(r),r.select();let l=!1;try{l=document.execCommand("copy")}catch{l=!1}return r.remove(),l};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>o()?e():n()):o()?e():n()},Gn="tb-contribute-explained",Wn=!1,_o=()=>{if(Wn)return!0;try{return localStorage.getItem(Gn)==="1"}catch{return!1}},zt={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Reword a paragraph where it stands, or tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},Po=["no","one","two","three"],qo="https://hypothes.is/logout",Kn=(t,e,n)=>{Wn=!0;try{localStorage.setItem(Gn,"1")}catch{}let o=({title:p,what:b,who:f,account:E,link:m,switchNote:x})=>v("section",{class:"tb-route"},v("h3",{text:p}),v("p",{text:b}),v("p",{},v("strong",{text:"Who sees it: "}),f),v("p",{},v("strong",{text:"Account: "}),E,m?" ":null,m?v("a",{href:m[1],target:"_blank",rel:"noopener noreferrer",text:m[0]}):null),x?v("p",{},`${x} `,v("a",{href:qo,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),r=v("div",{class:"tb-dialog-row"}),l=document.querySelector(".tb-header"),u=window.tbAnnotations,a=(l?.dataset.routes??"comment").split(" ").filter(p=>p!=="comment"||u).map(p=>p==="comment"&&u?.groupsOnly?"groupComment":p).filter(p=>p in zt),s=a.includes("edit")||a.includes("note")?"book":"edition",d=Gt("How contributing works",t,v("h2",{text:"How contributing works"}),v("p",{text:a.length===1?`There is one way to help with this ${s}: ${zt[a[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${Po[a.length]??a.length} ways to help with this ${s}. They differ in who sees what you write, and in which account you need.`}),...a.map(p=>o(zt[p])),v("p",{},v("a",{href:e,text:"More about commenting and contributing"})),...l?.dataset.credits?[v("p",{},v("a",{href:`${l.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],r),c=v("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>d.d.close()),n){let p=v("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});p.addEventListener("click",()=>d.closeThen(n.run)),r.append(c,p),p.focus()}else r.append(c),c.focus()},ve=(t,e,n,o)=>_o()?o():Kn(t,e,{label:n,run:o}),Uo=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},zo=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(l=>l.id===e):void 0;if(n)return Number(n.dataset.pnum);let o=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,r=t.find(l=>{let u=l.getBoundingClientRect();return u.bottom>o+8&&u.top<window.innerHeight});return Number((r??t[0]).dataset.pnum)||0},jo=(t,e,n)=>{let o=URL.createObjectURL(new Blob([t],{type:e})),r=v("a",{href:o,download:n});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},Go=(t,e,n,o,r=!1)=>{let l=t.chapter?zo():0,u=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),a=[...l?[["paragraph",`This paragraph (\\xB6${l})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${u}`]],s=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),d=l&&s&&!r?"paragraph":t.chapter?"chapter":"book",c="apa";try{let S=localStorage.getItem("tb-cite-style");S&&fe.some(([T])=>T===S)&&(c=S)}catch{}let p=v("p",{class:"tb-cite-text","aria-live":"polite"}),b=v("span",{class:"tb-cite-said",role:"status"}),f=()=>Sn(t,d,new Date,l),E=()=>{b.textContent="",p.textContent="";for(let S of f().styles[c])p.append(S.italic?v("i",{text:S.text}):S.text)},m=(S,T,N,K,X)=>{let Y=v("div",{class:"tb-seg"});for(let[V,dt]of N){let tt=v("input",{type:"radio",name:S,value:V});tt.checked=K()===V,tt.addEventListener("change",()=>{X(V),E()}),Y.append(v("label",{},tt,dt))}return v("fieldset",{},v("legend",{text:T}),Y)},x=v("button",{type:"button",class:"tb-btn",text:"Copy"});x.addEventListener("click",()=>{jn(Ne(f().styles[c]),()=>b.textContent="Copied",()=>b.textContent="Couldn\'t copy: select the text instead"),ut("citation_copied",{style:c,scope:d})});let B=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",H=[["BibTeX","bib","application/x-bibtex",Mn],["RIS","ris","application/x-research-info-systems",Hn],["CSL-JSON","json","application/vnd.citationstyles.csl+json",Bn]],g=v("div",{class:"tb-dialog-row tb-cite-files"},v("span",{class:"tb-cite-said",text:"Download"}));for(let[S,T,N,K]of H){let X=v("button",{type:"button",class:"tb-btn",text:S});X.addEventListener("click",()=>{let{item:Y}=f();jo(K(Y),N,`${d==="book"?"book":B}${d==="paragraph"?`-p${l}`:""}.${T}`),ut("citation_downloaded",{format:T,scope:d})}),g.append(X)}let M=Oe(e.dataset.licence??""),$=v("p",{class:"tb-cite-text"});for(let S of o())$.append(S.italic?v("i",{text:S.text}):S.text);E(),Gt("Cite",n,v("h2",{text:"Cite"}),m("tb-cite-scope","What",a,()=>d,S=>d=S),m("tb-cite-style","Style",fe,()=>c,S=>{c=S;try{localStorage.setItem("tb-cite-style",c)}catch{}}),p,v("div",{class:"tb-dialog-row"},b,x),g,v("h3",{text:M?`Attribution (${M})`:"Attribution"}),$)},Dn=(t,e,n=!1)=>{let o={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:Uo(),accessed:new Date},r=s=>{let d=v("p",{class:"tb-cite-text"});for(let c of s)d.append(c.italic?v("i",{text:c.text}):c.text);return d},l=(s,d)=>{let c=v("span",{class:"tb-cite-said",role:"status"}),p=v("button",{type:"button",class:"tb-btn",text:"Copy"});return p.addEventListener("click",()=>jn(Ne(d),()=>c.textContent="Copied",()=>c.textContent="Couldn\'t copy: select the text instead")),v("section",{},v("h3",{text:s}),r(d),v("div",{class:"tb-dialog-row"},c,p))},u=An(document);if(u)return Go(u,t,e,()=>De(o),n);let a=Oe(o.licence);Gt("Cite this page",e,v("h2",{text:"Cite this page"}),l("APA 7",Tn(o)),l(a?`Attribution (${a})`:"Attribution",De(o)))},Wo=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},Ko=(t,e,n,o)=>{let r=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],l=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),u=(s,d,c)=>{let p=r.filter(([b])=>d?.[b]).map(([b,f])=>{let E=v("a",{class:"tb-btn",href:d[b],download:"",text:f});return E.addEventListener("click",()=>ut("download",{format:b,scope:c})),E});return p.length?[v("h3",{text:s}),v("div",{class:"tb-dialog-row tb-cite-files"},...p)]:[]},a=v("button",{type:"button",class:"tb-btn",text:"Markdown"});a.addEventListener("click",o),Gt("Download",n,v("h2",{text:"Download"}),...u("This page",t.chapter,"chapter"),...u(`Whole ${l}`,t.book,"book"),v("h3",{text:"Source"}),v("div",{class:"tb-dialog-row tb-cite-files"},a))},Yo=(t,e,n)=>{let o=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&o.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let r=v("p",{class:"tb-panel-note",role:"status"});for(let[l,u,a]of o){let s=v("div",{class:"tb-seg"});for(let[c,p]of a){let b=v("input",{type:"radio",name:`tb-pref-${l}`,value:c});b.checked=e.get(l)===c,b.addEventListener("change",()=>{if(l==="annotations"&&n){if(r.textContent="",c==="on")n.enable();else if(n.disable().reload){let f=v("button",{type:"button",class:"tb-btn",text:"Reload"});f.addEventListener("click",()=>location.reload()),r.append("Highlights hidden. The annotation tab goes away when the page reloads.",f)}return}e.set(l,c),l==="numbers"&&ut("paragraph_numbers_toggled",{to:c})}),s.append(v("label",{},b,p))}let d=v("fieldset",{},v("legend",{text:u}),s);l==="annotations"&&d.append(r),l==="width"&&Vo(t,d),t.append(d)}},Vo=(t,e)=>{let n=r=>v("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${r}) * var(--tb-size-body) * var(--tb-text-scale))`}),o=()=>{let r=document.querySelector("article");if(!r?.parentElement||t.hidden)return;let l=n("--tb-measure-standard-em"),u=n("--tb-measure-wide-em");r.parentElement.append(l,u);let a=l.getBoundingClientRect().width,s=u.getBoundingClientRect().width;l.remove(),u.remove(),e.hidden=!(s-a>=16)};new MutationObserver(o).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",o)},qe=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,Zo=t=>{let e=!1,n=()=>{e=!1;let r=t.getBoundingClientRect(),l=document.documentElement.style;l.setProperty("--tb-hdr-h",`${Math.round(r.height)}px`),l.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(r.bottom))}px`)},o=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),typeof ResizeObserver=="function"&&new ResizeObserver(o).observe(t)},Ge=null;window.addEventListener("popstate",()=>Ge?.(location.hash,!1));var Jo=(t,e,n,o,r)=>{let l={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:r,track:ut};t.addEventListener("click",s=>{if(s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey){ut("edit_on_github_clicked");return}s.preventDefault(),le({...l,mode:"page",trigger:n})});let u=new Map,a=Array.from(document.querySelectorAll("[data-pnum]")).filter(s=>!s.closest(".popover")&&!s.querySelector(":scope > button.tb-pedit"));a.length&&Nn();for(let s of a){let d=On();d.addEventListener("click",c=>{c.stopPropagation(),ve(d,o,`Continue: edit \\xB6${s.dataset.pnum}`,()=>le({...l,mode:"paragraph",para:s,trigger:d}))}),s.append(d),u.set(s.dataset.pnum??"",{p:s,b:d})}Ge=(s,d)=>{let c=_t.exec(s);if(!c)return;let p=c[1]?u.get(c[1]):void 0;le(p?{...l,mode:"paragraph",para:p.p,trigger:p.b,push:d}:{...l,mode:"page",trigger:n,push:d})}},Xo=(t,e,n)=>{t.addEventListener("click",o=>{o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||(o.preventDefault(),xn({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:ut}))})},Qo=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),o=()=>t.scrollWidth>t.clientWidth+1,r=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,l=r?.querySelector(".home-link")?r:null,u=t.querySelector(".tb-hdr-label"),a=()=>!!u&&getComputedStyle(u).position!=="absolute",s=t.querySelector(".tb-hdr-where"),d=f=>!!f&&f.scrollWidth>f.clientWidth+1,c=f=>!o()&&a()===f&&!d(s)&&!Array.from(s?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(d),p=f=>{l?.classList.toggle("tb-logo-full",f),l?.classList.toggle("tb-logo-icon",!f)},b=()=>{let f=!!e&&!!n&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),f&&(e.hidden=!1,n.hidden=!0),o()&&t.classList.add("tb-hdr-icons"),o()&&(t.classList.add("tb-hdr-tight"),f&&(e.hidden=!0,n.hidden=!1));let E=a();l&&c(E)&&(p(!0),c(E)||p(!1)),je()};if(b(),window.addEventListener("resize",b),document.fonts?.ready.then(b),typeof ResizeObserver=="function"){let f=new ResizeObserver(()=>requestAnimationFrame(b));f.observe(t);let E=t.querySelector(".tb-hdr-actions");E&&f.observe(E)}return b},tr=t=>{let e=s=>t.querySelector(s),n=t.dataset.howTo??"/how-to-comment",o=window,r=e("[data-tb-contribute]"),l=e("[data-tb-more]"),u=s=>{try{s()}catch{}};u(()=>{let s=e("[data-tb-search]"),d=document.querySelector(".search .search-button");!s||!d||(s.addEventListener("click",()=>d.click()),s.hidden=!1)}),u(()=>{let s=e("[data-tb-menu]"),d=document.querySelector(".explorer"),c=d?.querySelector(".mobile-explorer");if(!s||!d||!c)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(s);let b=d.querySelector(".explorer-content");b?.id&&s.setAttribute("aria-controls",b.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let f=s.querySelector(".tb-hdr-label"),E=()=>!d.classList.contains("collapsed"),m=()=>{let x=E();s.setAttribute("aria-expanded",String(x)),s.classList.toggle("tb-closes",x),f&&(f.textContent=x?"Close menu":"Menu")};new MutationObserver(m).observe(d,{attributes:!0,attributeFilter:["class"]}),s.addEventListener("click",()=>{E()||o.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",x=>{x.key!=="Escape"||!E()||!qe()||(c.click(),s.focus())}),m(),s.hidden=!1}),u(()=>{let s=e("[data-tb-reader]"),d=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!s||!d||!c)return;let p=()=>s.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),s.addEventListener("click",()=>c.click()),d.addEventListener("click",()=>c.click()),p(),t.dataset.tbHasReader="1",s.hidden=!1});let a=()=>{ut("annotation_badge_clicked"),o.tbAnnotations.open().then(s=>{s||In("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};u(()=>{if(!o.tbAnnotations){let c=e("[data-tb-comment]");if(c&&window.tbCommentsComing){let p=c.querySelector(".tb-mi-t"),b=c.querySelector(".tb-mi-s");p&&(p.textContent=zt.groupComment.title),b&&(b.textContent="Coming soon for classes"),c.setAttribute("aria-disabled","true"),c.hidden=!1}return}let s=e("[data-tb-annotate]");if(s){let c=s.querySelector(".tb-hdr-label"),p=()=>qe()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),b=()=>{let E=p();s.classList.toggle("tb-closes",E),c&&(c.textContent=E?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",b),window.addEventListener("resize",b);let f=null;s.addEventListener("pointerdown",()=>f=p(),!0),s.addEventListener("click",()=>{let E=f??p();if(f=null,E)return o.tbAnnotations.close?.();let m=document.querySelector(".explorer");m&&!m.classList.contains("collapsed")&&qe()&&m.querySelector(".mobile-explorer")?.click(),ve(s,n,"Continue: open annotations",a)}),s.querySelector(".tb-anno-count")||s.append(v("span",{class:"tb-anno-count"})),s.hidden=!1}let d=e("[data-tb-comment]");if(d){if(d.addEventListener("click",a),o.tbAnnotations.groupsOnly){let c=d.querySelector(".tb-mi-t"),p=d.querySelector(".tb-mi-s");c&&(c.textContent=zt.groupComment.title),p&&(p.textContent="Hypothes.is account \\xB7 only your group sees it")}d.hidden=!1}}),u(()=>{let s=e("#tb-contribute-menu");if(!r||!s)return;Pe(r,s,!0,E=>ve(r,n,"Continue to Contribute",E)),e("[data-tb-explain]")?.addEventListener("click",()=>Kn(r,n));let d=e("button.tb-suggest-btn"),c=d?.dataset.endpoint,p=d&&c&&ye?()=>ye(c,d.dataset.path??"",r,Ue()):void 0,b=e("a.edit-on-github"),f=b?.dataset.editEndpoint;if(b&&f){if(Jo(b,f,r,n,p),_t.test(location.hash)){let E=location.hash,m=window.history.state?.tbEditor===!0;m||window.history.replaceState(window.history.state,"",location.pathname+location.search),Ge?.(E,!m)}}else b?.addEventListener("click",()=>ut("edit_on_github_clicked"));if(d&&p){d.addEventListener("click",()=>{if(Ue()||!document.querySelector("article [data-pnum]"))return p();Gt("Note to the authors",r,v("h2",{text:"Note to the authors"}),v("p",{text:"Select the words your note is about, then choose Note to the authors again. Or use the note button beside a paragraph."}))}),d.hidden=!1;let E=(m,x)=>ye(c,d.dataset.path??"",x,m);No(E,n),Do(E)}r.hidden=!1}),u(()=>{let s=e("[data-tb-appearance]"),d=e("#tb-appearance");!s||!d||!o.tbPrefs||(Yo(d,o.tbPrefs,o.tbAnnotations),Pe(s,d,!1),s.hidden=!1)}),u(()=>{let s=e("#tb-more-menu");if(!l||!s)return;Pe(l,s,!0),e("[data-tb-cite]")?.addEventListener("click",()=>Dn(t,l));let d=document.querySelector(".page-header h1.article-title");if(e("[data-tb-cite]")&&d&&!document.querySelector(".tb-cite-page")){let x=d.parentElement.querySelector(".content-meta")??d,B=v("button",{type:"button",class:"tb-btn tb-cite-page",text:"Cite this page"});B.addEventListener("click",()=>Dn(t,B,!0)),x.after(B)}e("[data-tb-print]")?.addEventListener("click",()=>window.print());let c=e("a.tb-history-link");c?.dataset.revisionEndpoint&&Xo(c,c.dataset.revisionEndpoint,l);let p=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");p&&(!b||!b.querySelector("a.internal")?(p.setAttribute("aria-disabled","true"),p.append(v("span",{class:"tb-mi-s",text:"No other page links here"}))):p.addEventListener("click",()=>{let x=b.querySelector("h3")??b;x.tabIndex=-1,b.scrollIntoView({block:"start"}),x.focus({preventScroll:!0})}));let f=e("[data-tb-download]"),E=Wo();if(f&&E){let x=f.querySelector(".tb-mi-t");x&&(x.textContent="Download\\u2026")}let m=()=>fetch(f.dataset.tbDownload).then(x=>x.ok?x.blob():Promise.reject(new Error(String(x.status)))).then(x=>{let B=URL.createObjectURL(x),H=v("a",{href:B,download:f.dataset.file??"page.md"});document.body.append(H),H.click(),H.remove(),setTimeout(()=>URL.revokeObjectURL(B),1e3)}).catch(()=>In("That didn\'t download just now. View source has the same file."));f?.addEventListener("click",()=>E?Ko(E,t,l,m):m()),l.hidden=!1}),u(()=>{Qo(t)}),u(()=>{let s=t.parentElement;Zo(s?.classList.contains("tb-header-slot")?s:t)})},er=()=>{try{ye?.closeIfOpen(),bn(),wn();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",tr(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&kn(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",er);\n';

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