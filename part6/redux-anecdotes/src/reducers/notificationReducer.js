import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
  },
});
export const { notify } = notificationSlice.actions;
export const setNotification = (text, time) => {
  return async (dispatch) => {
    dispatch(notify(text));
    setTimeout(() => {
      dispatch(notify(null));
    }, time);
  };
};
export default notificationSlice.reducer;
