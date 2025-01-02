import axios from "axios"
import { useQuery } from "react-query"
import { URI } from "./publicUrl"


const fetchFn=async () => {
        const res=await axios.get(`${URI}/brain`,{
        headers:{
              // do localstorage.getItem here
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWMyNWI0MDM3NWI0MzM3Mzg1N2M4YyIsImlhdCI6MTczNDA5MjI4Nn0.weZH684uy_QAIFWt8UalHVB9kFj96buxJ2mw_SvhKsA"
            }
    }) 
    return res
  
    
}
export const getBrainHook=()=>{
    
    const {data, isLoading, isError} = useQuery({
        queryKey:["fetcher"],
        queryFn: fetchFn
    })
   
    return (
        {
            data,
            isLoading:isLoading,
            isError:isError
        }
        
    )
}