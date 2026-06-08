import type { CreateSaleInput, Product } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

interface SaleFormProps {
  products: Product[];
  onSubmit: (data: CreateSaleInput) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
}

export default function SaleForm({
  products,
  onSubmit,
  onCancel,
  isPending,
}: SaleFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    productId: "",
    customerName: "",
    quantitySold: "",
    salePrice: "",
    notes: "",
    date: today,
  });

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Auto-fill sale price when product is selected
  const handleProductChange = (id: string) => {
    set("productId", id);
    if (id && !form.salePrice) {
      const product = products.find((p) => String(p.id) === id);
      if (product) set("salePrice", String(product.salePrice));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateMs = new Date(form.date).getTime();
    await onSubmit({
      productId: BigInt(form.productId),
      customerName: form.customerName.trim(),
      quantitySold: BigInt(Number(form.quantitySold) || 0),
      salePrice: Number(form.salePrice) || 0,
      notes: form.notes.trim(),
      date: BigInt(dateMs) * BigInt(1_000_000),
    });
  };

  const totalRevenue =
    form.salePrice && form.quantitySold
      ? Number(form.salePrice) * Number(form.quantitySold)
      : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Date */}
        <div className="space-y-1.5">
          <Label htmlFor="sale-date" className="text-xs font-medium">
            Sale Date *
          </Label>
          <Input
            id="sale-date"
            data-ocid="sale-date-input"
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Product */}
        <div className="space-y-1.5">
          <Label htmlFor="sale-product" className="text-xs font-medium">
            Product *
          </Label>
          <select
            id="sale-product"
            data-ocid="sale-product-select"
            value={form.productId}
            onChange={(e) => handleProductChange(e.target.value)}
            required
            className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring transition-smooth"
          >
            <option value="">Select product…</option>
            {products.map((p) => (
              <option key={String(p.id)} value={String(p.id)}>
                {p.name}{" "}
                {Number(p.quantity) > 0
                  ? `(${String(p.quantity)} in stock)`
                  : "(out of stock)"}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Name */}
        <div className="space-y-1.5">
          <Label htmlFor="sale-customer" className="text-xs font-medium">
            Customer Name *
          </Label>
          <Input
            id="sale-customer"
            data-ocid="sale-customer-input"
            placeholder="e.g. ABC Pharma Pvt Ltd"
            value={form.customerName}
            onChange={(e) => set("customerName", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <Label htmlFor="sale-qty" className="text-xs font-medium">
            Quantity Sold *
          </Label>
          <Input
            id="sale-qty"
            data-ocid="sale-quantity-input"
            type="number"
            min="1"
            placeholder="0"
            value={form.quantitySold}
            onChange={(e) => set("quantitySold", e.target.value)}
            required
            className="text-sm"
          />
        </div>

        {/* Sale Price per unit */}
        <div className="space-y-1.5">
          <Label htmlFor="sale-price" className="text-xs font-medium">
            Sale Price per Unit (₹) *
          </Label>
          <Input
            id="sale-price"
            data-ocid="sale-price-input"
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

        {/* Total revenue — computed */}
        {totalRevenue !== null && (
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">
              Total Revenue (auto)
            </Label>
            <div className="text-sm rounded-md border border-primary/30 bg-primary/5 px-3 py-2 font-semibold text-primary">
              ₹{totalRevenue.toFixed(2)}
            </div>
          </div>
        )}

        {/* Notes — full width */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="sale-notes" className="text-xs font-medium">
            Notes
          </Label>
          <textarea
            id="sale-notes"
            data-ocid="sale-notes-input"
            placeholder="Invoice number, delivery details, etc."
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
          data-ocid="sale-form-submit"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Sale Record"
          )}
        </Button>
      </div>
    </form>
  );
}
