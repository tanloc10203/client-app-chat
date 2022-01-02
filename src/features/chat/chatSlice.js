import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupMessage: {},
  statusMessage: {},
  notifications: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setGroupMessage(state, { payload }) {
      state.groupMessage = payload;
    },
    setPrevGroupMessage(state, { payload }) {
      const message = { ...state.groupMessage };
      const status = { ...state.statusMessage };
      state.notifications = payload.others.notifications;
      if (payload.key in message) {
        message[payload.key] = [...message[payload.key], payload.others];
        status[payload.key] = [...status[payload.key], payload.others.status];
      } else {
        message[payload.key] = [payload.others];
        status[payload.key] = [payload.others.status];
      }
      state.groupMessage = { ...message };
      state.statusMessage = { ...status };
    },
    setStatusMessage(state, { payload }) {
      const { data, key } = payload;
      const status = { ...state.statusMessage };
      state.notifications = data.notifications;
      if (key in status) {
        status[key] = [...status[key], data];
      } else status[key] = [data];
      state.statusMessage = { ...status };
    },
    setNotification(state, { payload }) {
      // console.log('setNotification', payload)
      state.notifications = payload;
    }
  }
});

const { reducer, actions } = chatSlice;
export const {
  setGroupMessage,
  setPrevGroupMessage,
  setStatusMessage,
  setNotification
} = actions;
export default reducer;