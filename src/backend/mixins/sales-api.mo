import SaleLib "../lib/sales";
import AuthLib "../lib/auth";
import ProductLib "../lib/products";
import SaleTypes "../types/sales";
import AuthTypes "../types/auth";
import Common "../types/common";

mixin (
  sales : SaleLib.State,
  nextSaleId : [var Nat],
  products : ProductLib.State,
  sessions : AuthLib.State,
) {
  public shared func createSaleRecord(
    token : AuthTypes.SessionToken,
    input : SaleTypes.CreateSaleInput,
  ) : async Common.ApiResult<SaleTypes.SaleRecord> {
    if (not AuthLib.isValidToken(sessions, token)) {
      return #err("Unauthorized");
    };
    switch (ProductLib.decrementQuantity(products, input.productId, input.quantitySold)) {
      case (#err(e)) return #err(e);
      case (#ok(_)) {};
    };
    let record = SaleLib.create(sales, nextSaleId[0], input);
    nextSaleId[0] += 1;
    #ok(record)
  };

  public query func getAllSaleRecords(
    token : AuthTypes.SessionToken,
  ) : async [SaleTypes.SaleRecord] {
    if (not AuthLib.isValidToken(sessions, token)) {
      return [];
    };
    SaleLib.getAll(sales)
  };
};
