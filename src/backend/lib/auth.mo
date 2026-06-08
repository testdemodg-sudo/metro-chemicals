import Set "mo:core/Set";
import Time "mo:core/Time";
import Types "../types/auth";

module {
  // Active session tokens
  public type State = Set.Set<Types.SessionToken>;

  let ADMIN_USERNAME = "zeropoint1";
  let ADMIN_PASSWORD = "@metrocare1212@";

  public func newState() : State {
    Set.empty<Types.SessionToken>()
  };

  func generateToken(username : Text) : Types.SessionToken {
    "tok_" # username # "_" # Time.now().toText()
  };

  public func login(
    state : State,
    input : Types.LoginInput,
  ) : Types.LoginResult {
    if (input.username == ADMIN_USERNAME and input.password == ADMIN_PASSWORD) {
      let token = generateToken(input.username);
      state.add(token);
      #ok(token)
    } else {
      #err("Invalid username or password")
    }
  };

  public func isValidToken(state : State, token : Types.SessionToken) : Bool {
    state.contains(token)
  };

  public func logout(state : State, token : Types.SessionToken) : Bool {
    if (state.contains(token)) {
      state.remove(token);
      true
    } else {
      false
    }
  };
};
