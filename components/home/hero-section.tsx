'use client'

import Link from "next/link"
import GradientTypeWriter from "../ui/gradienttypewriter.tsx";
import { AnimatedNumber } from "../motion-primitives/animated-number";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [value3, setValue3] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value1, setValue1] = useState(0);

  useEffect(() => {
    setValue3(1000);
    setValue2(50);
    setValue1(200);
  }, []);

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br h-screen from-purple-950 via-indigo-950 to-indigo-950">
      <div>
        <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl">
          <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32">
            <div className="flex-1 space-y-8 text-left sm:text-center">
              <div className="mb-10 mt-10 flex md:flex-none items-center justify-center relative">
                <GradientTypeWriter 
                  words={'Explore the world through words'} 
                  className="pl-2 bg-linear-to-r from-purple-200 via-violet-400 to-indigo-600 bg-clip-text text-transparent text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" 
                />
              </div>

              <p className="text-center mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
                Discover insightful articles, thought-provoking stories, and expert perspectives on technology, lifestyle and innovation
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center pt-10">
                <Link href={'/articles'}>
                 
                  <button className="btn-gradient rounded-3xl hover:rounded-2xl">
                    Start Reading
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 ml-5 md:mx-w-md sm:mt-50">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber
                      className='inline-flex items-center text-2xl font-bold text-white'
                      springOptions={{
                        bounce: 0,
                        duration: 2000,
                      }}
                      value={value1}
                    />
                  </div>
                  <div className="text-sm text-gray-300">Published articles</div>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber
                      className='inline-flex items-center text-2xl font-bold text-white'
                      springOptions={{
                        bounce: 0,
                        duration: 2000,
                      }}
                      value={value2}
                    />+
                  </div>
                  <div className="text-sm text-gray-300">Expert writers</div>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber
                      className='inline-flex items-center text-2xl font-bold text-white'
                      springOptions={{
                        bounce: 0,
                        duration: 2000,
                      }}
                      value={value3}
                    />+
                  </div>
                  <div className="text-sm text-gray-300">Monthly Readers</div>
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