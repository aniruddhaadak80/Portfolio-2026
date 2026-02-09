"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createLayout } from "animejs/layout";
import { spring } from "animejs/easings/spring";

// Stage 5: Projects Section
// Demonstrating: Layout Module (v4) for automatic FLIP transitions
// Refined: Uses placeholder gradients/colors instead of failing image generation

// Using cool gradients for placeholders
const projects = [
    { id: 1, title: "EchoCraft", category: "AI", gradient: "from-pink-500 via-red-500 to-yellow-500" },
    { id: 2, title: "VocalScribe", category: "Web", gradient: "from-blue-400 via-indigo-500 to-purple-500" },
    { id: 3, title: "SkillSphere", category: "App", gradient: "from-green-400 via-emerald-500 to-teal-500" },
    { id: 4, title: "LingoLens", category: "AI", gradient: "from-orange-400 via-orange-500 to-red-500" },
    { id: 5, title: "Mercato", category: "Web", gradient: "from-indigo-400 via-purple-500 to-pink-500" },
    { id: 6, title: "Portfolio", category: "Web", gradient: "from-gray-700 via-gray-900 to-black" },
];

export default function ProjectsSection() {
    const [filter, setFilter] = useState("All");
    const containerRef = useRef<HTMLDivElement>(null);
    const layoutRef = useRef<ReturnType<typeof createLayout> | null>(null);

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    // Initialize Layout
    useEffect(() => {
        if (!containerRef.current) return;

        layoutRef.current = createLayout(containerRef.current, {
            children: '.project-card',
        });
    }, []);

    // Animate on filter change
    useLayoutEffect(() => {
        if (!layoutRef.current) return;

        // Animate layout changes
        layoutRef.current.animate({
            ease: spring({ stiffness: 200, damping: 20 }),
        });

    }, [filteredProjects]);

    return (
        <section id="work" className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-900 py-20 text-white relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>

            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter">
                Selected Works
            </h2>

            {/* Filter Controls */}
            <div className="flex gap-4 mb-16 z-10">
                {["All", "AI", "Web", "App"].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full border transition-all text-sm font-bold uppercase tracking-wider ${filter === cat
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div
                ref={containerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl px-6 w-full"
            >
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className={`project-card group relative h-80 rounded-2xl bg-gradient-to-br ${project.gradient} overflow-hidden cursor-pointer shadow-xl`}
                    >
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity z-20">
                            <span className="text-xs font-mono mb-2 text-white/70 uppercase tracking-widest bg-white/10 w-fit px-2 py-1 rounded backdrop-blur-sm">{project.category}</span>
                            <h3 className="text-3xl font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
                                {project.title}
                            </h3>
                            <div className="h-1 w-0 group-hover:w-full bg-blue-400 mt-4 transition-all duration-500 ease-out box-shadow-[0_0_10px_rgba(96,165,250,1)]"></div>
                        </div>

                        {/* Animated Visual Background Element (Abstract Shapes) */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
                        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700 ease-in-out"></div>

                        {/* Hover Shine Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
