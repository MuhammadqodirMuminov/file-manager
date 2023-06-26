import { createReadStream, createWriteStream } from 'fs';
import { getPath } from '../helpers/getPath.js';
import { writeFile, rename, unlink } from "fs/promises";
import { parse } from 'path';
import { pipeline } from 'stream/promises';
import { isExist } from '../helpers/checkPath.js';
import { FAILED_ERROR } from '../helpers/checkLine.js';
import { isDirectory } from '../helpers/isDirectory.js';

export const handleAdd = async (fileName) => {
    await writeFile(`${process.cwd()}/${fileName}`, '', { flag: 'wx' })
    console.log(`Add new file '${fileName}'`);
};

export const handleCat = async (path) => {
    const stream = createReadStream(getPath(path))
    stream.pipe(process.stdout)
};

export const handleRM = async (path) => {
    const fileName = parse(path).base
    await unlink(getPath(path))
    console.log(`${fileName} has been removed!`);
};

export const handleRN = async (rawPath, newFileName) => {
    if (await isExist(rawPath)) {
        const correctPath = getPath(rawPath)
        const fileName = parse(correctPath).base
        const fileDirectory = parse(correctPath).dir
        await rename(correctPath, `${fileDirectory}/${newFileName}`)
        console.log(`"${fileName}" has been renamed to ${newFileName}`);
    } else {
        console.log(FAILED_ERROR);
    }

};

export const handleCP = async (rawPathToFile, rawPathToNewDirectory) => {
    const pathToFile = getPath(rawPathToFile)
    const pathToNewDirectory = getPath(rawPathToNewDirectory)
    if (isDirectory(pathToNewDirectory)) {
        const baseName = parse(pathToFile).base
        const readStream = createReadStream(pathToFile)
        const writeStream = createWriteStream(`${pathToNewDirectory}/${baseName}`)
        await pipeline(readStream, writeStream)
        console.log(`"${baseName}" has been copied to "${pathToNewDirectory}"`);
    } else {
        console.log(`${FAILED_ERROR}: '${pathToNewDirectory}' is not a directory`);
    }
};

export const handleMV = async (rawPathToFile, rawPathToNewDirectory) => {
    await handleCP(rawPathToFile, rawPathToNewDirectory)
    await handleRM(rawPathToFile)
};