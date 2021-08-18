import { Dropbox } from 'dropbox';
export declare function getDropbox(accessToken: string): Dropbox;
export declare function getFile(dbx: Dropbox, path: string, isObject?: boolean): Promise<any>;
export declare function sendFile(dbx: Dropbox, path: string, contents: any, isObject?: boolean): Promise<any>;
export default class DropboxHelper {
    private dropboxHandler;
    constructor(accessToken: string);
    getFile(path: string, isObject?: boolean): Promise<any>;
    sendFile(path: string, contents: any, isObject?: boolean): Promise<any>;
}
