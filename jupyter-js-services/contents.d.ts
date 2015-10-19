import { IAjaxOptions } from './utils';
/**
 * Options for a contents object.
 */
export interface IContentsOpts {
    /**
     * The type of file.
     *
     * #### Notes
     * One of `{ "directory", "file", "notebook" }`
     */
    type?: string;
    /**
     * The format of the file `content`.
     *
     * #### Notes
     * One of `{ 'json', text', 'base64' }`
     *
     * Only relevant for type: 'file'
     */
    format?: string;
    /**
     * The file contents, or whether to include the file contents.
     *
     * #### Notes
     * Can either contain the contents of a file for upload, or a boolean
     * indicating whether to include contents in the response.
     */
    content?: string | boolean;
    /**
     * The file extension, including a leading `.`.
     */
    ext?: string;
    /**
     * The name of the file.
     */
    name?: string;
}
/**
 * Contents model.
 *
 * #### Notes
 * If the model does not contain content, the `content`, `format`, and
 * `mimetype` keys will be `null`.
 */
export interface IContentsModel {
    /**
     * Name of the contents file.
     *
     * #### Notes
     *  Equivalent to the last part of the `path` field.
     */
    name: string;
    /**
     * The full file path.
     *
     * #### Notes
     * It will *not* start with `/`, and it will be `/`-delimited.
     */
    path: string;
    /**
     * The type of file.
     *
     * #### Notes
     * One of `{ "directory", "file", "notebook" }`
     */
    type: string;
    /**
     * Whether the requester has permission to edit the file they have requested.
     */
    writable: boolean;
    /**
     * File creation timestamp.
     */
    created: string;
    /**
     * Last modified timestamp.
     */
    last_modified: string;
    /**
     * Specify the mime-type of file contents.
     *
     * #### Notes
     * Only non-`null` when `content` is present and `type` is `"file"`.
     */
    mimetype?: string;
    /**
     * The file content.
     */
    content?: string;
    /**
     * The format of the file `content`.
     *
     * #### Notes
     * One of `{ 'json', text', 'base64' }`
     *
     * Only relevant for type: 'file'
     */
    format?: string;
}
/**
 * Checkpoint model.
 */
export interface ICheckpointModel {
    /**
     * The unique identifier for the checkpoint.
     */
    id: string;
    /**
     * Last modified timestamp.
     */
    last_modified: string;
}
/**
 * Interface that a content manager should implement.
 **/
export interface IContents {
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
    get(path: string, type: string, options: IContentsOpts, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    newUntitled(path: string, options: IContentsOpts, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
    /**
     * Delete a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    delete(path: string, ajaxOptions?: IAjaxOptions): Promise<void>;
    /**
     * Rename a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    rename(path: string, newPath: string, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    save(path: string, model: any, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    copy(path: string, toDir: string, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    listContents(path: string, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
    /**
     * Create a checkpoint for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    createCheckpoint(path: string, ajaxOptions?: IAjaxOptions): Promise<ICheckpointModel>;
    /**
     * List available checkpoints for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    listCheckpoints(path: string, ajaxOptions?: IAjaxOptions): Promise<ICheckpointModel[]>;
    /**
     * Restore a file to a known checkpoint state.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    restoreCheckpoint(path: string, checkpointID: string, ajaxOptions?: IAjaxOptions): Promise<void>;
    /**
     * Delete a checkpoint for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    deleteCheckpoint(path: string, checkpointID: string, ajaxOptions?: IAjaxOptions): Promise<void>;
}
/**
 * A contents handle passing file operations to the back-end.
 *
 * This includes checkpointing with the normal file operations.
 */
export declare class Contents implements IContents {
    /**
     * Create a new contents object.
     */
    constructor(baseUrl: string);
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
    get(path: string, options: IContentsOpts, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    newUntitled(path: string, options?: IContentsOpts, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
    /**
     * Delete a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    delete(path: string, ajaxOptions?: IAjaxOptions): Promise<void>;
    /**
     * Rename a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    rename(path: string, newPath: string, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    save(path: string, model: IContentsOpts, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    copy(fromFile: string, toDir: string, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
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
    listContents(path: string, ajaxOptions?: IAjaxOptions): Promise<IContentsModel>;
    /**
     * Create a checkpoint for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    createCheckpoint(path: string, ajaxOptions?: IAjaxOptions): Promise<ICheckpointModel>;
    /**
     * List available checkpoints for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents) and validates the response model.
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    listCheckpoints(path: string, ajaxOptions?: IAjaxOptions): Promise<ICheckpointModel[]>;
    /**
     * Restore a file to a known checkpoint state.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    restoreCheckpoint(path: string, checkpointID: string, ajaxOptions?: IAjaxOptions): Promise<void>;
    /**
     * Delete a checkpoint for a file.
     *
     * #### Notes
     * Uses the [Jupyter Notebook API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyter/jupyter-js-services/master/rest_api.yaml#!/contents).
     *
     * The promise is fulfilled on a valid response and rejected otherwise.
     */
    deleteCheckpoint(path: string, checkpointID: string, ajaxOptions?: IAjaxOptions): Promise<void>;
    /**
     * Get an REST url for this file given a path.
     */
    private _getUrl(...args);
    private _apiUrl;
}
