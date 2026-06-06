import ProductLib "../lib/products";
import AuthLib "../lib/auth";
import ProductTypes "../types/products";
import AuthTypes "../types/auth";
import Common "../types/common";

mixin (
  products : ProductLib.State,
  nextProductId : [var Nat],
  sessions : AuthLib.State,
) {
  public shared func createProduct(
    token : AuthTypes.SessionToken,
    input : ProductTypes.CreateProductInput,
  ) : async Common.ApiResult<ProductTypes.Product> {
    if (not AuthLib.isValidToken(sessions, token)) {
      return #err("Unauthorized");
    };
    let product = ProductLib.create(products, nextProductId[0], input);
    nextProductId[0] += 1;
    #ok(product)
  };

  public shared func updateProduct(
    token : AuthTypes.SessionToken,
    input : ProductTypes.UpdateProductInput,
  ) : async Common.ApiResult<ProductTypes.Product> {
    if (not AuthLib.isValidToken(sessions, token)) {
      return #err("Unauthorized");
    };
    ProductLib.update(products, input)
  };

  public shared func deleteProduct(
    token : AuthTypes.SessionToken,
    id : Common.ProductId,
  ) : async Common.ApiResult<Bool> {
    if (not AuthLib.isValidToken(sessions, token)) {
      return #err("Unauthorized");
    };
    ProductLib.delete(products, id)
  };

  public query func getAllProducts() : async [ProductTypes.Product] {
    ProductLib.getAll(products)
  };

  public query func getProductById(id : Common.ProductId) : async ?ProductTypes.Product {
    ProductLib.getById(products, id)
  };

  public query func getInventoryStatus() : async [ProductTypes.InventoryStatus] {
    ProductLib.getInventoryStatus(products)
  };

  public shared func updateLowStockThreshold(
    token : AuthTypes.SessionToken,
    id : Common.ProductId,
    threshold : Nat,
  ) : async Common.ApiResult<ProductTypes.Product> {
    if (not AuthLib.isValidToken(sessions, token)) {
      return #err("Unauthorized");
    };
    ProductLib.updateLowStockThreshold(products, id, threshold)
  };
};
