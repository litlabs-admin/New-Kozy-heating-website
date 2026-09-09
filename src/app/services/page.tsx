import Image from "next/image";
import { CheckCircle2, Flame, Wrench, Settings, Droplet, Thermometer, ShieldCheck, FileText, Zap } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { ServiceDetailCard } from "@/components/ServiceDetailCard";
import { CtaBand } from "@/components/CtaBand";

export const metadata = {
  title: "Services | Kozy Heating Solutions",
  description:
    "Boiler installation, servicing, repairs, gas safety checks and heating system support across Scotland.",
};

const checklist = [
  "Gas Safe registered and insured",
  "Boiler installs, servicing and repairs",
  "Natural gas, LPG, heat pumps and electric boilers",
  "0% finance available",
];

const services = [
  {
    icon: Flame,
    title: "Boiler installation",
    description:
      "Professional boiler installations using trusted brands, with Ideal and Alpha as preferred options.",
  },
  {
    icon: Wrench,
    title: "Boiler servicing",
    description:
      "Regular servicing to help keep your boiler safe, reliable and working properly.",
  },
  {
    icon: Settings,
    title: "Boiler repairs",
    description:
      "Fault finding and repairs for boiler issues, loss of heating, hot water problems and unusual noises.",
  },
  {
    icon: Droplet,
    title: "Central heating installation",
    description:
      "Heating system installation and upgrades for homes, renovations and suitable business premises.",
  },
  {
    icon: Thermometer,
    title: "Radiator work",
    description:
      "Radiator installation, replacement, repairs and heating system improvements.",
  },
  {
    icon: ShieldCheck,
    title: "Gas safety checks",
    description:
      "Gas safety checks for appliances and systems, carried out by a Gas Safe registered engineer.",
  },
  {
    icon: FileText,
    title: "Landlord certificates",
    description: "CP12 Gas Safety Certificates for rental properties.",
  },
  {
    icon: Wrench,
    title: "General heating support",
    description:
      "Help with heating faults, pipework, system troubleshooting and practical heating issues.",
  },
  {
    icon: Zap,
    title: "Heating controls and thermostats",
    description:
      "Support with heating controls, timers, smart thermostats and heating system controls.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackground src="/images/hero-about.jpg" alt="Heating installation background" />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Our heating and gas services
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
              From boiler servicing and repairs to new installations for both
              natural gas and L.P.G appliances, Kozy Heating Solutions
              provides practical, reliable support for homes and businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="group relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/images/kozy-heating-van.webp"
              alt="Kozy Heating Solutions engineer and van"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Heating work done properly
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Kozy Heating Solutions provides professional heating and gas
              services across Scotland. We handle every job with care,
              ensuring safe and reliable results for homes and businesses.
            </p>
            <ul className="mt-6 space-y-4">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-sm font-medium text-foreground/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              What We Do
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Explore core heating and gas services from Kozy Heating
              Solutions.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceDetailCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="What do you need help with?"
        description="Whether you need a boiler installation, servicing, repairs, LPG or natural gas work, tell us what you need and we'll get back to you."
        buttonLabel="Request a quote"
        buttonHref="/contact"
      />
    </>
  );
}
