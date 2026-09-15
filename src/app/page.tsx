import Image from "next/image";
import { Shield, FileText, Wrench, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { HeroBackground } from "@/components/HeroBackground";
import { ServiceSummaryCard } from "@/components/ServiceSummaryCard";
import { CtaBand } from "@/components/CtaBand";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { BoilerIcon, HeatingHouseIcon, WrenchIcon } from "@/components/icons/ServiceIcons";
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
    icon: BoilerIcon,
    description:
      "New boiler installations using trusted brands, with Ideal and Alpha as preferred options.",
    href: "/services",
  },
  {
    title: "Servicing & repairs",
    icon: WrenchIcon,
    description:
      "Boiler servicing, fault finding and repair work to help keep your heating running safely and reliably.",
    href: "/services",
  },
  {
    title: "Gas, LPG & heating systems",
    icon: HeatingHouseIcon,
    description:
      "Natural gas and LPG work, heating system support, radiators, controls and thermostats.",
    href: "/services",
  },
];

const accreditations = [
  {
    name: "Ideal Heating",
    label: "Ideal Max",
    src: "/images/accreditations/ideal-heating-logo.svg",
    width: 204,
    height: 107,
    className: "h-16 sm:h-20",
  },
  {
    name: "Alpha",
    label: "Alpha One",
    src: "/images/accreditations/alpha-logo.png",
    width: 154,
    height: 71,
    className: "h-12 sm:h-16",
  },
  {
    name: "BAXI",
    label: "BAXI Approved",
    src: "/images/accreditations/baxi-logo.svg",
    width: 91,
    height: 28,
    className: "h-9 sm:h-12",
  },
  {
    name: "Vaillant",
    label: "Vaillant Advance",
    src: "/images/accreditations/vaillant-logo.png",
    width: 272,
    height: 72,
    className: "h-10 sm:h-14",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackground src="/images/hero-home.webp" alt="Traditional industrial boiler with open firebox doors" />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="max-w-2xl">
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                Reliable heating and gas work, done properly
              </h1>
              <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
                Kozy Heating Solutions is run by Kenny Kozak, a former British
                Gas engineer who started the business in 2006. We provide
                boiler installation, servicing and repairs on both LPG and
                natural gas appliances – domestic and commercial. We focus on
                clear advice, quality workmanship and doing the job right
                first time, every time.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button href="/contact" className="w-full sm:w-auto">Request a quote</Button>
                <Button href={siteConfig.whatsappHref} variant="secondary" className="w-full sm:w-auto">
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
                  <li key={label} className="group flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light transition-colors duration-300 group-hover:bg-primary">
                      <Icon
                        size={17}
                        className="text-primary transition-colors duration-300 group-hover:text-white"
                      />
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
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            View all services
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <ServiceSummaryCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-white px-6 py-8 text-center sm:px-10 sm:py-10">
          <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
            Accreditations &amp; memberships
          </h3>
          <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-y-8 lg:grid-cols-4">
            {accreditations.map((item, i) => (
              <li key={item.name} className="relative flex flex-col items-center px-4">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 h-16 w-px bg-border sm:h-20 ${
                      i === 2 ? "hidden lg:block" : ""
                    }`}
                  />
                )}
                <div className="flex h-18 items-center justify-center sm:h-22">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={item.width}
                    height={item.height}
                    className={`w-auto max-w-full ${item.className}`}
                  />
                </div>
                <p className="mt-3 text-sm text-muted sm:text-base">{item.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted sm:text-base">
            We install, service and repair a wide range of makes and models
          </p>
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

          <div className="mt-10 rounded-2xl bg-white px-8 py-10 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={22}
                  className="fill-amber-400 text-amber-400 transition-transform duration-200 hover:scale-125"
                  style={{ transitionDelay: `${i * 40}ms` }}
                />
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
