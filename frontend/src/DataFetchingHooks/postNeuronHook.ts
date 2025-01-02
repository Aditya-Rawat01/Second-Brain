import axios from "axios"

import { URI } from "./publicUrl"
import { useMutation, useQueryClient } from "react-query"

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


export function usePostNeuronHook (){
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey:["postNeuron"],
        mutationFn:postNeuron,
        onSuccess() {
            queryClient.invalidateQueries({queryKey:["fetcher"]})
        },
    })
}