
import { Button } from "../ButtonComponent/Button"
import { CancelIcon } from "../Icons/CancelIcon"
import { SidebarSwitch } from "../../RecoilAtoms/SidebarSwitch"
import { useRecoilState } from "recoil"
 /*size:"sm"|"md"|"lg"|"ai-sm"|"ai-responsive",
    text:string,
    variant:'primary'|'secondary',
    startingIcon?:ReactElement,
    endingIcon?:ReactElement,
    shadow:'shadow'|'noShadow'*/
export const Sidebar=()=>{
    const [sidebar,setSidebar]=useRecoilState(SidebarSwitch)
    return (
        <div className={`${!sidebar?"invisible":"absolute bg-white z-10 w-[270px] h-[560px] sm:w-[500px] lg:h-full lg:w-[450px] border border-primary bottom-0 left-0 rounded-tr-[32px]"}`}>
            <div className="pt-4  pl-2 h-24" onClick={()=>setSidebar(false)}><CancelIcon/></div>
            <div className="w-full lg:mt-12 h-[320px] flex flex-col items-center pr-2 justify-between">
                <Button size="side-res" text="All Neurons" variant="sidebarButton" shadow="noShadow"/>
                <Button size="side-res" text="Youtube" variant="sidebarButton" shadow="noShadow"/>
                <Button size="side-res" text="Twitter" variant="sidebarButton" shadow="noShadow"/>
                <Button size="side-res" text="Documents" variant="sidebarButton" shadow="noShadow"/>
                
            </div>

        </div>
    )
}