import { Prisma } from "@/app/generated/prisma";
import { Avatar,AvatarFallback,AvatarImage } from "../ui/avatar";
import CommentsList from "./comments/comments-list";
import LikeButton from "./like-button";
import CommentInput from "./comments/comment-input";
import { prisma } from "@/lib/prisma";

type ArticleDetailsPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          emial: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailPage: React.FC<ArticleDetailsPageProps> = async ({ article }) => {

  const comments = await prisma.comment.findMany({
    where:{
      articleId:article.id
    },
    include:{
      author:{
        select:{
          name:true,
          email:true,
          imageUrl:true,
        }
      }
    }
  })
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className='mx-auto max-w-3xl'>
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
    <span className="rounded-full bg-primary/10 px-3 py-1 txt-sm text-primary">
    Web development
    </span>

        </div>
        <h1 className='text-4xl font-bold mb-4'>{article.title}</h1>

        <div className="flex items-center gap-4">
          <Avatar >
            <AvatarImage src={article.author.imageUrl || ""}/>
            <AvatarFallback  >CN</AvatarFallback>
          </Avatar>
          <div>
            <p className='font-medium'>{article.author.name}</p>
            <p className='text-sm'>{article.createdAt.toDateString()}</p>
          </div>
        </div>
      </header>
      <section className='pb-10'>
        {article.content}
      </section>
        <LikeButton/>
        <CommentInput articleId={article.id} />
        <CommentsList comments={comments} />

        </article>
      </main>
    </div>
  );
};
export default ArticleDetailPage;
