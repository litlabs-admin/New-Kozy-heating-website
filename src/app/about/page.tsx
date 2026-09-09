import Image from "next/image";
import { MessageSquare, Wrench, Home as HomeIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { HeroBackground } from "@/components/HeroBackground";

export const metadata = {
  title: "About | Kozy Heating Solutions",
  description:
    "Kozy Heating Solutions is owned and operated by Kenny Kozak, a former British Gas engineer with decades of hands-on experience in the heating industry.",
};

const commitments = [
  { icon: MessageSquare, label: "Straightforward advice" },
  { icon: Wrench, label: "Reliable workmanship" },
  { icon: HomeIcon, label: "Respect for your home or business" },
  { icon: CheckCircle2, label: "Doing the job right first time" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackground src="/images/hero-about.jpg" alt="Heating system pipework" />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Kozy Heating Solutions
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
              Kozy Heating Solutions is owned and operated by Kenny Kozak, a
              former British Gas engineer with decades of hands-on experience
              in the heating industry.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              About Kozy Heating Solutions
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                We provide boiler installations, servicing and repairs for
                LPG and natural gas systems across domestic and commercial
                properties throughout Scotland.
              </p>
              <p>
                At Kozy Heating Solutions, we believe in straightforward
                advice, reliable workmanship and dependable service. From
                minor repairs to complete heating installations, our goal is
                simple: to deliver quality work and get the job done right
                first time.
              </p>
              <p>
                When you choose Kozy Heating Solutions, you&apos;re choosing
                experience, professionalism and heating engineers you can
                trust. Kozy Heating Solutions is Gas Safe registered and
                fully insured.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/contact">Get in touch</Button>
            </div>
          </div>

          <div>
            <div className="group relative aspect-16/10 overflow-hidden rounded-2xl">
              <Image
                src="/images/kozy-heating-van.webp"
                alt="Kozy Heating Solutions engineer and van"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-8 font-heading text-xl font-bold text-foreground">
              Our Commitment
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {commitments.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light transition-colors duration-300 group-hover:bg-primary">
                    <Icon
                      size={20}
                      className="text-primary transition-colors duration-300 group-hover:text-white"
                    />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
