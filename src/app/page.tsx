import { Hero, About, Timeline, Projects, Contact } from "@/components/sections";

const SectionDivider = () => (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent" aria-hidden />
);

export default function Home() {
    return (
        <div className="min-w-0 w-full max-w-full overflow-x-hidden">
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Timeline />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Contact />
        </div>
    );
}
