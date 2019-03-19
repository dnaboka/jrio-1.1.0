define(["require","./BaseJiveComponentView","underscore","bundle!jasperreports_messages","bi/report/jive/factory/headerToolbarViewFactory","./overlay/JiveOverlayView","./overlay/ColumnResizeMarkerView","bi/report/jive/jr/dialogs/TableFilterDialog","bi/report/jive/jr/dialogs/TableFormatDialog","common/component/dialog/AlertDialog","bi/report/jive/enum/jiveActions","jquery","logger","text!./overlay/template/dragLabelTemplate.htm","jquery-ui/jquery.ui.draggable","jquery-ui/jquery.ui.position","css!jquery-ui/jquery-ui"],function(e){"use strict";function t(){this.overlay&&this.overlay.hide(),this.headerToolbar&&this.headerToolbar.hide(),this.resizeMarker&&this.resizeMarker.hide(),this.currentColumnData=null}function o(e,t,o){var i=t.get("message");u.isFunction(this[i])&&this[i](t,e.$el)}function i(e){var t=D(e.currentTarget),o=this.getColumnData(t);this.currentColumnData=o,this.selectColumn(o)}function r(e,t){this.resizingColumn=!0}function s(e,t){this.overlay.$el.width(t.position.left-this.overlay.$el.position().left)}function l(e,t){var o=this.model.get("scaleFactor")||1,i=(t.position.left-this.overlay.$el.position().left)/o;this.currentColumn.resize({width:8>i?8:Math.floor(i)}),this.resizingColumn=!1}function n(){var e,t,o,i,r,s=[],l=this.model.get("id");this.dropPoints=[],this.visibleColumnsMoveData=[],this.dropColumns=[];var n,a=this.reportContainer.find("table.jrPage td.jrcolHeader[data-tableuuid='"+l+"']").first();a.parents("table").each(function(e,t){return n=D(t),s=n.find("td.jrcolHeader[data-tableuuid='"+l+"']"),s.length>0?!1:void 0});var h={};for(t=0;t<s.length;t++){var d,c,f,p,g,m=D(s.get(t)).data("coluuid");h[m]||(d=n.find("td.jrcolHeader[data-coluuid='"+m+"']"),c=d.eq(0),f=d.size()>0?d.eq(d.size()-1):c,p=c.outerWidth(),g=c.position().left,d.each(function(e,t){var o=D(t);o.position().left<g&&(p+=g-o.position().left,g=o.position().left),o.position().left+o.outerWidth()>g+p&&(p=o.position().left+o.outerWidth()-g)}),h[m]={width:p,height:f.position().top-c.position().top+f.height(),colidx:f.data("colidx"),uuid:c.data("coluuid"),cellid:c.data("cellid"),offset:c.offset()})}s=[];for(r in h)h.hasOwnProperty(r)&&s.push(h[r]);for(s.sort(function(e,t){return e.colidx-t.colidx}),t=0;t<s.length;t++)e=s[t],o=e.offset.left,i=u.findWhere(this.model.config.allColumnsData,{uuid:e.uuid}),null!=i&&(i.visible=!0),this.dropColumns.push(e.cellid),this.dropPoints.push(o),this.visibleColumnsMoveData.push({left:o,right:o+e.width,width:e.width,index:null!=i?i.index:null,uuid:e.uuid}),t==s.length-1&&this.dropPoints.push(o+e.width);var v=[];for(t=0;t<this.dropColumns.length;t++)v.push(this.dropPoints[t]),v.push(this.dropPoints[t]+(this.dropPoints[t+1]-this.dropPoints[t])/2);v.push(this.dropPoints[t]),this.dropPoints=v}function a(e,t){this.currentColMoveData=u.findWhere(this.visibleColumnsMoveData,{uuid:this.currentColumn.get("id")});var o=2*D.inArray(this.currentColumnData.$header.data("cellid"),this.dropColumns);this.lefDropIndex=0===o?0:o-1,this.rightDropIndex=o+3===this.dropPoints.length?o+2:o+3,this.delta=this.resizeMarker.$el.position().left-this.dropPoints[o+2],this.dropColumnIndex=o,this.colToMoveToIndex=this.currentColMoveData.index}function h(e,t){var o,i,r,s,l=0,n=this.visibleColumnsMoveData.length,a=this.dropPoints;for(e.pageX<a[this.lefDropIndex]&&this.lefDropIndex>0&&(this.dropColumnIndex=this.lefDropIndex%2==1?this.lefDropIndex-1:this.lefDropIndex,this.resizeMarker.$el.css("left",a[this.dropColumnIndex]+this.delta+"px").show(),this.rightDropIndex=this.lefDropIndex,this.lefDropIndex--),e.pageX>a[this.rightDropIndex]&&this.rightDropIndex<a.length-1&&(this.dropColumnIndex=this.rightDropIndex%2==1?this.rightDropIndex+1:this.rightDropIndex,this.resizeMarker.$el.css("left",a[this.dropColumnIndex]+this.delta+"px").show(),this.lefDropIndex=this.rightDropIndex,this.rightDropIndex++),e.pageX>this.currentColMoveData.right?s=!0:e.pageX<this.currentColMoveData.left&&(s=!1);n>l;l++)if(o=this.visibleColumnsMoveData[l],e.pageX<=o.right){i=parseInt(o.index),r=o.left+o.width/2,e.pageX<=r?i>0?s===!0?this.colToMoveToIndex=i-1:s===!1&&(this.colToMoveToIndex=i):this.colToMoveToIndex=0:s===!0?this.colToMoveToIndex=i:s===!1&&(this.colToMoveToIndex=i+1);break}s&&null==this.colToMoveToIndex&&(this.colToMoveToIndex=parseInt(this.visibleColumnsMoveData[n-1].index))}function d(e,t){null!=this.colToMoveToIndex&&this.colToMoveToIndex!=this.currentColumn.get("columnIndex")&&this.currentColumn.move({index:this.colToMoveToIndex})}var c=e("./BaseJiveComponentView"),u=e("underscore"),f=e("bundle!jasperreports_messages"),p=e("bi/report/jive/factory/headerToolbarViewFactory"),g=e("./overlay/JiveOverlayView"),m=e("./overlay/ColumnResizeMarkerView"),v=e("bi/report/jive/jr/dialogs/TableFilterDialog"),b=e("bi/report/jive/jr/dialogs/TableFormatDialog"),C=e("common/component/dialog/AlertDialog"),T=e("bi/report/jive/enum/jiveActions"),D=e("jquery"),y=e("logger").register("Report"),x=e("text!./overlay/template/dragLabelTemplate.htm");return e("jquery-ui/jquery.ui.draggable"),e("jquery-ui/jquery.ui.position"),e("css!jquery-ui/jquery-ui"),c.extend({init:function(){this.reportContainer=this.getReportContainer(this.getReportId()),this.setGenericProperties(this.model.config.genericProperties),this.initJiveComponents(this.reportContainer),this.initTableEvents()},initTableEvents:function(){var e=this.model.get("id");this.headerToolbar&&this.listenTo(this.headerToolbar,"select",u.bind(o,this)),this.overlay&&this.listenTo(this.overlay,"overlayClicked",u.bind(t,this)),this.tableElement=this.getReportContainer(this.getReportId()),this.tableElement.on("click touchend",".jrPage td.jrcolHeader.interactiveElement[data-tableuuid="+e+"]",u.bind(i,this)),this.tableElement.on("click touchend",".jrPage td.jrcel[data-tableuuid="+e+"]",u.bind(i,this)),this.resizeMarker&&(this.listenTo(this.resizeMarker,"marker:dragStart",u.bind(r,this)),this.listenTo(this.resizeMarker,"marker:drag",u.bind(s,this)),this.listenTo(this.resizeMarker,"marker:dragStop",u.bind(l,this))),this.stateModel.isFloatingTableHeaderEnabled()&&this.model.get("hasFloatingHeader")&&(this.$scrollContainer=D(this.stateModel.get("container")),this.$scrollContainer.on("scroll",u.throttle(u.bind(this._scrollHeader,this),100,{leading:!0,trailing:!0})),this.scrollData={bMoved:!1,reportContainerPositionAtMove:null})},initJiveComponents:function(e){var t=this;this.overlay=new g({parentElement:e}),this.filterDialog=new v({i18n:f}),this.formatDialog=new b({i18n:f}),this.headerToolbar=p(this.model.get("type"),{parentElement:e,children:this.getHoverMenuChildren(),testFn:function(){return u.size(t.model.config.allColumnsData)!==u.compact(t.model.columns).length}}),this.headerToolbar.$el.addClass("jr_table"),this.resizeMarker=new m({parentElement:e}),this.overlay.$el.draggable({cursorAt:{top:40,left:-30},start:function(e,o){a.call(t,e,o)},drag:function(e,o){h.call(t,e,o)},stop:function(e,o){d.call(t,e,o)},helper:function(e){return D(u.template(x,{i18n:f})).show()}}),n.call(this)},sort:function(e){var t=e.get("order");t&&this.currentColumn.sort({order:t})},filter:function(e,t){this.filterDialog.open(this.currentColumn,t.offset())},format:function(e,t){this.formatDialog.open(this.currentColumn,t.offset())},hideColumn:function(e){this.currentColumn.hide()},showColumn:function(e){var t=e.get("index");this.currentColumn.unhide(u.isArray(t)?t:[t])},setGenericProperties:function(e){this.genericProperties=e},getGenericProperties:function(){return this.genericProperties},getHoverMenuChildren:function(){var e=[],t=this.model,o=u.map(t.config.allColumnsData,function(o,i){return o&&o.interactive?(e.push(o.index),{label:o.label,id:o.uuid,message:T.SHOW_COLUMN,action:"select",index:o.index,test:function(){return!u.find(t.columns,function(e){return e&&e.get("id")===o.uuid})}}):void 0});return o.unshift({label:f["net.sf.jasperreports.components.headertoolbar.label.showcolumns.all"],action:"select",message:T.SHOW_COLUMN,index:e}),u.compact(o)},getColumnData:function(e){var t,o,i=e.hasClass("jrcolHeader")?e.data("cellid"):e.attr("class").split(" ")[1].substring(4),r=this.reportContainer.find("table.jrPage td.jrcolHeader[data-cellid='"+i+"']"),s=r.eq(0),l=null,n=s.offset().left,a=this.model.get("scaleFactor");return t=o=s.outerWidth(),r.each(function(e,i){var r=D(i);r.offset().left<n&&(o+=n-r.offset().left,n=r.offset().left),r.offset().left+r.outerWidth()>n+o&&(o=r.offset().left+r.outerWidth()-n,t+=r.outerWidth())}),i=(""+i).replace(/\./g,"\\."),s.parents().each(function(e,t){var o,r=D("td.cel_"+i+":last",t);return r&&r.length>0?(o=r.css("height"),o=o.substring(0,o.indexOf("px")),l=r.offset().top+parseFloat(o)*a-s.offset().top,!1):void 0}),{$header:s,width:t*a,height:l?l:s.outerHeight()*a}},setCurrentColumn:function(e){this.currentColumn=u.find(this.model.columns,function(t){return t&&t.get("id")===e})},selectColumn:function(e){var t=e.$header.data("coluuid"),o=e.$header;this.setCurrentColumn(t),this.overlay.css({width:e.width,height:e.height}).show().setPosition({my:"left top",at:"left top",of:o,collision:"none"}),this.scrollData&&this.scrollData.bMoved?(this.headerToolbar.show(!0),this._setToolbarPositionWhenFloating(this._getHeaderTable())):this.headerToolbar.show(!0).setPosition({my:"left bottom+1",at:"left top",of:o,collision:"none"}),this.currentColumn.get("canSort")?(this.headerToolbar.buttons.enable("sortAsc"),this.headerToolbar.buttons.enable("sortDesc")):(this.headerToolbar.buttons.disable("sortAsc"),this.headerToolbar.buttons.disable("sortDesc")),this.currentColumn.get("canFilter")?this.headerToolbar.buttons.enable("filter"):this.headerToolbar.buttons.disable("filter"),this.resizeMarker.css({height:e.height}).show().setPosition({my:"left top",at:"right top",of:this.overlay.$el,collision:"none"})},render:function(e){var t=new D.Deferred;return this.setDataReportId(e,this.getReportId()),this.errorDialog=new C({additionalCssClasses:"jive_dialog"}),this.listenTo(this.model,"serverError",this.showError),this.stateModel.isDefaultJiveUiEnabled()?(this.init(),this.overlay&&this.overlay.render(),this.headerToolbar&&this.headerToolbar.render(),this.resizeMarker&&this.resizeMarker.render(),y.debug("Apply table jive component: ",this.jiveColumn),t.resolve(),t):(t.resolve(),t)},showError:function(e){this.errorDialog.setMessage(e.devmsg),this.errorDialog.open()},detachEvents:function(){this.tableElement&&this.tableElement.off()},remove:function(){this.overlay&&this.overlay.remove(),this.filterDialog&&this.filterDialog.remove(),this.formatDialog&&this.formatDialog.remove(),this.resizeMarker&&this.resizeMarker.remove(),this.headerToolbar&&this.headerToolbar.remove(),this.errorDialog&&this.errorDialog.remove(),this.$scrollContainer&&this.$scrollContainer.find("table.jr_floating_header").remove(),c.prototype.remove.call(this,arguments)},_scrollHeader:function(e){var t=this.$scrollContainer,o=!1,i=!1,r=this.scrollData;if(null!=r.scrollTop?t.scrollTop()!=r.scrollTop&&(r.scrollTop=t.scrollTop(),o=!0):0!==t.scrollTop()&&(r.scrollTop=t.scrollTop(),o=!0),null!=r.scrollLeft?t.scrollLeft()!=r.scrollLeft&&(r.scrollLeft=t.scrollLeft(),i=!0):0!==t.scrollLeft()&&(r.scrollLeft=t.scrollLeft(),i=!0),i||o||e){var s=t.find("td.jrcolHeader").first();if(s.length){var l=this._getHeaderTable(s),n=s.closest("table"),a=t.offset().top,h=s.closest("tr").offset().top,d=s.closest("table").find("td.jrcel").last(),c=d.length?d.offset().top-l.outerHeight()-a:-1,u=this.model.get("scaleFactor");!r.bMoved&&0>h-a&&c>0?(l.show(),u?(this._applyScaleTransform(l,u),l.offset({top:a,left:n.offset().left}),l.offset({top:a,left:n.offset().left})):l.offset({top:a,left:n.offset().left}),this._setToolbarPositionWhenFloating(l),r.bMoved=!0,r.reportContainerPositionAtMove||(r.reportContainerPositionAtMove=a)):r.bMoved&&0>h-a&&c>0?(l.show(),u?(this._applyScaleTransform(l,u),l.offset({top:a,left:n.offset().left})):l.offset({top:a,left:n.offset().left}),this._setToolbarPositionWhenFloating(l)):r.bMoved&&(l.hide(),r.bMoved=!1,this._setToolbarDefaultPosition())}}},_getHeaderTable:function(e){var t=this.$scrollContainer.find("table.jr_floating_header");if(0===t.length){t=D("<table class='jr_floating_header' style='display:none'/>").appendTo(this.$scrollContainer),t.on("click touchend",".jrcolHeader",function(e){if(!D(e.target).parent().is("._jrHyperLink")){var o=D(this),i=o.data("coluuid"),r=t.parent().find("table.jrPage td.jrcolHeader[data-coluuid="+i+"]:first");return r.length&&r.trigger("click"),!1}});var o,i,r,s,l,n,a,h,d,c,u,f,p,g=e.closest("table"),m=g.find("td.jrcolHeader").last(),v=[],b=[];if(e.length>0){if(i=e.closest("tr"),s=m.closest("tr"),f=e.closest("table"),i===s)v.push(i);else for(p=g.find("tr"),h=p.index(i),d=p.index(s),c=h;d>=c;c++)v.push(p.get(c));D.each(v,function(e,i){for(r=D(i),a=r.find("td"),o=D("<tr></tr>"),r.attr("valign")&&o.attr("valign",r.attr("valign")),b[e]=0,h=0,u=a.length;u>h;h++)n=D(a.get(h)),l=n.clone(),b[e]=b[e]+n.outerWidth(),l.css("width",n.css("width")),l.css("height",n.css("height")),o.append(l);t.append(o)}),t.css({position:"relative",width:Math.max.apply(Math,b),"empty-cells":f.css("empty-cells"),"border-collapse":f.css("border-collapse"),"background-color":f.css("background-color")}),t.attr("cellpadding",f.attr("cellpadding")),t.attr("cellspacing",f.attr("cellspacing")),t.attr("border",f.attr("border"))}}return t},_setToolbarPositionWhenFloating:function(e){var t,o,i=this.headerToolbar;i.$el.is(":visible")&&(t=e.find("td.jrcolHeader[data-cellid='"+this.currentColumnData.$header.data("cellid")+"']").first(),t.offset().top>e.offset().top?(o=t.offset().top-e.offset().top-i.$el.outerHeight(),0>o?i.setPosition({my:"left bottom+"+Math.abs(o),at:"left top",of:t,collision:"none"}):i.setPosition({my:"left bottom",at:"left top",of:t,collision:"none"})):i.setPosition({my:"left top",at:"left top",of:t,collision:"none"}))},_setToolbarDefaultPosition:function(){this.headerToolbar.$el.is(":visible")&&this.headerToolbar.setPosition({my:"left bottom+1",at:"left top",of:this.currentColumnData.$header})}})});