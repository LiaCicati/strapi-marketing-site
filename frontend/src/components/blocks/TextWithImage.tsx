import Image from "next/image";
import type { TextWithImageBlock } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/media";

interface TextWithImageProps {
  block: TextWithImageBlock;
}

function renderMarkdown(text: string): string {
  // Simple markdown rendering for basic formatting
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-slate-900 mt-6 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, '</p><p class="mt-4 text-slate-600 leading-relaxed">')
    .replace(/^(?!<)/, '<p class="mt-4 text-slate-600 leading-relaxed">')
    .concat("</p>");
}

export function TextWithImage({ block }: TextWithImageProps) {
  const imageUrl = getStrapiMediaUrl(block.image);
  const isImageLeft = block.layout === "image-left";

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`flex flex-col gap-8 md:gap-12 lg:flex-row lg:items-center ${isImageLeft ? "" : "lg:flex-row-reverse"}`}>
          <div className="flex-1">
            {imageUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <Image src={imageUrl} alt="" fill className="object-cover" />
              </div>
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-slate-100" />
            )}
          </div>
          <div className="flex-1">
            {block.content && (
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(block.content) }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
