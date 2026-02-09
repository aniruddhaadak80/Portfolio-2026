"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GSAPText from "./ui/GSAPText";
import { Camera, Globe, Zap, Music } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Stage 8: Enhanced Bio with Parallax & SplitText
// Features: SplitText reveal (simulated), Staggered Tags, Background Parallax

const hobbies = [
    {
        name: "Photography",
        icon: <Camera className="w-6 h-6" />,
        desc: "Capturing moments in time.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Travel",
        icon: <Globe className="w-6 h-6" />,
        desc: "Exploring new cultures.",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Strategy",
        icon: <Zap className="w-6 h-6" />,
        desc: "Chess & tactical games.",
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Music",
        icon: <Music className="w-6 h-6" />,
        desc: "Producing & composing.",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=600"
    }
];

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const hobbiesRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Bio Text Reveal
        // ... (GSAP implementation remains similar but ensures compatibility)

        // 2. Hobbies Stagger
        if (hobbiesRef.current) {
            gsap.fromTo(hobbiesRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: hobbiesRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        // 3. Background Parallax
        gsap.to(".about-bg-text", {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="min-h-screen w-full bg-[#FCFAF2] py-24 px-6 relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5F5F7] rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            {/* Digital Reality Background Image */}
            <div
                className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")' }}
            />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">

                {/* Bio Column */}
                <div ref={bioRef} className="space-y-8">
                    <GSAPText
                        text="ENGINEERING"
                        type="chars"
                        className="text-sm font-mono text-[#86868B] tracking-[0.5em] uppercase pl-1 block mb-2"
                        animation="typewriter"
                    />
                    <div className="relative">
                        <GSAPText
                            text="DIGITAL REALITY"
                            type="chars"
                            className="text-6xl md:text-8xl font-black text-[#1D1D1F] tracking-tighter leading-[0.9] mb-8"
                            animation="slide-up"
                        />
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#2997FF] rounded-full blur-[80px] opacity-20 animate-pulse" />
                    </div>

                    <div className="space-y-6 text-lg text-[#424245] leading-relaxed max-w-xl">
                        <p>
                            I'm a full-stack architect who views code as a medium for crafting digital experiences. My work bridges the gap between raw engineering performance and fluid, human-centric design.
                        </p>
                        <p>
                            From scalable cloud infrastructure to pixel-perfect micro-interactions, I obsess over every detail of the stack.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-8 py-8 border-t border-gray-200">
                        <div>
                            <span className="block text-4xl font-black text-[#1D1D1F]">03+</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#86868B] mt-1 block">Years Exp.</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black text-[#1D1D1F]">20+</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#86868B] mt-1 block">Projects</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black text-[#1D1D1F]">100%</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#86868B] mt-1 block">Committed</span>
                        </div>
                    </div>
                </div>

                {/* Hobbies / Interests */}
                <div className="space-y-8">
                    <GSAPText
                        text="BEYOND CODE"
                        type="chars"
                        className="text-sm font-mono text-[#86868B] tracking-[0.5em] uppercase pl-1 block"
                        animation="typewriter"
                    />

                    <div ref={hobbiesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hobbies.map((hobby, index) => (
                            <div
                                key={index}
                                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${hobby.image})` }}
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-3 mb-2 text-white">
                                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                                            {hobby.icon}
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight">{hobby.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-200 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {hobby.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#86868B] group-hover:text-[#1D1D1F] transition-colors">Music</span>
                </div>
            </div>

            {/* Background Parallax Text */}
            <div className="about-bg-text absolute top-0 right-0 text-[20vw] font-black text-[#1D1D1F] opacity-[0.03] leading-none pointer-events-none select-none">
                ABOUT
            </div>
        </section>
    );
}
