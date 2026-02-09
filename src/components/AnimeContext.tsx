"use client";

import React, { createContext, useContext, useRef } from "react";
import { JSAnimation } from "animejs/animation";

interface AnimeContextType {
    register: (id: string, instance: JSAnimation) => void;
    play: (id: string) => void;
    pause: (id: string) => void;
}

const AnimeContext = createContext<AnimeContextType | null>(null);

export const useAnime = () => {
    const context = useContext(AnimeContext);
    if (!context) {
        throw new Error("useAnime must be used within an AnimeProvider");
    }
    return context;
};

export const AnimeProvider = ({ children }: { children: React.ReactNode }) => {
    const registry = useRef<Map<string, JSAnimation>>(new Map());

    const register = (id: string, instance: JSAnimation) => {
        registry.current.set(id, instance);
    };

    const play = (id: string) => {
        const instance = registry.current.get(id);
        if (instance) instance.play();
    };

    const pause = (id: string) => {
        const instance = registry.current.get(id);
        if (instance) instance.pause();
    };

    return (
        <AnimeContext.Provider value={{ register, play, pause }}>
            {children}
        </AnimeContext.Provider>
    );
};
