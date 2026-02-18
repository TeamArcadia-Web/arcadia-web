import footerData from "@/data/footer.json";
import projectsData from "@/data/projects.json";
import siteData from "@/data/site.json";
import teamData from "@/data/team.json";
import timelineData from "@/data/timeline.json";

// ============ Navigation ============
export const NAV_ITEMS = [
    { label: "소개", href: "/#about", sectionId: "about" },
    { label: "연혁", href: "/#timeline", sectionId: "timeline" },
    { label: "프로젝트", href: "/#projects", sectionId: "projects" },
    { label: "문의", href: "/#contact", sectionId: "contact" },
] as const;

export const SECTION_IDS = NAV_ITEMS.map((item) => item.sectionId);

export const SCROLL_THRESHOLD = 60;
export const SCROLL_SECTION = "scroll-mt-20";

// ============ Section Headers ============
export const SECTION_HEADERS = {
    about: { label: "About", title: "소개" },
    timeline: { label: "Timeline", title: "연혁" },
    projects: { label: "Projects", title: "프로젝트" },
    contact: { label: "Contact", title: "문의" },
} as const;

// ============ Hero ============
export const SITE_NAME = siteData.siteName;
export const HERO_TAGLINE = siteData.heroTagline;

export const DISCORD_INVITE = {
    href: siteData.discord.href,
    inviteCode: siteData.discord.inviteCode,
    message: siteData.discord.message,
    buttonLabel: siteData.discord.buttonLabel,
} as const;

// ============ About ============
export const ABOUT_HEADLINE = siteData.aboutHeadline ?? "";
export const ABOUT_DESCRIPTION = siteData.aboutDescription;

export const TEAM_MEMBERS = teamData as {
    name: string;
    role: string;
    detail?: string;
    avatar?: string;
    tags?: string[];
    links?: { label: string; href: string }[];
}[];

// ============ Timeline ============
export const TIMELINE = timelineData as readonly { year: string; title: string; desc: string }[];

// ============ Projects ============
export const PROJECTS = projectsData as readonly {
    title: string;
    desc: string;
    links: readonly { label: string; href: string; icon: string }[];
}[];

// ============ Contact ============
export const CONTACT_EMAIL = siteData.contact.email;
export const CONTACT_MESSAGE = siteData.contact.message;

// ============ Footer ============
export const FOOTER_SNS = footerData.sns as readonly { label: string; href: string; icon: string }[];
export const FOOTER_PAGES = footerData.pages as readonly { label: string; href: string }[];

export const COPYRIGHT = siteData.copyright;

// ============ Navbar ============
export const TEAM_NAME = siteData.teamName;
export const NAVBAR_LABELS = {
    closeMenu: "메뉴 닫기",
    openMenu: "메뉴 열기",
    mainMenu: "메인 메뉴",
    moreMenu: "더 알아보기",
    footerMenu: "푸터 메뉴",
} as const;

// ============ Assets ============
export const LOGO_PATHS = {
    main: "/icons/arcadia_logo.svg",
    clear: "/icons/arcadia_logo_clear.svg",
    clearZinc: "/icons/arcadia_logo_clear_zinc.svg",
} as const;

// ============ Sub Pages ============
export const PAGE_CONTENT = siteData.pages as {
    team: { label: string; title: string; placeholder: string };
    terms: { label: string; title: string; placeholder: string };
    license: { label: string; title: string; placeholder: string };
    communityGuidelines: { label: string; title: string; placeholder: string };
    operatingPolicy: { label: string; title: string; placeholder: string };
};
