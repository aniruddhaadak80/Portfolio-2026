"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs/timeline";
import { animate } from "animejs/animation"; // v4 import
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!containerRef.current || !curtainRef.current) return;

        // Reset state for new page
        animate(containerRef.current, { opacity: 0, duration: 0 });
        animate(curtainRef.current, { scaleY: 1, duration: 0 });

        const tl = createTimeline({
            defaults: { ease: 'outExpo' }
        });

        // Universal Page Transition: Curtain Reveal
        tl.add(curtainRef.current, {
            scaleY: [1, 0],
            transformOrigin: 'top',
            duration: 800,
            delay: 100
        })
            .add(containerRef.current, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800
            }, '-=600');

    }, [pathname]);

    return (
        <>
            {/* Universal Curtain Loader */}
            <div
                ref={curtainRef}
                className="fixed inset-0 z-[100] bg-blue-600 pointer-events-none origin-top"
            />

            {/* Page Content */}
            <div ref={containerRef} style={{ opacity: 0 }}>
                {children}
            </div>
        </>
    );
}
