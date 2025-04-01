import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    readNotifications: [],
    unreadNotifications: [],
    reloadNotifications: true,
  },
  reducers: {
    setReadNotifications: (state, action) => {
      state.readNotifications = action.payload;
    },
    setUnreadNotifications: (state, action) => {
      state.unreadNotifications = action.payload;
    },
    setReloadNotifications: (state, action) => {
      state.reloadNotifications = action.payload;
    },
  },
});

export const {
  setReadNotifications,
  setUnreadNotifications,
  setReloadNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
