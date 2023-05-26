import fs from "fs";
import http from "http";

fetch('http://localhost:3000/screenshots/example-project/v3').then((res)=>res).then((r)=> r.json()).then((res)=> {
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
        if (args[0].endsWith('png') && args[0].indexOf('actual') === -1) {
            try {
                const spl = args[0].split("\\");

                const fileName = spl[spl.length-1];

                saveFileRequest("https://localhost:3000", "example-project", "v3", fileName,args[1])
            } catch (e) {
                console.log(e)
            }
        } else {
            return orygFsWrite(...args)
        }
    }
});


export async function saveFileRequest(url: string,project: string,version: string,fileName:string, imgToUpload: Buffer) {
    const res = await httpsPost( {
        method: 'POST',
        hostname:'localhost',
        port: 3000,
        path: `${url}/save/${project}/${version}/${fileName}`,
        body: imgToUpload,
        headers: {'Content-Type': 'application/octet-stream'}
    });
    if (res.ok) {
        console.log("OK");
    }
}

function httpsPost({body, ...options}) {
    return new Promise((resolve,reject) => {
        const req = http.request({
            method: 'POST',
            ...options,
        }, res => {
            const chunks = [];
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
                let resBody = Buffer.concat(chunks);
                switch(res.headers['content-type']) {
                    case 'application/json':
                        resBody = JSON.parse(resBody);
                        break;
                }
                resolve(resBody)
            })
        })
        req.on('error',reject);
        if(body) {
            req.write(body);
        }
        req.end();
    })
}