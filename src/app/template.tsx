"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs/animation";

export default function Template({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Entrance animation
        animate(containerRef.current, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            ease: "outExpo",
        });
    }, []);

    return (
        <div ref={containerRef} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}
