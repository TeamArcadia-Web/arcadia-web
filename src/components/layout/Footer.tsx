import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { COPYRIGHT, FOOTER_PAGES, FOOTER_SNS } from "@/lib/constants";

export default function Footer() {
    return (
        <footer className="mt-20">
            <div className="h-px w-full origin-bottom scale-y-50 bg-gradient-to-r from-zinc-800/25 via-zinc-600/35 to-zinc-800/25" />
            <Container>
                <div className="flex flex-col items-center gap-8 py-12 md:flex-row md:justify-center md:gap-12">
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1" aria-label="푸터 메뉴">
                        {FOOTER_PAGES.map((page) => (
                            <Link
                                key={page.href}
                                href={page.href}
                                className="text-[13px] font-bold text-zinc-500 transition-colors duration-200 hover:text-zinc-300"
                            >
                                {page.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex gap-5">
                        {FOOTER_SNS.map((sns) => (
                            <a
                                key={sns.label}
                                href={sns.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-70 transition-opacity hover:opacity-100"
                                aria-label={sns.label}
                            >
                                <Image src={sns.icon} alt="" width={20} height={20} className="h-5 w-5" draggable={false} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="h-px w-full origin-bottom scale-y-50 bg-gradient-to-r from-zinc-800/25 via-zinc-600/35 to-zinc-800/25" />
                <p className="py-6 text-center text-xs font-bold tracking-wide text-zinc-600">{COPYRIGHT}</p>
            </Container>
        </footer>
    );
}
