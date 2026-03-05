'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import { Table } from 'lucide-react'
import { TableKit } from '@tiptap/extension-table'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Underline from '@tiptap/extension-underline'

import {useeditorStore}  from '@/src/store/use-editor-store'
import { set } from 'date-fns'
 

export const Editor=()=>{ 
  const   {setEditor}=useeditorStore()
    const editor = useEditor({
      onCreate({editor}){
setEditor(editor)
      },
      onDestroy(){
setEditor(null)
      },
      onUpdate({editor}){
setEditor(editor)
      },
         onSelectionUpdate({editor}){
setEditor(editor)
      },
         onTransaction({editor}){
setEditor(editor)
      },
         onFocus({editor}){
setEditor(editor)
      },
         onBlur({editor}){
setEditor(editor)
      },
         onContentError({editor}){
setEditor(editor)
      },
      editorProps:{
        attributes:{
          style:"padding-left:56px padding-right:56px",
          class:'focus:outline-none print:border-0 bg-white boorder border-[#C7C7C7] flex-flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text'
        },
      },
    extensions: [StarterKit,
        TableKit.configure({
        table: { resizable: true },
      }), 
      Underline,   
TaskList, 
Image,
ImageResize,
   TaskItem.configure({
    nested: true,
  })],
      content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,

    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })
  return(

    <div className='size-full overflow-x-auto bg-black px-4 print:p-0 print:bg-white print:overflow-visible'>
      <div className='min-w-max flex justify-center w[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'> <EditorContent editor={editor} /></div> 
    </div>
     )

}
export default Editor;