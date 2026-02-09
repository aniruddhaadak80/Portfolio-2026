"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: "2024",
        company: "NextGen Systems",
        role: "Lead Interface Architect",
        desc: "Architecting high-fidelity motion systems for global enterprise applications.",
        achievements: ["Reduced bundle size by 40%", "Implemented v4 Animation Engine", "Led a team of 12"],
        color: "#3b82f6",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" // Architecture/Skyscraper
    },
    {
        year: "2023",
        company: "CloudCore",
        role: "Senior Full-Stack Engineer",
        desc: "Devised distributed serverless architectures that scaled to 2M+ active users.",
        achievements: ["99.99% Uptime", "Zero-downtime migrations", "AWS Cost reduction of 30%"],
        color: "#8b5cf6",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?auto=format&fit=crop&q=80&w=800" // Server/Data Center
    },
    {
        year: "2022",
        company: "Artery AI",
        role: "Founding Engineer",
        desc: "Integrated Large Language Models into medical diagnostic workflows.",
        achievements: ["Patent for AI triage", "First 50 customers signed", "Y-Combinator W22"],
        color: "#ec4899",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" // Medical/Tech
    },
];

export default function ExperienceTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useGSAP(() => {
        if (!sectionRef.current || !pathRef.current) return;

        // 1. Draw Path on Scroll
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
            }
        });

        // 2. Card Entrance Stagger
        const cards = gsap.utils.toArray('.exp-card');
        gsap.from(cards, {
            x: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

    }, { scope: sectionRef });

    const handleMarkerHover = (index: number, target: HTMLElement) => {
        setHoveredIndex(index);
        gsap.to(target, { scale: 2, duration: 0.3, ease: "back.out(2)" });
    };

    const handleMarkerLeave = (index: number, target: HTMLElement) => {
        setHoveredIndex(null);
        gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="min-h-screen w-full bg-[#F5F5F7] py-40 overflow-hidden px-6 relative"
        >
            <div className="max-w-4xl mx-auto flex gap-12 lg:gap-24 relative">

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
                            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#2997FF] bg-white z-20 cursor-pointer shadow-md"
                            style={{ top: `${(i + 1) * 300}px` }}
                        />
                    ))}
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-48 pt-[250px]">
                    {experiences.map((exp, i) => (
                        <div
                            key={exp.company}
                            className="exp-card group relative"
                        >
                            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-gray-200 absolute -top-16 -left-8 pointer-events-none select-none z-0">
                                {exp.year}
                            </span>

                            <div className="relative z-10 p-10 rounded-[2rem] bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all overflow-hidden group-hover:scale-[1.02] duration-500">
                                {/* Background Image with Overlay - NOW VISIBLE */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none grayscale-[20%]"
                                    style={{ backgroundImage: `url(${exp.image})` }}
                                />
                                {/* subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/70 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-[#2997FF] flex items-center justify-center font-bold text-[#2997FF] bg-blue-50 shadow-sm">
                                            {exp.company[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] to-[#2997FF] mb-1">{exp.role}</h3>
                                            <p className="text-[#2997FF] font-mono text-sm tracking-tighter uppercase font-bold">{exp.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-[#1D1D1F] text-lg leading-relaxed mb-8 font-medium">{exp.desc}</p>

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
                            </div>

                            {/* Hover Details */}
                            {hoveredIndex === i && (
                                <div className="absolute -right-12 top-0 w-64 p-6 bg-[#1D1D1F] text-white rounded-3xl animate-in fade-in slide-in-from-left-4 duration-300 shadow-2xl z-50">
                                    <h4 className="font-black text-sm uppercase mb-2">Key Metric</h4>
                                    <p className="text-xs font-medium leading-tight">Implementing this system led to a total transformation of the internal engineering culture.</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Data Stream (Visual Decoration) */}
            <div className="absolute top-0 right-0 h-full w-32 opacity-10 pointer-events-none flex flex-col justify-around items-center">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="font-mono text-[10px] text-[#1D1D1F] rotate-90">{Math.floor(Math.random() * 9000) + 1000}ms</div>
                ))}
            </div>
        </section>
    );
}
