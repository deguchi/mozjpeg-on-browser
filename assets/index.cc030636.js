import{r as s,R as a,e as v,a as A}from"./vendor.43c92bb8.js";const B=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}};B();var S="/assets/logo.ecc203fb.svg";window.Buffer=buffer.Buffer;async function x(c){const e=document.createElement("img");e.src=c,await new Promise(t=>e.onload=t);const n=document.createElement("canvas");[n.width,n.height]=[e.width,e.height];const r=n.getContext("2d");if(r)return r.drawImage(e,0,0),r.getImageData(0,0,e.width,e.height)}async function z(c){const e=document.createElement("img");e.src=c,await new Promise(t=>e.onload=t);const n=document.createElement("canvas");[n.width,n.height]=[e.width,e.height];const r=n.getContext("2d");if(r)return r.drawImage(e,0,0),R(r.canvas.toDataURL("image/jpeg",.8))}function R(c){for(var e=atob(c.replace(/^.*,/,"")),n=new Uint8Array(e.length),r=0;r<e.length;r++)n[r]=e.charCodeAt(r);try{var t=new Blob([n.buffer],{type:"image/png"})}catch{return!1}return t}const m=c=>Math.round(c/1024);function I(){const c=s.exports.useRef(null),e=s.exports.useRef(null),[n,r]=s.exports.useState(null),[t,o]=s.exports.useState(0),[i,E]=s.exports.useState(0),[w,y]=s.exports.useState(0),b=async()=>{var f;const u=((f=c.current)==null?void 0:f.files)||[];if(u[0]){o(m(u[0].size));const g=new FileReader;g.onload=async d=>{if(d.target){const l=await x(d.target.result),p=await z(d.target.result);if(p&&E(m(p.size)),l){const h=await v(l.data.buffer,{width:l.width,height:l.height,channels:4},{quality:80,colorSpace:3});y(m(new Blob([h.buffer],{type:"image/jpeg"}).size)),r(h)}}},g.readAsDataURL(u[0])}};return s.exports.useEffect(()=>{n&&(console.log(n),e.current&&(e.current.src=URL.createObjectURL(new Blob([n],{type:"image/jpeg"}))))},[n]),a.createElement("div",{className:"App"},a.createElement("header",{className:"App-header"},a.createElement("img",{src:S,className:"App-logo",alt:"logo"}),a.createElement("p",null,"Sample of compressing an image in a browser using mozJPEG"),a.createElement("p",null,a.createElement("input",{ref:c,accept:"image/*",type:"file",onChange:b})),t>0&&a.createElement("p",{style:{fontSize:"0.75rem"}},"\u30AA\u30EA\u30B8\u30CA\u30EB\u30B5\u30A4\u30BA: ",t," KB\u2003 JPEG 80%: ",i," KB\u2003 mozJPEG 80%: ",w," KB"),a.createElement("img",{ref:e,src:"",alt:"",style:{width:"600px"}}),a.createElement("p",null,"Edit ",a.createElement("code",null,"App.tsx")," and save to test HMR updates."),a.createElement("p",null,a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")," | ",a.createElement("a",{className:"App-link",href:"https://vitejs.dev/guide/features.html",target:"_blank",rel:"noopener noreferrer"},"Vite Docs"))))}A.render(a.createElement(a.StrictMode,null,a.createElement(I,null)),document.getElementById("root"));
