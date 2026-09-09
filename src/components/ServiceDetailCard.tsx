import { LucideIcon } from "lucide-react";

export function ServiceDetailCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_1px_3px_rgba(16,24,40,0.06)] border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light transition-colors duration-300 group-hover:bg-primary">
        <Icon
          size={20}
          className="text-primary transition-colors duration-300 group-hover:text-white"
          strokeWidth={2}
        />
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}
