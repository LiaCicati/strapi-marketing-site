import Link from "next/link";
import type { PricingTableBlock, PricingCard } from "@/lib/types";

interface PricingTableProps {
  block: PricingTableBlock;
}

function renderFeatures(features: string): string[] {
  return features
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function PricingCardItem({ plan }: { plan: PricingCard }) {
  const features = plan.features ? renderFeatures(plan.features) : [];

  return (
    <div
      className={`relative flex flex-col rounded-xl border-2 bg-white p-8 shadow-sm ${
        plan.is_popular ? "border-blue-600 shadow-lg" : "border-slate-200"
      }`}
    >
      {plan.is_popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{plan.plan_name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
          {plan.billing_period && (
            <span className="ml-2 text-sm text-slate-500">/{plan.billing_period}</span>
          )}
        </div>
      </div>
      {features.length > 0 && (
        <ul className="mb-8 flex-1 space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      {plan.cta_label && plan.cta_url && (
        <Link
          href={plan.cta_url}
          className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
            plan.is_popular
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "border border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {plan.cta_label}
        </Link>
      )}
    </div>
  );
}

export function PricingTable({ block }: PricingTableProps) {
  return (
    <section id="pricing" className="py-16 md:py-20">
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
        <div className="grid gap-8 md:grid-cols-3">
          {block.plans.map((plan) => (
            <PricingCardItem key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
