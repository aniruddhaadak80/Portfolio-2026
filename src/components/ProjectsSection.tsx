"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GSAPText from "./ui/GSAPText";
import MagneticButton from "./ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "EchoCraft",
        category: "AI",
        gradient: "from-pink-500 via-red-500 to-yellow-500",
        year: "2024",
        tech: ["Claude API", "Next.js", "Redis"],
        metrics: "99% Accuracy",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" // AI/Neural
    },
    {
        id: 2,
        title: "VocalScribe",
        category: "Web",
        gradient: "from-blue-400 via-indigo-500 to-purple-500",
        year: "2023",
        tech: ["WebSockets", "Node.js", "React"],
        metrics: "10k+ Users",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" // Digital/Waveform
    },
    {
        id: 3,
        title: "SkillSphere",
        category: "App",
        gradient: "from-green-400 via-emerald-500 to-teal-500",
        year: "2023",
        tech: ["React Native", "Firebase"],
        metrics: "4.8 Star Rating",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" // Mobile/App
    },
    {
        id: 4,
        title: "LingoLens",
        category: "AI",
        gradient: "from-orange-400 via-orange-500 to-red-500",
        year: "2022",
        tech: ["OpenCV", "TensorFlow"],
        metrics: "Real-time Translation",
        image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800" // Travel/People
    },
    {
        id: 5,
        title: "Mercato",
        category: "Web",
        gradient: "from-indigo-400 via-purple-500 to-pink-500",
        year: "2022",
        tech: ["Stripe", "Next.js", "PostgreSQL"],
        metrics: "$1M+ GMV",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800" // Payment/Shopping
    },
    {
        id: 6,
        title: "Portfolio",
        category: "Web",
        gradient: "from-gray-700 via-gray-900 to-black",
        year: "2024",
        tech: ["GSAP", "Next.js"],
        metrics: "50+ Features",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800" // Minimalist Architecture
    },
];

export default function ProjectsSection() {
    // ... existing state and refs ...
    const [filter, setFilter] = useState("All");
    const [flippedId, setFlippedId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Staggered Entrance (Existing)
        gsap.fromTo(".project-card-container",
            { y: 100, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );

        // 2. Background Text Parallax (Existing)
        if (bgTextRef.current) {
            gsap.to(bgTextRef.current, {
                x: "-20%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }

    }, { scope: containerRef, dependencies: [filter] });

    const handleFlip = (id: number, target: HTMLElement) => {
        if (flippedId === id) {
            setFlippedId(null);
            gsap.to(target, { rotateY: 0, duration: 0.8, ease: "power3.inOut" });
        } else {
            setFlippedId(id);
            gsap.to(target, { rotateY: 180, duration: 0.8, ease: "power3.inOut" });
        }
    };

    return (
        <section id="work" className="min-h-screen w-full bg-[#F5F5F7] py-32 text-[#1D1D1F] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-multiply"></div>

            <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <GSAPText
                            text="SELECTED WORKS"
                            type="chars"
                            className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4 text-[#1D1D1F]"
                            animation="slide-up"
                        />
                        <GSAPText
                            text="Curated Digital Architecture [2022-2024]"
                            type="words"
                            className="text-[#86868B] font-mono tracking-widest text-sm uppercase"
                            animation="fade"
                        />
                    </div>

                    <div className="flex gap-2 bg-white p-2 rounded-full border border-gray-200 shadow-sm">
                        {["All", "AI", "Web", "App"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setFilter(cat); setFlippedId(null); }}
                                className={`px-8 py-3 rounded-full transition-all text-xs font-black uppercase tracking-widest ${filter === cat
                                    ? "bg-[#1D1D1F] text-white"
                                    : "text-[#86868B] hover:text-[#1D1D1F]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[800px]">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card-container aspect-square perspective-1000 h-[400px]"
                        >
                            <div
                                onClick={(e) => handleFlip(project.id, e.currentTarget)}
                                className="project-card-inner relative w-full h-full transition-all duration-500 cursor-pointer"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Front Face */}
                                <div
                                    className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl border border-white/10 group`}
                                >
                                    {/* Image Background */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${project.image})` }}
                                    />
                                    {/* Gradient Overlay - BARELY VISIBLE (Tint Only) */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-10`} />
                                    {/* Subtle Dark Gradient at bottom for Text Contrast */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

                                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                        <div className="absolute top-8 right-8 text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/60">
                                            System № {project.id.toString().padStart(2, '0')}
                                        </div>
                                        <span className="text-xs font-mono mb-2 text-white/90 uppercase tracking-widest bg-black/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm z-10 border border-white/10">{project.category}</span>
                                        <h3 className="text-4xl font-black leading-tight drop-shadow-xl z-10 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>

                                        {/* Abstract Animated Shapes (Removed for cleaner image look, or reduced) */}
                                        <div
                                            className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                                        />
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div
                                    className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-gray-100 p-10 flex flex-col text-left overflow-hidden shadow-2xl"
                                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                                >
                                    {/* Back Face Background (Subtle) */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none grayscale"
                                        style={{ backgroundImage: `url(${project.image})` }}
                                    />

                                    <div className="mb-8 relative z-10">
                                        <span className="text-[0.6rem] font-black tracking-widest text-[#86868B] uppercase">Architecture Breakdown</span>
                                        <h4 className="text-3xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] to-[#2997FF]">{project.title}</h4>
                                    </div>

                                    <div className="space-y-6 flex-1">
                                        <div>
                                            <span className="text-[10px] font-black tracking-widest text-[#1D1D1F]/40 uppercase block mb-2">Core Stack</span>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-bold text-[#1D1D1F]">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black tracking-widest text-[#1D1D1F]/40 uppercase block mb-2">Primary Metric</span>
                                            <p className="text-xl font-bold italic tracking-tighter text-[#1D1D1F]">{project.metrics}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-2xl font-black italic text-[#1D1D1F]">{project.year}</span>
                                        <MagneticButton className="px-6 py-2 bg-[#1D1D1F] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#2997FF] hover:text-white transition-colors">
                                            Case Study →
                                        </MagneticButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Text Scroller */}
            <div ref={bgTextRef} className="absolute top-1/2 left-0 w-[200%] opacity-[0.03] -translate-y-1/2 pointer-events-none -rotate-12 scale-150 whitespace-nowrap overflow-hidden">
                <span className="text-[#1D1D1F] text-[20vw] font-black uppercase">SYSTEMS • INTERFACES • ARCHITECTURES • </span>
            </div>
        </section>
    );
}
