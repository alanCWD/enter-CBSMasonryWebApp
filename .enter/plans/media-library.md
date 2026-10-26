# Photo Placement, Home Gallery & Media Inventory

## What this changes

Today, every photo has to be hand-assigned one at a time to numbered slots (Gallery 1, Gallery 2, ...). This replaces that with category-driven placement: pick a category when uploading and the photos land in the right area on their own, with a single extra choice — whether they should also appear in the home page gallery.

Public galleries stay limited to the pages that already exist: the home page and the AquaPave page. Categories without a page (Residential, Commercial, Natural Rock, Flagstone, ...) are kept in the library and can be shown on the home page by marking them featured.

## 1. Uploading places photos automatically

- [ ] The Upload page keeps the Category dropdown and gains a "Also feature in the home page gallery" switch, applied to the whole batch being uploaded.
- [ ] Uploading into the **AquaPave** category puts the photos straight into the AquaPave page gallery — no assignment step.
- [ ] Uploading with the featured switch on puts the photos straight into the home page gallery.
- [ ] Uploading into any other category stores the photos in the library, ready to be featured later from the admin.
- [ ] After an upload, the page tells you where the photos went (category gallery, home page, or library only).
- [ ] A photo that fails to upload is marked as failed in the list and does not appear in any gallery area.

## 2. Home page gallery — rotating, non-grid

- [ ] The home gallery becomes a masonry layout with varied tile shapes instead of a uniform 12-tile grid; photos are not cropped to one fixed shape.
- [ ] It draws from the pool of photos marked as featured. Tiles swap in and out on a timer and the order reshuffles on each visit, so the gallery looks different every time.
- [ ] Captions show the photo's category name (Residential, Natural Rock, ...); clicking a photo opens the existing lightbox.
- [ ] Rotation pauses for visitors who have reduced motion enabled in their system settings — those visitors still see a varied masonry layout, just without the swapping.
- [ ] Until photos are featured, the gallery keeps showing the current placeholder images, so the site never looks empty.

## 3. AquaPave page gallery — auto-filled

- [ ] The AquaPave "Inspiration Gallery" automatically shows every photo in the AquaPave category, however many there are (no longer capped at 8 positions).
- [ ] Photos currently used as the hero image or the system diagram are left out of the gallery grid so the same photo does not repeat.
- [ ] While the AquaPave category is empty, the gallery shows the current placeholder images.

## 4. Admin Media Library — full photo inventory

- [ ] Every uploaded photo is listed with its thumbnail and file name.
- [ ] Each photo shows which pages it appears on: **Home page**, **AquaPave page**, both, or "No page yet".
- [ ] Each photo has a star toggle for the home page gallery, saved immediately; if the save fails, the toggle reverts and an error is shown.
- [ ] Several photos can be selected at once and featured / unfeatured as a batch.
- [ ] New "Featured on home page" filter alongside the existing category tabs, plus the existing New Category and Move to category actions.
- [ ] Moving a photo into the AquaPave category puts it on the AquaPave page automatically and moving it out removes it; its home page featured status follows the photo and is unaffected by the move.
- [ ] The left-hand slot panel is reduced to the two one-off images that must be swapped by hand: the AquaPave hero image and the AquaPave system diagram. All numbered gallery slots are gone.

## Scope and behaviour notes

- The 43 photos already uploaded sit in Residential, Natural Rock, Concrete and Commercial, and none are featured yet. The live site therefore looks exactly as it does today until photos are featured, or until a photo is placed in the AquaPave category — the home page and AquaPave page both keep their current placeholder images in the meantime.
- No existing photos, categories or records are deleted. The AquaPave hero and system diagram assignments currently in place are kept.
- Signed-out visitors can only read the photos that are featured plus the AquaPave category; the rest of the library remains visible only to the signed-in admin. Reassigning a featured photo to another category or removing the feature takes effect on the public site right away.

_Assumption: nothing else on the home or AquaPave pages changes — wording, layout of the other sections, services cards and quote flow stay as they are._
