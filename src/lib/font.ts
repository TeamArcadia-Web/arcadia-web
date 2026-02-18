import { Bebas_Neue, Noto_Sans_KR } from "next/font/google";

export const blackOpsOne = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-blackops",
});

export const notoSansKR = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans",
});
