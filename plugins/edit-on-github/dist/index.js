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
var controls_inline_default = 'var G=(e,i)=>{try{let f=window.tbTrack;typeof f=="function"&&(i?f(e,i):f(e))}catch{}},R=(()=>{try{let e="tb-suggest-overlay",i="tb-suggest-style",f="tb-suggest-title",ee=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/,te=n=>{let r=n?.userMessage,l=typeof r=="string"?r.trim():"";return l?l.slice(0,200):null},ne=()=>{if(document.getElementById(i))return;let n=document.createElement("style");n.id=i,n.textContent=`\n#${e} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;\n  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);\n  font-family: var(--tb-font-text, sans-serif); font-size: var(--tb-size-controls, 0.85rem);\n  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }\n#${e} [hidden] { display: none !important; }\n#${e} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;\n  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }\n#${e} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;\n  gap: 1rem; margin-bottom: 0.75rem; }\n#${e} h2 { margin: 0; font-family: var(--tb-font-text, sans-serif); font-size: 1.15rem;\n  font-weight: 600; color: var(--tb-ink, #2B2B2B); }\n#${e} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }\n#${e} .tb-sg-field { margin-bottom: 0.9rem; }\n#${e} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }\n#${e} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }\n#${e} input, #${e} textarea { display: block; width: 100%; box-sizing: border-box;\n  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;\n  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;\n  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }\n#${e} textarea { resize: vertical; min-height: 6rem; }\n#${e} input:focus-visible, #${e} textarea:focus-visible,\n#${e} button:focus-visible, #${e} a:focus-visible {\n  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }\n#${e} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);\n  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }\n#${e} [aria-invalid="true"] { border-color: #B3261E; }\n#${e} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }\n#${e} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }\n/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip\n   display:none fields; this one only works if it looks fillable. */\n#${e} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;\n  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }\n#${e} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }\n#${e} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;\n  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);\n  color: #FFFFFF; cursor: pointer; }\n#${e} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);\n  border-color: var(--tb-accent-hover, #6A57E0); }\n#${e} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }\n#${e} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;\n  color: var(--tb-muted, #6E6E73); cursor: pointer; }\n#${e} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }\n#${e} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;\n  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }\n#${e} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }\n#${e} .tb-sg-pane:focus { outline: none; }\n#${e} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }\n#${e} .tb-sg-pane p { margin: 0 0 0.75rem; }\n#${e} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }\n@media (max-width: 768px) {\n  #${e} { padding: 0; align-items: stretch; }\n  #${e} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }\n}\n@media print { #${e} { display: none !important; } }\n`,document.head.appendChild(n)},M=(n,r,l,A=!1)=>{let $=document.createElement("div");$.className="tb-sg-field";let g=document.createElement("label");if(g.setAttribute("for",n),g.textContent=r,A){let c=document.createElement("span");c.className="tb-sg-opt",c.textContent=" (optional)",g.append(c)}let v=document.createElement("p");return v.className="tb-sg-err",v.id=n+"-err",l.id=n,!A&&!l.readOnly&&(l.required=!0),$.append(g,l,v),{wrap:$,control:l,err:v,hintId:null}},U=n=>{let r=[];n.err.textContent&&r.push(n.err.id),n.hintId&&r.push(n.hintId),r.length?n.control.setAttribute("aria-describedby",r.join(" ")):n.control.removeAttribute("aria-describedby")},oe=(n,r)=>{n.control.setAttribute("aria-invalid","true"),n.err.textContent=r,U(n)},z=n=>{n.control.hasAttribute("aria-invalid")&&(n.control.removeAttribute("aria-invalid"),n.err.textContent="",U(n))},m=null,re=(n,r,l)=>{if(m)return;ne();let A=l,$=document.body.style.overflow,g=null,v=!1,c=document.createElement("div");c.id=e;let h=document.createElement("div");h.className="tb-sg-dialog",h.tabIndex=-1,h.setAttribute("role","dialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-labelledby",f);let q=document.createElement("div");q.className="tb-sg-head";let D=document.createElement("h2");D.id=f,D.textContent="Suggest an edit";let k=document.createElement("button");k.type="button",k.className="tb-sg-close",k.textContent="\\xD7",k.setAttribute("aria-label","Close suggestion form"),q.append(D,k);let C=document.createElement("form");C.noValidate=!0;let P=document.createElement("p");P.className="tb-sg-intro",P.textContent="Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";let w=document.createElement("input");w.type="text",w.name="name",w.autocomplete="name";let H=M("tb-sg-name","Your name",w),F=document.createElement("input");F.type="email",F.name="email",F.autocomplete="email";let L=M("tb-sg-email","Your email",F),I=document.createElement("input");I.type="text",I.name="path",I.readOnly=!0,I.value=r;let se=M("tb-sg-path","Page you are editing",I),b=document.createElement("textarea");b.name="suggestion",b.rows=6,b.maxLength=5e3;let E=M("tb-sg-suggestion","Your suggested change",b),S=document.createElement("p");S.className="tb-sg-count",S.id="tb-sg-count",E.hintId=S.id;let V=()=>{let t=5e3-b.value.length;S.textContent=t+" character"+(t===1?"":"s")+" remaining"};V(),U(E),b.addEventListener("input",()=>{V(),z(E)}),E.wrap.append(S);let N=document.createElement("textarea");N.name="reasoning",N.rows=3;let ae=M("tb-sg-reasoning","Why",N,!0);for(let t of[H,L])t.control.addEventListener("input",()=>z(t));let O=document.createElement("div");O.className="tb-sg-hp",O.setAttribute("aria-hidden","true");let X=document.createElement("label");X.setAttribute("for","tb-sg-website"),X.textContent="Leave this field empty";let y=document.createElement("input");y.type="text",y.name="website",y.id="tb-sg-website",y.tabIndex=-1,y.autocomplete="off",y.setAttribute("aria-hidden","true"),O.append(X,y);let Y=document.createElement("div");Y.className="tb-sg-actions";let T=document.createElement("button");T.type="submit",T.className="tb-sg-btn",T.textContent="Send suggestion";let B=document.createElement("button");B.type="button",B.className="tb-sg-quiet",B.textContent="Cancel",Y.append(T,B),C.append(P,H.wrap,L.wrap,se.wrap,E.wrap,ae.wrap,O,Y);let d=document.createElement("div");d.className="tb-sg-pane",d.tabIndex=-1,d.hidden=!0,h.append(q,C,d),c.append(h);let ie=()=>{d.hidden=!0,C.hidden=!1,b.focus()},j=(t,o,a,p=!1)=>{if(!c.isConnected)return;d.textContent="";let s=document.createElement("p");s.className="tb-sg-pane-title",s.textContent=t;let u=document.createElement("p");if(u.textContent=o,d.append(s,u),a){let _=document.createElement("a");_.href=a,_.target="_blank",_.rel="noopener",_.textContent="View your suggestion on GitHub";let Z=document.createElement("p");Z.append(_),d.append(Z)}let x=document.createElement("button");x.type="button",x.className=p?"tb-sg-btn":"tb-sg-quiet",x.textContent=p?"Back to my suggestion":"Close",x.addEventListener("click",p?ie:()=>m?.()),d.append(x),C.hidden=!0,d.hidden=!1,d.focus()},le=()=>Array.prototype.filter.call(h.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),t=>!t.disabled&&t.tabIndex>=0&&!t.closest("[hidden]")),J=t=>{if(t.key==="Escape"){t.preventDefault(),m?.();return}if(t.key!=="Tab")return;let o=le();if(!o.length){t.preventDefault(),h.focus();return}let a=o.indexOf(document.activeElement);t.shiftKey?a<=0&&(t.preventDefault(),o[o.length-1].focus()):(a===-1||a===o.length-1)&&(t.preventDefault(),o[0].focus())};m=()=>{if(m=null,g)try{g.abort()}catch{}document.removeEventListener("keydown",J,!0),c.remove(),document.body.style.overflow=$,A.isConnected&&A.focus()},c.addEventListener("mousedown",t=>{t.target===c&&m?.()}),k.addEventListener("click",()=>m?.()),B.addEventListener("click",()=>m?.()),document.addEventListener("keydown",J,!0);let ce=()=>{let t=null,o=(p,s)=>{oe(p,s),t||(t=p.control)};for(let p of[H,L,E])z(p);w.value.trim()||o(H,"Please add your name.");let a=F.value.trim();return a?ee.test(a)||o(L,"That does not look like an email address."):o(L,"Please add your email."),b.value.trim()?b.value.length>5e3&&o(E,"Please keep the suggestion under 5000 characters."):o(E,"Please describe the change you would like."),t&&t.focus(),!t},Q=t=>{v=t,T.disabled=t,T.textContent=t?"Sending\\u2026":"Send suggestion"};C.addEventListener("submit",t=>{if(t.preventDefault(),v||!ce())return;let o={name:w.value.trim(),email:F.value.trim(),suggestion:b.value.trim(),reasoning:N.value.trim(),path:r,website:y.value};if(o.website){j("Thank you","Your suggestion has been received.");return}Q(!0);let a=g=new AbortController,p=setTimeout(()=>a.abort(),1e4);fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o),signal:a.signal}).then(async s=>{let u=null;try{u=await s.json()}catch{u=null}if(!s.ok){let x=new Error(u?.error||"HTTP "+s.status);throw x.userMessage=te(u),x}return u}).then(s=>{G("suggest_edit_submitted",{outcome:"success"});let u=s?.issueUrl;j("Thank you \\u2014 suggestion sent","A maintainer will pick this up. You can follow it here:",typeof u=="string"?u:null)}).catch(s=>{G("suggest_edit_submitted",{outcome:"error"}),j("That did not go through",s&&s.userMessage||\'Something went wrong sending your suggestion \\u2014 nothing was lost. Try again in a moment, or use "Edit on GitHub" above.\',null,!0)}).finally(()=>{clearTimeout(p),g===a&&(g=null),T.isConnected?Q(!1):v=!1})}),document.body.style.overflow="hidden",document.body.appendChild(c),w.focus(),G("suggest_edit_opened")},K=((n,r,l)=>{try{re(n,r,l)}catch{m=null,document.getElementById(e)?.remove(),document.body.style.overflow=""}});return K.closeIfOpen=()=>m?.(),K}catch{return null}})(),de=()=>{try{R?.closeIfOpen();for(let e of Array.from(document.querySelectorAll(".tb-page-controls"))){if(e.dataset.tbWired)continue;e.dataset.tbWired="1",e.querySelector("a.edit-on-github")?.addEventListener("click",()=>G("edit_on_github_clicked"));let i=e.querySelector("button.tb-suggest-btn"),f=i?.dataset.endpoint;if(!i||!f||!R)continue;let W=i.dataset.path??"";i.addEventListener("click",()=>R(f,W,i)),i.hidden=!1}}catch{}};document.addEventListener("nav",de);\n';

