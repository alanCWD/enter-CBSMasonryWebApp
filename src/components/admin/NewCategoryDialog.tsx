import { useState } from "react";

interface NewCategoryDialogProps {
  onClose: () => void;
  onSubmit: (label: string) => Promise<string | null>;
}

const NewCategoryDialog = ({ onClose, onSubmit }: NewCategoryDialogProps) => {
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!label.trim()) return;
    setLoading(true);
    setError("");
    const message = await onSubmit(label);
    if (message) {
      setError(message);
      setLoading(false);
      return;
    }
    setLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border rounded-xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold text-foreground mb-1">Add New Category</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Creates a new upload folder for photos. You can add a page gallery for it later.
        </p>
        <input
          autoFocus
          type="text"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="e.g. Patios, Retaining Walls"
          className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-1"
        />
        {error && <p className="text-xs text-destructive mb-2">{error}</p>}
        <div className="flex gap-2 justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!label.trim() || loading}
            className="px-4 py-2 text-xs bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCategoryDialog;
