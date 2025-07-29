'use client'
import {Search} from 'lucide-react'
import {Input} from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { searchAction } from '@/actions/search'

const SearchInput = () => {
  
  const searchParams = useSearchParams()
 

  return (
    
    <form action={searchAction}>
<div className='relative'>

<Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' /> 
<Input type="text" name='search' placeholder='search'
defaultValue={searchParams.get('search') || ""}  className='pl-10  md:w-48 rounded-2xl focus-visible:ring-0 border-zinc-600 focus:scale-102'/>

</div>

    </form>
  )
}
export default SearchInput