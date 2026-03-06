"use client"
import { is } from 'date-fns/locale';
import {LucideIcon,Undo2Icon,Redo2Icon,PrinterIcon,SpellCheckIcon,BoldIcon,ItalicIcon,UnderlineIcon,MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDown,ChevronDownIcon, Heading1} from 'lucide-react'
import {cn} from '@/lib/utils'
import { useeditorStore } from '@/src/store/use-editor-store';
import {Separator}from '@/src/components/ui/separator'
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem} from '@/src/components/ui/dropdown-menu';
import {type Level} from '@tiptap/extension-heading'
interface ToolbarButtonProps{
onClick:()=>void;
icon:LucideIcon;
isActive?:boolean;
}

const HeadingLevelButton=()=>{
    const {editor}=useeditorStore()
    const headings=[
         {label:"Normal text", value:"normal" ,fontSize:"18px"},
        {label:"Heading 1", value:"h1" ,fontSize:"32px"},
        {label:"Heading 2", value:"h2" ,fontSize:"24px"},
        {label:"Heading 3", value:"h3" ,fontSize:"18px"},
    ]
    const  getCurrentHeading=()=>{
        if(editor?.isActive('paragraph')) return "normal"
        if(editor?.isActive('heading',{level:1})) return "h1"
        if(editor?.isActive('heading',{level:2})) return "h2"
        if(editor?.isActive('heading',{level:3})) return "h3"
        return "normal"
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='text-sm h-7 px-5 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80' >
                    <span className='truncate'>
                        {headings.find((heading)=>heading.value === getCurrentHeading())?.label || "Normal text"}
                    </span>
                    <ChevronDownIcon className='ml-2 size-4 shrink-0' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1 '>
                {headings.map(({label,value,fontSize})=>(
                <button key={value}
                style={{fontSize}}
                onClick={()=>{
                    if(value==='0'){
                    editor?.chain().focus().setParagraph().run() 
                }else{
                    editor?.chain().focus().toggleHeading({level:parseInt(value.replace('h','')) as Level}).run()
                }
                }}
                className={cn(
                    "cursor-pointer flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/800",
              (value==='0' && !editor?.isActive("heading") || editor?.isActive('heading',{level:value})&& 'bg-neutral-200/80')
                )}>
{label}
                </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


  

const FontFamilyButton=()=>{
const {editor}=useeditorStore()
const fonts=[
    {label:"Sans", value:"sans-serif"},
    {label:"Serif", value:"serif"},
    {label:"Mono", value:"monospace"},
    {label:"Arial", value:"Arial, Helvetica, sans-serif"},
];
return(
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className='text-sm h-7 px-5 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80' >
                <span className='truncate'>
                    {editor?.getAttributes('textStyle').fontFamily || "Arial"}
                </span>
                <ChevronDownIcon className='ml-2 size-4 shrink-0' />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-1 flex flex-col gap-y-1 '>
            {fonts.map((font)=>(
                <DropdownMenuItem key={font.value} onClick={()=>editor?.chain().focus().setFontFamily(font.value).run()} className='cursor-pointer flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/800' >
                    {font.label}    
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
     </DropdownMenu>
)


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
 <Separator orientation="vertical" className='h-10 w-px bg-black' />
{
     <FontFamilyButton />
},
<Separator orientation="vertical" className='h-6 w-px bg-red-500' />
     {
        <HeadingLevelButton />
        }
     
<Separator orientation="vertical" className='h-6 w-px bg-red-500' />
 {sections[1].map((item)=>(
            <ToolBarButtonn key={item.label} {...item} />
 ))}
            
        
        </div>
    )
}

export default Toolbar; 