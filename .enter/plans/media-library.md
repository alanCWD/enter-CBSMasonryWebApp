# Media Library & Image Assignment System

## Context
Images on the site (Gallery, AquaPave page) are hardcoded placeholder URLs. The user uploads real photos via `/admin/upload` but has no way to visually browse and assign them to page slots. This plan builds a full media library inside the admin panel with support for reassignment and user-created categories.

## What We're Building
- `/admin/media` page: browse all uploaded Bunny.net images + assign/reassign them to named page slots
- `media_categories` DB table: dynamic categories (replaces hardcoded array) — user can add new ones
- `media_files` DB table: tracks all uploaded files
- `media_slots` DB table: slot_key → cdn_url assignments (upsert = reassignable)
- Edge function: `bunny-list` — lists files from Bunny.net + merges with `media_files`
- Update `bunny-upload` to save records to `media_files`
- Update `Upload.tsx` to use dynamic categories from DB
- Update `Gallery.tsx` and `AquaPave.tsx` to use slot assignments (with fallbacks)
- Shared `AdminLayout.tsx` header (Upload + Media Library tabs)

---

## Database (migration)

### `media_categories` table
| column | type | notes |
|--------|------|-------|
| id | uuid PK | |
| value | text unique | slug e.g. "aquapave" |
| label | text | display name e.g. "AquaPave" |
| created_at | timestamptz | default now() |

Pre-seeded with the existing 11 categories. Used by Upload dropdown and Media Library filter tabs.
RLS: Enable — public SELECT, authenticated INSERT.

### `media_files` table
| column | type | notes |
|--------|------|-------|
| id | uuid PK | |
| cdn_url | text unique | full CDN URL |
| file_name | text | e.g. cbs-masonry-aquapave-01.jpg |
| folder | text | category value |
| uploaded_at | timestamptz | default now() |

RLS: Enable — authenticated SELECT/INSERT.

### `media_slots` table
| column | type | notes |
|--------|------|-------|
| slot_key | text PK | e.g. "home-gallery-1", "patios-gallery-3" |
| cdn_url | text | assigned CDN URL (nullable = unassigned) |
| alt_text | text | optional label |
| page | text | "home", "aquapave", or category value |
| updated_at | timestamptz | default now() |

RLS: Enable — public SELECT (so site pages can read), authenticated INSERT/UPDATE.
**Save via upsert** (`ON CONFLICT (slot_key) DO UPDATE`) — reassignment is just clicking a different image.

---

## Edge Functions

### Update `bunny-upload`
After successful Bunny.net PUT, `INSERT INTO media_files (cdn_url, file_name, folder) ... ON CONFLICT (cdn_url) DO NOTHING` using service role Supabase client.

### New `bunny-list`
- Reads all category values from `media_categories` via Supabase client
- Loops: `GET https://storage.bunnycdn.com/{ZONE}/{folder}/` with `AccessKey` header for each
- Merges with `media_files` table (union, dedup by cdn_url)
- Returns `{ files: Array<{ cdnUrl, fileName, folder }> }`

---

## Frontend

### `AdminLayout.tsx` (`src/components/admin/AdminLayout.tsx`)
Shared header for all admin pages:
- Logo, "Upload" tab (link to `/admin/upload`), "Media Library" tab (link to `/admin/media`)
- Active tab highlighted
- Email + Sign Out button on right

### `useCategories` hook (`src/hooks/useCategories.ts`)
- Fetches `media_categories` ordered by `created_at`
- Returns `{ categories, loading, addCategory(label) }`
- `addCategory`: slugifies label, inserts row, refetches

### `useMediaSlots` hook (`src/hooks/useMediaSlots.ts`)
- Fetches all `media_slots` rows
- Returns `{ slots: Record<string, string>, assignSlot(key, url), clearSlot(key) }`
- `assignSlot`: upserts row → updates local state immediately (optimistic)
- `clearSlot`: sets cdn_url to null

### `/admin/media` — `MediaLibrary.tsx`

**Layout: two-column side by side on desktop, stacked on mobile**

**Left panel — "Page Slots"** (~40% width, scrollable):
- Collapsible groups: "Home Page", "AquaPave Page", + one group per extra category
- Home group: slots `home-gallery-1` → `home-gallery-12`
- AquaPave group: `aquapave-hero`, `aquapave-diagram`, `aquapave-gallery-1` → `aquapave-gallery-8`
- Dynamic category group: `{category}-gallery-1` → `{category}-gallery-12`
- Each slot card: small thumbnail (assigned image or grey placeholder box) + slot label
- **Selected** slot: blue ring border
- **Assigned** slot: small "×" button to clear/unassign
- Clicking a slot selects it; clicking again deselects

**Right panel — "Image Library"** (~60% width, scrollable):
- Top: category filter tabs (All + one per `media_categories`) + "**+ New Category**" button
- "New Category" → inline input or small modal: type label → click Add → `addCategory()` → new tab appears + new slot group created in left panel
- Refresh button to re-fetch from Bunny.net
- Image grid (3-4 cols): thumbnail, file name below
- **Clicking an image when a slot is selected** → calls `assignSlot(selectedSlot, cdnUrl)` → left panel slot updates → selection stays active so next image/slot click works naturally
- **Reassignment**: slot already has image → click it to re-select → click new image in library → upsert overwrites

### Update `Upload.tsx`
- Replace hardcoded `CATEGORIES` array with `useCategories()` hook
- Use `AdminLayout` (removes duplicate header code)
- Category dropdown includes any user-created categories automatically

### Update `Gallery.tsx`
- Add `useMediaSlots()` call
- Each item: `src: slots["home-gallery-1"] ?? "https://images.unsplash.com/..."` (fallback preserved)

### Update `AquaPave.tsx`
- Same: hero image, diagram image, 8 gallery images all use `slots["aquapave-*"] ?? fallback`

### Router update
Add `/admin/media` → `<ProtectedRoute><MediaLibrary /></ProtectedRoute>`

---

## Files to Create/Modify
| File | Action |
|------|--------|
| `supabase/migrations/...` | Create 3 tables + seed categories |
| `supabase/functions/bunny-upload/index.ts` | Save to `media_files` after upload |
| `supabase/functions/bunny-list/index.ts` | New list function |
| `src/components/admin/AdminLayout.tsx` | New shared admin header |
| `src/pages/admin/MediaLibrary.tsx` | New media library page |
| `src/pages/admin/Upload.tsx` | Use AdminLayout + dynamic categories |
| `src/hooks/useCategories.ts` | New hook |
| `src/hooks/useMediaSlots.ts` | New hook |
| `src/components/Gallery.tsx` | Use slot hook with fallbacks |
| `src/pages/AquaPave.tsx` | Use slot hook with fallbacks |
| `src/router.tsx` | Add `/admin/media` route |

---

## Verification
1. Log in → `/admin/upload`: category dropdown loads from DB (same 11 items as before)
2. Upload a test image → appears in `media_files` table
3. Navigate to `/admin/media`:
   - Left panel shows all slot groups with empty placeholders
   - Right panel shows uploaded image(s)
4. Click "Home Gallery 1" slot → click uploaded image → slot thumbnail fills in
5. Click same slot again → click a different image → **reassignment** works
6. Click "×" on assigned slot → slot clears
7. Click "+ New Category" → type "Patios" → new tab + "Patios Gallery" slot group appears
8. Navigate to home page → Gallery shows assigned image in position 1
9. Navigate to `/services/aquapave` → assigned images show
