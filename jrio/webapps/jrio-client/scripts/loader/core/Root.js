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
 * @version $Id: Root.js 14428 2018-02-20 13:57:14Z dgorbenk $
 */

/*global __jrsConfigs__ */

define(function (require) {
    "use strict";

    var _ = require("underscore"),
        $ = require("jquery"),
        request = require("request"),
        helper = require("./util/helper"),
        log = require("logger").register("Root");

    function logResults(message, result){
        log.debug(message, result);
        return result;
    }

    function Root(baseUrl, loggerEnabled, logLevel, scripts){
        this.isLoggerEnabled = loggerEnabled;
        this.logLevel = logLevel;

        this.scripts = scripts;

        this.baseUrl = baseUrl;
    }

    _.extend(Root.prototype, {
        requirejs : function(){

            var dfd = new $.Deferred(),
                scriptsUrl = this.scripts ? this.scripts : "scripts";

            var requireConfigUrl = scriptsUrl + "/require.config.js",
                logJrs = _.partial(logResults, "Script loader configs for JRS: "),
                jrsConfigPromise,
                self = this;

            jrsConfigPromise = request({
                url : requireConfigUrl,
                dataType: "text"
            })
            .then(helper.loaderConfig)
            .then(function(result) {
                result.baseUrl = scriptsUrl;
                if(result.config && result.config.logger){
                    result.config.logger.enabled = self.isLoggerEnabled;
                    result.config.logger.level = self.logLevel;
                }
                return result;
            })
            .then(logJrs);

            $.when(jrsConfigPromise)
                .then(function(jrsConfigs) {
                    return jrsConfigs;
                }, dfd.reject)
                .then(dfd.resolve);

            return dfd.promise();
        }
    });

    return Root;
});