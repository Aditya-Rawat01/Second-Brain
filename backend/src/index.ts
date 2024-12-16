import express from 'express'
import mongoose, { ObjectId } from 'mongoose'

import { signupMiddleware } from './middlewares/signupMiddleware'
import { Jwt } from 'jsonwebtoken'
import { signinMiddleware } from './middlewares/signinMiddleware'
import { validUserMiddleware } from './middlewares/validUserMiddleware'
import { neuron, sharedBrain } from './dbSchema'
import { neuronZodSchema, sharedBrainZodschema } from './zodSchema'
import { uniqueUrl } from './miscellaneous/sharedUrlGenerator'
import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai"
/// cors is not imported yet so there can be some errors from frontend
const app=express()
app.use(express.json())
try {
    mongoose.connect(process.env.dbURL as string)
} catch (error) {
    console.log("Error occurred")
}


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


app.post("/shareBrain/:sharedLink",async(req,res)=>{
    const sharedBrainLink = req.params.sharedLink
    try {
      const Brain= await sharedBrain.findOne({
        url:sharedBrainLink
    })
  
    if (Brain!=null) {
        const response=await neuron.find({
        userId:Brain.userId
        })
        res.json({
            "msg":response
        })
    } else {
        res.json({
            "msg":"Invalid Link"
        })
        return;
    }
    } catch (error) {
        res.json({
            "msg":error
        })
    }})

///// when doing app.get("/brain"), we are already getting neuron _id so in frontend 
//when one click on share neuron button just get neuron id and show him . no use of extra route
app.post("/shareNeuron/:neuronId",validUserMiddleware,async(req,res)=>{
    const neuronId=req.params.neuronId
    try {
       const foundNeuron=await neuron.findOne({
        _id:neuronId
    })
    if (foundNeuron!==null) {
        res.json({
            "msg":foundNeuron
    }) 
    } else {
        res.json({
            "msg":"Invalid neuron id"
        })
    }
    
    } catch (error) {
        res.json({
            "msg":"neuron id length is invalid"
        })
    }
    
})


// doesnt work.... gives wrong summary.....


app.post("/explainAi/:neuronId",async (req,res)=>{
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const neuronId = req.params.neuronId
    try {
        const foundNeuron=await neuron.findOne({
         _id:neuronId
     })
        if (foundNeuron!=null) {
            const url=foundNeuron.url
            const prompt = `Please provide a concise summary of the content available at the following URL: ${url}
             Your summary should be objective, informative, and free of any personal opinions or biases. 
             If the URL leads to a document, please include key findings, arguments, or conclusions.
             If the URL leads to a webpage, please summarize the main purpose and key information presented on the page.`
            const result = await model.generateContent(prompt);
            res.json({
                "msg":result.response.text()
            })
            return;
        } else {
            res.json({
                "msg":"Invalid neuron id"
            })
            return;
        }    
    }
    catch {
        res.json({
            msg:"Invalid neuron Id Length"
        })
     }
})
app.listen(3000)