import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src="/logo-23.png"
        alt=""
        width={36}
        height={36}
        priority
        className={`object-contain ${compact ? "h-8 w-8" : "h-9 w-9"}`}
      />
      <span
        className={`font-heading font-semibold tracking-tight ${
          compact ? "text-lg" : "text-xl"
        } ${light ? "text-white" : "text-[#111]"}`}
      >
        Hoydoon
      </span>
    </Link>
  );
}
