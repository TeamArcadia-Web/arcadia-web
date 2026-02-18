import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamMemberGrid from "@/components/ui/TeamMemberGrid";
import { ABOUT_DESCRIPTION, ABOUT_HEADLINE, SCROLL_SECTION, SECTION_HEADERS, TEAM_MEMBERS } from "@/lib/constants";

export default function About() {
    return (
        <section id="about" className={`relative py-24 md:py-32 ${SCROLL_SECTION}`}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <SectionHeader label={SECTION_HEADERS.about.label} title={SECTION_HEADERS.about.title} />
                    {ABOUT_HEADLINE && (
                        <p className="mb-6 mt-6 text-2xl font-semibold leading-snug tracking-tight text-zinc-200 md:text-3xl">
                            {ABOUT_HEADLINE}
                        </p>
                    )}
                    <p className="text-zinc-500 leading-relaxed">{ABOUT_DESCRIPTION}</p>
                </div>

                <div className="mx-auto mt-20 max-w-6xl">
                    <h3 className="mb-10 text-center text-sm font-bold uppercase tracking-wider text-zinc-500 mr-[-0.05em]">
                        팀원 소개
                    </h3>
                    <TeamMemberGrid members={TEAM_MEMBERS} />
                </div>
            </Container>
        </section>
    );
}
