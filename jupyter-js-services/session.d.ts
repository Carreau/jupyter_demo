import { INotebookSession, ISessionId, ISessionOptions } from './isession';
import { IAjaxOptions } from './utils';
/**
 * Fetch the running sessions.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/sessions), and validates the response.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
export declare function listRunningSessions(baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<ISessionId[]>;
/**
 * Start a new session.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/sessions), and validates the response.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.

 * Wrap the result in an NotebookSession object. The promise is fulfilled
 * when the session is fully ready to send the first message. If
 * the session fails to become ready, the promise is rejected.
 */
export declare function startNewSession(options: ISessionOptions, ajaxOptions?: IAjaxOptions): Promise<INotebookSession>;
/**
 * Connect to a running notebook session.
 *
 * #### Notes
 * If the session was already started via `startNewSession`, the existing
 * NotebookSession object is used as the fulfillment value.
 *
 * Otherwise, if `options` are given, we attempt to connect to the existing
 * session found by calling `listRunningSessions`.
 * The promise is fulfilled when the session is fully ready to send
 * the first message. If the session fails to become ready, the promise is
 * rejected.
 *
 * If the session was not already started and no `options` are given,
 * the promise is rejected.
 */
export declare function connectToSession(id: string, options?: ISessionOptions, ajaxOptions?: IAjaxOptions): Promise<INotebookSession>;
