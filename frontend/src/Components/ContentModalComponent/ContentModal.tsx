import { Button } from "../ButtonComponent/Button"
import { ContentModalProps } from "./ContentModalUtils"

export const ContentModal =(props:ContentModalProps)=>{

    return (
        <div className="w-[140px] h-[165px] sm:w-[245px] sm:h-[250px] bg-primary flex flex-col rounded-md items-center justify-around">
            <p className="text-xs sm:text-base">{props.title}</p>
            <div className="w-[88%] h-[66%] bg-white rounded-md">
            // yt embed | tweet embed | doc embed
            </div>
            <div className="flex w-11/12 justify-around items-center h-8 md:h-[36px] md:pb-1">
                <Button size="ai-responsive" text="Description" variant="secondary" shadow="noShadow"/>
                <Button size="ai-responsive" text="Ask Ai" variant="secondary" shadow="noShadow"/>
            </div>
        </div>
    )
}