import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
// JSON.parse(localStorage.getItem("user")) || 
const initialState = {
  user: null,
  isLoggedIn: false,
  pedding: null,
  error: false,
  errorss: {},
  online: false,
  users: []
};

export const handleLogin = createAsyncThunk("login", async data => {
  let res = await authApi.login(data);
  return res;
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    handleLogout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    handleRefresh(state, { payload }) {
      state.user = {
        ...state.user,
        payload
        // token: payload.token,
        // refresh_token: payload.refresh_token,
      }
    },
    setOnline(state, { payload }) {
      state.online = payload;
    },
    setUsers(state, { payload }) {
      state.users = payload;
    },
    removeUsers(state, { payload }) {
      console.log(payload);
      state.users = state.users.filter(item => item.username === payload.username);
    }
  },
  extraReducers: builder => {
    builder.addCase(handleLogin.pending, state => {
      state.pedding = true;
      state.error = false;
    });
    builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
      if (payload && payload.error === 2) {
        state.errorss.err = "Tài khoản không tồn tại";
        state.pedding = false;
      } else if (payload && payload.error === 0) {
        state.pedding = false;
        state.user = payload.data;
        state.isLoggedIn = true;
        // const { fullname, username, _id } = payload.data;
        // const { isLoggedIn } = state;
        // localStorage.setItem("user", JSON.stringify({ fullname, _id, subname: username, isLoggedIn }));
      } else if (payload && payload.error === 3)
        state.errorss.err = "Mật khẩu không đúng";
      state.pedding = false;
    });
    builder.addCase(handleLogin.rejected, state => {
      state.pedding = false;
      state.error = true;
    });
  }
});

const { actions, reducer } = loginSlice;

export const { removeUsers, handleLogout, handleRefresh, setOnline, setUsers } = actions;

export default reducer