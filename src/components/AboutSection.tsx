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
        <section
            ref={sectionRef}
            className="min-h-screen w-full relative bg-black py-32 overflow-hidden px-6"
        >
            {/* Background Decorations */}
            <div className="decoration absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="decoration absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/5 rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Bio Content */}
                    <div ref={bioRef} className="space-y-8">
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                            <span className="bio-line block overflow-hidden">Crafting</span>
                            <span className="bio-line block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Digital</span>
                            <span className="bio-line block overflow-hidden">Reality</span>
                        </h2>

                        <p className="bio-line text-xl text-gray-400 leading-relaxed max-w-xl">
                            I am Aniruddha Adak, a full-stack architect specializing in high-performance
                            web ecosystems. My philosophy: <span className="text-white italic">"Code is poetry, logic is its rhythm."</span>
                        </p>

                        <div className="bio-line pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="group">
                                <span ref={yearsRef} className="text-5xl font-black text-white">0</span>
                                <span className="text-2xl text-blue-500 ml-1">+</span>
                                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Years of Engineering</p>
                            </div>
                            <div className="group">
                                <span ref={projectsRef} className="text-5xl font-black text-white">0</span>
                                <span className="text-2xl text-purple-500 ml-1">+</span>
                                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Systems Deployed</p>
                            </div>
                            <div className="group">
                                <span ref={commitsRef} className="text-5xl font-black text-white">0</span>
                                <span className="text-2xl text-pink-500 ml-1">+</span>
                                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">GitHub Contributions</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Interactive Hobby Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {hobbies.map((hobby, i) => (
                            <div
                                key={hobby.name}
                                ref={el => { hobbyRefs.current[i] = el; }}
                                onMouseEnter={(e) => handleHobbyMouseEnter(i, e.currentTarget)}
                                onMouseLeave={(e) => handleHobbyMouseLeave(i, e.currentTarget)}
                                className="aspect-square flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer transition-colors hover:border-white/30"
                                style={{ opacity: 0 }}
                            >
                                <span className="text-4xl mb-2">{hobby.icon}</span>
                                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">{hobby.name}</span>

                                {activeHobby === i && (
                                    <div className="absolute inset-0 bg-blue-500/10 rounded-3xl animate-pulse" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: Detailed Text / Philosophy Reveal */}
                <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-gray-900 to-black border border-white/5 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h3 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">THE ARCHITECTURE OF VISION</h3>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-4xl relative z-10">
                        Beyond the syntax, I build for the user. Every micro-interaction is a touchpoint of empathy.
                        Whether it's optimizing a React component for 60fps or architecting a distributed system
                        that handles millions of requests, the goal is always clear: **Stability, Scalability, and Soul.**
                    </p>

                    {/* Animated Sine Wave SVG Bottom */}
                    <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#3b82f6" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,202.7C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>
        </section>
    );
}
