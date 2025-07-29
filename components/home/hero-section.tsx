import { Button } from "../ui/button"
import Link from "next/link"
import TextGenerateEffect from '@/components/ui/typewriter';
import GradientTypeWriter from "../ui/gradienttypewriter.tsx";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br  h-screen  from-purple-950 via-indigo-950 to-indigo-950">

    <div>

        <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl">


      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32">

        <div className="flex-1 space-y-8  text-left sm:text-center  ">

          <div className="mb-10 mt-10 flex-row md:flex-none  items-center justify-center relative">

        <TextGenerateEffect words={'Explore the world through '} className=" text-4xl   font-bold tracking-tight text-white sm:text-5xl md:text-6xl"  />
 
        <GradientTypeWriter words={' words'} className="pl-2  bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent text-4xl  font-bold tracking-tight sm:text-5xl md:text-6xl"  />
          
          </div>

            <p className="text-center mx-auto  max-w-2xl text-lg text-gray-300 md:text-xl">
              Discover insigthfull articles, throught-provoking stories, and expert perespectives on technology, lifestyle and innovation
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center pt-10">
              <Link href={'/articles'}>
              
              <Button className='rounded-full'>Start Reading</Button>
              </Link>
             

            </div>

            <div className=" grid grid-cols-3 gap-4 ml-5 md:mx-w-md sm:mt-50">
              <div className="space-y-2">
                <div className="  text-2xl font-bold text-white">
                  1K+
                </div>
                <div className="text-sm text-gray-300">Published articles</div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  50+
                </div>
                <div className="text-sm text-gray-300">Expert writers</div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  10M
                </div>
                <div className="text-sm text-gray-300">Montly Readers</div>
              </div>



            </div>
        </div>
     
      
      </div>


        </div>
    </div>


    </section>
  )
}
export default HeroSection