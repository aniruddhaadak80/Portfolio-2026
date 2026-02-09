"use client";

import ProjectsSection from "@/components/ProjectsSection";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function WorkPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <Navigation />
            <CustomCursor />
            <div className="pt-20">
                <ProjectsSection />
            </div>
        </main>
    );
}
