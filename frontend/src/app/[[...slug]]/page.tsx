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
  let strapiUnavailable = false;
  try {
    page = await getPage(pageSlug, { preview: draft.isEnabled });
  } catch {
    strapiUnavailable = true;
  }

  if (strapiUnavailable) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-amber-100">
            <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Connecting to CMS...</h1>
          <p className="mt-3 text-slate-600">
            The Strapi backend is not available yet. If you just deployed, it may take a few minutes for the server to start.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Make sure <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_STRAPI_URL</code> is set correctly in your Vercel environment variables.
          </p>
        </div>
      </section>
    );
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
