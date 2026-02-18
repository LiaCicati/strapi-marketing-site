import type { RichTextBlock } from "@/lib/types";

interface RichTextProps {
  block: RichTextBlock;
}

export function RichText({ block }: RichTextProps) {
  if (!block.body) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div
          className="prose prose-slate prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: block.body }}
        />
      </div>
    </section>
  );
}
