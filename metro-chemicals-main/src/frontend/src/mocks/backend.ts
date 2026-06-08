import type { backendInterface } from "../backend";

const sampleProduct = {
  id: BigInt(1),
  name: "Sodium Chloride",
  description: "High purity pharmaceutical grade sodium chloride",
  category: "Inorganic Chemicals",
  imageUrl: "",
  quantity: BigInt(500),
  purchasePrice: 250.0,
  salePrice: 350.0,
  lowStockThreshold: BigInt(50),
  createdAt: BigInt(Date.now()),
  updatedAt: BigInt(Date.now()),
};

const sampleProduct2 = {
  id: BigInt(2),
  name: "Hydrochloric Acid",
  description: "Industrial grade hydrochloric acid solution",
  category: "Acids",
  imageUrl: "",
  quantity: BigInt(200),
  purchasePrice: 180.0,
  salePrice: 260.0,
  lowStockThreshold: BigInt(30),
  createdAt: BigInt(Date.now()),
  updatedAt: BigInt(Date.now()),
};

const samplePurchase = {
  id: BigInt(1),
  productId: BigInt(1),
  supplierName: "Global Chem Suppliers",
  quantity: BigInt(100),
  cost: 25000.0,
  date: BigInt(Date.now()),
  notes: "Bulk order for Q1",
  createdAt: BigInt(Date.now()),
};

const sampleSale = {
  id: BigInt(1),
  productId: BigInt(1),
  customerName: "Metro Pharma Ltd",
  quantitySold: BigInt(50),
  salePrice: 17500.0,
  date: BigInt(Date.now()),
  notes: "Standard order",
  createdAt: BigInt(Date.now()),
};

export const mockBackend: backendInterface = {
  adminLogin: async (input) => {
    if (input.username === "zeropoint1" && input.password === "@metrocare1212@") {
      return { __kind__: "ok", ok: "mock-session-token-123" };
    }
    return { __kind__: "err", err: "Invalid credentials" };
  },
  adminLogout: async () => true,
  createProduct: async () => ({ __kind__: "ok", ok: sampleProduct }),
  createPurchaseRecord: async () => ({ __kind__: "ok", ok: samplePurchase }),
  createSaleRecord: async () => ({ __kind__: "ok", ok: sampleSale }),
  deleteProduct: async () => ({ __kind__: "ok", ok: true }),
  getAllProducts: async () => [sampleProduct, sampleProduct2],
  getAllPurchaseRecords: async () => [samplePurchase],
  getAllSaleRecords: async () => [sampleSale],
  getInventoryStatus: async () => [
    { product: sampleProduct, isLowStock: false },
    { product: sampleProduct2, isLowStock: false },
  ],
  getProductById: async () => sampleProduct,
  isAdminAuthenticated: async () => true,
  updateLowStockThreshold: async () => ({ __kind__: "ok", ok: sampleProduct }),
  updateProduct: async () => ({ __kind__: "ok", ok: sampleProduct }),
};
