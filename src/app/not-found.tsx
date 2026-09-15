import { Button } from "@/components/Button";

export const metadata = {
  title: "Page not found | Kozy Heating Solutions",
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32 lg:px-8">
      <p className="font-heading text-sm font-semibold text-primary">404</p>
      <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
        Sorry, we couldn&apos;t find the page you were looking for. It may have
        been moved, or the link may be incorrect.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Button href="/" className="w-full sm:w-auto">
          Back to home
        </Button>
        <Button href="/contact" variant="secondary" className="w-full sm:w-auto">
          Contact us
        </Button>
      </div>
    </section>
  );
}
