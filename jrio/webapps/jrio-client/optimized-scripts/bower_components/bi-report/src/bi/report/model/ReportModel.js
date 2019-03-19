define(["require","common/model/BaseModel","./ReportExecutionModel","../collection/ReportExportCollection","underscore","backbone","jquery","../enum/reportStatuses","../enum/reportEvents","../jive/enum/jiveTypes","./reportStatusTrait","logger","../enum/reportOutputFormats"],function(t){"use strict";var e=t("common/model/BaseModel"),r=t("./ReportExecutionModel"),i=t("../collection/ReportExportCollection"),n=t("underscore"),o=t("backbone"),s=t("jquery"),u=(t("../enum/reportStatuses"),t("../enum/reportEvents"),t("../jive/enum/jiveTypes"),t("./reportStatusTrait")),a=(t("logger").register("Report"),t("../enum/reportOutputFormats")),c=1e3,p=e.extend({idAttribute:"requestId",defaults:function(){return{exports:void 0,reportURI:void 0,requestId:void 0,executionId:void 0,status:void 0,totalPages:void 0}},initialize:function(t,n){e.prototype.initialize.apply(this,arguments),n||(n={}),this.contextPath=n.contextPath,this.execution=new r({},{report:this}),this.exports=new i(this.get("exports")||[],{report:this})},urlAction:function(){var t=this.contextPath;return"/"!==t[t.length-1]&&(t+="/"),t+="rest_v2/runReportAction"},execute:function(t){var e=this;this.unset("status",{silent:!0}),t||(t={}),this.execution.set(n.defaults(n.extend({},t),{reportUnitUri:this.get("reportURI"),baseUrl:this.contextPath}));var r=this.execution.run().done(function(t){return e.has("executionId")&&e.set("requestId",e.get("executionId")),e.set(e.parse(t))?void e.trigger("sync",e,t):!1}).fail(function(t){e.trigger("error",e,t)});return this.trigger("request",this,r),r},updateStatus:function(){var t,e=this,r=this.getExport(a.HTML);return t=!r||r.get("outputFinal")?this.execution.status().done(function(t){return e.set({status:t.value,errorDescriptor:t.errorDescriptor})?void e.trigger("sync",e,t):!1}).fail(function(t){e.trigger("error",e,t)}):this.execution.pageStatus(this.execution.get("pages")).done(function(t){return e.set({status:t.reportStatus,pageStatus:{pageFinal:"true"===t.pageFinal,timestamp:parseInt(t.pageTimestamp)},errorDescriptor:t.errorDescriptor})?void e.trigger("sync",e,t):!1}).fail(function(t){e.trigger("error",e,t)}),this.trigger("request",this,t),t},update:function(){var t=this,e=this.execution.update().done(function(e){return t.set(t.parse(e))?void t.trigger("sync",t,e):!1}).fail(function(e){t.trigger("error",t,e)});return this.trigger("request",this,e),e},waitForExecution:function(){null!=this.updateStatusTimer&&(clearTimeout(this.updateStatusTimer),this.updateStatusTimer=null);var t=this,e=new s.Deferred,r=function(){t.isCompleted()?e.resolve():t.updateStatusTimer=setTimeout(function(){t.updateStatus().done(r).fail(e.reject)},c)};return this.updateStatus().done(r).fail(e.reject),e},runAction:function(t){if(!this.has("requestId"))throw new Error("You must execute report first before running any action.");this.unset("status",{silent:!0});var e=this,r=o.ajax({url:this.urlAction(),type:"POST",dataType:"json",headers:{Accept:"application/json","x-jrs-base-url":this.contextPath},data:{jr_ctxid:this.get("requestId"),jr_action:JSON.stringify(t)}}).done(function(t){return e.set("requestId",t.result.contextid)?void e.trigger("sync",e,t):!1}).fail(function(t){e.trigger("error",e,t)});return this.trigger("request",this,r),r},cancel:function(){if(this.isCompleted())return(new s.Deferred).resolve();var t=this,e=this.execution.cancel().done(function(e){return e?t.set("status",e.value)?void t.trigger("sync",t,e):!1:void 0}).fail(function(e){t.trigger("error",t,e)});return this.trigger("request",this,e),e},applyParameters:function(t){return this.unset("status",{silent:!0}),this.execution.applyParameters(t)},getExport:function(t){return this.exports.find(function(e){return e.get("options").outputFormat===t})},addExport:function(t){return this.exports.add(t)},_notify:function(){},eventManager:{registerEvent:function(){return{trigger:function(){}}}}});return n.extend(p.prototype,u),p});