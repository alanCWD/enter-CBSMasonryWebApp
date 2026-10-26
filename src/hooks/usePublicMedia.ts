import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SERVICE_PAGES } from "@/lib/servicePages";

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

const SERVICE_FOLDERS = SERVICE_PAGES.map((page) => page.folder);

/**
 * Reads the photos that are published to the public site: the home page gallery pool
 * (marked featured in the admin) and everything filed under a service page category.
 */
export const usePublicMedia = () => {
  const [featuredPhotos, setFeaturedPhotos] = useState<PublicPhoto[]>([]);
  const [photosByFolder, setPhotosByFolder] = useState<Record<string, PublicPhoto[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const [featured, service, categories] = await Promise.all([
        supabase
          .from("media_files")
          .select("cdn_url, file_name, folder")
          .eq("featured_home", true)
          .order("uploaded_at", { ascending: false }),
        supabase
          .from("media_files")
          .select("cdn_url, file_name, folder")
          .in("folder", SERVICE_FOLDERS)
          .order("uploaded_at", { ascending: false }),
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

      const grouped: Record<string, PublicPhoto[]> = {};
      for (const row of (service.data ?? []) as PhotoRow[]) {
        const photo = toPhoto(row);
        grouped[photo.folder] = [...(grouped[photo.folder] ?? []), photo];
      }

      setFeaturedPhotos(((featured.data ?? []) as PhotoRow[]).map(toPhoto));
      setPhotosByFolder(grouped);
      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { featuredPhotos, photosByFolder, loading };
};
