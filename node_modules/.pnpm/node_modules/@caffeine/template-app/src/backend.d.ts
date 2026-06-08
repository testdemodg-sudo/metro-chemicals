import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type ApiResult_3 = {
    __kind__: "ok";
    ok: PurchaseRecord;
} | {
    __kind__: "err";
    err: string;
};
export type ApiResult = {
    __kind__: "ok";
    ok: Product;
} | {
    __kind__: "err";
    err: string;
};
export type ApiResult_2 = {
    __kind__: "ok";
    ok: SaleRecord;
} | {
    __kind__: "err";
    err: string;
};
export interface InventoryStatus {
    isLowStock: boolean;
    product: Product;
}
export type ApiResult_1 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export interface CreateProductInput {
    purchasePrice: number;
    lowStockThreshold: bigint;
    name: string;
    description: string;
    imageUrl: string;
    quantity: bigint;
    category: string;
    salePrice: number;
}
export interface UpdateProductInput {
    id: ProductId;
    purchasePrice?: number;
    lowStockThreshold?: bigint;
    name?: string;
    description?: string;
    imageUrl?: string;
    quantity?: bigint;
    category?: string;
    salePrice?: number;
}
export interface CreateSaleInput {
    customerName: string;
    date: Timestamp;
    productId: ProductId;
    notes: string;
    quantitySold: bigint;
    salePrice: number;
}
export interface PurchaseRecord {
    id: PurchaseId;
    cost: number;
    supplierName: string;
    date: Timestamp;
    createdAt: Timestamp;
    productId: ProductId;
    notes: string;
    quantity: bigint;
}
export interface SaleRecord {
    id: SaleId;
    customerName: string;
    date: Timestamp;
    createdAt: Timestamp;
    productId: ProductId;
    notes: string;
    quantitySold: bigint;
    salePrice: number;
}
export type PurchaseId = bigint;
export type SaleId = bigint;
export type SessionToken = string;
export type ProductId = bigint;
export type LoginResult = {
    __kind__: "ok";
    ok: SessionToken;
} | {
    __kind__: "err";
    err: string;
};
export interface CreatePurchaseInput {
    cost: number;
    supplierName: string;
    date: Timestamp;
    productId: ProductId;
    notes: string;
    quantity: bigint;
}
export interface Product {
    id: ProductId;
    purchasePrice: number;
    lowStockThreshold: bigint;
    name: string;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    imageUrl: string;
    quantity: bigint;
    category: string;
    salePrice: number;
}
export interface LoginInput {
    username: string;
    password: string;
}
export interface backendInterface {
    adminLogin(input: LoginInput): Promise<LoginResult>;
    adminLogout(token: SessionToken): Promise<boolean>;
    createProduct(token: SessionToken, input: CreateProductInput): Promise<ApiResult>;
    createPurchaseRecord(token: SessionToken, input: CreatePurchaseInput): Promise<ApiResult_3>;
    createSaleRecord(token: SessionToken, input: CreateSaleInput): Promise<ApiResult_2>;
    deleteProduct(token: SessionToken, id: ProductId): Promise<ApiResult_1>;
    getAllProducts(): Promise<Array<Product>>;
    getAllPurchaseRecords(token: SessionToken): Promise<Array<PurchaseRecord>>;
    getAllSaleRecords(token: SessionToken): Promise<Array<SaleRecord>>;
    getInventoryStatus(): Promise<Array<InventoryStatus>>;
    getProductById(id: ProductId): Promise<Product | null>;
    isAdminAuthenticated(token: SessionToken): Promise<boolean>;
    updateLowStockThreshold(token: SessionToken, id: ProductId, threshold: bigint): Promise<ApiResult>;
    updateProduct(token: SessionToken, input: UpdateProductInput): Promise<ApiResult>;
}
