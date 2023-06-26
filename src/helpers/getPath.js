import path from "path"
import { FAILED_ERROR } from "./checkLine.js"

export const getPath = (rawPath) =>{
    const normalizePath = path.normalize(rawPath)
    let correctPath = ''
    try {
        if (path.isAbsolute(normalizePath)){
            correctPath = normalizePath
        }else{
            correctPath = path.resolve(process.cwd(),normalizePath)
        }
        return correctPath
    } catch (error) {
        return FAILED_ERROR
    }
}

export const showCurrentDirectory = () => {
    return console.log(`CURRENT DIRECTORY: ${process.cwd()}`);
}