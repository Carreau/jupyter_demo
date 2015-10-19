import { IKernel, IKernelId, IKernelMessage, IKernelMessageOptions, IKernelOptions, IKernelSpecIds } from './ikernel';
import { IAjaxOptions } from './utils';
/**
 * Fetch the kernel specs.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/kernelspecs).
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
export declare function getKernelSpecs(baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IKernelSpecIds>;
/**
 * Fetch the running kernels.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/kernels) and validates the response model.
 *
 * The promise is fulfilled on a valid response and rejected otherwise.
 */
export declare function listRunningKernels(baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IKernelId[]>;
/**
 * Start a new kernel.
 *
 * #### Notes
 * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/kernels) and validates the response model.
 *
 * Wraps the result in an Kernel object. The promise is fulfilled
 * when the kernel is fully ready to send the first message. If
 * the kernel fails to become ready, the promise is rejected.
 */
export declare function startNewKernel(options: IKernelOptions, ajaxOptions?: IAjaxOptions): Promise<IKernel>;
/**
 * Connect to a running kernel.
 *
 * #### Notes
 * If the kernel was already started via `startNewKernel`, the existing
 * Kernel object is used as the fulfillment value.
 *
 * Otherwise, if `options` are given, we attempt to connect to the existing
 * kernel found by calling `listRunningKernels`.
 * The promise is fulfilled when the kernel is fully ready to send
 * the first message. If the kernel fails to become ready, the promise is
 * rejected.
 *
 * If the kernel was not already started and no `options` are given,
 * the promise is rejected.
 */
export declare function connectToKernel(id: string, options?: IKernelOptions, ajaxOptions?: IAjaxOptions): Promise<IKernel>;
/**
 * Create a well-formed Kernel Message.
 */
export declare function createKernelMessage(options: IKernelMessageOptions, content?: any, metadata?: any, buffers?: (ArrayBuffer | ArrayBufferView)[]): IKernelMessage;
