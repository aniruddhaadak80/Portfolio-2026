"use client";

import React, { useState, useEffect, useRef } from "react";
import { animate } from "animejs/animation";
import { createTimeline } from "animejs/timeline";
import { spring } from "animejs/easings/spring";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Stage 7: Navigation (Curtain Menu)
// Refined: Link-based routing for multi-page refactor

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    const tlRef = useRef<ReturnType<typeof createTimeline> | null>(null);

    useEffect(() => {
        if (!menuRef.current || !bgRef.current || !linksRef.current) return;

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
                delay: (el: Element, i: number) => i * 100,
                ease: spring({ stiffness: 100, damping: 15 }),
            }, '-=400');

        tlRef.current = tl;
    }, []);

    const toggleMenu = () => {
        if (!tlRef.current) return;
        if (isOpen) {
            tlRef.current.reverse();
            tlRef.current.play();
        } else {
            tlRef.current.play();
        }
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        if (isOpen && tlRef.current) {
            tlRef.current.reverse();
            tlRef.current.play();
            setIsOpen(false);
        }
    };

    const routes = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Skills', path: '/skills' },
        { name: 'Work', path: '/work' },
        { name: 'Experience', path: '/experience' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed top-8 right-8 z-[100] w-12 h-12 flex items-center justify-center bg-white rounded-full mix-blend-difference hover:scale-110 transition-transform"
            >
                <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`} />
                <div className={`absolute w-6 h-0.5 bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1'}`} />
            </button>

            <div ref={menuRef} className="fixed inset-0 z-40 pointer-events-none">
                <div
                    ref={bgRef}
                    className="absolute inset-0 bg-white"
                    style={{ clipPath: 'circle(0% at 90% 10%)', pointerEvents: isOpen ? 'auto' : 'none' }}
                >
                    <div ref={linksRef} className="h-full flex flex-col items-center justify-center gap-8 text-black">
                        {routes.map((route) => (
                            <Link
                                key={route.name}
                                href={route.path}
                                onClick={closeMenu}
                                className={`text-4xl md:text-6xl font-bold transition-colors hover:text-gray-500 ${pathname === route.path ? 'line-through decoration-blue-500' : ''}`}
                                style={{ opacity: 0 }}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
