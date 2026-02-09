"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation";
import { stagger, round } from "animejs/utils";
import { spring } from "animejs/easings/spring";
import { onScroll } from "animejs/events";

// Stage 3: About Section
// Demonstrating: onScroll events, number counting with round(), color interpolation, update callback

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const yearsRef = useRef<HTMLSpanElement>(null);
    const projectsRef = useRef<HTMLSpanElement>(null);
    const commitsRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Create counter objects for animation
        const counters = { years: 0, projects: 0, commits: 0 };

        // Setup scroll observer for this section
        const scrollObserver = onScroll({
            target: sectionRef.current,
            enter: '10% bottom',
            leave: '90% top',
            onEnter: () => {
                // Animate counters when section enters
                animate(counters, {
                    years: 4,
                    projects: 32,
                    commits: 2800,
                    duration: 2000,
                    ease: 'outExpo',
                    modifier: round(1), // Round to nearest integer
                    onUpdate: () => {
                        if (yearsRef.current) yearsRef.current.textContent = String(counters.years);
                        if (projectsRef.current) projectsRef.current.textContent = String(counters.projects);
                        if (commitsRef.current) commitsRef.current.textContent = String(counters.commits);
                    },
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
            className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900 py-20"
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
                About Me
            </h2>

            <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    I'm a passionate Full Stack Developer and AI Engineer based in Kolkata, India.
                    With expertise in modern web technologies and machine learning, I create seamless
                    user experiences and robust backend systems.
                </p>

                {/* Stats with animated counters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
                        <span ref={yearsRef} className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">0</span>
                        <span className="text-6xl font-black text-blue-400">+</span>
                        <p className="text-gray-400 mt-2 font-mono uppercase tracking-widest text-sm">Years Experience</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
                        <span ref={projectsRef} className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">0</span>
                        <span className="text-6xl font-black text-purple-400">+</span>
                        <p className="text-gray-400 mt-2 font-mono uppercase tracking-widest text-sm">Projects Built</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors">
                        <span ref={commitsRef} className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">0</span>
                        <span className="text-6xl font-black text-green-400">+</span>
                        <p className="text-gray-400 mt-2 font-mono uppercase tracking-widest text-sm">GitHub Commits</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
