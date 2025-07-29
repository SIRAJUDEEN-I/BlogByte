'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createComment } from "@/actions/create-comment"
import { useActionState } from "react"
import { useUser, SignInButton } from "@clerk/nextjs"

type CommentInputProps = {
  articleId: string
}

const CommentInput: React.FC<CommentInputProps> = ({ articleId }) => {
  const { user } = useUser();
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, articleId),
    { errors: {} }
  )

  // Get user's display name and first letter for fallback
  const getUserDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`;
    if (user?.firstName) return user.firstName;
    if (user?.username) return user.username;
    return "Anonymous";
  };

  const getFirstLetter = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  if (!user) {
    return (
      <div className="mb-8 p-4 border border-gray-200 rounded-lg text-center">
        <p className="text-muted-foreground mb-2">Please sign in to leave a comment</p>
        <SignInButton mode="modal">
          <Button variant="outline">Sign In</Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <form action={action} className="mb-8">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={user?.imageUrl || ''} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getFirstLetter()}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <Input 
            type='text' 
            name='body' 
            placeholder={`Add a comment as ${getUserDisplayName()}...`}
            disabled={isPending}
          />
          {formState.errors.body && (
            <p className='text-red-600 text-sm mt-1'>
              {formState.errors.body}
            </p>
          )}
          <div className='mt-4 flex justify-end'>
            <Button 
              type="submit"
              disabled={isPending}
              className={`${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPending ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
          {formState.errors.formErrors && (
            <div className="mt-2 p-3 border border-red-300 bg-red-50 text-red-700 rounded-md">
              {formState.errors.formErrors[0]}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

export default CommentInput