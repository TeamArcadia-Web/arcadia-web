"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LOGO_PATHS, SITE_NAME } from "@/lib/constants";

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 1400);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0612] transition-opacity duration-500 ease-out ${
                visible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            {/* Hero와 동일한 레이아웃·위치·크기: 로고가 구성된 뒤 페이드아웃 시 Hero 로고와 겹쳐 이어짐 */}
            <div className="relative flex flex-col items-center px-6 text-center">
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
                    />
                </div>
            </div>
        </div>
    );
}
