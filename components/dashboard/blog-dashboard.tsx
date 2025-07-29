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
    <main className="flex-1 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your content and view your analytics
          </p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Quick Stats - Only for current user */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div> 
            <p className="text-xs text-muted-foreground mt-1">
              Articles you have published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Comments Received
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Comments on your articles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Likes Received
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Likes on your articles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles - Only current user's articles */}
      <RecentArticles articles={articles} />
    </main>
  );
}