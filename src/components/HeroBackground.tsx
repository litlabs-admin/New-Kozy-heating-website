import Image from "next/image";

export function HeroBackground({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Image src={src} alt={alt} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-white/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
    </div>
  );
}
