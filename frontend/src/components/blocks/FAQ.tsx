"use client";

import { useState } from "react";
import type { FAQBlock, FAQItem } from "@/lib/types";

interface FAQProps {
  block: FAQBlock;
}

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-slate-900">{item.question}</span>
        <svg
          className={`ml-4 h-5 w-5 flex-shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-5">
          <div
            className="text-sm leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </div>
      )}
    </div>
  );
}

export function FAQ({ block }: FAQProps) {
  return (
    <section id="faq" className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        {block.title && (
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            {block.title}
          </h2>
        )}
        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6">
          {block.items.map((item) => (
            <FAQItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
