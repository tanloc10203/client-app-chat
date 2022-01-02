import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {}
});

const { actions, reducer } = appSlice;

export const { handleSocket } = actions;

export default reducer;