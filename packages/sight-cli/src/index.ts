import fs from 'fs';
export default async function() {
    const args = process.argv.slice(2);
    if (args[0] === '--save' && args[2] === '--url') {
        const imgToUpload = fs.readFileSync(args[1]);

        const res = await fetch(args[3], {method: 'POST', body: imgToUpload, headers: {'Content-Type': 'application/octet-stream'} });
        if (res.ok) {
            console.log("OK");
        } else {}
    } else {
        console.error("No arguments")
    }

}