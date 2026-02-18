import Image from "next/image";
import type { LogoCloudBlock } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/media";

interface LogoCloudProps {
  block: LogoCloudBlock;
}

export function LogoCloud({ block }: LogoCloudProps) {
  const hasLogos = block.logos && block.logos.length > 0;

  // Placeholder company names when no logos are uploaded
  const placeholders = ["Acme Corp", "Globex", "Initech", "Hooli", "Pied Piper", "Stark Industries"];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {block.title && (
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
            {block.title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {hasLogos
            ? block.logos.map((logo) => {
                const url = getStrapiMediaUrl(logo);
                return url ? (
                  <Image
                    key={logo.id}
                    src={url}
                    alt={logo.alternativeText || "Partner logo"}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                ) : null;
              })
            : placeholders.map((name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-slate-300 transition hover:text-slate-500"
                >
                  {name}
                </span>
              ))}
        </div>
      </div>
    </section>
  );
}
