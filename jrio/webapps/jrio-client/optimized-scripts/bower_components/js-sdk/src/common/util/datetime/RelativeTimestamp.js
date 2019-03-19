define(["require","common/util/datetime/RelativeDate","underscore"],function(t){"use strict";var e=t("common/util/datetime/RelativeDate"),i=t("underscore"),r=function(){e.apply(this,arguments)},n=function(){};return n.prototype=e.prototype,r.prototype=new n,r.prototype.constructor=r,r.PATTERNS={DAY:/^(DAY)(([+|\-])(\d{1,9}))?$/i,WEEK:/^(WEEK)(([+|\-])(\d{1,9}))?$/i,MONTH:/^(MONTH)(([+|\-])(\d{1,9}))?$/i,QUARTER:/^(QUARTER)(([+|\-])(\d{1,9}))?$/i,SEMI:/^(SEMI)(([+|\-])(\d{1,9}))?$/i,YEAR:/^(YEAR)(([+|\-])(\d{1,9}))?$/i},r.parse=function(t){if(r.isValid(t))for(var e in r.PATTERNS){var n=r.PATTERNS[e].exec(t);if(null!==n&&i.isArray(n)&&5===n.length)return new r(n[1],n[3],n[4])}},r.isValid=function(t){if(t instanceof r)return""!==t.toString();if(i.isString(t))for(var e in r.PATTERNS)if(r.PATTERNS[e].test(t))return!0;return!1},r});