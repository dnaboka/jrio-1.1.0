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
 * @version: $Id: TooltipPopupModel.js 3283 2016-10-30 12:03:08Z inestere $
 */

define(function (require, exports, module) {
    "use strict";

    var Backbone = require("backbone"),
        tooltipPlacements = require("../enum/tooltipPlacements"),
        BackboneValidation = require("backbone.validation"),
        _ = require("underscore"),
        log = require("logger").register(module);


    var TooltipPopupModel =  Backbone.Model.extend({

        defaults: {
            visible: false,
            content: {
                title: undefined,
                text: undefined
            },
            x: 0,
            y: 0,
            placement: tooltipPlacements.BOTTOM,
            position: {
                x: 0,
                y: 0
            }
        },

        validation: {
            y: {
                type: "number"
            },
            x: {
                type: "number"
            },
            visible: {
                type: "boolean"
            },
            content: {
                type: "object"
            }
        },

        initialize: function (options) {

            options = options || {};

            this.log = options.log || log;

            this.listenTo(this, "invalid", function (model, message) {
                this.log.error(message);
            });
        }

    });

    _.extend(TooltipPopupModel.prototype, BackboneValidation.mixin);

    return TooltipPopupModel;
});
