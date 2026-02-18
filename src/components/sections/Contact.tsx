import Container from "@/components/layout/Container";
import ContactForm from "@/components/ui/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { CONTACT_MESSAGE, SCROLL_SECTION, SECTION_HEADERS } from "@/lib/constants";

export default function Contact() {
    return (
        <section id="contact" className={`relative py-24 md:py-32 ${SCROLL_SECTION}`}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <Container>
                <div className="mx-auto max-w-lg text-center">
                    <SectionHeader label={SECTION_HEADERS.contact.label} title={SECTION_HEADERS.contact.title} />
                    <p className="mb-10 text-zinc-500 leading-relaxed">{CONTACT_MESSAGE}</p>
                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
