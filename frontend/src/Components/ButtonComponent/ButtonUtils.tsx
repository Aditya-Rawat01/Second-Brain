import { ReactElement } from "react"


export interface ButtonProps {
    size:"sm"|"md"|"lg"|"ai-sm"|"ai-responsive"|"side-res",
    text:string,
    variant:'primary'|'secondary'|'sidebarButton',
    startingIcon?:ReactElement,
    endingIcon?:ReactElement,
    shadow:'shadow'|'noShadow'
}

export const ButtonStyles = {
    "sm":"w-[96px] h-[48px] rounded-md",
    "md":"w-[185px] h-[63px] text-lg p-1 rounded-md",
    "lg":"w-36 h-12 p-2 rounded-md",
    "side-res":"w-[222px] h-[47px] text-lg sm:w-[350px] sm:h-[60px]",
    "ai-sm":"w-[62px] text-[10px] h-[23px] rounded-full",
    "ai-responsive":"w-[62px] h-[23px] rounded-full text-[10px] sm:text-[13px] md:text-[14px] sm:w-[110px] sm:h-[30px] md:h-[36px] md:rounded-md",
    "primary":"bg-primary text-black",
    "secondary":"bg-secondary text-gray-200",
    "sidebarButton":"rounded-md border-2 border-primary",
    "shadow":" shadow-customShadow active:opacity-80 active:translate-x-[-3px] active:translate-y-[5px] active:shadow-none", 
    "noShadow":"active:opacity-80"
}
