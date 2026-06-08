module {
  public type SessionToken = Text;

  public type LoginInput = {
    username : Text;
    password : Text;
  };

  public type LoginResult = {
    #ok : SessionToken;
    #err : Text;
  };
};
