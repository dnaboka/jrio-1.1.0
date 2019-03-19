({
  "mainConfigFile": "require.config.js",
  "optimizeCss": "none",
  "optimize": "uglify2",
  "uglify2": {
    "output": {
      "ascii_only": true
    }
  },
  "namespace": "__jrio__",
  "skipDirOptimize": true,
  "removeCombined": true,
  "preserveLicenseComments": false,
  "excludeText": [],
  "paths": {
    "jquery": "empty:",
    "fusioncharts": "empty:",
    "jasper": "loader/jasper"
  },
  "shim": {
    "jrio": {
      "deps": [
        "jasper",
        "BiComponentFactory",
        "jive.component.deps",
        "config/dateAndTimeSettings"
      ],
      "exports": "jrio"
    },
    "mustache": {
      "init": function() {
                return Mustache;
            }
    },
    "backbone.original": {
      "deps": [
        "underscore",
        "bower_components/jquery/dist/jquery"
      ],
      "exports": "Backbone",
      "init": function() {
                var Backbone = this.Backbone;
                Backbone.noConflict();
                return Backbone;
            }
    }
  },
  "name": "jrio",
  "include": [
    "bower_components/requirejs/require",
    "vizShim"
  ],
  "wrap": {
    "startFile": "client/jrio.js.start.frag",
    "endFile": "client/jrio.js.end.frag"
  },
  "out": "build/optimized/client/jrio.js",
  "fileExclusionRegExp": /(^\.|prototype.*patched\.js)/
})