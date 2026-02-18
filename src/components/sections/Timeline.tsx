import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { SCROLL_SECTION, SECTION_HEADERS, TIMELINE } from "@/lib/constants";

export default function Timeline() {
    return (
        <section id="timeline" className={`relative py-24 md:py-32 ${SCROLL_SECTION}`}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <Container>
                <div className="mx-auto max-w-4xl">
                    <SectionHeader label={SECTION_HEADERS.timeline.label} title={SECTION_HEADERS.timeline.title} />
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                        <div className="space-y-0">
                            {TIMELINE.map((item, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <div
                                        key={item.year}
                                        className="relative flex items-center gap-0 pb-16 last:pb-0"
                                    >
                                        <div
                                            className={`flex flex-1 flex-col pr-8 md:pr-12 ${
                                                isLeft ? "items-end text-right" : "items-start text-left"
                                            }`}
                                        >
                                            {isLeft && (
                                                <div className="group max-w-[85%] md:max-w-[75%]">
                                                    <span className="block text-[11px] font-medium tabular-nums tracking-[0.15em] text-zinc-500 transition-all duration-300 group-hover:text-zinc-400">
                                                        {item.year}
                                                    </span>
                                                    <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white transition-all duration-300 group-hover:text-lg">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 transition-all duration-300 group-hover:text-zinc-400">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="group/node relative z-10 flex h-6 w-6 shrink-0 cursor-default items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full border-2 border-white/30 bg-[#0a0612] transition-all duration-300 group-hover/node:scale-125 group-hover/node:border-white/60 group-hover/node:shadow-[0_0_12px_rgba(255,255,255,0.2)]" />
                                        </div>

                                        <div className="flex flex-1 flex-col items-start pl-8 text-left md:pl-12">
                                            {!isLeft && (
                                                <div className="group max-w-[85%] md:max-w-[75%]">
                                                    <span className="block text-[11px] font-medium tabular-nums tracking-[0.15em] text-zinc-500 transition-all duration-300 group-hover:text-zinc-400">
                                                        {item.year}
                                                    </span>
                                                    <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white transition-all duration-300 group-hover:text-lg">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 transition-all duration-300 group-hover:text-zinc-400">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
