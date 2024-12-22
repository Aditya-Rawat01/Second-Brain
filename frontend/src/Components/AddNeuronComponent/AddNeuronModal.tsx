import {  useSetRecoilState } from "recoil"
import { AddNeuronAtom } from "../../RecoilAtoms/AddNeuronAtom"
import { CancelIcon } from "../../Icons/CancelIcon"

export const AddNeuronModal=()=>{
   const setStateVal=useSetRecoilState(AddNeuronAtom)
    return (
        
     <div className="w-2/3 h-3/4 flex  justify-center items-center absolute top-[80px] left-1/2 -translate-x-1/2 bg-primary border border-secondary z-50 rounded-lg">
        <div className="absolute top-6 left-6" onClick={()=>setStateVal(false)}><CancelIcon size="size-6"/></div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-1/2 flex flex-col items-center bg-primary rounded-lg">
            <label>Title</label>
            <input className="rounded-lg p-1 pl-2" type="text"></input>

            <label>Type</label>
            <input className="rounded-lg p-1 pl-2" type="button"></input>
            <input className="rounded-lg p-1 pl-2" type="button"></input>
            <input className="rounded-lg p-1 pl-2" type="button"></input>

            <label>URL</label>
            <input className="rounded-lg p-1 pl-2" type="url"/>

            <label>Description</label>
            <input className="rounded-lg p-1 pl-2" type="text"></input>


        </form>
        
    </div>

    )
}