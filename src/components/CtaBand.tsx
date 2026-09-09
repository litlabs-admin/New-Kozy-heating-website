import { Button } from "./Button";

export function CtaBand({
  heading,
  description,
  buttonLabel,
  buttonHref,
}: {
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}) {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/85">
          {description}
        </p>
        <div className="mt-8">
          <Button href={buttonHref} variant="white">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
