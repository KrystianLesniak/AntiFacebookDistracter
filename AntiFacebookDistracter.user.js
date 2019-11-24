// ==UserScript==
// @name         Anti Facebook Distracter
// @namespace    https://github.com/KrystianLesniak
// @version      0.2
// @license MIT
// @description  Scripts that disables facebook main feed(except user profiles and groups) and relations. 
// @author       Krystian Leśniak
// @match        https://www.facebook.com/*
// @updateURL   https://github.com/KrystianLesniak/AntiFacebookDistracter/raw/master/AntiFacebookDistracter.user.js
// @downloadURL https://github.com/KrystianLesniak/AntiFacebookDistracter/raw/master/AntiFacebookDistracter.user.js
// @supportURL https://github.com/KrystianLesniak/AntiFacebookDistracter/issues

// @run-at document-start

// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand

// @require https://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require https://greasyfork.org/scripts/12228-setmutationhandler/code/setMutationHandler.js?version=175122
// ==/UserScript==
const iframecss = 'height: 30.1em; width: 30em; border: 1px solid; border-radius: 3px; position: fixed; z-index: 999;';

function getSelector(getAll = false){
    var selector = "";

    if(GM_config.get('hide-feed') || getAll){
        selector += `[role="feed"], `;
    }

    if(GM_config.get('hide-relations') || getAll){
        selector += `#fb_stories_card_root, `;
    }

    return selector.slice(0, -2);
}

function reapply(){

   document.querySelectorAll(getSelector(true)).forEach(function(n) {
        n.style.display = "";
   });

    if(!getSelector()){
        return;
    }

    document.querySelectorAll(getSelector()).forEach(function(n) {
        n.style.display = "none";
   });

}

function apply(){

    if(!getSelector()){
        return;
    }

    setMutationHandler(getSelector(), function(nodes) {
        nodes.forEach(function(n) {
            n.style.display = "none";
        });
    });

}

GM_config.init(
{
  id: 'antiFacebookDistracterCfg',
  title: 'Anti Facebook Distracter Settings',
  fields:
  {
    'hide-feed':
    {
      'label': 'Hide Main Feed',
      'type': 'checkbox',
      'default': 'true'
    },
    'hide-relations':
    {
      'label': 'Hide Relations',
      'type': 'checkbox',
      'default': 'true'
    }
  },
  events:
  {
     save: function() {
        reapply();
        GM_config.close();
      }
   },
  css: '#antiFacebookDistracterCfg{calc(75% - 15em);} #antiFacebookDistracterCfg #antiFacebookDistracterCfg_header{margin-bottom:2em}; #antiFacebookDistracterCfg #antiFacebookDistracterCfg_buttons_holder{margin-top:3em;}'
});

function opencfg()
{
	GM_config.open();
	antiFacebookDistracterCfg.style = iframecss;
}


GM_registerMenuCommand("Settings", opencfg);
apply();
