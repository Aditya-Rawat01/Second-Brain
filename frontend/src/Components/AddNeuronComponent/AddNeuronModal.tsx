import {   useRecoilState } from "recoil"
import { AddNeuronAtom } from "../../RecoilAtoms/AddNeuronAtom"
import { CancelIcon } from "../../Icons/CancelIcon"
import { NeuronTypeAtom } from "../../RecoilAtoms/NeuronTypeAtom"

import { useRef } from "react"
import { usePostNeuronHook } from "../../DataFetchingHooks/postNeuronHook"


export const AddNeuronModal=()=>{
   const [neuronAtom,setNeuronAtom]=useRecoilState(AddNeuronAtom)
   const [NeuronType,setNeuronType]=useRecoilState(NeuronTypeAtom)
   const titleRef=useRef<HTMLInputElement>(null)
   const UrlRef=useRef<HTMLInputElement>(null)
   const descRef=useRef<HTMLInputElement>(null)
   const {mutate, isLoading} =usePostNeuronHook()
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
       mutate({type,url,title,description})
       setNeuronAtom(false)
   }
   
    return (
        
     <div className={`w-full lg:w-[calc(100%-450px)] h-3/4 flex flex-col justify-around items-center fixed  left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 bg-white bg-opacity-95 border border-secondary z-50 rounded-lg transition-all duration-1000 ${neuronAtom?"bottom-0":"bottom-[-100%]"}`}>
        <div className="absolute top-6 left-6" onClick={()=>setNeuronAtom(false)}><CancelIcon size="size-6"/></div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-1/2 flex flex-col gap-3 items-center rounded-lg">
            <label>Title</label>
            <input ref={titleRef} className="rounded-lg p-1 w-full pl-2 border border-black" type="text"></input>

            <label>Type</label>
            <div className="flex overflow-hidden rounded-full h-12 sm:w-full outline outline-2 outline-black">
                <button className={`h-full p-1 sm:w-[34%] ${NeuronType===0?"bg-secondary text-white":"bg-white"}`} onClick={()=>setNeuronType(0)} type="button">Document</button>
                <button className={`h-full p-1 sm:w-[34%]  ${NeuronType===1?"bg-secondary text-white":"bg-white"}`} onClick={()=>setNeuronType(1)} type="button">Twitter</button>
                <button className={`h-full p-1 sm:w-[34%]  ${NeuronType===2?"bg-secondary text-white":"bg-white"}`} onClick={()=>setNeuronType(2)} type="button">Youtube</button>
            </div>

            <label>URL</label>
            <input ref={UrlRef} className="rounded-lg p-1 w-full pl-2 border border-black" type="url"/>

            <label>Description</label>
            <input ref={descRef} className="rounded-lg p-1 w-full pl-2 border border-black" type="text"></input>

            <button type="submit" className="w-32 h-12 rounded-lg border border-black hover:opacity-90 active:opacity-40 bg-secondary text-white" onClick={PostNeuron}>Add</button>
        </form>
        
    </div>

    )
}