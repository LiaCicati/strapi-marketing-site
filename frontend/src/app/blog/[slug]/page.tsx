import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getBlogPost, getBlogPosts } from "@/lib/strapi";
import { getStrapiMediaUrl } from "@/lib/media";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
      return { title: "Post Not Found" };
    }

    return {
      title: `${post.title} — Velocity Blog`,
      description: post.excerpt || undefined,
    };
  } catch {
    return {};
  }
}

export const revalidate = 60;
export const dynamicParams = true;

function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-600">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc my-4 space-y-1">$&</ul>')
    .replace(/\n\n/g, '</p><p class="mt-4 text-slate-600 leading-relaxed">')
    .replace(/^(?!<)/, '<p class="mt-4 text-slate-600 leading-relaxed">')
    .concat("</p>");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const draft = await draftMode();
  let post = null;
  try {
    post = await getBlogPost(slug, { preview: draft.isEnabled });
  } catch {
    // Strapi not available
  }

  if (!post) {
    notFound();
  }

  const imageUrl = getStrapiMediaUrl(post.featured_image);

  return (
    <article>
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center text-white">
          <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
            {post.published_date && (
              <time dateTime={post.published_date}>
                {new Date(post.published_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {post.author && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-slate-300">{post.excerpt}</p>
          )}
        </div>
      </header>

      {imageUrl && (
        <div className="mx-auto -mt-8 max-w-4xl px-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
            <Image src={imageUrl} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        {post.content && (
          <div
            className="prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        )}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
