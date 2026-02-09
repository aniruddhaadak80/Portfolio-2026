"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createLayout } from "animejs/layout";
import { animate } from "animejs/animation";
import { spring } from "animejs/easings/spring";
import { stagger, random } from "animejs/utils";

// Stage 10: Ultra-Detailed Projects Section
// Features: Layout Module (v4), 3D Flip Cards, Filtering, SVG Overlays, Perspective Transforms

const projects = [
    { id: 1, title: "EchoCraft", category: "AI", gradient: "from-pink-500 via-red-500 to-yellow-500", year: "2024", tech: ["Claude API", "Next.js", "Redis"], metrics: "99% Accuracy" },
    { id: 2, title: "VocalScribe", category: "Web", gradient: "from-blue-400 via-indigo-500 to-purple-500", year: "2023", tech: ["WebSockets", "Node.js", "React"], metrics: "10k+ Users" },
    { id: 3, title: "SkillSphere", category: "App", gradient: "from-green-400 via-emerald-500 to-teal-500", year: "2023", tech: ["React Native", "Firebase"], metrics: "4.8 Star Rating" },
    { id: 4, title: "LingoLens", category: "AI", gradient: "from-orange-400 via-orange-500 to-red-500", year: "2022", tech: ["OpenCV", "TensorFlow"], metrics: "Real-time Translation" },
    { id: 5, title: "Mercato", category: "Web", gradient: "from-indigo-400 via-purple-500 to-pink-500", year: "2022", tech: ["Stripe", "Next.js", "PostgreSQL"], metrics: "$1M+ GMV" },
    { id: 6, title: "Portfolio", category: "Web", gradient: "from-gray-700 via-gray-900 to-black", year: "2024", tech: ["Anime.js v4", "Next.js"], metrics: "50+ Features" },
];

export default function ProjectsSection() {
    const [filter, setFilter] = useState("All");
    const [flippedId, setFlippedId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const layoutRef = useRef<ReturnType<typeof createLayout> | null>(null);

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    useEffect(() => {
        if (!containerRef.current) return;

        layoutRef.current = createLayout(containerRef.current, {
            children: '.project-card-container',
        });

        // Entrance animation
        const cards = containerRef.current.querySelectorAll('.project-card-container');
        animate(cards, {
            translateY: [100, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: stagger(100),
            duration: 1000,
            ease: 'outExpo'
        });
    }, []);

    useLayoutEffect(() => {
        if (layoutRef.current) {
            layoutRef.current.animate({
                duration: 800,
                ease: spring({ stiffness: 200, damping: 20 }),
            });
        }
    }, [filteredProjects]);

    const handleFlip = (id: number, target: HTMLElement) => {
        if (flippedId === id) {
            setFlippedId(null);
            animate(target, {
                rotateY: [180, 0],
                duration: 800,
                ease: spring({ stiffness: 100, damping: 15 })
            });
        } else {
            setFlippedId(id);
            animate(target, {
                rotateY: [0, 180],
                duration: 800,
                ease: spring({ stiffness: 100, damping: 15 })
            });
        }
    };

    return (
        <section id="work" className="min-h-screen w-full bg-[#F5F5F7] py-32 text-[#1D1D1F] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4 text-[#1D1D1F]">
                            SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86868B] via-[#2997FF] to-[#AF52DE]">WORKS</span>
                        </h2>
                        <p className="text-[#86868B] font-mono tracking-widest text-sm uppercase">Curated Digital Architecture [2022-2024]</p>
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

                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
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
                                    className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden bg-gradient-to-br ${project.gradient} p-10 flex flex-col justify-end shadow-2xl border border-white/10`}
                                >
                                    <div className="absolute top-8 right-8 text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/40">
                                        System № {project.id.toString().padStart(2, '0')}
                                    </div>
                                    <span className="text-xs font-mono mb-2 text-white/70 uppercase tracking-widest bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm z-10">{project.category}</span>
                                    <h3 className="text-4xl font-black leading-tight drop-shadow-xl z-10 text-white">{project.title}</h3>

                                    {/* Abstract Animated Shapes */}
                                    <div
                                        className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150"
                                        style={{ transform: `rotate(${random(0, 360)}deg)` }}
                                    />
                                </div>

                                {/* Back Face */}
                                <div
                                    className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white border border-gray-100 p-10 flex flex-col text-left overflow-hidden shadow-2xl"
                                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                                >
                                    <div className="mb-8">
                                        <span className="text-[0.6rem] font-black tracking-widest text-[#86868B] uppercase">Architecture Breakdown</span>
                                        <h4 className="text-3xl font-black mt-2 text-[#2997FF]">{project.title}</h4>
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
                                        <button className="px-6 py-2 bg-[#1D1D1F] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#2997FF] hover:text-white transition-colors">
                                            Case Study →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Text Scroller */}
            <div className="absolute top-1/2 left-0 w-full opacity-[0.03] -translate-y-1/2 pointer-events-none -rotate-12 scale-150 whitespace-nowrap overflow-hidden">
                <span className="text-[#1D1D1F] text-[20vw] font-black uppercase">SYSTEMS • INTERFACES • ARCHITECTURES • </span>
                <span className="text-[#1D1D1F] text-[20vw] font-black uppercase">SYSTEMS • INTERFACES • ARCHITECTURES • </span>
            </div>
        </section>
    );
}

// Add CSS for backface-hidden
const styles = `
.backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}
`;
