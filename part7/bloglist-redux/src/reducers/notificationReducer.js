import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", type: "" },
  reducers: {
    notifySuccuss: (state, action) => {
      action.payload.type = "success";
      return action.payload;
    },
    notifyError: (state, action) => {
      action.payload.type = "error";
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    clearNotify: (state, action) => {
      return { message: "", type: "" };
    },
  },
});

const { notifyError, clearNotify, notifySuccuss } = notificationSlice.actions;

export const createSuccessMsg = (message) => {
  return (dispatch) => {
    dispatch(notifySuccuss(message));
    setTimeout(() => {
      dispatch(clearNotify());
    }, 3000);
  };
};
export const createErrorMsg = (message) => {
  return (dispatch) => {
    dispatch(notifyError(message));
    setTimeout(() => {
      dispatch(clearNotify());
    }, 3000);
  };
};

export default notificationSlice.reducer;
