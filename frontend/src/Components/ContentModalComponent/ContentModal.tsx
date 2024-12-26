import { useRecoilState } from "recoil"
import { Button } from "../ButtonComponent/Button"
import { ContentModalProps } from "./ContentModalUtils"
import { DescAiSwitch } from "../../RecoilAtoms/DescAiSwitch"
import { CancelIcon } from "../../Icons/CancelIcon"


export const ContentModal =(props:ContentModalProps)=>{
    const [deskAiSwitch,setDeskAiSwitch]= useRecoilState(DescAiSwitch(props._id))
    return (
        <div className="w-[140px] h-[165px] sm:w-[245px] sm:h-[250px] bg-primary flex flex-col rounded-md items-center justify-around relative">
            <p className="text-xs sm:text-base">{props.title}</p>
            <div className="w-[88%] h-[66%] bg-white rounded-md">
            // yt embed | tweet embed | doc embed
            </div>
            <div className="flex w-11/12 justify-around items-center h-8 md:h-[36px] md:pb-1">
                <Button size="ai-responsive" text="Description" variant="secondary" shadow="noShadow" onclick={()=>setDeskAiSwitch(1)}/>
                <Button size="ai-responsive" text="Ask Ai" variant="secondary" shadow="noShadow" onclick={()=>setDeskAiSwitch(2)}/>
            </div>
            
            
            {deskAiSwitch ? 
            <div className="absolute w-full h-full bg-white border-2 border-secondary rounded-md">
                <div className="flex justify-center pt-3 text-secondary w-full h-full">
                <div className="absolute left-2" onClick={()=>setDeskAiSwitch(0)}><CancelIcon size="size-6"/></div>
                 {deskAiSwitch===1?
                        <div className="w-full flex flex-col items-center gap-5">
                            <p>Description</p>
                            <p>{props.description}</p>
                        </div>
                    :
                        <div className="w-full flex flex-col items-center gap-5">
                            <p>AI Summary</p>
                            <p>{/*AI integration by api */}</p>
                        </div>
                    }
                   </div> 

            </div>:""}
        </div>
    )
}