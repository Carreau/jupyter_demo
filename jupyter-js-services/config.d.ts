import { IAjaxOptions } from './utils';
/**
 * A Configurable data section.
 */
export interface IConfigSection {
    /**
     * The data for this section.
     *
     * #### Notes
     * This is a read-only property.
     */
    data: any;
    /**
     * Modify the stored config values.
     *
     * #### Notes
     * Updates the local data immediately, sends the change to the server,
     * and updates the local data with the response, and fullfils the promise
     * with that data.
     */
    update(newdata: any, ajaxOptions?: IAjaxOptions): Promise<any>;
}
/**
 * Create a config section.
 *
 * @returns A Promise that is fulfilled with the config section is loaded.
 */
export declare function getConfigSection(sectionName: string, baseUrl: string, ajaxOptions?: IAjaxOptions): Promise<IConfigSection>;
/**
 * Configurable object with defaults.
 */
export declare class ConfigWithDefaults {
    /**
     * Create a new config with defaults.
     */
    constructor(section: IConfigSection, defaults: any, classname?: string);
    /**
     * Get data from the config section or fall back to defaults.
     */
    get(key: string): any;
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
    set(key: string, value: any): Promise<any>;
    /**
     * Get data from the Section with our classname, if available.
     *
     * #### Notes
     * If we have no classname, get all of the data in the Section
     */
    private _classData();
    private _section;
    private _defaults;
    private _className;
}
