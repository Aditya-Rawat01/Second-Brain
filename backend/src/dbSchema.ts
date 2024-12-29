import mongoose, { model, Schema } from "mongoose";


const userSchema=new Schema({
    username:String,
    password:String
})
export const users = model("users",userSchema)


const neuronSchema= new Schema({
    type:{
        type: String,
        enum:["twitter","youtube","pdf"]
    },
    url:String,
    title:String,
    description:String,
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    createdAt:String  // try to put it in date formt if could
})

export const neuron =model("neurons",neuronSchema)


const sharedBrainSchema= new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    url:String,
    share:Boolean
})

export const sharedBrain= mongoose.model("sharedbrains",sharedBrainSchema)