import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { CookieNoticeReset } from "@/components/CookieNoticeReset";
import { COOKIES_LAST_UPDATED, cookieSections } from "@/lib/legal-content";

export const metadata = {
  title: "Cookie Policy | Kozy Heating Solutions",
  description:
    "This website uses no analytics or advertising trackers. Here is exactly what is stored in your browser, including the one security cookie on our contact form, and why.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      intro="No analytics, no advertising, no tracking. Here is exactly what this website stores in your browser, and why it needs to."
      lastUpdated={COOKIES_LAST_UPDATED}
      sections={cookieSections}
      sidebarFooter={<CookieNoticeReset />}
    />
  );
}
