if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,l)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let r={};const t=e=>i(e,o),u={module:{uri:o},exports:r,require:t};n[o]=Promise.all(s.map((e=>u[e]||t(e)))).then((e=>(l(...e),r)))}}define(["./workbox-03ee9729"],(function(e){"use strict";e.setCacheNameDetails({prefix:"drawlots-a30f4a9"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./4361ffaa704212b6e253.min.js",revision:null},{url:"./9beafb581cdeb48949a3.min.js",revision:null},{url:"./9f1cb9457d53f8fd635e.min.js",revision:null},{url:"./c0d9312f2f1601def4f4.min.js",revision:null},{url:"./c3d758e614e52b4d388b.min.js",revision:null},{url:"./c5b42e752aee74929d75.min.css",revision:null},{url:"./f59c5be7fc8cba323d80.min.js",revision:null},{url:"./index.html",revision:"b21ee1e0e6d3d468786d2cfa346e42bc"}],{}),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
