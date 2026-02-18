"use client";

import { useEffect, useState } from "react";

type Member = { name: string; role: string; detail?: string; avatar?: string; tags?: string[]; links?: { label: string; href: string }[] };

interface TeamMemberModalProps {
    member: Member | null;
    onClose: () => void;
}

const DURATION = 320;
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
    const [closingMember, setClosingMember] = useState<Member | null>(null);
    const [isExiting, setIsExiting] = useState(false);
    const [isEntered, setIsEntered] = useState(false);
    const displayMember = member ?? closingMember;

    const handleClose = () => {
        if (!displayMember) return;
        setIsExiting(true);
        setClosingMember(displayMember);
        onClose();
    };

    useEffect(() => {
        if (member) {
            setClosingMember(null);
            setIsExiting(false);
            setIsEntered(false);
            const t = requestAnimationFrame(() => {
                requestAnimationFrame(() => setIsEntered(true));
            });
            return () => cancelAnimationFrame(t);
        }
    }, [member]);

    useEffect(() => {
        if (!isExiting) return;
        const t = setTimeout(() => {
            setClosingMember(null);
            setIsExiting(false);
        }, DURATION + 20);
        return () => clearTimeout(t);
    }, [isExiting]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [displayMember]);

    useEffect(() => {
        if (displayMember) document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [displayMember]);

    if (!displayMember) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                style={{
                    opacity: isExiting ? 0 : isEntered ? 1 : 0,
                    transition: `opacity ${DURATION}ms ${EASE}`,
                }}
            />
            <div
                className="relative w-full max-w-lg overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                    opacity: isExiting ? 0 : isEntered ? 1 : 0,
                    transform: isExiting ? "scale(0.97) translateY(12px)" : isEntered ? "scale(1) translateY(0)" : "scale(0.97) translateY(12px)",
                    transition: `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`,
                    boxShadow: isExiting
                        ? "none"
                        : "0 0 0 1px rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.2), 0 32px 64px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,0,96,0.08)",
                }}
            >
                <div className="border border-white/[0.08] bg-zinc-950/98">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-zinc-950/50 pointer-events-none" />
                    <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <button
                        type="button"
                        onClick={handleClose}
                        className="absolute right-5 top-5 z-10 rounded-full p-2.5 text-zinc-400 transition-all duration-200 hover:bg-white/10 hover:text-white"
                        aria-label="닫기"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative p-8 pt-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                                {displayMember.avatar ? (
                                    <img
                                        src={displayMember.avatar}
                                        alt={displayMember.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl font-semibold tracking-tight text-zinc-500">
                                        {displayMember.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <div className="mt-5 min-w-0 flex-1">
                                <h3 id="modal-title" className="text-2xl font-semibold tracking-tight text-white">
                                    {displayMember.name}
                                </h3>
                                <p className="mt-2 text-sm font-medium tracking-wide text-zinc-500">
                                    {displayMember.role}
                                </p>
                                {displayMember.tags && displayMember.tags.length > 0 && (
                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        {displayMember.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium tracking-wider text-zinc-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {displayMember.detail && (
                            <div className="mt-8 border-t border-white/[0.06] pt-8">
                                <p className="text-[10px] font-bold tracking-wide text-zinc-500">Bio</p>
                                <p className="mt-4 text-[15px] leading-[1.7] text-zinc-400">{displayMember.detail}</p>
                            </div>
                        )}

                        {displayMember.links && displayMember.links.length > 0 && (
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                {displayMember.links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
