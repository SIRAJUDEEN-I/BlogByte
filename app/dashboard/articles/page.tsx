import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import AllArticles from "@/components/dashboard/all-articles";
import { redirect } from "next/navigation";

export default async function DashboardArticlesPage() {
  // Get the current logged-in user
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  // Get the database user record
  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) {
    redirect("/sign-in");
  }

  // Get all articles for the current user
  const articles = await prisma.articles.findMany({
    where: {
      authorId: dbUser.id,
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
  });

  return <AllArticles articles={articles} />;
}