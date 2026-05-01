import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Upload, LogOut, X, Copy, Check, CheckCircle,
  AlertCircle, ImagePlus, Folder
} from "lucide-react";

const CATEGORIES = [
  { value: "aquapave", label: "AquaPave" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "chimney", label: "Chimney Works" },
  { value: "brick-restoration", label: "Brick Restoration" },
  { value: "flagstone", label: "Flagstone" },
  { value: "natural-rock", label: "Natural Rock" },
  { value: "culture-stone", label: "Culture Stone" },
  { value: "paving-stone", label: "Paving Stone" },
  { value: "excavation", label: "Excavation" },
  { value: "gallery", label: "Gallery / General" },
];

type FileStatus = "pending" | "uploading" | "done" | "error";

interface StagedFile {
  id: string;
  file: File;
  editedName: string;
  status: FileStatus;
  cdnUrl?: string;
  error?: string;
  copied?: boolean;
}

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");

const getExt = (filename: string) => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "jpg";
};

const suggestName = (file: File, category: string, index: number) => {
  const ext = getExt(file.name);
  const num = String(index + 1).padStart(2, "0");
  return `cbs-masonry-${category}-${num}.${ext}`;
};

const AdminUpload = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState("gallery");
  const [files, setFiles] = useState<StagedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [allCopied, setAllCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stageFiles = (newFiles: File[]) => {
    const staged: StagedFile[] = newFiles.map((file, i) => ({
      id: crypto.randomUUID(),
      file,
      editedName: suggestName(file, category, files.length + i),
      status: "pending",
    }));
    setFiles((prev) => [...prev, ...staged]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    stageFiles(dropped);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    stageFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const updateName = (id: string, newName: string) => {
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, editedName: newName } : f));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadAll = async () => {
    const pending = files.filter((f) => f.status === "pending");
    if (!pending.length) return;
    setUploading(true);

    for (const staged of pending) {
      setFiles((prev) => prev.map((f) => f.id === staged.id ? { ...f, status: "uploading" } : f));

      try {
        const formData = new FormData();
        formData.append("file", staged.file);
        formData.append("fileName", staged.editedName);
        formData.append("folder", category);

        const { data, error } = await supabase.functions.invoke("bunny-upload", { body: formData });

        if (error || !data?.cdnUrl) {
          throw new Error(error?.message || data?.error || "Upload failed");
        }

        setFiles((prev) => prev.map((f) =>
          f.id === staged.id ? { ...f, status: "done", cdnUrl: data.cdnUrl } : f
        ));
      } catch (err) {
        setFiles((prev) => prev.map((f) =>
          f.id === staged.id ? { ...f, status: "error", error: String(err) } : f
        ));
      }
    }
    setUploading(false);
  };

  const copyUrl = async (id: string, url: string) => {
    await navigator.clipboard.writeText(url);
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, copied: true } : f));
    setTimeout(() => setFiles((prev) => prev.map((f) => f.id === id ? { ...f, copied: false } : f)), 2000);
  };

  const copyAllUrls = async () => {
    const urls = files.filter((f) => f.cdnUrl).map((f) => f.cdnUrl).join("\n");
    await navigator.clipboard.writeText(urls);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const handleSignOut = async () => { await signOut(); navigate("/admin/login"); };

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <div className="min-h-screen bg-card">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background border-b border-border h-14 flex items-center px-6 gap-4">
        <img
          src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100027458/9cc16a08-504a-4d.png"
          alt="CBS Masonry"
          crossOrigin="anonymous"
          className="h-8 w-auto object-contain"
        />
        <div className="h-5 w-px bg-border" />
        <span className="text-sm font-semibold text-foreground">Media Upload</span>
        <div className="flex-1" />
        <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border rounded hover:bg-muted"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </header>

      <div className="mx-auto max-w-[960px] px-6 py-8 space-y-6">

        {/* Category + controls row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2.5 flex-1">
            <Folder className="w-4 h-4 text-primary flex-shrink-0" />
            <label className="text-sm font-medium text-foreground whitespace-nowrap">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 text-sm border border-border rounded px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            {doneCount > 0 && (
              <button
                onClick={copyAllUrls}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-border rounded bg-background hover:bg-muted transition-colors"
              >
                {allCopied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                Copy All URLs
              </button>
            )}
            {pendingCount > 0 && (
              <button
                onClick={uploadAll}
                disabled={uploading}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 disabled:opacity-60 transition-all"
              >
                {uploading
                  ? <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  : <Upload className="w-3.5 h-3.5" />}
                Upload {pendingCount} file{pendingCount !== 1 ? "s" : ""}
              </button>
            )}
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-14 cursor-pointer transition-all ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-border bg-background hover:border-primary/50 hover:bg-primary/3"
          }`}
        >
          <ImagePlus className={`w-10 h-10 mb-3 transition-colors ${dragging ? "text-primary" : "text-muted-foreground"}`} />
          <p className="text-sm font-medium text-foreground mb-1">
            {dragging ? "Drop images here" : "Drag & drop images, or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground">JPG, PNG, WebP — multiple files supported</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="bg-background border border-border rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-card">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {files.length} file{files.length !== 1 ? "s" : ""} staged
              </span>
            </div>
            <div className="divide-y divide-border">
              {files.map((f) => (
                <div key={f.id} className="flex items-center gap-3 px-4 py-3">
                  {/* Thumb */}
                  <div className="w-10 h-10 rounded border border-border flex-shrink-0 overflow-hidden bg-muted">
                    <img
                      src={URL.createObjectURL(f.file)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name editor */}
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={f.editedName}
                      onChange={(e) => updateName(f.id, e.target.value)}
                      disabled={f.status !== "pending"}
                      className="w-full text-xs border border-border rounded px-2.5 py-1.5 bg-background text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary disabled:opacity-60 disabled:bg-muted"
                    />
                    {f.cdnUrl && (
                      <div className="text-[11px] text-primary mt-1 truncate font-mono">{f.cdnUrl}</div>
                    )}
                    {f.error && (
                      <div className="text-[11px] text-destructive mt-1">{f.error}</div>
                    )}
                  </div>

                  {/* Size */}
                  <span className="text-[11px] text-muted-foreground flex-shrink-0 w-14 text-right">
                    {(f.file.size / 1024).toFixed(0)} KB
                  </span>

                  {/* Status / actions */}
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {f.status === "pending" && (
                      <button
                        onClick={() => removeFile(f.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {f.status === "uploading" && (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                    {f.status === "done" && f.cdnUrl && (
                      <button
                        onClick={() => copyUrl(f.id, f.cdnUrl!)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="Copy CDN URL"
                      >
                        {f.copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                    {f.status === "done" && (
                      <CheckCircle className="w-4 h-4 text-primary ml-1" />
                    )}
                    {f.status === "error" && (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpload;
