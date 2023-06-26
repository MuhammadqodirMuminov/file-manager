import { readdir } from 'node:fs/promises';
import { getPath, isDirectory } from '../helpers/index.js';
import { FAILED_ERROR } from '../helpers/checkLine.js';


export const handleUp = async () => {

    process.chdir('..')
}

export const handleCd = async (rawPath) => {

    isDirectory(getPath(rawPath)) ?
        process.chdir(getPath(rawPath)) :
        console.log(`${FAILED_ERROR}: '${rawPath}' is not a directory`);
}

export const handleLs = async () => {
    let files = await readdir(process.cwd(), { withFileTypes: true })
    const sortedFiles = files.sort((a, b) => a.isFile() - b.isFile())
    const res = sortedFiles.map((elem) => ({ Name: elem.name, Type: elem.isFile() ? 'file' : 'directory' }))
    console.table(res)
};