import { useRecoilState, useSetRecoilState } from "recoil"
import { Button } from "../ButtonComponent/Button"
import { SidebarSwitch } from "../../RecoilAtoms/SidebarSwitch"
import { HamMenu } from "../../Icons/HamMenu"
import { ShareBrainIcon } from "../../Icons/ShareBrainIcon"
import { AddNeuron } from "../../Icons/AddNeuron"
import { ContentModal } from "../ContentModalComponent/ContentModal"
import { AddNeuronAtom } from "../../RecoilAtoms/AddNeuronAtom"
import { AddNeuronModal } from "../AddNeuronComponent/AddNeuronModal"
import { neuronData } from "../../RecoilAtoms/NeuronData"
import { getBrainHook } from "../../DataFetchingHooks/getBrainHook"
import { ContentModalProps } from "../ContentModalComponent/ContentModalUtils"
 
export const HeroComponent=()=>{
    const {data, isLoading, isError}=getBrainHook()
    const setSidebar=useSetRecoilState(SidebarSwitch)
    const [AddNeuronVal,setAddneuronAtom]=useRecoilState(AddNeuronAtom)
    if (isLoading) {
        return <>Loading...</>
    }
    if (isError) {
        return <>Error</>
    }
    console.log(typeof(data?.data.msg))
    return (
        <div className=" absolute right-0 w-full h-[calc(100%-48px)] lg:h-[calc(100%-48px)] bottom-0 lg:w-[calc(100%-450px)] z-0">
            <div className="h-[72px] w-full flex  justify-between items-center">
                <div className="lg:invisible ml-2 md:ml-3" onClick={()=>setSidebar(true)}>
                    <HamMenu/>
                </div>
                <div className="w-[260px] h-fit md:w-[400px] lg:w-[310px] flex justify-between pr-1">
                    
                    <Button text="Share Brain" size="brain-res" variant="secondary" shadow="shadow" startingIcon={<ShareBrainIcon/>}/>
                    <Button text="Add Neuron" size="brain-res" variant="primary" shadow="shadow" startingIcon={<AddNeuron/>} onclick={()=>setAddneuronAtom(true)}/>
                    {AddNeuronVal && <AddNeuronModal/>}
                </div>
            </div>



            <div className="min-h-[calc(100%-72px)] h-fit pt-5 w-full bg-white border border-primary flex flex-wrap gap-3 items-center justify-center  rounded-t-[35px]">
                
                
                {(typeof(data?.data.msg)!='string')?data?.data.msg.map((index:ContentModalProps)=><ContentModal key={index._id} title={index.title} type={index.type} url={index.url} description={index.description} _id={index._id}/>)
                                                    :data.data.msg}
            
               
            </div>
        </div>
    )
}