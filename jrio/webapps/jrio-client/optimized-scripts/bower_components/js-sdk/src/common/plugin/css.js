define(["require","requirejs.plugin.css","underscore"],function(e){"use strict";var n=e("requirejs.plugin.css"),r=e("underscore"),i=r.clone(n);return i.load=function(e,i,o,c){var u=c.config?c.config.theme:!1;if(!u||!u.href)return void o();e=[u.href,e].join("/");var t=r.extend(r.clone(i),{toUrl:function(){return e+".css"}});n.load.call(this,e,t,o,c)},i.manualLoad=function(n,r){var o=function(){};i.load(n,e,o,{config:{theme:r}},!0)},i});