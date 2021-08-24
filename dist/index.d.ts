import { Dropbox } from 'dropbox';
export declare function getDropbox(accessToken: string): Dropbox;
export declare function getFile(dbx: Dropbox, path: string): Promise<any>;
export declare function listFiles(dbx: Dropbox, path: string): Promise<any>;
export declare function sendFile(dbx: Dropbox, path: string, contents: any): Promise<any>;
export declare class DropboxHelper {
    private dropboxHandler;
    constructor(accessToken: string);
    getFile(path: string): Promise<any>;
    listFiles(path: string): Promise<any>;
    sendFile(path: string, contents: any): Promise<any>;
}
