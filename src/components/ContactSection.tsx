"use client";

import React, { useRef, useEffect, useState } from "react";
import { animate } from "animejs/animation";
import { spring } from "animejs/easings/spring";
import { stagger, random } from "animejs/utils";
import { createTimeline } from "animejs/timeline";

// Stage 12: Holographic Contact Section
// Features: Magnetic Icons, Particle Focus, Spring Recoil, Procedural Success

const socialLinks = [
    { name: "GitHub", icon: "🌐", url: "#" },
    { name: "LinkedIn", icon: "🔗", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Email", icon: "✉️", url: "#" },
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const particleContainerRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Entrance animation
        animate(sectionRef.current.querySelectorAll('.contact-element'), {
            opacity: [0, 1],
            translateY: [50, 0],
            delay: stagger(100),
            duration: 1000,
            ease: 'outExpo'
        });

        // Initialize particles
        if (particleContainerRef.current) {
            const particles = particleContainerRef.current.querySelectorAll('.particle');
            animate(particles, {
                translateX: () => random(-20, 20),
                translateY: () => random(-20, 20),
                opacity: [0.1, 0.4],
                scale: () => random(0.5, 1.5),
                duration: () => random(2000, 4000),
                loop: true,
                alternate: true,
                ease: 'easeInOutQuad'
            });
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent, target: HTMLElement) => {
        const { left, top, width, height } = target.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const moveX = (e.clientX - centerX) / 2;
        const moveY = (e.clientY - centerY) / 2;

        animate(target, {
            translateX: moveX,
            translateY: moveY,
            duration: 200,
            ease: 'outExpo'
        });
    };

    const handleMouseLeave = (target: HTMLElement) => {
        animate(target, {
            translateX: 0,
            translateY: 0,
            duration: 800,
            ease: spring({ stiffness: 200, damping: 10 })
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Procedural Success Sequence
        const tl = createTimeline({
            onComplete: () => {
                setIsSubmitting(false);
                setIsSubmitted(true);
            }
        });

        tl.add(formRef.current!, {
            scale: 0.95,
            opacity: 0.5,
            duration: 400,
            ease: 'inExpo'
        })
            .add(formRef.current!, {
                scale: 1,
                opacity: 1,
                duration: 800,
                ease: spring({ stiffness: 100, damping: 10 })
            });
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="min-h-screen w-full bg-[#F5F5F7] py-40 flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
            {/* Particle Field Background */}
            <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute w-1 h-1 bg-[#2997FF] rounded-full"
                        style={{
                            top: `${random(0, 100)}%`,
                            left: `${random(0, 100)}%`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-4xl w-full relative z-10 text-center">
                <h2 className="contact-element text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-[#1D1D1F]">
                    LET'S <span className="text-[#2997FF]">TALK.</span>
                </h2>
                <p className="contact-element text-[#86868B] font-mono tracking-widest text-sm uppercase mb-20 italic">Architecting the next digital era</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start text-left">

                    {/* Left: Info & Socials */}
                    <div className="space-y-12">
                        <div className="contact-element">
                            <span className="text-[10px] font-black tracking-widest text-[#86868B]/60 uppercase block mb-4">Direct Channel</span>
                            <a href="mailto:hello@aniruddha.dev" className="text-3xl font-black text-[#1D1D1F] hover:text-[#2997FF] transition-colors">hello@aniruddha.dev</a>
                        </div>

                        <div className="contact-element">
                            <span className="text-[10px] font-black tracking-widest text-[#86868B]/60 uppercase block mb-6">Coordinate Hub</span>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                        className="group relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-[#2997FF]/30 transition-all flex items-center gap-4 overflow-hidden shadow-sm hover:shadow-md"
                                    >
                                        <span className="text-2xl">{link.icon}</span>
                                        <span className="font-bold text-xs uppercase tracking-widest text-[#1D1D1F]">{link.name}</span>
                                        <div className="absolute inset-0 bg-[#2997FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Holographic Form */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="contact-element relative p-10 rounded-[3rem] bg-white border border-gray-100 shadow-2xl space-y-6 overflow-hidden"
                    >
                        {/* Animated Border Glow - Subtle for light mode */}
                        <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-conic from-[#2997FF]/0 via-[#2997FF]/10 to-[#2997FF]/0 animate-spin-slow pointer-events-none" />

                        <div>
                            <input
                                type="text"
                                placeholder="IDENTIFIER"
                                className="w-full bg-[#F5F5F7] border border-transparent rounded-2xl p-5 font-mono text-xs uppercase tracking-widest text-[#1D1D1F] focus:bg-white focus:border-[#2997FF] outline-none transition-all placeholder:text-[#86868B]"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="MESSAGE PAYLOAD"
                                rows={4}
                                className="w-full bg-[#F5F5F7] border border-transparent rounded-2xl p-5 font-mono text-xs uppercase tracking-widest text-[#1D1D1F] focus:bg-white focus:border-[#2997FF] outline-none transition-all placeholder:text-[#86868B]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isSubmitted}
                            className="w-full py-5 bg-[#1D1D1F] text-white font-black uppercase tracking-[0.3em] rounded-2xl overflow-hidden relative group hover:scale-105 active:scale-95 transition-all text-sm"
                        >
                            <span className="relative z-10">{isSubmitted ? "TRANSMISSION SENT" : isSubmitting ? "TRANSMITTING..." : "INITIALIZE CONTACT"}</span>
                            <div className="absolute inset-0 bg-[#2997FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Tag */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#86868B] tracking-[1em] uppercase">
                Aniruddha Adak © 2026 // System Pulse: Online
            </div>
        </section>
    );
}
