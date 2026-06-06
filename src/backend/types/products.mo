import Common "common";

module {
  public type ProductId = Common.ProductId;
  public type Timestamp = Common.Timestamp;

  // Internal mutable record (held in List)
  public type ProductInternal = {
    id : ProductId;
    var name : Text;
    var category : Text;
    var description : Text;
    var purchasePrice : Float;
    var salePrice : Float;
    var quantity : Nat;
    var lowStockThreshold : Nat;
    var imageUrl : Text;
    createdAt : Timestamp;
    var updatedAt : Timestamp;
  };

  // Shared/public immutable record (returned over the wire)
  public type Product = {
    id : ProductId;
    name : Text;
    category : Text;
    description : Text;
    purchasePrice : Float;
    salePrice : Float;
    quantity : Nat;
    lowStockThreshold : Nat;
    imageUrl : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type CreateProductInput = {
    name : Text;
    category : Text;
    description : Text;
    purchasePrice : Float;
    salePrice : Float;
    quantity : Nat;
    lowStockThreshold : Nat;
    imageUrl : Text;
  };

  public type UpdateProductInput = {
    id : ProductId;
    name : ?Text;
    category : ?Text;
    description : ?Text;
    purchasePrice : ?Float;
    salePrice : ?Float;
    quantity : ?Nat;
    lowStockThreshold : ?Nat;
    imageUrl : ?Text;
  };

  public type InventoryStatus = {
    product : Product;
    isLowStock : Bool;
  };
};
