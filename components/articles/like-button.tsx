import { Button } from "../ui/button"
import {ThumbsUp,Share2, Bookmark} from 'lucide-react'
const LikeButton = () => {
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