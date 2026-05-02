# Media Library & Image Assignment System

## Context
Images on the site (Gallery, AquaPave page) are hardcoded placeholder URLs. The user uploads real photos via `/admin/upload` but has no way to visually browse and assign them to page slots. This plan builds a full media library inside the admin panel.

## What We're Building
- `/admin/media` page: browse all uploaded Bunny.net images + assign them to named page slots
- Database table: `media_slots` — stores slot_key → cdn_url assignments
- Edge function: `bunny-list` — lists files from Bunny.net Storage API across all category folders
- Update `bunny-upload` to also save file records in a `media_files` DB table (so the library works even without a Bunny.net list call)
- Update `Gallery.tsx` and `AquaPave.tsx` to fetch slot values from DB (with hardcoded fallbacks)
- Shared admin nav header extracted into `AdminLayout.tsx` (Upload + Media Library tabs)

---

## Database (migration)

### `media_files` table
| column | type | notes |
|--------|------|-------|
| id | uuid PK | |
| cdn_url | text unique | full CDN URL |
| file_name | text | e.g. cbs-masonry-aquapave-01.jpg |
| folder | text | category folder e.g. "aquapave" |
| uploaded_at | timestamptz | default now() |

RLS: Enable, allow authenticated read/insert.

### `media_slots` table
| column | type | notes |
|--------|------|-------|
| slot_key | text PK | e.g. "home-gallery-1" |
| cdn_url | text | assigned CDN URL |
| alt_text | text | optional label |
| updated_at | timestamptz | default now() |

RLS: Enable, allow authenticated read/write.

---

## Edge Functions

### Update `bunny-upload`
After successful Bunny.net PUT, also `INSERT INTO media_files (cdn_url, file_name, folder) VALUES (...) ON CONFLICT (cdn_url) DO NOTHING`.

### New `bunny-list`
Lists all files from Bunny.net Storage across known category folders.
- Loops through all CATEGORY folders + root
- `GET https://storage.bunnycdn.com/{ZONE}/{folder}/` with `AccessKey` header
- Returns flat array of `{ cdnUrl, fileName, folder }` objects
- Also merges with `media_files` table records for any that were uploaded before this feature

---

## Frontend

### Shared `AdminLayout.tsx` component
- Replaces duplicate header in Upload.tsx
- Shows logo, nav tabs: "Upload" | "Media Library", sign out button

### `/admin/media` — Media Library page
**Layout: two-panel side by side (desktop), stacked on mobile**

**Left panel — "Page Slots"** (grouped by page):
- "Home Page": `home-gallery-1` → `home-gallery-12`
- "AquaPave Page": `aquapave-hero`, `aquapave-diagram`, `aquapave-gallery-1` → `aquapave-gallery-8`
- Each slot shows: label + current image thumbnail (or empty placeholder)
- Clicking a slot **selects** it (highlights in blue)

**Right panel — "Image Library"**:
- Category filter tabs (All, AquaPave, Residential, Gallery, etc.)
- Grid of image thumbnails loaded from `bunny-list` edge function + `media_files` table
- Clicking an image when a slot is selected → saves to `media_slots` table → slot updates immediately

**Assign flow**: Click slot → slot highlights → click image → instant assignment saved → slot thumbnail updates

### `useMediaSlots` hook (`src/hooks/useMediaSlots.ts`)
- Fetches all rows from `media_slots` on mount
- Returns `{ slots: Record<string, string>, loading }` (slot_key → cdn_url)
- Used by Gallery.tsx and AquaPave.tsx

### Update `Gallery.tsx`
- Call `useMediaSlots()` at top
- Use `slots["home-gallery-1"] ?? hardcoded_fallback` for each image src

### Update `AquaPave.tsx`
- Same pattern: `slots["aquapave-hero"]`, `slots["aquapave-gallery-1"]`, etc.

### Router update
Add `/admin/media` route (ProtectedRoute wrapping new `MediaLibrary` page)

---

## Files to Create/Modify
| File | Action |
|------|--------|
| `supabase/migrations/...` | Create `media_files` + `media_slots` tables |
| `supabase/functions/bunny-upload/index.ts` | Update to save to `media_files` |
| `supabase/functions/bunny-list/index.ts` | New function |
| `src/components/admin/AdminLayout.tsx` | New shared layout |
| `src/pages/admin/MediaLibrary.tsx` | New page |
| `src/pages/admin/Upload.tsx` | Use AdminLayout, remove duplicate header |
| `src/hooks/useMediaSlots.ts` | New hook |
| `src/components/Gallery.tsx` | Use slot hook |
| `src/pages/AquaPave.tsx` | Use slot hook |
| `src/router.tsx` | Add `/admin/media` route |

---

## Verification
1. Log in to `/admin/upload`, upload a few test images
2. Navigate to `/admin/media`
3. Left panel shows all page slots, right panel shows uploaded images
4. Click a slot → click an image → thumbnail updates in left panel
5. Navigate to home page → Gallery shows assigned images
6. Navigate to `/services/aquapave` → assigned images appear
