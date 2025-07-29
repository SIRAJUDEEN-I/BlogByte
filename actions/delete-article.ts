'use server'


import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export const deleteArticle = async (articleId: string) => {
    // ✅ Check authentication
    const { userId } = await auth()
    
    if (!userId) {
        throw new Error("You must be logged in to delete articles")
    }

    // ✅ Find the user in database
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    })

    if (!user) {
        throw new Error("User not found")
    }

    // ✅ Check if article exists and belongs to user
    const article = await prisma.articles.findUnique({
        where: { id: articleId }
    })

    if (!article) {
        throw new Error("Article not found")
    }

    if (article.authorId !== user.id) {
        throw new Error("You can only delete your own articles")
    }

    // ✅ Now safe to delete
    await prisma.articles.delete({
        where: { id: articleId }
    })

    revalidatePath('/dashboard')
}