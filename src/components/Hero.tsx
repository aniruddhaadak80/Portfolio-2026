"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation";
import { stagger } from "animejs/utils";
import { spring } from "animejs/easings/spring";

export default function Hero() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Stage 1: Hero Animation
        // Using: animate(), createTimeline(), stagger, spring easing (v4 object params)

        // 1. Text Splitting
        if (titleRef.current) {
            const text = titleRef.current.innerText;
            titleRef.current.innerHTML = text
                .split("")
                .map((char) => `<span class='char inline-block'>${char === " " ? "&nbsp;" : char}</span>`)
                .join("");
        }

        const chars = document.querySelectorAll('.char');

        // Create spring easing with v4 object syntax
        const springEase = spring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 });

        const tl = createTimeline({
            defaults: {
                ease: 'outExpo',
            },
        });

        tl.add(
            chars,
            {
                translateY: [100, 0],
                opacity: [0, 1],
                ease: springEase,
                delay: stagger(50, { start: 300 }),
            }
        )
            .add(
                subTitleRef.current!,
                {
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                },
                '-=1000'
            );

        // Parallax Effect on Mouse Move
        const handleMouseMove = (e: MouseEvent) => {
            if (!titleRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            animate(titleRef.current, {
                translateX: x,
                translateY: y,
                duration: 100,
                ease: 'linear',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
            style={{ perspective: '1000px' }}
        >
            <div className="z-10 text-center mix-blend-multiply">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-9xl font-black mb-4 overflow-hidden text-[#1D1D1F]"
                >
                    ANIRUDDHA ADAK
                </h1>
                <p
                    ref={subTitleRef}
                    className="text-xl md:text-2xl text-[#86868B] font-medium tracking-widest"
                    style={{ opacity: 0 }}
                >
                    FULL STACK DEVELOPER & AI ENGINEER
                </p>
            </div>

            {/* Background Abstract Elements - Soft/Cream Style */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2997FF] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#AF52DE] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-[#FF2D55] rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>
            </div>
        </section>
    );
}
