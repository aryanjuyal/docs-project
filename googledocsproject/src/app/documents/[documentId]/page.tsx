
import { use } from 'react';
import {Editor} from'./editor'
import {Toolbar} from './toolbar'

interface DocumentIdPageProps{
    params:Promise<{documentId:string}>

}

const DocumentIdPage=async({params}:DocumentIdPageProps)=>{
    const {documentId}=await params;
 

    return (
        <div className='minn-h-screen bg-white'>
      <Toolbar />
        <Editor />
        </div >
    )

}

export default DocumentIdPage;