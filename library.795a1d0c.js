var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in i){var r=i[e];delete i[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,t){i[e]=t},e.parcelRequired7c6=r),r("5b0Gn"),r("87muD");let n={watchedArray:u("movie-watched"),queueArray:u("movie-queue"),watchedExists:function(e){return-1!=this.indexById(this.watchedArray,e)},queueExists:function(e){return-1!=this.indexById(this.queueArray,e)},indexById:function(e,t){return e.findIndex((e=>e.id==t))},addWatched:function(e){return!this.watchedExists(e.id)&&(this.watchedArray.push(e),d("movie-watched",this.watchedArray),!0)},removeWatched:function(e){if(this.watchedExists(e)){let t=this.indexById(this.watchedArray,e);this.watchedArray.splice(t,1),d("movie-watched",this.watchedArray)}},addQueue:function(e){return!this.queueExists(e.id)&&(this.queueArray.push(e),d("movie-queue",this.queueArray),!0)},removeQueue:function(e){if(this.queueExists(e)){let t=this.indexById(this.queueArray,e);this.queueArray.splice(t,1),d("movie-queue",this.queueArray)}}};function u(e){let t=localStorage.getItem(e),i=[];return null!==t&&(i=JSON.parse(t)),i}function d(e,t){localStorage.setItem(e,JSON.stringify(t))}var a=r("dqfwu");const o=document.querySelector(".gallery-js"),c=document.querySelector("#lib-watched-tab"),s=document.querySelector("#lib-queue-tab");let h="watched",l=0,f=document.querySelector(".movie-btn-container"),y=f.children[0],w=f.children[1];function q(){y.textContent=n.watchedExists(l)?"remove from watched":"add to watched",w.textContent=n.queueExists(l)?"remove from queue":"add to queue"}function m(e){h=e;let t=[];switch(h){case"watched":t=n.watchedArray;break;case"queue":t=n.queueArray}let i=t.map((e=>(0,a.markupCardForMovie)(e)));o.innerHTML=i.join("")}c.addEventListener("click",(()=>m("watched"))),s.addEventListener("click",(()=>m("queue"))),o.addEventListener("click",(e=>{let t=e.path.findIndex((e=>null!=e.dataset.index));-1!=t&&(l=e.path[t].dataset.index,q())})),y.addEventListener("click",(e=>{n.watchedExists(l)?n.removeWatched(l):console.log("TODO: add movie"),m(h),q()})),w.addEventListener("click",(e=>{n.queueExists(l)?n.removeQueue(l):console.log("TODO: add queue"),m(h),q()})),m(h);
//# sourceMappingURL=library.795a1d0c.js.map
