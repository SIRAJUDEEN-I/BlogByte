import { FileText, MessageCircle, PlusCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RecentArticles from "./recent-articles";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export async function BlogDashboard() {
  // Get the current logged-in user
  const user = await currentUser();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">Please sign in to access your dashboard.</p>
      </div>
    );
  }

  // Get the database user record
  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">User not found. Please contact support.</p>
      </div>
    );
  }

  // Only fetch articles, comments, and likes for the current user
  const [articles, totalComments, totalLikes] = await Promise.all([
    // Get only current user's articles
    prisma.articles.findMany({
      where: {
        authorId: dbUser.id, // Filter by current user only
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true
          }
        }
      }
    }),
    // Count comments only on current user's articles
    prisma.comment.count({
      where: {
        article: {
          authorId: dbUser.id,
        }
      }
    }),
    // Count likes only on current user's articles
    prisma.like.count({
      where: {
        article: {
          authorId: dbUser.id,
        }
      }
    })
  ]);

  return (
    <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-zinc-50/30 to-gray-50/30 dark:from-zinc-950/30 dark:to-gray-950/30 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your content and view your analytics
          </p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="gap-2 shadow-sm hover:shadow-md transition-shadow duration-200">
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Quick Stats - Only for current user */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:border-zinc-300/80 dark:hover:border-zinc-700/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Your Articles
            </CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{articles.length}</div> 
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Articles you have published
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:border-zinc-300/80 dark:hover:border-zinc-700/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Comments Received
            </CardTitle>
            <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalComments}</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Comments on your articles
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:border-zinc-300/80 dark:hover:border-zinc-700/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Likes Received
            </CardTitle>
            <div className="p-2 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalLikes}</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Likes on your articles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles - Only current user's articles */}
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-lg p-6 shadow-sm">
        <RecentArticles articles={articles} />
      </div>
    </main>
  );
}