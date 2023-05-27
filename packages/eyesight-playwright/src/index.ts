import fs from "fs";
import http from "http";

fetch('http://localhost:3001/screenshots/example-project/v3').then((res)=>res).then((r)=> r.json()).then((res)=> {
    const orygFs= fs.existsSync;
    const orygFsPromiseRead= fs.promises.readFile;

    (fs.existsSync as any) = (...args:any[])=> {
        if (args[0].endsWith('png')) {

            const spl = args[0].split("\\");

            const fileName = spl[spl.length-1];
            return res.map((re)=> re.name).includes(fileName)
        }

        return orygFs(...args)
    }

    (fs.promises.readFile as any) = async (...args:any[])=> {
        if (args[0].endsWith('png')) {

            const spl = args[0].split("\\");

            const fileName = spl[spl.length-1];
            return Buffer.from(res.find((re)=> re.name === fileName).content, 'base64')
        }

        return orygFsPromiseRead(...args)
    }

    const orygFsWrite= fs.writeFileSync;

    (fs.writeFileSync as any) = (...args:any[])=> {
        if (args[0].endsWith('png') && ['expected', 'diff','data', 'actual'].every((name)=> args[0].indexOf(name)=== -1) ) {
            try {
                const spl = args[0].split("\\");

                const fileName = spl[spl.length-1];

                saveFileRequest("https://localhost:3001", "example-project", "v3", fileName,args[1])
            } catch (e) {
                console.log(e)
            }
        } else {
            return orygFsWrite(...args)
        }
    }
    const oryg = console.log;

    (console.log as any) = (...args)=> {
        if (args[0] && args[0].indexOf('is re-generated') > -1) {
            const fileName = args[0].split("\\").at(-1)
            oryg(`${fileName}`,...args.slice(1))
        }else {
            oryg(...args)
        }
    }

    const orygFsMkDir = fs.mkdirSync;

    (fs.mkdirSync as any) = (...args)=> {
        if (args[0].indexOf('-snapshots') > -1){
            return
        }

        return orygFsMkDir(...args)
    }
});


export async function saveFileRequest(url: string,project: string,version: string,fileName:string, imgToUpload: Buffer) {
    try {
        await fetch(`${url}/save/${project}/${version}/${fileName}`, {method: 'POST', body:imgToUpload, headers: {'Content-Type': 'application/octet-stream'}})
    } catch (e) {
        console.error(e)
        throw e
    }
}