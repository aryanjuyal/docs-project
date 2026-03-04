"use client"
import { is } from 'date-fns/locale';
import {LucideIcon,Undo2Icon} from 'lucide-react'
import {cn} from '@/lib/utils'
interface ToolbarButtonProps{
onClick:()=>void;
icon:LucideIcon;
isActive?:boolean;
}

const ToolBarButtonn=( {onClick, icon:Icon, isActive }: ToolbarButtonProps)=>{
return(
    <button onClick={onClick} className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"//so what cn does is we give clasees  normaly
        //and after comma we pass dynamic classes 
    )}  >
        <Icon />
    </button>
)
}
export const Toolbar=()=>{
    const sections:{label:string,
icon:LucideIcon,
onClick:()=>void,
isActive:boolean
    }[][]=[
        [
            {
                label:"Undo",
                icon:Undo2Icon,
                onClick:()=>console.log("Undo clicked"),
                isActive:false
            }
        ]
    ]
    return(
        <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-40px flex items-center gap-x-0.4'>
            {sections[0].map((item)=>(
                <ToolBarButtonn key={item.label} {...item} />
            ))}
        </div>
    )
}

export default Toolbar; 