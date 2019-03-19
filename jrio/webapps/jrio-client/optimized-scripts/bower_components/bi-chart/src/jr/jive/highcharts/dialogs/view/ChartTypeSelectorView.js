define(["require","underscore","jquery","backbone","bundle!adhoc_messages","common/component/tooltip/Tooltip","text!../template/chartTypeSelectorDialogContentTemplate.htm"],function(t){"use strict";var e=t("underscore"),o=t("jquery"),i=t("backbone"),n=t("bundle!adhoc_messages"),a=t("common/component/tooltip/Tooltip"),l=t("text!../template/chartTypeSelectorDialogContentTemplate.htm");return i.View.extend({template:e.template(l),initialize:function(){var t=this;this.$el=o(this.template({i18n:n})),this.tooltip=a.attachTo(this.$el,{cssClasses:"jive_tooltip tooltip info",contentTemplate:'<p class="message">{{- model.msg }}</p>'}),this.$el.find("[data-tooltip]").on("mouseover",function(e){var i=o(o(this).attr("data-tooltip")).text();t.tooltip.show({msg:i})}),this.$el.find("[data-tooltip]").on("mouseout",function(e){t.tooltip.hide()})},render:function(){return this},remove:function(){this.tooltip.remove(),i.View.prototype.remove.apply(this,arguments)}})});