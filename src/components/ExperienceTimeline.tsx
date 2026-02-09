"use client";

import React, { useEffect, useRef, useState } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation";
import { spring } from "animejs/easings/spring";
import { stagger, random } from "animejs/utils";
import { onScroll } from "animejs/events";
import { createDrawable } from "animejs/svg";

// Stage 11: Hyper-Detailed Experience Timeline
// Features: SVG createDrawable, onScroll syncing, Exploding Markers, Achievement Bubbles

const experiences = [
    {
        year: "2024",
        company: "NextGen Systems",
        role: "Lead Interface Architect",
        desc: "Architecting high-fidelity motion systems for global enterprise applications.",
        achievements: ["Reduced bundle size by 40%", "Implemented v4 Animation Engine", "Led a team of 12"],
        color: "#3b82f6",
        easing: "spring(1, 80, 10, 0)"
    },
    {
        year: "2023",
        company: "CloudCore",
        role: "Senior Full-Stack Engineer",
        desc: "Devised distributed serverless architectures that scaled to 2M+ active users.",
        achievements: ["99.99% Uptime", "Zero-downtime migrations", "AWS Cost reduction of 30%"],
        color: "#8b5cf6",
        easing: "elastic(1, .5)"
    },
    {
        year: "2022",
        company: "Artery AI",
        role: "Founding Engineer",
        desc: "Integrated Large Language Models into medical diagnostic workflows.",
        achievements: ["Patent for AI triage", "First 50 customers signed", "Y-Combinator W22"],
        color: "#ec4899",
        easing: "steps(5)"
    },
];

export default function ExperienceTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!sectionRef.current || !pathRef.current) return;

        const drawable = createDrawable(pathRef.current);

        // 1. Initial Reveal
        animate(drawable, {
            pathLength: [0, 1],
            duration: 2000,
            ease: 'easeInOutSine',
        });

        // 2. Scroll Sync for Timeline Path
        const scroll = onScroll({
            target: sectionRef.current,
            onUpdate: (self) => {
                animate(drawable, {
                    pathLength: self.progress,
                    duration: 0
                });
            }
        });

        // 3. Card Entrance on Scroll
        const cards = sectionRef.current.querySelectorAll('.exp-card');
        animate(cards, {
            translateX: [-100, 0],
            opacity: [0, 1],
            rotate: [-10, 0],
            delay: stagger(200),
            duration: 1000,
            ease: spring({ stiffness: 100, damping: 15 }),
        });

        return () => {
            if (scroll && scroll.revert) {
                scroll.revert();
            }
        };
    }, []);

    const handleMarkerHover = (index: number, target: HTMLElement) => {
        setHoveredIndex(index);
        animate(target, {
            scale: 2,
            filter: "blur(0px)",
            duration: 400,
            ease: spring({ stiffness: 200, damping: 10 }),
        });
    };

    const handleMarkerLeave = (index: number, target: HTMLElement) => {
        setHoveredIndex(null);
        animate(target, {
            scale: 1,
            filter: "blur(2px)",
            duration: 400,
            ease: 'outExpo',
        });
    };

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="min-h-screen w-full bg-[#F5F5F7] py-40 overflow-hidden px-6 relative"
        >
            <div className="max-w-4xl mx-auto flex gap-12 lg:gap-24">

                {/* Timeline Column */}
                <div className="relative w-2 bg-gray-200 rounded-full h-[1200px]">
                    <svg className="absolute inset-0 h-full w-2" viewBox="0 0 8 1200" preserveAspectRatio="none">
                        <path
                            ref={pathRef}
                            d="M4 0V1200"
                            stroke="#2997FF"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>

                    {/* Markers */}
                    {experiences.map((_, i) => (
                        <div
                            key={i}
                            onMouseEnter={(e) => handleMarkerHover(i, e.currentTarget)}
                            onMouseLeave={(e) => handleMarkerLeave(i, e.currentTarget)}
                            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#2997FF] bg-white z-20 cursor-pointer blur-[1px]"
                            style={{ top: `${(i + 1) * 300}px` }}
                        />
                    ))}
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-48">
                    {experiences.map((exp, i) => (
                        <div
                            key={exp.company}
                            className="exp-card group relative"
                            style={{ opacity: 0 }}
                        >
                            <span className="text-8xl font-black text-gray-200 absolute -top-16 -left-8 pointer-events-none select-none">
                                {exp.year}
                            </span>

                            <div className="relative z-10 p-10 rounded-[2rem] bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full border-2 border-[#2997FF] flex items-center justify-center font-bold text-[#2997FF] bg-blue-50">
                                        {exp.company[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] to-[#555]">{exp.role}</h3>
                                        <p className="text-[#2997FF] font-mono text-sm tracking-tighter uppercase">{exp.company}</p>
                                    </div>
                                </div>
                                <p className="text-[#86868B] text-lg leading-relaxed mb-8">{exp.desc}</p>

                                {/* Achievement Bubble Reveal */}
                                <div className="flex flex-wrap gap-3">
                                    {exp.achievements.map((ach) => (
                                        <div
                                            key={ach}
                                            className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest text-[#86868B] border border-gray-100 hover:bg-[#2997FF] hover:text-white transition-all cursor-default"
                                        >
                                            {ach}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hovering "Achievement" Popup (v4 Detail) */}
                            {hoveredIndex === i && (
                                <div className="absolute -right-12 top-0 w-64 p-6 bg-[#1D1D1F] text-white rounded-3xl animate-fade-in shadow-2xl z-50">
                                    <h4 className="font-black text-sm uppercase mb-2">Key Metric</h4>
                                    <p className="text-xs font-medium leading-tight">Implementing this system led to a total transformation of the internal engineering culture.</p>
                                    <div className="mt-4 flex gap-1">
                                        {[...Array(5)].map((_, j) => (
                                            <div key={j} className="w-1 h-3 bg-white/30 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Data Stream (Visual Decoration) */}
            <div className="absolute top-0 right-0 h-full w-32 opacity-10 pointer-events-none flex flex-col justify-around items-center">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="font-mono text-[10px] text-[#1D1D1F] rotate-90">{random(1000, 9999)}ms</div>
                ))}
            </div>
        </section>
    );
}
