// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var utils = require('./utils');
var validate = require('./validate');
/**
 * The url for the contents service.
 */
var SERVICE_CONTENTS_URL = 'api/contents';
/**
 * A contents handle passing file operations to the back-end.
 *
 * This includes checkpointing with the normal file operations.
 */
var Contents = (function () {
    /**
     * Create a new contents object.
     */
    function Contents(baseUrl) {
        this._apiUrl = "unknown";
        this._apiUrl = utils.urlPathJoin(baseUrl, SERVICE_CONTENTS_URL);
    }
    /**
     * Get a file or directory.
     *
     * @param path: Path to the file or directory.
     * @param options: Use `options.content = true` to return file contents.
  
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.get = function (path, options, ajaxOptions) {
        var settings = {
            method: "GET",
            dataType: "json",
        };
        var url = this._getUrl(path);
        var params = {};
        if (options.type) {
            params.type = options.type;
        }
        if (options.format) {
            params.format = options.format;
        }
        if (options.content === false) {
            params.content = '0';
        }
        url = url + utils.jsonToQueryString(params);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 200) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            validate.validateContentsModel(success.data);
            return success.data;
        });
    };
    /**
     * Create a new untitled file or directory in the specified directory path.
     *
     * @param path: The directory in which to create the new file/directory.
     * @param options: Use `ext` and `type` options to choose the type of file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.newUntitled = function (path, options, ajaxOptions) {
        var settings = {
            method: "POST",
            dataType: "json",
        };
        if (options) {
            var data = JSON.stringify({
                ext: options.ext,
                type: options.type
            });
            settings.data = data;
            settings.contentType = 'application/json';
        }
        var url = this._getUrl(path);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 201) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            validate.validateContentsModel(success.data);
            return success.data;
        });
    };
    /**
     * Delete a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.delete = function (path, ajaxOptions) {
        var settings = {
            method: "DELETE",
            dataType: "json",
        };
        var url = this._getUrl(path);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 204) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
        }, // Translate certain errors to more specific ones.
        function (error) {
            // TODO: update IPEP27 to specify errors more precisely, so
            // that error types can be detected here with certainty.
            if (error.xhr.status === 400) {
                throw new Error('Directory not found');
            }
            throw new Error(error.xhr.statusText);
        });
    };
    /**
     * Rename a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.rename = function (path, newPath, ajaxOptions) {
        var data = { path: newPath };
        var settings = {
            method: "PATCH",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: 'application/json',
        };
        var url = this._getUrl(path);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 200) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            validate.validateContentsModel(success.data);
            return success.data;
        });
    };
    /**
     * Save a file.
     *
     * #### Notes
     * Ensure that `model.content` is populated for the file.
     *
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.save = function (path, model, ajaxOptions) {
        var settings = {
            method: "PUT",
            dataType: "json",
            data: JSON.stringify(model),
            contentType: 'application/json',
        };
        var url = this._getUrl(path);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            // will return 200 for an existing file and 201 for a new file
            if (success.xhr.status !== 200 && success.xhr.status !== 201) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            validate.validateContentsModel(success.data);
            return success.data;
        });
    };
    /**
     * Copy a file into a given directory.
     *
     * #### Notes
     * The server will select the name of the copied file.
     *
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.copy = function (fromFile, toDir, ajaxOptions) {
        var settings = {
            method: "POST",
            data: JSON.stringify({ copy_from: fromFile }),
            contentType: 'application/json',
            dataType: "json",
        };
        var url = this._getUrl(toDir);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 201) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            validate.validateContentsModel(success.data);
            return success.data;
        });
    };
    /**
     * List notebooks and directories at a given path.
     *
     * @param: path: The path to list notebooks in.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.listContents = function (path, ajaxOptions) {
        return this.get(path, { type: 'directory' }, ajaxOptions);
    };
    /**
     * Create a checkpoint for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.createCheckpoint = function (path, ajaxOptions) {
        var settings = {
            method: "POST",
            dataType: "json",
        };
        var url = this._getUrl(path, 'checkpoints');
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 201) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            validate.validateCheckpointModel(success.data);
            return success.data;
        });
    };
    /**
     * List available checkpoints for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.listCheckpoints = function (path, ajaxOptions) {
        var settings = {
            method: "GET",
            dataType: "json",
        };
        var url = this._getUrl(path, 'checkpoints');
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 200) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
            if (!Array.isArray(success.data)) {
                throw Error('Invalid Checkpoint list');
            }
            for (var i = 0; i < success.data.length; i++) {
                validate.validateCheckpointModel(success.data[i]);
            }
            return success.data;
        });
    };
    /**
     * Restore a file to a known checkpoint state.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.restoreCheckpoint = function (path, checkpointID, ajaxOptions) {
        var settings = {
            method: "POST",
            dataType: "json",
        };
        var url = this._getUrl(path, 'checkpoints', checkpointID);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 204) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
        });
    };
    /**
     * Delete a checkpoint for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    Contents.prototype.deleteCheckpoint = function (path, checkpointID, ajaxOptions) {
        var settings = {
            method: "DELETE",
            dataType: "json",
        };
        var url = this._getUrl(path, 'checkpoints', checkpointID);
        return utils.ajaxRequest(url, settings, ajaxOptions).then(function (success) {
            if (success.xhr.status !== 204) {
                throw Error('Invalid Status: ' + success.xhr.status);
            }
        });
    };
    /**
     * Get an REST url for this file given a path.
     */
    Contents.prototype._getUrl = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var url_parts = [].concat(Array.prototype.slice.apply(args));
        return utils.urlPathJoin(this._apiUrl, utils.urlJoinEncode.apply(null, url_parts));
    };
    return Contents;
})();
exports.Contents = Contents;
//# sourceMappingURL=contents.js.map