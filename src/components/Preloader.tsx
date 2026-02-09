"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { stagger } from "animejs/utils";
import { spring } from "animejs/easings/spring";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Stage 0: Minimalist Cream Preloader
        if (!containerRef.current || !barRef.current || !textRef.current) return;

        const tl = createTimeline({
            onComplete: () => {
                if (onComplete) onComplete();
            },
        });

        tl.add(barRef.current, {
            width: ['0%', '100%'],
            duration: 1500,
            ease: 'inOutExpo'
        })
            .add(textRef.current, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                ease: 'outExpo'
            }, '-=1000')
            .add(containerRef.current, {
                translateY: [0, '-100%'],
                duration: 800,
                ease: 'inOutQuart'
            }, '+=200');

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#F5F5F7] text-[#1D1D1F] overflow-hidden"
        >
            <div className="w-64 h-1 bg-gray-300 rounded-full overflow-hidden mb-4">
                <div ref={barRef} className="h-full bg-blue-600 w-0" />
            </div>

            <div ref={textRef} className="text-sm font-bold tracking-[0.2em] uppercase opacity-0">
                Aniruddha Adak
            </div>
        </div>
    );
}
