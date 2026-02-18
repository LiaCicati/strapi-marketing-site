import Link from "next/link";
import type { CallToActionBlock } from "@/lib/types";

interface CallToActionProps {
  block: CallToActionBlock;
}

export function CallToAction({ block }: CallToActionProps) {
  return (
    <section className="bg-blue-600 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white">{block.headline}</h2>
        {block.body && (
          <div
            className="mt-4 text-lg text-blue-100"
            dangerouslySetInnerHTML={{ __html: block.body }}
          />
        )}
        {block.button_label && block.button_url && (
          <div className="mt-8">
            <Link
              href={block.button_url}
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              {block.button_label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
