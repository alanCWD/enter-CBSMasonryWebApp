import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AQUAPAVE_FOLDER } from "@/lib/media";

export interface PublicPhoto {
  cdnUrl: string;
  fileName: string;
  folder: string;
  /** Display name of the upload category the photo belongs to. */
  categoryLabel: string;
}

interface PhotoRow {
  cdn_url: string;
  file_name: string;
  folder: string;
}

/**
 * Reads the photos that are published to the public site: the home page gallery pool
 * (marked featured in the admin) and everything filed under the AquaPave category.
 * Only those rows are visible to signed-out visitors.
 */
export const usePublicMedia = () => {
  const [featuredPhotos, setFeaturedPhotos] = useState<PublicPhoto[]>([]);
  const [aquapavePhotos, setAquapavePhotos] = useState<PublicPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const [featured, aquapave, categories] = await Promise.all([
        supabase
          .from("media_files")
          .select("cdn_url, file_name, folder")
          .eq("featured_home", true)
          .order("uploaded_at", { ascending: false }),
        supabase
          .from("media_files")
          .select("cdn_url, file_name, folder")
          .eq("folder", AQUAPAVE_FOLDER),
        supabase.from("media_categories").select("value, label"),
      ]);

      if (!active) return;

      const labels = new Map((categories.data ?? []).map((c) => [c.value, c.label]));
      const toPhoto = (row: PhotoRow): PublicPhoto => ({
        cdnUrl: row.cdn_url,
        fileName: row.file_name,
        folder: row.folder,
        categoryLabel: labels.get(row.folder) ?? "",
      });

      setFeaturedPhotos(((featured.data ?? []) as PhotoRow[]).map(toPhoto));
      setAquapavePhotos(((aquapave.data ?? []) as PhotoRow[]).map(toPhoto));
      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { featuredPhotos, aquapavePhotos, loading };
};
