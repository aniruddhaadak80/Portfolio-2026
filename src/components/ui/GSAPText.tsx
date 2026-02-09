"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface GSAPTextProps {
    text: string;
    className?: string;
    type?: "chars" | "words" | "lines"; // Note: "lines" is hard to do without the plugin, simplified here
    animation?: "fade" | "slide-up" | "typewriter" | "random";
    stagger?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    threshold?: number; // ScrollTrigger start
}

export default function GSAPText({
    text,
    className = "",
    type = "words",
    animation = "slide-up",
    stagger = 0.05,
    duration = 1,
    delay = 0,
    ease = "power3.out",
    threshold = 0.8 // top 80%
}: GSAPTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.children;

        let fromVars: gsap.TweenVars = { opacity: 0 };
        let toVars: gsap.TweenVars = {
            opacity: 1,
            duration: duration,
            ease: ease,
            stagger: stagger,
            delay: delay,
            scrollTrigger: {
                trigger: containerRef.current,
                start: `top ${threshold * 100}%`,
                toggleActions: "play none none reverse", // Replays on scroll up? or just play? Let's do reverse for dynamic feel
            }
        };

        switch (animation) {
            case "slide-up":
                fromVars = { ...fromVars, y: 50, rotationX: -90 }; // 3D feel
                toVars = { ...toVars, y: 0, rotationX: 0 };
                break;
            case "typewriter":
                fromVars = { ...fromVars, opacity: 0, scale: 0.5 };
                toVars = { ...toVars, opacity: 1, scale: 1, ease: "steps(1)" }; // Typewriter feel? steps might be too harsh for opacity, maybe just "none"
                break;
            case "random":
                fromVars = { ...fromVars, x: () => gsap.utils.random(-20, 20), y: () => gsap.utils.random(-20, 20), scale: 0 };
                toVars = { ...toVars, x: 0, y: 0, scale: 1 };
                break;
            case "fade":
            default:
                fromVars = { ...fromVars, y: 10 };
                toVars = { ...toVars, y: 0 };
                break;
        }

        gsap.fromTo(elements, fromVars, toVars);

    }, { scope: containerRef });

    // Split logic
    const words = text.split(" ");

    return (
        <span ref={containerRef} className={`inline-block ${className} perspective-1000`}>
            {type === "words" && words.map((word, i) => (
                <span key={i} className="inline-block mr-[0.2em] transform-style-3d">
                    {word}
                </span>
            ))}
            {type === "chars" && text.split("").map((char, i) => (
                <span key={i} className="inline-block transform-style-3d">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}
