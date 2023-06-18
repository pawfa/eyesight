import fs, {PathLike} from "fs";

fetch('http://localhost:3001/screenshots/example-project/v3').then((r)=> r.json()).then((res: Array<{ name:string, content: string }>)=> {
    const orygFs= fs.existsSync;
    const orygFsPromiseRead= fs.promises.readFile;

    (fs.existsSync as any) = (path: PathLike)=> {
        if (typeof path === 'string' &&path.endsWith('png')) {

            const spl = path.split("\\");

            const fileName = spl[spl.length-1];
            return res.map((re)=> re.name).includes(fileName)
        }

        return orygFs(path)
    }

    (fs.promises.readFile as any) = async (...args:Parameters<typeof fs.promises.readFile>)=> {
        if (typeof args[0] === 'string' && args[0].endsWith('png')) {

            const spl = args[0].split("\\");

            const fileName = spl[spl.length-1];
            const screenshotFromServer = res.find((re)=> re.name === fileName);

            if (!screenshotFromServer) {
                throw Error(`Screenshot with name ${fileName} not found on eyesight server.`)
            }

            return Buffer.from(screenshotFromServer.content, 'base64')
        }

        return orygFsPromiseRead(...args)
    }

    const orygFsWrite= fs.writeFileSync;

    (fs.writeFileSync as any) = (...args:Parameters<typeof fs.writeFileSync>)=> {
        const path = args[0];
        if (typeof path === 'string' && path.endsWith('png') && ['expected', 'diff','data', 'actual'].every((name)=> path.indexOf(name)=== -1) ) {
            try {
                const spl = path.split("\\");
                const fileName = spl[spl.length-1];
                saveFileRequest("http://localhost:3001", "example-project", "v3", fileName,args[1])
            } catch (e) {
                console.log(e)
            }
        } else {
            return orygFsWrite(...args)
        }
    }

    const orygConsoleLog = console.log;

    (console.log as any) = (...args: Parameters<typeof console.log>)=> {
        const message = args[0];
        if (message && message.indexOf('is re-generated') > -1) {
            const fileName = message.split("\\").at(-1)
            orygConsoleLog(`${fileName}`,...args.slice(1))
        }else if(message && message.indexOf("A snapshot doesn't exist") > -1){
            const fileName = message.match(/[^\\]+png/)[0]
            orygConsoleLog(`Error: A snapshot doesn't exist at eyesight server: version v3, project: example-project, filename: ${fileName} , writing actual.`)
        }else {
            orygConsoleLog(...args)
        }
    }

    const orygFsMkDir = fs.mkdirSync;

    (fs.mkdirSync as any) = (...args: Parameters<typeof fs.mkdirSync>)=> {

        if (typeof args[0] === 'string' && args[0].indexOf('-snapshots') > -1){
            return
        }

        return orygFsMkDir(...args)
    }
});


export async function saveFileRequest(url: string,project: string,version: string,fileName:string, imgToUpload: ArrayBufferView | string) {
    try {
        await fetch(`${url}/save/${project}/${version}/${fileName}`, {method: 'POST', body:imgToUpload, headers: {'Content-Type': 'application/octet-stream'}})
    } catch (e) {
        console.error(e)
        throw e
    }
}