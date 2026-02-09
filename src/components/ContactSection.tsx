"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GSAPText from "./ui/GSAPText";
import MagneticButton from "./ui/MagneticButton";
import {
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin,
    Send
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const contactInfoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // 1. Staggered Entrance for Contact Info
        if (contactInfoRef.current) {
            const elements = contactInfoRef.current.children;
            gsap.fromTo(elements,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: contactInfoRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        // 2. Form Reveal
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 75%",
                    }
                }
            );
        }

    }, { scope: sectionRef });

    const socialLinks = [
        { name: "GitHub", icon: <Github className="w-6 h-6" />, url: "https://github.com/aniruddhaadak80" },
        { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, url: "https://www.linkedin.com/in/aniruddha-adak-860600259/" },
        { name: "Twitter", icon: <Twitter className="w-6 h-6" />, url: "https://x.com/AniruddhaAdak" },
        { name: "Instagram", icon: <Instagram className="w-6 h-6" />, url: "https://www.instagram.com/_aniruddha_adak_?igsh=MWpyd2l3a21wYzJqaA==" },
    ];

    return (
        <section ref={sectionRef} id="contact" className="min-h-screen w-full bg-[#FCFAF2] py-32 px-6 relative overflow-hidden flex items-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Contact Info */}
                <div ref={contactInfoRef} className="space-y-12">
                    <div>
                        <GSAPText
                            text="INITIATE PROTOCOL"
                            type="chars"
                            className="text-sm font-mono text-[#86868B] tracking-[0.5em] uppercase pl-1 block mb-4"
                            animation="typewriter"
                        />
                        <GSAPText
                            text="LET'S TALK"
                            type="chars"
                            className="text-7xl md:text-9xl font-black text-[#1D1D1F] tracking-tighter leading-none"
                            animation="slide-up"
                        />
                    </div>

                    <p className="text-xl md:text-2xl text-[#86868B] leading-relaxed max-w-md">
                        Have a complex problem? I build elegant solutions. Let's architect the future together.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-[#1D1D1F] group cursor-pointer">
                            <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-[#2997FF] group-hover:text-white transition-colors">
                                <Mail className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">contact@aniruddha.dev</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#1D1D1F] group cursor-pointer">
                            <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-[#34C759] group-hover:text-white transition-colors">
                                <Phone className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#1D1D1F] group cursor-pointer">
                            <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-[#FF2D55] group-hover:text-white transition-colors">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">Kolkata, India</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                        {socialLinks.map((social) => (
                            <MagneticButton
                                key={social.name}
                                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-xl text-[#1D1D1F] hover:text-[#2997FF] transition-all border border-gray-100"
                                onClick={() => window.open(social.url, '_blank')}
                            >
                                {social.icon}
                            </MagneticButton>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <form ref={formRef} className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8 relative overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000")' }}
                    />
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[#86868B]">Identity</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-[#F5F5F7] border-none rounded-2xl px-6 py-4 text-lg font-bold text-[#1D1D1F] focus:ring-2 focus:ring-[#2997FF] focus:bg-white transition-all outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[#86868B]">Coordinates</label>
                        <input type="email" placeholder="john@example.com" className="w-full bg-[#F5F5F7] border-none rounded-2xl px-6 py-4 text-lg font-bold text-[#1D1D1F] focus:ring-2 focus:ring-[#2997FF] focus:bg-white transition-all outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-[#86868B]">Transmission</label>
                        <textarea rows={4} placeholder="Project details..." className="w-full bg-[#F5F5F7] border-none rounded-2xl px-6 py-4 text-lg font-bold text-[#1D1D1F] focus:ring-2 focus:ring-[#2997FF] focus:bg-white transition-all outline-none resize-none" />
                    </div>

                    <MagneticButton strength={0.2} type="submit" className="w-full py-5 bg-[#1D1D1F] text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#2997FF] transition-colors flex items-center justify-center gap-3">
                        <span>Send Transmission</span>
                        <Send className="w-5 h-5" />
                    </MagneticButton>
                </form>
            </div>
        </section>
    );
}

