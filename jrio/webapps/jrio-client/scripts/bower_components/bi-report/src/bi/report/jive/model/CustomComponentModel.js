/*
 * Copyright (C) 2005 - 2014 Jaspersoft Corporation. All rights reserved.
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
 * @version: $Id$
 */

define(function (require) {

    "use strict";

    var BaseComponentModel = require("./BaseComponentModel"),
        jiveTypes = require("../enum/jiveTypes"),
        _ = require("underscore"),
        localResourceTemplate = _.template("{{=uri}}?noext");

    return BaseComponentModel.extend({
        defaults: function() {
            return {
                id: null,
                type: jiveTypes.CUSTOM_VISUALIZATION_COMPONENT,
                script: null,
                css: null
            };
        },
        parse: function(attributes, options) {
            attributes = _.defaults(attributes,{
                server: options.parent.contextPath,
                report: options.parent.get("reportURI")
            });

            attributes.script = {
                name : attributes.renderer,
                href : localResourceTemplate({ uri: attributes.instanceData.script_uri })
            };

            if(attributes.instanceData.css_uri){
                attributes.css = {
                    name : attributes.id + "_css",
                    href : localResourceTemplate({ uri: attributes.instanceData.css_uri })
                };
            }
            return attributes;
        },

        constructor: function(attributes, options) {
            attributes || (attributes = {});

            if (!attributes.instanceData.script_uri){
                throw new Error("Can't initialize without script name");
            }

            BaseComponentModel.prototype.constructor.apply(this, arguments);
        }
    });
});
