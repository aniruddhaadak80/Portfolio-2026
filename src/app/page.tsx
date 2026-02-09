"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsSection from "@/components/ProjectsSection";
import TheLabSection from "@/components/TheLabSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-black text-white">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <Navigation />
          <CustomCursor />
          <div className="w-full">
            <div id="home"><Hero /></div>
            <div id="about"><AboutSection /></div>
            <div id="work"><ProjectsSection /></div>
            <div id="skills"><SkillsSection /></div>
            <div id="experience"><ExperienceTimeline /></div>
            <div id="lab"><TheLabSection /></div>
            <div id="contact"><ContactSection /></div>
          </div>
        </>
      )}
    </main>
  );
}
