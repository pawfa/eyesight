import fs from 'fs';
import {saveFileRequest, verifyFileRequest} from "./api";

const { Command } = require('commander');
const program = new Command();

program
    .name('eyesight')
    .description('CLI to interact with eyesight server')
    .version('0.0.0');

const createCommandWithSharedOptions = ()=>new Command()
    .requiredOption('--project <name>', 'project name')
    .requiredOption('--path <path>', 'path to screenshot png file or directory with screenshots')
    .requiredOption('--version  <version>', 'version of current screenshot comparison')
    .requiredOption('--url  <url>', 'url of eyesight server');

const save = createCommandWithSharedOptions().name('save').action(async function (opts:any) {
    const {path,url,project,version} = opts;

    if (path.endsWith('.png')) {
        await handleSingleScreenshot({ url, path, project, version });
    }
    else {
        const files = await fs.promises.readdir(path);
        for (const file of files) {
            await handleSingleScreenshot({ url, path: file, project, version });
        }
    }
})

const verify = createCommandWithSharedOptions().name('verify').action(async function (opts:any) {
    const {path,url,project,version} = opts;

    const imgToUpload = fs.readFileSync(path);
    await saveFileRequest(url,project,version, imgToUpload);
    await verifyFileRequest(url,project,version, imgToUpload);
})

program.addCommand(save);
program.addCommand(verify);

export default program;

async function handleSingleScreenshot({path, url, project, version}: {path:string; url:string; project:string; version:string}) {
    const imgToUpload = fs.readFileSync(path);
    await saveFileRequest(url,project,version, imgToUpload);
}