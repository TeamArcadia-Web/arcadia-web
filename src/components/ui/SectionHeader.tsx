"use client";

import { useInView } from "@/hooks/useInView";

interface SectionHeaderProps {
    label: string;
    title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
    const { ref, inView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -30px 0px", triggerOnce: false });

    return (
        <div
            ref={ref}
            className={`mb-14 md:mb-20 text-center transition-all duration-1000 ease-out ${
                inView
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-10 scale-[0.98] opacity-0"
            }`}
        >
            <p
                className={`mb-3 text-[11px] font-bold uppercase text-zinc-400 transition-[letter-spacing] duration-1000 ease-out ${
                    inView ? "tracking-[0.25em] mr-[-0.25em]" : "tracking-tight"
                }`}
            >
                {label}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
            <div className="mx-auto mt-6 h-px w-12 bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />
        </div>
    );
}
