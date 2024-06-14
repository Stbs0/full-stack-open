import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../services/blogs";
const blogsSlice = createSlice({
  name: "blogs",
  //TODO // add action for fetching the data from the server
  initialState: setBlogs(),
  reducers: {
    addBlog: (state, action) => {
      return state.push(action.payload);
    },
  },
});

const { addBlog } = blogsSlice.actions;
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const res = await blogsServices.create(newBlog);
    dispatch(addBlog(res.data));
  };
};
export const setBlogs = () => {
  return async (dispatch) => {
    const res = await blogsServices.getAll();
    return res.data;
  };
};
