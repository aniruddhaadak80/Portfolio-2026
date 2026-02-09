"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation";
import { stagger, random } from "animejs/utils";
import { spring } from "animejs/easings/spring";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !titleRef.current || !subTitleRef.current || !gridRef.current) return;

        const tl = createTimeline();

        // 1. Text Entrance
        tl.add(titleRef.current, {
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            ease: spring({ stiffness: 100, damping: 12 }),
        })
            .add(subTitleRef.current, {
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                delay: 200,
                ease: 'outExpo',
            }, '-=600');

        // 2. Grid/Particle System Animation (The "50+" animations requested)
        const cells = gridRef.current.children;

        // Initial Staggered Reveal
        tl.add(cells, {
            scale: [0, 1],
            opacity: [0, 0.4],
            translateZ: 0,
            rotateZ: [45, 0],
            duration: 800,
            delay: stagger(50, { grid: [10, 10], from: 'center' }),
            ease: 'outElastic(1, .5)',
        }, '-=1000');

        // Continuous Floating Animation Loop
        // We use a separate animate call for the loop so it doesn't block the timeline
        animate(cells, {
            translateY: () => random(-20, 20),
            translateX: () => random(-20, 20),
            rotate: () => random(-180, 180),
            scale: () => random(0.5, 1.5),
            opacity: () => random(0.2, 0.6),
            duration: () => random(3000, 5000),
            delay: stagger(20, { from: 'center' }),
            direction: 'alternate',
            loop: true,
            ease: 'easeInOutQuad',
        });

    }, []);

    // Color Palette for particles - Vibrant but fitting the cream theme
    const colors = ['#FF2D55', '#2997FF', '#AF52DE', '#FF9500', '#34C759'];

    return (
        <section
            ref={containerRef}
            className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#F5F5F7]"
            style={{ perspective: '1000px' }}
        >
            {/* Background Animated Grid System (100 Elements) */}
            <div
                ref={gridRef}
                className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none z-0"
            >
                {[...Array(100)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full mix-blend-multiply opacity-0"
                        style={{
                            placeSelf: 'center',
                            backgroundColor: colors[i % colors.length],
                            boxShadow: `0 0 10px ${colors[i % colors.length]}`
                        }}
                    />
                ))}
            </div>

            <div className="z-10 text-center mix-blend-darken relative">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-9xl font-black mb-4 text-[#1D1D1F] tracking-tight"
                >
                    ANIRUDDHA ADAK
                </h1>
                <p
                    ref={subTitleRef}
                    className="text-xl md:text-2xl text-[#86868B] font-medium tracking-widest uppercase"
                    style={{ opacity: 0 }}
                >
                    Full Stack Developer & AI Engineer
                </p>
            </div>

            {/* Additional Abstract Blobs for "More Colors" */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2997FF] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-40"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#AF52DE] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-[#FF2D55] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
            </div>
        </section>
    );
}
