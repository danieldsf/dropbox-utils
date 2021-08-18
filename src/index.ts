import { Dropbox } from 'dropbox' // eslint-disable-line no-unused-vars

export function getDropbox(accessToken : string) : Dropbox {
    return new Dropbox({ accessToken })
}

export async function getFile(dbx: Dropbox, path: string, isObject: boolean = false) : Promise<any> {
    
    if(!path.startsWith("/")){
        path = "/" + path 
    }

    return new Promise((resolve, reject) => {
        dbx.filesDownload({ path: path })
        .then((data: any) => {
            return data?.result?.fileBinary
        })
        .then((content) => {
            let stringContent = content.toString('utf8')
            if(isObject){
                resolve(JSON.parse(stringContent))
            }else{
                resolve(stringContent)
            }
        })
        .catch(error => {
            reject(error)
        })
    })
}

export async function sendFile(dbx: Dropbox, path: string, contents: any, isObject: boolean = false) : Promise<any>{
    
    if(!path.startsWith("/")){
       path = "/" + path 
    }

    return dbx.filesUpload({ path: path, contents: isObject ? JSON.stringify(contents) : contents, mode: {".tag": "overwrite"} })
}

export default class DropboxHelper {
    
    private dropboxHandler : Dropbox

    constructor(accessToken : string){
        this.dropboxHandler = getDropbox(accessToken)
    }

    public async getFile(path: string, isObject: boolean = true) : Promise<any> {
        return await getFile(this.dropboxHandler, path, isObject)
    }

    public async sendFile(path: string, contents: any, isObject: boolean = true) : Promise<any> {
        return await sendFile(this.dropboxHandler, path, contents, isObject)
    }
}

