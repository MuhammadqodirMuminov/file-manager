import os from "os"
export const UNKNOWN_USER = 'Anonymous'
export const currentUser = process.argv.slice(2).at(-1)
export let USER = ''


export const checkUser = () => {
    process.chdir(os.homedir())
    if (currentUser && currentUser.includes('--username=')){
        USER = currentUser.split('=').at(-1) 
        return USER
    }else{
        UNKNOWN_USER = USER
        return USER
    }
}