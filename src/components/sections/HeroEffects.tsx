"use client";

import { useEffect, useState } from "react";

const PARTICLE_COUNT = 24;

export default function HeroEffects() {
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <>
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(
                        600px 400px at ${mouse.x * 100}% ${mouse.y * 100}%,
                        rgba(99, 0, 96, 0.12) 0%,
                        rgba(18, 4, 68, 0.06) 40%,
                        transparent 70%
                    )`,
                }}
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-white/20"
                        style={{
                            left: `${(i * 7 + 13) % 100}%`,
                            top: `${(i * 11 + 17) % 100}%`,
                            animation: `float ${8 + (i % 5)}s ease-in-out infinite`,
                            animationDelay: `${(i * 0.3) % 4}s`,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
