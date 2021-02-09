import React,{ FC } from "react"

interface Props {
    onClick : () => void,
    style: object
}

export const SvgPassword : FC<Props> = ({onClick, style}) => {
    return(     
        <div style={style} onClick={onClick}>
        <svg width="25" height="25" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 9.5C16.6569 9.5 18 10.8431 18 12.5V18.5C18 20.1569 16.6569 21.5 15 21.5H3C1.34315 21.5 0 20.1569 0 18.5V12.5C0 10.8431 1.34315 9.5 3 9.5V6.5C3 3.18629 5.68629 0.5 9 0.5C12.3137 0.5 15 3.18629 15 6.5V9.5ZM9 2.5C11.2091 2.5 13 4.29086 13 6.5V9.5H5V6.5C5 4.29086 6.79086 2.5 9 2.5ZM15 11.5H3C2.44772 11.5 2 11.9477 2 12.5V18.5C2 19.0523 2.44772 19.5 3 19.5H15C15.5523 19.5 16 19.0523 16 18.5V12.5C16 11.9477 15.5523 11.5 15 11.5Z" 
            fill={"rgba(255, 255, 255, 0.87)"}/>
        </svg>
        </div>
    )
}

export const SvgPasswordUnlock : FC<Props> = ({onClick, style}) => {
    return(     
        <div style={style} onClick={onClick}>
        <svg width="25" height="25" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6H14C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6V9H15C16.6569 9 18 10.3431 18 12V18C18 19.6569 16.6569 21 15 21H3C1.34315 21 0 19.6569 0 18V12C0 10.3431 1.34315 9 3 9H4V6C4 2.68629 6.68629 0 10 0C13.3137 0 16 2.68629 16 6ZM15 11H3C2.44772 11 2 11.4477 2 12V18C2 18.5523 2.44772 19 3 19H15C15.5523 19 16 18.5523 16 18V12C16 11.4477 15.5523 11 15 11Z" 
            fill={"rgba(255, 255, 255, 0.87)"}/>
        </svg>
        </div>
    )
}

