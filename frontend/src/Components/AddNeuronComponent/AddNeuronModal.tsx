import {   useRecoilState, useSetRecoilState } from "recoil"
import { AddNeuronAtom } from "../../RecoilAtoms/AddNeuronAtom"
import { CancelIcon } from "../../Icons/CancelIcon"
import { NeuronTypeAtom } from "../../RecoilAtoms/NeuronTypeAtom"

import { useRef } from "react"
import { postNeuronHook } from "../../DataFetchingHooks/postNeuronHook"


export const AddNeuronModal=()=>{
   const setStateVal=useSetRecoilState(AddNeuronAtom)
   const [NeuronType,setNeuronType]=useRecoilState(NeuronTypeAtom)
   const titleRef=useRef<HTMLInputElement>(null)
   const UrlRef=useRef<HTMLInputElement>(null)
   const descRef=useRef<HTMLInputElement>(null)
  
   function PostNeuron() {
       const title=titleRef.current?.value as string
       const url=UrlRef.current?.value as string
       const description=descRef.current?.value as string
       let type="document" 
        if (NeuronType===1){
        type ="twitter"
       }
       else {
        type="youtube"
       }

       //this postNeuronHook can be better with useMutation. Also with useMutation we will be able to run the getBrain() query again (query invalidation) 
        postNeuronHook({type,url,title,description})
        setStateVal(false)
   }
   
    return (
        
     <div className="w-full h-3/4 flex flex-col justify-around items-center absolute bottom-0 left-1/2 -translate-x-1/2 bg-white bg-opacity-95 border border-secondary z-50 rounded-lg">
        <div className="absolute top-6 left-6" onClick={()=>setStateVal(false)}><CancelIcon size="size-6"/></div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-1/2 flex flex-col gap-3 items-center rounded-lg">
            <label>Title</label>
            <input ref={titleRef} className="rounded-lg p-1 w-full pl-2 border border-black" type="text"></input>

            <label>Type</label>
            <div className="flex overflow-hidden rounded-full h-12 sm:w-full border border-black">
                <button className={`h-full p-1 sm:w-1/3 border border-r-black ${NeuronType===0?"bg-secondary text-white":"bg-white"}`} onClick={()=>setNeuronType(0)} type="button">Document</button>
                <button className={`h-full p-1 sm:w-1/3 border border-r-black ${NeuronType===1?"bg-secondary text-white":"bg-white"}`} onClick={()=>setNeuronType(1)} type="button">Twitter</button>
                <button className={`h-full p-1 sm:w-1/3 border border-r-black ${NeuronType===2?"bg-secondary text-white":"bg-white"}`} onClick={()=>setNeuronType(2)} type="button">Youtube</button>
            </div>

            <label>URL</label>
            <input ref={UrlRef} className="rounded-lg p-1 w-full pl-2 border border-black" type="url"/>

            <label>Description</label>
            <input ref={descRef} className="rounded-lg p-1 w-full pl-2 border border-black" type="text"></input>

            <button type="submit" className="w-32 h-12 rounded-lg border border-black hover:bg-gray-100 active:opacity-40" onClick={PostNeuron}>Add</button>
        </form>
        
    </div>

    )
}