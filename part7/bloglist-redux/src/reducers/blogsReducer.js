import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../services/blogs";
import {
  createErrorMsg,
  createSuccessMsg,
} from "../reducers/notificationReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    increaseLike: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      );
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

const { addBlog, setBlogs, increaseLike,deleteBlog } = blogsSlice.actions;
export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogsServices.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(createErrorMsg("failed to load data"));
    }
  };
};
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const res = await blogsServices.create(newBlog);

      dispatch(addBlog(res));
      dispatch(
        createSuccessMsg({
          message: `Blog created: ${newBlog.title}, ${newBlog.author}`,
        }),
      );
    } catch (error) {
      dispatch(createErrorMsg({ message: "couldn't create" }));
    }
  };
};
export const addLike = (updatedBlog) => {
  return async (dispatch) => {
    try {
      const res = await blogsServices.update(updatedBlog.id, updatedBlog);

      dispatch(increaseLike(res));
      dispatch(
        createSuccessMsg({
          message: `You liked ${updatedBlog.title} by ${updatedBlog.author}`,
        }),
      );
    } catch (error) {
      dispatch(createErrorMsg({ message: "couldn't create" }));
    }
  };
};
export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsServices.remove(blog.id);

      dispatch(deleteBlog(blog.id));
      dispatch(
        createSuccessMsg({
          message: `You deleted ${blog.title} by ${blog.author}`,
        }),
      );
    } catch (error) {
      dispatch(createErrorMsg({ message: "couldn't delete" }));
    }
  };
};

export default blogsSlice.reducer;
