// ==UserScript==
// @name         Anti Facebook Distracter
// @namespace    https://github.com/KrystianLesniak
// @version      0.1
// @license MIT
// @description  Scripts that disables facebook main feed. Except user profiles and groups
// @author       Krystian Leśniak
// @match        https://www.facebook.com/*
// @run-at document-start
// @grant  none
// @require https://greasyfork.org/scripts/12228-setmutationhandler/code/setMutationHandler.js?version=175122
// ==/UserScript==

setMutationHandler(`[role="feed"]`, function(nodes) {
    nodes.forEach(function(n) {
        n.style.display = "none";
    });
});
