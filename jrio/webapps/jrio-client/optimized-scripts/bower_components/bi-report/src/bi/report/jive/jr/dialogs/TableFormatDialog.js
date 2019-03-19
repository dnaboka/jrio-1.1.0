define(["require","underscore","common/component/dialog/Dialog","bundle!CommonBundle","common/component/panel/trait/tabbedPanelTrait","text!./template/tableFormatDialogTemplate.htm","text!./template/tabOptionTemplate.htm","./view/TableBasicFormatView","./view/TableConditionCollectionView"],function(t){"use strict";function o(t){if(this.conditionFormatView.validate()){var o=[];o.push.apply(o,this.basicFormatView.getActions()),o.push.apply(o,this.conditionFormatView.getActions()),o.length&&this.columnComponentModel.format(o),this.close()}}function e(){this.basicFormatView.clear(),this.conditionFormatView.clear(),this.close()}function i(){var t=this.columnComponentModel.parent.columns.indexOf(this.columnComponentModel),o=this.columnComponentModel.parent.columns.length;t>0?this.$el.find("button.colprev").prop("disabled",!1):this.$el.find("button.colprev").prop("disabled",!0),o-1>t?this.$el.find("button.colnext").prop("disabled",!1):this.$el.find("button.colnext").prop("disabled",!0)}var n=t("underscore"),a=t("common/component/dialog/Dialog"),l=t("bundle!CommonBundle"),s=t("common/component/panel/trait/tabbedPanelTrait"),m=t("text!./template/tableFormatDialogTemplate.htm"),c=t("text!./template/tabOptionTemplate.htm"),r=t("./view/TableBasicFormatView"),d=t("./view/TableConditionCollectionView");return a.extend({defaultTemplate:m,events:n.extend({"click button.colprev":"_goToPreviousColumn","click button.colnext":"_goToNextColumn"},a.prototype.events),el:function(){return this.template({title:this.title,additionalCssClasses:this.additionalCssClasses,i18n:this.i18n})},constructor:function(t){this.i18n=t.i18n,this.basicFormatView=new r({i18n:this.i18n}),this.conditionFormatView=new d({i18n:this.i18n}),a.prototype.constructor.call(this,{buttons:[{label:l["button.cancel"],action:"cancel",primary:!1,"float":"right"},{label:l["button.ok"],action:"ok",primary:!0,"float":"right"}],additionalCssClasses:"tableFormatDialog",modal:!0,resizable:!1,traits:[s],tabHeaderContainerSelector:".dialogHeader > .tabContainer",tabContainerClass:"jive_form_container",optionTemplate:c,tabs:[{label:this.i18n["net.sf.jasperreports.components.headertoolbar.title.basicformat"],action:"basicFormatTab",content:this.basicFormatView},{label:this.i18n["net.sf.jasperreports.components.headertoolbar.title.conditions"],action:"conditionalFormatTab",content:this.conditionFormatView}]}),this.on("button:ok",n.bind(o,this)),this.on("button:cancel",n.bind(e,this)),this.on("tab:basicFormatTab",function(){return this.conditionFormatView.validate()?void this.conditionFormatView.trigger("tabSwitched"):(this.tabHeaderContainer.options[0].removeSelection(),this.$(this.$tabs.get(0)).hide(),this.tabHeaderContainer.options[1].addSelection(),void this.$(this.$tabs.get(1)).show())}),this.on("tab:conditionalFormatTab",function(){this.basicFormatView.trigger("tabSwitched")})},open:function(t,o){var e=t.get("columnLabel")?t.get("columnLabel"):"#"+(t.get("columnIndex")+1);this.columnComponentModel=t,this.$el.find(".dialogTitle.columnLabel").text(e),this.basicFormatView.setColumnComponentModel(this.columnComponentModel),this.conditionFormatView.setColumnComponentModel(this.columnComponentModel),a.prototype.open.call(this,o),this.openTab("basicFormatTab"),i.call(this)},_goToPreviousColumn:function(t){if(this.conditionFormatView.validate()){var o=this.columnComponentModel.collection.indexOf(this.columnComponentModel),e=this.columnComponentModel.collection.at(o-1),n=e.get("columnLabel")?e.get("columnLabel"):"#"+(e.get("columnIndex")+1);this.basicFormatView.setColumnComponentModel(e,!0),this.conditionFormatView.setColumnComponentModel(e,!0),this.$el.find(".dialogTitle.columnLabel").text(n),this.columnComponentModel=e,i.call(this)}},_goToNextColumn:function(t){if(this.conditionFormatView.validate()){var o=this.columnComponentModel.parent.columns.indexOf(this.columnComponentModel),e=this.columnComponentModel.parent.columns[o+1],n=e.get("columnLabel")?e.get("columnLabel"):"#"+(e.get("columnIndex")+1);this.basicFormatView.setColumnComponentModel(e,!0),this.conditionFormatView.setColumnComponentModel(e,!0),this.$el.find(".dialogTitle.columnLabel").text(n),this.columnComponentModel=e,i.call(this)}},remove:function(){a.prototype.remove.call(this),this.basicFormatView&&this.basicFormatView.remove(),this.conditionFormatView&&this.conditionFormatView.remove()}})});