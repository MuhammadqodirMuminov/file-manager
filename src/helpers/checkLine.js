import { isExist } from "./checkPath.js"
import { showCurrentDirectory } from "./getPath.js"
import { USER } from "./user.js"

export const FAILED_ERROR = 'Operation failed'
export const INVALID_INPUT = 'Invalid input'


export const emitOneArgs = async (eventEmitter, ev, arg) => {

    if (await isExist(arg)) {
        eventEmitter.emit(ev, arg)
    } else {
        console.log(FAILED_ERROR);
    }
}

export const emitTwoArgs = async (eventEmitter, ev, arg1, arg2) => {
    if (await isExist(arg1) && await isExist(arg2)) {
        eventEmitter.emit(ev, arg1, arg2)
    } else {
        console.log(FAILED_ERROR);
    }
}




export const checkLine = async (line, eventEmitter) => {
    const emitter = eventEmitter
    try {
        const [event, ...args] = line.trim().split(' ')

        switch (event) {
            case 'up':
            case 'ls':
                args.length === 0 ? emitter.emit(event) : console.log(INVALID_INPUT);
                break;
            case 'cd':
            case 'cat':
            case 'rm':
            case 'hash':
                args.length === 1 ? await emitOneArgs(emitter, event, args[0]) : console.log(INVALID_INPUT);
                break;
            case 'add':
            case 'os':
                args.length === 1 ? emitter.emit(event, args[0]) : console.log(INVALID_INPUT);
                break;
            case 'rn':
            case 'compress':
            case 'decompres':
                args.length === 2 ? emitter.emit(event, args[0], args[1]) : console.log(INVALID_INPUT);
                break;
            case 'cp':
            case 'mv':
                args.length === 2 ? emitTwoArgs(emitter, event, args[0], args[1]) : console.log(INVALID_INPUT);
                break;
            case '.exit':
                emitter.emit(event, USER)
                break;
            default:
                console.log(INVALID_INPUT);
                break;

        }
        showCurrentDirectory()
    }
    catch (err) {
        console.log(FAILED_ERROR);
    }
}