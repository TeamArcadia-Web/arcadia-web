"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { blackOpsOne } from "@/lib/font";
import { SITE_NAME } from "@/lib/constants";

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 800);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0612] transition-opacity duration-500 ease-out ${
                visible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="flex flex-col items-center gap-6">
                <Image
                    src="/icons/arcadia_logo_clear.svg"
                    alt={SITE_NAME}
                    width={64}
                    height={64}
                    className="h-16 w-16 opacity-90"
                />
                <span className={`${blackOpsOne.className} text-2xl tracking-wide text-white`}>
                    {SITE_NAME}
                </span>
            </div>
        </div>
    );
}
