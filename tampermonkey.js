// ==UserScript==
// @name         Google Chat thread link (fork of upman/gchat-copy)
// @version      0.0.13
// @description  Adds button to copy links to threads on Google Chat (fork of upman/gchat-copy)
// @author       Mathias Rav
// @include      https://chat.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
// Fork of https://github.com/upman/gchat-copy
const main = () => {
    for (const e of document.querySelectorAll("c-wiz[data-topic-id][data-local-topic-id]")) {
        const threadId = e.getAttribute("data-topic-id");
        const roomId = e.getAttribute('data-p').match(/space\/([^\\"]*)/)[1];
        const url = `https://mail.google.com/chat/#chat/space/${roomId}/${threadId}`;
        if (e.querySelector('.gchat-xtra-copy')) continue;
        const b = document.createElement("button");
        b.className = "gchat-xtra-copy";
        b.style.display = "inline-block";
        b.style.marginLeft = "-6em";
        b.style.width = "6em";
        b.innerHTML = "Copy link";
        b.addEventListener('click', () => {
            const el = document.createElement('textarea');
            el.value = url;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        });
        e.querySelector('div[aria-label="Follow"]').parentNode.appendChild(b);
    }
};
const debounce = (f, d, h=null) => () =>
    !h && void(h = setTimeout(() => {
        f();
        h = null;
    }, d));
main();
document.documentElement.addEventListener('DOMSubtreeModified', debounce(main, 2000));
})();