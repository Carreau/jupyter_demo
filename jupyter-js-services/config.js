// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var utils = require('./utils');
/**
 * The url for the config service.
 */
var SERVICE_CONFIG_URL = 'api/config';
/**
 * Create a config section.
 *
 * @returns A Promise that is fulfilled with the config section is loaded.
 */
function getConfigSection(sectionName, baseUrl, ajaxOptions) {
    var section = new ConfigSection(sectionName, baseUrl);
    return section.load(ajaxOptions);
}
exports.getConfigSection = getConfigSection;
/**
 * Implementation of the Configurable data section.
 */
var ConfigSection = (function () {
    /**
     * Create a config section.
     */
    function ConfigSection(sectionName, baseUrl) {
        this._url = "unknown";
        this._data = {};
        this._url = utils.urlPathJoin(baseUrl, SERVICE_CONFIG_URL, utils.urlJoinEncode(sectionName));
    }
    Object.defineProperty(ConfigSection.prototype, "data", {
        /**
         * Get the data for this section.
         *
         * #### Notes
         * This is a read-only property.
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Load the initial data for this section.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/config).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    ConfigSection.prototype.load = function (ajaxOptions) {
        var _this = this;
        return utils.ajaxRequest(this._url, {
            method: "GET",
            dataType: "json",
        }, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 200) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            _this._data = success.data;
            return _this;
        });
    };
    /**
     * Modify the stored config values.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/config).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * Updates the local data immediately, sends the change to the server,
     * and updates the local data with the response, and fullfils the promise
     * with that data.
     */
    ConfigSection.prototype.update = function (newdata, ajaxOptions) {
        var _this = this;
        this._data = utils.extend(this._data, newdata);
        return utils.ajaxRequest(this._url, {
            method: "PATCH",
            data: JSON.stringify(newdata),
            dataType: "json",
            contentType: 'application/json',
        }, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 200) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            _this._data = success.data;
            return _this._data;
        });
    };
    return ConfigSection;
})();
/**
 * Configurable object with defaults.
 */
var ConfigWithDefaults = (function () {
    /**
     * Create a new config with defaults.
     */
    function ConfigWithDefaults(section, defaults, classname) {
        this._section = null;
        this._defaults = null;
        this._className = "unknown";
        this._section = section;
        this._defaults = defaults;
        this._className = classname;
    }
    /**
     * Get data from the config section or fall back to defaults.
     */
    ConfigWithDefaults.prototype.get = function (key) {
        return this._classData()[key] || this._defaults[key];
    };
    /**
     * Set a config value.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/config).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     *
     * Sends the update to the server, and changes our local copy of the data
     * immediately.
     */
    ConfigWithDefaults.prototype.set = function (key, value) {
        var d = {};
        d[key] = value;
        if (this._className) {
            var d2 = {};
            d2[this._className] = d;
            return this._section.update(d2);
        }
        else {
            return this._section.update(d);
        }
    };
    /**
     * Get data from the Section with our classname, if available.
     *
     * #### Notes
     * If we have no classname, get all of the data in the Section
     */
    ConfigWithDefaults.prototype._classData = function () {
        if (this._className) {
            return this._section.data[this._className] || {};
        }
        else {
            return this._section.data;
        }
    };
    return ConfigWithDefaults;
})();
exports.ConfigWithDefaults = ConfigWithDefaults;
//# sourceMappingURL=config.js.map