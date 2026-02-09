"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "React", level: 95, color: "#61DAFB", desc: "Expert in hooks, context, and ecosystem.", icon: <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-8a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" /> },
    { name: "Next.js", level: 92, color: "#FFFFFF", desc: "SSR, SSG, App Router mastery.", icon: <path d="M12 2L2 19.777h2.464l.959-1.645 4.606 8.016h2.246L5.807 7.234 12 2zM19.782 17.53l-6.845-12h-.088L14.7 9.873l5.082 7.657z" /> },
    { name: "TypeScript", level: 90, color: "#3178C6", desc: "Typesafe architectures and utility types.", icon: <path d="M22 6v12h-2V8h-2v10h-2V8h-2v-2h6zM6 18H4V6h6v2H8v10z" /> },
    { name: "Python", level: 85, color: "#3776AB", desc: "Data science and backend automation.", icon: <path d="M12 2c-3 0-5 2-5 5v2h8V7c0-2-1-3-3-3H9zm-5 7v9c0 3 2 5 5 5h3c3 0 5-2 5-5v-2H12v2c0 2-1 3-3 3H9z" /> },
    { name: "Tailwind", level: 98, color: "#06B6D4", desc: "Rapid UI development with utility CSS.", icon: <path d="M12 6c3 0 3-2 6-2 2 0 4 2 4 5s-2 5-5 5c-3 0-3 2-6 2-2 0-4-2-4-5s2-5 5-5c3 0 3-2 6-2z" /> },
    { name: "Node.js", level: 88, color: "#339933", desc: "Scalable backend services and APIs.", icon: <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6 3.3v6.8l-6 3.4-6-3.4V7.6l6-3.3z" /> },
    { name: "MongoDB", level: 80, color: "#47A248", desc: "NoSQL database design and aggregation.", icon: <path d="M12 2s-6 8-6 12a6 6 0 0 0 12 0c0-4-6-12-6-12z" /> },
    { name: "Docker", level: 75, color: "#2496ED", desc: "Containerization and CI/CD pipelines.", icon: <path d="M2.5 10H5v2H2.5v-2zm3 0H8v2H5.5v-2zm3 0H11v2H8.5v-2zm-6-3H5v2H2.5V7zm3 0H8v2H5.5V7zm3 0H11v2H8.5V7zm-3-3h2.5v2H8.5V4zM22 10h-2.5v2h-8v-2h-1v5H22v-5z" /> },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const techSoupRef = useRef<HTMLDivElement>(null);
    const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !gridRef.current || !techSoupRef.current) return;

        // 1. Title Entrance
        gsap.from(".skill-title", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        // 2. Grid Staggered Entrance
        gsap.from(".skill-card", {
            y: 100,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
            }
        });

        // 3. Tech Soup Parallax (Scrubbing)
        // Moves the background letters at different speeds relative to scroll
        const soupItems = techSoupRef.current.children;
        Array.from(soupItems).forEach((item, i) => {
            gsap.to(item, {
                y: -100 * (i % 3 + 1), // variable speed
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        });

    }, { scope: sectionRef });

    // Floating effect for selected detail panel
    useGSAP(() => {
        if (selectedSkill && detailRef.current) {
            gsap.fromTo(detailRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );

            // Animate progress bar
            gsap.fromTo(".level-bar",
                { width: 0 },
                { width: `${selectedSkill.level}%`, duration: 1.5, ease: "power2.out", delay: 0.3 }
            );
        }
    }, [selectedSkill]);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="min-h-screen w-full relative bg-[#F5F5F7] py-32 overflow-hidden flex flex-col items-center"
        >
            {/* Tech Soup Background - Subtle Dark */}
            <div ref={techSoupRef} className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="tech-soup-item absolute text-[#1D1D1F]/5 text-8xl font-black select-none uppercase"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    >
                        {['JS', 'TS', 'PY', 'REACT', 'DB', 'WEB'][i % 6]}
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row gap-12">

                {/* Grid Column */}
                <div className="flex-1">
                    <h2 className="skill-title text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-[#1D1D1F]">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] to-[#E0F2FE]">ENGINE</span>
                    </h2>

                    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 perspective-1000">
                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                onClick={() => setSelectedSkill(skill)}
                                className={`skill-card group relative p-8 rounded-3xl border transition-all cursor-pointer overflow-hidden ${selectedSkill?.name === skill.name ? 'bg-[#2997FF] border-transparent shadow-xl text-white scale-105' : 'bg-white border-gray-200 hover:shadow-lg hover:-translate-y-1'}`}
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-12 mb-4 transition-transform group-hover:scale-110 duration-500 ${selectedSkill?.name === skill.name ? 'text-white' : 'text-[#1D1D1F]'}`} style={{ color: selectedSkill?.name === skill.name ? '#fff' : skill.color }}>
                                        {skill.icon}
                                    </svg>
                                    <span className={`font-mono text-xs uppercase tracking-widest ${selectedSkill?.name === skill.name ? 'text-white/80' : 'text-gray-400'}`}>Technology</span>
                                    <h3 className={`font-black text-xl ${selectedSkill?.name === skill.name ? 'text-white' : 'text-[#1D1D1F]'}`}>{skill.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="w-full lg:w-96 min-h-[400px]">
                    {selectedSkill ? (
                        <div
                            ref={detailRef}
                            className="sticky top-32 p-10 rounded-[3rem] bg-white text-[#1D1D1F] h-fit shadow-2xl border border-gray-100"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16" style={{ color: selectedSkill.color === '#FFFFFF' ? '#000' : selectedSkill.color }}>
                                    {selectedSkill.icon}
                                </svg>
                                <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-black transition-colors text-2xl">×</button>
                            </div>

                            <h3 className="text-4xl font-black uppercase mb-4 leading-none">{selectedSkill.name}</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed font-medium">{selectedSkill.desc}</p>

                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-xs uppercase font-bold tracking-tighter text-[#2997FF]">
                                    <span>Proficiency</span>
                                    <span>{selectedSkill.level}%</span>
                                </div>
                                <div className="h-4 bg-gray-100 rounded-full overflow-hidden p-1">
                                    <div className="level-bar h-full bg-[#2997FF] rounded-full shadow-sm" style={{ width: 0 }} />
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <span className="block text-[0.6rem] uppercase tracking-[0.3em] font-black text-gray-300 mb-4">Ecosystem Status</span>
                                <div className="flex flex-wrap gap-2">
                                    {['STABLE', 'SCALABLE', 'OPTIMIZED'].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-[#1D1D1F] text-white text-[10px] font-black rounded-full italic">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="sticky top-32 border-2 border-dashed border-gray-200 rounded-[3rem] h-full flex flex-col items-center justify-center p-12 text-center text-gray-300">
                            <div className="text-6xl mb-4 animate-bounce text-gray-200">👆</div>
                            <p className="font-mono text-sm uppercase tracking-widest">Select a technology</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Scrolling Banner */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-[#1D1D1F] py-4 -rotate-2 origin-left">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="text-white text-2xl font-black uppercase mx-8 italic">
                            100% Performance • Scalable Systems • Cloud Native • AI Integrated
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Add this to your global CSS or a style tag
const styles = `
@keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
.animate-marquee {
    animation: marquee 40s linear infinite;
}
.perspective-1000 {
    perspective: 1000px;
}
`;
