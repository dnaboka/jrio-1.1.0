/*
 * Copyright (C) 2005 - 2018 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * @author: Igor Nesterenko
 * @version $Id: jasper.js 14428 2018-02-20 13:57:14Z dgorbenk $
 */

/*global jasperContext, window, console, jasperjs, require, requirejs, __jrsConfigs__ */

(function(global){

    "use strict";

    var errors = {
            BASE_URL_NOT_FOUND : "Illegal 'conf' argument, it should be url to server or contain 'url' property",
            ILLEGAL_CALLBACK : "Illegal 'callback' argument, it should be function or undefined"
        },
        defaultCallback = function(err){
            if (err){
                throw err;
            }
        },
        LoadManager = function(jasperCallback, jasperError){
            function execute() {
                jasperCallback && jasperCallback.call(this, jasperError, this.require);
                for (var i = 0; i < this._callbacks.length; i++) {
                    this._callbacks[i](this.require);
                }
            }

            this._callbacks = [];

            this.then = function(handler){
                if (this.require){
                    handler(this.require);
                } else {
                    this._callbacks.push(handler);
                }
            };

            this.resolveConfig = function(req){
                this.require = req;
                execute.call(this);
            }
        };

    function jasper(conf, callback){

        var error, url, userLocale, extend, root, loggerEnabled, logLevel, scripts, loaderPromise, result;

        if (conf){
            if (typeof conf === "object"){
                url = conf.url;
                loggerEnabled = conf.logEnabled;
                logLevel = conf.logLevel;
                scripts = conf.scripts;
                userLocale = conf.userLocale;
                extend = conf.extend;

                require.config({
                    config: {
                        logger : {
                            enabled : conf.logEnabled,
                            level : conf.logLevel,
                            appenders: ["console"]
                        }
                    }
                });
            } else if (typeof conf === "string"){
                url = conf;
            }
        }

        if (!url){
            error =  new Error(errors.BASE_URL_NOT_FOUND);
        }

        if (callback){
            if (typeof callback !== "function"){
                error = new Error(errors.ILLEGAL_CALLBACK);
                callback = null;
            }
        }

        if (!callback){
            callback = defaultCallback;
        }

        if (error){
            callback.apply(this, [error]);
            result = function(modules){
                throw new Error("Can't load " + modules);
            };
        } else {
            loaderPromise = new LoadManager(callback, error);

            var serverSettings = {
                userLocale: userLocale,
                runtimeContextPath: url
            };

            if (typeof __jrsConfigs__ !== "undefined") {
                //Use instance of __jrsConfigs__ from local lexical scope if possible
                extend(__jrsConfigs__, serverSettings);
            } else {
                window.__jrsConfigs__ = serverSettings;
            }

            require(["loader/core/Root"], function(Root) {
                root = new Root(url, loggerEnabled, logLevel, scripts);

                root.requirejs().done(function(reqConfig) {
                    //apply require config
                    var req = requirejs.config(reqConfig);
                    loaderPromise.resolveConfig(req);
                });

            }, callback);

            result = function (modules, handler) {
                loaderPromise.then(function (req) {
                    req.apply(this, [modules, handler, callback]);
                });
            };

        }

        return result;
    }

    // noConflict functionality
    var _jasper = global.jasper,
        _jasperjs = global.jasperjs;

    jasper.noConflict = function (deep) {
        if (global.jasper === jasper) {
            global.jasper = _jasper;
        }

        if (deep && global.jasperjs === jasperjs) {
            global.jasperjs = _jasperjs;
        }

        return jasper;
    };

    // Added jasper to global scope
    global.jasper = jasper;
    global.jasperjs = jasper;

    jasper._errors_ = errors;

    jasper.version = "0.0.1a";
})(this);
