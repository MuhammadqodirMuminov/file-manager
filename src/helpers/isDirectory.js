import fs from "fs"

export const isDirectory = (rawPath) => {
    try {
        const stats = fs.statSync(rawPath)
        return stats.isDirectory()
    } catch (error) {
        return false
    }
}