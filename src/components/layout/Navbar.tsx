"use client";

import { useEffect, useState } from "react";
import { blackOpsOne } from "@/app/font";
import { NAV_ITEMS } from "@/lib/constants";

const navItems = NAV_ITEMS.map(({ label, href }) => ({ label, href }));

const SCROLL_THRESHOLD = 60;

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* 데스크톱: 고정 세로 사이드바 */}
            <aside className="hidden lg:block fixed left-0 top-1/2 z-50 w-[84px] -translate-y-1/2 select-none">
                <div className="flex flex-col gap-4 rounded-r-2xl border border-l-0 border-white/10 bg-black/10 py-6 backdrop-blur-md">
                    <a
                        href="#top"
                        className="flex shrink-0 items-center justify-center px-4 hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="/icons/arcadia_logo.svg"
                            className="h-7 w-7 opacity-90"
                            alt="Arcadia Logo"
                        />
                    </a>

                    <nav className="flex flex-col items-center gap-4 px-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-[11px] tracking-[0.2em] text-white/85 hover:text-white transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex flex-col items-center gap-2 border-t border-white/10 pt-4 px-4">
                        <div
                            className="rotate-180 [writing-mode:vertical-rl] text-[9px] tracking-[0.3em] text-white/50"
                            aria-hidden
                        >
                            TEAM ARCADIA
                        </div>
                        <span className="text-[8px] text-white/40 tracking-[0.2em]">ARC</span>
                    </div>
                </div>
            </aside>

            {/* 모바일: 스크롤 시 네비바 줄어들고 햄버거로 자연스럽게 전환 */}
            <header
                className={`lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b backdrop-blur-md px-4 select-none transition-all duration-300 ease-out ${
                    scrolled
                        ? "h-12 bg-black/20 border-white/10"
                        : "h-16 bg-transparent border-transparent"
                }`}
            >
                <a
                    href="#top"
                    className={`flex items-center shrink-0 transition-all duration-300 ease-out ${
                        scrolled ? "scale-90 gap-0" : "scale-100 gap-2"
                    }`}
                >
                    <img
                        src="/icons/arcadia_logo.svg"
                        className="h-6 w-6 shrink-0 opacity-90"
                        alt="Arcadia Logo"
                    />
                    <span
                        className={`${blackOpsOne.className} flex items-center overflow-hidden text-lg tracking-wide text-white leading-none transition-all duration-300 ease-out origin-left`}
                        style={{
                            height: 24,
                            maxWidth: scrolled ? 0 : 120,
                            opacity: scrolled ? 0 : 1,
                        }}
                    >
                        ARCADIA
                    </span>
                </a>

                <div className="relative flex h-10 w-10 shrink-0 items-center justify-end">
                    <nav
                        className={`absolute right-0 flex items-center gap-4 transition-all duration-300 ease-out ${
                            scrolled
                                ? "pointer-events-none translate-x-3 opacity-0"
                                : "translate-x-0 opacity-100"
                        }`}
                        aria-label="메인 메뉴"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-[12px] tracking-[0.15em] text-white/90 hover:text-white whitespace-nowrap transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className={`absolute right-0 flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300 ease-out ${
                            scrolled
                                ? "pointer-events-auto translate-x-0 opacity-100"
                                : "pointer-events-none -translate-x-3 opacity-0"
                        }`}
                        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                        aria-expanded={open}
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {open ? (
                                <>
                                    <path d="M18 6L6 18" />
                                    <path d="M6 6l12 12" />
                                </>
                            ) : (
                                <>
                                    <path d="M4 6h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 18h16" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* 모바일: 오버레이 메뉴 */}
            <div
                className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            />
            <nav
                className={`lg:hidden fixed top-12 right-0 bottom-0 z-40 w-[min(280px,85vw)] flex flex-col gap-1 bg-zinc-900/95 backdrop-blur-md border-l border-white/10 p-6 transition-transform duration-300 ease-out ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
                aria-label="메인 메뉴"
            >
                {navItems.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 px-4 text-base tracking-[0.15em] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {item.label}
                    </a>
                ))}
                <div className="mt-auto pt-6 border-t border-white/10">
                    <span className="text-[10px] text-white/60 tracking-[0.3em]">TEAM ARCADIA</span>
                </div>
            </nav>
        </>
    );
}
