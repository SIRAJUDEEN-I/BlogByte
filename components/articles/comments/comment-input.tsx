'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "../../ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createComment } from "@/actions/create-comment"
import { useActionState } from "react"
import { useUser, SignInButton } from "@clerk/nextjs"
import { MessageCircle, Send, User } from "lucide-react"

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
      <Card className="border-zinc-200/60 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">
        <div className="p-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-zinc-600 dark:text-zinc-400">
              Sign in to join the conversation
            </span>
            <SignInButton mode="modal">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/60 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm">
      <div className="p-4">
        <form action={action} className="space-y-3">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-zinc-200 dark:ring-zinc-700 flex-shrink-0 mt-0.5">
              <AvatarImage src={user?.imageUrl || ''} />
              <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-xs">
                {getFirstLetter()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              {/* Comment Textarea */}
              <div className="space-y-1">
                <Textarea 
                  name='body' 
                  placeholder={`What are your thoughts, ${getUserDisplayName().split(' ')[0]}?`}
                  disabled={isPending}
                  className="min-h-[80px] resize-none border-zinc-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/50 focus:border-blue-300 dark:focus:border-blue-600 focus:ring-blue-200/20 dark:focus:ring-blue-800/20 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-sm"
                  rows={3}
                />
                {formState.errors.body && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {formState.errors.body}
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={isPending}
                  size="sm"
                  className="gap-1.5 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Comment
                    </>
                  )}
                </Button>
              </div>
              
              {/* Form Errors */}
              {formState.errors.formErrors && (
                <div className="border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-xs">
                      {formState.errors.formErrors[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default CommentInput