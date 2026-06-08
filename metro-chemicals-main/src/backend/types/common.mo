module {
  public type ProductId = Nat;
  public type PurchaseId = Nat;
  public type SaleId = Nat;
  public type Timestamp = Int;

  public type ApiResult<T> = { #ok : T; #err : Text };
};
