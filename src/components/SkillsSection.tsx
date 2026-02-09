"use client";

import React, { useEffect, useRef, useState } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation";
import { stagger, random } from "animejs/utils";
import { spring } from "animejs/easings/spring";
import { onScroll } from "animejs/events";

// Stage 9: Highly Advanced Skills Section
// Features: 3D Tilt, Detail Reveal, Progress Rings, Floating Tech Soup, Staggered Grid

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
    const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.skill-card');

        // Staggered Entrance
        animate(cards, {
            translateY: [100, 0],
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: stagger(100, { grid: [4, 2], from: 'center' }),
            duration: 1200,
            ease: spring({ stiffness: 100, damping: 12 }),
        });

        // Background floating techs
        const soup = sectionRef.current.querySelectorAll('.tech-soup-item');
        animate(soup, {
            translateX: () => [0, random(-100, 100)],
            translateY: () => [0, random(-100, 100)],
            rotate: () => random(-45, 45),
            duration: () => random(5000, 10000),
            loop: true,
            alternate: true,
            ease: 'easeInOutSine'
        });
    }, []);

    useEffect(() => {
        if (selectedSkill && detailRef.current) {
            // Animate detail panel entrance
            animate(detailRef.current, {
                translateX: ['100%', '0%'],
                opacity: [0, 1],
                duration: 600,
                ease: 'outExpo',
            });

            // Animate level bar
            const bar = detailRef.current.querySelector('.level-bar');
            if (bar) {
                animate(bar, {
                    width: [0, `${selectedSkill.level}%`],
                    duration: 1500,
                    delay: 400,
                    ease: spring({ stiffness: 80, damping: 15 }),
                });
            }
        }
    }, [selectedSkill]);

    const handleMouseMove = (e: React.MouseEvent, target: HTMLElement) => {
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 10;
        const y = (e.clientY - top - height / 2) / 10;

        animate(target, {
            rotateY: x,
            rotateX: -y,
            duration: 100,
            ease: 'linear'
        });
    };

    const handleMouseLeave = (target: HTMLElement) => {
        animate(target, {
            rotateY: 0,
            rotateX: 0,
            duration: 400,
            ease: 'outExpo'
        });
    };

    return (
        <section
            ref={sectionRef}
            className="min-h-screen w-full relative bg-gray-950 py-32 overflow-hidden flex flex-col items-center"
        >
            {/* Tech Soup Background */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="tech-soup-item absolute text-white/5 text-8xl font-black pointer-events-none select-none uppercase"
                    style={{
                        top: `${random(0, 100)}%`,
                        left: `${random(0, 100)}%`,
                    }}
                >
                    {['JS', 'TS', 'PY', 'REACT', 'DB', 'WEB'][i % 6]}
                </div>
            ))}

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row gap-12">

                {/* Grid Column */}
                <div className="flex-1">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-white">
                        THE <span className="text-blue-500">ENGINE</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 perspective-1000">
                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                onClick={() => setSelectedSkill(skill)}
                                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                className={`skill-card group relative p-8 rounded-3xl border transition-all cursor-pointer overflow-hidden ${selectedSkill?.name === skill.name ? 'bg-blue-600 border-white shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                style={{ transformStyle: 'preserve-3d', opacity: 0 }}
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-12 mb-4 transition-transform group-hover:scale-110 duration-500 ${selectedSkill?.name === skill.name ? 'text-white' : ''}`} style={{ color: selectedSkill?.name === skill.name ? '#fff' : skill.color }}>
                                        {skill.icon}
                                    </svg>
                                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-300">Technology</span>
                                    <h3 className="font-black text-xl">{skill.name}</h3>
                                </div>

                                {/* 3D Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="w-full lg:w-96 min-h-[400px]">
                    {selectedSkill ? (
                        <div
                            ref={detailRef}
                            className="sticky top-32 p-10 rounded-[3rem] bg-white text-black h-fit shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16" style={{ color: selectedSkill.color === '#FFFFFF' ? '#000' : selectedSkill.color }}>
                                    {selectedSkill.icon}
                                </svg>
                                <button onClick={() => setSelectedSkill(null)} className="text-black/30 hover:text-black transition-colors text-2xl">×</button>
                            </div>

                            <h3 className="text-4xl font-black uppercase mb-4 leading-none">{selectedSkill.name}</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed font-medium">{selectedSkill.desc}</p>

                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-xs uppercase font-bold tracking-tighter text-blue-600">
                                    <span>Proficiency</span>
                                    <span>{selectedSkill.level}%</span>
                                </div>
                                <div className="h-4 bg-gray-100 rounded-full overflow-hidden p-1">
                                    <div className="level-bar h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" style={{ width: 0 }} />
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-black/5">
                                <span className="block text-[0.6rem] uppercase tracking-[0.3em] font-black text-black/20 mb-4">Ecosystem Status</span>
                                <div className="flex flex-wrap gap-2">
                                    {['STABLE', 'SCALABLE', 'OPTIMIZED'].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-full italic">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="sticky top-32 border-2 border-dashed border-white/10 rounded-[3rem] h-full flex flex-col items-center justify-center p-12 text-center text-white/20">
                            <div className="text-6xl mb-4 animate-bounce">👆</div>
                            <p className="font-mono text-sm uppercase tracking-widest">Select a technology to inspect architecture</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Scrolling Banner */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-white py-4 -rotate-2 origin-left">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="text-black text-2xl font-black uppercase mx-8 italic">
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
