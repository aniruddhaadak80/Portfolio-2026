"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { stagger } from "animejs/utils";
import { spring } from "animejs/easings/spring";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Stage 0: Complex Preloader using createTimeline and Stagger
        // Demonstrating: createTimeline, stagger, spring easing (v4 object params), callbacks

        const validDots = dotsRef.current.filter(Boolean) as HTMLDivElement[];

        // Create spring easing with v4 object syntax
        const springEase = spring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 });

        const tl = createTimeline({
            defaults: {
                ease: springEase,
            },
            onComplete: () => {
                if (onComplete) onComplete();
            },
        });

        // Staggered dot animation
        tl.add(
            validDots,
            {
                scale: [0, 1],
                opacity: [0, 1],
                delay: stagger(100),
                duration: 500,
            }
        )
            .add(
                validDots,
                {
                    translateY: [0, -30],
                    duration: 300,
                    delay: stagger(50, { from: 'center' }),
                    loop: 2,
                    alternate: true,
                },
                '+=200'
            )
            .add(
                containerRef.current!,
                {
                    opacity: [1, 0],
                    scale: [1, 0.8],
                    duration: 400,
                },
                '+=300'
            );

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden"
        >
            <div className="flex gap-3">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        ref={(el) => { dotsRef.current[i] = el; }}
                        className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
                        style={{ opacity: 0, transform: 'scale(0)' }}
                    />
                ))}
            </div>
            <div className="absolute bottom-10 text-sm text-gray-500 tracking-widest uppercase">
                Loading Experience...
            </div>
        </div>
    );
}
