"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation";
import { stagger } from "animejs/utils";
import { spring } from "animejs/easings/spring";

// Stage 3: Skills Section (The Periodic Table)
// Demonstrating: stagger with grid, spring easing, animate()
// Refined: Includes SVG Logos for a premium look

const skills = [
    { name: "React", mobile: false, color: "#61DAFB", icon: <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-8a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" /> }, // Simple abstract React-like
    { name: "Next.js", mobile: false, color: "#000000", icon: <path d="M12 2L2 19.777h2.464l.959-1.645 4.606 8.016h2.246L5.807 7.234 12 2zM19.782 17.53l-6.845-12h-.088L14.7 9.873l5.082 7.657z" /> }, // Next.js N (simplified)
    { name: "TypeScript", mobile: false, color: "#3178C6", icon: <path d="M22 6v12h-2V8h-2v10h-2V8h-2v-2h6zM6 18H4V6h6v2H8v10z" /> }, // TS Text (simplified)
    { name: "Python", mobile: false, color: "#3776AB", icon: <path d="M12 2c-3 0-5 2-5 5v2h8V7c0-2-1-3-3-3H9zm-5 7v9c0 3 2 5 5 5h3c3 0 5-2 5-5v-2H12v2c0 2-1 3-3 3H9z" /> }, // Python abstract
    { name: "Tailwind", mobile: false, color: "#06B6D4", icon: <path d="M12 6c3 0 3-2 6-2 2 0 4 2 4 5s-2 5-5 5c-3 0-3 2-6 2-2 0-4-2-4-5s2-5 5-5c3 0 3-2 6-2z" /> }, // Tailwind wave
    { name: "Node.js", mobile: false, color: "#339933", icon: <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6 3.3v6.8l-6 3.4-6-3.4V7.6l6-3.3z" /> }, // Node hex
    { name: "MongoDB", mobile: false, color: "#47A248", icon: <path d="M12 2s-6 8-6 12a6 6 0 0 0 12 0c0-4-6-12-6-12z" /> }, // Mongo leaf
    { name: "Docker", mobile: false, color: "#2496ED", icon: <path d="M2.5 10H5v2H2.5v-2zm3 0H8v2H5.5v-2zm3 0H11v2H8.5v-2zm-6-3H5v2H2.5V7zm3 0H8v2H5.5V7zm3 0H11v2H8.5V7zm-3-3h2.5v2H8.5V4zM22 10h-2.5v2h-8v-2h-1v5H22v-5z" /> }, // Docker whale container part
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;

        const cards = gridRef.current.querySelectorAll('.skill-card');

        // Initial staggered reveal
        const tl = createTimeline({
            defaults: {
                ease: spring({ mass: 1, stiffness: 100, damping: 15 }),
            },
        });

        tl.add(cards, {
            scale: [0, 1],
            opacity: [0, 1],
            delay: stagger(50, {
                grid: [4, 2],
                from: 'center',
            }),
            duration: 600,
        });

    }, []);

    const handleShuffle = () => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll('.skill-card');

        // Shuffle animation: scatter then return to random grid spots?
        // Or just scatter freely. Let's do a meaningful shuffle where they swap places.
        // For simplicity and robustness without full FLIP in this specific section (Projects uses FLIP),
        // we'll do a scatter-regroup effect.

        animate(cards, {
            translateX: () => Math.random() * 200 - 100,
            translateY: () => Math.random() * 200 - 100,
            rotate: () => Math.random() * 360,
            scale: 0.5,
            opacity: 0.5,
            duration: 600,
            ease: 'inOutQuad',
        }).then(() => {
            // Return to original positions but refreshed
            animate(cards, {
                translateX: 0,
                translateY: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
                duration: 800,
                delay: stagger(50, { from: 'random' }),
                ease: spring({ stiffness: 200, damping: 20 }),
            });
        });
    };

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black py-20 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                ARSENAL
            </h2>

            <button
                onClick={handleShuffle}
                className="mb-16 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            >
                Shuffle Grid
            </button>

            <div
                ref={gridRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-6"
            >
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="skill-card group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-colors w-40 h-40 md:w-48 md:h-48 cursor-pointer"
                        style={{ opacity: 0, transform: 'scale(0)' }}
                    >
                        <div
                            className="w-16 h-16 mb-4 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10" style={{ color: skill.color }}>
                                {skill.icon}
                            </svg>
                        </div>
                        <span className="font-bold text-lg tracking-wide">{skill.name}</span>

                        {/* Hover glow */}
                        <div
                            className="absolute inset-0 -z-10 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
