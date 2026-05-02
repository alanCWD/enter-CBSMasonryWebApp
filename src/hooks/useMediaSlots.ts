import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface MediaSlot {
  slot_key: string;
  cdn_url: string | null;
  alt_text: string | null;
  page: string;
}

export const useMediaSlots = () => {
  const [slots, setSlots] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    const { data } = await supabase
      .from("media_slots")
      .select("slot_key, cdn_url");
    const map: Record<string, string> = {};
    for (const row of data ?? []) {
      if (row.cdn_url) map[row.slot_key] = row.cdn_url;
    }
    setSlots(map);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  const assignSlot = async (slotKey: string, cdnUrl: string, page = "") => {
    // Optimistic update
    setSlots((prev) => ({ ...prev, [slotKey]: cdnUrl }));
    await supabase
      .from("media_slots")
      .upsert({ slot_key: slotKey, cdn_url: cdnUrl, page, updated_at: new Date().toISOString() });
  };

  const clearSlot = async (slotKey: string) => {
    setSlots((prev) => {
      const next = { ...prev };
      delete next[slotKey];
      return next;
    });
    await supabase
      .from("media_slots")
      .upsert({ slot_key: slotKey, cdn_url: null, updated_at: new Date().toISOString() });
  };

  return { slots, loading, assignSlot, clearSlot, refetch: fetchSlots };
};
