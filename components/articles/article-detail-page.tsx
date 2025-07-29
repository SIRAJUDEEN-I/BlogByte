import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CommentsList from "./comments/comments-list";
import LikeButton from "./like-button";
import CommentInput from "./comments/comment-input";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
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
};

const ArticleDetailPage: React.FC<ArticleDetailsPageProps> = async ({ article }) => {
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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/articles">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Button>
          </Link>
        </div>

        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={article.author.imageUrl || ""} />
                <AvatarFallback>
                  {article.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {article.createdAt.toDateString()}
                </p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <section 
            dangerouslySetInnerHTML={{ __html: article.content }} 
            className="prose prose-lg max-w-none dark:prose-invert pb-10
                       prose-headings:text-foreground 
                       prose-p:text-foreground 
                       prose-strong:text-foreground
                       prose-ul:text-foreground
                       prose-ol:text-foreground
                       prose-li:text-foreground
                       prose-blockquote:text-foreground"
          />

          {/* Like Button */}
          <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />
          
          {/* Comments Section */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
            <CommentInput articleId={article.id} />
            <CommentsList comments={comments} />
          </div>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
