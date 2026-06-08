import PurchaseLib "../lib/purchases";
import AuthLib "../lib/auth";
import ProductLib "../lib/products";
import PurchaseTypes "../types/purchases";
import AuthTypes "../types/auth";
import Common "../types/common";

mixin (
  purchases : PurchaseLib.State,
  nextPurchaseId : [var Nat],
  products : ProductLib.State,
  sessions : AuthLib.State,
) {
  public shared func createPurchaseRecord(
    token : AuthTypes.SessionToken,
    input : PurchaseTypes.CreatePurchaseInput,
  ) : async Common.ApiResult<PurchaseTypes.PurchaseRecord> {
    if (not AuthLib.isValidToken(sessions, token)) {
      return #err("Unauthorized");
    };
    if (not ProductLib.exists(products, input.productId)) {
      return #err("Product not found");
    };
    let record = PurchaseLib.create(purchases, nextPurchaseId[0], input);
    nextPurchaseId[0] += 1;
    #ok(record)
  };

  public query func getAllPurchaseRecords(
    token : AuthTypes.SessionToken,
  ) : async [PurchaseTypes.PurchaseRecord] {
    if (not AuthLib.isValidToken(sessions, token)) {
      return [];
    };
    PurchaseLib.getAll(purchases)
  };
};
