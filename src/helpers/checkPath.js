import fs from 'fs/promises'
import { getPath } from './getPath.js'

export const isExist = async (rawPath) => {
    try {
        await fs.access(getPath(rawPath))
        return true
    } catch (error) {
        return false
    }
}



