import DropboxHelper from "./src"
console.log(process.env.DROPBOX_KEY)
var DROPBOX_KEY = process.env.DROPBOX_KEY || "";

async function main(){
    let dropbox = new DropboxHelper(DROPBOX_KEY)
    let content = "MY TEST!!!!!!!!"
    let pathname = "folders/test.txt"

    let writtenResponse = await dropbox.sendFile(pathname, content, false)
    let readResponse = await dropbox.getFile(pathname, false)
    
    console.log(writtenResponse, readResponse)
}

(main())