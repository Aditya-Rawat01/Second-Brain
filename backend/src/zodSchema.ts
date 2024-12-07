import zod, { z } from 'zod'

export const UserSchema= zod.object({

    
    username:zod.string()
                .min(5,"username should be atleast 5 characters")
                .max(25,"max characters allowed is 25"),
   


    password:zod.string()
                .min(5,"password should be atleast 5 characters")
                .max(25,"max characters allowed is 25")
                .refine((password)=>password.match(/[A-Z]/)!==null,"Password must contain one capital letter")
                .refine((password)=>password.match(/[a-z]/)!==null,"Password must contain one small letter")

})
export type reqBody=z.infer<typeof UserSchema>