import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import CommentsList from "./comments/comments-list";
import LikeButton from "./like-button";
import CommentInput from "./comments/comment-input";
import ShareButton from "@/components/articles/share-button";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Calendar, User, MessageCircle } from "lucide-react";
import Link from "next/link";

type ArticleDetailsPageProps = {
  article: {
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
  };
  urlParams?: {
    page?: string;
    search?: string;
  };
};

const ArticleDetailPage: React.FC<ArticleDetailsPageProps> = async ({ article, urlParams }) => {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const { userId } = await auth();

  const likes = await prisma.like.findMany({
    where: { articleId: article.id },
  });

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId as string,
    },
  });

  const isLiked: boolean = likes.some((like) => like.userId === user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50/30 to-gray-50/30 dark:from-zinc-950/30 dark:to-gray-950/30">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/articles?search=${urlParams?.search || ''}&page=${urlParams?.page || '1'}`}>
            <Button 
              variant="outline" 
              className="gap-2 border-zinc-200/60 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>

        {/* Main Article Content - Full Width */}
        <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm overflow-hidden mb-8">
          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Article Header */}
          <div className="p-8 lg:p-12">
            <header className="mb-8">
              {/* Category Badge */}
              <div className="mb-4">
                <Badge className="px-3 py-1 text-sm font-medium border-0 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 capitalize">
                  {article.category.replace('-', ' ')}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-3xl xl:text-5xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-10">
                {article.title}
              </h1>
            </header>

            {/* Article Content - Centered with max width */}
            <div className="max-w-4xl mx-auto">
              <section 
                dangerouslySetInnerHTML={{ __html: article.content }} 
                className="prose prose-xl max-w-none dark:prose-invert
                           prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
                           prose-p:text-zinc-800 dark:prose-p:text-zinc-200
                           prose-p:leading-relaxed prose-p:text-lg
                           prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
                           prose-ul:text-zinc-800 dark:prose-ul:text-zinc-200
                           prose-ol:text-zinc-800 dark:prose-ol:text-zinc-200
                           prose-li:text-zinc-800 dark:prose-li:text-zinc-200
                           prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300
                           prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-600
                           prose-code:text-zinc-900 dark:prose-code:text-zinc-100
                           prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800
                           prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800
                           prose-img:rounded-lg prose-img:shadow-sm
                           prose-a:text-blue-600 dark:prose-a:text-blue-400
                           prose-a:no-underline hover:prose-a:underline"
              />
            </div>
          </div>
        </Card>

        {/* Author Info & Interaction Card - Between Content and Comments */}
        <Card className="h-40 border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm mb-8">
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Author Info - Smaller */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-zinc-200 dark:ring-zinc-700">
                    <AvatarImage src={article.author.imageUrl || ""} />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-sm">
                      {article.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                      <User className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="text-sm">{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs">
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats & Actions - Smaller */}
                <div className="flex items-center gap-4">
                 
                  <div className="flex items-center gap-1.5">
                    <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />
                    <ShareButton/>
                  
                     
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Section - Full Width */}
        <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm">
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Comments ({comments.length})
              </h3>
            </div>
            
            {/* Comments content centered with max width */}
            <div className="max-w-4xl mx-auto space-y-6">
              <CommentInput articleId={article.id} />
              <CommentsList comments={comments} />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
