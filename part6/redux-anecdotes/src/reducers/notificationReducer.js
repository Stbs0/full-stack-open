import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
    setNotification(text,time){

    }
  },
});
export const { notify } = notificationSlice.actions;
export default notificationSlice.reducer;
