/**
 * Shared media conventions: which "areas" photos can appear in, and how a photo's
 * page placements are derived from its upload category + home-page feature flag.
 */

import {
  AQUAPAVE_DIAGRAM_SLOT,
  SERVICE_PAGES,
  servicePageForFolder,
  slotKeysForPage,
} from "./servicePages";

export interface MediaFileRecord {
  cdnUrl: string;
  fileName: string;
  folder: string;
  featuredHome: boolean;
}

/** How many tiles the rotating home page gallery shows at once. */
export const HOME_GALLERY_TILE_COUNT = 12;

/** How often the home page gallery swaps a tile. */
export const HOME_GALLERY_ROTATE_MS = 6000;

/** How many project photos a service page gallery shows before "Show more". */
export const SERVICE_GALLERY_BATCH = 12;

export const HOME_PAGE_LABEL = "Home page";

export interface SingleImageSlot {
  key: string;
  label: string;
  hint: string;
  /** Value written to the slot's page field, so a page can be filtered later on. */
  page: string;
  /** Which service page this slot belongs to, for grouping in the media library. */
  group: string;
  groupLabel: string;
}

const pageSlots = (index: number): SingleImageSlot[] => {
  const page = SERVICE_PAGES[index];
  const keys = slotKeysForPage(page);
  return [
    {
      key: keys.hero,
      label: "Hero image",
      hint: "Large banner at the top of the page",
      page: page.slug,
      group: page.slug,
      groupLabel: page.title,
    },
    {
      key: keys.before,
      label: "Before photo",
      hint: "Left half of the Before & After comparison",
      page: page.slug,
      group: page.slug,
      groupLabel: page.title,
    },
    {
      key: keys.after,
      label: "After photo",
      hint: "Right half of the Before & After comparison",
      page: page.slug,
      group: page.slug,
      groupLabel: page.title,
    },
  ];
};

/**
 * The only images that still need hand-picking: spots that hold exactly one specific
 * picture rather than a whole category of work. Every service page contributes a hero
 * photo and a Before / After pair; AquaPave adds its system cross-section.
 */
export const SINGLE_IMAGE_SLOTS: SingleImageSlot[] = [
  ...SERVICE_PAGES.flatMap((_, index) => pageSlots(index)),
  {
    key: AQUAPAVE_DIAGRAM_SLOT,
    label: "System diagram",
    hint: "Cross-section drawing shown beside the video",
    page: "aquapave",
    group: "aquapave",
    groupLabel: servicePageForFolder("aquapave")?.title ?? "AquaPave\u00ae System",
  },
];

/** Which pages a photo currently appears on (empty means it lives in the library only). */
export const pagesForFile = (folder: string, featuredHome: boolean): string[] => {
  const pages: string[] = [];
  const servicePage = servicePageForFolder(folder);
  if (servicePage) pages.push(servicePage.navLabel);
  if (featuredHome) pages.push(HOME_PAGE_LABEL);
  return pages;
};
