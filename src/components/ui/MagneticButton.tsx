"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the pull is
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
    children,
    className = "",
    strength = 0.5,
    onClick,
    type = "button"
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null); // Animate content separately for parallax

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * strength;
        const y = (e.clientY - top - height / 2) * strength;

        gsap.to(buttonRef.current, {
            x: x,
            y: y,
            duration: 0.8,
            ease: "power4.out" // Smooth magnetic feel
        });

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                x: x * 0.5, // Parallax lag works best
                y: y * 0.5,
                duration: 0.8,
                ease: "power4.out"
            });
        }
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current) return;
        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)" // Elastic snap back
        });

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.3)"
            });
        }
    };

    return (
        <button
            ref={buttonRef}
            type={type}
            className={`relative inline-flex items-center justify-center ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <span ref={contentRef} className="relative z-10 pointer-events-none inline-block">
                {children}
            </span>
        </button>
    );
}
