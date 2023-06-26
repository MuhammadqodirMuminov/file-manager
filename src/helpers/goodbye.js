export const goodbye = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    process.nextTick(()=>{
        process.exit()
    })
}