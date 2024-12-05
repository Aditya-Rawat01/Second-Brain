import { NextFunction, Request, Response } from "express";
import { UserSchema } from "../zodSchema";



export const userMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const username:string=req.body.username
    const password:string=req.body.password
        const ans=UserSchema.safeParse({
            username:username,
            password:password})

            if (ans.success) {
                next()}
            else {
                res.json({
                    "msg":ans.error.issues[0].message
                })
                return;
            }
    } 
