
/**
 * Interface that a content manager should implement
 **/
export interface IContents {
    /**
     * get a something by path
     **/
    get(path:String, type, options):any
    new_untitled(path:String, options)
    delete(path:String)
    rename(path: String, new_path: String)
    save(path: String, model: any, options?:any)
    list_contents(path: String, options: any)
    copy(path: String, model: any):Promise<any>
    create_checkpoint(path: String, options: any):any
    restore_checkpoint(path: String, checkpoint_id: CheckpointId, options: any):Promise<any>
    list_checkpoints(path: String, options: any):any
}

export interface CheckpointId extends Object {}
