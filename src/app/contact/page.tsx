"use client";

import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export default function ContactPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <Navigation />
            <CustomCursor />
            <div className="pt-20">
                <ContactSection />
            </div>
        </main>
    );
}
