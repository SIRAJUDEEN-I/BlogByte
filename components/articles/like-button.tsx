'use client'
import { useOptimistic } from "react"
import { useTransition } from "react"
import { Button } from "../ui/button"
import {ThumbsUp,Share2, Bookmark} from 'lucide-react'



type LikeButton = {
  articleId:string,
  likes:Like[],
  isLiked:boolean
}
const LikeButton = () => {

  const [optimisticLike , setOptimisticLike] = useOptimistic(10)
  const [isPending,startTransition] = useTransition()

  const handleLikeDisLike = async({articleId})
  return (
    <div className="flex gap-4 mb-12 border-t pt-8">

        <form action="">
            <Button variant={'ghost'}>
                <ThumbsUp className="h-5 w-5"/>
                0
            </Button>
        </form>
         <Button variant={'ghost'}>
                <Bookmark className="h-5 w-5"/>
                0
            </Button>
             <Button variant={'ghost'}>
                <Share2
                 className="h-5 w-5"/>
                0
            </Button>
    </div>
  )
}
export default LikeButton