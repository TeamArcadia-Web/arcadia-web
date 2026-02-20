"use client";

import { useState } from "react";

export default function PrototypeNotice() {
    const [visible, setVisible] = useState(true);

    const handleClose = () => setVisible(false);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            role="dialog"
            aria-modal
            aria-labelledby="prototype-notice-title"
            aria-describedby="prototype-notice-desc"
        >
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
                aria-hidden
            />
            <div className="relative w-full max-w-md min-h-[200px] rounded-2xl border border-white/10 bg-zinc-900/95 px-8 py-8 shadow-2xl backdrop-blur-xl">
                <h2 id="prototype-notice-title" className="text-center text-lg font-semibold tracking-tight text-white">
                    안내사항
                </h2>
                <p id="prototype-notice-desc" className="mt-3 text-center text-sm leading-relaxed text-zinc-400">
                    본 사이트는 프로토타입 단계로, 일부 내용이 실제와 다를 수 있으며 디자인·콘텐츠는 수시로 개선·수정될 예정입니다.
                </p>
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
