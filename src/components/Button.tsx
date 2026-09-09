import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "white";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25",
  secondary:
    "bg-white text-foreground border border-border hover:bg-surface-alt hover:border-primary/40",
  white:
    "bg-white text-primary hover:bg-white/90 hover:shadow-lg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"a">;

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
