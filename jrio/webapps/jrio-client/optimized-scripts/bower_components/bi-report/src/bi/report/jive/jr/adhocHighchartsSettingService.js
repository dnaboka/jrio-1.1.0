define(["jquery","adhoc/api/chart/adhocToHighchartsAdapter","underscore"],function(e,t,a){function r(e,t,a,r){t.events[e.toLowerCase()]&&(a.point.events[e]=function(s){var i=this;t.events[e.toLowerCase()].call(this,n.getHyperlink(a,i,r.queryData.metadata.isOLAP),s)})}var n={perform:function(s,i,c){var u=i.chartState,o=i.extraOptions;if(i.chartType&&(u.chartType=i.chartType),o){var h=e("table.jrPage");h.length&&(o.width=h.parent().width(),o.height=h.parent().height()||400)}e.extend(s,t.generateOptions(i.queryData,u,o)),c&&c.events&&c.events&&("timeseries_heatmap"==s.series[0].chartType&&(s.chart.events||(s.chart.events={}),c.events.click&&(s.chart.events.click=function(e){var t=this.hoverPoint,a=t.series.options;c.events.click.call(this,n.getHyperlink(a,t,i.queryData.metadata.isOLAP),e)})),a.forEach(s.series,function(e){e.cursor="pointer",e.point||(e.point={}),e.point.events={},"timeseries_heatmap"!==e.chartType&&r.call(this,"click",c,e,i),r.call(this,"mouseOver",c,e,i),r.call(this,"mouseOut",c,e,i)}))},getOutputParams:function(e,t){var a=[];return e.columnsOutputParams&&(a=a.concat(e.columnsOutputParams)),t.rowsOutputParams&&(a=a.concat(t.rowsOutputParams)),"heatmap"==e.chartType&&e.heatmapXCategories&&(a[0].value=e.heatmapXCategories[t.x]),a},getHyperlink:function(e,t,r){return{type:"AdHocExecution",parameters:a.reduce(n.getOutputParams(e,t),function(e,t){return r&&"Measures"!==t.name.dimension?e["["+t.name.dimension+"]"+t.name.name]=t.value:"Measures"===t.name.name||"MeasuresLevel"===t.name.name?e[t.name.name]=a.isArray(t.value)?t.value:[t.value]:e[t.name.name]=t.value,e},{})}}};return n});