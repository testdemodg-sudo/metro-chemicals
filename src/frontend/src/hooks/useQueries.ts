import { createActor } from "@/backend";
import type {
  CreateProductInput,
  CreatePurchaseInput,
  CreateSaleInput,
  InventoryStatus,
  Product,
  ProductId,
  PurchaseRecord,
  SaleRecord,
  UpdateProductInput,
} from "@/backend.d";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { Product, PurchaseRecord, SaleRecord, InventoryStatus };

// ─── Public queries ──────────────────────────────────────────────────────────

export function useAllProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInventoryStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<InventoryStatus[]>({
    queryKey: ["inventory-status"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInventoryStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Admin queries ────────────────────────────────────────────────────────────

export function useAllPurchaseRecords() {
  const { actor, isFetching } = useActor(createActor);
  const { token, isAuthenticated } = useAdminAuth();
  return useQuery<PurchaseRecord[]>({
    queryKey: ["purchase-records"],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getAllPurchaseRecords(token);
    },
    enabled: !!actor && !isFetching && isAuthenticated && !!token,
  });
}

export function useAllSaleRecords() {
  const { actor, isFetching } = useActor(createActor);
  const { token, isAuthenticated } = useAdminAuth();
  return useQuery<SaleRecord[]>({
    queryKey: ["sale-records"],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getAllSaleRecords(token);
    },
    enabled: !!actor && !isFetching && isAuthenticated && !!token,
  });
}

// ─── Admin mutations ──────────────────────────────────────────────────────────

export function useCreateProduct() {
  const { actor } = useActor(createActor);
  const { token } = useAdminAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      if (!actor || !token) throw new Error("Not authenticated");
      const result = await actor.createProduct(token, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const { token } = useAdminAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateProductInput) => {
      if (!actor || !token) throw new Error("Not authenticated");
      const result = await actor.updateProduct(token, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const { token } = useAdminAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor || !token) throw new Error("Not authenticated");
      const result = await actor.deleteProduct(token, id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["inventory-status"] });
    },
  });
}

export function useCreatePurchaseRecord() {
  const { actor } = useActor(createActor);
  const { token } = useAdminAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePurchaseInput) => {
      if (!actor || !token) throw new Error("Not authenticated");
      const result = await actor.createPurchaseRecord(token, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["purchase-records"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateSaleRecord() {
  const { actor } = useActor(createActor);
  const { token } = useAdminAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateSaleInput) => {
      if (!actor || !token) throw new Error("Not authenticated");
      const result = await actor.createSaleRecord(token, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sale-records"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateLowStockThreshold() {
  const { actor } = useActor(createActor);
  const { token } = useAdminAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      threshold,
    }: { id: ProductId; threshold: bigint }) => {
      if (!actor || !token) throw new Error("Not authenticated");
      const result = await actor.updateLowStockThreshold(token, id, threshold);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["inventory-status"] });
    },
  });
}
