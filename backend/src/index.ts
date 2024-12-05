import express from 'express'
import mongoose from 'mongoose'
import { dbURL } from './connection_strings/db_connection'
import { userMiddleware } from './middlewares/userMiddleware'
const app=express()
app.use(express.json())
mongoose.connect(dbURL)

app.post("/signup",userMiddleware,(req,res)=>{
    res.json({
        msg:"signedup"
    })
})
app.post("/signin",userMiddleware,(req,res)=>{
    res.json({
        msg:"signedin"
    })
})
app.listen(3000)