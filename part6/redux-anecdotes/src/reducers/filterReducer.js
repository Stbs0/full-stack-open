import { createSlice, current } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterInpt(state, action) {
      
      return action.payload
    },
  },
});
export const { filterInpt } = filterSlice.actions;
export default filterSlice.reducer;
