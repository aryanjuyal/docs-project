import {Button} from '../components/ui/button'

const home=()=>{
  return(
    <div className="bg-white dark:bg-black min-h-screen ">
      <h1 className="text-3xl font-bold text-center">Welcome to the Home Page</h1>
      <Button className='flex mx-auto mt-4' variant='outline'>
        click me 
      </Button>
    </div>
  )
}
export default home;