import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { MediaFileRecord } from "@/lib/media";

/**
 * Loads the whole photo library (Bunny.net storage merged with the database records)
 * and keeps home page placement in sync.
 */
export const useMediaFiles = () => {
  const [files, setFiles] = useState<MediaFileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: invokeError } = await supabase.functions.invoke("bunny-list");
    if (invokeError || !data?.files) {
      setError(invokeError?.message || data?.error || "Could not load the photo library.");
      setLoading(false);
      return;
    }
    setFiles(data.files as MediaFileRecord[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  /** Adds or removes photos from the home page gallery pool. Returns an error message on failure. */
  const setFeatured = async (cdnUrls: string[], featured: boolean): Promise<string | null> => {
    if (!cdnUrls.length) return null;
    const previous = files;
    setFiles((prev) =>
      prev.map((f) => (cdnUrls.includes(f.cdnUrl) ? { ...f, featuredHome: featured } : f))
    );

    const { error: updateError } = await supabase
      .from("media_files")
      .update({ featured_home: featured })
      .in("cdn_url", cdnUrls);

    if (updateError) {
      setFiles(previous);
      return updateError.message;
    }
    return null;
  };

  /** Reflects a photo that was moved to another category. */
  const applyMove = (sourceCdnUrl: string, newCdnUrl: string, targetFolder: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.cdnUrl === sourceCdnUrl ? { ...f, cdnUrl: newCdnUrl, folder: targetFolder } : f
      )
    );
  };

  return { files, loading, error, reload, setFeatured, applyMove };
};
