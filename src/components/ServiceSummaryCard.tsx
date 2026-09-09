import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServiceSummaryCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-8">
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
      >
        Learn more
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
