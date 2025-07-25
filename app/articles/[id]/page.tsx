import { prisma } from "@/lib/prisma"
import ArticleDetailPage from "@/components/articles/article-detail-page"

type ArticleDetailsPageProps = {
    params: Promise<{id:string}>
}


const page:React.FC<ArticleDetailsPageProps> = async({params}) => {

    const id = ( await params).id

    const article = await prisma.articles.findUnique({
        where:{id},
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    imageUrl:true,
                },
            },
        },
    })

    if(!article){
        return <h1>Article Not Found</h1>
    }

    
  return (
    <div>
        <ArticleDetailPage article={article} />
    </div>
  )
}
export default page