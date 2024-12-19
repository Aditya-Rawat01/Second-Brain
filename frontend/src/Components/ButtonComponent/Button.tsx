import { ButtonProps, ButtonStyles } from "./ButtonUtils"



export const Button=(props:ButtonProps)=>{

    return (
        <button className={`${ButtonStyles[props.size]}  ${ButtonStyles[props.variant]} ${ButtonStyles[props.shadow]}`}>
        {props.text}
        </button>
    )
}