import Link from "next/link";
import Container from "./Container";
import { PAGE_CONTENT } from "@/lib/constants";

type PageKey = keyof typeof PAGE_CONTENT;

interface SubPageLayoutProps {
    pageKey: PageKey;
    children: React.ReactNode;
}

export default function SubPageLayout({ pageKey, children }: SubPageLayoutProps) {
    const content = PAGE_CONTENT[pageKey];
    if (!content) return null;

    return (
        <div className="min-h-screen">
            <Container>
                <div className="py-16 md:py-24">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        홈으로
                    </Link>
                    <h1 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">{content.title}</h1>
                    <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white">
                        {children}
                    </div>
                </div>
            </Container>
        </div>
    );
}
