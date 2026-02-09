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
            className="h-screen w-full flex flex-col justify-center items-center relative"
            style={{ perspective: '1000px' }}
        >
            <div className="z-10 text-center">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-9xl font-black mb-4 overflow-hidden"
                >
                    ANIRUDDHA ADAK
                </h1>
                <p
                    ref={subTitleRef}
                    className="text-xl md:text-2xl text-gray-400 font-light tracking-widest"
                    style={{ opacity: 0 }}
                >
                    FULL STACK DEVELOPER & AI ENGINEER
                </p>
            </div>

            {/* Background Abstract Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
        </section>
    );
}
