
import { Button } from "../ButtonComponent/Button"
import { CancelIcon } from "../../Icons/CancelIcon"
import { SidebarSwitch } from "../../RecoilAtoms/SidebarSwitch"
import { useRecoilState } from "recoil"
import { YoutubeIcon } from "../../Icons/YoutubeIcon"
import { TwitterIcon } from "../../Icons/TwitterIcon"
import { DocumentIcon } from "../../Icons/DocumentIcon"
import { AllNeuronIcon } from "../../Icons/AllNeuronIcon"

 
export const Sidebar=()=>{
    const [sidebar,setSidebar]=useRecoilState(SidebarSwitch)
    return (
        <div className={`${!sidebar?"invisible lg:visible lg:h-full lg:w-[450px] lg:absolute lg:bg-white lg:z-10 lg:border lg:border-primary lg:bottom-0 lg:left-0 lg:rounded-tr-[32px]":"absolute bg-white z-10 w-[270px] h-[560px] sm:w-[500px] border border-primary bottom-0 left-0 rounded-tr-[32px]"}`}>
            <div className="pt-6  pl-2 h-24" onClick={()=>setSidebar(false)}><CancelIcon/></div>
            <div className="w-full lg:mt-12 h-[320px] flex flex-col items-center pr-2 justify-between">
                <Button size="side-res" text="All Neurons" variant="sidebarButton" shadow="noShadow" startingIcon={<AllNeuronIcon/>}/>
                <Button size="side-res" text="Youtube" variant="sidebarButton" shadow="noShadow" startingIcon={<YoutubeIcon/>}/>
                <Button size="side-res" text="Twitter" variant="sidebarButton" shadow="noShadow" startingIcon={<TwitterIcon/>}/>
                <Button size="side-res" text="Documents" variant="sidebarButton" shadow="noShadow" startingIcon={<DocumentIcon/>}/>
                
            </div>

        </div>
    )
}