import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/user";

const initialState = {
  data: [],
  pending: false,
  error: false,
  friends: [],
}

export const handleSearchFriend = createAsyncThunk("page", async data => {
  let res = await userApi.search(data);
  return res.data;
});

export const handleGetFriend = createAsyncThunk("page/friend", async id => {
  let res = await userApi.friend({ id: id });
  return res.data;
});


const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(handleSearchFriend.pending, state => {
      state.pending = true;
    });
    builder.addCase(handleSearchFriend.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    });
    builder.addCase(handleSearchFriend.rejected, state => {
      state.pending = false;
      state.error = true;
    });
    builder.addCase(handleGetFriend.fulfilled, (state, { payload }) => {
      state.friends = payload;
    });
  }
});

const { reducer } = pageSlice;

export default reducer;