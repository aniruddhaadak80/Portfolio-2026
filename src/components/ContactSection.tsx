"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aniruddha-adak", icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /> },
    { name: "GitHub 1", url: "https://github.com/AniruddhaAdak", icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 15.13V19" /> },
    { name: "GitHub 2", url: "https://github.com/aniruddhaadak80", icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 15.13V19" /> },
    { name: "Twitter", url: "https://x.com/aniruddhadak", icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /> },
    { name: "Dev.to", url: "https://dev.to/aniruddhaadak", icon: <path d="M4 4h16v16H4V4zm3 12h2v-8H7v8zm4 0h3v-8h-3v8zm4-8v8h2v-8h-2z" /> },
    { name: "CodePen", url: "https://codepen.io/aniruddhaadak", icon: <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 12v10M12 12L2 6.5M12 12l10-5.5" /> },
    { name: "Telegram", url: "https://t.me/aniruddhaadak", icon: <path d="M21.5 2L2 9.5l7 3.5L20 5 11 15v7l4-4 6.5 3.5L21.5 2z" /> },
    { name: "Linktree", url: "https://linktr.ee/aniruddha.adak", icon: <path d="M12 2L2 12h8v8h4v-8h8L12 2z" /> },
    { name: "Facebook", url: "https://www.facebook.com/aniruddhadak", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
    { name: "Instagram", url: "https://www.instagram.com/aniruddhadak", icon: <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /> },
    { name: "Portfolio", url: "https://aniruddha-adak.vercel.app", icon: <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5 9.5 9.75 12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /> },
];

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const socialLinksRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // 1. Entrance Animation
        gsap.from(".contact-element", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        // 2. Social Links Stagger
        if (socialLinksRef.current) {
            const links = socialLinksRef.current.children;
            gsap.from(links, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: socialLinksRef.current,
                    start: "top 85%",
                }
            });
        }

    }, { scope: sectionRef });

    const handleMouseMove = (e: React.MouseEvent, target: HTMLElement) => {
        // Magnetic Button Effect
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 2; // Stronger pull
        const y = (e.clientY - top - height / 2) / 2;

        gsap.to(target, { x: x, y: y, duration: 0.3, ease: "power2.out" });
        gsap.to(target.querySelector('svg'), { x: x * 0.5, y: y * 0.5, duration: 0.3, ease: "power2.out" }); // Parallax icon
    };

    const handleMouseLeave = (target: HTMLElement) => {
        gsap.to(target, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        gsap.to(target.querySelector('svg'), { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="min-h-screen w-full bg-[#F5F5F7] py-40 flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
            {/* Particle Field Background - Static for performance or simple CSS anim */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#2997FF] rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-6xl w-full relative z-10 text-center">
                <h2 className="contact-element text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-[#1D1D1F]">
                    LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#AF52DE] to-[#FF2D55]">TALK.</span>
                </h2>
                <p className="contact-element text-[#86868B] font-mono tracking-widest text-sm uppercase mb-20 italic">Architecting the next digital era</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start text-left">

                    {/* Left: Info & Socials */}
                    <div className="space-y-12">
                        <div className="contact-element">
                            <span className="text-[10px] font-black tracking-widest text-[#86868B]/60 uppercase block mb-4">Direct Channel</span>
                            <a href="mailto:aniruddhaadak80@gmail.com" className="text-2xl md:text-3xl font-black text-[#1D1D1F] hover:text-[#2997FF] transition-colors break-all">aniruddhaadak80@gmail.com</a>
                        </div>

                        <div className="contact-element">
                            <span className="text-[10px] font-black tracking-widest text-[#86868B]/60 uppercase block mb-6">Coordinate Hub</span>
                            <div ref={socialLinksRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                        className="social-link-item group relative p-4 rounded-xl bg-white border border-gray-200 hover:border-[#2997FF]/30 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden shadow-sm hover:shadow-md aspect-square"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#1D1D1F] group-hover:text-[#2997FF] transition-colors relative z-10 pointer-events-none">
                                            {link.icon}
                                        </svg>
                                        <span className="font-bold text-[10px] uppercase tracking-widest text-[#1D1D1F] text-center relative z-10 pointer-events-none">{link.name}</span>
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
                        className="contact-element relative p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl space-y-6 overflow-hidden"
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
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2997FF] to-[#AF52DE] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Tag */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#86868B] tracking-[1em] uppercase whitespace-nowrap">
                Aniruddha Adak © 2026 // System Pulse: Online
            </div>
        </section>
    );
}
