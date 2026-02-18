import { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { PAGE_CONTENT } from "@/lib/constants";

export const metadata: Metadata = {
    title: `${PAGE_CONTENT.license.title} | ARCADIA`,
};

export default function LicensePage() {
    return (
        <SubPageLayout pageKey="license">
            <p className="text-zinc-500 leading-relaxed">{PAGE_CONTENT.license.placeholder}</p>
        </SubPageLayout>
    );
}
