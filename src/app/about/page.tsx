"use client";

import AboutSection from "@/components/AboutSection";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function AboutPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <Navigation />
            <CustomCursor />
            <div className="pt-20">
                <AboutSection />
                {/* Expanded content will go here in next steps */}
            </div>
        </main>
    );
}
