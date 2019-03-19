({
  "dir": "build/optimized/",
  "mainConfigFile": "require.config.js",
  "optimizeCss": "none",
  "optimize": "uglify2",
  "skipDirOptimize": false,
  "removeCombined": false,
  "preserveLicenseComments": false,
  "paths": {
    "common": "bower_components/js-sdk/src/common",
    "jquery": "empty:",
    "prototype": "empty:",
    "report.global": "empty:",
    "wcf.scroll": "empty:",
    "ReportRequireJsConfig": "empty:",
    "fusioncharts": "empty:",
    "ireport.highcharts.default.service": "empty"
  },
  "uglify2": {
    "output": {
      "ascii_only": true
    }
  },
  "inlineText": true,
  "excludeText": [],
  "modules": [
    {
      "name": "jasper",
      "include": [
        "bower_components/jquery/dist/jquery",
        "loader/jqueryNoConflict",
        "logger"
      ]
    }
  ],
  "fileExclusionRegExp": /(^\.|prototype.*patched\.js|Owasp\.CsrfGuard\.js)/,
  "shim": {
    "mustache": {
      "init": function() {
                    return Mustache;
                }
    }
  }
})