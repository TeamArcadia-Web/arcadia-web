import { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { PAGE_CONTENT } from "@/lib/constants";

export const metadata: Metadata = {
    title: `${PAGE_CONTENT.terms.title} | ARCADIA`,
};

export default function TermsPage() {
    return (
        <SubPageLayout pageKey="terms">
            <p className="text-zinc-500 leading-relaxed">{PAGE_CONTENT.terms.placeholder}</p>
        </SubPageLayout>
    );
}
