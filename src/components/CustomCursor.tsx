"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs/animation";
import { lerp, damp, clamp } from "animejs/utils";

// Global: Custom Cursor
// Demonstrating: lerp, damp, clamp for smooth following, set() for instant values

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!cursorRef.current || !cursorDotRef.current) return;

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Instant dot position
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        };

        // Smooth cursor following using damp
        let animationId: number;
        const smoothFollow = () => {
            // Use lerp/damp for smooth interpolation
            cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
            cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);

            cursor.style.left = `${cursorPos.current.x}px`;
            cursor.style.top = `${cursorPos.current.y}px`;

            animationId = requestAnimationFrame(smoothFollow);
        };

        // Handle hover states
        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target;
            // Fix: Check if target is an HTMLElement before accessing .matches
            if (target instanceof HTMLElement && target.matches('a, button, .interactive')) {
                animate(cursor, {
                    scale: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    duration: 200,
                });
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target;
            if (target instanceof HTMLElement && target.matches('a, button, .interactive')) {
                animate(cursor, {
                    scale: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    duration: 200,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        smoothFollow();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999] w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 mix-blend-difference"
                style={{ left: 0, top: 0 }}
            />
            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className="fixed pointer-events-none z-[9999] w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
                style={{ left: 0, top: 0 }}
            />
        </>
    );
}
