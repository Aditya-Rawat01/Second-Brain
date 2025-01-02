import axios from "axios";
import { URI } from "./publicUrl";
import { useMutation, useQueryClient } from "react-query";

export async function deleteNeuronHook(param:string) {
    const res=await axios.delete(`${URI}/${param}`,{
        headers:{
            // do localstorage.getItem here
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWMyNWI0MDM3NWI0MzM3Mzg1N2M4YyIsImlhdCI6MTczNDA5MjI4Nn0.weZH684uy_QAIFWt8UalHVB9kFj96buxJ2mw_SvhKsA"
        }
    })
    return res.data;
}
export function usedeleteNeuronHook() {
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey:["deleteNeuron"],
        mutationFn:deleteNeuronHook,
        onSuccess() {
            queryClient.invalidateQueries({queryKey:["fetcher"]})
        }
    })
}