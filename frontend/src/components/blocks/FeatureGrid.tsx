import Image from "next/image";
import type { FeatureGridBlock, FeatureCard } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/media";

interface FeatureGridProps {
  block: FeatureGridBlock;
}

function FeatureCardItem({ feature }: { feature: FeatureCard }) {
  const iconUrl = getStrapiMediaUrl(feature.icon);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {iconUrl && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
          <Image src={iconUrl} alt="" width={32} height={32} />
        </div>
      )}
      {!iconUrl && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
      {feature.description && (
        <div
          className="mt-2 text-sm leading-relaxed text-slate-600"
          dangerouslySetInnerHTML={{ __html: feature.description }}
        />
      )}
    </div>
  );
}

export function FeatureGrid({ block }: FeatureGridProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {(block.title || block.subtitle) && (
          <div className="mb-12 text-center">
            {block.title && (
              <h2 className="text-3xl font-bold text-slate-900">{block.title}</h2>
            )}
            {block.subtitle && (
              <p className="mt-4 text-lg text-slate-600">{block.subtitle}</p>
            )}
          </div>
        )}
        <div className={`grid gap-6 ${block.features.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {block.features.map((feature) => (
            <FeatureCardItem key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
