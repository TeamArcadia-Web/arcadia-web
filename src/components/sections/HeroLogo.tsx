"use client";

import Image from "next/image";
import { LOGO_PATHS, SITE_NAME } from "@/lib/constants";

/** 로딩 화면과 동일한 원(clip-path) 이펙트로 로고가 구성되는 느낌. 마운트 시 1회 재생. */
export default function HeroLogo() {
    return (
        <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden md:mb-5 md:h-36 md:w-36">
            <Image
                src={LOGO_PATHS.clear}
                alt={SITE_NAME}
                width={144}
                height={144}
                className="h-24 w-24 object-contain md:h-36 md:w-36"
                style={{
                    animation: "loading-logo-form 1s cubic-bezier(0.33, 1, 0.68, 1) forwards",
                }}
                draggable={false}
            />
        </div>
    );
}
