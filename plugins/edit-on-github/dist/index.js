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
var controls_inline_default = 'var tn=/^\\s{0,3}(```|~~~)/,eo=/^\\s{0,3}(#{1,6}\\s|>|[-*+]\\s|\\d+[.)]\\s|\\||<|!\\[|\\$\\$|---|\\*\\*\\*|___|\\[\\^[^\\]]+\\]:)/,no=t=>{let e=t.split(`\n`),n=[],o=0;if(e[0]?.trim()==="---"){let a=e.findIndex((u,i)=>i>0&&(u.trim()==="---"||u.trim()==="..."));a>0&&(o=a+1)}let r=0;for(;o<e.length;){let a=e[o];if(!a.trim()){o++;continue}let u=tn.exec(a);if(u||a.trim()==="$$"){let c=u?u[1]:"$$",p=o+1;for(;p<e.length&&!e[p].trim().startsWith(c);)p++;o=p+1;continue}let i=o;for(;i<e.length&&e[i].trim()&&!tn.test(e[i]);)i++;let s=e.slice(o,i).join(`\n`),d=!eo.test(a);n.push({start:o,text:s,ordinal:d?++r:0}),o=i}return n},oo=t=>en(t.replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm," ").replace(/!\\[\\[[^\\]]*\\]\\]/g," ").replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g," ").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop().replace(/#/g," ")).replace(/\\[\\^[^\\]]*\\]/g," ").replace(/\\[([^\\]]*)\\]\\([^)]*\\)/g,"$1").replace(/<[^>]+>/g," ")),en=t=>t.toLowerCase().match(/[\\p{L}\\p{N}]+/gu)??[],ro=(t,e)=>{if(!t.length||!e.length)return 0;let n=new Map;for(let r of t)n.set(r,(n.get(r)??0)+1);let o=0;for(let r of e){let a=n.get(r)??0;a>0&&(o++,n.set(r,a-1))}return o/Math.max(t.length,e.length)};var nn=(t,e,n)=>{let o=en(e);if(!o.length)return null;let r=null,a=0,u=1/0;for(let i of no(t)){let s=ro(oo(i.text),o);if(s<.75)continue;let d=i.ordinal?Math.abs(i.ordinal-n):1e6;(s>a+.02||Math.abs(s-a)<=.02&&d<u)&&(r=i,a=Math.max(s,a),u=d)}return r};var oe=(t,e)=>{let n=0;for(;n<t.length&&n<e.length&&t[n]===e[n];)n++;let o=t.length,r=e.length;for(;o>n&&r>n&&t[o-1]===e[r-1];)o--,r--;let a=t.slice(0,n).map(c=>({t:"=",v:c})),u=t.slice(o).map(c=>({t:"=",v:c})),i=t.slice(n,o),s=e.slice(n,r),d;if((i.length+1)*(s.length+1)>4e5)d=[...i.map(c=>({t:"-",v:c})),...s.map(c=>({t:"+",v:c}))];else{let c=s.length+1,p=new Uint32Array((i.length+1)*c);for(let x=i.length-1;x>=0;x--)for(let h=s.length-1;h>=0;h--)p[x*c+h]=i[x]===s[h]?p[(x+1)*c+h+1]+1:Math.max(p[(x+1)*c+h],p[x*c+h+1]);d=[];let b=0,f=0;for(;b<i.length&&f<s.length;)i[b]===s[f]?(d.push({t:"=",v:i[b]}),b++,f++):p[(b+1)*c+f]>=p[b*c+f+1]?d.push({t:"-",v:i[b++]}):d.push({t:"+",v:s[f++]});for(;b<i.length;)d.push({t:"-",v:i[b++]});for(;f<s.length;)d.push({t:"+",v:s[f++]})}return[...a,...d,...u]},ne=t=>t.split(/(\\s+)/).filter(e=>e!==""),re=(t,e)=>{let n=[];for(let o of oe(t.split(`\n`),e.split(`\n`))){let r=n[n.length-1];o.v.trim()&&(o.t==="="?r&&"same"in r?r.same.push(o.v):n.push({same:[o.v]}):r&&"ops"in r?r.ops.push(o):n.push({ops:[o]}))}return n.some(o=>"ops"in o)?n:[]},Ce=t=>`${t} unchanged paragraph${t===1?"":"s"}`,on=t=>`Show ${Ce(t)}`,so=(t,e)=>{let n=t.split(/\\s+/).filter(Boolean),o=new Set(e.split(/\\s+/).filter(Boolean));return n.length||o.size?n.filter(r=>o.has(r)).length/Math.max(n.length,o.size):1},Le=(t,e)=>{let n=[],o=0;for(let r=0;r<t.length;r++)for(let a=o;a<e.length;a++)if(so(t[r],e[a])>=.5){n.push([r,a]),o=a+1;break}return n},rn=t=>{let e=[];for(let n=0;n<t.length;){let o=[],r=[];for(;t[n]?.t==="=";)n++;for(;t[n]?.t==="-";)o.push(t[n++].v);for(;t[n]?.t==="+";)r.push(t[n++].v);let a=o.map(i=>({t:"-",words:[{v:i,changed:!0}]})),u=r.map(i=>({t:"+",words:[{v:i,changed:!0}]}));for(let[i,s]of Le(o,r)){let d=oe(ne(o[i]),ne(r[s]));a[i].words=d.filter(c=>c.t!=="+").map(c=>({v:c.v,changed:c.t==="-"})),u[s].words=d.filter(c=>c.t!=="-").map(c=>({v:c.v,changed:c.t==="+"}))}for(let i of[...a,...u])i.words=i.words.reduce((s,d)=>{let c=s[s.length-1];return c&&c.changed===d.changed?c.v+=d.v:s.push({...d}),s},[]);e.push(...a,...u)}return e};var se="Saving\\u2026 this can take up to a minute.",Te={pollMs:3e3,waitMs:18e4,runningMs:35e3},ao=Math.random().toString(36).slice(2)+Date.now().toString(36);async function io(t,e){let n=new TextEncoder().encode(`${ao}\n${t}\n${e}`),o=new Uint8Array(await crypto.subtle.digest("SHA-256",n));return Array.from(o.slice(0,16),r=>r.toString(16).padStart(2,"0")).join("")}var lo=t=>new Promise(e=>setTimeout(e,t));async function ae(t,e,{signal:n,onWait:o}={}){let r=await io(t,e),a=new URL(t);a.searchParams.set("write_key",r);let u=(b={},f)=>{let x=new URL(a);for(let[h,v]of Object.entries(b))x.searchParams.set(h,v);return fetch(x,{method:"POST",headers:{"Content-Type":"application/json"},body:e,signal:f})},i=null,s="network";try{i=await u({},n)}catch{n?.aborted&&(s="timeout")}if(i&&i.status<500&&i.status!==202)return i;if(o?.(),i&&i.status>=500&&(s=String(i.status)),!i||i.status>=500){let b=await u({fallback:s}).catch(()=>null);if(!b)throw new Error("network");if(b.status!==202)return b}let d=new URL("write-status",a);d.searchParams.set("write_key",r);let c=Date.now(),p=!1;for(;Date.now()-c<Te.waitMs;){await lo(Te.pollMs);let b=await fetch(d).catch(()=>null);if(!b)continue;if(b.status!==202)return b;(await b.json().catch(()=>null))?.state==="running"&&!p&&Date.now()-c>Te.runningMs&&(p=!0,await u({fallback:"timeout"}).catch(()=>null))}return new Response(JSON.stringify({error:"timeout",userMessage:"This is taking longer than it should. Nothing you wrote is lost: try again in a few minutes."}),{status:504,headers:{"Content-Type":"application/json"}})}var It=t=>(Array.isArray(t)?t:[]).filter(e=>!!e&&Number.isInteger(e.number)&&typeof e.date=="string"&&typeof e.url=="string"&&/^https:\\/\\/github\\.com\\//.test(e.url)&&["edit","note","suggestion"].includes(e.kind)&&Array.isArray(e.comments)),ie=t=>{let e=t;return e&&e.version===1&&Array.isArray(e.pages)&&Array.isArray(e.releases)?e:null},Ae=t=>{let e=t.replace(/^v/i,"");return/^\\d{4}$/.test(e)?`${e} edition`:`Release ${e}`},At=(t,e="",n={})=>{try{let o=new URL(t,"https://x.invalid"),r=new URL("history",o);r.searchParams.set("book",o.searchParams.get("book")??""),e&&r.searchParams.set("path",e);for(let[a,u]of Object.entries(n))r.searchParams.set(a,u);return t.startsWith("http")?r.toString():`${r.pathname}${r.search}`}catch{return""}},sn=(t,e)=>{let n=[t.who?.github,t.who?.name].filter(Boolean).map(r=>r.toLowerCase());return e.find(r=>r.role&&r.role!=="contributor"&&n.includes(r.who.toLowerCase()))?.role??"contributor"},St=t=>t.kind==="edit"?"Proposed edit":t.kind==="note"?t.paragraph?`Note on \\xB6${t.paragraph}`:"Note":"Suggestion",an=(t,e)=>{let n=[],o=[...e].sort((r,a)=>a.date.localeCompare(r.date));for(let r of t){for(;o.length&&o[0].date>=r.date;)n.push({release:o.shift()});n.push({entry:r})}for(let r of o)n.push({release:r});return n},ln=t=>t.pages.flatMap(e=>[...e.drafts.map(n=>({...n,state:"drafts",page:e})),...e.published.map(n=>({...n,state:"published",page:e}))]).sort((e,n)=>n.date.localeCompare(e.date)||e.page.title.localeCompare(n.page.title)||e.sha.localeCompare(n.sha)),dn=(t,e)=>(!t.page||e.page===t.page)&&(!t.person||e.who.toLowerCase()===t.person.toLowerCase())&&(!t.state||e.state===t.state),Ft=(t,e)=>`${t==="edit"||t==="pr"?"pr":"issue"}-${e}`,le=(t,e)=>{let n=typeof t=="string"?/^https:\\/\\/github\\.com\\/[^/]+\\/[^/]+\\/(issues|pull)\\/(\\d+)$/.exec(t):null;return n?`${e}/history#${Ft(n[1]==="pull"?"pr":"issue",Number(n[2]))}`:null},cn=t=>t.state==="open"?t.accepted?"drafts":"proposed":t.merged||t.reason==="completed"?"drafts":"declined";var Nt="tb-editor",un="tb-editor-style",He="tb-gh-identity",Se=10,Fe=500,co=7.5*60*60*1e3,pn=2e4,uo=200,zt=/^#edit(?:-(\\d+))?$/,po=t=>t?`#edit-${t}`:"#edit",bn={tbEditor:!0},bo="This page has changes waiting for review; you\\u2019re editing the latest draft.",l=(t,e={},...n)=>{let o=document.createElement(t);for(let[r,a]of Object.entries(e))a!==!1&&(r==="text"?o.textContent=String(a):r==="class"?o.className=String(a):o.setAttribute(r,a===!0?"":String(a)));for(let r of n)r&&o.append(r);return o},mn="http://www.w3.org/2000/svg",de=t=>{let e=document.createElementNS(mn,"svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","16"),e.setAttribute("height","16"),e.setAttribute("aria-hidden","true"),e.setAttribute("focusable","false");let n=document.createElementNS(mn,"path");return n.setAttribute("d",t),n.setAttribute("fill","currentColor"),e.append(n),e},gn="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z",hn="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",mo="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z",ho="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z",ue=t=>{let e=t?.userMessage,n=typeof e=="string"?e.trim():"";return n?n.slice(0,uo):null},go=()=>{try{let t=sessionStorage.getItem(He);if(!t)return null;let e=JSON.parse(t);return typeof e.token!="string"||Date.now()-e.at>co?null:e}catch{return null}},Me=t=>{try{t?sessionStorage.setItem(He,JSON.stringify(t)):sessionStorage.removeItem(He)}catch{}},Be=()=>{if(document.getElementById(un))return;let t=`#${Nt}`,e=l("style",{id:un});e.textContent=`\n${t} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; line-height: 1.5; }\n${t} [hidden] { display: none !important; }\n/* The annotation client\'s tab and buttons sit over the right edge, above everything:\n   keep the close button and the text clear of them, as the page does. */\nhtml.tb-hypothesis-on ${t} { padding-right: var(--tb-annotation-gutter, 2.5rem); box-sizing: border-box; }\n${t} button { font: inherit; cursor: pointer; }\n${t} button:disabled { cursor: default; opacity: 0.55; }\n${t} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n${t} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;\n  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }\n${t} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }\n${t} .tb-ed-sep { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }\n${t} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }\n${t} .tb-ed-x { border: 0; background: none; color: var(--tb-muted, #6E6E73); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }\n${t} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }\n${t} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }\n${t} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-ed-gate { max-width: 34rem; margin: 2rem auto; }\n${t} .tb-ed-gate h2 { margin: 0 0 0.5rem; font-size: 1.15rem; font-weight: 600; }\n${t} .tb-ed-gate p { margin: 0 0 1rem; }\n${t} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;\n  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }\n${t} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }\n${t} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;\n  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }\n${t} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);\n  color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }\n${t} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: var(--tb-on-accent, #FFFFFF); }\n${t} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }\n${t} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-mono, monospace);\n  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }\n${t} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;\n  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }\n${t} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }\n${t} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }\n${t} .tb-ed-panel { padding: 1rem; }\n${t} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }\n${t} .tb-ed-preview img { max-width: 100%; }\n${t} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-hint { margin: 0.3rem 0 0; font-size: 0.85em; }\n${t} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }\n${t} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hunk:first-child { border-top: 0; }\n${t} .tb-ed-same + .tb-ed-hunk, ${t} .tb-ed-hunk + .tb-ed-same { border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }\n${t} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-muted, #6E6E73); user-select: none; }\n${t} .tb-ed-line > span:last-child { padding-right: 0.75rem; }\n/* Mixed into the page\'s own background, as the History panel\'s, so they hold in dark\n   mode (fixed light greens put light text on a light ground there: batch 2b). */\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-ed-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;\n  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }\n${t} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;\n  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }\n${t} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n${t} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-ed-field { margin-bottom: 0.9rem; }\n${t} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n${t} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-field input, ${t} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);\n  font: inherit; font-size: 1rem; line-height: 1.45; }\n${t} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }\n${t} [aria-invalid="true"] { border-color: #B3261E !important; }\n${t} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }\n${t} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }\n${t} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }\n${t} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }\n${t} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline;\n  min-height: 24px; min-width: 24px; } /* a 24px target at least (batch 2b) */\n${t} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }\n${t} .tb-ed-what code, ${t} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;\n  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }\n${t} .tb-ed-result:focus { outline: none; }\n${t} .tb-ed-result p { margin: 0 0 0.75rem; }\n${t} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n@media (max-width: 768px) {\n  ${t} .tb-ed-head, ${t} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-actions { width: 100%; justify-content: flex-end; }\n  ${t} .tb-ed-scrim { padding: 0; align-items: stretch; }\n  ${t} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }\n}\n@media print { ${t} { display: none !important; } }\n`,document.head.append(e)},fo=t=>t.replace(/^---\\n[\\s\\S]*?\\n---\\n?/,"").replace(/!\\[\\[[^\\]]*\\]\\]/g,"").replace(/\\[\\[([^\\]|]*)\\|([^\\]]*)\\]\\]/g,"$2").replace(/\\[\\[([^\\]]*)\\]\\]/g,(e,n)=>n.split("/").pop()).replace(/\\s\\^[A-Za-z0-9-]+\\s*$/gm,"").replace(/%%[\\s\\S]*?%%/g,""),yo="script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset",Re=t=>{let e=new DOMParser().parseFromString(t,"text/html");e.querySelectorAll(yo).forEach(o=>o.remove()),e.querySelectorAll("*").forEach(o=>{for(let r of Array.from(o.attributes)){let a=r.value.trim().toLowerCase();(r.name.startsWith("on")||(r.name==="href"||r.name==="src")&&/^(javascript|data|vbscript):/.test(a))&&o.removeAttribute(r.name)}o.tagName==="A"&&(o.setAttribute("target","_blank"),o.setAttribute("rel","noopener noreferrer"))});let n=document.createDocumentFragment();return n.append(...Array.from(e.body.childNodes)),n},wo=(t,e)=>{let n=l("div",{class:"tb-ed-diff"}),o=re(t,e);if(!o.length)return n.append(l("p",{class:"tb-ed-panel tb-ed-muted",text:"No changes yet."})),n;let r=(a,u)=>{let i=l("div",{class:`tb-ed-line${a==="-"?" tb-ed-del":a==="+"?" tb-ed-add":""}`}),s=l("span");return typeof u=="string"?s.textContent=u||" ":s.append(...u),i.append(l("span",{"aria-hidden":"true",text:a==="="?" ":a==="-"?"\\u2212":"+"}),s),i};for(let a of o){if("same"in a){let i=l("details",{class:"tb-ed-same"},l("summary",{text:Ce(a.same.length)}));i.append(...a.same.map(s=>r("=",s))),n.append(i);continue}let u=l("div",{class:"tb-ed-hunk"});for(let i of rn(a.ops))u.append(r(i.t,i.words.map(s=>s.changed?l(i.t==="-"?"del":"ins",{text:s.v}):document.createTextNode(s.v))));n.append(u)}return n},ce=null,fn=()=>ce?.(),pe=t=>{if(ce)return;Be();let e=document.body.style.overflow,n=new URL(t.endpoint,location.href).origin,o=new URL("github-auth",new URL(t.endpoint,location.href)).toString(),r=t.path.split("/"),a=r.pop(),u=t.para&&Number(t.para.getAttribute("data-pnum"))||0,i=t.mode,s="",d="",c="drafts",p=null,b="",f=go(),x=!1,h=!1,v=null,R=null,F=!1,g=window.scrollY,T=po(i==="paragraph"?u:0),$=l("div",{id:Nt,role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-title",tabindex:-1}),H=l("span",{class:"tb-ed-pill"},de(hn),l("span",{text:c})),M=l("div",{class:"tb-ed-crumbs",id:"tb-ed-title"},de(mo));M.append(l("span",{text:t.repo.split("/").pop()||t.repo}));for(let w of r)M.append(l("span",{class:"tb-ed-sep",text:"/"}),l("span",{text:w}));M.append(l("span",{class:"tb-ed-sep",text:"/"}),l("span",{class:"tb-ed-file",text:a}));let _=l("span",{class:"tb-ed-muted",text:u?` \\xB7 \\xB6${u}`:""});M.append(_,H);let q=l("button",{type:"button",class:"tb-ed-x","aria-label":"Close the editor",text:"\\xD7"}),z=l("div",{class:"tb-ed-head"},M,q),Z=l("div",{class:"tb-ed-discard",role:"alert",hidden:!0},l("span",{text:"Discard your changes?"})),X=l("button",{type:"button",class:"tb-ed-btn",text:"Discard"}),J=l("button",{type:"button",class:"tb-ed-btn tb-ed-primary",text:"Keep editing"});Z.append(X,J);let V=l("div",{class:"tb-ed-main"}),Q=l("div",{class:"tb-ed-inner"}),ct=l("p",{class:"tb-ed-note",hidden:!0}),st=l("p",{class:"tb-ed-note",hidden:!0,text:bo}),at=l("p",{class:"tb-ed-note tb-ed-pending",hidden:!0}),m=l("p",{class:"tb-ed-muted",role:"status",text:"Loading the page\\u2019s source\\u2026"}),y=l("div",{class:"tb-ed-gate",hidden:!0});Q.append(st,at,ct,m,y),V.append(Q),$.append(z,Z,V);let E=["Edit","Preview","Changes"],A=l("div",{role:"tablist","aria-label":"Editor view"}),D=E.map((w,C)=>l("button",{type:"button",role:"tab",id:`tb-ed-tab-${C}`,"aria-controls":`tb-ed-panel-${C}`,"aria-selected":C===0?"true":"false",tabindex:C===0?0:-1,text:w==="Edit"?"Edit":w==="Preview"?"Preview":"Changes"}));A.append(...D);let N=l("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),B=l("button",{type:"button",class:"tb-ed-btn tb-ed-primary",disabled:!0,text:"Propose changes\\u2026"}),O=l("div",{class:"tb-ed-bar"},A,l("div",{class:"tb-ed-actions"},N,B)),U=l("textarea",{class:"tb-ed-text",spellcheck:"true","aria-label":"Markdown source",wrap:"soft"}),P=l("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),$t=l("pre",{class:"tb-ed-ctx","aria-hidden":"true",hidden:!0}),ht=[l("div",{role:"tabpanel",id:"tb-ed-panel-0","aria-labelledby":"tb-ed-tab-0"},P,U,$t),l("div",{role:"tabpanel",id:"tb-ed-panel-1","aria-labelledby":"tb-ed-tab-1",tabindex:0,hidden:!0}),l("div",{role:"tabpanel",id:"tb-ed-panel-2","aria-labelledby":"tb-ed-tab-2",tabindex:0,hidden:!0})],Ht=l("div",{class:"tb-ed-box"},O,...ht),it=l("p",{class:"tb-ed-foot"}),yt=()=>U.value,lt=()=>b,Pt=w=>{D.forEach((C,S)=>{C.setAttribute("aria-selected",S===w?"true":"false"),C.tabIndex=S===w?0:-1,ht[S].hidden=S!==w}),w===1&&_t(),w===2&&(ht[2].textContent="",ht[2].append(wo(lt(),yt())))};D.forEach((w,C)=>{w.addEventListener("click",()=>Pt(C)),w.addEventListener("keydown",S=>{let I=S.key==="ArrowRight"?1:S.key==="ArrowLeft"?-1:0;if(!I)return;S.preventDefault();let G=(C+I+D.length)%D.length;Pt(G),D[G].focus()})});let wt=0,_t=()=>{let w=ht[1];w.textContent="",w.className="tb-ed-panel tb-ed-preview";let C=l("p",{class:"tb-ed-muted",text:"Rendering\\u2026"});w.append(C);let S=++wt;fetch("https://api.github.com/markdown",{method:"POST",headers:{Accept:"text/html","Content-Type":"application/json"},body:JSON.stringify({text:fo(yt()),mode:"markdown"})}).then(I=>I.ok?I.text():Promise.reject(new Error(String(I.status)))).then(I=>{S===wt&&(w.textContent="",w.append(Re(I)))}).catch(()=>{S===wt&&(C.textContent="Preview isn\\u2019t available right now. Your text is safe; the Changes tab still works.")})};U.addEventListener("input",()=>{h=yt()!==b,B.disabled=!h});let nt=l("div",{class:"tb-ed-scrim",hidden:!0}),gt=l("div",{class:"tb-ed-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"tb-ed-dlg-title",tabindex:-1});nt.append(gt),$.append(nt);let Bt=(w,C,S,I=!1)=>{S.id=w;let G=l("p",{class:"tb-ed-err",id:`${w}-err`}),K=l("label",{for:w,text:C},I?l("span",{class:"tb-ed-opt",text:" (optional)"}):null);return{wrap:l("div",{class:"tb-ed-field"},K,S,G),control:S,err:G}},tt=Bt("tb-ed-msg","What did you change, and why?",l("textarea",{rows:2,maxlength:Fe,autocomplete:"off","aria-describedby":"tb-ed-msg-hint"}));tt.wrap.append(l("p",{class:"tb-ed-muted tb-ed-hint",id:"tb-ed-msg-hint",text:"Signed in with GitHub, you\'re notified there when the authors accept or decline it."}));let Lt=document.querySelector(".tb-page-controls")?.dataset.privacy,et=Bt("tb-ed-desc","Extended description",l("textarea",{rows:3,maxlength:5e3}),!0),Tt=l("div",{class:"tb-ed-who"}),Rt=l("div",{class:"tb-ed-what"},de(hn)),qt=l("span");Rt.append(qt);let Ut=l("button",{type:"button",class:"tb-ed-btn",text:"Cancel"}),xt=l("button",{type:"submit",class:"tb-ed-btn tb-ed-primary",text:"Propose changes"}),vt=l("form",{novalidate:!0},l("h2",{id:"tb-ed-dlg-title",text:"Propose changes"}),tt.wrap,et.wrap,Tt,Rt,Lt?l("p",{class:"tb-ed-muted tb-ed-hint tb-ed-published"},"Your proposal is published openly on GitHub, under the book\'s licence. ",l("a",{href:Lt,text:"How contributions are handled"})):null,l("div",{class:"tb-ed-row"},Ut,xt)),L=l("div",{class:"tb-ed-result",tabindex:-1,hidden:!0});gt.append(vt,L);let j=()=>{if(Tt.textContent="",f){let w=l("img",{src:`https://avatars.githubusercontent.com/u/${f.id}?s=56`,alt:""}),C=l("button",{type:"button",class:"tb-ed-link",text:"Sign out"});C.addEventListener("click",()=>{f=null,Me(null),j()}),Tt.append(w,l("span",{},"Signed in as ",l("strong",{text:`@${f.login}`})," \\u2014 this edit will be credited to your GitHub account."),C)}else Tt.append(Y(),l("span",{class:"tb-ed-muted",text:"to send your change. What you wrote is kept."}))},Y=()=>{let w=l("button",{type:"button",class:"tb-ed-btn tb-ed-gh"},de(ho),"Sign in with GitHub");return w.addEventListener("click",()=>rt(w)),w},ut=()=>{y.textContent="";let w=Y(),C=l("p",{class:"tb-ed-muted"},"No GitHub account? ");if(t.suggest){let S=l("button",{type:"button",class:"tb-ed-link",text:"Suggest an edit"});S.addEventListener("click",()=>{te(),t.suggest()}),C.append(S," instead: it needs no account.")}else C.append("Use \\u201CSuggest an edit\\u201D under the page title instead: it needs no account.");y.append(l("h2",{text:"Sign in to edit"}),l("p",{text:"Editing a page needs a GitHub account, so your change is credited to you. Signing in opens a GitHub window; you come straight back here."}),l("p",{},w),C),m.hidden=!0,y.hidden=!1,w.focus()},Et=w=>{if(w.origin!==n)return;let C=w.data;if(!(!C||C.type!=="tb-github-identity")){if(v=null,C.error||typeof C.token!="string"||typeof C.login!="string"){t.track("github_signin",{outcome:C.error==="denied"?"cancelled":"error"});return}if(f={token:C.token,login:C.login,id:Number(C.id)||0,name:C.name??"",at:Date.now()},Me(f),t.track("github_signin",{outcome:"success"}),!F)return Qe();j(),nt.hidden||tt.control.focus()}},rt=w=>{let C=`${o}?origin=${encodeURIComponent(location.origin)}`;v=window.open(C,"tb-github-signin","popup,width=560,height=720"),!v&&!w.parentElement?.querySelector(".tb-ed-err")&&w.after(l("p",{class:"tb-ed-err",role:"alert",text:"Your browser blocked the sign-in window. Allow pop-ups for this site, then try again."}))};window.addEventListener("message",Et);let ot=(w,C)=>{w.control.setAttribute("aria-invalid","true"),w.control.setAttribute("aria-describedby",w.err.id),w.err.textContent=C},pt=w=>{w.control.removeAttribute("aria-invalid"),w.control.removeAttribute("aria-describedby"),w.err.textContent=""};tt.control.addEventListener("input",()=>pt(tt));let bt=()=>{qt.textContent="",qt.append("This creates a new branch and opens a proposal to merge it into ",l("code",{text:c}),". Nothing changes in the book until an editor accepts it."),j(),vt.hidden=!1,L.hidden=!0,nt.hidden=!1,tt.control.focus()},ft=()=>{nt.hidden=!0,B.focus()};B.addEventListener("click",bt),Ut.addEventListener("click",ft),nt.addEventListener("mousedown",w=>{w.target===nt&&!x&&ft()});let $e=(w,C,S,I)=>{if(!$.isConnected)return;L.textContent="",L.append(l("h2",{text:w}),l("p",{text:C}));let G=le(S?.href,location.origin);G&&L.append(l("p",{class:"tb-ed-follow"},"Follow your suggestion: ",l("a",{href:G,text:G}))),S&&L.append(l("p",{},l("a",{href:S.href,target:"_blank",rel:"noopener",text:S.text})));let K=l("button",{type:"button",class:`tb-ed-btn${I?" tb-ed-primary":""}`,text:I?"Back to my edit":"Close"});K.addEventListener("click",I?()=>{L.hidden=!0,vt.hidden=!1,xt.focus()}:()=>Qt(!0)),L.append(l("div",{class:"tb-ed-row"},K)),vt.hidden=!0,L.hidden=!1,L.focus()};vt.addEventListener("submit",w=>{if(w.preventDefault(),x)return;let C=null;pt(tt);let S=tt.control.value.trim().length;if(S<Se||S>Fe?(ot(tt,S<Se?`Please say what you changed and why, in at least ${Se} characters.`:`Please keep it under ${Fe} characters.`),C=tt.control):f||(C=Tt.querySelector("button")),C){C.focus();return}let I={mode:i,path:t.path,baseSha:d,title:i==="paragraph"&&u?`Edit \\xB6${u} of ${a}`:`Update ${a}`,summary:tt.control.value.trim().replace(/\\s+/g," "),description:et.control.value.trim()};i==="page"?I.content=yt():(I.startLine=p.start,I.original=p.text,I.replacement=yt(),u&&(I.paragraph=u)),I.identity=f.token,x=!0,xt.disabled=!0,xt.textContent="Proposing\\u2026";let G=R=new AbortController,K=setTimeout(()=>G.abort(),pn);ae(t.endpoint,JSON.stringify(I),{signal:G.signal,onWait:()=>{clearTimeout(K),xt.textContent=se}}).then(async W=>{let ee=null;try{ee=await W.json()}catch{ee=null}if(W.status===401&&f&&(f=null,Me(null),j()),!W.ok)throw Object.assign(new Error(String(W.status)),{userMessage:ue(ee)});return ee}).then(W=>{h=!1,W.fallback&&typeof W.issueUrl=="string"?(t.track("page_edit_submitted",{outcome:"issue",mode:i}),$e("Sent to the editors","The page changed while you were editing, so your change couldn\\u2019t be applied automatically. We\\u2019ve sent it to the editors as a suggestion instead, with exactly what you changed.",{href:W.issueUrl,text:"Follow it on GitHub"},!1)):(t.track("page_edit_submitted",{outcome:"proposed",mode:i}),$e("Proposal opened","Thank you. An editor will review your change and merge it into the book, or reply to it.",typeof W.prUrl=="string"?{href:W.prUrl,text:"View your proposal on GitHub"}:null,!1))}).catch(W=>{t.track("page_edit_submitted",{outcome:"error",mode:i}),$e("That did not go through",W&&W.userMessage||"Something went wrong sending your change \\u2014 nothing was lost. Try again in a moment.",null,!0)}).finally(()=>{clearTimeout(K),R===G&&(R=null),x=!1,xt.disabled=!1,xt.textContent="Propose changes"})});let Jn=w=>Array.from(w.querySelectorAll("a[href], button, input, textarea, select, [tabindex]")).filter(C=>!C.disabled&&C.tabIndex>=0&&!C.closest("[hidden]")),Ze=w=>{if(w.key==="Escape"){w.preventDefault(),nt.hidden?jt():x||(!L.hidden&&vt.hidden&&!h?Qt(!0):ft());return}if(w.key!=="Tab")return;let C=nt.hidden?$:gt,S=Jn(C);if(!S.length){w.preventDefault(),C.focus();return}let I=S.indexOf(document.activeElement);(w.shiftKey?I<=0:I===-1||I===S.length-1)&&(w.preventDefault(),S[w.shiftKey?S.length-1:0].focus())},Xe=w=>{h&&(w.preventDefault(),w.returnValue="")},Qt=(w=!1)=>{if(!w&&h)return jt();h=!1,zt.test(location.hash)?history.back():te()},Je=()=>{if(!zt.test(location.hash)){if(h)return history.pushState(bn,"",T),jt();te()}},te=()=>{ce=null,R?.abort(),v?.close(),document.removeEventListener("keydown",Ze,!0),window.removeEventListener("message",Et),window.removeEventListener("beforeunload",Xe),window.removeEventListener("popstate",Je),$.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus({preventScroll:!0}),window.scrollTo(0,g)},jt=()=>{if(!h)return Qt(!0);Z.hidden=!1,J.focus()};X.addEventListener("click",()=>Qt(!0)),J.addEventListener("click",()=>{Z.hidden=!0,U.focus()}),q.addEventListener("click",jt),N.addEventListener("click",jt),document.addEventListener("keydown",Ze,!0),window.addEventListener("beforeunload",Xe),window.addEventListener("popstate",Je),ce=te,t.push!==!1&&history.pushState(bn,"",T),document.body.style.overflow="hidden",document.body.append($),q.focus(),t.track("page_editor_opened",{mode:i});let Qn=w=>{m.textContent="",m.removeAttribute("class"),m.append(w+" ",l("a",{href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"Open it on GitHub instead \\u2197"}))},Qe=()=>{if(!f)return ut();F=!0,y.hidden=!0,m.hidden=!1;let w=new AbortController,C=setTimeout(()=>w.abort(),pn);fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}`,{signal:w.signal}).then(async S=>{let I=null;try{I=await S.json()}catch{I=null}if(!S.ok)throw Object.assign(new Error(String(S.status)),{userMessage:ue(I)});return I}).then(S=>{if($.isConnected){if(typeof S?.content!="string"||typeof S.sha!="string")throw new Error("bad source");if(s=S.content,d=S.sha,c=typeof S.branch=="string"?S.branch:c,H.lastChild.textContent=c,st.hidden=!t.builtBlob||t.builtBlob===d,i==="paragraph"&&(p=t.para?nn(s,t.para.textContent??"",u):null,p||(i="page",_.textContent="",ct.textContent=`We couldn\\u2019t find \\xB6${u} on its own in the page\\u2019s source (it may have changed since this page was published), so here is the whole page.`,ct.hidden=!1)),i==="paragraph"&&p){Ht.classList.add("tb-ed-para");let I=s.split(`\n`),G=p.text.split(`\n`).length,K=I.slice(Math.max(0,p.start-3),p.start).join(`\n`).trim(),W=I.slice(p.start+G,p.start+G+3).join(`\n`).trim();P.textContent=K.length>220?`\\u2026${K.slice(-220)}`:K,$t.textContent=W.length>220?`${W.slice(0,220)}\\u2026`:W,P.hidden=!K,$t.hidden=!W,b=p.text,it.textContent="You\\u2019re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in.",to(p.text)}else b=s,it.textContent="This is the page\\u2019s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";U.value=b,m.remove(),Q.append(Ht,it),U.setSelectionRange(0,0),U.focus()}}).catch(S=>{$.isConnected&&Qn(S&&S.userMessage||"We couldn\\u2019t load this page\\u2019s source just now.")}).finally(()=>clearTimeout(C))},to=async w=>{try{let S=await(await fetch(`${t.endpoint}?path=${encodeURIComponent(t.path)}&pending=1`)).json(),I=await xo(w),G=(S.pending??[]).filter(K=>typeof K.url=="string"&&/^https:\\/\\/github\\.com\\//.test(K.url)&&(K.original?K.original===I:K.paragraph===u));if(!G.length||!$.isConnected)return;at.replaceChildren(`${G.length} pending change${G.length===1?"":"s"} on this paragraph \\xB7 `,...G.flatMap((K,W)=>[...W?[", "]:[],l("a",{href:K.url,target:"_blank",rel:"noopener",text:G.length===1?"view it":`view ${W+1}`})])),at.hidden=!1}catch{}};Qe()};async function xo(t){let e=new TextEncoder().encode(t.replace(/\\r\\n/g,`\n`).trim()),n=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(n)].map(o=>o.toString(16).padStart(2,"0")).join("").slice(0,16)}var Mt=t=>{let e=/^---\\r?\\n[\\s\\S]*?\\r?\\n---[ \\t]*(?:\\r?\\n|$)/.exec(t);return e?t.slice(e[0].length):t},be=(t,e)=>ne(t).map(n=>({v:n,s:{...e}})),Dt=(t,e={})=>{let n=[],o={...e},r="",a=()=>{r&&n.push(...be(r,o)),r=""},u=i=>!!i&&/[\\p{L}\\p{N}]/u.test(i);for(let i=0;i<t.length;){let s=t.slice(i),d;if(s[0]==="\\\\"&&s.length>1)r+=s[1],i+=2;else if(d=/^`([^`]+)`/.exec(s))a(),n.push(...be(d[1],{...o,code:!0})),i+=d[0].length;else if(d=/^!?\\[\\[([^\\]|#]*)(?:#[^\\]|]*)?(?:\\|([^\\]]*))?\\]\\]/.exec(s)){a();let c=d[2]??d[1].split("/").pop()??d[1];n.push(...be(c,{...o,link:!0})),i+=d[0].length}else if(d=/^!\\[([^\\]]*)\\]\\([^)]*\\)/.exec(s))a(),n.push(...be(`(image${d[1]?`: ${d[1]}`:""})`,{...o,i:!0})),i+=d[0].length;else if(d=/^\\[\\^([^\\]]+)\\]/.exec(s))a(),n.push({v:d[1],s:{...o,sup:!0}}),i+=d[0].length;else if(d=/^\\[([^\\]]+)\\]\\([^)]*\\)/.exec(s))a(),n.push(...Dt(d[1],{...o,link:!0})),i+=d[0].length;else if(d=/^<\\/?[a-zA-Z][^>]*>/.exec(s))a(),i+=d[0].length;else if(s.startsWith("**")||s.startsWith("__")){let c=s.slice(0,2);o.b||t.indexOf(c,i+2)>i+2?(a(),o.b=!o.b):r+=c,i+=2}else(s[0]==="*"||s[0]==="_")&&!(s[0]==="_"&&u(t[i-1])&&u(t[i+1]))?(o.i||t.indexOf(s[0],i+1)>i+1?(a(),o.i=!o.i):r+=s[0],i+=1):(r+=s[0],i+=1)}return a(),n},Gt=t=>{let e;return t.trim()?/^\\s{0,3}([-*_])(\\s*\\1){2,}\\s*$/.test(t)?{kind:"rule",runs:[]}:(e=/^\\s{0,3}(#{1,6})\\s+(.*?)\\s*#*\\s*$/.exec(t))?{kind:`h${e[1].length}`,runs:Dt(e[2])}:(e=/^\\s*([-*+]|\\d+[.)])\\s+(?:\\[[ xX]\\]\\s+)?(.*)$/.exec(t))?{kind:"li",marker:/\\d/.test(e[1])?e[1].replace(")","."):"\\u2022",runs:Dt(e[2])}:(e=/^\\s{0,3}>\\s?(.*)$/.exec(t))?{kind:"quote",runs:Dt(e[1])}:(e=/^\\[\\^([^\\]]+)\\]:\\s*(.*)$/.exec(t))?{kind:"note",marker:e[1],runs:Dt(e[2])}:{kind:"p",runs:Dt(t)}:{kind:"blank",runs:[]}},yn=t=>{let e=document.createTextNode(t.v);return t.s.code&&(e=l("code",{},e)),t.s.i&&(e=l("em",{},e)),t.s.b&&(e=l("strong",{},e)),t.s.link&&(e=l("span",{class:"tb-rd-link"},e)),t.s.sup&&(e=l("sup",{},e)),e},Wt=(t,e)=>{let n=e.some(a=>a.t!=="=")?e.every(a=>a.t!=="+")?" tb-ed-del":e.every(a=>a.t!=="-")?" tb-ed-add":" tb-ed-mod":"",o=l("div",{class:"tb-rd-text"});t.marker&&o.append(l("span",{class:"tb-rd-marker",text:t.marker}));let r=null;for(let{run:a,t:u}of e){if(u==="="){r=null,o.append(yn(a));continue}let i=u==="-"?"DEL":"INS";r?.tagName!==i&&(r=l(u==="-"?"del":"ins"),o.append(r)),r.append(yn(a))}return l("div",{class:`tb-rd-line tb-rd-${t.kind}${n}`},o)},me=(t,e)=>t.map(n=>({run:n,t:e})),vo=(t,e)=>{let n=t.runs,o=e.runs,r=[],a=0,u=0;for(let i of oe(n.map(s=>s.v),o.map(s=>s.v)))r.push(i.t==="-"?{run:n[a++],t:"-"}:i.t==="+"?{run:o[u++],t:"+"}:(a++,{run:o[u++],t:"="}));return Wt(e,r)},Kt=(t,e)=>{let n=l("div",{class:"tb-ed-diff tb-rd"}),o=Mt(t),r=Mt(e),a=re(o,r);if(!a.length)return n.append(l("p",{class:"tb-ed-panel tb-ed-muted",text:o!==r||t===e?"No changes to the text.":"Only the page\\u2019s details (such as its title or topic) changed; the text is the same."})),n;for(let u of a){if("same"in u){let s=l("details",{class:"tb-rd-same"},l("summary",{text:on(u.same.length)}));for(let d of u.same){let c=Gt(d);s.append(Wt(c,me(c.runs,"=")))}n.append(s);continue}let i=u.ops;for(let s=0;s<i.length;){let d=i[s];if(d.t==="="){let h=Gt(d.v);n.append(Wt(h,me(h.runs,"="))),s++;continue}let c=[],p=[];for(;i[s]?.t==="-";)c.push(i[s++].v);for(;i[s]?.t==="+";)p.push(i[s++].v);let b=new Map(Le(c,p).map(([h,v])=>[v,h])),f=h=>{let v=Gt(c[h]);n.append(Wt(v,me(v.runs,"-")))},x=0;for(p.forEach((h,v)=>{let R=Gt(h),F=b.get(v);if(F===void 0)return void n.append(Wt(R,me(R.runs,"+")));for(;x<F;x++)f(x);n.append(vo(Gt(c[F]),R)),x=F+1});x<c.length;x++)f(x)}}return n};var Eo="No reason was recorded.",Yt=t=>t.kind==="edit"?"Declined proposed edit":t.kind==="note"?t.paragraph?`Declined note on \\xB6${t.paragraph}`:"Declined note":"Declined suggestion",Ie=t=>{let e=Date.parse(t);return Number.isFinite(e)?new Date(e).toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"}):t},ko=async(t,e)=>{let n=await fetch(t,{signal:e,credentials:"omit"}),o=await n.json().catch(()=>null);if(!n.ok)throw Object.assign(new Error(`HTTP ${n.status}`),{userMessage:o?.userMessage});return o},he=(t,e)=>{let n=l("div",{class:"tb-dc"});n.append(l("div",{class:"tb-dc-who",text:`Proposed by ${t.who?.name??"a reader"} on ${Ie(t.proposed)}. Declined${t.decliner?` by ${t.decliner}`:""} on ${Ie(t.date)}.`}),l("blockquote",{class:`tb-dc-reason${t.reason?"":" tb-dc-none"}`},l("span",{class:"tb-dc-label",text:"Why it was declined: "}),t.reason??Eo));let o=l("div",{class:"tb-hi-actions tb-dc-actions"}),r=l("div",{class:"tb-hi-diff tb-dc-diff",hidden:!0});if(t.kind==="edit"&&e){let a=l("button",{type:"button","aria-pressed":"false",text:"Show changes"});a.addEventListener("click",()=>{if(!r.hidden){r.hidden=!0,a.setAttribute("aria-pressed","false");return}a.setAttribute("aria-pressed","true"),r.hidden=!1,r.textContent="",r.append(l("p",{class:"tb-ed-muted",role:"status",text:"Loading what was proposed\\u2026"}));let u=new AbortController,i=setTimeout(()=>u.abort(),2e4);ko(At(e,"",{change:String(t.number)}),u.signal).then(s=>{let d=s?.files??[];r.textContent="",d.length||r.append(l("p",{class:"tb-ed-muted",text:"The proposal changed no page."}));for(let c of d)r.append(Kt(typeof c.before=="string"?c.before:"",typeof c.after=="string"?c.after:""))}).catch(s=>{r.textContent="",r.append(l("p",{class:"tb-ed-note",role:"alert",text:s?.userMessage||"What was proposed couldn\\u2019t be loaded just now."}))}).finally(()=>clearTimeout(i))}),o.append(a)}if(o.append(l("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",text:`See #${t.number} on GitHub \\u2197`})),n.append(o,r),t.comments.length){let a=l("ol",{class:"tb-dc-comments","aria-label":"Comments from the book\'s people"});for(let u of t.comments)a.append(l("li",{class:"tb-dc-comment"},l("div",{class:"tb-dc-cmeta",text:`${u.name} \\xB7 ${Ie(u.date)}`}),l("p",{class:"tb-dc-ctext",text:u.text})));n.append(l("div",{class:"tb-dc-chead",text:"Comments from the book\\u2019s people"}),a)}return n},ge=t=>`\n${t} .tb-dc { margin-top: 0.4rem; }\n${t} .tb-dc p, ${t} .tb-dc-who, ${t} .tb-dc-cmeta { margin: 0.15rem 0; overflow-wrap: anywhere; }\n${t} .tb-dc-who, ${t} .tb-dc-cmeta, ${t} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }\n${t} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }\n${t} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }\n${t} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }\n${t} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }\n${t} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-dc-ctext { white-space: pre-line; }\n${t} .tb-hi-state.tb-hi-declined, ${t} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }\n`;var wn={author:"Author",editor:"Editor",contributor:"Contributor"},fe=t=>{if(!t||!(t in wn))return null;let e=document.createElement("span");return e.className="tb-role",e.dataset.role=t,e.textContent=wn[t],e};var xn="tb-history-style",$o=30,vn=2e4,En="a reader",Ne=t=>`\n/* What changed (rich-diff.ts): the text as the page shows it, removed and added\n   lines and words marked. The colours mix into the page\'s own background, so\n   they hold in dark mode. */\n${t} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;\n  color: var(--tb-ink, #2B2B2B); }\n/* Old and new as track changes, as the authors\' review shows them: one paragraph, removed words struck in red, added in green. */\n${t} .tb-rd-line { padding: 0.1rem 1rem; }\n${t} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }\n${t} .tb-rd-blank { min-height: 0.6rem; padding: 0; }\n${t} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }\n${t} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }\n${t} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }\n${t} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }\n${t} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }\n${t} .tb-rd-note { font-size: 0.9rem; }\n${t} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }\n${t} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }\n/* Not colour alone: removed words struck, added words underlined, and named for screen readers. */\n${t} :is(del, ins)::before, ${t} :is(del, ins)::after { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n${t} del::before { content: " [removed: "; }\n${t} ins::before { content: " [added: "; }\n${t} :is(del, ins)::after { content: "] "; }\n${t} .tb-rd-same > summary { padding: 0.3rem 1rem; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; cursor: pointer; }\n${t} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }\n${t} .tb-rd del, ${t} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }\n${t} .tb-rd ins, ${t} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: underline; text-underline-offset: 0.15em; border-radius: 2px; }\n${t} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }\n${t} .tb-hi-actions button, ${t} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);\n  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;\n  text-decoration: none; cursor: pointer; }\n${t} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }\n`,Co=()=>{if(document.getElementById(xn))return;let t=`#${Nt}.tb-hi`,e=l("style",{id:xn});e.textContent=`\n${t} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);\n  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);\n  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }\n${t} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }\n${t} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }\n${t} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-page::before { content: "\\u203A"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }\n${t} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;\n  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-x { font-size: 1.25rem; line-height: 1; }\n${t} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }\n${t} .tb-ed-inner { max-width: 44rem; }\n${t} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n${t} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;\n  background: none; color: inherit; text-align: left; }\n${t} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }\n${t} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }\n${t} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }\n${t} .tb-hi-back { margin: 0 0 1rem -0.6rem; }\n${t} .tb-hi-head { margin: 0 0 1.25rem; }\n${t} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;\n  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }\n${t} .tb-hi-head p { margin: 0; }\n${t} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }\n${t} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }\n${t} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;\n  color: var(--tb-muted, #6E6E73); font-weight: 600; }\n${t} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }\n${Ne(t)}\n${ge(t)}\n${t} .tb-ed-preview { font-family: var(--tb-font-text, serif); }\n${t} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }\n/* The timeline (batch 2a): bands for what is being edited and what is published,\n   releases as milestones, each version with its actions. One column at any width;\n   diffs wrap. */\n${t} .tb-hi-band { margin: 0 0 1.75rem; }\n${t} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }\n${t} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }\n${t} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;\n  background: var(--tb-bg-soft, #F7F7F5); }\n${t} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-entry:last-child { border-bottom: 0; }\n${t} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;\n  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }\n${t} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);\n  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }\n${t} .tb-hi-release::before, ${t} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }\n${t} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;\n  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }\n${t} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }\n${t} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }\n@media (max-width: 768px) {\n  ${t} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }\n  ${t} .tb-ed-main { padding: 1rem 0.75rem 2rem; }\n  ${t} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\n}\n`,document.head.append(e)},Lo=(t,e)=>{let n=t.replace(/\\s*\\(#\\d+\\)\\s*$/,"").trim(),o=/^Edit \xB6(\\d+) of \\S+$/.exec(n);return o?`Paragraph ${o[1]} changed`:/^(Update|Edit) \\S+\\.md$/i.test(n)?"Text changed":/^(Create|Add) \\S+\\.md$/i.test(n)||e&&/a new book from request/i.test(n)?"First published":n||(e?"First published":"Changed (no description given)")},kt=t=>{let e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric",.../^\\d{4}-\\d{2}-\\d{2}$/.test(t)?{timeZone:"UTC"}:{}})},mt=async(t,e)=>{let n=await fetch(t,{signal:e,headers:{Accept:"application/json"}}),o=null;try{o=await n.json()}catch{}if(!n.ok){let r=new Error(`HTTP ${n.status}`);throw r.userMessage=ue(o),r}return o},ye=null,kn=()=>ye?.(),$n=t=>{if(ye||document.getElementById(Nt))return;Be(),Co();let e=document.body.style.overflow,n=null,o=0,r=l("div",{id:Nt,class:"tb-hi",role:"dialog","aria-modal":"true","aria-labelledby":"tb-hi-title",tabindex:-1}),a=l("div",{class:"tb-hi-where",id:"tb-hi-title"},l("span",{class:"tb-hi-name",text:"Page history"}),t.title?l("span",{class:"tb-hi-page",text:t.title}):null),u=l("button",{type:"button",class:"tb-hi-btn","aria-label":"Close the history"},l("span",{class:"tb-hi-x","aria-hidden":"true",text:"\\xD7"}),l("span",{class:"tb-hi-label","aria-hidden":"true",text:"Close"})),i=l("div",{class:"tb-ed-main"}),s=l("div",{class:"tb-ed-inner"});i.append(s),r.append(l("div",{class:"tb-hi-top"},a,u),i);let d=m=>l("p",{class:"tb-ed-muted",role:"status",text:m}),c=(m,y)=>{let E=l("div",{class:"tb-ed-note",role:"alert"});return E.append(l("span",{text:`${m?.userMessage||y} `}),l("a",{class:"tb-hi-gh",href:t.githubHref,target:"_blank",rel:"noopener noreferrer",text:"See the history on GitHub \\u2197"})),E},p=()=>{n?.abort();let m=new AbortController;n=m;let y=setTimeout(()=>m.abort(),vn);return{signal:m.signal,done:()=>clearTimeout(y),current:()=>n===m}},b=null,f=[],x=[],h=[],v=null,R=m=>{let y=new URL(t.endpoint,location.href);for(let[E,A]of Object.entries(m))y.searchParams.set(E,A);return y.toString()},F=m=>m.path??b?.source??t.path,g=()=>b?.published[0]??null,T=(m,y)=>{let E=l("p",{class:"tb-hi-meta"});y&&E.append(l("span",{class:"tb-hi-state",text:y})),E.append(`${kt(m.date)}${m.who?` \\xB7 ${m.who}`:""}`);let A=fe(m.role);return A&&E.append(" ",A),m.pr&&t.githubHref&&E.append(" \\xB7 ",l("a",{href:t.githubHref.replace(/\\/commits\\/.*$/,`/pull/${m.pr}`),target:"_blank",rel:"noopener noreferrer",text:`#${m.pr}`})),E},$=(m,y,E)=>{if(!y.hidden){y.hidden=!0,E.setAttribute("aria-pressed","false");return}E.setAttribute("aria-pressed","true"),y.hidden=!1,y.textContent="",y.append(d("Loading what changed\\u2026")),t.track("page_revision_opened");let A=new AbortController,D=setTimeout(()=>A.abort(),vn);mt(R({sha:m.sha,path:F(m)}),A.signal).then(N=>{let B=N,O=typeof B.before=="string"?B.before:"",U=typeof B.after=="string"?B.after:"";y.textContent="",B.status==="added"&&y.append(l("p",{class:"tb-ed-panel tb-ed-muted",text:"This is the page\\u2019s first published version."}));let P=typeof B.previousPath=="string"&&B.previousPath!==F(m);P&&y.append(l("p",{class:"tb-ed-panel tb-ed-muted",text:`The page moved to where it is now${Mt(O)===Mt(U)?"; its text didn\\u2019t change.":"."}`})),(!P||Mt(O)!==Mt(U))&&y.append(Kt(O,U))}).catch(N=>{y.textContent="",y.append(c(N,"What changed couldn\\u2019t be loaded just now."))}).finally(()=>clearTimeout(D))},H=(m,y)=>{o=i.scrollTop,s.textContent="";let E=l("button",{type:"button",class:"tb-hi-btn tb-hi-back",text:"\\u2190 Page history"});E.addEventListener("click",()=>{n?.abort(),X()});let A=l("div",{});return s.append(E,l("div",{class:"tb-hi-banner",role:"status",text:y}),l("div",{class:"tb-hi-head"},l("h2",{text:m})),A),i.scrollTop=0,E.focus(),A},M=m=>{let y=H(m.summary,`You are reading the version of ${kt(m.date)}.`);y.append(d("Loading this version\\u2026")),t.track("page_version_read");let E=p();mt(R({sha:m.sha,path:F(m)}),E.signal).then(A=>{if(!E.current())return;let D=A.html;y.textContent="",y.append(typeof D=="string"&&D?l("div",{class:"tb-ed-panel tb-ed-preview"},Re(D)):l("p",{class:"tb-ed-muted",text:"The page was taken down in this version."}))}).catch(A=>{E.current()&&(y.textContent="",y.append(c(A,"This version couldn\\u2019t be loaded just now.")))}).finally(E.done)},_=(m,y)=>{let[E,A]=m.date<=y.date?[m,y]:[y,m],D=O=>`the version of ${kt(O.date)}${O===g()?" (the one you read now)":""}`,N=H("Compare versions",`Changes from ${D(E)} to ${D(A)}.`);N.append(d("Loading the two versions\\u2026")),t.track("page_versions_compared");let B=p();mt(R({sha:A.sha,base:E.sha,path:F(A)}),B.signal).then(O=>{if(!B.current())return;let U=O;N.textContent="",N.append(l("div",{class:"tb-hi-diff"},Kt(typeof U.before=="string"?U.before:"",typeof U.after=="string"?U.after:"")))}).catch(O=>{B.current()&&(N.textContent="",N.append(c(O,"The versions couldn\\u2019t be compared just now.")))}).finally(B.done)},q=(m,y)=>{let E=l("li",{class:"tb-hi-entry"}),A=l("div",{class:"tb-hi-diff",hidden:!0}),D=l("button",{type:"button","aria-pressed":"false",text:"Show changes"});D.addEventListener("click",()=>$(m,A,D));let N=l("button",{type:"button",text:"Read this version"});N.addEventListener("click",()=>M(m));let B=l("button",{type:"button",text:v?v===m?"Cancel compare":"Compare with this":"Compare\\u2026"});B.addEventListener("click",()=>{if(!v)v=m,X();else if(v===m)v=null,X();else{let P=v;v=null,_(P,m)}});let O=l("div",{class:"tb-hi-actions"},D,N,B),U=g();if(!v&&U&&U.sha!==m.sha){let P=l("button",{type:"button",text:"Compare with now"});P.addEventListener("click",()=>_(m,U)),O.append(P)}return E.append(l("p",{class:"tb-hi-msg",text:m.summary}),T(m,y),O,A),E},z=m=>{let y=l("li",{class:"tb-hi-entry"});return y.append(l("p",{class:"tb-hi-msg",text:m.summary||St(m)}),T({date:m.date,who:m.who?.name??"A reader",role:sn(m,[...b?.published??[],...b?.drafts??[]])},`Proposed \\xB7 ${St(m)}`),l("div",{class:"tb-hi-actions"},l("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",text:`See #${m.number} on GitHub \\u2197`}))),y},Z=m=>l("li",{class:"tb-hi-entry tb-hi-declined-entry"},l("p",{class:"tb-hi-msg",text:m.summary||Yt(m)}),l("p",{class:"tb-hi-meta"},l("span",{class:"tb-hi-state tb-hi-declined",text:"Declined"}),`${Yt(m).replace(/^Declined /,"")} \\xB7 ${kt(m.date)}`),he(m,t.endpoint)),X=()=>{if(s.textContent="",!b)return;if(v&&s.append(l("p",{class:"tb-hi-picking",role:"status",text:`Comparing the version of ${kt(v.date)}: pick the other version, below.`})),x.length||b.drafts.length){let E=l("ol",{class:"tb-hi-list"});for(let A of x)E.append(z(A));for(let A of b.drafts)E.append(q(A,"Being edited"));s.append(l("section",{class:"tb-hi-band tb-hi-editing","aria-labelledby":"tb-hi-editing"},l("h2",{id:"tb-hi-editing",text:"Being edited"}),l("p",{text:"Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published."}),E))}let m=l("ol",{class:"tb-hi-list"}),y=[...h].sort((E,A)=>A.date.localeCompare(E.date));for(let E of an(b.published,f)){let A="release"in E?E.release.date:E.entry.date;for(;y.length&&y[0].date>A;)m.append(Z(y.shift()));"release"in E?m.append(l("li",{class:"tb-hi-release",role:"separator","aria-label":`${Ae(E.release.tag)}, ${kt(E.release.date)}`,text:`${Ae(E.release.tag)} \\xB7 ${kt(E.release.date)}`})):m.append(q(E.entry,void 0))}for(let E of y)m.append(Z(E));s.append(l("section",{class:"tb-hi-band","aria-labelledby":"tb-hi-published"},l("h2",{id:"tb-hi-published",text:h.length?"Published and declined":"Published"}),l("p",{text:b.published.length?h.length?"What readers have seen, and what the authors declined and why, newest first.":"What readers have seen, newest first.":h.length?"This page has no published versions yet. What the authors declined, and why:":"This page has no published versions yet."}),m)),i.scrollTop=o},J=m=>{if(m.key==="Escape"){m.preventDefault(),V();return}if(m.key!=="Tab")return;let y=Array.from(r.querySelectorAll("a[href], button, [tabindex]")).filter(A=>!A.disabled&&A.tabIndex>=0&&!A.closest("[hidden]"));if(!y.length)return;let E=y.indexOf(document.activeElement);(m.shiftKey?E<=0:E===-1||E===y.length-1)&&(m.preventDefault(),y[m.shiftKey?y.length-1:0].focus())},V=()=>{ye=null,n?.abort(),document.removeEventListener("keydown",J,!0),r.remove(),document.body.style.overflow=e,t.trigger.isConnected&&t.trigger.focus()};u.addEventListener("click",V),document.addEventListener("keydown",J,!0),ye=V,document.body.style.overflow="hidden",document.body.append(r),u.focus(),t.track("page_history_opened"),s.append(d("Loading this page\\u2019s history\\u2026"));let Q=p(),ct=t.bookHistoryUrl?mt(t.bookHistoryUrl,Q.signal).then(m=>{let y=ie(m),E=y?.pages.find(A=>A.source===t.path)??null;return y&&(f=y.releases),y&&!h.length&&(h=It(y.declined).filter(A=>A.files?.includes(t.path))),E}):Promise.resolve(null),st=At(t.endpoint,t.path,{declined:"1"}),at=st?mt(st,Q.signal).then(m=>(h=It(m?.declined),(m?.items??[]).filter(y=>y&&typeof y.url=="string"))).catch(()=>[]):Promise.resolve([]);ct.catch(()=>null).then(async m=>{if(m)return m;let y=await mt(t.listUrl,Q.signal);return{path:"",source:t.path,title:t.title,published:(Array.isArray(y)?y:[]).map((E,A,D)=>({sha:E.sha,date:E.date,who:E.who,role:null,summary:Lo(E.message??"",A===D.length-1),...E.path!==t.path?{path:E.path}:{}})),drafts:[],releases:{}}}).then(async m=>{b=m;let y=[...m.published,...m.drafts],E=[...new Set(y.filter(B=>B.who===En).map(B=>B.sha))].slice(0,$o),A=E.length?mt(R({shas:E.join(",")}),Q.signal).then(B=>B?.names??{}).catch(()=>({})):Promise.resolve({}),[D,N]=await Promise.all([A,at]);for(let B of y){let O=D[B.sha];B.who===En&&typeof O=="string"&&O.trim()&&(B.who=O.trim().slice(0,80))}x=N,Q.current()&&X()}).catch(m=>{Q.current()&&(s.textContent="",s.append(c(m,"This page\\u2019s history couldn\\u2019t be loaded just now.")))}).finally(Q.done)};var Ot="http://www.w3.org/2000/svg",Cn={proposed:"Proposed",drafts:"Being edited",published:"Published",declined:"Declined"},Ln="tb-bh-style",To=(t,e)=>{let n=o=>{let r=o?.querySelector("title")?.textContent;if(r){for(let a of Array.from(t.querySelectorAll(".tb-swim-dot[aria-current]")))a.removeAttribute("aria-current");o.setAttribute("aria-current","true"),e.textContent=r}};t.addEventListener("click",o=>n(o.target.closest(".tb-swim-dot"))),t.addEventListener("focusin",o=>n(o.target.closest(".tb-swim-dot")))},Ao=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),o=t.querySelector(\'.tb-swim-lane[data-lane="0"]\');if(n.length<2||!o)return;let[r,a]=n.map(i=>({t:Date.parse(i.textContent??""),x:Number(i.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(a.t)||a.t<=r.t)return;let u=Number(o.getAttribute("y"))+Number(o.getAttribute("height"))/2;for(let i of e){let s=Math.min(Math.max(Date.parse(i.date),r.t),a.t),d=document.createElementNS(Ot,"circle");d.setAttribute("class","tb-swim-dot"),d.setAttribute("data-lane","0"),d.setAttribute("cx",(r.x+(s-r.t)/(a.t-r.t)*(a.x-r.x)).toFixed(1)),d.setAttribute("cy",String(u)),d.setAttribute("r","5"),d.setAttribute("tabindex","0");let c=document.createElementNS(Ot,"title");c.textContent=`${i.date} \\xB7 ${St(i)}: ${i.summary} (${i.who?.name??"a reader"})`,d.append(c),t.append(d)}},So=(t,e)=>{let n=Array.from(t.querySelectorAll(".tb-swim-axis")),o=t.querySelector(\'.tb-swim-lane[data-lane="3"]\');if(n.length<2||!o)return;let[r,a]=n.map(s=>({t:Date.parse(s.textContent??""),x:Number(s.getAttribute("x"))}));if(!Number.isFinite(r.t)||!Number.isFinite(a.t)||a.t<=r.t)return;let u=Number(o.getAttribute("y"))+Number(o.getAttribute("height"))/2,i=new Set(Array.from(t.querySelectorAll(".tb-swim-declined")).map(s=>s.getAttribute("data-number")));for(let s of e){if(i.has(String(s.number)))continue;let d=r.x+(Math.min(Math.max(Date.parse(s.date),r.t),a.t)-r.t)/(a.t-r.t)*(a.x-r.x),c=document.createElementNS(Ot,"g");for(let[x,h]of Object.entries({class:"tb-swim-dot tb-swim-declined","data-lane":"3","data-number":String(s.number),tabindex:"0",fill:"none",stroke:"currentColor","stroke-width":"1.5"}))c.setAttribute(x,h);let p=document.createElementNS(Ot,"title");p.textContent=`${s.date} \\xB7 declined: ${s.summary} (${s.who?.name??"a reader"})`;let b=document.createElementNS(Ot,"circle");b.setAttribute("cx",d.toFixed(1)),b.setAttribute("cy",String(u)),b.setAttribute("r","5");let f=document.createElementNS(Ot,"path");f.setAttribute("d",`M${(d-3).toFixed(1)} ${u-3}L${(d+3).toFixed(1)} ${u+3}M${(d+3).toFixed(1)} ${u-3}L${(d-3).toFixed(1)} ${u+3}`),c.append(p,b,f),t.append(c)}},De=(t,e,n,o)=>{let r=l("select",{class:"tb-bh-select"});r.append(l("option",{value:"",text:"Any"}));for(let[a,u]of n)r.append(l("option",{value:a,text:u}));return r.addEventListener("change",()=>o(e,r.value)),l("label",{class:"tb-bh-filter"},l("span",{text:t}),r)},Tn=async(t,e,n)=>{if(t.dataset.tbWired)return;t.dataset.tbWired="1";let o=document.querySelector("svg.tb-swimlane");if(o){let g=l("p",{class:"tb-swim-caption",role:"status",text:"Tap a dot for what changed."});o.closest("figure")?.append(g),To(o,g)}let r=new AbortController;setTimeout(()=>r.abort(),2e4);let a=ie(await mt(e,r.signal).catch(()=>null));if(!a)return;let u=n?At(n):"";document.getElementById(Ln)||document.head.append(l("style",{id:Ln,text:Ne(".tb-bh-list")+ge(".tb-bh-list")}));let i=It(a.declined),s=u?await mt(At(n,"",{declined:"1"}),r.signal).then(g=>{let T=g?.declined;return Array.isArray(T)&&(i=It(T)),(g?.items??[]).filter($=>$&&typeof $.url=="string")}).catch(()=>[]):[];o&&(Ao(o,s),So(o,i));let d=new Map(a.pages.map(g=>[g.source,g])),c=[...s.map(g=>{let T=g.files?.map($=>d.get($)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||St(g),state:"proposed",page:T?.source??"",pageTitle:T?.title??"",href:g.url,ref:`#${g.number}`,anchor:Ft(g.kind,g.number)}}),...i.map(g=>{let T=g.files?.map($=>d.get($)).find(Boolean);return{date:g.date,who:g.who?.name??"A reader",role:"contributor",summary:g.summary||Yt(g),state:"declined",page:T?.source??"",pageTitle:T?.title??"",href:g.url,ref:`#${g.number}`,anchor:Ft(g.kind,g.number),declined:g}}),...ln(a).map(g=>({date:g.date,who:g.who,role:g.role,summary:g.summary,state:g.state,page:g.page.source,pageTitle:g.page.title,href:g.page.path,ref:g.pr?`#${g.pr}`:"",anchor:g.pr?Ft("pr",g.pr):g.issue?Ft("issue",g.issue):""}))].sort((g,T)=>T.date.localeCompare(g.date)),p={page:"",person:"",state:""},b=l("ol",{class:"tb-bh-list"}),f=l("p",{class:"tb-bh-count",role:"status"}),x=()=>{b.textContent="";let g=c.filter($=>dn(p,$));f.textContent=`${g.length} change${g.length===1?"":"s"}`;let T=new Set;for(let $ of g){let H=l("p",{class:"tb-bh-meta"},l("span",{class:`tb-bh-state tb-bh-${$.state}`,text:Cn[$.state]}),` ${kt($.date)}${$.who?` \\xB7 ${$.who}`:""}`),M=$.anchor&&!T.has($.anchor)?$.anchor:!1;M&&T.add(M);let _=fe($.role);_&&H.append(" ",_),$.state==="proposed"&&H.append(" \\xB7 ",l("a",{href:$.href,target:"_blank",rel:"noopener noreferrer",text:`${$.ref} on GitHub \\u2197`})),b.append(l("li",{class:"tb-bh-item",id:M,tabindex:M?"-1":!1},l("p",{class:"tb-bh-summary",text:$.summary}),$.pageTitle?l("p",{class:"tb-bh-page"},$.state==="proposed"||$.state==="declined"?$.pageTitle:l("a",{href:$.href,text:$.pageTitle})):null,H,$.note?l("p",{class:"tb-bh-note",text:$.note}):null,$.declined?he($.declined,n):null))}},h=(g,T)=>{Object.assign(p,{[g]:T}),x()},v=[...new Set(c.map(g=>g.who).filter(Boolean))].sort((g,T)=>g.localeCompare(T)),R=a.pages.filter(g=>g.published.length||g.drafts.length).map(g=>[g.source,g.title]);t.append(l("h2",{text:"All changes"}),l("div",{class:"tb-bh-filters"},De("Chapter","page",R,h),De("Person","person",v.map(g=>[g,g]),h),De("State","state",Object.entries(Cn),h)),f,b),document.querySelector(".tb-history-static")?.setAttribute("hidden",""),x();let F=async()=>{let g=/^#((?:issue|pr)-(\\d+))$/.exec(location.hash);if(!g)return;let T=g[1];if(!document.getElementById(T)&&n){let H=new URL(n,location.href);H.searchParams.set("mode","item"),H.searchParams.set("number",g[2]);let M=await mt(H.toString(),AbortSignal.timeout(15e3)).catch(()=>null);if(M&&M.number===Number(g[2])&&Ft(M.kind,M.number)===T){let _=cn(M),q=M.files?.map(z=>d.get(z)).find(Boolean);c.unshift({date:String((_==="proposed"?M.created:M.closed)??M.created).slice(0,10),who:M.who?.name??"A reader",role:"contributor",summary:M.summary||St(M),state:_,page:q?.source??"",pageTitle:q?.title??"",href:_==="drafts"&&q?q.path:M.url,ref:`#${M.number}`,anchor:T,note:_==="drafts"?"The authors accepted this. It shows as Published once the book is next published.":_==="declined"?"The authors declined this.":void 0}),Object.assign(p,{page:"",person:"",state:""});for(let z of Array.from(t.querySelectorAll(".tb-bh-select")))z.value="";x()}}let $=document.getElementById(T);$&&($.scrollIntoView({block:"start"}),$.focus({preventScroll:!0}))};window.addEventListener("hashchange",()=>{F()}),F()};var Sn={"CC-BY-4.0":{name:"CC BY 4.0",url:"https://creativecommons.org/licenses/by/4.0/"},"CC-BY-SA-4.0":{name:"CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},"CC-BY-NC-4.0":{name:"CC BY-NC 4.0",url:"https://creativecommons.org/licenses/by-nc/4.0/"},"CC-BY-NC-SA-4.0":{name:"CC BY-NC-SA 4.0",url:"https://creativecommons.org/licenses/by-nc-sa/4.0/"},"CC0-1.0":{name:"CC0 1.0",url:"https://creativecommons.org/publicdomain/zero/1.0/"}},Fn=t=>t.split(/\\s*(?:,|&|\\band\\b)\\s*/).map(e=>e.trim()).filter(Boolean),Fo=t=>{let e=t.split(/\\s+/).filter(Boolean);return e.length<2?t:`${e.pop()}, ${e.map(o=>`${o.charAt(0).toUpperCase()}.`).join(" ")}`},Mo=t=>t.length<=1?t[0]??"":t.length===2?`${t[0]}, & ${t[1]}`:`${t.slice(0,-1).join(", ")}, & ${t.at(-1)}`,An=t=>/[.?!]$/.test(t)?t:`${t}.`,Mn=t=>{let e=Mo(Fn(t.authors).map(Fo)),n=t.accessed.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),o=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",r=[],a=o?[{text:`${An(o)} `},...t.bookTitle?[{text:"In "},{text:t.bookTitle,italic:!0},{text:". "}]:[]]:t.bookTitle?[{text:t.bookTitle,italic:!0},{text:". "}]:[];if(e)r.push({text:`${An(e)} (n.d.). `},...a);else if(a.length){let[u,...i]=a;r.push({...u,text:u.text.replace(/ $/,"")},{text:" (n.d.). "},...i)}else r.push({text:"(n.d.). "});return r.push({text:`Retrieved ${n}, from ${t.url}`}),r},_e=t=>{let e=t.pageTitle&&t.pageTitle!==t.bookTitle?t.pageTitle:"",n=Sn[t.licence],o=[{text:`\\u201C${e||t.bookTitle||t.url}\\u201D`}];return t.authors&&o.push({text:` by ${Fn(t.authors).join(", ")}`}),e&&t.bookTitle&&o.push({text:", from "},{text:t.bookTitle,italic:!0}),o.push({text:`, ${t.url}`}),n?o.push({text:`, is licensed under ${n.name} (${n.url})`}):t.licence&&o.push({text:`, is licensed under ${t.licence}`}),o.push({text:"."}),o},qe=t=>t.map(e=>e.text).join(""),Ue=t=>Sn[t]?.name??t,we=[["apa","APA 7"],["chicago","Chicago"],["mla","MLA"],["harvard","Harvard"]],Hn=t=>{try{let e=JSON.parse(t.getElementById("tb-cite")?.textContent??"");return e&&e.version===1&&e.book?.URL&&e.styles?.book?e:null}catch{return null}},Ho=t=>t.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});function Bn(t,e,n,o=0){let r=e!=="book"&&t.chapter&&t.styles.chapter,a=r?t.chapter:t.book,u=r?t.styles.chapter:t.styles.book,i=e==="paragraph"&&r?o:0,s=i?`${a.URL}#p${i}`:a.URL,d=Ho(n),c=n.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),p={};for(let[f]of we)p[f]=(u[f]??[]).map(x=>({...x,text:x.text.replaceAll("{accessed-us}",c).replaceAll("{accessed}",d).replace(a.URL,i?`${s} (para. ${i})`:s)}));return{item:{...a,id:s,URL:s,accessed:{"date-parts":[[n.getFullYear(),n.getMonth()+1,n.getDate()]]},...i?{note:`para. ${i}`}:{}},styles:p}}var Rn=t=>{let e=n=>n.literal??[n.given,n.family].filter(Boolean).join(" ");return t.author?.length?t.author.map(e).join(", "):t.editor?.length?`${t.editor.map(e).join(", ")} (${t.editor.length>1?"eds.":"ed."})`:""},Vt=t=>t?.["date-parts"]?.[0]??[],Ct=t=>String(t??"").padStart(2,"0"),Pe=t=>t.literal?t.literal:[t.family,t.given].filter(Boolean).join(", "),Bo=t=>{let e=a=>a.normalize("NFKD").replace(/[^A-Za-z0-9]/g,""),n=t.author?.[0]??t.editor?.[0],o=e(n?.family??n?.literal??""),r=e((t.title.match(/[\\p{L}\\p{N}]+/gu)??[]).find(a=>a.length>3)??"");return`${o}${Vt(t.issued)[0]??""}${r}`.toLowerCase()||"citation"},Ro={chapter:"incollection",book:"book",report:"techreport"},Oe=t=>t.replace(/\\\\/g,"\\\\textbackslash{}").replace(/([{}&%$#_])/g,"\\\\$1").replace(/~/g,"\\\\textasciitilde{}").replace(/\\^/g,"\\\\textasciicircum{}");function In(t){let[e,n,o]=Vt(t.issued),[r,a,u]=Vt(t.accessed),i=p=>p?Oe(p):void 0,s=p=>p?.map(b=>b.literal?`{${Oe(b.literal)}}`:Oe(Pe(b))).join(" and "),c=[["author",s(t.author)],["editor",s(t.editor)],["title",i(t.title)],["booktitle",t.type==="chapter"?i(t["container-title"]):void 0],[t.type==="report"?"institution":"publisher",i(t.publisher)],["year",e?String(e):void 0],["date",e&&n&&o?`${e}-${Ct(n)}-${Ct(o)}`:void 0],["url",t.URL],["urldate",r?`${r}-${Ct(a)}-${Ct(u)}`:void 0],["doi",t.DOI],["language",i(t.language)],["note",i(t.note)],["keywords",i(t.keyword)],["abstract",i(t.abstract)]].filter(([,p])=>p).map(([p,b])=>`  ${p} = {${b}}`).join(`,\n`);return`@${Ro[t.type]??"misc"}{${Bo(t)},\n${c}\n}\n`}var Io={chapter:"CHAP",book:"BOOK",report:"RPRT"};function Nn(t){let[e,n,o]=Vt(t.issued),[r,a,u]=Vt(t.accessed);return[["TY",Io[t.type]??"GEN"],["TI",t.title],...(t.author??[]).map(s=>["AU",Pe(s)]),...(t.editor??[]).map(s=>["ED",Pe(s)]),["T2",t["container-title"]],["PB",t.publisher],["PY",e?String(e):void 0],["DA",e?`${e}/${Ct(n)}/${Ct(o)}`:void 0],["UR",t.URL],["Y2",r?`${r}/${Ct(a)}/${Ct(u)}`:void 0],["DO",t.DOI],["LA",t.language],["AB",t.abstract],...(t.keyword??"").split(/,\\s*/).filter(Boolean).map(s=>["KW",s]),["N1",t.note]].filter(([,s])=>s).map(([s,d])=>`${s}  - ${d.replace(/\\s+/g," ")}`).concat("ER  - ","").join(`\\r\n`)}var Dn=t=>JSON.stringify([t],null,2)+`\n`;var dt=(t,e)=>{try{let n=window.tbTrack;typeof n=="function"&&(e?n(t,e):n(t))}catch{}},No=()=>{try{let t=JSON.parse(sessionStorage.getItem("tb-gh-identity")??"null");return!t||typeof t.token!="string"||typeof t.login!="string"||typeof t.at!="number"||Date.now()-t.at>480*60*1e3?null:{token:t.token,login:t.login,name:typeof t.name=="string"?t.name:""}}catch{return null}},Zt=(()=>{try{let t="tb-suggest-overlay",e="tb-suggest-style",n="tb-suggest-title",u=h=>{let v=h?.userMessage,R=typeof v=="string"?v.trim():"";return R?R.slice(0,200):null},i=()=>{if(document.getElementById(e))return;let h=document.createElement("style");h.id=e,h.textContent=`\n#${t} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${t} [hidden] { display: none !important; }\n#${t} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${t} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${t} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${t} .tb-sg-quote { margin: 0 0 1rem; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6);\n  color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-text, serif); }\n#${t} .tb-sg-field { margin-bottom: 0.9rem; }\n#${t} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${t} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${t} input, #${t} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${t} textarea { resize: vertical; min-height: 6rem; }\n#${t} input:focus-visible, #${t} textarea:focus-visible,\n#${t} button:focus-visible, #${t} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${t} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${t} [aria-invalid="true"] { border-color: #B3261E; }\n#${t} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${t} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${t} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${t} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${t} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: var(--tb-on-accent, #FFFFFF); cursor: pointer; }\n#${t} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${t} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${t} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${t} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${t} .tb-sg-pane:focus { outline: none; }\n#${t} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${t} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${t} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${t} { padding: 0; align-items: stretch; }\n  #${t} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${t} { display: none !important; } }\n`,document.head.appendChild(h)},s=(h,v,R,F=!1)=>{let g=document.createElement("div");g.className="tb-sg-field";let T=document.createElement("label");if(T.setAttribute("for",h),T.textContent=v,F){let H=document.createElement("span");H.className="tb-sg-opt",H.textContent=" (optional)",T.append(H)}let $=document.createElement("p");return $.className="tb-sg-err",$.id=h+"-err",R.id=h,!F&&!R.readOnly&&(R.required=!0),g.append(T,R,$),{wrap:g,control:R,err:$,hintId:null}},d=h=>{let v=[];h.err.textContent&&v.push(h.err.id),h.hintId&&v.push(h.hintId),v.length?h.control.setAttribute("aria-describedby",v.join(" ")):h.control.removeAttribute("aria-describedby")},c=(h,v)=>{h.control.setAttribute("aria-invalid","true"),h.err.textContent=v,d(h)},p=h=>{h.control.hasAttribute("aria-invalid")&&(h.control.removeAttribute("aria-invalid"),h.err.textContent="",d(h))},b=null,f=(h,v,R,F,g)=>{if(b)return;let T=g==="note"&&!!F;i();let $=R,H=document.body.style.overflow,M=null,_=!1,q=document.createElement("div");q.id=t;let z=document.createElement("div");z.className="tb-sg-dialog",z.tabIndex=-1,z.setAttribute("role","dialog"),z.setAttribute("aria-modal","true"),z.setAttribute("aria-labelledby",n);let Z=document.createElement("div");Z.className="tb-sg-head";let X=document.createElement("h2");X.id=n,X.textContent=F?`Note to the authors about \\xB6${F.paragraph}`:"Suggest an edit";let J=document.createElement("button");J.type="button",J.className="tb-sg-close",J.textContent="\\xD7",J.setAttribute("aria-label",T?"Close note form":"Close suggestion form"),Z.append(X,J);let V=document.createElement("form");V.noValidate=!0;let Q=document.createElement("p");Q.className="tb-sg-intro",Q.textContent=F?"Your note goes to the authors as an issue on the book\'s repository, with a link to this paragraph.":"Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let ct=document.createElement("blockquote");ct.className="tb-sg-quote",ct.textContent=T?F.text??F.quote:F?.quote??"";let st=T?"":F?.text??"";ct.hidden=!ct.textContent||!!st;let at=No(),m=document.createElement("input");m.type="text",m.name="name",m.autocomplete="name";let y=s("tb-sg-name","Your name",m),E=document.createElement("p");if(E.className="tb-sg-count",E.id="tb-sg-credit",E.textContent=T?"If the authors act on your note, you\'ll be credited by this name.":"If the authors accept your suggestion, you\'ll be credited by this name.",y.wrap.append(E),y.hintId=E.id,d(y),at){m.value=at.name||at.login;let L=document.createElement("p");L.className="tb-sg-count",L.id="tb-sg-who",L.textContent=`Signed in as @${at.login}: GitHub tells you when the authors answer.`,y.wrap.append(L),y.hintId=`${E.id} ${L.id}`,d(y)}let A=document.createElement("input");A.type="text",A.name="path",A.readOnly=!0,A.value=v;let D=s("tb-sg-path","Page you are editing",A),N=document.createElement("textarea");N.name="suggestion",N.rows=6,N.maxLength=5e3,N.value=st;let B=s("tb-sg-suggestion","Your suggested change",N),O=document.createElement("p");O.className="tb-sg-count",O.id="tb-sg-count",B.hintId=O.id;let U=()=>{let L=5e3-N.value.length;O.textContent=L+" character"+(L===1?"":"s")+" remaining"};U(),d(B),N.addEventListener("input",()=>{U(),p(B)}),B.wrap.append(O);let P=document.createElement("textarea");P.name="reasoning",P.rows=3;let $t=T?s("tb-sg-reasoning","Your comment",P):s("tb-sg-reasoning","Comment",P,!0);T&&(P.rows=6,P.maxLength=5e3,P.addEventListener("input",()=>p($t))),y.control.addEventListener("input",()=>p(y));let ht=document.createElement("div");ht.className="tb-sg-hp",ht.setAttribute("aria-hidden","true");let Ht=document.createElement("label");Ht.setAttribute("for","tb-sg-website"),Ht.textContent="Leave this field empty";let it=document.createElement("input");it.type="text",it.name="website",it.id="tb-sg-website",it.tabIndex=-1,it.autocomplete="off",it.setAttribute("aria-hidden","true"),ht.append(Ht,it);let yt=document.createElement("div");yt.className="tb-sg-actions";let lt=document.createElement("button");lt.type="submit",lt.className="tb-sg-btn";let Pt=T?"Send comment":"Send suggestion";lt.textContent=Pt;let wt=document.createElement("button");wt.type="button",wt.className="tb-sg-quiet",wt.textContent="Cancel",yt.append(lt,wt);let _t=()=>N.value.replace(/\\s+/g," ").trim()===st.replace(/\\s+/g," ").trim(),nt=()=>(T||_t())&&!P.value.trim(),gt=document.createElement("p");gt.className="tb-sg-count",gt.id="tb-sg-why-not",gt.textContent=T?"Write your comment to send.":st?"Change the text above, or add a comment, to send.":"Describe the change, or add a comment, to send.",lt.setAttribute("aria-describedby",gt.id);let Bt=()=>{gt.hidden=!nt(),_||(lt.disabled=nt())};N.addEventListener("input",Bt),P.addEventListener("input",Bt);let tt=document.querySelector(".tb-page-controls")?.dataset.privacy,Lt=document.createElement("p");if(Lt.className="tb-sg-count tb-sg-published",Lt.append("Your name and text are published openly, under the book\'s licence. "),tt){let L=document.createElement("a");L.href=tt,L.textContent="How contributions are handled",Lt.append(L)}V.append(Q,ct,y.wrap,D.wrap,...T?[]:[B.wrap],$t.wrap,ht,gt,...tt?[Lt]:[],yt),Bt();let et=document.createElement("div");et.className="tb-sg-pane",et.tabIndex=-1,et.hidden=!0,z.append(Z,V,et),q.append(z);let Tt=()=>{et.hidden=!0,V.hidden=!1,N.focus()},Rt=(L,j,Y,ut=!1)=>{if(!q.isConnected)return;et.textContent="";let Et=document.createElement("p");Et.className="tb-sg-pane-title",Et.textContent=L;let rt=document.createElement("p");rt.textContent=j,et.append(Et,rt);let ot=le(Y,location.origin);if(ot){let bt=document.createElement("a");bt.href=ot,bt.textContent=ot;let ft=document.createElement("p");ft.className="tb-sg-follow",ft.append("Follow your suggestion: ",bt),et.append(ft)}if(Y){let bt=document.createElement("a");bt.href=Y,bt.target="_blank",bt.rel="noopener",bt.textContent="View your suggestion on GitHub";let ft=document.createElement("p");ft.append(bt),et.append(ft)}let pt=document.createElement("button");pt.type="button",pt.className=ut?"tb-sg-btn":"tb-sg-quiet",pt.textContent=ut?"Back to my suggestion":"Close",pt.addEventListener("click",ut?Tt:()=>b?.()),et.append(pt),V.hidden=!0,et.hidden=!1,et.focus()},qt=()=>Array.prototype.filter.call(z.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),L=>!L.disabled&&L.tabIndex>=0&&!L.closest("[hidden]")),Ut=L=>{if(L.key==="Escape"){L.preventDefault(),b?.();return}if(L.key!=="Tab")return;let j=qt();if(!j.length){L.preventDefault(),z.focus();return}let Y=j.indexOf(document.activeElement);L.shiftKey?Y<=0&&(L.preventDefault(),j[j.length-1].focus()):(Y===-1||Y===j.length-1)&&(L.preventDefault(),j[0].focus())};b=()=>{if(b=null,M)try{M.abort()}catch{}document.removeEventListener("keydown",Ut,!0),q.remove(),document.body.style.overflow=H,$.isConnected&&$.focus()},q.addEventListener("mousedown",L=>{L.target===q&&b?.()}),J.addEventListener("click",()=>b?.()),wt.addEventListener("click",()=>b?.()),document.addEventListener("keydown",Ut,!0);let xt=()=>{let L=null,j=(Y,ut)=>{c(Y,ut),L||(L=Y.control)};for(let Y of[y,B,$t])p(Y);return m.value.trim()||j(y,"Please add your name."),T&&!P.value.trim()?j($t,"Please write your comment."):!T&&!N.value.trim()&&!_t()?j(B,"Please describe the change you would like."):N.value.length>5e3&&j(B,"Please keep the suggestion under 5000 characters."),L&&L.focus(),!L},vt=L=>{_=L,lt.disabled=L||nt(),lt.textContent=L?"Sending\\u2026":Pt};V.addEventListener("submit",L=>{if(L.preventDefault(),_||nt()||!xt())return;let j=T||_t(),Y={name:m.value.trim(),suggestion:(j?P:N).value.trim(),reasoning:j?"":P.value.trim(),path:v,website:it.value,...F?{paragraph:F.paragraph,quote:!j&&st?st:F.quote,page:F.page,...F.anchor?{anchor:F.anchor}:{},...j?{note:!0}:{}}:{},...at?{identity:at.token}:{}};if(Y.website){Rt("Thank you","Your suggestion has been received.");return}vt(!0);let ut=M=new AbortController,Et=setTimeout(()=>ut.abort(),1e4);ae(h,JSON.stringify(Y),{signal:ut.signal,onWait:()=>{clearTimeout(Et),lt.textContent=se}}).then(async rt=>{let ot=null;try{ot=await rt.json()}catch{ot=null}if(!rt.ok){let pt=new Error(ot?.error||"HTTP "+rt.status);throw pt.userMessage=u(ot),pt}return ot}).then(rt=>{dt("suggest_edit_submitted",{outcome:"success"});let ot=rt?.issueUrl;Rt(T?"Thank you \\u2014 comment sent":"Thank you \\u2014 suggestion sent","A maintainer will pick this up. Keep this link to see what they decide:",typeof ot=="string"?ot:null)}).catch(rt=>{dt("suggest_edit_submitted",{outcome:"error"}),Rt("That did not go through",rt&&rt.userMessage||"Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use the Edit link above.",null,!0)}).finally(()=>{clearTimeout(Et),M===ut&&(M=null),lt.isConnected?vt(!1):_=!1})}),document.body.style.overflow="hidden",document.body.appendChild(q),m.focus(),dt(F?"section_note_opened":"suggest_edit_opened")},x=((h,v,R,F,g)=>{try{f(h,v,R,F,g)}catch{b=null,document.getElementById(t)?.remove(),document.body.style.overflow=""}});return x.closeIfOpen=()=>b?.(),x}catch{return null}})(),On="tb-pedit-style",qn=()=>{if(document.getElementById(On))return;let t=document.createElement("style");t.id=On,t.textContent=`\n[data-pnum] { position: relative; }\n[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }\n@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }\n/* The note button: in the pencil\'s place, or just below it where there is one. */\n[data-pnum] > button.tb-pnote { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;\n  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;\n  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;\n  transition: opacity 0.12s; }\n[data-pnum] > button.tb-pedit + button.tb-pnote { top: calc(0.2em + 2rem); }\n[data-pnum]:hover > button.tb-pnote { opacity: 1; color: var(--tb-muted, #6E6E73); }\n[data-pnum] > button.tb-pnote:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);\n  background: var(--tb-bg-soft, #F7F7F5); }\n@media (hover: none) { [data-pnum] > button.tb-pnote { opacity: 0.5; } }\n@media (max-width: 800px) {\n  [data-pnum] > button.tb-pnote { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; }\n  [data-pnum] > button.tb-pedit + button.tb-pnote { top: -1.55rem; right: 1.6rem; }\n}\n.popover button.tb-pedit, .popover button.tb-pnote { display: none; }\n@media print { button.tb-pedit, button.tb-pnote { display: none !important; } }\n`,document.head.appendChild(t)},Un=()=>{let t=document.createElement("button");t.type="button",t.className="tb-pedit",t.tabIndex=-1,t.setAttribute("aria-hidden","true"),t.title="Edit this paragraph";let e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 16 16"),e.setAttribute("width","15"),e.setAttribute("height","15");let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",gn),n.setAttribute("fill","currentColor"),e.append(n),t.append(e),t},Do="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",ve=t=>(t.textContent??"").replace(/\\s+/g," ").trim(),We=()=>{let t=window.getSelection?.();if(!t||t.isCollapsed||!t.rangeCount)return;let e=Po(t.getRangeAt(0));if(!e)return;let n=Ke(t.getRangeAt(0).startContainer);return{paragraph:e.start,quote:zn(n),page:Oo(),text:e.exact,anchor:e}},Oo=()=>location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/"),Ke=t=>(t instanceof Element?t:t.parentElement)?.closest("article [data-pnum]"),je=t=>t.replace(/\\s+/g," "),jn=()=>document.querySelector("[data-source-commit]")?.dataset.sourceCommit??"",Po=t=>{let e=Ke(t.startContainer),n=Ke(t.endContainer)??e;if(!e||!n||e.closest(".popover"))return;let o=je(t.toString()).trim();if(!o)return;let r=document.createRange();r.setStart(e,0),r.setEnd(t.startContainer,t.startOffset);let a=document.createRange();return a.setStart(t.endContainer,t.endOffset),a.setEnd(n,n.childNodes.length),{start:Number(e.dataset.pnum),end:Number(n.dataset.pnum),exact:o.slice(0,2e3),prefix:je(r.toString()).trimStart().slice(-32),suffix:je(a.toString()).trimEnd().slice(0,32),text:ve(e),commit:jn()}},_o=t=>{let e=Number(t.dataset.pnum);return{start:e,end:e,exact:ve(t),prefix:"",suffix:"",text:ve(t),commit:jn()}},qo=t=>{let e=window,n=!e.tbSelectionComment;if(e.tbSelectionComment=t,!n)return;let o=document.createElement("button");o.type="button",o.className="tb-sel-comment",o.textContent="Comment on this",o.hidden=!0,document.body.append(o);let r,a=0,u=()=>{o.hidden=!0,r=void 0};o.addEventListener("pointerdown",i=>i.preventDefault()),o.addEventListener("click",()=>{let i=r;u(),i&&e.tbSelectionComment?.(i,o)}),o.addEventListener("keydown",i=>{i.key==="Escape"&&u()}),document.addEventListener("selectionchange",()=>{clearTimeout(a);let i=window.matchMedia?.("(pointer: coarse)").matches;a=window.setTimeout(()=>{let s=We();if(!s)return u();let d=window.getSelection().getRangeAt(0).getClientRects(),c=d[d.length-1];if(!c)return u();r=s,o.hidden=!1;let p=o.offsetWidth||130,b=Math.max(8,Math.min(c.right-p/2,document.documentElement.clientWidth-p-8));o.style.left=`${b+window.scrollX}px`,o.style.top=`${c.bottom+window.scrollY+(i?28:8)}px`},i?700:250)})},zn=t=>{let e=ve(t);if(e.length<=200)return e;let n=e.slice(0,199);return`${n.slice(0,n.lastIndexOf(" ")>100?n.lastIndexOf(" "):199)}\\u2026`},Uo=(t,e)=>{let n=Array.from(document.querySelectorAll("[data-pnum]")).filter(r=>!r.closest(".popover")&&!r.querySelector(":scope > button.tb-pnote"));if(!n.length)return;qn();let o=location.pathname.replace(/\\.html$/,"").replace(/\\/index$/,"/");for(let r of n){let a=Number(r.dataset.pnum),u=Un();u.className="tb-pnote",u.title=`Note to the authors about \\xB6${a}`,u.querySelector("path").setAttribute("d",Do),u.addEventListener("click",i=>{i.stopPropagation(),ke(u,e,`Continue: note on \\xB6${a}`,()=>t({paragraph:a,quote:zn(r),page:o,anchor:_o(r)},u))}),r.append(u)}},xe=new Set;document.addEventListener("click",t=>{let e=t.target;if(!(!e||!e.isConnected||e.closest?.("dialog")))for(let n of Array.from(xe))e&&!n.panel.contains(e)&&!n.button.contains(e)&&n.d.close(!1)});var jo=t=>typeof t.showPopover=="function",Ee=new Set,Gn=(t,e)=>{let n=t.closest(".tb-header")??t,r=(t.closest(".tb-header-slot")??n).getBoundingClientRect(),a=t.getBoundingClientRect(),u=document.documentElement.clientWidth,i=e.style;i.boxSizing="border-box",i.top=`${Math.max(r.bottom,0)+6}px`,i.maxHeight=`${Math.max(window.innerHeight-Math.max(r.bottom,0)-12,120)}px`;let s=()=>{i.left=`${Math.max(r.left,0)}px`,i.right="auto",i.width=`${Math.min(r.width,u)}px`};if(n.classList.contains("tb-hdr-icons")||n.getBoundingClientRect().width<=640)return s();i.left="auto",i.right=`${Math.max(u-a.right,0)}px`,i.width="",e.getBoundingClientRect().left<r.left&&s()},Ye=()=>{for(let t of Array.from(Ee))Gn(t.button,t.panel)};window.addEventListener("resize",Ye);window.addEventListener("scroll",Ye,{passive:!0});var Wn=(t,e)=>{e.hidden=!1,jo(e)&&(e.popover="manual",e.dataset.tbTop||e.showPopover(),e.dataset.tbTop="1",Ee.add({button:t,panel:e}),Gn(t,e))},Kn=t=>{for(let e of Array.from(Ee))e.panel===t&&Ee.delete(e);t.dataset.tbTop&&t.hidePopover(),delete t.dataset.tbTop,t.hidden=!0},ze=(t,e,n,o)=>{let r=()=>Array.from(e.querySelectorAll(n?\'[role="menuitem"]\':"input, button, a[href]")).filter(s=>!s.hidden&&!s.closest("[hidden]")),a={d:null,button:t,panel:e},u={open(){for(let d of Array.from(xe))d!==a&&d.d.close(!1);Wn(t,e),t.setAttribute("aria-expanded","true"),xe.add(a),(n?r()[0]:e.querySelector("input:checked")??r()[0])?.focus()},close(s=!0){e.hidden||(Kn(e),t.setAttribute("aria-expanded","false"),xe.delete(a),s&&t.focus())}};a.d=u,t.addEventListener("click",()=>{if(!e.hidden)return u.close();o?o(u.open):u.open()});let i=s=>{if(s.key==="Escape"&&!e.hidden){s.preventDefault(),s.stopPropagation(),u.close(!0);return}if(!n||e.hidden||!e.contains(s.target))return;let d=r(),c=d.indexOf(document.activeElement),p=b=>{s.preventDefault(),d[(b+d.length)%d.length]?.focus()};s.key==="ArrowDown"?p(c+1):s.key==="ArrowUp"?p(c-1):s.key==="Home"?p(0):s.key==="End"?p(d.length-1):s.key==="Tab"&&u.close(!1)};return e.addEventListener("keydown",i),t.addEventListener("keydown",i),n&&e.addEventListener("click",s=>{let d=s.target.closest(\'[role="menuitem"]\');if(d){if(d.getAttribute("aria-disabled")==="true"){s.preventDefault();return}u.close(!1)}}),u},k=(t,e={},...n)=>{let o=document.createElement(t);for(let[r,a]of Object.entries(e))r==="text"?o.textContent=a:r==="class"?o.className=a:o.setAttribute(r,a);for(let r of n)r!==null&&o.append(r);return o},Jt=(t,e,...n)=>{let o=k("dialog",{class:"tb-dialog","aria-label":t}),r=k("button",{type:"button",class:"tb-dialog-x","aria-label":"Close",text:"\\xD7"});r.addEventListener("click",()=>o.close()),o.append(r,...n);let a=null;return o.addEventListener("close",()=>{o.remove(),a?a():e.isConnected&&e.focus()}),document.body.append(o),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""),{d:o,closeThen:u=>(a=u,o.close())}},Pn=t=>{let e=document.querySelector(".tb-hdr-status");e&&(e.textContent=t,Wn(e.closest(".tb-header")??e,e),setTimeout(()=>{e.textContent===t&&(e.textContent="",Kn(e),e.hidden=!1)},4e3))},Yn=(t,e,n)=>{let o=()=>{let r=k("textarea",{readonly:""});r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.append(r),r.select();let a=!1;try{a=document.execCommand("copy")}catch{a=!1}return r.remove(),a};navigator.clipboard?.writeText?navigator.clipboard.writeText(t).then(e,()=>o()?e():n()):o()?e():n()},Vn="tb-contribute-explained",Zn=!1,zo=()=>{if(Zn)return!0;try{return localStorage.getItem(Vn)==="1"}catch{return!1}},Xt={edit:{title:"Edit this page",short:"edit the page and propose your change",what:"Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",who:"The authors review it. The proposal is public on the book\'s GitHub repository, and once it\'s accepted your GitHub name appears in the page\'s history.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},github:{title:"Edit on GitHub",short:"suggest a change on GitHub",what:"Change the wording on GitHub. Your change goes to the edition\'s maintainers as a proposal, and nothing in the edition changes until they accept it.",who:"The edition\'s maintainers review it. The proposal is public on the edition\'s GitHub repository and shows your GitHub username.",account:"A free GitHub account.",link:["Create a GitHub account \\u2197","https://github.com/signup"]},note:{title:"Note to the authors",short:"send the authors a note",what:"Reword a paragraph where it stands, or tell the authors about a mistake or an idea, in a short form.",who:"The authors. It becomes a public issue on the book\'s GitHub repository, showing your name. It doesn\'t appear on this page.",account:"None. You give your name."},groupComment:{title:"Comment in the margin",short:"comment in the margin, in your class\'s group",what:"Write in the margin with Hypothes.is, in a group such as your class\'s: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Only the members of the Hypothes.is group you post in, with your Hypothes.is username. Public comments are switched off on this book.",account:"A free Hypothes.is account, and membership of the group.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."},comment:{title:"Public comment",short:"comment in the margin",what:"Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else\'s comment.",who:"Anyone on the internet, with your Hypothes.is username.",account:"A free Hypothes.is account.",link:["Create a Hypothes.is account \\u2197","https://hypothes.is/signup"],switchNote:"Signed in as someone else? Use Switch account first: logging out in the sidebar alone keeps you signed in."}},Go=["no","one","two","three"],Wo="https://hypothes.is/logout",Xn=(t,e,n)=>{Zn=!0;try{localStorage.setItem(Vn,"1")}catch{}let o=({title:p,what:b,who:f,account:x,link:h,switchNote:v})=>k("section",{class:"tb-route"},k("h3",{text:p}),k("p",{text:b}),k("p",{},k("strong",{text:"Who sees it: "}),f),k("p",{},k("strong",{text:"Account: "}),x,h?" ":null,h?k("a",{href:h[1],target:"_blank",rel:"noopener noreferrer",text:h[0]}):null),v?k("p",{},`${v} `,k("a",{href:Wo,target:"_blank",rel:"noopener noreferrer",text:"Switch account \\u2197"})):null),r=k("div",{class:"tb-dialog-row"}),a=document.querySelector(".tb-header"),u=window.tbAnnotations,i=(a?.dataset.routes??"comment").split(" ").filter(p=>p!=="comment"||u).map(p=>p==="comment"&&u?.groupsOnly?"groupComment":p).filter(p=>p in Xt),s=i.includes("edit")||i.includes("note")?"book":"edition",d=Jt("How contributing works",t,k("h2",{text:"How contributing works"}),k("p",{text:i.length===1?`There is one way to help with this ${s}: ${Xt[i[0]].short}. Below: who sees what you write, and which account you need.`:`There are ${Go[i.length]??i.length} ways to help with this ${s}. They differ in who sees what you write, and in which account you need.`}),...i.map(p=>o(Xt[p])),k("p",{},k("a",{href:e,text:"More about commenting and contributing"})),...a?.dataset.credits?[k("p",{},k("a",{href:`${a.dataset.credits}#how-credit-works`,text:"How credit works"}),": who is named as an author, an editor or a contributor.")]:[],r),c=k("button",{type:"button",class:"tb-btn",text:"Close"});if(c.addEventListener("click",()=>d.d.close()),n){let p=k("button",{type:"button",class:"tb-btn tb-btn-primary",text:n.label});p.addEventListener("click",()=>d.closeThen(n.run)),r.append(c,p),p.focus()}else r.append(c),c.focus()},ke=(t,e,n,o)=>zo()?o():Xn(t,e,{label:n,run:o}),Ko=()=>{let t=location.pathname.replace(/\\.html$/,"");return(t==="/index"||/\\/index$/.test(t))&&(t=t.slice(0,-5)),location.origin+t},Yo=()=>{let t=Array.from(document.querySelectorAll("article [data-pnum]"));if(!t.length)return 0;let e=decodeURIComponent(location.hash.slice(1)),n=e?t.find(a=>a.id===e):void 0;if(n)return Number(n.dataset.pnum);let o=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tb-hdr-bottom"))||0,r=t.find(a=>{let u=a.getBoundingClientRect();return u.bottom>o+8&&u.top<window.innerHeight});return Number((r??t[0]).dataset.pnum)||0},Vo=(t,e,n)=>{let o=URL.createObjectURL(new Blob([t],{type:e})),r=k("a",{href:o,download:n});document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(o),1e3)},Zo=(t,e,n,o,r=!1)=>{let a=t.chapter?Yo():0,u=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),i=[...a?[["paragraph",`This paragraph (\\xB6${a})`]]:[],...t.chapter?[["chapter","This page"]]:[],["book",`Whole ${u}`]],s=/^#p\\d+$/.test(location.hash)||document.getElementById(decodeURIComponent(location.hash.slice(1)))?.hasAttribute("data-pnum"),d=a&&s&&!r?"paragraph":t.chapter?"chapter":"book",c="apa";try{let H=localStorage.getItem("tb-cite-style");H&&we.some(([M])=>M===H)&&(c=H)}catch{}let p=k("p",{class:"tb-cite-text","aria-live":"polite"}),b=k("span",{class:"tb-cite-said",role:"status"}),f=()=>Bn(t,d,new Date,a),x=()=>{b.textContent="",p.textContent="";for(let H of f().styles[c])p.append(H.italic?k("i",{text:H.text}):H.text)},h=(H,M,_,q,z)=>{let Z=k("div",{class:"tb-seg"});for(let[X,J]of _){let V=k("input",{type:"radio",name:H,value:X});V.checked=q()===X,V.addEventListener("change",()=>{z(X),x()}),Z.append(k("label",{},V,J))}return k("fieldset",{},k("legend",{text:M}),Z)},v=k("button",{type:"button",class:"tb-btn",text:"Copy"});v.addEventListener("click",()=>{Yn(qe(f().styles[c]),()=>b.textContent="Copied",()=>b.textContent="Couldn\'t copy: select the text instead"),dt("citation_copied",{style:c,scope:d})});let R=(t.chapter?.URL??t.book.URL).replace(/\\/$/,"").split("/").pop()||"citation",F=[["BibTeX","bib","application/x-bibtex",In],["RIS","ris","application/x-research-info-systems",Nn],["CSL-JSON","json","application/vnd.citationstyles.csl+json",Dn]],g=k("div",{class:"tb-dialog-row tb-cite-files"},k("span",{class:"tb-cite-said",text:"Download"}));for(let[H,M,_,q]of F){let z=k("button",{type:"button",class:"tb-btn",text:H});z.addEventListener("click",()=>{let{item:Z}=f();Vo(q(Z),_,`${d==="book"?"book":R}${d==="paragraph"?`-p${a}`:""}.${M}`),dt("citation_downloaded",{format:M,scope:d})}),g.append(z)}let T=Ue(e.dataset.licence??""),$=k("p",{class:"tb-cite-text"});for(let H of o())$.append(H.italic?k("i",{text:H.text}):H.text);x(),Jt("Cite",n,k("h2",{text:"Cite"}),h("tb-cite-scope","What",i,()=>d,H=>d=H),h("tb-cite-style","Style",we,()=>c,H=>{c=H;try{localStorage.setItem("tb-cite-style",c)}catch{}}),p,k("div",{class:"tb-dialog-row"},b,v),g,k("h3",{text:T?`Attribution (${T})`:"Attribution"}),$)},_n=(t,e,n=!1)=>{let o={authors:t.dataset.authors??"",bookTitle:t.dataset.bookTitle??"",pageTitle:t.dataset.pageTitle??"",licence:t.dataset.licence??"",url:Ko(),accessed:new Date},r=s=>{let d=k("p",{class:"tb-cite-text"});for(let c of s)d.append(c.italic?k("i",{text:c.text}):c.text);return d},a=(s,d)=>{let c=k("span",{class:"tb-cite-said",role:"status"}),p=k("button",{type:"button",class:"tb-btn",text:"Copy"});return p.addEventListener("click",()=>Yn(qe(d),()=>c.textContent="Copied",()=>c.textContent="Couldn\'t copy: select the text instead")),k("section",{},k("h3",{text:s}),r(d),k("div",{class:"tb-dialog-row"},c,p))},u=Hn(document);if(u){let s=u.chapter??u.book,d={...o,authors:Rn(s),url:s.URL};return Zo(u,t,e,()=>_e(d),n)}let i=Ue(o.licence);Jt("Cite this page",e,k("h2",{text:"Cite this page"}),a("APA 7",Mn(o)),a(i?`Attribution (${i})`:"Attribution",_e(o)))},Xo=()=>{try{let t=JSON.parse(document.getElementById("tb-downloads")?.textContent??"");return t&&(t.chapter||t.book)?t:null}catch{return null}},Jo=(t,e,n,o)=>{let r=[["pdf","PDF"],["epub","EPUB"],["odt","ODT (Word, LibreOffice)"]],a=(e.querySelector(".tb-type-badge")?.textContent??"book").toLowerCase(),u=(s,d,c)=>{let p=r.filter(([b])=>d?.[b]).map(([b,f])=>{let x=k("a",{class:"tb-btn",href:d[b],download:"",text:f});return x.addEventListener("click",()=>dt("download",{format:b,scope:c})),x});return p.length?[k("h3",{text:s}),k("div",{class:"tb-dialog-row tb-cite-files"},...p)]:[]},i=k("button",{type:"button",class:"tb-btn",text:"Markdown"});i.addEventListener("click",o),Jt("Download",n,k("h2",{text:"Download"}),...u("This page",t.chapter,"chapter"),...u(`Whole ${a}`,t.book,"book"),k("h3",{text:"Source"}),k("div",{class:"tb-dialog-row tb-cite-files"},i))},Qo=(t,e,n)=>{let o=[["text","Text size",[["small","Small"],["standard","Standard"],["large","Large"]]],["width","Width",[["standard","Standard"],["wide","Wide"]]],["theme","Theme",[["auto","Auto"],["light","Light"],["dark","Dark"]]],["numbers","Paragraph numbers",[["on","On"],["off","Off"]]]];n&&o.push(["annotations",n.groupsOnly?"Margin comments":"Public annotations",[["on","On"],["off","Off"]]]);let r=k("p",{class:"tb-panel-note",role:"status"});for(let[a,u,i]of o){let s=k("div",{class:"tb-seg"});for(let[c,p]of i){let b=k("input",{type:"radio",name:`tb-pref-${a}`,value:c});b.checked=e.get(a)===c,b.addEventListener("change",()=>{if(a==="annotations"&&n){if(r.textContent="",c==="on")n.enable();else if(n.disable().reload){let f=k("button",{type:"button",class:"tb-btn",text:"Reload"});f.addEventListener("click",()=>location.reload()),r.append("Highlights hidden. The annotation tab goes away when the page reloads.",f)}return}e.set(a,c),a==="numbers"&&dt("paragraph_numbers_toggled",{to:c})}),s.append(k("label",{},b,p))}let d=k("fieldset",{},k("legend",{text:u}),s);a==="annotations"&&d.append(r),a==="width"&&tr(t,d),t.append(d)}},tr=(t,e)=>{let n=r=>k("div",{"aria-hidden":"true",style:`height:0;visibility:hidden;margin:0;max-width:calc(var(${r}) * var(--tb-size-body) * var(--tb-text-scale))`}),o=()=>{let r=document.querySelector("article");if(!r?.parentElement||t.hidden)return;let a=n("--tb-measure-standard-em"),u=n("--tb-measure-wide-em");r.parentElement.append(a,u);let i=a.getBoundingClientRect().width,s=u.getBoundingClientRect().width;a.remove(),u.remove(),e.hidden=!(s-i>=16)};new MutationObserver(o).observe(t,{attributes:!0,attributeFilter:["hidden"]}),window.addEventListener("resize",o)},Ge=()=>window.matchMedia(`(max-width: ${window.__tbLayout?.narrow??"800px"})`).matches,er=t=>{let e=!1,n=()=>{e=!1;let r=t.getBoundingClientRect(),a=document.documentElement.style;a.setProperty("--tb-hdr-h",`${Math.round(r.height)}px`),a.setProperty("--tb-hdr-bottom",`${Math.max(0,Math.round(r.bottom))}px`)},o=()=>{e||(e=!0,requestAnimationFrame(n))};n(),window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),typeof ResizeObserver=="function"&&new ResizeObserver(o).observe(t)},Ve=null;window.addEventListener("popstate",()=>Ve?.(location.hash,!1));var nr=(t,e,n,o,r)=>{let a={endpoint:e,path:t.dataset.path??"",repo:t.dataset.repo??"",githubHref:t.href,builtBlob:t.closest(".tb-page-controls")?.dataset.sourceBlob,suggest:r,track:dt};t.addEventListener("click",s=>{if(s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey){dt("edit_on_github_clicked");return}s.preventDefault(),pe({...a,mode:"page",trigger:n})});let u=new Map,i=Array.from(document.querySelectorAll("[data-pnum]")).filter(s=>!s.closest(".popover")&&!s.querySelector(":scope > button.tb-pedit"));i.length&&qn();for(let s of i){let d=Un();d.addEventListener("click",c=>{c.stopPropagation(),ke(d,o,`Continue: edit \\xB6${s.dataset.pnum}`,()=>pe({...a,mode:"paragraph",para:s,trigger:d}))}),s.append(d),u.set(s.dataset.pnum??"",{p:s,b:d})}Ve=(s,d)=>{let c=zt.exec(s);if(!c)return;let p=c[1]?u.get(c[1]):void 0;pe(p?{...a,mode:"paragraph",para:p.p,trigger:p.b,push:d}:{...a,mode:"page",trigger:n,push:d})}},or=(t,e,n)=>{t.addEventListener("click",o=>{o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||(o.preventDefault(),$n({endpoint:e,listUrl:t.dataset.history??"",bookHistoryUrl:t.dataset.bookHistory,path:t.dataset.path??"",title:(document.querySelector("h1.article-title")?.textContent??"").trim(),githubHref:t.href,trigger:n,track:dt}))})},rr=t=>{let e=t.querySelector("[data-tb-reader]"),n=t.querySelector("[data-tb-reader-item]"),o=()=>t.scrollWidth>t.clientWidth+1,r=t.parentElement?.classList.contains("tb-header-slot")?t.parentElement:null,a=r?.querySelector(".home-link")?r:null,u=t.querySelector(".tb-hdr-label"),i=()=>!!u&&getComputedStyle(u).position!=="absolute",s=t.querySelector(".tb-hdr-where"),d=f=>!!f&&f.scrollWidth>f.clientWidth+1,c=f=>!o()&&i()===f&&!d(s)&&!Array.from(s?.querySelectorAll(".tb-hdr-title, .tb-hdr-crumbs a")??[]).some(d),p=f=>{a?.classList.toggle("tb-logo-full",f),a?.classList.toggle("tb-logo-icon",!f)},b=()=>{let f=!!e&&!!n&&t.dataset.tbHasReader==="1";p(!1),t.classList.remove("tb-hdr-icons","tb-hdr-tight"),f&&(e.hidden=!1,n.hidden=!0),o()&&t.classList.add("tb-hdr-icons"),o()&&(t.classList.add("tb-hdr-tight"),f&&(e.hidden=!0,n.hidden=!1));let x=i();a&&c(x)&&(p(!0),c(x)||p(!1)),Ye()};if(b(),window.addEventListener("resize",b),document.fonts?.ready.then(b),typeof ResizeObserver=="function"){let f=new ResizeObserver(()=>requestAnimationFrame(b));f.observe(t);let x=t.querySelector(".tb-hdr-actions");x&&f.observe(x)}return b},sr=t=>{let e=s=>t.querySelector(s),n=t.dataset.howTo??"/how-to-comment",o=window,r=e("[data-tb-contribute]"),a=e("[data-tb-more]"),u=s=>{try{s()}catch{}};u(()=>{let s=e("[data-tb-search]"),d=document.querySelector(".search .search-button");!s||!d||(s.addEventListener("click",()=>d.click()),s.hidden=!1)}),u(()=>{let s=e("[data-tb-menu]"),d=document.querySelector(".explorer"),c=d?.querySelector(".mobile-explorer");if(!s||!d||!c)return;let p=t.parentElement;p?.classList.contains("tb-header-slot")&&p.prepend(s);let b=d.querySelector(".explorer-content");b?.id&&s.setAttribute("aria-controls",b.id),c.tabIndex=-1,c.setAttribute("aria-hidden","true");let f=s.querySelector(".tb-hdr-label"),x=()=>!d.classList.contains("collapsed"),h=()=>{let v=x();s.setAttribute("aria-expanded",String(v)),s.classList.toggle("tb-closes",v),f&&(f.textContent=v?"Close menu":"Menu")};new MutationObserver(h).observe(d,{attributes:!0,attributeFilter:["class"]}),s.addEventListener("click",()=>{x()||o.tbAnnotations?.close?.(),c.click()}),document.addEventListener("keydown",v=>{v.key!=="Escape"||!x()||!Ge()||(c.click(),s.focus())}),h(),s.hidden=!1}),u(()=>{let s=e("[data-tb-reader]"),d=e("[data-tb-reader-item]"),c=document.querySelector(".sidebar .readermode");if(!s||!d||!c)return;let p=()=>s.setAttribute("aria-pressed",String(document.documentElement.getAttribute("reader-mode")==="on"));document.addEventListener("readermodechange",p),s.addEventListener("click",()=>c.click()),d.addEventListener("click",()=>c.click()),p(),t.dataset.tbHasReader="1",s.hidden=!1});let i=()=>{dt("annotation_badge_clicked"),o.tbAnnotations.open().then(s=>{s||Pn("Hypothes.is didn\'t load. A browser extension or the network may be blocking it.")})};u(()=>{if(!o.tbAnnotations){let c=e("[data-tb-comment]");if(c&&window.tbCommentsComing){let p=c.querySelector(".tb-mi-t"),b=c.querySelector(".tb-mi-s");p&&(p.textContent=Xt.groupComment.title),b&&(b.textContent="Coming soon for classes"),c.setAttribute("aria-disabled","true"),c.hidden=!1}return}let s=e("[data-tb-annotate]");if(s){let c=s.querySelector(".tb-hdr-label"),p=()=>Ge()&&document.documentElement.classList.contains("tb-hypothesis-expanded"),b=()=>{let x=p();s.classList.toggle("tb-closes",x),c&&(c.textContent=x?"Close annotations":"Annotate")};document.addEventListener("tb-hypothesis-layout",b),window.addEventListener("resize",b);let f=null;s.addEventListener("pointerdown",()=>f=p(),!0),s.addEventListener("click",()=>{let x=f??p();if(f=null,x)return o.tbAnnotations.close?.();let h=document.querySelector(".explorer");h&&!h.classList.contains("collapsed")&&Ge()&&h.querySelector(".mobile-explorer")?.click(),ke(s,n,"Continue: open annotations",i)}),s.querySelector(".tb-anno-count")||s.append(k("span",{class:"tb-anno-count"})),s.hidden=!1}let d=e("[data-tb-comment]");if(d){if(d.addEventListener("click",i),o.tbAnnotations.groupsOnly){let c=d.querySelector(".tb-mi-t"),p=d.querySelector(".tb-mi-s");c&&(c.textContent=Xt.groupComment.title),p&&(p.textContent="Hypothes.is account \\xB7 only your group sees it")}d.hidden=!1}}),u(()=>{let s=e("#tb-contribute-menu");if(!r||!s)return;ze(r,s,!0,x=>ke(r,n,"Continue to Contribute",x)),e("[data-tb-explain]")?.addEventListener("click",()=>Xn(r,n));let d=e("button.tb-suggest-btn"),c=d?.dataset.endpoint,p=d&&c&&Zt?()=>Zt(c,d.dataset.path??"",r,We()):void 0,b=e("a.edit-on-github"),f=b?.dataset.editEndpoint;if(b&&f){if(nr(b,f,r,n,p),zt.test(location.hash)){let x=location.hash,h=window.history.state?.tbEditor===!0;h||window.history.replaceState(window.history.state,"",location.pathname+location.search),Ve?.(x,!h)}}else b?.addEventListener("click",()=>dt("edit_on_github_clicked"));if(d&&p){d.addEventListener("click",()=>{let h=We();if(h)return Zt(c,d.dataset.path??"",r,h,"note");if(!document.querySelector("article [data-pnum]"))return p();Jt("Note to the authors",r,k("h2",{text:"Note to the authors"}),k("p",{text:"Select the words your note is about, then choose Note to the authors again. Or use the note button beside a paragraph."}))}),d.hidden=!1;let x=(h,v)=>Zt(c,d.dataset.path??"",v,h,"note");Uo(x,n),qo(x)}r.hidden=!1}),u(()=>{let s=e("[data-tb-appearance]"),d=e("#tb-appearance");!s||!d||!o.tbPrefs||(Qo(d,o.tbPrefs,o.tbAnnotations),ze(s,d,!1),s.hidden=!1)}),u(()=>{let s=e("#tb-more-menu");if(!a||!s)return;ze(a,s,!0),e("[data-tb-cite]")?.addEventListener("click",()=>_n(t,a));let d=document.querySelector(".page-header h1.article-title");if(e("[data-tb-cite]")&&d&&!document.querySelector(".tb-cite-page")){let v=d.parentElement.querySelector(".content-meta")??d,R=k("button",{type:"button",class:"tb-btn tb-cite-page",text:"Cite this page"});R.addEventListener("click",()=>_n(t,R,!0)),v.after(R)}e("[data-tb-print]")?.addEventListener("click",()=>window.print());let c=e("a.tb-history-link");c?.dataset.revisionEndpoint&&or(c,c.dataset.revisionEndpoint,a);let p=e("[data-tb-backlinks]"),b=document.querySelector(".backlinks");p&&(!b||!b.querySelector("a.internal")?(p.setAttribute("aria-disabled","true"),p.append(k("span",{class:"tb-mi-s",text:"No other page links here"}))):p.addEventListener("click",()=>{let v=b.querySelector("h3")??b;v.tabIndex=-1,b.scrollIntoView({block:"start"}),v.focus({preventScroll:!0})}));let f=e("[data-tb-download]"),x=Xo();if(f&&x){let v=f.querySelector(".tb-mi-t");v&&(v.textContent="Download\\u2026")}let h=()=>fetch(f.dataset.tbDownload).then(v=>v.ok?v.blob():Promise.reject(new Error(String(v.status)))).then(v=>{let R=URL.createObjectURL(v),F=k("a",{href:R,download:f.dataset.file??"page.md"});document.body.append(F),F.click(),F.remove(),setTimeout(()=>URL.revokeObjectURL(R),1e3)}).catch(()=>Pn("That didn\'t download just now. View source has the same file."));f?.addEventListener("click",()=>x?Jo(x,t,a,h):h()),a.hidden=!1}),u(()=>{rr(t)}),u(()=>{let s=t.parentElement;er(s?.classList.contains("tb-header-slot")?s:t)})},ar=()=>{try{Zt?.closeIfOpen(),fn(),kn();for(let t of Array.from(document.querySelectorAll(".tb-page-controls"))){if(t.dataset.tbWired)continue;t.dataset.tbWired="1",sr(t);let e=document.querySelector("[data-tb-book-history]");e&&t.dataset.bookHistory&&Tn(e,t.dataset.bookHistory,t.dataset.revisionEndpoint??"").catch(()=>{})}}catch{}};document.addEventListener("nav",ar);\n';

// src/donate.ts
var DONATE_LABEL = "Donate via PayPal (opens in a new tab)";

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
  type: "",
  donateUrl: ""
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
      opts.donateUrl ? item(
        "a",
        { class: "tb-donate-item", href: opts.donateUrl, ...away, "aria-label": DONATE_LABEL },
        "Donate \u2197"
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
  Component.tbDonate = opts.donateUrl;
  return Component;
};
var EditOnGitHub_default = EditOnGitHub;

export { EditOnGitHub_default as EditOnGitHub };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map