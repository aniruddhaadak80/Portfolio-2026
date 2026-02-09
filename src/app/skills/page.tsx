"use client";

import SkillsSection from "@/components/SkillsSection";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function SkillsPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <Navigation />
            <CustomCursor />
            <div className="pt-20">
                <SkillsSection />
            </div>
        </main>
    );
}
