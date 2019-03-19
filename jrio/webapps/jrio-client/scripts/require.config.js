requirejs.config({
  enforceDefine: true,
  config: {
    moment: {
      noGlobal: true
    },
    logger: {
      enabled: true,
      level: 'error',
      appenders: ['console']
    },
    stdnav: {
    
    }
  },
  paths: {
    request: 'jrs-ui/src/transport/request',
    requestSettings: 'jrs-ui/src/config/requestSettings',
    backbone: 'jrs-ui/src/config/Backbone',
    'underscore.string': 'bower_components/underscore.string/lib/underscore.string',
    'requirejs.plugin.css': 'bower_components/require-css/css',
    'tv4.original': 'bower_components/tv4/tv4',
    'backbone.validation.original': 'bower_components/backbone-validation/dist/backbone-validation-amd',
    jquery: 'bower_components/jquery/dist/jquery',
    'lodash.custom': 'bower_components/lodash.custom/dist/lodash.custom',
    xregexp: 'bower_components/xregexp/xregexp-all',
    momentTimezone: 'bower_components/moment-timezone/builds/moment-timezone-with-data',
    moment: 'bower_components/moment/min/moment-with-locales',
    domReady: 'bower_components/requirejs-domready/domReady',
    xdm: 'bower_components/xdm/artifacts/v2.4.19/easyXDM.jasper',
    base64: 'bower_components/js-base64/base64',
    'backbone.epoxy.original': 'bower_components/backbone.epoxy/backbone.epoxy',
    'backbone.marionette': 'bower_components/backbone.marionette/lib/backbone.marionette',
    'backbone.wreqr': 'bower_components/backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': 'bower_components/backbone.babysitter/lib/backbone.babysitter',
    'jquery-ui': 'bower_components/jquery-ui/ui',
    'perfect-scrollbar': 'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery',
    'jquery.ui.mouse.touch': 'bower_components/jquery.ui.touch-punch/jquery.ui.touch-punch',
    'jquery.selection': 'bower_components/jquery.selection/src/jquery.selection',
    'jquery.urldecoder': 'bower_components/jquery.urldecoder/jquery.urldecoder',
    'jquery.jcryption': 'bower_components/jCryption/jquery.jcryption',
    underscore: 'bower_components/js-sdk/src/common/config/lodashTemplateSettings',
    tv4: 'bower_components/js-sdk/src/common/config/tv4Settings',
    'backbone.validation': 'common/extension/backboneValidationExtension',
    'backbone.epoxy': 'bower_components/js-sdk/src/common/extension/epoxyExtension',
    bundle: 'jrs-ui/src/plugin/bundle',
    text: 'jrs-ui/src/plugin/text',
    css: 'bower_components/js-sdk/src/common/plugin/css',
    csslink: 'bower_components/js-sdk/src/common/plugin/csslink',
    vizShim: 'js-sdk/src/common/plugin/vizShim',
    logger: 'bower_components/js-sdk/src/common/logging/logger',
    stdnav: 'common/stdnav/stdnav',
    stdnavPluginAnchor: 'common/stdnav/plugins/stdnavPluginAnchor',
    stdnavPluginButton: 'common/stdnav/plugins/stdnavPluginButton',
    stdnavPluginForms: 'common/stdnav/plugins/stdnavPluginForms',
    stdnavPluginGrid: 'common/stdnav/plugins/stdnavPluginGrid',
    stdnavPluginList: 'common/stdnav/plugins/stdnavPluginList',
    stdnavPluginTable: 'common/stdnav/plugins/stdnavPluginTable',
    async: 'bower_components/requirejs-plugins/src/async',
    common: 'bower_components/js-sdk/src/common',
    components: 'bower_components/js-sdk/src/components',
    json3: 'bower_components/json3/lib/json3',
    highcharts: 'bower_components/highcharts-pack/highcharts/highcharts',
    'highcharts-more': 'bower_components/highcharts-pack/highcharts/highcharts-more',
    'highcharts-heatmap': 'bower_components/highcharts-pack/highcharts/heatmap',
    'highcharts-treemap': 'bower_components/highcharts-pack/highcharts/treemap',
    'highcharts-grouped-categories': 'bower_components/highcharts-pack/highcharts/grouped-categories',
    'highcharts-solid-gauge': 'bower_components/highcharts-pack/highcharts/solid-gauge',
    'highcharts-3d': 'bower_components/highcharts-pack/highcharts/highcharts-3d',
    'bi/chart': 'bower_components/bi-chart/src',
    'backbone.original': 'bower_components/backbone/backbone',
    'bi/report': 'bower_components/bi-report/src/bi/report',
    fusioncharts: '../fusion/fusioncharts',
    fakeXhrFactory: 'jrs-ui/src/transport/fakeXhrFactory',
    'transport/xhrRequest': 'jrs-ui/src/transport/xhrRequest',
    'requirejs.plugin.text': 'bower_components/requirejs-text/text',
    restResource: 'jrs-ui/src/plugin/restResource',
    settings: 'jrs-ui/src/plugin/settings',
    'config/dateAndTimeSettings': 'jrs-ui/src/config/dateAndTimeSettings',
    jasper: 'loader/jasper',
    loader: 'loader',
    jrio: 'client/jrio',
    BiComponentFactory: 'client/BiComponentFactory'
  },
  shim: {
    jquery: {
      init: function() {
                return this.jQuery.noConflict();
            }
    },
    momentTimezone: {
      deps: ['moment']
    },
    base64: {
      exports: 'Base64',
      init: function () {
                return this.Base64.noConflict();
            }
    },
    'jquery.selection': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    'jquery.doubletap': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    'jquery.urldecoder': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    xregexp: {
      exports: 'XRegExp'
    },
    'jquery.jcryption': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    highcharts: {
      deps: ['jquery'],
      exports: 'Highcharts'
    },
    'highcharts-grouped-categories': {
      deps: ['highcharts'],
      exports: 'Highcharts'
    },
    'highcharts-more': {
      deps: ['highcharts'],
      exports: 'Highcharts'
    },
    'highcharts-heatmap': {
      deps: ['highcharts'],
      exports: 'Highcharts'
    },
    'highcharts-treemap': {
      deps: ['highcharts-heatmap'],
      exports: 'Highcharts'
    },
    'highcharts-solid-gauge': {
      deps: ['highcharts-more'],
      exports: 'Highcharts'
    },
    'highcharts-3d': {
      deps: ['highcharts'],
      exports: 'Highcharts'
    },
    'backbone.original': {
      deps: ['underscore'],
      exports: 'Backbone',
      init: null
    },
    fusioncharts: {
      exports: 'FusionCharts'
    },
    jasper: {
      deps: ['logger'],
      exports: 'jasper'
    },
    jrio: {
      deps: ['jasper','BiComponentFactory','bi/report/jive/jr/jive.all.deps'],
      exports: 'jrio'
    }
  },
  waitSeconds: 60,
  map: {
    '*': {
      xssUtil: 'common/util/xssUtil',
      'settings/localeSettings': 'jrs.configs',
      'settings/generalSettings': 'jrs.configs',
      'common/component/option/OptionContainer': 'common/component/base/OptionContainer',
      'settings/dateTimeSettings': 'settings!dateTimeSettings',
      'settings/decimalFormatSymbols': 'settings!decimalFormatSymbols'
    }
  },
  baseUrl: ''
});