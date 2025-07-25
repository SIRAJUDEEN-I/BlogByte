import HeroSection from '@/components/home/hero-section'
import TopArticles from '@/components/home/top-articles'
import { Suspense } from 'react'
import Link from 'next/link'
import { Button
  
 } from '@/components/ui/button'
const Home = () => {
  return (
    <main> 
        <HeroSection />
        <section className='relative py-16 md:py-24'>

          <div className='container mx-auto px-4'>
            <div className='mb-12 text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'> Featured Articles</h2>
              <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>Discover our most popular and trending content</p>

            </div>
            <Suspense fallback={<h1>Loading...</h1>}>
            
        <TopArticles />
            </Suspense>
            <div className='mt-12 text-center'>
              <Link href={'/articles'}>
              <Button>
                View all Articles
                </Button>
                </Link>
            </div>
          </div>
        </section>
    </main>
  )
}
export default Home