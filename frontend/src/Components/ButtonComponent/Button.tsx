import { ButtonProps, ButtonStyles } from "./ButtonUtils"



export const Button=(props:ButtonProps)=>{

    return (
        <button onClick={props.onclick} className={`${ButtonStyles[props.size]}  ${ButtonStyles[props.variant]} ${ButtonStyles[props.shadow]} flex items-center justify-center gap-2`}>
            
                {props.startingIcon}
                {props.text}
        
                
          
            
        
        </button>
    )
}