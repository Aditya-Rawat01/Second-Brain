import { useSetRecoilState } from "recoil"
import { Button } from "../ButtonComponent/Button"
import { SidebarSwitch } from "../../RecoilAtoms/SidebarSwitch"
 
export const HeroComponent=()=>{
    const setSidebar=useSetRecoilState(SidebarSwitch)
    /// use Recoil atommmmmmm
    return (
        <div className=" absolute right-0 w-full h-[calc(100%-48px)] lg:h-[calc(100%-48px)] bottom-0 lg:w-[calc(100%-450px)] bg-pink-400 z-0">
            <div className="h-[72px] w-full flex bg-red-400 justify-between items-center">
                <p onClick={()=>setSidebar(true)}>iconhere</p>
                <div className="w-[205px] flex justify-between pr-2">
                    
                    <Button text="Share Brain" size="sm" variant="secondary" shadow="shadow"/>
                    <Button text="Add Neuron" size="sm" variant="primary" shadow="shadow"/>
                </div>
            </div>
            <p>hgagdsakhdgakdha aksdjhaksjdhajksdhaskjdhaskjdhkj</p>
        </div>
    )
}