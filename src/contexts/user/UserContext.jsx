import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  users: []
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
