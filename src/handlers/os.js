import os from "os"
import { FAILED_ERROR } from "../helpers/checkLine.js";


export const handleOS = (action) => {
    switch(action){
        case "--eol":
        case "--EOL":
            console.log(`EOL:${JSON.stringify(os.EOL)}`);
            break;
        case "--cpus":
        case "--CPUS":
            const res = os.cpus().map((elem)=>({
                Model:elem.model,
                'Clock rate':`${elem.speed/1000} GHz`
            }))
            console.log(`Amount of CPUS: ${os.cpus().length}`);
            console.table(res);
            break;
        case "--homedir":
        case "--HOMEDIR":
            console.log(`Current home directory: ${os.homedir()}`);
            break;
        case "--username":
        case "--USERNAME":
            console.log(`Current system user name: ${os.userInfo().username}`);
            break;
        case "--architecture":
        case "--ARCHITECTURE":
            console.log(`CPU architecture : ${process.arch}`);
            break;
        default:
            console.log(FAILED_ERROR);
    }
}