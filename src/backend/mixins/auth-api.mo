import AuthLib "../lib/auth";
import AuthTypes "../types/auth";

mixin (sessions : AuthLib.State) {
  public shared func adminLogin(
    input : AuthTypes.LoginInput,
  ) : async AuthTypes.LoginResult {
    AuthLib.login(sessions, input)
  };

  public shared func adminLogout(
    token : AuthTypes.SessionToken,
  ) : async Bool {
    AuthLib.logout(sessions, token)
  };

  public query func isAdminAuthenticated(
    token : AuthTypes.SessionToken,
  ) : async Bool {
    AuthLib.isValidToken(sessions, token)
  };
};
