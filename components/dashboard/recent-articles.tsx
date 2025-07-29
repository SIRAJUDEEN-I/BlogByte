'use client'

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useTransition } from "react";
import { deleteArticle } from "@/actions/delete-article";
import { Edit, Trash2, MessageCircle, Calendar } from "lucide-react";

type RecentArticlesprops = {
  articles: Array<{
    id: string;
    title: string;
    content: string;
    category: string;
    featuredImage: string;
    authorId: string;
    createdAt: Date;
    comments: Array<{
      id: string;
      body: string;
      createdAt: Date;
    }>;
    author: {
      name: string;
      email: string;
      imageUrl: string | null;
    };
  }>
};

const RecentArticles: React.FC<RecentArticlesprops> = ({ articles }) => {
  return (
    <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm">
      <CardHeader className="border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-800/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            Recent Articles
          </CardTitle>
          <Button
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 border-zinc-200/60 dark:border-zinc-700/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            size={"sm"}
            variant={"ghost"}
          >
            View All →
          </Button>
        </div>
      </CardHeader>

      {!articles.length ? (
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">No articles found</p>
            <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
              Create your first article to get started
            </p>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-zinc-200/50 dark:border-zinc-800/50">
                  <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 px-6">Title</TableHead>
                  <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4">Status</TableHead>
                  <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4">Comments</TableHead>
                  <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4">Date</TableHead>
                  <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {articles.slice(0, 5).map((article) => (
                  <TableRow 
                    key={article.id}
                    className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-150"
                  >
                    <TableCell className="font-medium text-zinc-900 dark:text-zinc-100 py-4 px-6">
                      <div className="max-w-[300px] truncate">{article.title}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className="px-3 py-1 rounded-full text-xs font-medium border-0 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 shadow-sm">
                        Published
                      </Badge> 
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span className="text-sm font-medium">{article.comments.length}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-zinc-600 dark:text-zinc-400 text-sm">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <div className="flex gap-1">
                        <Link href={`/dashboard/articles/${article.id}/edit`}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            <span className="sr-only">Edit article</span>
                          </Button>
                        </Link>
                        <DeleteButton articleId={article.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition()
  
  return (
    <form action={() => {
      startTransition(async () => {
        await deleteArticle(articleId)
      })
    }}>
      <Button 
        disabled={isPending} 
        variant="ghost" 
        size="sm"
        className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50"
      >
        {isPending ? (
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Trash2 className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">
          {isPending ? 'Deleting article...' : 'Delete article'}
        </span>
      </Button>
    </form>
  );
};
