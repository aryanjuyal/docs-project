import {Button} from '../components/ui/button'
import Link from 'next/link'

const home=()=>{
  return(
    <div className="bg-white dark:bg-black min-h-screen ">
      <h1 className="text-3xl font-bold text-center">Welcome to the Home Page</h1>
      <Button className='flex mx-auto mt-4' variant='outline'>
        click me 
      </Button>
      <Link href="/documents/123"><span>click here</span></Link>
    </div>
  )
}
export default home;