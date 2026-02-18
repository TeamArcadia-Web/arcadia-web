"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function ContactForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        const subject = encodeURIComponent("【문의】");
        const body = encodeURIComponent(
            `회신 이메일 주소: ${email.trim()}\n\n상세 문의 내용:\n${message.trim() || "(미작성)"}`
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
        >
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-[11px] font-semibold tracking-wide text-zinc-500">
                        회신 이메일 주소
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@arcadiateam.kr"
                        required
                        className="w-full rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors duration-200 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none"
                    />
                </div>
                <div className="border-t border-white/[0.04] pt-5">
                    <label htmlFor="contact-message" className="mb-1.5 block text-[11px] font-semibold tracking-wide text-zinc-500">
                        상세 문의 내용 <span className="font-normal text-zinc-600">(선택 사항)</span>
                    </label>
                    <textarea
                        id="contact-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="문의하실 내용을 작성해 주세요."
                        rows={5}
                        className="w-full resize-none rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-colors duration-200 focus:border-white/20 focus:bg-white/[0.04] focus:outline-none"
                    />
                </div>
                <div className="border-t border-white/[0.04] pt-5">
                    <button
                        type="submit"
                        disabled={!email.trim()}
                        className="w-full rounded-md border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        문의 제출
                    </button>
                </div>
            </div>
        </form>
    );
}
