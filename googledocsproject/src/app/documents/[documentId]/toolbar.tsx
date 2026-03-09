"use client"
import{ColorResult,CirclePicker, SketchPicker}  from 'react-color'
import { is } from 'date-fns/locale';
import {LucideIcon,Undo2Icon,Redo2Icon,PrinterIcon,SpellCheckIcon,BoldIcon,ItalicIcon,UnderlineIcon,MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDown,ChevronDownIcon, Heading1,HighlighterIcon, LinkIcon, Link2Icon, ImageIcon, Upload, UploadIcon, SearchIcon } from 'lucide-react'
import {cn} from '@/lib/utils'
import { useeditorStore } from '@/src/store/use-editor-store';
import {Separator}from '@/src/components/ui/separator'
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem} from '@/src/components/ui/dropdown-menu';
import {type Level} from '@tiptap/extension-heading'
import { useState } from 'react';
import { set } from 'date-fns';
import { Dialog, Input } from '@base-ui/react';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
interface ToolbarButtonProps{
onClick:()=>void;
icon:LucideIcon;
isActive?:boolean;
}
const ImageButton=()=>{
    const {editor}=useeditorStore()
    const[isdialogopen,setisdialogopen]=useState(false)
  const [imageurl,setimageurl]=useState("")
  const onChange=(src:string)=>{
    editor?.chain().focus().setImage({src}).run()
    
  }
  const onUpload=()=>{
    const input=document.createElement("input")
    input.type="file"
    input.accept="image/*"
    input.onchange=(e)=>{
        const file=(e.target as HTMLInputElement).files?.[0]
        if(file){
            const imageUrl=URL.createObjectURL(file)
            onChange(imageUrl)
        }
    }
    input.click()
  }
  const HandleImageUrlSubmit=()=>{
    if(imageurl){
        onChange(imageurl)
        setimageurl("")
        set
    }
  }
  return(
    <>
    <DropdownMenu >
        <DropdownMenuTrigger asChild>
            <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80' >
            <ImageIcon className='size-6' />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=''>
           <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className='size-4 mr-2' />
            Upload
           </DropdownMenuItem>
           <DropdownMenuItem onClick={()=>setisdialogopen(true)}>
            <SearchIcon className='size-4 mr-2' />
            Paste image url
           </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <Dialog open={isdialogopen} onOpenChange={setisdialogopen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Insert image url
                </DialogTitle>
            </DialogHeader>
           <Input placeholder='https://example.com/image.jpg' value={imageurl} onChange={(e)=>setimageurl(e.target.value)} />
          
                <Input placeholder='https://example.com/image.jpg' value={imageurl} onChange={(e)=>setimageurl(e.target.value)} 
                onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                        HandleImageUrlSubmit()
                    }
                }}/>  
                </DialogContent>
                <DialogFooter>
                    <button onClick={HandleImageUrlSubmit}>
                        Insert 
                    </button>
                </DialogFooter>
                </Dialog>
            
    </>
  )
}

const LinkButton=()=>{
    const {editor}=useeditorStore()
  const [value,setValue]=useState("")
  const onChange=(href:string)=>{
    editor?.chain().focus().extendMarkRange('link').setLink({href}).run()
    set
  }
  return(
    <DropdownMenu onOpenChange={(open)=> {
    if(open){
    setValue(editor?.getAttributes("link").href || "")
    }}}>
        <DropdownMenuTrigger asChild>
            <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80' >
            <Link2Icon className='size-6' />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5 flex items-center gap-x-2 '>
            <Input placeholder='https://example.com' 
            value={value}
             onChange={(e)=>setValue(e.target.value)}  />
             <button onClick={()=>onChange(value)} className='bg-black text-white rounded-sm px-3 py-1.5 text-sm' >
                Apply
             </button>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HighightColorButton=()=>{
    const {editor}=useeditorStore()
   const value=editor?.getAttributes('highlight').color || "#FFFF"
    const onChange=(color:ColorResult)=>{
editor?.chain().focus().setHighlight({color:color.hex}).run()
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                         <button className='text-sm h-7 flex-col px-5 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80' >
                         <HighlighterIcon className='size-4' />
                         </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                <SketchPicker
                color={value}
                 onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
    

}

const TextColorButton=()=>{
    const {editor}=useeditorStore()
    const value=editor?.getAttributes('textStyle').color
    const onChange=(color:ColorResult)=>{
editor?.chain().focus().setColor(color.hex).run()
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                         <button className='text-sm h-7 flex-col px-5 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80' >
                         <span className='text-lg'>
A
                         </span>
                         <div className='h-0.5 w-full' style={{backgroundColor:value}}/>
                         </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex flex-col gap-y-1 '>
                <CirclePicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
    

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
        },
     
<Separator orientation="vertical" className='h-6 w-px bg-red-500' />
{
    <TextColorButton />
}
     
<Separator orientation="vertical" className='h-6 w-px bg-red-500' />
{
    <HighightColorButton />
}
{
    <LinkButton />

}
{
    <ImageButton />
}
<Separator orientation="vertical" className='h-6 w-px bg-red-500' />
 {sections[1].map((item)=>(
            <ToolBarButtonn key={item.label} {...item} />
 ))}
            
        
        </div>
    )
}

export default Toolbar; 