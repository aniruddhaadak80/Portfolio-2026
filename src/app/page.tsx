"use client";

import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { useState } from "react";

/**
 * Hybrid Homepage:
 * Combines all sections into a continuous scroll experience
 * while separate routes still exist for deep-dives.
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="flex flex-col items-center bg-black text-white">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <Navigation />
          <CustomCursor />

          <div id="home" className="w-full h-screen flex flex-col items-center justify-center relative">
            <Hero />
          </div>

          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceTimeline />
          <ContactSection />
        </>
      )}
    </main>
  );
}
