import Link from "next/link"
import { Button } from "../../ui/button"
import SearchInput from "./search-input"
import ToggleMode from '@/components/home/header/toggle-mode'

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className=" flex h-16 items-center justify-between">
                
 {/* Left section */}
                
                    <div className="flex items-center gap-8 mr-3 ">
                        <Link href='/' className='flex items-center space-x-2'>
                       <span className='font-bold text-1xl sm:text-2xl md:text-2xl'>

                        <span className="bg-gradient-to-r from-purple-600 to bg-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Blog </span>
                        <span>Byte</span>
                       </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}

                    <div className='hidden md:flex items-center gap-4 mr-2'>
                        <Link href={'/Articles'} className='text-sm font-medium text-foreground transition-colors  hover:text-foreground'>Articles</Link>
                        
                        <Link href={'/tutorial'} className='text-sm font-medium text-foreground transition-colors  hover:text-foreground'>tutorial</Link>

                        <Link 
                         href={'/about'} className='text-sm font-medium text-foreground transition-colors  hover:text-foreground'>about</Link>

                        <Link href={'/dashboard'} className='text-sm font-medium text-foreground transition-colors  hover:text-foreground'>dashboard</Link>

                    </div>
                    {/* right section  */}
                    <div className="flex items-center gap-4 mr-2"> 
                     <SearchInput/>
                    <ToggleMode />

                    </div>
                    <div className=" md:flex items-center gap-2 hidden">
                        
                    <Button > Login</Button>
                    <Button> Sign up</Button>
                    </div>
                   
                </div>
            </div>

       

        </div>

   
  )
}
export default Navbar