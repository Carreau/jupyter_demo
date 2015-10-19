/**
 * Copy the contents of one object to another, recursively.
 *
 * From [stackoverflow](http://stackoverflow.com/a/12317051).
 */
export declare function extend(target: any, source: any): any;
/**
 * Get a random 128b hex string (not a formal UUID)
 */
export declare function uuid(): string;
/**
 * Join a sequence of url components with `'/'`.
 */
export declare function urlPathJoin(...paths: string[]): string;
/**
 * Encode just the components of a multi-segment uri.
 *
 * Preserves the `'/'` separators.
 */
export declare function encodeURIComponents(uri: string): string;
/**
 * Encode and join a sequence of url components with `'/'`.
 */
export declare function urlJoinEncode(...args: string[]): string;
/**
 * Return a serialized object string suitable for a query.
 *
 * From [stackoverflow](http://stackoverflow.com/a/30707423).
 */
export declare function jsonToQueryString(json: any): string;
/**
 * Input settings for an AJAX request.
 */
export interface IAjaxSettings {
    method: string;
    dataType: string;
    contentType?: string;
    data?: any;
}
/**
 * Options for AJAX calls.
 */
export interface IAjaxOptions {
    timeout?: number;
    requestHeaders?: {
        [key: string]: string;
    };
    async?: boolean;
    withCredentials?: boolean;
    user?: string;
    password?: string;
}
/**
 * Success handler for AJAX request.
 */
export interface IAjaxSuccess {
    data: any;
    statusText: string;
    xhr: XMLHttpRequest;
}
/**
 * Error handler for AJAX request.
 */
export interface IAjaxError {
    xhr: XMLHttpRequest;
    statusText: string;
    error: ErrorEvent;
}
/**
 * Asynchronous XMLHTTPRequest handler.
 *
 * Based on this [example](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest).
 */
export declare function ajaxRequest(url: string, settings: IAjaxSettings, options?: IAjaxOptions): Promise<any>;
/**
 * A Promise that can be resolved or rejected by another object.
 */
export declare class PromiseDelegate<T> {
    /**
     * Construct a new Promise delegate.
     */
    constructor();
    /**
     * Get the underlying Promise.
     */
    promise: Promise<T>;
    /**
     * Resolve the underlying Promise with an optional value or another Promise.
     */
    resolve(value?: T | Thenable<T>): void;
    /**
     * Reject the underlying Promise with an optional reason.
     */
    reject(reason?: any): void;
    private _promise;
    private _resolve;
    private _reject;
}
