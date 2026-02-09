"use client";

import React, { useEffect, useRef, useState } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation";
import { stagger, round, random } from "animejs/utils";
import { spring } from "animejs/easings/spring";
import { onScroll } from "animejs/events";

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
    const sectionRef = useRef<HTMLElement>(null);
    const yearsRef = useRef<HTMLSpanElement>(null);
    const projectsRef = useRef<HTMLSpanElement>(null);
    const commitsRef = useRef<HTMLSpanElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const hobbyRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [activeHobby, setActiveHobby] = useState<number | null>(null);

    useEffect(() => {
        if (!sectionRef.current || !bioRef.current) return;

        const counters = { years: 0, projects: 0, commits: 0 };

        // 1. Initial Bio Animation (Split Text effect - manual for now as SplitText is a module)
        const bioLines = bioRef.current.querySelectorAll('.bio-line');
        animate(bioLines, {
            translateY: [20, 0],
            opacity: [0, 1],
            delay: stagger(100),
            duration: 800,
            ease: 'outExpo',
        });

        // 2. Scroll-triggered animations
        const scrollObserver = onScroll({
            target: sectionRef.current,
            enter: '10% bottom',
            onEnter: () => {
                // Stats Counter
                animate(counters, {
                    years: 4,
                    projects: 32,
                    commits: 2800,
                    duration: 2500,
                    ease: 'outExpo',
                    modifier: round(1),
                    onUpdate: () => {
                        if (yearsRef.current) yearsRef.current.textContent = String(counters.years);
                        if (projectsRef.current) projectsRef.current.textContent = String(counters.projects);
                        if (commitsRef.current) commitsRef.current.textContent = String(counters.commits);
                    },
                });

                // Hobby Grid Reveal
                animate(hobbyRefs.current.filter(Boolean) as HTMLElement[], {
                    scale: [0.5, 1],
                    opacity: [0, 1],
                    translateY: [50, 0],
                    rotate: () => random(-10, 10),
                    delay: stagger(100, { from: 'center' }),
                    ease: spring({ stiffness: 100, damping: 15 }),
                });
            },
        });

        // 3. Persistent Background Decorations (Floating)
        const deco = sectionRef.current.querySelectorAll('.decoration');
        animate(deco, {
            translateX: () => [0, random(-30, 30)],
            translateY: () => [0, random(-30, 30)],
            rotate: () => [0, random(-20, 20)],
            duration: () => random(3000, 5000),
            loop: true,
            alternate: true,
            ease: 'easeInOutQuad',
        });

        return () => {
            scrollObserver.revert();
        };
    }, []);

    const handleHobbyMouseEnter = (index: number, target: HTMLElement) => {
        setActiveHobby(index);
        animate(target, {
            scale: 1.1,
            rotate: 0,
            zIndex: 50,
            duration: 400,
            ease: spring({ stiffness: 200, damping: 10 }),
        });
    };

    const handleHobbyMouseLeave = (index: number, target: HTMLElement) => {
        setActiveHobby(null);
        animate(target, {
            scale: 1,
            rotate: random(-5, 5),
            zIndex: 1,
            duration: 400,
            ease: 'outBounce',
        });
    };

    return (
        <section ref={sectionRef} id="about" className="min-h-screen w-full py-32 px-6 relative overflow-hidden bg-[#F5F5F7]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">

                {/* Text Content */}
                <div ref={bioRef} className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#1D1D1F] leading-tight">
                        Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] to-[#AF52DE] animate-pulse">Digital</span> <br /> Experiences
                    </h2>
                    <div className="text-lg md:text-xl text-[#86868B] leading-relaxed space-y-6">
                        <p>
                            I am a Full Stack Developer located in India with a passion for building readable, efficient, and beautiful software.
                        </p>
                        <p>
                            My approach combines technical precision with artistic direction. I don't just write code; I orchestrate user journeys.
                        </p>
                    </div>

                    <div className="flex gap-4 pt-8">
                        {['Innovation', 'Precision', 'Scale'].map((tag, i) => (
                            <span
                                key={tag}
                                className={`px-6 py-2 rounded-full border border-[#1D1D1F] font-medium tracking-wide transition-all cursor-default hover:text-white hover:border-transparent ${i === 0 ? 'hover:bg-[#FF2D55]' :
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
                <div className="grid grid-cols-2 gap-4 perspective-1000">
                    {hobbies.map((hobby, i) => (
                        <div
                            key={hobby.name}
                            ref={(el) => { if (el) hobbyRefs.current[i] = el; }}
                            onMouseEnter={(e) => handleHobbyMouseEnter(i, e.currentTarget)}
                            onMouseLeave={(e) => handleHobbyMouseLeave(i, e.currentTarget)}
                            className="aspect-square bg-white rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow border border-gray-100 cursor-pointer"
                        >
                            <span className="text-4xl">{hobby.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold text-[#1D1D1F]">{hobby.name}</h3>
                                <div className="w-full bg-gray-100 h-1 mt-3 rounded-full overflow-hidden">
                                    <div className="h-full" style={{ backgroundColor: hobby.color, width: '70%' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
