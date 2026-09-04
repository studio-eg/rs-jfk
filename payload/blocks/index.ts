import type { Block } from "payload";

import { TextImage } from "./TextImage";
import { CTABanner } from "./CTABanner";
import { Quote } from "./Quote";
import { Stats } from "./Stats";
import { Gallery } from "./Gallery";
import { FAQ } from "./FAQ";
import { TeamGrid } from "./TeamGrid";
import { RichText } from "./RichText";

export const pageBuilderBlocks: Block[] = [
  TextImage,
  CTABanner,
  Quote,
  Stats,
  Gallery,
  FAQ,
  TeamGrid,
  RichText,
];
