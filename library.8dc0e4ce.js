!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r);var o=r("74hJy"),a=r("dmTlY"),u=r("kIlwO"),i="click",d=document.querySelector(".gallery-js"),c=document.querySelector("#lib-watched-tab"),l=document.querySelector("#lib-queue-tab"),s="watched";function v(e){var t=[];switch(s=e){case"watched":t=o.movieLocalStorage.watchedArray;break;case"queue":t=o.movieLocalStorage.queueArray}var n=t.map((function(e){return e.stringGenres=e.genres.map((function(e){return e.name})).join(", "),(0,u.markupCardMovie)(e)}));d.innerHTML=n.join("")}a.buttonAddWatch.addEventListener(i,(function(){return v(s)})),a.buttonAddQueue.addEventListener(i,(function(){return v(s)})),c.addEventListener(i,(function(){return v("watched")})),l.addEventListener(i,(function(){return v("queue")})),v(s),r("dmTlY"),r("bUBQC"),r("deWps");o=r("74hJy"),u=r("kIlwO");var f="click",m=document.querySelector(".gallery-js"),h=document.querySelector("#lib-watched-tab"),w=document.querySelector("#lib-queue-tab"),q="watched",L=0,g=document.querySelector(".movie-btn-container"),p=g.children[0],y=g.children[1];function b(){p.textContent=o.movieLocalStorage.watchedExists(L)?"remove from watched":"add to watched",y.textContent=o.movieLocalStorage.queueExists(L)?"remove from queue":"add to queue"}function S(e){var t=[];switch(q=e){case"watched":t=o.movieLocalStorage.watchedArray;break;case"queue":t=o.movieLocalStorage.queueArray}var n=t.map((function(e){return(0,u.markupCardMovie)(e)}));m.innerHTML=n.join("")}h.addEventListener(f,(function(){return S("watched")})),w.addEventListener(f,(function(){return S("queue")})),m.addEventListener(f,(function(e){var t=e.path.findIndex((function(e){return null!=e.dataset.index}));-1!=t&&(L=e.path[t].dataset.index,b())})),p.addEventListener(f,(function(e){o.movieLocalStorage.watchedExists(L)?o.movieLocalStorage.removeWatched(L):console.log("TODO: add movie"),S(q),b()})),y.addEventListener(f,(function(e){o.movieLocalStorage.queueExists(L)?o.movieLocalStorage.removeQueue(L):console.log("TODO: add queue"),S(q),b()})),S(q)}();
//# sourceMappingURL=library.8dc0e4ce.js.map