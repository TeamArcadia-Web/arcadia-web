"use client";

import { useEffect } from "react";

export default function ScrollAnimationController() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-animate]");
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    }
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0 }
        );

        els.forEach((el) => observer.observe(el));
        return () => els.forEach((el) => observer.unobserve(el));
    }, []);

    return null;
}
