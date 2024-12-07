import { NextFunction, Request, Response } from "express";
import { reqBody, UserSchema } from "../zodSchema";
import { users } from "../dbSchema";



export const signupMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    const {username,password}:reqBody=req.body


        const ans=UserSchema.safeParse({
            username:username,
            password:password})

            if (ans.success) {
                const existingUser=await users.findOne({
                    username:username
                })
                        if (existingUser===null) {
                            try {
                                await users.create({
                                username:username,
                                password:password

                            })
                            next() 
                        } catch (error) {
                                res.json({
                                    "msg":"Error while creating a new user"
                                })
                                return;
                        }
                        
                    
                    } else {
                        res.json({
                            "msg":"Username already exists. Try signing in"
                        })
                        return;
                    }
            }
                
            else {
                res.json({
                    "msg":ans.error.issues[0].message
                })
                return;
            }
    } 
