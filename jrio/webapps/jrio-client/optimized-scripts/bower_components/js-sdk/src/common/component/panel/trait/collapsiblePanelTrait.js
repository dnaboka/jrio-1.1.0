define(["require","underscore","jquery","./abstractPanelTrait"],function(l){"use strict";function e(l,e){!e&&l.stopPropagation(),this.onCollapseControlPressed?this.onCollapseControlPressed(l):this.toggleCollapsedState()}function s(){this.$collapser&&this.$collapser.off("mousedown"),this.$el&&this.$el.find(this.expandOnDblClickSelector).off("dblclick")}var t=l("underscore"),o=l("jquery"),n=l("./abstractPanelTrait");return t.extend({},n,{onConstructor:function(l){this.collapserClass=l.collapserClass||"buttonIconToggle",this.collapserSelector=l.collapserSelector||".buttonIconToggle",this.collapsiblePanelClass=l.collapsiblePanelClass||"collapsiblePanel",this.expandOnDblClickSelector=l.expandOnDblClickSelector||"> p:first",this.allowEventPropagation=!!l.allowMouseDownEventPropagation,this.onCollapseControlPressed=l.onCollapseControlPressed},beforeSetElement:function(){s.call(this)},afterSetElement:function(){this.$el.addClass(this.collapsiblePanelClass),this.$collapser=this.$(this.collapserSelector),this.$collapser.length||(this.$collapser=o("<button></button>").addClass(this.collapserClass),this.$("> .header").prepend(this.$collapser)),this.$collapser.on("mousedown",t.bind(e,this,this.allowEventPropagation)),this.$el.find(this.expandOnDblClickSelector).on("dblclick",t.bind(e,this))},onRemove:function(){s.call(this)}})});