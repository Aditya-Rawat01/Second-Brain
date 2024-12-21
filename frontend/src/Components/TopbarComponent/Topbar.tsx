import { BrainIcon } from "../../Icons/BrainIcon"

export const Topbar=()=>{
    return (
        <div className="w-full h-12 lg:w-[calc(100%-450px)]  flex items-center absolute top-0 right-0 ">
            <BrainIcon/>
            <p className="text-xl md:text-2xl lg:text-3xl">Second Brain</p>
        </div>
    )
}