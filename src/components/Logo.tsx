import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <Image
        src="/images/logo-icon.png"
        alt="Kozy Heating Solutions logo"
        width={44}
        height={44}
        className="h-9 w-9 sm:h-11 sm:w-11 object-contain"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span
          className={`font-heading text-lg sm:text-xl font-bold tracking-tight ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          Kozy Heating
        </span>
        <span
          className={`text-[11px] sm:text-xs font-semibold tracking-[0.18em] ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          SOLUTIONS
        </span>
      </span>
    </Link>
  );
}
