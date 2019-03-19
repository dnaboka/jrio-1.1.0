/*
 * Copyright (C) 2005 - 2018 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 * Licensed under commercial Jaspersoft Subscription License Agreement
 */

/**
 * @author: Igor Nesterenko, Zakhar Tomchenko
 * @version: $Id: jrio.js 14428 2018-02-20 13:57:14Z dgorbenk $
 */

/* global jasper */

;(function(root, jasper) {
    var version = "0.0.1a",
        jrioData = {
            bis: {},
            facts: {},
            config: {}
        };

    //we shouldn't expect on underscore here

    function extend(obj){
        var each =  Array.prototype.forEach,
            slice = Array.prototype.slice;
        each.call(slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    }

    var jrio = function (param, param2) {
        var properties, bi, callback,
            dependencies = ["BiComponentFactory", "jquery", "css", "config/dateAndTimeSettings"];

        if (typeof param == 'function') {
            properties = jrioData.config;
            callback = param;
        } else {
            properties = extend({}, jrioData.config, param);
            callback = param2;
        }

        bi = jrioData.bis[properties.server];
        if (!bi) {
            bi = jasper({
                url : properties.server,
                scripts: properties.scripts,
                logEnabled: properties.logEnabled,
                logLevel: properties.logLevel,

                userLocale: properties.locale,
                extend: extend
            });
            jrioData.bis[properties.server] = bi;
        }

        var cssDependencies = [
            "jasper-ui/jasper-ui",
            "jquery-ui/jquery-ui",
            //dashboard dependencies
            "panel",
            "webPageView",
            "pagination",
            "menu",
            "simpleColorPicker",
            "notifications"
        ];

        bi(dependencies, function(BiComponentFactory, $, cssPlugin) {

            var factory = jrioData.facts[properties.server];

            if (!factory) {
                factory = new BiComponentFactory({
                    server: properties.server
                });
                jrioData.facts[properties.server] = factory;
            }

            if (properties.theme){
                cssDependencies.forEach(function(cssId) {
                    //run css loading manually
                    cssPlugin.manualLoad(cssId, properties.theme);
                });
            }

            var v = createV(factory);
            callback && callback(v);
        });
    };

    jrio.version = version;
    jrio.config = function(config) {
        extend(jrioData.config, config);
    };

    function createV(factory){
        var v = function (param) {
            if (typeof param == 'string' || Object.prototype.toString.call(param) === "[object String]") {
                // v("#container").report({...});
                return {
                    report: (function(selector) {
                        return function(options) {
                            factory.report(extend({container: selector}, options));
                        }
                    })(param)
                }
            }
        };
        extend(v, factory);
        return v;
    }

    // noConflict functionality
    var _jrio = root.jrio;

    jrio.noConflict = function () {
        if (root.jrio === jrio) {
            root.jrio = _jrio;
        }

        return jrio;
    };

    // Add jrio to global scope
    root.jrio = jrio;

})(this, jasper);
