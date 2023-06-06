export async function saveFileRequest(url: string, project: string, version: string, imgToUpload: Buffer) {
    const res = await fetch(`${url}/save/${project}/${version}`, {
        method: 'POST',
        body: imgToUpload,
        headers: {'Content-Type': 'application/octet-stream'}
    });
    if (res.ok) {
        console.log("OK");
    }
}

export async function verifyFileRequest(url: string, project: string, version: string, imgToUpload: Buffer) {
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