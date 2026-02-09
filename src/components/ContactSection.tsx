"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs/animation";
import { createTimeline } from "animejs/timeline";
import { mapRange, damp, createSeededRandom } from "animejs/utils";
import { spring } from "animejs/easings/spring";

// Stage 6: Contact & Footer
// Improved: Functional form look, better particle system, responsive layout

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

    // Form refs
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!buttonRef.current || !particlesRef.current) return;

        const button = buttonRef.current;

        // Magnetic button effect using mapRange and damp
        const handleMouseMove = (e: MouseEvent) => {
            const buttonBounds = button.getBoundingClientRect();
            const x = e.clientX - buttonBounds.left - buttonBounds.width / 2;
            const y = e.clientY - buttonBounds.top - buttonBounds.height / 2;

            // Map mouse position to smaller movement range
            const moveX = mapRange(x, -buttonBounds.width / 2, buttonBounds.width / 2, -15, 15);
            const moveY = mapRange(y, -buttonBounds.height / 2, buttonBounds.height / 2, -10, 10);

            animate(button, {
                translateX: moveX,
                translateY: moveY,
                duration: 100,
                ease: 'outQuad',
            });
        };

        const handleMouseLeave = () => {
            animate(button, {
                translateX: 0,
                translateY: 0,
                duration: 400,
                ease: spring({ stiffness: 200, damping: 15 }),
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        // Create seeded random particles
        const seededRandom = createSeededRandom(12345);
        const particles = particlesRef.current.querySelectorAll('.particle');

        particles.forEach((particle) => {
            const x = seededRandom() * 100;
            const y = seededRandom() * 100;
            const size = seededRandom() * 3 + 1;
            const delay = seededRandom() * 5000;
            const duration = 3000 + seededRandom() * 2000;

            (particle as HTMLElement).style.left = `${x}%`;
            (particle as HTMLElement).style.top = `${y}%`;
            (particle as HTMLElement).style.width = `${size}px`;
            (particle as HTMLElement).style.height = `${size}px`;

            animate(particle, {
                translateY: ['0px', '-100px'],
                opacity: [0, 0.5, 0],
                duration: duration,
                delay: delay,
                loop: true,
                ease: 'linear',
            });
        });

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleInputFocus = (target: HTMLElement) => {
        animate(target, {
            scale: 1.02,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            duration: 300,
        });
    };

    const handleInputBlur = (target: HTMLElement) => {
        animate(target, {
            scale: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            duration: 300,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');

        // Simulate send
        setTimeout(() => {
            setFormState('sent');

            // Animation success
            if (buttonRef.current) {
                animate(buttonRef.current, {
                    scale: [1, 1.1, 1],
                    backgroundColor: ['#3b82f6', '#10b981'], // blue to green
                    duration: 600,
                    ease: 'outElastic(1, .5)',
                });
            }
        }, 1500);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-black py-20"
        >
            {/* Background particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute rounded-full bg-blue-500/30"
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-2xl px-6">
                <h2 className="text-4xl md:text-7xl font-bold mb-4 text-center">
                    Let&apos;s Talk
                </h2>
                <p className="text-xl text-gray-400 mb-12 text-center">
                    Got an idea? I&apos;m ready to build it.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors"
                            onFocus={(e) => handleInputFocus(e.target)}
                            onBlur={(e) => handleInputBlur(e.target)}
                            required
                        />
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors"
                            onFocus={(e) => handleInputFocus(e.target)}
                            onBlur={(e) => handleInputBlur(e.target)}
                            required
                        />
                    </div>
                    <textarea
                        ref={messageRef}
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
                        onFocus={(e) => handleInputFocus(e.target)}
                        onBlur={(e) => handleInputBlur(e.target)}
                        required
                    />

                    <div className="flex justify-center mt-8">
                        <button
                            ref={buttonRef}
                            type="submit"
                            disabled={formState !== 'idle'}
                            className="px-12 py-5 bg-blue-600 rounded-full text-lg font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all w-full md:w-auto"
                        >
                            {formState === 'idle' ? 'Send Message' : formState === 'sending' ? 'Sending...' : 'Sent!'}
                        </button>
                    </div>
                </form>

                {/* Social Links */}
                <div className="mt-20 flex gap-8 justify-center border-t border-white/10 pt-8">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-widest">GitHub</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-widest">LinkedIn</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-widest">Twitter</a>
                </div>
            </div>
        </section>
    );
}
