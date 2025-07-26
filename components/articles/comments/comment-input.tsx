'use client'

import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createComment } from "@/actions/create-comment"
import { useActionState } from "react"


type CommentInputProps={
  articleId:string
}
const CommentInput:React.FC<CommentInputProps> = ({articleId}) => {
    const [formState,action,isPending] = useActionState(createComment.bind(null,articleId),
    {errors:{}}
  )

  return (
    <form action={action} className="mb-8">
        <div className="flex gap-4">
            <Avatar>
                <AvatarImage src='' />
                <AvatarFallback>CN</AvatarFallback>
                
            </Avatar>
            <div className='flex-1'>
              <Input type='text' name='body' placeholder='Add a Comment...'  />
              {formState.errors.body && (
                <p className='text-red-600 text-sm'>{
                  formState.errors.body
                }</p>
              )}
              <div className='mt-4 flex justify-end'>
                <Button className={`${isPending ? 'disabled' : '' }`}>{`${isPending?'posting...':'post comment'}`}</Button>
              </div>
              {
                formState.errors.formErrors && 
                (
                  <div className="p-2 border border-red-600 bg-red-100">
                    {formState.errors.formErrors[0]}
                  </div>
                )
              }
            </div>
        </div>
    </form>
  )
}
export default CommentInput