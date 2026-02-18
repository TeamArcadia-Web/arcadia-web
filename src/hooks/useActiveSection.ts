"use client";

import { useEffect, useRef, useState } from "react";
import { SECTION_IDS } from "@/lib/constants";

export function useActiveSection() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const visibilityRef = useRef<Record<string, number>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibilityRef.current[entry.target.id] = entry.intersectionRatio;
                });
                let maxRatio = 0;
                let maxId: string | null = null;
                SECTION_IDS.forEach((id) => {
                    const ratio = visibilityRef.current[id] ?? 0;
                    if (ratio > maxRatio) {
                        maxRatio = ratio;
                        maxId = id;
                    }
                });
                setActiveId(maxRatio > 0.1 ? maxId : null);
            },
            { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1], rootMargin: "-20% 0px -20% 0px" }
        );

        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return activeId;
}
