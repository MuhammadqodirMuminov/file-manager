import { pipeline } from 'node:stream';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs'
import { getPath } from '../helpers/getPath.js';
import { isExist } from '../helpers/checkPath.js';
import { isDirectory } from '../helpers/isDirectory.js';
import { FAILED_ERROR } from '../helpers/checkLine.js';
import { parse } from 'node:path';

const BROTLI_ACTION = { 
    Compress: "compress",
    Decompress: "decompress"
}

const handleBrotli = async (rawPathToFile, rawPathToDistination, action) => {
    const pathToFile = getPath(rawPathToFile)
    const pathToDistination = getPath(rawPathToDistination)
    const distinatioDir = parse(pathToDistination).dir
    if (await isExist(pathToFile) && !isDirectory(pathToFile) && await isExist(distinatioDir)
        ){
        const readStream = createReadStream(pathToFile)
        const writeStream = createWriteStream(pathToDistination)
        const currentAction = action === BROTLI_ACTION.Compress ? createBrotliCompress() : createBrotliDecompress() 
        pipeline(
            readStream,
            currentAction,
            writeStream,
            (err)=>{
            // console.error(err);
        }) 
    }else{
        console.log(FAILED_ERROR);
    }
   
};

export const handleCompress = async (pathToFile, pathToDistination) => {
    await handleBrotli(pathToFile, pathToDistination, BROTLI_ACTION.Compress)
}

export const handleDecompress = async (pathToFile, pathToDistination) => {
    await handleBrotli(pathToFile, pathToDistination, BROTLI_ACTION.Decompress)
}