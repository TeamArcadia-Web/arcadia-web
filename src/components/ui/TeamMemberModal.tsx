"use client";

import { useEffect, useState } from "react";

type Member = { name: string; role: string; detail?: string; avatar?: string; tags?: string[]; links?: { label: string; href: string }[] };

interface TeamMemberModalProps {
    member: Member | null;
    onClose: () => void;
}

/* 열릴 때: 천천히 / 닫힐 때: 유지 */
const BACKDROP_OPEN_MS = 520;
const BACKDROP_CLOSE_MS = 380;
const MODAL_OPEN_MS = 820;
const MODAL_CLOSE_MS = 480;
const MODAL_OPEN_DELAY_MS = 100;
const EASE_OUT = "cubic-bezier(0.33, 1, 0.68, 1)";
const EASE_OPEN = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const EASE_CLOSE = "cubic-bezier(0.4, 0, 0.6, 1)";
const STAGGER_MS = 100;
const ITEM_ANIM_MS = 560;

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
        }, MODAL_CLOSE_MS + 120);
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

    const modalEntered = isEntered && !isExiting;
    const avatarDelay = 0;
    const headerDelay = STAGGER_MS;
    const tagsDelay = STAGGER_MS * 2;
    const bioDelay = STAGGER_MS * 3;
    const linksDelay = STAGGER_MS * 4;

    const itemStyle = (delay: number) => ({
        opacity: modalEntered ? 1 : 0,
        transform: modalEntered ? "translateY(0)" : "translateY(18px)",
        transition: `opacity ${ITEM_ANIM_MS}ms ${EASE_OUT} ${delay}ms, transform ${ITEM_ANIM_MS}ms ${EASE_OUT} ${delay}ms`,
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            <div
                className="absolute inset-0 bg-[#0a0612]/85 backdrop-blur-sm"
                style={{
                    opacity: isExiting ? 0 : isEntered ? 1 : 0,
                    transition: `opacity ${isExiting ? BACKDROP_CLOSE_MS : BACKDROP_OPEN_MS}ms ${isExiting ? EASE_CLOSE : EASE_OUT}`,
                }}
            />
            <div
                className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c0a12] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_64px_-16px_rgba(0,0,0,0.6)]"
                onClick={(e) => e.stopPropagation()}
                style={{
                    opacity: isExiting ? 0 : isEntered ? 1 : 0,
                    transform: isExiting
                        ? "scale(0.96) translateY(16px)"
                        : isEntered
                          ? "scale(1) translateY(0)"
                          : "scale(0.94) translateY(48px)",
                    transition: `opacity ${isExiting ? MODAL_CLOSE_MS : MODAL_OPEN_MS}ms ${isExiting ? EASE_CLOSE : EASE_OPEN} ${isExiting ? 0 : MODAL_OPEN_DELAY_MS}ms, transform ${isExiting ? MODAL_CLOSE_MS : MODAL_OPEN_MS}ms ${isExiting ? EASE_CLOSE : EASE_OPEN} ${isExiting ? 0 : MODAL_OPEN_DELAY_MS}ms`,
                }}
            >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                <div className="relative p-8 pt-12 pb-8">
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/[0.1] ring-offset-2 ring-offset-[#0c0a12]"
                            style={itemStyle(avatarDelay)}
                        >
                            {displayMember.avatar ? (
                                <img
                                    src={displayMember.avatar}
                                    alt={displayMember.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-4xl font-semibold tracking-tight text-zinc-500">
                                    {displayMember.name.charAt(0)}
                                </span>
                            )}
                        </div>
                        <div className="mt-6 min-w-0 flex-1" style={itemStyle(headerDelay)}>
                            <h3 id="modal-title" className="text-2xl font-bold tracking-tight text-white">
                                {displayMember.name}
                            </h3>
                            <span className="mt-2.5 inline-block rounded-full border border-white/[0.1] bg-white/[0.05] px-3.5 py-1 text-xs font-medium tracking-wide text-zinc-400">
                                {displayMember.role}
                            </span>
                            {displayMember.tags && displayMember.tags.length > 0 && (
                                <div className="mt-5 flex flex-wrap justify-center gap-2" style={itemStyle(tagsDelay)}>
                                    {displayMember.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-lg bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium tracking-wider text-zinc-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {displayMember.detail && (
                        <div
                            className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6"
                            style={itemStyle(bioDelay)}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">Bio</p>
                            <p className="mt-3.5 text-[15px] leading-[1.75] text-zinc-400">{displayMember.detail}</p>
                        </div>
                    )}

                    {displayMember.links && displayMember.links.length > 0 && (
                        <div className="mt-8 flex flex-wrap justify-center gap-3" style={itemStyle(linksDelay)}>
                            {displayMember.links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/[0.18] hover:bg-white/[0.08]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
