import { Button } from "@/components/ui/button"
import ArticleSearchInput from "@/components/articles/article-search-input"

import AllArticlePage from "@/components/articles/all-article-page"

const page = () => {
  return (
    <div className="min-h-screen bg-background">
        <main className='container mx-auto px-4 py-12 sm:px-6 lg:text-5xl'> 
            {/* header */}
            <div className='mb-12 space-y-6 text-center'>
                <h1 className='text-4xl font-bold sm:text-5xl'>All Articles</h1>

                {/* search bar */}
                <ArticleSearchInput />
            </div>

            {/* all Article cards */}



            {/* pagination */}

            <div className="mt-12 flex justify-center gap-2">
              <Button variant={'ghost'}>← Prev</Button>
              <Button variant={'ghost'}>1</Button>
              <Button variant={'ghost'}>2</Button>
              <Button variant={'ghost'}>3</Button>
              <Button variant={'ghost'}>Next →</Button>
            </div>
            <div className='pt-5'>
              <AllArticlePage />
            </div>
        </main>
    </div>
  )
}
export default page