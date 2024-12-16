import { ReactElement } from "react"


export interface ButtonProps {
    size:"sm"|"md"|"lg",
    text:string,
    variant:'primary'|'secondary',
    startingIcon?:ReactElement,
    endingIcon?:ReactElement,
    shadow:'shadow'|'noShadow'
}

export const ButtonStyles = {
    "sm":"w-24 h-12 rounded-md",
    "md":"w-28 h-12 p-1 rounded-md",
    "lg":"w-36 h-12 p-2 rounded-md",
    "primary":"bg-gray-300 text-black",
    "secondary":"bg-secondary text-gray-200",
    "shadow":" shadow-customShadow  active:opacity-80 active:translate-x-[-3px] active:translate-y-[5px] active:shadow-none", 
    "noShadow":"active:opacity-80"
}
