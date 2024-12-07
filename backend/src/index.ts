import express from 'express'
import mongoose from 'mongoose'
import { dbURL } from './connection_strings/db_connection'
import { signupMiddleware } from './middlewares/signupMiddleware'
import { Jwt } from 'jsonwebtoken'
import { signinMiddleware } from './middlewares/signinMiddleware'
const app=express()
app.use(express.json())
mongoose.connect(dbURL)

declare global {
    namespace Express {                         /// token property is now attached as optional prop to req object
    export interface Request {
        token?:string
    }
}
}
app.post("/signup",signupMiddleware,(req,res)=>{
    res.json({
        msg:"New User signed up successfully"
    })
})
app.post("/signin",signinMiddleware,(req,res)=>{
    res.json({
        msg:req.token
    })
})
app.listen(3000)