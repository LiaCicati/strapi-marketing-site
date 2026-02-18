import type { DynamicZoneBlock } from "@/lib/types";
import { Hero } from "./blocks/Hero";
import { FeatureGrid } from "./blocks/FeatureGrid";
import { TextWithImage } from "./blocks/TextWithImage";
import { Testimonials } from "./blocks/Testimonials";
import { CallToAction } from "./blocks/CallToAction";
import { PricingTable } from "./blocks/PricingTable";
import { ContactForm } from "./blocks/ContactForm";
import { LogoCloud } from "./blocks/LogoCloud";
import { FAQ } from "./blocks/FAQ";
import { RichText } from "./blocks/RichText";

const componentMap: Record<string, React.ComponentType<{ block: DynamicZoneBlock }>> = {
  "blocks.hero": Hero as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.feature-grid": FeatureGrid as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.text-with-image": TextWithImage as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.testimonials": Testimonials as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.call-to-action": CallToAction as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.pricing-table": PricingTable as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.contact-form": ContactForm as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.logo-cloud": LogoCloud as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.faq": FAQ as React.ComponentType<{ block: DynamicZoneBlock }>,
  "blocks.rich-text": RichText as React.ComponentType<{ block: DynamicZoneBlock }>,
};

interface DynamicZoneProps {
  blocks: DynamicZoneBlock[];
}

export function DynamicZone({ blocks }: DynamicZoneProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const Component = componentMap[block.__component];
        if (!Component) {
          console.warn(`No component found for: ${block.__component}`);
          return null;
        }
        return <Component key={`${block.__component}-${block.id}-${index}`} block={block} />;
      })}
    </>
  );
}
