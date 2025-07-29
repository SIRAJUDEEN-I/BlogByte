import { prisma } from "@/lib/prisma"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Calendar, MessageCircle, Clock } from "lucide-react";

const TopArticles = async () => {
  const articles = await prisma.articles.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        }
      }
    }
  })

  // Helper function to get reading time estimate
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <div className="grid my-5 mx-3 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 3).map((article) => (
        <Card
          key={article.id}
          className="group relative overflow-hidden transition-all hover:scale-[1.02] border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
        >
          <div className="p-6">
            <Link href={`/articles/${article.id}`}>
              {/* Featured Image */}
              <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl'>
                <Image 
                  src={article.featuredImage as string}
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="px-2 py-1 text-xs font-medium border-0 bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 backdrop-blur-sm capitalize">
                    {article.category.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-xs">
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{article.author.name}</span>
              </div>

              {/* Article Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {article.title}
              </h3>

              {/* Article Stats */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{getReadingTime(article.content)} min</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>{article.comments.length}</span>
                </div>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default TopArticles