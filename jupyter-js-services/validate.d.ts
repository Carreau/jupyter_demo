import { ICheckpointModel, IContentsModel } from './contents';
import { IKernelId, IKernelMessage, IKernelSpecId } from './ikernel';
import { INotebookId, ISessionId } from './isession';
/**
 * Validate an Kernel Message as being a valid Comm Message.
 */
export declare function validateCommMessage(msg: IKernelMessage): boolean;
/**
 * Validate an `IKernelMessage` object.
 */
export declare function validateKernelMessage(msg: IKernelMessage): void;
/**
 * Validate an `KernelId` object.
 */
export declare function validateKernelId(info: IKernelId): void;
/**
 * Validate an `ISessionId` object.
 */
export declare function validateSessionId(info: ISessionId): void;
/**
 * Validate an `INotebookId` object.
 */
export declare function validateNotebookId(model: INotebookId): void;
/**
 * Validate an `IKernelSpecID` object.
 */
export declare function validateKernelSpec(info: IKernelSpecId): void;
/**
 * Validate an `IContentsModel` object.
 */
export declare function validateContentsModel(model: IContentsModel): void;
/**
 * Validate an `ICheckpointModel` object.
 */
export declare function validateCheckpointModel(model: ICheckpointModel): void;
