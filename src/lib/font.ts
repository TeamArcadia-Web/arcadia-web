import localFont from "next/font/local";
import { Noto_Sans_KR } from "next/font/google";

export const blackOpsOne = localFont({
    src: "../assets/fonts/BlackOpsOne-Regular.ttf",
    variable: "--font-blackops",
});

export const notoSansKR = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans",
});
