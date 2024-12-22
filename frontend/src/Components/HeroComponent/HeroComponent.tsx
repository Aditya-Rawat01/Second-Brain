import { useSetRecoilState } from "recoil"
import { Button } from "../ButtonComponent/Button"
import { SidebarSwitch } from "../../RecoilAtoms/SidebarSwitch"
import { HamMenu } from "../../Icons/HamMenu"
import { ShareBrainIcon } from "../../Icons/ShareBrainIcon"
import { AddNeuron } from "../../Icons/AddNeuron"
import { ContentModal } from "../ContentModalComponent/ContentModal"
 
export const HeroComponent=()=>{
    const setSidebar=useSetRecoilState(SidebarSwitch)
   
    return (
        <div className=" absolute right-0 w-full h-[calc(100%-48px)] lg:h-[calc(100%-48px)] bottom-0 lg:w-[calc(100%-450px)] z-0">
            <div className="h-[72px] w-full flex  justify-between items-center">
                <div className="lg:invisible ml-2 md:ml-3" onClick={()=>setSidebar(true)}>
                    <HamMenu/>
                </div>
                <div className="w-[260px] h-fit md:w-[400px] lg:w-[310px] flex justify-between pr-1">
                    
                    <Button text="Share Brain" size="brain-res" variant="secondary" shadow="shadow" startingIcon={<ShareBrainIcon/>}/>
                    <Button text="Add Neuron" size="brain-res" variant="primary" shadow="shadow" startingIcon={<AddNeuron/>}/>
                </div>
            </div>



            <div className="min-h-[calc(100%-72px)] h-fit pt-5 w-full bg-white border border-primary flex flex-wrap gap-3 items-center justify-center  rounded-t-[35px]">
                {/*Provide _id in place of id */}
                <ContentModal title="twitter" url="http://fadf" description="Hello world oh hello world" id={1}/>
                <ContentModal title="twitter" url="http://fadf" description="Hello world oh hello world" id={2}/>
                <ContentModal title="twitter" url="http://fadf" description="Hello world oh hello world" id={3}/>
                <ContentModal title="twitter" url="http://fadf" description="Hello world oh hello world" id={4}/>
                <ContentModal title="twitter" url="http://fadf" description="Hello world oh hello world" id={5}/>
            </div>
        </div>
    )
}