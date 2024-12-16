import bcrypt from 'bcrypt'
export const uniqueUrl =async()=>{
    const stringVal='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%'
    const firstRound=await bcrypt.hash(stringVal,5)
    const finalVal=firstRound.substring(15).replace(/[/\.]/g, "")  // regex used as replace() just replace first occurence and replaceAll is not supported in es5 lib
    return finalVal
}