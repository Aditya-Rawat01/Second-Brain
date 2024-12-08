import express from 'express'
import mongoose, { ObjectId } from 'mongoose'
import { dbURL } from './connection_strings/db_connection'
import { signupMiddleware } from './middlewares/signupMiddleware'
import { Jwt } from 'jsonwebtoken'
import { signinMiddleware } from './middlewares/signinMiddleware'
import { validUserMiddleware } from './middlewares/validUserMiddleware'
import { neuron } from './dbSchema'
const app=express()
app.use(express.json())
mongoose.connect(dbURL)

declare global {
    namespace Express {                         /// token property is now attached as optional prop to req object
    export interface Request {
        token?:string,
        id?:string
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

app.post("/neuron",validUserMiddleware, async(req,res)=>{
    const {type, url, title}=req.body
    const date = new Date();
    try {
       await neuron.create({
        type:type,
        url:url,
        title:title,
        userId:req.id,
        createdAt:date.toDateString()
    })
    res.json({
        "msg":"neuron added successfully"
    }) 
    } catch (error) {
        res.json({
            "msg":"error while creating new neuron"
        })
        return;
    }
    
})

app.get("/neuron",validUserMiddleware,async (req,res)=>{
    try {
        const brain=await neuron.find({
            userId:req.id
        })
        res.json({
            "msg":brain
        })

    } catch (error) {
        res.json({
            "msg":"error occured "+ error 
        })
        return;
    }
})
app.listen(3000)