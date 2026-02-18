"use client";

import { useEffect, useState } from "react";
import { DISCORD_INVITE } from "@/lib/constants";

interface DiscordMemberCountProps {
    initialCount: number | null;
}

export default function DiscordMemberCount({ initialCount }: DiscordMemberCountProps) {
    const [count, setCount] = useState<number | null>(initialCount);

    useEffect(() => {
        if (initialCount != null) return;
        const controller = new AbortController();
        fetch(
            `https://discord.com/api/v10/invites/${DISCORD_INVITE.inviteCode}?with_counts=true`,
            { signal: controller.signal }
        )
            .then((res) => (res.ok ? res.json() : null))
            .then((data: { approximate_member_count?: number } | null) => {
                if (data?.approximate_member_count != null) {
                    setCount(data.approximate_member_count);
                }
            })
            .catch(() => {});
        return () => controller.abort();
    }, [initialCount]);

    if (count == null) return null;

    return (
        <span className="group flex cursor-default items-center gap-1.5 text-[10px] text-zinc-600 md:text-xs">
            <span className="h-1 w-1 rounded-full bg-zinc-500" aria-hidden />
            {count.toLocaleString()}
        </span>
    );
}
