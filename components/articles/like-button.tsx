'use client'
import { useOptimistic } from "react"
import { useTransition } from "react"
import { Button } from "../ui/button"
import { Heart } from 'lucide-react'
import { likeDislikeToggle } from "@/actions/like-dislike"

type LikeButtonProps = {
  articleId: string,
  likes: Array<{
    id: string;
    isLiked: boolean;
    userId: string;
    articleId: string;
    createdAt: Date;
  }>,
  isLiked: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({ articleId, likes, isLiked }) => {
  const [optimisticLike, setOptimisticLike] = useOptimistic(likes.length)
  const [isPending, startTransition] = useTransition()

  const handleLikeDisLike = async () => {
    startTransition(async () => {
      setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1)
      await likeDislikeToggle(articleId)
    })
  }

  return (
    <form action={handleLikeDisLike}>
      <Button 
        disabled={isPending} 
        variant="ghost" 
        size="sm"
        className={`h-8 px-3 gap-1.5 transition-colors duration-200 ${
          isLiked 
            ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300' 
            : 'text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400'
        }`}
        title={isLiked ? "Unlike article" : "Like article"}
      >
        <Heart 
          className={`h-4 w-4 transition-all duration-200 ${
            isLiked ? 'fill-current' : ''
          }`} 
        />
        <span className="text-sm font-medium">{optimisticLike}</span>
      </Button>
    </form>
  )
}

export default LikeButton