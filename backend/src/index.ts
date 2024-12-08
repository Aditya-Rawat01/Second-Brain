import express from 'express'
import mongoose, { ObjectId } from 'mongoose'
import { dbURL } from './miscellaneous/connection_strings/db_connection'
import { signupMiddleware } from './middlewares/signupMiddleware'
import { Jwt } from 'jsonwebtoken'
import { signinMiddleware } from './middlewares/signinMiddleware'
import { validUserMiddleware } from './middlewares/validUserMiddleware'
import { neuron, sharedBrain } from './dbSchema'
import { neuronZodSchema, sharedBrainZodschema } from './zodSchema'
import { uniqueUrl } from './miscellaneous/sharedUrlGenerator'
const app=express()
app.use(express.json())
mongoose.connect(dbURL)

declare global {
    namespace Express {                         /// token and id property is now attached as optional prop to req object
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

    const ans=neuronZodSchema.safeParse({
        type:type,
        url:url,
        title:title
    })
    if (ans.success) {
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
    } else {
        res.json({
            "msg":ans.error.issues[0].message
        })
    }
    
    
})

app.get("/brain",validUserMiddleware,async (req,res)=>{
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
app.delete("/:neuronId",validUserMiddleware,async(req,res)=>{
    const neuronId = req.params.neuronId
    
    try {
        const isValidNeuron=await neuron.deleteOne({
        userId:req.id,
        _id:neuronId
    })

    if (isValidNeuron.deletedCount===0) {
        res.json({
            "msg":"Invalid/deleted neuronId"
        })
        return;
    } else {
        res.json({
        "msg":"Neuron destroyed successfully"
    })}
    
    } catch (error) {
        res.json({
            "msg":error
        })
    }
})

app.post("/shareBrain",validUserMiddleware,async(req,res)=>{
    const share=req.body.share
    const ans=sharedBrainZodschema.safeParse({
        share:share
    })
    
    if (ans.success) {
        
        if (share===true) {
            const url=await uniqueUrl()
            const alreadyShared=await sharedBrain.findOne({
                userId:req.id
            })
            if (alreadyShared===null) {
                await sharedBrain.create({
                userId:req.id,
                url:url,
                share:true
            })
            res.json({
                "msg":"Link to your shared brain is: "+url
            })}
            else {
                res.json({
                    "msg":"Link to your shared brain is: "+alreadyShared.url
                })
            }
            
            return;
        } else {
            const response=await sharedBrain.deleteOne({
                userId:req.id
            })
            res.json({
                "msg":"Brain is private now"
            })
            return;
        }
    }
    else {
        res.json({
            "msg":"Some fields are empty"
        })
    }
})
app.listen(3000)