"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GSAPText from "./ui/GSAPText";

gsap.registerPlugin(ScrollTrigger);

// Stage 9: Hyper-Staggered Skills Grid
// Features: Staggered Entrance, Hover Focus, Detail Reveal, Tech Soup Background

const skills = [
    { name: "React", category: "Frontend", level: 98, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", bgImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800", color: "#61DAFB" },
    { name: "Next.js", category: "Frontend", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", bgImage: "https://images.unsplash.com/photo-1618477247222-ac591245363d?auto=format&fit=crop&q=80&w=800", color: "#000000" },
    { name: "TypeScript", category: "Language", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800", color: "#3178C6" },
    { name: "Node.js", category: "Backend", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", bgImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800", color: "#339933" },
    { name: "Tailwind", category: "Design", level: 99, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", bgImage: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?auto=format&fit=crop&q=80&w=800", color: "#06B6D4" },
    { name: "PostgreSQL", category: "Database", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", bgImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800", color: "#4169E1" },
    { name: "Python", category: "AI/ML", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800", color: "#3776AB" },
    { name: "TensorFlow", category: "AI/ML", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800", color: "#FF6F00" },
    { name: "Three.js", category: "3D", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", bgImage: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800", color: "#000000" },
    { name: "Docker", category: "DevOps", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", bgImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800", color: "#2496ED" },
    { name: "AWS", category: "Cloud", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", color: "#FF9900" },
    { name: "Figma", category: "Design", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", color: "#F24E1E" },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(skills[0]); // Default select first

    useGSAP(() => {
        if (!sectionRef.current || !gridRef.current) return;

        // 1. List Entrance - REMOVED for visibility
        // Items are now static and fully visible by default.

        // 2. Tech Soup Parallax (Background Elements)
        gsap.to(".tech-soup-item", {
            y: -100,
            rotation: 360,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

    }, { scope: sectionRef });

    // Animate selection detail
    useGSAP(() => {
        if (selectedSkill) {
            gsap.fromTo(".skill-detail-content",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
            );
            gsap.fromTo(".skill-progress-bar",
                { width: "0%" },
                { width: `${selectedSkill.level}%`, duration: 1, ease: "power3.out" }
            );
        }
    }, [selectedSkill]);

    return (
        <section ref={sectionRef} id="skills" className="min-h-screen w-full bg-[#FCFAF2] py-32 relative overflow-hidden flex flex-col items-center">
            {/* Core Engine Background Image */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000")' }}
            />

            {/* Tech Soup Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
                {skills.map((s, i) => (
                    <div
                        key={i}
                        className="tech-soup-item absolute select-none opacity-50"
                        style={{
                            left: `${(i * 15) % 100}%`,
                            top: `${(i * 20) % 100}%`,
                        }}
                    >
                        <img src={s.icon} alt={s.name} className="w-16 h-16 grayscale opacity-50" />
                    </div>
                ))}
            </div>

            <div className="max-w-7xl w-full px-6 relative z-10">
                <div className="text-center mb-20">
                    <GSAPText
                        text="CORE ENGINE"
                        type="chars"
                        className="text-7xl md:text-9xl font-black text-[#1D1D1F] tracking-tighter mb-4"
                        animation="slide-up"
                    />
                    <div className="flex justify-center">
                        <GSAPText
                            text="Technical Arsenal & Proficiency Matrix"
                            type="words"
                            className="text-[#86868B] font-mono tracking-widest text-sm uppercase"
                            animation="fade"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Skills List */}
                    <div ref={gridRef} className="lg:col-span-4 flex flex-col gap-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                onClick={() => setSelectedSkill(skill)}
                                className={`skill-item flex-shrink-0 p-4 rounded-2xl transition-all cursor-pointer flex items-center gap-4 group border border-gray-200 hover:border-gray-300 ${selectedSkill?.name === skill.name
                                    ? 'bg-white shadow-lg scale-105'
                                    : 'bg-white hover:bg-white hover:shadow-sm'
                                    }`}
                                style={{
                                    borderColor: selectedSkill?.name === skill.name ? skill.color : ''
                                }}
                            >
                                <div className="w-10 h-10 relative group-hover:scale-110 transition-transform duration-300">
                                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                                </div>
                                <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${selectedSkill?.name === skill.name ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>
                                    {skill.name}
                                </span>
                                {selectedSkill?.name === skill.name && (
                                    <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: skill.color }} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Detail View (Big Card) */}
                    <div className="lg:col-span-8 sticky top-32 h-[600px]">
                        <div className="relative w-full h-full bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden flex items-center justify-center p-12 lg:p-20">
                            {selectedSkill ? (
                                <>
                                    {/* Dynamic Background */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-500 pointer-events-none grayscale-[20%]"
                                        style={{ backgroundImage: `url(${selectedSkill.bgImage})` }}
                                    />
                                    {/* Color Glow Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-20 transition-colors duration-500 mix-blend-overlay"
                                        style={{ backgroundColor: selectedSkill.color }}
                                    />

                                    <div className="skill-detail-content relative z-10 w-full max-w-lg text-center space-y-10 bg-white/80 backdrop-blur-xl p-12 rounded-[2rem] shadow-sm border border-white/50">

                                        {/* Logo with Glow */}
                                        <div className="relative inline-block">
                                            <div
                                                className="absolute inset-0 blur-2xl opacity-40 rounded-full"
                                                style={{ backgroundColor: selectedSkill.color }}
                                            />
                                            <div className="w-32 h-32 relative z-10 drop-shadow-2xl">
                                                <img src={selectedSkill.icon} alt={selectedSkill.name} className="w-full h-full object-contain" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-6xl font-black text-[#1D1D1F] tracking-tight">{selectedSkill.name}</h3>
                                            <span
                                                className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border"
                                                style={{ borderColor: selectedSkill.color, color: selectedSkill.color, backgroundColor: `${selectedSkill.color}10` }}
                                            >
                                                {selectedSkill.category}
                                            </span>
                                        </div>

                                        <div className="w-full space-y-2">
                                            <div className="flex justify-between text-xs font-mono text-[#86868B] uppercase tracking-widest font-bold">
                                                <span>Proficiency Matrix</span>
                                                <span style={{ color: selectedSkill.color }}>{selectedSkill.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden border border-gray-200 p-1">
                                                <div
                                                    className="skill-progress-bar h-full rounded-full"
                                                    style={{ backgroundColor: selectedSkill.color }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrolling Banner */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-[#1D1D1F] py-4 -rotate-2 origin-left">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="text-white text-2xl font-black uppercase mx-8 italic">
                            100% Performance • Scalable Systems • Cloud Native • AI Integrated
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
