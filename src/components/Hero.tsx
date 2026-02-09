"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GSAPText from "./ui/GSAPText";
import MagneticButton from "./ui/MagneticButton";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !gridRef.current) return;

        // 2. Grid/Particle System Animation
        const cells = gridRef.current.children;

        // Initial Staggered Reveal
        gsap.fromTo(cells,
            { scale: 0, opacity: 0, rotation: 45 },
            {
                scale: 1,
                opacity: 0.4,
                rotation: 0,
                duration: 1,
                stagger: {
                    amount: 1,
                    grid: [10, 10],
                    from: "center",
                    ease: "power2.out"
                },
                delay: 0.5
            }
        );

        // Continuous Floating Animation Loop
        gsap.to(cells, {
            y: () => gsap.utils.random(-20, 20),
            x: () => gsap.utils.random(-20, 20),
            rotation: () => gsap.utils.random(-180, 180),
            scale: () => gsap.utils.random(0.5, 1.5),
            opacity: () => gsap.utils.random(0.2, 0.6),
            duration: () => gsap.utils.random(3, 5),
            stagger: {
                amount: 2,
                from: "random"
            },
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!gridRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 50;
        const yPos = (clientY / innerHeight - 0.5) * 50;

        gsap.to(gridRef.current, {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
        });
    };

    // Color Palette for particles - Vibrant but fitting the cream theme
    const colors = ['#FF2D55', '#2997FF', '#AF52DE', '#FF9500', '#34C759'];

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#F5F5F7]"
            style={{ perspective: '1000px' }}
        >
            {/* Background Animated Grid System (100 Elements) */}
            <div
                ref={gridRef}
                className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none z-0 px-10 py-10"
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

            <div className="z-10 text-center mix-blend-darken relative flex flex-col items-center gap-6">

                {/* Replaced with GSAPText for per-character animation */}
                <div className="overflow-hidden">
                    <GSAPText
                        text="ANIRUDDHA ADAK"
                        type="chars"
                        className="text-6xl md:text-9xl font-black mb-4 text-[#1D1D1F] tracking-tight leading-none"
                        animation="slide-up"
                        duration={1.5}
                        stagger={0.05}
                    />
                </div>

                <div className="overflow-hidden">
                    <GSAPText
                        text="Full Stack Developer & AI Engineer"
                        type="words"
                        className="text-xl md:text-2xl text-[#86868B] font-medium tracking-widest uppercase"
                        animation="fade"
                        delay={1}
                        stagger={0.1}
                    />
                </div>

                <div className="mt-8 flex gap-4">
                    <MagneticButton strength={0.4} className="px-8 py-3 bg-[#1D1D1F] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#2997FF] transition-colors duration-300">
                        View Work
                    </MagneticButton>
                    <MagneticButton strength={0.2} className="px-8 py-3 border border-[#1D1D1F] text-[#1D1D1F] rounded-full font-bold uppercase tracking-widest hover:bg-[#1D1D1F] hover:text-white transition-colors duration-300">
                        Contact Me
                    </MagneticButton>
                </div>
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
