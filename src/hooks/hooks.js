import _ from "lodash";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = io(process.env.REACT_APP_SOCKET_URL)
    setSocket(ws);
    return () => ws.off();
  }, []);
  return socket;
}

export function useCutName(item) {
  const [cutName, setCutName] = useState("");
  useEffect(() => {
    const getName = (name) => {
      const cutName = name && name.split(" ", -1);
      const newName = cutName && cutName[cutName.length - 1].slice(0, 1);
      setCutName(newName);
    }
    getName(!_.isEmpty(item) && item.fullname);
  }, [item]);
  return cutName;
}