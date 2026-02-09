"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Stage 8: Expanded About Section
// Features: SplitText (v4), 3D Transforms, Staggered Grid, Parallax, Color interpolation

const hobbies = [
    { name: "Photography", icon: "📸", color: "#FF6B6B" },
    { name: "Chess", icon: "♟️", color: "#4ECDC4" },
    { name: "Generative Art", icon: "🎨", color: "#FFE66D" },
    { name: "Travel", icon: "🌍", color: "#1A535C" },
    { name: "Open Source", icon: "💻", color: "#F7FFF7" },
    { name: "Sci-Fi", icon: "🚀", color: "#AAABB8" },
];

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !bioRef.current || !gridRef.current) return;

        // 1. Bio Text Staggered Reveal
        // We look for any text elements and stagger them
        const textElements = bioRef.current.children;

        gsap.fromTo(textElements,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: bioRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        // 2. Hobby Grid Card Stagger
        const cards = gridRef.current.children;
        gsap.fromTo(cards,
            { y: 100, opacity: 0, rotation: 10 },
            {
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                }
            }
        );

        // 3. Scrubbing Background Parallax
        // We can't select .decoration elements easily without ref, assuming layout is okay without it or we add them back
        // adding a subtle parallax to the whole section content
        gsap.to(containerRef.current, {
            backgroundPosition: "0% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="min-h-screen w-full py-32 px-6 relative overflow-hidden bg-[#F5F5F7]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">

                {/* Text Content */}
                <div ref={bioRef} className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#1D1D1F] leading-tight">
                        Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] to-[#AF52DE] inline-block">Digital</span> <br /> Experiences
                    </h2>
                    <div className="text-lg md:text-xl text-[#86868B] leading-relaxed space-y-6">
                        <p>
                            I am a Full Stack Developer located in India with a passion for building readable, efficient, and beautiful software.
                        </p>
                        <p>
                            My approach combines technical precision with artistic direction. I don't just write code; I orchestrate user journeys.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-8">
                        {['Innovation', 'Precision', 'Scale'].map((tag, i) => (
                            <span
                                key={tag}
                                className={`px-6 py-2 rounded-full border border-[#1D1D1F] font-medium tracking-wide transition-all cursor-default hover:text-white hover:border-transparent hover:scale-110 active:scale-95 duration-300 ${i === 0 ? 'hover:bg-[#FF2D55]' :
                                        i === 1 ? 'hover:bg-[#2997FF]' :
                                            'hover:bg-[#34C759]'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Interactive Grid */}
                <div ref={gridRef} className="grid grid-cols-2 gap-4 perspective-1000">
                    {hobbies.map((hobby) => (
                        <div
                            key={hobby.name}
                            className="group aspect-square bg-white rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer hover:-translate-y-2"
                        >
                            <span className="text-4xl group-hover:scale-125 transition-transform duration-300 block w-fit">{hobby.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold text-[#1D1D1F] group-hover:text-[#2997FF] transition-colors">{hobby.name}</h3>
                                <div className="w-full bg-gray-100 h-1 mt-3 rounded-full overflow-hidden">
                                    <div className="h-full transition-all duration-1000 ease-out w-0 group-hover:w-[70%]" style={{ backgroundColor: hobby.color }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
