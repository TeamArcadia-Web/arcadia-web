import { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { PAGE_CONTENT } from "@/lib/constants";

export const metadata: Metadata = {
    title: `${PAGE_CONTENT.operatingPolicy.title} | ARCADIA`,
};

export default function OperatingPolicyPage() {
    return (
        <SubPageLayout pageKey="operatingPolicy">
            <p className="text-zinc-500 leading-relaxed">{PAGE_CONTENT.operatingPolicy.placeholder}</p>
        </SubPageLayout>
    );
}
