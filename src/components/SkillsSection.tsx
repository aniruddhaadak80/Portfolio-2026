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
    { name: "React", category: "Frontend", level: 98, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", bgImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800" },
    { name: "Next.js", category: "Frontend", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", bgImage: "https://images.unsplash.com/photo-1618477247222-ac591245363d?auto=format&fit=crop&q=80&w=800" },
    { name: "TypeScript", category: "Language", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" },
    { name: "Node.js", category: "Backend", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", bgImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800" },
    { name: "Tailwind", category: "Design", level: 99, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", bgImage: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?auto=format&fit=crop&q=80&w=800" },
    { name: "PostgreSQL", category: "Database", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", bgImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800" },
    { name: "Python", category: "AI/ML", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" },
    { name: "TensorFlow", category: "AI/ML", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800" },
    { name: "Three.js", category: "3D", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", bgImage: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800" },
    { name: "Docker", category: "DevOps", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", bgImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800" },
    { name: "AWS", category: "Cloud", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
    { name: "Figma", category: "Design", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800" },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);

    useGSAP(() => {
        if (!sectionRef.current || !gridRef.current) return;

        // 1. Grid Entrance
        gsap.from(".skill-card", {
            y: 100,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
            }
        });

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
            gsap.fromTo(".skill-detail",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Grid */}
                    <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                onClick={() => setSelectedSkill(skill)}
                                className={`skill-card aspect-square rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${selectedSkill?.name === skill.name ? 'ring-2 ring-[#2997FF]' : ''}`}
                            >
                                <div className="w-10 h-10 relative group-hover:scale-110 transition-transform duration-300">
                                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Detail View (Sticky) */}
                    <div className="relative h-full min-h-[300px] flex items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-xl p-10 overflow-hidden">
                        {/* Detail Background Image */}
                        {selectedSkill && (
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-500 pointer-events-none mix-blend-multiply"
                                style={{ backgroundImage: `url(${selectedSkill.bgImage})` }}
                            />
                        )}

                        {selectedSkill ? (
                            <div className="skill-detail w-full text-center space-y-6 relative z-10">
                                <div className="w-24 h-24 mx-auto mb-4 drop-shadow-xl">
                                    <img src={selectedSkill.icon} alt={selectedSkill.name} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] to-[#2997FF]">{selectedSkill.name}</h3>
                                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden border border-gray-200">
                                    <div className="skill-progress-bar h-full bg-gradient-to-r from-[#2997FF] to-[#1D1D1F]" />
                                </div>
                                <div className="flex justify-between text-xs font-mono text-[#86868B] uppercase tracking-widest font-bold">
                                    <span>Proficiency</span>
                                    <span className="text-[#2997FF]">{selectedSkill.level}%</span>
                                </div>
                                <span className="inline-block px-4 py-1 rounded-full bg-white/50 backdrop-blur-md border border-gray-200 text-[#1D1D1F] text-xs font-black uppercase tracking-widest shadow-sm">
                                    {selectedSkill.category}
                                </span>
                            </div>
                        ) : (
                            <div className="text-center text-[#86868B] opacity-50">
                                <p className="font-mono text-sm uppercase tracking-widest">Select a node to inspect</p>
                            </div>
                        )}
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
