import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  id: string;
  value: string;
  label: string;
}

const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("media_categories")
      .select("id, value, label")
      .order("created_at");
    setCategories(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const addCategory = async (label: string): Promise<{ error: string | null }> => {
    const value = slugify(label);
    if (!value) return { error: "Invalid name" };
    const { error } = await supabase
      .from("media_categories")
      .insert({ value, label: label.trim() });
    if (error) return { error: error.message };
    await fetch();
    return { error: null };
  };

  return { categories, loading, addCategory, refetch: fetch };
};
