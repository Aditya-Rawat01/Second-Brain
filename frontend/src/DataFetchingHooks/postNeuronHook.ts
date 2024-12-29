import axios from "axios"

import { URI } from "./publicUrl"

export interface postNeuronProps {
    type:String
    title: String
    url: String
    description:String
}

async function postNeuron({type, url, title, description}:postNeuronProps) {
    const res=await axios.post(`${URI}/neuron`,{
        type,
        url,
        title,
        description
    },{
        headers:{
            // do localstorage.getItem here
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWMyNWI0MDM3NWI0MzM3Mzg1N2M4YyIsImlhdCI6MTczNDA5MjI4Nn0.weZH684uy_QAIFWt8UalHVB9kFj96buxJ2mw_SvhKsA"
            
        }
    })
    return res.data
}



export  async function postNeuronHook ({type, url, title,description}:postNeuronProps){
    const response=await postNeuron({type,url,title,description})
    console.log(response)
    return;
}