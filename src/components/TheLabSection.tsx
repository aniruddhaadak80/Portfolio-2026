"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs/animation";
import { createDraggable } from "animejs/draggable";
import { stagger, random, snap } from "animejs/utils";
import { spring } from "animejs/easings/spring";

// Stage 2: "The Lab" (Interactive Playground)
// Demonstrating: Draggable with axes & snap, random() utility, Layout states if available

const projects = [
    { id: 1, title: "VocalScribe", desc: "Speech-to-text platform" },
    { id: 2, title: "SkillSphere", desc: "Daily productivity app" },
    { id: 3, title: "MercatoLive", desc: "E-commerce platform" },
    { id: 4, title: "DevSparks", desc: "AI coding assistant" },
];

export default function TheLabSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const draggablesRef = useRef<ReturnType<typeof createDraggable>[]>([]);

    useEffect(() => {
        if (!cardsContainerRef.current) return;

        const cards = cardsContainerRef.current.querySelectorAll('.lab-card');

        // Create draggable instances for each card
        cards.forEach((card, i) => {
            const draggable = createDraggable(card as HTMLElement, {
                x: {
                    snap: 50, // Snap to 50px grid
                },
                y: {
                    snap: 50,
                },
                releaseStiffness: 200,
                releaseDamping: 20,
                cursor: {
                    onHover: 'grab',
                    onGrab: 'grabbing',
                },
                onGrab: () => {
                    animate(card, {
                        scale: 1.05,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        duration: 200,
                    });
                },
                onRelease: () => {
                    animate(card, {
                        scale: 1,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        duration: 300,
                        ease: spring({ stiffness: 300, damping: 20 }),
                    });
                },
            });
            draggablesRef.current.push(draggable);
        });

        // Initial random scatter animation
        animate(cards, {
            translateX: () => random(-100, 100),
            translateY: () => random(-50, 50),
            rotate: () => random(-15, 15),
            duration: 0,
        });

        return () => {
            draggablesRef.current.forEach((d) => d.revert());
        };
    }, []);

    const handleReset = () => {
        if (!cardsContainerRef.current) return;
        const cards = cardsContainerRef.current.querySelectorAll('.lab-card');

        // Reset all draggables
        draggablesRef.current.forEach((d) => d.reset());

        // Animate back to grid
        animate(cards, {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            delay: stagger(50),
            duration: 600,
            ease: spring({ stiffness: 200, damping: 25 }),
        });
    };

    return (
        <section
            ref={sectionRef}
            className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black py-20"
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                The Lab
            </h2>
            <p className="text-gray-400 mb-8 text-center">Drag the cards around!</p>

            <button
                onClick={handleReset}
                className="mb-12 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-full text-sm uppercase tracking-widest transition-colors"
            >
                Reset Layout
            </button>

            <div
                ref={cardsContainerRef}
                className="relative w-full max-w-4xl h-[400px] mx-auto px-6"
            >
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="lab-card absolute p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-grab hover:border-white/40 transition-colors w-48"
                        style={{
                            left: `${(i % 2) * 250 + 100}px`,
                            top: `${Math.floor(i / 2) * 150 + 50}px`,
                        }}
                    >
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{project.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
