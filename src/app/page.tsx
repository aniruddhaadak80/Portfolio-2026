"use client";

import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { useState } from "react";
import Link from "next/link";
import { animate } from "animejs/animation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-black text-white">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <Navigation />
          <CustomCursor />
          <div className="w-full h-screen flex flex-col items-center justify-center relative">
            <Hero />

            {/* Call to Action */}
            <div className="absolute bottom-20 z-10 animate-bounce">
              <Link
                href="/work"
                className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-110"
                onMouseEnter={(e) => {
                  animate(e.currentTarget, {
                    scale: 1.1,
                    duration: 200,
                  });
                }}
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-blue-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
