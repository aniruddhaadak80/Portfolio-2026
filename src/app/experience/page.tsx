"use client";

import ExperienceTimeline from "@/components/ExperienceTimeline";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function ExperiencePage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <Navigation />
            <CustomCursor />
            <div className="pt-20">
                <ExperienceTimeline />
            </div>
        </main>
    );
}
