"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function deleteArticle(articleId: string) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    // Delete the article
    await prisma.articles.delete({
      where: {
        id: articleId,
      },
    });

    revalidatePath("/dashboard/articles");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting article:", error);
    throw new Error("Failed to delete article");
  }
}