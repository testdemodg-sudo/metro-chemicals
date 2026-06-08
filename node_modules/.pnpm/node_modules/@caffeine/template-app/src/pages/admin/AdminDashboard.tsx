import type {
  CreateProductInput,
  CreatePurchaseInput,
  CreateSaleInput,
  UpdateProductInput,
} from "@/backend.d";
import ProductForm from "@/components/admin/ProductForm";
import PurchaseForm from "@/components/admin/PurchaseForm";
import SaleForm from "@/components/admin/SaleForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, PurchaseRecord, SaleRecord } from "@/hooks/useQueries";
import {
  useAllProducts,
  useAllPurchaseRecords,
  useAllSaleRecords,
  useCreateProduct,
  useCreatePurchaseRecord,
  useCreateSaleRecord,
  useDeleteProduct,
  useInventoryStatus,
  useUpdateLowStockThreshold,
  useUpdateProduct,
} from "@/hooks/useQueries";
import {
  AlertTriangle,
  BarChart3,
  Edit2,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AdminTab = "products" | "purchases" | "sales" | "inventory";

interface AdminDashboardProps {
  activeTab: AdminTab;
  setTab: (tab: AdminTab) => void;
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────

interface ConfirmDeleteProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function ConfirmDeleteModal({
  name,
  onConfirm,
  onCancel,
  isPending,
}: ConfirmDeleteProps) {
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent border-0 w-full h-full max-w-none max-h-none m-0"
      aria-labelledby="confirm-delete-title"
    >
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        role="presentation"
      />
      <div className="glass-card relative z-10 w-full max-w-sm shadow-glass">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3
              id="confirm-delete-title"
              className="font-display font-semibold text-sm"
            >
              Delete Product
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Are you sure you want to delete <strong>"{name}"</strong>? This
              action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="confirm-delete-btn"
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

// ─── Summary Cards ────────────────────────────────────────────────────────────

function SummaryCards({
  onTabChange,
}: { onTabChange: (tab: AdminTab) => void }) {
  const { data: products, isLoading: lprod } = useAllProducts();
  const { data: purchases, isLoading: lpurch } = useAllPurchaseRecords();
  const { data: sales, isLoading: lsale } = useAllSaleRecords();
  const { data: inventory } = useInventoryStatus();

  const lowStockCount = inventory?.filter((i) => i.isLowStock).length ?? 0;

  const cards = [
    {
      label: "Total Products",
      value: lprod ? null : (products?.length ?? 0),
      icon: <Package className="w-5 h-5" />,
      color: "text-primary",
      bg: "bg-primary/8",
      tab: "products" as AdminTab,
    },
    {
      label: "Purchase Orders",
      value: lpurch ? null : (purchases?.length ?? 0),
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "text-secondary-foreground",
      bg: "bg-secondary/20",
      tab: "purchases" as AdminTab,
    },
    {
      label: "Sale Records",
      value: lsale ? null : (sales?.length ?? 0),
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-accent-foreground",
      bg: "bg-accent/20",
      tab: "sales" as AdminTab,
    },
    {
      label: "Low Stock Items",
      value: lowStockCount,
      icon: <AlertTriangle className="w-5 h-5" />,
      color:
        lowStockCount > 0
          ? "text-amber-600 dark:text-amber-400"
          : "text-muted-foreground",
      bg:
        lowStockCount > 0 ? "bg-amber-50 dark:bg-amber-950/20" : "bg-muted/50",
      tab: "inventory" as AdminTab,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {cards.map((card) => (
        <button
          key={card.label}
          type="button"
          onClick={() => onTabChange(card.tab)}
          data-ocid={`summary-card-${card.tab}`}
          className="glass-card text-left hover:border-primary/30 hover:shadow-glass transition-smooth group"
        >
          <div
            className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3 ${card.color}`}
          >
            {card.icon}
          </div>
          <div>
            {card.value === null ? (
              <Skeleton className="h-7 w-12 mb-1" />
            ) : (
              <p className={`text-2xl font-display font-bold ${card.color}`}>
                {card.value}
              </p>
            )}
            <p className="text-xs text-muted-foreground font-medium">
              {card.label}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

function ProductsTab() {
  const { data: products, isLoading } = useAllProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const handleCreate = async (
    data: CreateProductInput | UpdateProductInput,
  ) => {
    await createProduct.mutateAsync(data as CreateProductInput);
    toast.success("Product created successfully");
    setShowAddForm(false);
  };

  const handleUpdate = async (
    data: CreateProductInput | UpdateProductInput,
  ) => {
    await updateProduct.mutateAsync(data as UpdateProductInput);
    toast.success("Product updated successfully");
    setEditProduct(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-5">
      {deleteTarget && (
        <ConfirmDeleteModal
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteProduct.isPending}
        />
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{products?.length ?? 0}</strong>{" "}
          products total
        </p>
        <Button
          data-ocid="add-product-btn"
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditProduct(null);
          }}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <div className="glass rounded-xl border border-border p-5 shadow-glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm">New Product</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ProductForm
            onSubmit={handleCreate}
            onCancel={() => setShowAddForm(false)}
            isPending={createProduct.isPending}
          />
        </div>
      )}

      {editProduct && (
        <div className="glass rounded-xl border border-primary/30 p-5 shadow-glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm">
              Edit: {editProduct.name}
            </h3>
            <button
              type="button"
              onClick={() => setEditProduct(null)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ProductForm
            product={editProduct}
            onSubmit={handleUpdate}
            onCancel={() => setEditProduct(null)}
            isPending={updateProduct.isPending}
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : !products?.length ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="products-empty"
        >
          <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No products yet</p>
          <p className="text-xs mt-1">Click "Add Product" to get started</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[auto_1fr_100px_110px_110px_100px_90px] gap-x-4 px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span className="w-10">Image</span>
            <span>Product / Category</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Buy (₹)</span>
            <span className="text-right">Sell (₹)</span>
            <span className="text-center">Status</span>
            <span className="text-center">Actions</span>
          </div>

          {products.map((p: Product, idx) => {
            const isLow = Number(p.quantity) <= Number(p.lowStockThreshold);
            return (
              <div
                key={String(p.id)}
                data-ocid="product-row"
                className={`flex sm:grid sm:grid-cols-[auto_1fr_100px_110px_110px_100px_90px] sm:gap-x-4 items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-smooth ${idx % 2 === 0 ? "bg-card" : "bg-background"}`}
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-md overflow-hidden border border-border bg-muted flex-shrink-0 flex items-center justify-center">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <Package className="w-4 h-4 text-muted-foreground/50" />
                  )}
                </div>

                {/* Name + category */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {p.category}
                  </p>
                </div>

                {/* Qty */}
                <div className="hidden sm:block text-right">
                  <span
                    className={`text-sm font-semibold ${isLow ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}
                  >
                    {String(p.quantity)}
                  </span>
                </div>

                {/* Buy price */}
                <div className="hidden sm:block text-right">
                  <span className="text-sm text-muted-foreground">
                    ₹{p.purchasePrice.toFixed(2)}
                  </span>
                </div>

                {/* Sell price */}
                <div className="hidden sm:block text-right">
                  <span className="text-sm font-semibold text-primary">
                    ₹{p.salePrice.toFixed(2)}
                  </span>
                </div>

                {/* Status */}
                <div className="hidden sm:flex justify-center">
                  <Badge
                    variant="outline"
                    className={
                      isLow
                        ? "text-amber-600 border-amber-300 dark:border-amber-700 text-xs"
                        : "text-secondary-foreground border-secondary/40 text-xs"
                    }
                  >
                    {isLow ? "Low Stock" : "In Stock"}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-1 ml-auto sm:ml-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditProduct(p);
                      setShowAddForm(false);
                    }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                    aria-label="Edit product"
                    data-ocid="edit-product-btn"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(p)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                    aria-label="Delete product"
                    data-ocid="delete-product-btn"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Purchases Tab ────────────────────────────────────────────────────────────

function PurchasesTab() {
  const { data: purchases, isLoading } = useAllPurchaseRecords();
  const { data: products } = useAllProducts();
  const createPurchase = useCreatePurchaseRecord();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data: CreatePurchaseInput) => {
    await createPurchase.mutateAsync(data);
    toast.success("Purchase record added");
    setShowForm(false);
  };

  const productName = (id: bigint) =>
    products?.find((p) => p.id === id)?.name ?? `Product #${String(id)}`;

  const formatDate = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalSpend = purchases?.reduce((s, r) => s + r.cost, 0) ?? 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">
              {purchases?.length ?? 0}
            </strong>{" "}
            records
          </p>
          {totalSpend > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Total Spend:{" "}
              <strong className="text-foreground">
                ₹{totalSpend.toFixed(2)}
              </strong>
            </p>
          )}
        </div>
        <Button
          data-ocid="add-purchase-btn"
          onClick={() => setShowForm(!showForm)}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Purchase
        </Button>
      </div>

      {showForm && (
        <div className="glass rounded-xl border border-border p-5 shadow-glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm">
              New Purchase Record
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <PurchaseForm
            products={products ?? []}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            isPending={createPurchase.isPending}
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : !purchases?.length ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="purchases-empty"
        >
          <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No purchase records yet</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="hidden sm:grid grid-cols-[120px_1fr_120px_100px_90px_1fr] gap-x-4 px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span>Date</span>
            <span>Product</span>
            <span>Supplier</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Cost</span>
            <span>Notes</span>
          </div>
          {purchases.map((r: PurchaseRecord, idx) => (
            <div
              key={String(r.id)}
              data-ocid="purchase-row"
              className={`flex sm:grid sm:grid-cols-[120px_1fr_120px_100px_90px_1fr] sm:gap-x-4 items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-smooth ${idx % 2 === 0 ? "bg-card" : "bg-background"}`}
            >
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatDate(r.date)}
              </span>
              <p className="font-medium text-sm truncate flex-1 sm:flex-none">
                {productName(r.productId)}
              </p>
              <p className="hidden sm:block text-sm text-muted-foreground truncate">
                {r.supplierName}
              </p>
              <p className="hidden sm:block text-sm text-right font-medium">
                {String(r.quantity)}
              </p>
              <p className="hidden sm:block text-sm text-right font-semibold text-foreground">
                ₹{r.cost.toFixed(2)}
              </p>
              <p className="hidden sm:block text-xs text-muted-foreground truncate">
                {r.notes || "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sales Tab ────────────────────────────────────────────────────────────────

function SalesTab() {
  const { data: sales, isLoading } = useAllSaleRecords();
  const { data: products } = useAllProducts();
  const createSale = useCreateSaleRecord();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data: CreateSaleInput) => {
    await createSale.mutateAsync(data);
    toast.success("Sale record added");
    setShowForm(false);
  };

  const productName = (id: bigint) =>
    products?.find((p) => p.id === id)?.name ?? `Product #${String(id)}`;

  const formatDate = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalRevenue =
    sales?.reduce((s, r) => s + r.salePrice * Number(r.quantitySold), 0) ?? 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{sales?.length ?? 0}</strong>{" "}
            records
          </p>
          {totalRevenue > 0 && (
            <p className="text-xs mt-0.5">
              Total Revenue:{" "}
              <strong className="text-primary">
                ₹{totalRevenue.toFixed(2)}
              </strong>
            </p>
          )}
        </div>
        <Button
          data-ocid="add-sale-btn"
          onClick={() => setShowForm(!showForm)}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Sale
        </Button>
      </div>

      {showForm && (
        <div className="glass rounded-xl border border-border p-5 shadow-glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm">
              New Sale Record
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <SaleForm
            products={products ?? []}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            isPending={createSale.isPending}
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : !sales?.length ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="sales-empty"
        >
          <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No sale records yet</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="hidden sm:grid grid-cols-[120px_1fr_120px_100px_120px_120px] gap-x-4 px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span>Date</span>
            <span>Product</span>
            <span>Customer</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Price/Unit</span>
            <span className="text-right">Revenue</span>
          </div>
          {sales.map((r: SaleRecord, idx) => (
            <div
              key={String(r.id)}
              data-ocid="sale-row"
              className={`flex sm:grid sm:grid-cols-[120px_1fr_120px_100px_120px_120px] sm:gap-x-4 items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-smooth ${idx % 2 === 0 ? "bg-card" : "bg-background"}`}
            >
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatDate(r.date)}
              </span>
              <p className="font-medium text-sm truncate flex-1 sm:flex-none">
                {productName(r.productId)}
              </p>
              <p className="hidden sm:block text-sm text-muted-foreground truncate">
                {r.customerName}
              </p>
              <p className="hidden sm:block text-sm text-right font-medium">
                {String(r.quantitySold)}
              </p>
              <p className="hidden sm:block text-sm text-right text-muted-foreground">
                ₹{r.salePrice.toFixed(2)}
              </p>
              <p className="hidden sm:block text-sm text-right font-semibold text-primary">
                ₹{(r.salePrice * Number(r.quantitySold)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Inventory Tab ────────────────────────────────────────────────────────────

function InventoryTab() {
  const { data: inventory, isLoading } = useInventoryStatus();
  const updateThreshold = useUpdateLowStockThreshold();
  const [editThreshold, setEditThreshold] = useState<{
    id: bigint;
    value: string;
  } | null>(null);

  const lowStock = inventory?.filter((i) => i.isLowStock) ?? [];

  const handleThresholdSave = async () => {
    if (!editThreshold) return;
    try {
      await updateThreshold.mutateAsync({
        id: editThreshold.id,
        threshold: BigInt(Number(editThreshold.value) || 10),
      });
      toast.success("Low stock threshold updated");
      setEditThreshold(null);
    } catch {
      toast.error("Failed to update threshold");
    }
  };

  return (
    <div className="space-y-5">
      {lowStock.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
              {lowStock.length} product{lowStock.length > 1 ? "s" : ""} low on
              stock
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
              {lowStock.map((i) => i.product.name).join(" · ")}
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      ) : !inventory?.length ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="inventory-empty"
        >
          <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No inventory data</p>
          <p className="text-xs mt-1">Add products to track inventory</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1fr_80px_120px_120px_140px] gap-x-4 px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span>Product / Category</span>
            <span className="text-right">Stock</span>
            <span className="text-right">Threshold</span>
            <span className="text-center">Status</span>
            <span className="text-center">Action</span>
          </div>
          {inventory.map(({ product, isLowStock }, idx) => (
            <div
              key={String(product.id)}
              data-ocid="inventory-row"
              className={`flex sm:grid sm:grid-cols-[1fr_80px_120px_120px_140px] sm:gap-x-4 items-center gap-3 px-4 py-3 border-b border-border last:border-0 transition-smooth ${
                isLowStock
                  ? "bg-amber-50/50 dark:bg-amber-950/10 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                  : idx % 2 === 0
                    ? "bg-card hover:bg-muted/30"
                    : "bg-background hover:bg-muted/30"
              }`}
            >
              {/* Name + category */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {product.category}
                </p>
              </div>

              {/* Stock qty */}
              <div className="hidden sm:block text-right">
                <span
                  className={`text-sm font-bold ${isLowStock ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}
                >
                  {String(product.quantity)}
                </span>
              </div>

              {/* Threshold — editable */}
              <div className="hidden sm:flex justify-end">
                {editThreshold?.id === product.id ? (
                  <Input
                    type="number"
                    min="1"
                    value={editThreshold.value}
                    onChange={(e) =>
                      setEditThreshold((t) =>
                        t ? { ...t, value: e.target.value } : t,
                      )
                    }
                    className="h-7 text-xs w-20 text-right"
                    autoFocus
                    data-ocid="threshold-input"
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {String(product.lowStockThreshold)}
                  </span>
                )}
              </div>

              {/* Status badge */}
              <div className="hidden sm:flex justify-center">
                <Badge
                  variant="outline"
                  className={
                    isLowStock
                      ? "text-amber-600 border-amber-300 dark:border-amber-700 text-xs"
                      : "text-secondary-foreground border-secondary/40 text-xs"
                  }
                >
                  {isLowStock ? "⚠ Low Stock" : "✓ OK"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="hidden sm:flex justify-center gap-1 ml-auto sm:ml-0">
                {editThreshold?.id === product.id ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs px-2"
                      onClick={() => setEditThreshold(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={handleThresholdSave}
                      disabled={updateThreshold.isPending}
                      data-ocid="save-threshold-btn"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setEditThreshold({
                        id: product.id,
                        value: String(product.lowStockThreshold),
                      })
                    }
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary px-2 py-1 rounded hover:bg-primary/5 transition-smooth"
                    data-ocid="edit-threshold-btn"
                  >
                    <Edit2 className="w-3 h-3" />
                    Set Threshold
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard({
  activeTab,
  setTab,
}: AdminDashboardProps) {
  return (
    <div data-ocid="admin-dashboard">
      <SummaryCards onTabChange={setTab} />
      {activeTab === "products" && <ProductsTab />}
      {activeTab === "purchases" && <PurchasesTab />}
      {activeTab === "sales" && <SalesTab />}
      {activeTab === "inventory" && <InventoryTab />}
    </div>
  );
}
