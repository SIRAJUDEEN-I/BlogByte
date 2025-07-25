import { Card } from "../ui/card"
import Image from "next/image"
import { Avatar,AvatarImage,AvatarFallback } from "../ui/avatar"
const AllArticlePage = () => {
  return (
    <div className='grid gap-8 sm:grid-cols-2 lg:gris-cols-3'>
        <Card  className='group relative overflow-hidden translte-all hover:shadow-lg'>

            <div className='p-6'>
<div  className="relative mb-4 h-48 w-full overflow-hidden rounded-xl ">
    <Image src='https://picsum.photos/200' alt='' fill className='object-cover' />

</div>
<h3 className="text-xl font-semibold ">title</h3>
<p className="mt-2">web-devlopment</p>
<div className="mt-6 flex items-center justify-between">
    <div className="flex items-center gap-3">
        <Avatar>
            <AvatarImage  src=''/>
            <AvatarFallback className='text-sm'>C</AvatarFallback>

        </Avatar>

        
            <span className="text-sm">siraj</span>
    </div>
</div>
            </div>
        </Card>
    </div>
  )
}
export default AllArticlePage