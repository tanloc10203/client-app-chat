import { createContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {

};

export const AppContext = createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [socket, setSoket] = useState(null);
  const { user } = useSelector(state => state.login);

  useEffect(() => {
    const socket = io("http://localhost:8080/");
    setSoket(socket);
  }, []);

  useEffect(() => {
    user && socket?.emit("JOIN", user);
  }, [socket, user]);

  return (
    <AppContext.Provider
      value={{
        socket,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
