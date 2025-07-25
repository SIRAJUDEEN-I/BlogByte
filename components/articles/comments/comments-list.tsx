import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar"

const CommentsList = () => {
  return (
    <div className="space-y-8">
        <div className="flex gap-4">
            <Avatar className='h-10 w-10'>
                <AvatarImage src={' '}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <div className='mb-2'>
                    <span className="font-medium">comment author name</span>
                    <span className='text-sm ml-2'>12 feb
                    </span>
                </div>
                <p>Comment body</p>
            </div>
        </div>
    </div>
  )
}
export default CommentsList