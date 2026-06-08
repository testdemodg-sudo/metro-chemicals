import List "mo:core/List";
import Set "mo:core/Set";
import ProductTypes "types/products";
import PurchaseTypes "types/purchases";
import SaleTypes "types/sales";
import AuthTypes "types/auth";
import ProductsApi "mixins/products-api";
import PurchasesApi "mixins/purchases-api";
import SalesApi "mixins/sales-api";
import AuthApi "mixins/auth-api";

actor {
  // --- Stable State ---
  let products = List.empty<ProductTypes.ProductInternal>();
  let nextProductId = [var 1 : Nat];

  let purchases = List.empty<PurchaseTypes.PurchaseRecord>();
  let nextPurchaseId = [var 1 : Nat];

  let sales = List.empty<SaleTypes.SaleRecord>();
  let nextSaleId = [var 1 : Nat];

  let sessions = Set.empty<AuthTypes.SessionToken>();

  // --- Mixin Composition ---
  include AuthApi(sessions);
  include ProductsApi(products, nextProductId, sessions);
  include PurchasesApi(purchases, nextPurchaseId, products, sessions);
  include SalesApi(sales, nextSaleId, products, sessions);
};
