import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight } from "lucide-react";

export function ServiceSummaryCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="group rounded-2xl bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
      {Icon && (
        <Icon
          size={48}
          className="mb-5 text-primary transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
      >
        Learn more
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
