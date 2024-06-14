import { createSlice } from "@reduxjs/toolkit";
import { createSuccessMsg, createErrorMsg } from "./notificationReducer";
import login from "../services/login";
import storage from "../services/storage";
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    removeUser: (state, action) => {
      return null;
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;

export const handleLogIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await login(credentials);
      storage.saveUser(user);

      dispatch(addUser(user));

      dispatch(createSuccessMsg({ message: `Welcome back, ${user.name}` }));
    } catch (error) {
      dispatch(createErrorMsg({ message: "wrong cardinential" }));
      console.log(error);
    }
  };
};
export default userSlice.reducer;
// export const handleLogOut = (credentials) => {
//   return async (dispatch) => {
//     try {
//       const user = await login(credentials);

//       dispatch(addUser(user));
//       dispatch(createSuccessMsg({ message: `Welcome back, ${user.name}` }));
//     } catch (error) {
//       dispatch(createErrorMsg({ message: "wrong cardinential" }));
//     }
//   };
// };
