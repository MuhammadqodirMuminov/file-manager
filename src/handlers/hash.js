import {createHash} from 'node:crypto'
import { readFile } from 'node:fs/promises';
import { getPath } from '../helpers/getPath.js';

export const handleHash = async (path) => {
    const content = await readFile(path)
    const hash = createHash('sha3-256').update(content).digest('hex')
    console.log('Hash:',hash)
};