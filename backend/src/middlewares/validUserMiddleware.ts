import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWTsecret } from "../miscellaneous/connection_strings/jwtsecret";
import { ObjectId } from "mongoose";
export const validUserMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    //const token=localStorage.getItem("token") ~~~~~~~~ put this line in frontend for any further routes and pass it in req headers token
    const token=req.headers.token
    try {
        const tokenObj=jwt.verify(token as string,JWTsecret) as JwtPayload
        req.id=tokenObj.id
        next()
        
    } catch (error) {
        res.json({
            "msg":"Invalid token/Session expired"
        })
        return;
    }
    
}