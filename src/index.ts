import { Dropbox } from 'dropbox' // eslint-disable-line no-unused-vars

export function getDropbox(accessToken : string) : Dropbox {
    return new Dropbox({ accessToken })
}

export async function getFile(dbx: Dropbox, path: string) : Promise<any> {
    
    if(!path.startsWith("/")){
        path = "/" + path 
    }

    return new Promise((resolve, reject) => {
        dbx.filesDownload({ path: path })
        .then((data: any) => {
            return data?.result?.fileBinary
        })
        .then((content) => {
            resolve(content.toString('utf8'))
        })
        .catch(error => {
            reject(error)
        })
    })
}

export async function listFiles(dbx: Dropbox, path: string) : Promise<any> {
    
    if(!path.startsWith("/")){
        path = "/" + path 
    }

    return new Promise((resolve, reject) => {
        dbx.filesListFolder({ path: path })
        .then((content) => {
            resolve(content)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export async function sendFile(dbx: Dropbox, path: string, contents: any) : Promise<any>{
    
    if(!path.startsWith("/")){
       path = "/" + path 
    }

    return dbx.filesUpload({ path, contents, mode: {".tag": "overwrite"} })
}

export class DropboxHelper {
    
    private dropboxHandler : Dropbox

    constructor(accessToken : string){
        this.dropboxHandler = getDropbox(accessToken)
    }

    public async getFile(path: string) : Promise<any> {
        return await getFile(this.dropboxHandler, path)
    }

    public async listFiles(path: string) : Promise<any> {
        return await listFiles(this.dropboxHandler, path)
    }

    public async sendFile(path: string, contents: any) : Promise<any> {
        return await sendFile(this.dropboxHandler, path, contents)
    }
}

