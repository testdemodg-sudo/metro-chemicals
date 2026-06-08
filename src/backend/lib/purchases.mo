import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/purchases";
import Common "../types/common";

module {
  public type State = List.List<Types.PurchaseRecord>;

  public func newState() : State {
    List.empty<Types.PurchaseRecord>()
  };

  public func create(
    state : State,
    nextId : Nat,
    input : Types.CreatePurchaseInput,
  ) : Types.PurchaseRecord {
    let record : Types.PurchaseRecord = {
      id = nextId;
      productId = input.productId;
      quantity = input.quantity;
      supplierName = input.supplierName;
      cost = input.cost;
      date = input.date;
      notes = input.notes;
      createdAt = Time.now();
    };
    state.add(record);
    record
  };

  public func getAll(state : State) : [Types.PurchaseRecord] {
    state.toArray()
  };
};
