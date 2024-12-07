import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWTsecret } from "../connection_strings/jwtsecret";
export const validUserMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    //const token=localStorage.getItem("token") ~~~~~~~~ put this line in frontend for any further routes and pass it in req headers token
    const token=req.headers.token
    try {
        const id=jwt.verify(token as string,JWTsecret)
        req.id=id as string
        next()
    } catch (error) {
        res.json({
            "msg":"Invalid token/Session expired"
        })
        return;
    }
    
    
    next()
}