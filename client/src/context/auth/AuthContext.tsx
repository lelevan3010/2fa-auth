import React, { createContext, useReducer, Dispatch } from "react";
import { reducer } from "./Reducer";

type Action = { type: String; payload: {} };

interface AuthContext {
  Auth: { 
    loggedIn:      Boolean; 
    invalidToken?: Boolean,
    mfaEnabled?:   Boolean
  };

  dispatchAuth: Dispatch<Action>;
}

const initialState = {
  loggedIn:   false,
  mfaEnabled: false
};

const initialContext: AuthContext = {
  Auth: { ...initialState },
  dispatchAuth: (): void => {},
};

export const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }: any) => {
  const [Auth, dispatchAuth] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ Auth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const { Consumer } = AuthContext;
