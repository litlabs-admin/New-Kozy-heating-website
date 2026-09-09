import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src="/images/logo-full.png"
        alt="Kozy Heating Solutions"
        width={289}
        height={92}
        className="h-10 w-auto sm:h-12"
        priority
      />
    </Link>
  );
}
