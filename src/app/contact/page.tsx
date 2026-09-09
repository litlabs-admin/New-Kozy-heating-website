import { Phone, Mail, MapPin } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Contact | Kozy Heating Solutions",
  description:
    "Get in touch with Kozy Heating Solutions for quotes, heating enquiries or urgent issues. Call, WhatsApp, text or send an enquiry online.",
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone / WhatsApp / text",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: siteConfig.serviceArea,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground src="/images/hero-contact.jpg" alt="Building exterior" />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Get In Touch
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80">
              For quotes, heating enquiries or urgent issues, contact Kozy
              Heating Solutions using the form below, or call, WhatsApp or
              text us directly.
            </p>

            <ul className="mt-10 space-y-6">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light">
                    <Icon size={20} className="text-primary" />
                  </span>
                  <div>
                    <p className="font-heading text-base font-bold text-foreground">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-muted hover:text-primary"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Send an Enquiry
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
