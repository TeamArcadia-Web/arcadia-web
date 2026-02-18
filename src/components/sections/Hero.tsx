import Image from "next/image";
import { blackOpsOne } from "@/lib/font";
import { DISCORD_INVITE, HERO_TAGLINE, LOGO_PATHS, SITE_NAME } from "@/lib/constants";
import DiscordMemberCount from "@/components/ui/DiscordMemberCount";
import HeroEffects from "./HeroEffects";

async function fetchMemberCountAtBuild(): Promise<number | null> {
    try {
        const res = await fetch(
            `https://discord.com/api/v10/invites/${DISCORD_INVITE.inviteCode}?with_counts=true`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        const data = (await res.json()) as { approximate_member_count?: number };
        return data.approximate_member_count ?? null;
    } catch {
        return null;
    }
}

export default async function Hero() {
    const initialMemberCount = await fetchMemberCountAtBuild();
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0612]">
            <HeroEffects />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120444]/30 via-transparent to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[55%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#630060]/15 blur-[100px]" />
            <div className="relative flex flex-col items-center px-6 text-center">
                <Image
                    src={LOGO_PATHS.clear}
                    alt={SITE_NAME}
                    width={144}
                    height={144}
                    className="mb-4 h-24 w-24 md:mb-5 md:h-36 md:w-36"
                    draggable={false}
                />
                <h1 className={`${blackOpsOne.className} text-5xl tracking-tight text-white md:text-7xl`}>
                    {SITE_NAME}
                </h1>
                <p className="-mt-0.5 max-w-md text-base text-zinc-500 md:mt-0 md:text-lg">{HERO_TAGLINE}</p>
                <div className="mt-4 flex flex-col items-center gap-1.5 md:mt-5">
                    <a
                        href={DISCORD_INVITE.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-lg bg-[#5865F2] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#5865F2]/25 transition-colors duration-200 hover:bg-[#4752C4]"
                    >
                        <Image src="/icons/discord.svg" alt="" width={16} height={16} className="h-4 w-4 opacity-95" />
                        {DISCORD_INVITE.buttonLabel}
                    </a>
                    <DiscordMemberCount initialCount={initialMemberCount} />
                </div>
            </div>
        </section>
    );
}
