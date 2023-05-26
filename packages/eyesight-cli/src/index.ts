import fs from 'fs';

async function saveFileRequest(url: string,project: string,version: string, imgToUpload: Buffer) {
    const res = await fetch(`${url}/save/${project}/${version}`, {
        method: 'POST',
        body: imgToUpload,
        headers: {'Content-Type': 'application/octet-stream'}
    });
    if (res.ok) {
        console.log("OK");
    }
}

async function verifyFileRequest(url: string,project: string,version: string, imgToUpload: Buffer) {
    const res = await fetch(`${url}/verify/${project}/${version}`, {
        method: 'POST',
        body: imgToUpload,
        headers: {'Content-Type': 'application/octet-stream'}
    });
    if (res.ok) {
        console.log("OK");
        return res.json()
    }
}

export default async function() {
    const args = process.argv.slice(2);
    if (args[0] === '--save' && args[2] === '--project' && args[4] === '--version' && args[6] === '--url') {
        const imgToUpload = fs.readFileSync(args[1]);
        await saveFileRequest(args[7],args[3],args[5], imgToUpload);
    } else if (args[0] === '--verify' && args[2] === '--project' && args[4] === '--version' && args[6] === '--url') {
        const imgToUpload = fs.readFileSync(args[1]);
        await saveFileRequest(args[7],args[3],args[5], imgToUpload);
        const res = await verifyFileRequest(args[7],args[3],args[5], imgToUpload);
    }else {
        console.error("No arguments")
    }

}