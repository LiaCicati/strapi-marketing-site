import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { draftMode } from "next/headers";
import { getBlogPosts } from "@/lib/strapi";
import { getStrapiMediaUrl } from "@/lib/media";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog — Velocity",
  description: "Read the latest insights on web development, design systems, and modern technology from the Velocity team.",
};

export const revalidate = 60;

function BlogCard({ post }: { post: BlogPost }) {
  const imageUrl = getStrapiMediaUrl(post.featured_image);

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {imageUrl ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={imageUrl} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-slate-100" />
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-slate-500">
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
        <h2 className="mt-3 text-xl font-semibold text-slate-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Read More
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default async function BlogListPage() {
  const draft = await draftMode();
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts({ preview: draft.isEnabled });
  } catch {
    // Strapi may not be running
  }

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="text-3xl font-bold md:text-4xl">Blog</h1>
          <p className="mt-4 text-lg text-slate-300">
            Insights and updates from the Velocity team
          </p>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {posts.length === 0 ? (
            <p className="text-center text-slate-500">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.documentId} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
