import express from 'express'
import mongoose from 'mongoose'
const app=express()
app.use(express.json())
mongoose.connect("")

app.post("/signup",(req,res)=>{
    res.json({
        msg:"ok"
    })
})

app.listen(3000)