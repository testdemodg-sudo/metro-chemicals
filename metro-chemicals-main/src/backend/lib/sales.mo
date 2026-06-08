import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/sales";
import Common "../types/common";

module {
  public type State = List.List<Types.SaleRecord>;

  public func newState() : State {
    List.empty<Types.SaleRecord>()
  };

  public func create(
    state : State,
    nextId : Nat,
    input : Types.CreateSaleInput,
  ) : Types.SaleRecord {
    let record : Types.SaleRecord = {
      id = nextId;
      productId = input.productId;
      quantitySold = input.quantitySold;
      customerName = input.customerName;
      salePrice = input.salePrice;
      date = input.date;
      notes = input.notes;
      createdAt = Time.now();
    };
    state.add(record);
    record
  };

  public func getAll(state : State) : [Types.SaleRecord] {
    state.toArray()
  };
};
