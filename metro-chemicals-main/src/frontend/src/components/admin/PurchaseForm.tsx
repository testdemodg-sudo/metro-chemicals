import type { CreatePurchaseInput, Product } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

interface PurchaseFormProps {
  products: Product[];
  onSubmit: (data: CreatePurchaseInput) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
}

export default function PurchaseForm({
  products,
  onSubmit,
  onCancel,
  isPending,
}: PurchaseFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    productId: "",
    supplierName: "",
    quantity: "",
    cost: "",
    notes: "",
    date: today,
  });

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateMs = new Date(form.date).getTime();
    await onSubmit({
      productId: BigInt(form.productId),
      supplierName: form.supplierName.trim(),
      quantity: BigInt(Number(form.quantity) || 0),
      cost: Number(form.cost) || 0,
      notes: form.notes.trim(),
      date: BigInt(dateMs) * BigInt(1_000_000),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Date */}
        <div className="space-y-1.5">
          <Label htmlFor="purch-date" className="text-xs font-medium">
            Purchase Date *
          </Label>
          <Input
            id="purch-date"
            data-ocid="purchase-date-input"
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Product */}
        <div className="space-y-1.5">
          <Label htmlFor="purch-product" className="text-xs font-medium">
            Product *
          </Label>
          <select
            id="purch-product"
            data-ocid="purchase-product-select"
            value={form.productId}
            onChange={(e) => set("productId", e.target.value)}
            required
            className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring transition-smooth"
          >
            <option value="">Select product…</option>
            {products.map((p) => (
              <option key={String(p.id)} value={String(p.id)}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier */}
        <div className="space-y-1.5">
          <Label htmlFor="purch-supplier" className="text-xs font-medium">
            Supplier Name *
          </Label>
          <Input
            id="purch-supplier"
            data-ocid="purchase-supplier-input"
            placeholder="e.g. Sigma Chemicals Pvt Ltd"
            value={form.supplierName}
            onChange={(e) => set("supplierName", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <Label htmlFor="purch-qty" className="text-xs font-medium">
            Quantity *
          </Label>
          <Input
            id="purch-qty"
            data-ocid="purchase-quantity-input"
            type="number"
            min="1"
            placeholder="0"
            value={form.quantity}
            onChange={(e) => set("quantity", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Cost */}
        <div className="space-y-1.5">
          <Label htmlFor="purch-cost" className="text-xs font-medium">
            Total Cost (₹) *
          </Label>
          <Input
            id="purch-cost"
            data-ocid="purchase-cost-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.cost}
            onChange={(e) => set("cost", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Per unit — computed, read-only */}
        {form.cost && form.quantity && Number(form.quantity) > 0 && (
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">
              Unit Cost (auto)
            </Label>
            <div className="text-sm rounded-md border border-border bg-muted px-3 py-2 text-muted-foreground">
              ₹{(Number(form.cost) / Number(form.quantity)).toFixed(2)} / unit
            </div>
          </div>
        )}

        {/* Notes — full width */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="purch-notes" className="text-xs font-medium">
            Notes
          </Label>
          <textarea
            id="purch-notes"
            data-ocid="purchase-notes-input"
            placeholder="Any additional notes (batch number, quality, etc.)"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={2}
            className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring resize-none transition-smooth"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          <X className="w-3.5 h-3.5 mr-1.5" />
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={isPending}
          data-ocid="purchase-form-submit"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Purchase Record"
          )}
        </Button>
      </div>
    </form>
  );
}
