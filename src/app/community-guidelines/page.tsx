import { Metadata } from "next";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { PAGE_CONTENT } from "@/lib/constants";

export const metadata: Metadata = {
    title: `${PAGE_CONTENT.communityGuidelines.title} | ARCADIA`,
};

export default function CommunityGuidelinesPage() {
    return (
        <SubPageLayout pageKey="communityGuidelines">
            <p className="text-zinc-500 leading-relaxed">{PAGE_CONTENT.communityGuidelines.placeholder}</p>
        </SubPageLayout>
    );
}
