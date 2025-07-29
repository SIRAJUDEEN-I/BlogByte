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
import { Edit, Trash2, MessageCircle, Calendar, PlusCircle, FileText, Eye } from "lucide-react";

type AllArticlesProps = {
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

const AllArticles: React.FC<AllArticlesProps> = ({ articles }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50/30 to-gray-50/30 dark:from-zinc-950/30 dark:to-gray-950/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                All Articles
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Manage all your published articles
              </p>
            </div>
            <Link href="/dashboard/articles/create">
              <Button className="gap-2 shadow-sm hover:shadow-md transition-shadow duration-200 bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="h-4 w-4" />
                New Article
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm">
          <CardHeader className="border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-800/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                Your Articles ({articles.length})
              </CardTitle>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Total: {articles.length} articles
              </div>
            </div>
          </CardHeader>

          {!articles.length ? (
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-6 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6">
                  <FileText className="h-12 w-12 text-zinc-400 dark:text-zinc-500" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  No articles found
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-6 max-w-md">
                  You havent created any articles yet. Start sharing your thoughts with the world!
                </p>
                <Link href="/dashboard/articles/create">
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <PlusCircle className="h-4 w-4" />
                    Create Your First Article
                  </Button>
                </Link>
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-zinc-200/50 dark:border-zinc-800/50">
                      <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 px-6 w-[40%]">
                        Title
                      </TableHead>
                      <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 w-[15%]">
                        Category
                      </TableHead>
                      <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 w-[10%]">
                        Status
                      </TableHead>
                      <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 w-[10%]">
                        Comments
                      </TableHead>
                      <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 w-[15%]">
                        Date
                      </TableHead>
                      <TableHead className="text-zinc-600 dark:text-zinc-400 font-medium py-4 pr-6 w-[10%]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {articles.map((article) => (
                      <TableRow 
                        key={article.id}
                        className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-150"
                      >
                        <TableCell className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2">
                              {article.title}
                            </div>
                            <div className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {article.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-4">
                          <Badge 
                            variant="secondary"
                            className="px-2 py-1 text-xs font-medium border-0 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 capitalize"
                          >
                            {article.category.replace('-', ' ')}
                          </Badge>
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
                            {/* View Button */}
                            <Link href={`/articles/${article.id}`}>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-600 dark:hover:text-green-400"
                                title="View article"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span className="sr-only">View article</span>
                              </Button>
                            </Link>
                            
                            {/* Edit Button */}
                            <Link href={`/dashboard/articles/${article.id}/edit`}>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400"
                                title="Edit article"
                              >
                                <Edit className="h-3.5 w-3.5" />
                                <span className="sr-only">Edit article</span>
                              </Button>
                            </Link>
                            
                            {/* Delete Button */}
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
      </div>
    </div>
  );
};

export default AllArticles;

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
        title="Delete article"
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