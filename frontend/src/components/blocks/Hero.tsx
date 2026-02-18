import Link from "next/link";
import Image from "next/image";
import type { HeroBlock } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/media";

interface HeroProps {
  block: HeroBlock;
}

export function Hero({ block }: HeroProps) {
  const isFullWidth = block.variant === "full-width";
  const bgUrl = getStrapiMediaUrl(block.background_image);

  return (
    <section
      className={`relative overflow-hidden ${isFullWidth ? "py-24 md:py-32 lg:py-40" : "py-16 md:py-20"}`}
    >
      {bgUrl && (
        <Image
          src={bgUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      <div className={`absolute inset-0 ${bgUrl ? "bg-slate-900/70" : "bg-gradient-to-br from-slate-900 to-slate-800"}`} />
      <div className="relative mx-auto max-w-4xl px-4 text-center text-white">
        <h1
          className={`font-bold tracking-tight ${isFullWidth ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl"}`}
        >
          {block.headline}
        </h1>
        {block.subheadline && (
          <p
            className={`mt-6 text-slate-300 ${isFullWidth ? "text-lg md:text-xl" : "text-base md:text-lg"}`}
          >
            {block.subheadline}
          </p>
        )}
        {block.cta_label && block.cta_url && (
          <div className="mt-8">
            <Link
              href={block.cta_url}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {block.cta_label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
