/**
 * Shared media conventions: which "areas" photos can appear in, and how a photo's
 * page placements are derived from its upload category + home-page feature flag.
 */

export interface MediaFileRecord {
  cdnUrl: string;
  fileName: string;
  folder: string;
  featuredHome: boolean;
}

/** Category value whose photos publish straight onto the AquaPave page gallery. */
export const AQUAPAVE_FOLDER = "aquapave";

/** How many tiles the rotating home page gallery shows at once. */
export const HOME_GALLERY_TILE_COUNT = 12;

/** How often the home page gallery swaps a tile. */
export const HOME_GALLERY_ROTATE_MS = 6000;

export interface SingleImageSlot {
  key: string;
  label: string;
  hint: string;
  page: string;
}

/**
 * The only images that still need hand-picking: spots that hold exactly one specific
 * picture rather than a whole category of work.
 */
export const SINGLE_IMAGE_SLOTS: SingleImageSlot[] = [
  {
    key: "aquapave-hero",
    label: "AquaPave hero image",
    hint: "Large banner at the top of the AquaPave page",
    page: AQUAPAVE_FOLDER,
  },
  {
    key: "aquapave-diagram",
    label: "AquaPave system diagram",
    hint: "Cross-section drawing shown beside the video",
    page: AQUAPAVE_FOLDER,
  },
];

export const HOME_PAGE_LABEL = "Home page";
export const AQUAPAVE_PAGE_LABEL = "AquaPave page";

/** Which pages a photo currently appears on (empty means it lives in the library only). */
export const pagesForFile = (folder: string, featuredHome: boolean): string[] => {
  const pages: string[] = [];
  if (featuredHome) pages.push(HOME_PAGE_LABEL);
  if (folder === AQUAPAVE_FOLDER) pages.push(AQUAPAVE_PAGE_LABEL);
  return pages;
};
