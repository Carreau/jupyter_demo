// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
const COMM_FIELDS = ['comm_id', 'data'];
const HEADER_FIELDS = ['username', 'version', 'session', 'msg_id', 'msg_type'];
const MESSAGE_FIELDS = ['header', 'parent_header', 'metadata', 'content',
    'channel', 'buffers'];
/**
 * Validate an Kernel Message as being a valid Comm Message.
 */
export function validateCommMessage(msg) {
    for (var i = 0; i < COMM_FIELDS.length; i++) {
        if (!msg.content.hasOwnProperty(COMM_FIELDS[i])) {
            console.log('*****invalid', COMM_FIELDS[i]);
            return false;
        }
    }
    if (msg.header.msg_type === 'comm_open') {
        if (!msg.content.hasOwnProperty('target_name') ||
            typeof msg.content.target_name !== 'string') {
            console.log('***TARGET NAME');
            return false;
        }
        if (msg.content.hasOwnProperty('target_module') &&
            msg.content.target_module !== null &&
            typeof msg.content.target_module !== 'string') {
            return false;
        }
    }
    if (typeof msg.content.comm_id !== 'string') {
        console.log("COMM_ID");
        return false;
    }
    return true;
}
function validateKernelHeader(header) {
    for (var i = 0; i < HEADER_FIELDS.length; i++) {
        if (!header.hasOwnProperty(HEADER_FIELDS[i])) {
            throw Error('Invalid Kernel message');
        }
        if (typeof header[HEADER_FIELDS[i]] !== 'string') {
            throw Error('Invalid Kernel message');
        }
    }
}
/**
 * Validate an object as being of IKernelMessage type.
 */
export function validateKernelMessage(msg) {
    for (var i = 0; i < MESSAGE_FIELDS.length; i++) {
        if (!msg.hasOwnProperty(MESSAGE_FIELDS[i])) {
            throw Error('Invalid Kernel message');
        }
    }
    validateKernelHeader(msg.header);
    if (Object.keys(msg.parent_header).length > 0) {
        validateKernelHeader(msg.parent_header);
    }
    if (typeof msg.channel !== 'string') {
        throw Error('Invalid Kernel message');
    }
    if (!Array.isArray(msg.buffers)) {
        throw Error('Invalid Kernel message');
    }
}
/**
 * Validate an object as being of IKernelID type
 */
export function validateKernelId(info) {
    if (!info.hasOwnProperty('name') || !info.hasOwnProperty('id')) {
        throw Error('Invalid kernel id');
    }
    if ((typeof info.id !== 'string') || (typeof info.name !== 'string')) {
        throw Error('Invalid kernel id');
    }
}
/**
 * Validate an object as being of ISessionId type.
 */
export function validateSessionId(info) {
    if (!info.hasOwnProperty('id') ||
        !info.hasOwnProperty('notebook') ||
        !info.hasOwnProperty('kernel')) {
        throw Error('Invalid Session Model');
    }
    validateKernelId(info.kernel);
    if (typeof info.id !== 'string') {
        throw Error('Invalid Session Model');
    }
    validateNotebookId(info.notebook);
}
/**
 * Validate an object as being of INotebookId type.
 */
export function validateNotebookId(model) {
    if ((!model.hasOwnProperty('path')) || (typeof model.path !== 'string')) {
        throw Error('Invalid Notebook Model');
    }
}
/**
 * Validate an object as being of IKernelSpecID type.
 */
export function validateKernelSpec(info) {
    var err = new Error("Invalid KernelSpec Model");
    if (!info.hasOwnProperty('name') || typeof info.name !== 'string') {
        throw err;
    }
    if (!info.hasOwnProperty('spec') || !info.hasOwnProperty('resources')) {
        throw err;
    }
    var spec = info.spec;
    if (!spec.hasOwnProperty('language') || typeof spec.language !== 'string') {
        throw err;
    }
    if (!spec.hasOwnProperty('display_name') ||
        typeof spec.display_name !== 'string') {
        throw err;
    }
    if (!spec.hasOwnProperty('argv') || !Array.isArray(spec.argv)) {
        throw err;
    }
}
//# sourceMappingURL=validate.js.map