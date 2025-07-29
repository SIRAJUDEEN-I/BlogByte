import { Button } from "@/components/ui/button"
import ArticleSearchInput from "@/components/articles/article-search-input"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { fetchArticleByQuery } from "@/lib/query/fetch-article-by-query"
import { Suspense } from "react"
import Link from "next/link"
import AllArticlePage from "@/components/articles/all-article-page"
import { ArrowLeft, BookOpen, Search } from "lucide-react"

type SearchParamsProps = {
  searchParams: Promise<{ search?: string, page?: string }>
}

const ITEMS_PER_PAGE = 3

const page: React.FC<SearchParamsProps> = async ({ searchParams }) => {
  const searchText = (await searchParams).search || ""
  const currentPage = Number((await searchParams).page) || 1
  const skip = (currentPage - 1) * ITEMS_PER_PAGE
  const take = ITEMS_PER_PAGE

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50/30 to-gray-50/30 dark:from-zinc-950/30 dark:to-gray-950/30">
      <main className='container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl'>
        {/* Back Button */}
        <div className="mb-8">
          <Link href='/'>
            <Button
              variant="outline"
              className="gap-2 border-zinc-200/60 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className='mb-12 text-center'>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100'>
              All Articles
            </h1>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of writers
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <ArticleSearchInput />
          </div>

          {/* Results Summary */}
          {searchText && (
            <div className="mt-6 p-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/60 rounded-lg inline-flex items-center gap-2">
              <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-zinc-700 dark:text-zinc-300">
                {total} results for <span className="font-medium">{searchText}</span>
              </span>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        <div className='mb-12'>
          <Suspense fallback={<AllArticlePageSkeleton />}>
            <AllArticlePage articles={articles} />
          </Suspense>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 p-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/60 rounded-lg">
              <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
                <Button
                  disabled={currentPage === 1}
                  variant="ghost"
                  size="sm"
                  className="gap-2 disabled:opacity-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous
                </Button>
              </Link>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = currentPage === pageNumber;

                  // Show first page, last page, current page, and pages around current
                  const showPage = pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(pageNumber - currentPage) <= 1;

                  if (!showPage) {
                    // Show ellipsis
                    if (pageNumber === 2 && currentPage > 4) {
                      return <span key={index} className="px-2 text-zinc-400">...</span>;
                    }
                    if (pageNumber === totalPages - 1 && currentPage < totalPages - 3) {
                      return <span key={index} className="px-2 text-zinc-400">...</span>;
                    }
                    return null;
                  }

                  return (
                    <Link key={index} href={`?search=${searchText}&page=${pageNumber}`}>
                      <Button
                        variant={isCurrentPage ? 'default' : 'ghost'}
                        size="sm"
                        className={`w-8 h-8 p-0 ${
                          isCurrentPage
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {pageNumber}
                      </Button>
                    </Link>
                  );
                })}
              </div>

              <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
                <Button
                  disabled={currentPage === totalPages}
                  variant="ghost"
                  size="sm"
                  className="gap-2 disabled:opacity-50"
                >
                  Next
                  <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default page

export const AllArticlePageSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="h-full overflow-hidden border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 w-full">
            <Skeleton className="h-full w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800" />
          </div>

          <div className="p-6">
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-3/4 mb-3 bg-zinc-200 dark:bg-zinc-700" />

            {/* Content Skeleton */}
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* Author Info Skeleton */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-zinc-50/50 dark:bg-zinc-800/50 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700" />
                <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700" />
              <Skeleton className="h-3 w-12 bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}