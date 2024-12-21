import { useSetRecoilState } from "recoil"
import { Button } from "../ButtonComponent/Button"
import { SidebarSwitch } from "../../RecoilAtoms/SidebarSwitch"
import { HamMenu } from "../../Icons/HamMenu"
 
export const HeroComponent=()=>{
    const setSidebar=useSetRecoilState(SidebarSwitch)
    /// use Recoil atommmmmmm
    return (
        <div className=" absolute right-0 w-full h-[calc(100%-48px)] lg:h-[calc(100%-48px)] bottom-0 lg:w-[calc(100%-450px)] z-0">
            <div className="h-[72px] w-full flex  justify-between items-center">
                <div className="lg:invisible ml-2 md:ml-3" onClick={()=>setSidebar(true)}>
                    <HamMenu/>
                </div>
                <div className="w-[210px] md:w-[400px] lg:w-[310px] flex justify-between pr-2">
                    
                    <Button text="Share Brain" size="brain-res" variant="secondary" shadow="shadow"/>
                    <Button text="Add Neuron" size="brain-res" variant="primary" shadow="shadow"/>
                </div>
            </div>
            <div className="min-h-[calc(100%-72px)] w-full bg-primary rounded-t-[35px]">

            </div>
        </div>
    )
}