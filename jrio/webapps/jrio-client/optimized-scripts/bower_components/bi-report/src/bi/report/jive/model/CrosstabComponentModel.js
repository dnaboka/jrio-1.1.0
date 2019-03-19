define(["require","./BaseComponentModel","../enum/jiveTypes","../enum/interactiveComponentTypes","underscore","../../enum/reportEvents"],function(t){function e(t,r){var o,n={},s=0;if(!r.length||r[0].columnValues&&r[0].columnValues.length>t){for(var u=0,a=r.length;a>u;u++)o=n[r[u].columnValues[t].value]||(n[r[u].columnValues[t].value]=[]),o.push(r[u]);for(var i in n){o=n[i];for(var u=0,a=o.length;a>u;u++)o[u].id+="/"+s;e(t+1,n[i]),s++}}return r}function r(t){for(var e=0,r=t.length;r>e;e++)t[e].groupIndex=e,t[e].id+="/"+e;return t}var o=t("./BaseComponentModel"),n=t("../enum/jiveTypes"),s=t("../enum/interactiveComponentTypes"),u=t("underscore"),a=t("../../enum/reportEvents");return o.extend({defaults:function(){return{type:n.CROSSTAB,module:"jive.crosstab",uimodule:"jive.crosstab.interactive",id:void 0,crosstabId:void 0,fragmentId:void 0,startColumnIndex:0,rowGroups:[],dataColumns:[]}},actions:{"change:order":function(t){var e=null;return"asc"===t.sort.order&&(e="ASCENDING"),"desc"===t.sort.order&&(e="DESCENDING"),t.componentType===s.CROSSTAB_COLUMN?{actionName:"sortXTabByColumn",sortData:{crosstabId:this.attributes.crosstabId,order:e,measureIndex:t.sortMeasureIndex,columnValues:t.columnValues}}:{actionName:"sortXTabRowGroup",sortData:{crosstabId:this.attributes.crosstabId,order:e||"NONE",groupIndex:t.groupIndex}}}},initialize:function(t){this.config={},u.extend(this.config,t),this.events={ACTION_PERFORMED:"action",BEFORE_ACTION_PERFORMED:"beforeAction"}},getId:function(){return this.config.id},getCrosstabId:function(){return this.config.crosstabId},getFragmentId:function(){return this.config.fragmentId},sortRowGroup:function(t,e){var r=this,o={action:{actionName:"sortXTabRowGroup",sortData:{crosstabId:this.getCrosstabId(),order:e,groupIndex:t}}};r._notify({name:r.events.BEFORE_ACTION_PERFORMED}),r.trigger(a.ACTION,o.action)},isDataColumnSortable:function(t){var e=this.config.dataColumns[t-this.config.startColumnIndex];return"number"==typeof e.sortMeasureIndex},getColumnOrder:function(t){return this.config.dataColumns[t-this.config.startColumnIndex].order},sortByDataColumn:function(t,e){var r=this,o=this.config.dataColumns[t-this.config.startColumnIndex],n={action:{actionName:"sortXTabByColumn",sortData:{crosstabId:this.getCrosstabId(),order:e,measureIndex:o.sortMeasureIndex,columnValues:o.columnValues}}};r._notify({name:r.events.BEFORE_ACTION_PERFORMED}),r.trigger(a.ACTION,n.action)},updateFromReportComponentObject:function(t){var e={};"order"in t.sort?e.order=t.sort.order:0===u.keys(t.sort).length&&(e.order=null),this.set(e,t)},toReportComponentObject:function(){return this.getDataColumns(this.attributes.dataColumns).concat(this.getRowGroups(this.attributes.rowGroups))},getDataColumns:function(){var t=function(t){var e={id:this.getId()+"/dataColumns",componentType:s.CROSSTAB_COLUMN};return u.map(t,function(t){return u.extend({},e,t)})},r=u.bind(e,this,0),o=function(t){return u.filter(t,function(t){return"number"==typeof t.sortMeasureIndex})},n=function(t){return u.each(t,function(t){t.sort={},"ASCENDING"===t.order&&(t.sort.order="asc"),"DESCENDING"===t.order&&(t.sort.order="desc"),delete t.order}),t};return u.compose(n,o,r,t)}(),getRowGroups:function(){var t=function(t){var e={id:this.getId()+"/rowGroups",componentType:s.CROSSTAB_ROW};return u.map(t,function(t){return u.extend({},e,t)})},e=r,o=function(t){return u.filter(t,function(t){return t.sortable})},n=function(t){return u.each(t,function(t){t.sort={},"ASCENDING"===t.order&&(t.sort.order="asc"),"DESCENDING"===t.order&&(t.sort.order="desc"),delete t.order,delete t.sortable}),t};return u.compose(n,o,e,t)}()})});