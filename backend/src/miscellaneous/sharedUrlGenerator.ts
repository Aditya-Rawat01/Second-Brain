import bcrypt from 'bcrypt'
export const uniqueUrl =async()=>{
    const stringVal='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%'
    const firstRound=await bcrypt.hash(stringVal,5)
    const finalVal=firstRound.substring(15).replace("/","").replace(".","")
    return finalVal
}