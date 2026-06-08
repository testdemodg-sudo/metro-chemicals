import Common "common";

module {
  public type SaleId = Common.SaleId;
  public type ProductId = Common.ProductId;
  public type Timestamp = Common.Timestamp;

  public type SaleRecord = {
    id : SaleId;
    productId : ProductId;
    quantitySold : Nat;
    customerName : Text;
    salePrice : Float;
    date : Timestamp;
    notes : Text;
    createdAt : Timestamp;
  };

  public type CreateSaleInput = {
    productId : ProductId;
    quantitySold : Nat;
    customerName : Text;
    salePrice : Float;
    date : Timestamp;
    notes : Text;
  };
};
