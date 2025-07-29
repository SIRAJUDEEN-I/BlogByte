import HeroSection from '@/components/home/hero-section'
import TopArticles from '@/components/home/top-articles'
import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AllArticlePageSkeleton } from '../articles/page'
import { ArrowRight, Sparkles } from 'lucide-react'

const Home = () => {
  return (
    <main> 
        <HeroSection />
        <section className='relative py-16 md:py-24 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-950/50'>
          <div className='container mx-auto px-4 max-w-7xl'>
            {/* Section Header */}
            <div className='mb-16 text-center'>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                  Featured Content
                </span>
              </div>
              <h2 className='text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl lg:text-5xl mb-4'>
                Latest Articles
              </h2>
              <p className='text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed'>
                Discover insights, tutorials, and stories from our community of writers and developers
              </p>
            </div>

            {/* Articles Grid */}
            <Suspense fallback={<AllArticlePageSkeleton/>}>
              <TopArticles />
            </Suspense>

            {/* View All Articles Button */}
            <div className='mt-16 text-center'>
              <Link href={'/articles'}>
                <Button 
                  size="lg"
                  className="gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-xl"
                >
                  View All Articles
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              {/* Additional Info */}
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                Explore our complete collection of articles and tutorials
              </p>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
          </div>
        </section>
    </main>
  )
}

export default Home