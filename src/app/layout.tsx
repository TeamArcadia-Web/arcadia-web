import { Metadata } from "next";
import "./globals.css";
import { notoSansKR } from "@/app/font";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
    icons: {
        icon: "icons/favicon.ico",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={notoSansKR.variable}>
            <body className="min-h-dvh bg-[#0a0612] text-white antialiased select-none font-sans">
                <LoadingScreen />
                <Navbar />
                <main className="pt-16 lg:pt-10 lg:pl-[84px]">{children}</main>
                <Footer />
            </body>
        </html>
    );
}