// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
/**
 * Copy the contents of one object to another, recursively.
 *
 * http://stackoverflow.com/questions/12317003/something-like-jquery-extend-but-standalone
 */
export function extend(target, source) {
    target = target || {};
    for (var prop in source) {
        if (typeof source[prop] === 'object') {
            target[prop] = extend(target[prop], source[prop]);
        }
        else {
            target[prop] = source[prop];
        }
    }
    return target;
}
/**
 * Get a random 128b hex string (not a formal UUID)
 */
export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    var nChars = hexDigits.length;
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.charAt(Math.floor(Math.random() * nChars));
    }
    return s.join("");
}
/**
 * Join a sequence of url components with '/'.
 */
export function urlPathJoin(...paths) {
    var url = '';
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        if (path === '') {
            continue;
        }
        if (i > 0) {
            path = path.replace(/\/\/+/, '/');
        }
        if (url.length > 0 && url.charAt(url.length - 1) != '/') {
            url = url + '/' + paths[i];
        }
        else {
            url = url + paths[i];
        }
    }
    return url;
}
/**
 * Encode just the components of a multi-segment uri,
 * leaving '/' separators.
 */
export function encodeURIComponents(uri) {
    return uri.split('/').map(encodeURIComponent).join('/');
}
/**
 * Join a sequence of url components with '/',
 * encoding each component with encodeURIComponent.
 */
export function urlJoinEncode(...args) {
    return encodeURIComponents(urlPathJoin.apply(null, args));
}
/**
 * Return a serialized object string suitable for a query.
 *
 * http://stackoverflow.com/a/30707423
 */
export function jsonToQueryString(json) {
    return '?' + Object.keys(json).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key])).join('&');
}
/**
 * Asynchronous XMLHTTPRequest handler.
 *
 * http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest
 */
export function ajaxRequest(url, settings) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open(settings.method, url);
        if (settings.contentType) {
            req.setRequestHeader('Content-Type', settings.contentType);
        }
        req.onload = () => {
            var response = req.response;
            if (settings.dataType === 'json' && req.response) {
                response = JSON.parse(req.response);
            }
            resolve({ data: response, statusText: req.statusText, xhr: req });
        };
        req.onerror = (err) => {
            reject({ xhr: req, statusText: req.statusText, error: err });
        };
        if (settings.data) {
            req.send(settings.data);
        }
        else {
            req.send();
        }
    });
}
/**
 * A Promise that can be resolved or rejected by another object.
 */
export class PromiseDelegate {
    /**
     * Construct a new Promise delegate.
     */
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    /**
     * Get the underlying Promise.
     */
    get promise() {
        return this._promise;
    }
    /**
     * Resolve the underlying Promise with an optional value or another Promise.
     */
    resolve(value) {
        // Note: according to the Promise spec, and the `this` context for resolve 
        // and reject are ignored
        this._resolve(value);
    }
    /**
     * Reject the underlying Promise with an optional reason.
     */
    reject(reason) {
        // Note: according to the Promise spec, and the `this` context for resolve 
        // and reject are ignored
        this._reject(reason);
    }
}
//# sourceMappingURL=utils.js.map