import { NextFunction, Request, Response } from "express";
import { reqBody } from "../zodSchema";
import { users } from "../dbSchema";
import jwt from "jsonwebtoken";
import { JWTsecret } from "../connection_strings/jwtsecret";
export const signinMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    const {username, password}:reqBody=req.body
    try {
       const userFound=await users.findOne({
        username:username
    })
    
    if (userFound!==null) {
        const token = jwt.sign(userFound._id,JWTsecret)
        //localStorage.setItem("token",token) ~~~~~~~~~~~~~~~ put it in frontend while signing up
        req.token=token
        next()   
    }
    else {
        res.json({
            "msg":"No such user found. Try signing up"
        })
        return;
    } 

    
    } catch (error) {
        res.json({
            "msg":"Error occurred while fetching from db"
        })
        return;
    }
    
}