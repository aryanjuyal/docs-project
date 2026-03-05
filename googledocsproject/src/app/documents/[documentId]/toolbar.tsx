"use client"
import { is } from 'date-fns/locale';
import {LucideIcon,Undo2Icon,Redo2Icon,PrinterIcon,SpellCheckIcon,BoldIcon,ItalicIcon,UnderlineIcon,MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon} from 'lucide-react'
import {cn} from '@/lib/utils'
import { useeditorStore } from '@/src/store/use-editor-store';
import {Separator}from '@/src/components/ui/separator'
interface ToolbarButtonProps{
onClick:()=>void;
icon:LucideIcon;
isActive?:boolean;
}
const FontFamilySection=()=>{
    return({

    })
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

    const {editor}=useeditorStore()
    const sections:{label:string,
icon:LucideIcon,
onClick:()=>void,
isActive:boolean
    }[][]=[
        [
            {
                label:"Undo",
                icon:Undo2Icon,
                onClick:()=>editor?.chain().focus().undo().run(),
                isActive:false
            },
            {
label:"Redo",
icon:Redo2Icon,
onClick:()=>editor?.chain().focus().redo().run(),
isActive:false

            },


            {
                label:"print",
                icon:PrinterIcon,
                onClick:()=>editor?.chain().focus().redo().run(),
                isActive:false  
            },{
                label:"Spell Check",
                icon:SpellCheckIcon,
                onClick:()=>editor?.chain().focus().redo().run(),
                isActive:false
                
            }
        ],[
            {
                label:"Bold",
                icon:BoldIcon,
                onClick:()=>editor?.chain().focus().toggleBold().run(),
                isActive:editor?.isActive('bold') || false 
            },
             {
                label:"Italic",
                icon:ItalicIcon,
                onClick:()=>editor?.chain().focus().toggleItalic().run(),
                isActive:editor?.isActive('italic') || false 
            },
             {
                label:"Underline",
                icon:UnderlineIcon,
                onClick:()=>editor?.chain().focus().toggleUnderline().run(),
                isActive:editor?.isActive('underline') || false 
            },
            

        ],[
            {
                label:"Comment",
                icon:MessageSquarePlusIcon,
                onClick:()=> console.log("comment"),
                isActive:false
            },
            {
                label:"List Todo",
                icon:ListTodoIcon,
                onClick:()=>editor?.chain().focus().toggleTaskList().run(),
                isActive:editor?.isActive('taskList') || false
            },
            {
                label:"Remove Formating",
                icon:RemoveFormattingIcon,
                onClick:()=>editor?.chain().focus().clearNodes().unsetAllMarks().run(),
                isActive:false
            },
        ]
    ]
    return(
        <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-40px flex items-center gap-x-0.5'>
            {sections[0].map((item)=>(
                <ToolBarButtonn key={item.label} {...item} />
            ))}
 <Separator orientation="vertical" className='h-10 w-[2.5px] bg-black' />
{
     //todo_fonnt fammily
}
     <Separator orientation="vertical" className='h-6 w-px bg-red-500' />
  
 {sections[1].map((item)=>(
            <ToolBarButtonn key={item.label} {...item} />
 ))}
            
        
        </div>
    )
}

export default Toolbar; 