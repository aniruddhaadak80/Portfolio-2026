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
                delay: (el: any, i: number) => i * 100,
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
        { name: 'Home', path: '#home' },
        { name: 'About', path: '#about' },
        { name: 'Skills', path: '#skills' },
        { name: 'Work', path: '#work' },
        { name: 'Experience', path: '#experience' },
        { name: 'Contact', path: '#contact' }
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        closeMenu();
        if (pathname === '/' && path.startsWith('#')) {
            e.preventDefault();
            const id = path.substring(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center mix-blend-difference text-white">
                <div className="text-xl font-bold tracking-tighter uppercase">Aniruddha Adak</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {routes.map((route) => (
                        <Link
                            key={route.name}
                            href={pathname === '/' ? route.path : `/${route.path}`}
                            onClick={(e) => handleLinkClick(e, route.path)}
                            className={`text-sm font-medium tracking-widest uppercase hover:text-[#2997FF] transition-colors ${pathname === route.path ? 'text-[#2997FF]' : 'text-[#1D1D1F]'}`}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                >
                    <div className="relative w-6 h-4">
                        <div className={`absolute left-0 w-6 h-0.5 bg-current transition-all ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
                        <div className={`absolute left-0 w-6 h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : 'top-2'}`} />
                        <div className={`absolute left-0 w-6 h-0.5 bg-current transition-all ${isOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
                    </div>
                </button>
            </nav>

            {/* Mobile Curtain Menu */}
            <div ref={menuRef} className="fixed inset-0 z-40 pointer-events-none md:hidden">
                <div
                    ref={bgRef}
                    className="absolute inset-0 bg-white"
                    style={{ clipPath: 'circle(0% at 90% 10%)', pointerEvents: isOpen ? 'auto' : 'none' }}
                >
                    <div ref={linksRef} className="h-full flex flex-col items-center justify-center gap-8 text-[#1D1D1F]">
                        {routes.map((route) => (
                            <Link
                                key={route.name}
                                href={pathname === '/' ? route.path : `/${route.path}`}
                                onClick={(e) => handleLinkClick(e, route.path)}
                                className="text-4xl font-bold transition-all hover:text-[#2997FF] hover:tracking-widest"
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
