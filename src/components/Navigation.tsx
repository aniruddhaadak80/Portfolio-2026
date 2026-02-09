"use client";

import React, { useState, useEffect, useRef } from "react";
import { animate } from "animejs/animation";
import { createTimeline } from "animejs/timeline";
import { spring } from "animejs/easings/spring";

// Stage 7: Navigation (Curtain Menu)
// Demonstrating: clipPath animation, playback control (play/reverse), callback timing

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    // Use a ref to store the timeline so we can control it
    const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null);

    useEffect(() => {
        if (!menuRef.current || !bgRef.current || !linksRef.current) return;

        // Create the timeline paused
        const tl = createTimeline({
            autoplay: false,
            defaults: {
                ease: 'inOutQuart',
                duration: 800,
            }
        });

        tl.add(bgRef.current, {
            clipPath: ['circle(0% at 90% 10%)', 'circle(150% at 90% 10%)'],
        })
            .add(linksRef.current.children, {
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 600,
                delay: (el, i) => i * 100,
                ease: spring({ stiffness: 100, damping: 15 }),
            }, '-=400'); // Overlap with bg expansion

        tlRef.current = tl;
    }, []);

    const toggleMenu = () => {
        if (!tlRef.current) return;

        if (isOpen) {
            // Close
            tlRef.current.reverse();
            tlRef.current.play();
        } else {
            // Open
            tlRef.current.play();
            // Note: If previously reversed, we need to ensure direction is correct or just play.
            // In v4, calling play() on a reversed timeline plays it forward if it was at start? 
            // Let's stick to standard behavior: if it's finished reversed (at 0), play moves forward.
            // If it's finished forward (at end) and we reversed, it moves backward.
            // For simplicity in this demo, we'll just handle direction manually if needed, 
            // but standard play/reverse toggle usually works.
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed top-8 right-8 z-[100] w-12 h-12 flex items-center justify-center bg-white rounded-full mix-blend-difference z-50 hover:scale-110 transition-transform"
            >
                <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
                <div className={`absolute w-6 h-0.5 bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1'}`} />
            </button>

            <div
                ref={menuRef}
                className="fixed inset-0 z-40 pointer-events-none"
            >
                <div
                    ref={bgRef}
                    className="absolute inset-0 bg-white"
                    style={{ clipPath: 'circle(0% at 90% 10%)', pointerEvents: isOpen ? 'auto' : 'none' }}
                >
                    <div
                        ref={linksRef}
                        className="h-full flex flex-col items-center justify-center gap-8 text-black"
                    >
                        {['Home', 'About', 'Skills', 'Work', 'Experience', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={(e) => {
                                    // Smooth scroll fallback
                                    const targetId = item.toLowerCase();
                                    const targetEl = document.getElementById(targetId);
                                    if (targetEl) {
                                        setIsOpen(false);
                                        tlRef.current?.reverse();
                                        tlRef.current?.play(); // Play the reverse
                                    }
                                }}
                                className="text-4xl md:text-6xl font-bold hover:text-gray-500 transition-colors cursor-pointer"
                                style={{ opacity: 0 }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
