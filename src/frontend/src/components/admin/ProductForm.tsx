import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

const CATEGORIES = [
  "APIs",
  "Solvents",
  "Reagents",
  "Lab Chemicals",
  "Fine Chemicals",
];

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductInput | UpdateProductInput) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
}

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
  isPending,
}: ProductFormProps) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name ?? "",
    category: product?.category ?? "",
    description: product?.description ?? "",
    quantity: product ? String(product.quantity) : "",
    purchasePrice: product ? String(product.purchasePrice) : "",
    salePrice: product ? String(product.salePrice) : "",
    imageUrl: product?.imageUrl ?? "",
    lowStockThreshold: product ? String(product.lowStockThreshold) : "10",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setImageError("File too large. Max 5MB.");
      return;
    }
    setImageError("");
    setImageUploading(true);
    try {
      // Convert to data URL for preview (object-storage upload would happen here)
      const reader = new FileReader();
      reader.onload = () => {
        set("imageUrl", reader.result as string);
        setImageUploading(false);
      };
      reader.onerror = () => {
        setImageError("Failed to read file");
        setImageUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setImageError("Upload failed");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const base: CreateProductInput = {
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      quantity: BigInt(Number(form.quantity) || 0),
      purchasePrice: Number(form.purchasePrice) || 0,
      salePrice: Number(form.salePrice) || 0,
      imageUrl: form.imageUrl.trim(),
      lowStockThreshold: BigInt(Number(form.lowStockThreshold) || 10),
    };
    if (isEdit && product) {
      await onSubmit({ id: product.id, ...base } as UpdateProductInput);
    } else {
      await onSubmit(base);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="pf-name" className="text-xs font-medium">
            Product Name *
          </Label>
          <Input
            id="pf-name"
            data-ocid="product-name-input"
            placeholder="e.g. Paracetamol API"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label htmlFor="pf-category" className="text-xs font-medium">
            Category *
          </Label>
          <select
            id="pf-category"
            data-ocid="product-category-select"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            required
            className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring transition-smooth"
          >
            <option value="">Select category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Description — full width */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="pf-desc" className="text-xs font-medium">
            Description
          </Label>
          <textarea
            id="pf-desc"
            data-ocid="product-description-input"
            placeholder="Brief description of the product, usage, purity, etc."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={2}
            className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring resize-none transition-smooth"
          />
        </div>

        {/* Purchase Price */}
        <div className="space-y-1.5">
          <Label htmlFor="pf-pp" className="text-xs font-medium">
            Purchase Price (₹) *
          </Label>
          <Input
            id="pf-pp"
            data-ocid="product-purchase-price-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.purchasePrice}
            onChange={(e) => set("purchasePrice", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Sale Price */}
        <div className="space-y-1.5">
          <Label htmlFor="pf-sp" className="text-xs font-medium">
            Sale Price (₹) *
          </Label>
          <Input
            id="pf-sp"
            data-ocid="product-sale-price-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.salePrice}
            onChange={(e) => set("salePrice", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <Label htmlFor="pf-qty" className="text-xs font-medium">
            Quantity (units)
          </Label>
          <Input
            id="pf-qty"
            data-ocid="product-quantity-input"
            type="number"
            min="0"
            placeholder="0"
            value={form.quantity}
            onChange={(e) => set("quantity", e.target.value)}
            className="text-sm"
          />
        </div>

        {/* Low Stock Threshold */}
        <div className="space-y-1.5">
          <Label htmlFor="pf-lst" className="text-xs font-medium">
            Low Stock Alert Below
          </Label>
          <Input
            id="pf-lst"
            data-ocid="product-low-stock-input"
            type="number"
            min="1"
            placeholder="10"
            value={form.lowStockThreshold}
            onChange={(e) => set("lowStockThreshold", e.target.value)}
            className="text-sm"
          />
        </div>

        {/* Image upload — full width */}
        <div className="sm:col-span-2 space-y-2">
          <Label className="text-xs font-medium">Product Image</Label>
          <div className="flex items-start gap-3">
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-lg border border-border bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
              {imageUploading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={() => set("imageUrl", "")}
                />
              ) : (
                <ImagePlus className="w-6 h-6 text-muted-foreground/50" />
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                data-ocid="product-image-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
                disabled={imageUploading}
                className="w-full"
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                {imageUploading ? "Uploading…" : "Upload Image"}
              </Button>
              <Input
                placeholder="Or paste image URL…"
                value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                className="text-xs"
              />
              {imageError && (
                <p className="text-xs text-destructive">{imageError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2 border-t border-border">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          <X className="w-3.5 h-3.5 mr-1.5" />
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          data-ocid="product-form-submit"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              {isEdit ? "Updating…" : "Saving…"}
            </>
          ) : isEdit ? (
            "Update Product"
          ) : (
            "Save Product"
          )}
        </Button>
      </div>
    </form>
  );
}
