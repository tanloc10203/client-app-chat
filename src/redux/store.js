import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "../features/login/loginSlice";
import pageReducer from "../components/main-page/pageSlice";
import appReducer from "./appSlice";
import chatReducer from "../features/chat/chatSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    page: pageReducer,
    app: appReducer,
    chat: chatReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;