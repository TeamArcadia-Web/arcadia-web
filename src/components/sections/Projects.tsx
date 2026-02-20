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
        if (id) return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
    }
    return null;
}

const AUTO_INTERVAL = 4000;
const CARD_WIDTH = 260;
const CARD_GAP = 14;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const WHEEL_THRESHOLD = 50;
const WHEEL_COOLDOWN = 400;
const FALLBACK_IMAGE = "/images/arcadia_banner.png";

type ProjectItem = (typeof PROJECTS)[number];

export default function Projects() {
    const [index, setIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
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

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section id="projects" className={`relative py-16 md:py-20 ${SCROLL_SECTION}`}>
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
                            {PROJECTS.map((project) => {
                                const thumbnailUrl = getThumbnailUrl(project.links);
                                return (
                                    <div
                                        key={project.title}
                                        className="h-[234px] shrink-0 cursor-pointer"
                                        style={{ width: CARD_WIDTH }}
                                        onClick={() => setSelectedProject(project)}
                                        onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${project.title} 자세히 보기`}
                                    >
                                        <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] shadow-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]">
                                            <div className="relative aspect-video w-full shrink-0 bg-white/[0.04]">
                                                <Image
                                                    src={thumbnailUrl ?? FALLBACK_IMAGE}
                                                    alt=""
                                                    fill
                                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                                    sizes="260px"
                                                    unoptimized={!!thumbnailUrl}
                                                />
                                            </div>
                                            <div className="flex min-h-0 flex-1 flex-col justify-between px-3.5 py-3">
                                                <div>
                                                    <h3 className="text-[13px] font-semibold tracking-tight text-white line-clamp-1">
                                                        {project.title}
                                                    </h3>
                                                    <p className="mt-1 text-[11px] leading-snug text-zinc-500 line-clamp-2">
                                                        {project.desc}
                                                    </p>
                                                </div>
                                                {project.links.length > 0 && (
                                                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-0.5" onClick={(e) => e.stopPropagation()}>
                                                        {project.links.map((link) => (
                                                            <a
                                                                key={link.href + link.label}
                                                                href={link.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-300"
                                                            >
                                                                {link.icon && (
                                                                    <Image src={link.icon} alt="" width={12} height={12} className="h-3 w-3 opacity-75" />
                                                                )}
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
                        className="absolute left-0 top-1/2 z-20 flex h-12 w-8 -translate-y-1/2 items-center justify-center text-white/25 transition-colors hover:text-white/50 md:w-10"
                        aria-label="이전 프로젝트"
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-0 top-1/2 z-20 flex h-12 w-8 -translate-y-1/2 items-center justify-center text-white/25 transition-colors hover:text-white/50 md:w-10"
                        aria-label="다음 프로젝트"
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    aria-modal
                    aria-labelledby="project-modal-title"
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                        aria-hidden
                    />
                    <div
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0e0a14] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative aspect-video w-full bg-white/[0.04]">
                            <Image
                                src={getThumbnailUrl(selectedProject.links) ?? FALLBACK_IMAGE}
                                alt=""
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 28rem) 100vw, 28rem"
                                unoptimized={!!getThumbnailUrl(selectedProject.links)}
                            />
                        </div>
                        <div className="p-5">
                            <h2 id="project-modal-title" className="text-lg font-semibold tracking-tight text-white">
                                {selectedProject.title}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                {selectedProject.desc}
                            </p>
                            {selectedProject.links.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {selectedProject.links.map((link) => (
                                        <a
                                            key={link.href + link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                                        >
                                            {link.icon && (
                                                <Image src={link.icon} alt="" width={18} height={18} className="h-4 w-4 opacity-90" />
                                            )}
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => setSelectedProject(null)}
                            className="absolute right-3 top-3 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="닫기"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
