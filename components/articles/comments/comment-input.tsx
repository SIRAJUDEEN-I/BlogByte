import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const CommentInput = () => {
  
  return (
    <form action="" className="mb-8">
        <div className="flex gap-4">
            <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>CN</AvatarFallback>
                
            </Avatar>
            <div className='flex-1'>
              <Input type='text' name='body' placeholder='Add a Comment...'  />
              <div className='mt-4 flex justify-end'>
                <Button>Post comment</Button>
              </div>
            </div>
        </div>
    </form>
  )
}
export default CommentInput