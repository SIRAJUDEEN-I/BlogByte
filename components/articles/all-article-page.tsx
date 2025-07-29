'use client'
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Search, Calendar, User, FileText, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"


type AllArticlePageProps = {
    articles: Array<{
        id: string;
        title: string;
        content: string;
        category: string;
        featuredImage: string;
        authorId: string;
        createdAt: Date;
        author: {
            name: string;
            email: string;
            imageUrl: string | null;
        };
    }>
}
const AllArticlePage:React.FC<AllArticlePageProps> = ({articles}) => {

   
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const searchQuery = searchParams.get('search') || '';

    if(articles.length===0){
        return <NoSearchResultPage/>
    }


    // Helper function to get reading time estimate
    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    };

    // Helper function to format date
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

  return (
   <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
   {articles.map((article)=>(
    <Link 
                    key={article.id} 
                    href={`/articles/${article.id}?search=${searchQuery}&page=${currentPage}`}
                    className="group block"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">
                        {/* Featured Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image 
                                src={article.featuredImage} 
                                alt={article.title} 
                                fill 
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            
                            {/* Category Badge */}
                            <div className="absolute top-3 left-3">
                                <Badge className="px-2 py-1 text-xs font-medium border-0 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 backdrop-blur-sm capitalize">
                                    {article.category.replace('-', ' ')}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="p-6">
                            {/* Article Title */}
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {article.title}
                            </h3>

                            {/* Article Excerpt */}
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-4">
                                {article.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-3 mb-4 p-3 bg-zinc-50/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200/40 dark:border-zinc-700/40">
                                <Avatar className="h-8 w-8 ring-2 ring-zinc-200 dark:ring-zinc-700">
                                    <AvatarImage src={article.author.imageUrl || ''} />
                                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-xs">
                                        {article.author.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 font-medium text-sm">
                                        <User className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                                        <span className="truncate">{article.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
                                        <Calendar className="h-3 w-3" />
                                        <span>{formatDate(article.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Article Stats */}
                            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{getReadingTime(article.content)} min read</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>Article</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
))}
    </div>
  )
}
export default AllArticlePage


const NoSearchResultPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            {/* Icon Container */}
            <div className="mb-6 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                <Search className="h-12 w-12 text-zinc-400 dark:text-zinc-500" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                No Articles Found
            </h3>

            {/* Description */}
            <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-md leading-relaxed">
                We couldn&apos;t find any articles matching your search criteria. Try adjusting your search terms or browse our latest articles.
            </p>

            {/* Suggestions */}
            <div className="mt-8 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">
                    Search Tips:
                </h4>
                <ul className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                    <li>• Try different keywords</li>
                    <li>• Check your spelling</li>
                    <li>• Use more general terms</li>
                    <li>• Browse by category</li>
                </ul>
            </div>
        </div>
    )
}