// src/components/EditOnGitHub.tsx
var defaultOptions = {
  repo: "",
  branch: "main",
  contentDir: "content",
  suggestEndpoint: ""
};
var repoPath = (contentDir, relativePath) => [...contentDir.split("/"), ...relativePath.split("/")].filter((seg) => seg !== "" && seg !== ".").join("/");
var encodePath = (path) => path.split("/").map(encodeURIComponent).join("/");
var EditOnGitHub = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  const Component = ({ fileData }) => {
    const relativePath = fileData.relativePath;
    if (!opts.repo || !fileData.filePath || !relativePath) return null;
    const path = repoPath(opts.contentDir, relativePath);
    const gh = encodePath(path);
    const link = (cls, href, text) => _("a", { class: cls, href, target: "_blank", rel: "noopener noreferrer" }, text);
    return _(
      "div",
      { class: "tb-page-controls" },
      link(
        "edit-on-github",
        `https://github.com/${opts.repo}/edit/${opts.branch}/${gh}`,
        "Edit on GitHub \u2197"
      ),
      link(
        "tb-history-link",
        `https://github.com/${opts.repo}/commits/${opts.branch}/${gh}`,
        "View revision history \u2197"
      ),
      // Hidden until the page's script arms the modal, so a reader whose
      // scripts are blocked never meets a button that does nothing.
      opts.suggestEndpoint ? _(
        "button",
        {
          type: "button",
          class: "tb-suggest-btn",
          hidden: true,
          "data-endpoint": opts.suggestEndpoint,
          "data-path": path
        },
        "Suggest an edit"
      ) : null
    );
  };
  Component.css = `
.tb-page-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
  margin: 0 0 0.5rem 0;
}
.tb-page-controls a,
.tb-page-controls button.tb-suggest-btn {
  display: inline-block;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--gray);
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.tb-page-controls button.tb-suggest-btn[hidden] { display: none; }
.tb-page-controls a:hover,
.tb-page-controls button.tb-suggest-btn:hover { color: var(--secondary); }
.tb-page-controls a:focus-visible,
.tb-page-controls button.tb-suggest-btn:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
}
`;
  Component.afterDOMLoaded = controls_inline_default;
  return Component;
};
var EditOnGitHub_default = EditOnGitHub;

export { EditOnGitHub_default as EditOnGitHub };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map