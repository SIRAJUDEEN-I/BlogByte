import EditArticlePage from "@/components/articles/edit-article-page"
import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

type EditArticleParams = {
    params: Promise<{id: string}>
}

const page: React.FC<EditArticleParams> = async ({params}) => {
    // ✅ Check authentication
    const user = await currentUser();
    
    if (!user) {
        redirect('/sign-in');
    }

    // ✅ Find database user
    const dbUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id },
    });

    if (!dbUser) {
        return <h1>User not found</h1>;
    }

    const id = (await params).id
    const article = await prisma.articles.findUnique({
        where: { id }
    })
    
    if (!article) {
        return <h1>Article not found</h1>
    }

    // ✅ Check ownership
    if (article.authorId !== dbUser.id) {
        return (
            <div className="flex items-center justify-center h-64">
                <h1 className="text-xl text-red-500">You can only edit your own articles</h1>
            </div>
        )
    }

    return (
        <div>
            <EditArticlePage article={article} />
        </div>
    )
}

export default page