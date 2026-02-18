import Image from "next/image";
import type { TestimonialsBlock, TestimonialCard } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/media";

interface TestimonialsProps {
  block: TestimonialsBlock;
}

function TestimonialCardItem({ testimonial }: { testimonial: TestimonialCard }) {
  const avatarUrl = getStrapiMediaUrl(testimonial.avatar);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <svg className="mb-4 h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-slate-700 leading-relaxed">{testimonial.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={testimonial.author_name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
            {testimonial.author_name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-slate-900">{testimonial.author_name}</p>
          {testimonial.author_role && (
            <p className="text-xs text-slate-500">{testimonial.author_role}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ block }: TestimonialsProps) {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {block.title && (
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            {block.title}
          </h2>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {block.testimonials.map((testimonial) => (
            <TestimonialCardItem key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
