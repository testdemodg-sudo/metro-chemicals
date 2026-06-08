import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/products";
import Common "../types/common";

module {
  public type State = List.List<Types.ProductInternal>;

  public func newState() : State {
    List.empty<Types.ProductInternal>()
  };

  public func toPublic(p : Types.ProductInternal) : Types.Product {
    {
      id = p.id;
      name = p.name;
      category = p.category;
      description = p.description;
      purchasePrice = p.purchasePrice;
      salePrice = p.salePrice;
      quantity = p.quantity;
      lowStockThreshold = p.lowStockThreshold;
      imageUrl = p.imageUrl;
      createdAt = p.createdAt;
      updatedAt = p.updatedAt;
    }
  };

  public func create(
    state : State,
    nextId : Nat,
    input : Types.CreateProductInput,
  ) : Types.Product {
    let now = Time.now();
    let internal : Types.ProductInternal = {
      id = nextId;
      var name = input.name;
      var category = input.category;
      var description = input.description;
      var purchasePrice = input.purchasePrice;
      var salePrice = input.salePrice;
      var quantity = input.quantity;
      var lowStockThreshold = input.lowStockThreshold;
      var imageUrl = input.imageUrl;
      createdAt = now;
      var updatedAt = now;
    };
    state.add(internal);
    toPublic(internal)
  };

  public func getAll(state : State) : [Types.Product] {
    state.map<Types.ProductInternal, Types.Product>(func(p) { toPublic(p) }).toArray()
  };

  public func getById(state : State, id : Common.ProductId) : ?Types.Product {
    switch (state.find(func(p : Types.ProductInternal) : Bool { p.id == id })) {
      case (?p) ?toPublic(p);
      case null null;
    }
  };

  public func update(
    state : State,
    input : Types.UpdateProductInput,
  ) : Common.ApiResult<Types.Product> {
    switch (state.find(func(p : Types.ProductInternal) : Bool { p.id == input.id })) {
      case null #err("Product not found");
      case (?p) {
        switch (input.name) { case (?v) p.name := v; case null {} };
        switch (input.category) { case (?v) p.category := v; case null {} };
        switch (input.description) { case (?v) p.description := v; case null {} };
        switch (input.purchasePrice) { case (?v) p.purchasePrice := v; case null {} };
        switch (input.salePrice) { case (?v) p.salePrice := v; case null {} };
        switch (input.quantity) { case (?v) p.quantity := v; case null {} };
        switch (input.lowStockThreshold) { case (?v) p.lowStockThreshold := v; case null {} };
        switch (input.imageUrl) { case (?v) p.imageUrl := v; case null {} };
        p.updatedAt := Time.now();
        #ok(toPublic(p))
      };
    }
  };

  public func delete(
    state : State,
    id : Common.ProductId,
  ) : Common.ApiResult<Bool> {
    switch (state.findIndex(func(p : Types.ProductInternal) : Bool { p.id == id })) {
      case null #err("Product not found");
      case (?_idx) {
        // Remove by rebuilding — filter out the element
        let filtered = state.filter(func(p : Types.ProductInternal) : Bool { p.id != id });
        state.clear();
        state.append(filtered);
        #ok(true)
      };
    }
  };

  public func getInventoryStatus(state : State) : [Types.InventoryStatus] {
    state.map<Types.ProductInternal, Types.InventoryStatus>(func(p) : Types.InventoryStatus {
      {
        product = toPublic(p);
        isLowStock = p.quantity <= p.lowStockThreshold;
      }
    }).toArray()
  };

  public func updateLowStockThreshold(
    state : State,
    id : Common.ProductId,
    threshold : Nat,
  ) : Common.ApiResult<Types.Product> {
    switch (state.find(func(p : Types.ProductInternal) : Bool { p.id == id })) {
      case null #err("Product not found");
      case (?p) {
        p.lowStockThreshold := threshold;
        p.updatedAt := Time.now();
        #ok(toPublic(p))
      };
    }
  };

  public func exists(state : State, id : Common.ProductId) : Bool {
    switch (state.find(func(p : Types.ProductInternal) : Bool { p.id == id })) {
      case (?_) true;
      case null false;
    }
  };

  public func decrementQuantity(
    state : State,
    id : Common.ProductId,
    qty : Nat,
  ) : Common.ApiResult<()> {
    switch (state.find(func(p : Types.ProductInternal) : Bool { p.id == id })) {
      case null #err("Product not found");
      case (?p) {
        if (p.quantity < qty) {
          #err("Insufficient stock")
        } else {
          p.quantity -= qty;
          p.updatedAt := Time.now();
          #ok(())
        }
      };
    }
  };
};
