import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getPage, getAllPages } from "@/lib/strapi";
import { DynamicZone } from "@/components/DynamicZone";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    return pages
      .filter((p) => p.slug !== "home")
      .map((page) => ({
        slug: [page.slug],
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const pageSlug = slug?.[0] || "home";
    const page = await getPage(pageSlug);

    if (!page) {
      return { title: "Page Not Found" };
    }

    return {
      title: page.title === "Home" ? "Velocity — Accelerate Your Digital Transformation" : `${page.title} — Velocity`,
      description: page.meta_description || undefined,
    };
  } catch {
    return {};
  }
}

export const revalidate = 60;
export const dynamicParams = true;

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const pageSlug = slug?.[0] || "home";

  const draft = await draftMode();
  let page = null;
  try {
    page = await getPage(pageSlug, { preview: draft.isEnabled });
  } catch {
    // Strapi not available
  }

  if (!page) {
    notFound();
  }

  return (
    <>
      {draft.isEnabled && (
        <div className="bg-amber-500 px-4 py-2 text-center text-sm font-semibold text-amber-900">
          Draft Mode Enabled —{" "}
          <a href="/api/disable-draft" className="underline">
            Exit Preview
          </a>
        </div>
      )}
      <DynamicZone blocks={page.body || []} />
    </>
  );
}
