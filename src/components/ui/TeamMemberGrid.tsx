"use client";

import { useState } from "react";
import TeamMemberModal from "./TeamMemberModal";

type Member = { name: string; role: string; detail?: string; avatar?: string; tags?: string[]; links?: { label: string; href: string }[] };

interface TeamMemberGridProps {
    members: readonly Member[];
}

export default function TeamMemberGrid({ members }: TeamMemberGridProps) {
    const [selected, setSelected] = useState<Member | null>(null);

    return (
        <>
            <div className="flex flex-wrap justify-center gap-6">
                {members.map((member) => (
                    <button
                        key={member.name}
                        type="button"
                        onClick={() => setSelected(member)}
                        className="group relative w-44 shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-out hover:border-white/[0.12] hover:from-white/[0.06] hover:to-white/[0.02] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_30px_-12px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#0a0612] sm:w-48 md:w-52 lg:w-56"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--arcadia-magenta)]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative">
                            <div className="mx-auto mb-4 flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.02] shadow-inner transition-all duration-300 group-hover:border-white/[0.15] group-hover:shadow-[0_0_20px_-5px_rgba(99,0,96,0.15)]">
                                {member.avatar ? (
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                ) : (
                                    <span className="text-xl font-semibold tracking-tight text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                                        {member.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <h4 className="text-sm font-semibold tracking-tight text-white">{member.name}</h4>
                            <p className="mt-1 text-[11px] font-medium tracking-wide text-zinc-500">{member.role}</p>
                            {member.tags && member.tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                                    {member.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tracking-wider text-zinc-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
            <TeamMemberModal member={selected} onClose={() => setSelected(null)} />
        </>
    );
}
