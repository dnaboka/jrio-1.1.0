define(["require","underscore","components/singleSelect/dataprovider/CacheableDataProvider"],function(t){"use strict";var e=t("underscore"),r=t("components/singleSelect/dataprovider/CacheableDataProvider"),a=function(t){t=t||{},e.defaults(t,{sortFunc:this._sortFunc,formatLabel:this._formatLabel}),this.sortFunc=t.sortFunc,this.formatLabel=t.formatLabel,r.call(this,t)};return e.extend(a.prototype,r.prototype),e.extend(a.prototype,{setData:function(t){t=this._convertToStandardData(t),t=this._sortData(t),r.prototype.setData.call(this,t)},_sortFunc:function(t){return t.label},_formatLabel:function(t){return t},_sortData:function(t){return e.sortBy(t,this.sortFunc)},_convertToStandardData:function(t){var r=this;return e.map(t,function(t){return{value:t,label:r.formatLabel(t)}})}}),a});