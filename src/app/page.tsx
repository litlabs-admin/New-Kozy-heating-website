import { Shield, FileText, Wrench, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { HeroBackground } from "@/components/HeroBackground";
import { ServiceSummaryCard } from "@/components/ServiceSummaryCard";
import { CtaBand } from "@/components/CtaBand";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { siteConfig } from "@/lib/site-config";

const whyChooseUs = [
  { icon: Shield, label: "Gas Safe registered" },
  { icon: FileText, label: "Established in 2006" },
  { icon: Wrench, label: "Natural gas & LPG" },
  { icon: CheckCircle2, label: "Trusted local service" },
];

const coreServices = [
  {
    title: "Boiler installation",
    description:
      "New boiler installations using trusted brands, with Ideal and Alpha as preferred options.",
    href: "/services",
  },
  {
    title: "Servicing & repairs",
    description:
      "Boiler servicing, fault finding and repair work to help keep your heating running safely and reliably.",
    href: "/services",
  },
  {
    title: "Gas, LPG & heating systems",
    description:
      "Natural gas and LPG work, heating system support, radiators, controls and thermostats.",
    href: "/services",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackground src="/images/hero-home.jpg" alt="Heating engineer at work" />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="max-w-2xl">
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                Reliable heating and gas work, done properly
              </h1>
              <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
                Kozy Heating Solutions is run by Kenny Kozak, a former British
                Gas engineer who started the business in 2006. We provide
                boiler installation, servicing and repairs on both L.P.G and
                natural gas appliances – domestic and commercial. We focus on
                clear advice, quality workmanship and doing the job right
                first time, every time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact">Request a quote</Button>
                <Button href={siteConfig.whatsappHref} variant="secondary">
                  Call / WhatsApp
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-lg lg:mt-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Why choose us?
              </h2>
              <ul className="mt-5 space-y-4">
                {whyChooseUs.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                      <Icon size={17} className="text-primary" />
                    </span>
                    <span className="text-sm font-medium text-foreground/90">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Core heating services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Kozy Heating Solutions helps customers who want clear advice,
              reliable workmanship and heating work done properly. For us, it
              comes down to a simple principle: doing the job right first
              time, every time.
            </p>
          </div>
          <a
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
          >
            View all services →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <ServiceSummaryCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Trusted by local customers
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Kozy Heating Solutions has built a strong reputation through
            reliable heating and gas work, clear communication and customers
            who are happy to recommend us.
          </p>

          <div className="mt-10 rounded-2xl bg-white px-8 py-10 shadow-sm">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={22} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-4 font-heading text-lg font-semibold text-foreground">
              100% recommended, based on 50+ reviews.
            </p>
          </div>

          <div className="mt-8">
            <Button href={siteConfig.facebookUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
              <FacebookIcon size={16} className="text-primary" />
              Read our Facebook reviews
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Need heating help or a quote?"
        description="Tell us what you need help with and we'll get back to you. For urgent heating enquiries, call, WhatsApp or text us directly."
        buttonLabel="Contact Kozy Heating"
        buttonHref="/contact"
      />
    </>
  );
}
