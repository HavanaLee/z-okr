import{d as f,r as d,o as m,c as p,a as _,b as h,e as y}from"./vendor.eff88591.js";const v=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};v();const g=f({setup(i){return(n,s)=>{const r=d("router-view");return m(),p(r)}}}),L="modulepreload",c={},E="./",l=function(n,s){return!s||s.length===0?n():Promise.all(s.map(r=>{if(r=`${E}${r}`,r in c)return;c[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":L,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((a,u)=>{o.addEventListener("load",a),o.addEventListener("error",u)})})).then(()=>n())},b=[{path:"/",redirect:"/home",component:()=>l(()=>import("./home.4ba74a48.js"),["static/js/home.4ba74a48.js","static/js/vendor.eff88591.js"])},{path:"/home",component:()=>l(()=>import("./home.4ba74a48.js"),["static/js/home.4ba74a48.js","static/js/vendor.eff88591.js"])}],O=_({history:h(),routes:b});y(g).use(O).mount("#app");
//# sourceMappingURL=index.2f123f47.js.map