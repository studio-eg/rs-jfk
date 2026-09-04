import type { Page } from "@/payload-types";
import { TextImageSection } from "./TextImageSection";
import { CTABannerSection } from "./CTABannerSection";
import { QuoteSection } from "./QuoteSection";
import { StatsSection } from "./StatsSection";
import { GallerySection } from "./GallerySection";
import { FAQSection } from "./FAQSection";
import { TeamGridSection } from "./TeamGridSection";
import { RichTextSection } from "./RichTextSection";

type PageSection = NonNullable<Page["pageSections"]>[number];

export function BlockRenderer({ blocks }: { blocks?: PageSection[] | null }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case "textImage":
            return <TextImageSection key={block.id ?? i} block={block} />;
          case "ctaBanner":
            return <CTABannerSection key={block.id ?? i} block={block} />;
          case "quote":
            return <QuoteSection key={block.id ?? i} block={block} />;
          case "stats":
            return <StatsSection key={block.id ?? i} block={block} />;
          case "gallery":
            return <GallerySection key={block.id ?? i} block={block} />;
          case "faq":
            return <FAQSection key={block.id ?? i} block={block} />;
          case "teamGrid":
            return <TeamGridSection key={block.id ?? i} block={block} />;
          case "richText":
            return <RichTextSection key={block.id ?? i} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
