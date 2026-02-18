"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS, SCROLL_SECTION, SECTION_HEADERS } from "@/lib/constants";

function extractYoutubeVideoId(href: string): string | null {
    const patterns = [/[?&]v=([^&]+)/, /youtu\.be\/([^/?]+)/, /embed\/([^/?]+)/];
    for (const re of patterns) {
        const m = href.match(re);
        if (m) return m[1];
    }
    return null;
}

function getThumbnailUrl(links: readonly { href: string }[]): string | null {
    for (const link of links) {
        if (!link.href.includes("youtube") && !link.href.includes("youtu.be")) continue;
        const id = extractYoutubeVideoId(link.href);
        if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    return null;
}

const AUTO_INTERVAL = 4000;
const CARD_WIDTH = 280;
const CARD_GAP = 16;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const WHEEL_THRESHOLD = 50;
const WHEEL_COOLDOWN = 400;

export default function Projects() {
    const [index, setIndex] = useState(0);
    const wheelAccum = useRef(0);
    const lastWheelTime = useRef(0);

    const goNext = useCallback(() => setIndex((i) => (i + 1) % PROJECTS.length), []);
    const goPrev = useCallback(() => setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length), []);

    const carouselRef = useRef<HTMLDivElement>(null);

    const onWheel = useCallback(
        (e: WheelEvent) => {
            const now = Date.now();
            if (now - lastWheelTime.current < WHEEL_COOLDOWN) {
                e.preventDefault();
                return;
            }
            const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
            wheelAccum.current += delta;
            if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
                e.preventDefault();
                lastWheelTime.current = now;
                if (wheelAccum.current > 0) goNext();
                else goPrev();
                wheelAccum.current = 0;
            }
        },
        [goNext, goPrev]
    );

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [onWheel]);

    useEffect(() => {
        const id = setInterval(goNext, AUTO_INTERVAL);
        return () => clearInterval(id);
    }, [goNext]);

    return (
        <section id="projects" className={`relative py-16 md:py-20 ${SCROLL_SECTION}`}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <Container>
                <SectionHeader label={SECTION_HEADERS.projects.label} title={SECTION_HEADERS.projects.title} />
                <div className="relative -mx-4 md:-mx-6">
                    <div ref={carouselRef} className="relative overflow-hidden px-4 md:px-6">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0a0612] to-transparent" aria-hidden />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0a0612] to-transparent" aria-hidden />
                        <div
                            className="flex gap-4 transition-transform duration-500 ease-out"
                            style={{
                                paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
                                paddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`,
                                transform: `translateX(-${index * CARD_STEP}px)`,
                            }}
                        >
                            {PROJECTS.map((project, i) => {
                                const thumbnailUrl = getThumbnailUrl(project.links);
                                const isCenter = i === index;
                                return (
                                    <div key={project.title} className="shrink-0" style={{ width: CARD_WIDTH }}>
                                        <div
                                            className={`group origin-center overflow-hidden rounded-xl border bg-white/[0.02] transition-all duration-500 ease-out hover:border-white/10 hover:bg-white/[0.04] ${
                                                isCenter ? "scale-100 border-white/15 opacity-100" : "scale-90 border-white/5 opacity-60"
                                            }`}
                                        >
                                            <div className="relative aspect-video w-full bg-white/5">
                                                {thumbnailUrl ? (
                                                    <Image
                                                        src={thumbnailUrl}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        sizes="(max-width: 640px) 100vw, 448px"
                                                        unoptimized
                                                        draggable={false}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/images/arcadia_banner.png"
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                                                        sizes="(max-width: 640px) 100vw, 448px"
                                                        draggable={false}
                                                    />
                                                )}
                                            </div>
                                            <div className="p-4 text-center">
                                                <h3 className="text-sm font-semibold text-white truncate">{project.title}</h3>
                                                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 line-clamp-2">{project.desc}</p>
                                                {project.links.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                                                        {project.links.map((link) => (
                                                            <a
                                                                key={link.label}
                                                                href={link.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                                                                aria-label={`${project.title} ${link.label} 보기`}
                                                            >
                                                                <Image src={link.icon} alt="" width={16} height={16} className="h-4 w-4 opacity-70" draggable={false} />
                                                                {link.label}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="이전 프로젝트"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="다음 프로젝트"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="mt-4 flex justify-center gap-1.5">
                        {PROJECTS.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === index ? "w-6 bg-white/80" : "w-1.5 bg-white/30 hover:bg-white/50"
                                }`}
                                aria-label={`프로젝트 ${i + 1}로 이동`}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
