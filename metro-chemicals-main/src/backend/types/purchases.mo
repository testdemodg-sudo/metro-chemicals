import Common "common";

module {
  public type PurchaseId = Common.PurchaseId;
  public type ProductId = Common.ProductId;
  public type Timestamp = Common.Timestamp;

  public type PurchaseRecord = {
    id : PurchaseId;
    productId : ProductId;
    quantity : Nat;
    supplierName : Text;
    cost : Float;
    date : Timestamp;
    notes : Text;
    createdAt : Timestamp;
  };

  public type CreatePurchaseInput = {
    productId : ProductId;
    quantity : Nat;
    supplierName : Text;
    cost : Float;
    date : Timestamp;
    notes : Text;
  };
};
