"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { spring } from "animejs/easings/spring";
import { onScroll } from "animejs/events";
import { createDrawable } from "animejs/svg";

// Stage 5: Experience Timeline
// Demonstrating: createDrawable, onScroll for triggering, stagger
// Refined: Mobile responsive layout and line drawing

// Easing options for diversity
const easings = [
    'spring(1, 80, 10, 0)', 'cubicBezier(.5, .05, .1, .3)', 'steps(5)', 'outExpo'
];

const experiences = [
    { year: "2024", title: "AI Engineer", company: "Freelance", description: "Building next-gen AI agents and LLM integrations.", easing: 'spring(1, 80, 10, 0)' },
    { year: "2023", title: "Full Stack Developer", company: "Open Source", description: "Contributing to major react libraries and tools.", easing: 'outElastic(1, .6)' },
    { year: "2022", title: "Web Developer", company: "Projects", description: "Creating award-winning freelance websites.", easing: 'easeInOutQuad' },
    { year: "2021", title: "Student", company: "BBIT, Kolkata", description: "Computer Science & Engineering.", easing: 'steps(10)' },
];

export default function ExperienceTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!sectionRef.current || !pathRef.current) return;

        // Create drawable for the timeline path
        // const drawable = createDrawable(pathRef.current); // Not strictly needed for timeline animate, but good for setup

        // Master timeline triggered on scroll
        const scrollObserver = onScroll({
            target: sectionRef.current,
            enter: 'top 60%', // Trigger earlier for mobile
            leave: 'bottom 20%',
            onEnter: () => {
                if (hasAnimated.current) return;
                hasAnimated.current = true;

                const tl = createTimeline({
                    defaults: { ease: 'outExpo' },
                });

                // 1. Draw the line
                tl.add(pathRef.current!, {
                    draw: ['0 0', '0 1'],
                    duration: 2500,
                    ease: 'linear',
                });

                // 2. Reveal cards synced with the line with DIVERSE EASINGS
                cardsRef.current.filter(Boolean).forEach((card, i) => {
                    const expEasing = experiences[i].easing;

                    tl.add(card!, {
                        opacity: [0, 1],
                        translateY: [50, 0], // Move up slightly
                        scale: [0.8, 1],
                        duration: 800,
                        ease: expEasing, // Use specific easing per card
                    }, i * 400 + 200); // Staggered start
                });
            },
        });

        return () => {
            scrollObserver.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="min-h-screen w-full relative bg-gradient-to-b from-gray-900 to-black py-20 overflow-hidden"
        >
            <h2 className="text-4xl md:text-6xl font-black mb-16 text-center text-white/90">
                JOURNEY
            </h2>

            <div className="relative max-w-4xl mx-auto px-4 md:px-6">
                {/* SVG Timeline Path - Centered on Desktop, Left on Mobile */}
                <svg
                    className="absolute left-8 md:left-1/2 top-0 h-full w-2 md:-translate-x-1/2 overflow-visible"
                    viewBox="0 0 10 1000"
                    preserveAspectRatio="none"
                >
                    {/* Background Line (dim) */}
                    <path
                        d="M5 0 L5 1000"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                        fill="none"
                    />
                    {/* Animated Line (gradient) */}
                    <path
                        ref={pathRef}
                        d="M5 0 L5 1000"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="1000"
                        strokeDashoffset="1000"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Experience Cards */}
                <div className="relative z-10 space-y-16 pt-10">
                    {experiences.map((exp, i) => (
                        <div
                            key={exp.year}
                            ref={(el) => { cardsRef.current[i] = el; }}
                            className={`flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center gap-8 md:gap-0 pl-16 md:pl-0`}
                            style={{ opacity: 0 }}
                        >
                            {/* Spacer for desktop alternation */}
                            <div className="hidden md:block w-1/2" />

                            {/* Card Content */}
                            <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/50 transition-colors group">
                                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono mb-3">
                                        {exp.year}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {exp.title}
                                    </h3>
                                    <p className="text-gray-400 font-medium mb-2">{exp.company}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
