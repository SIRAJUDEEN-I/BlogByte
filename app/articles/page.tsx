import { Button } from "@/components/ui/button"
import ArticleSearchInput from "@/components/articles/article-search-input"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { fetchArticleByQuery } from "@/lib/query/fetch-article-by-query"
import { Suspense } from "react"
import Link from "next/link"

import AllArticlePage from "@/components/articles/all-article-page"
import { ArrowBigLeftDashIcon } from "lucide-react"

type SearchParamsProps={
  searchParams:Promise<{search?:string,page?:string}>
}


const ITEMS_PER_PAGE = 3

const page:React.FC<SearchParamsProps> = async ({searchParams}) => {

  const searchText = (await searchParams).search || ""

 const currentPage = Number((await searchParams).page) || 1

 const skip = (currentPage -1 ) * ITEMS_PER_PAGE
 const take = ITEMS_PER_PAGE




  const {articles ,total}= await fetchArticleByQuery(searchText,skip,take)
 const totalPages = Math.ceil(total/ITEMS_PER_PAGE)
  return (
    <div className="min-h-screen bg-background">
        <main className='container mx-auto px-4 py-12 sm:px-6 lg:text-5xl'> 
          <Link href='/'>
          <ArrowBigLeftDashIcon />
          
          </Link>
            {/* header */}
            <div className='mb-12 space-y-6 text-center'>
                <h1 className='text-4xl font-bold sm:text-5xl'>All Articles</h1>

                {/* search bar */}

               
                <ArticleSearchInput />

                </div>

             

            {/* all Article cards */}



            {/* pagination */}

            <div className="mt-12 flex justify-center gap-2">
              <Link href={`?search=${searchText}&page=${currentPage-1}`} passHref>
              <Button  disabled={currentPage===1} variant={'ghost'}>← Prev</Button>
              </Link>
              {
                Array.from({length:totalPages}).map((_,index)=>(
                  <Link key={index}
                  href={`?search=${searchText}&page=${index + 1}`}>

                    <Button variant={`${currentPage === index+1 ? 'outline':'ghost'}`}>{index+1}</Button>
                  </Link>
                ))
              }
          
              <Link href={`?search=${searchText}&page=${currentPage+1}`} passHref>
              <Button disabled={currentPage===totalPages} variant={'ghost'}>Next →</Button>
              
              </Link>
            </div>
            <div className='pt-5'>
               <Suspense fallback={<AllArticlePageSkeleton/>}>
              <AllArticlePage articles={articles} />
               </Suspense>
            </div>
        </main>
    </div>
  )
}
export default page


export const AllArticlePageSkeleton  = () => {
  return(
     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

            {/* Article Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-lg" />

            {/* Article Category Skeleton */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

            {/* Author & Metadata Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Author Name Skeleton */}
                <Skeleton className="h-4 w-20 rounded-lg " />
              </div>

              {/* Date Skeleton */}
              <Skeleton className="h-4 w-24 rounded-lg " />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
 
}