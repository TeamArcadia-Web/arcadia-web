import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { SCROLL_SECTION, SECTION_HEADERS, TIMELINE } from "@/lib/constants";

export default function Timeline() {
    return (
        <section id="timeline" className={`relative py-24 md:py-32 ${SCROLL_SECTION}`}>
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
                                        className="group/row relative flex origin-center cursor-default items-center gap-0 rounded-xl py-3 pb-16 transition-all duration-200 ease-out last:pb-0 group-hover/row:scale-[1.02] group-hover/row:bg-white/[0.05]"
                                    >
                                        <div
                                            className={`flex flex-1 flex-col pr-8 md:pr-12 ${
                                                isLeft ? "items-end text-right" : "items-start text-left"
                                            }`}
                                        >
                                            {isLeft && (
                                                <div className="max-w-[85%] origin-center transition-transform duration-200 ease-out group-hover/row:scale-[1.02] md:max-w-[75%]">
                                                    <span className="block text-[11px] font-medium tabular-nums tracking-[0.15em] text-zinc-500 transition-colors duration-200 group-hover/row:text-zinc-300">
                                                        {item.year}
                                                    </span>
                                                    <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white transition-[box-shadow] duration-200 group-hover/row:drop-shadow-[0_0_10px_rgba(255,255,255,0.12)]">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 transition-colors duration-200 group-hover/row:text-zinc-300">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full border-2 border-white/30 bg-[#0a0612] transition-all duration-200 ease-out group-hover/row:scale-140 group-hover/row:border-white group-hover/row:bg-white/15 group-hover/row:shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
                                        </div>

                                        <div className="flex flex-1 flex-col items-start pl-8 text-left md:pl-12">
                                            {!isLeft && (
                                                <div className="max-w-[85%] origin-center transition-transform duration-200 ease-out group-hover/row:scale-[1.02] md:max-w-[75%]">
                                                    <span className="block text-[11px] font-medium tabular-nums tracking-[0.15em] text-zinc-500 transition-colors duration-200 group-hover/row:text-zinc-300">
                                                        {item.year}
                                                    </span>
                                                    <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white transition-[box-shadow] duration-200 group-hover/row:drop-shadow-[0_0_10px_rgba(255,255,255,0.12)]">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 transition-colors duration-200 group-hover/row:text-zinc-300">
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
