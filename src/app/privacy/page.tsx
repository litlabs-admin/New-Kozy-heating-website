import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { PRIVACY_LAST_UPDATED, privacySections } from "@/lib/legal-content";

export const metadata = {
  title: "Privacy Policy | Kozy Heating Solutions",
  description:
    "How Kozy Heating Solutions handles your personal information, what this website collects, how long we keep it and your rights under UK data protection law.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      intro="How we handle the information you share with us, what this website collects on its own, and the rights you have over it."
      lastUpdated={PRIVACY_LAST_UPDATED}
      sections={privacySections}
    />
  );
}
