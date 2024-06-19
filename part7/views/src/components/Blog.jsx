import { useParams } from "react-router-dom";
import { useState } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg } from "../actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserValue } from "../UserContext";
const Blog = ({ blogs }) => {
  const navigate =useNavigate()
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatch();
  const id = useParams().id;
  const user = useUserValue();
  const blog = blogs.find((blog) => blog.id === id);
  const voteMutation = useMutation({
    mutationFn: ({ updatedBlog, id }) => {
      console.log(id, updatedBlog);
      return blogService.update(updatedBlog, id);
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      );
      notificationDispatcher(
        createSuccessMsg(`you have voted '${updatedBlog.title}' `),
      );
    },
    onError: (error) => {
      console.log(error);
      notificationDispatcher(createErrorMsg(`vote failed`));
    },
    onSettled: (data) => {
      setTimeout(() => {
        notificationDispatcher({ type: "CLEAR" });
      }, 5000);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.log(error);
      notificationDispatcher(createErrorMsg(`vote failed`));
    },
    onSettled: (data) => {
      setTimeout(() => {
        notificationDispatcher({ type: "CLEAR" });
      }, 5000);
    },
  });
  const handleUpdateBlog = async (updatedBlog) => {
    console.log(updatedBlog.id);
    voteMutation.mutate({ updatedBlog, id: updatedBlog.id });
  };
  const handleDeleteBlog = (id, title) => {
    if (window.confirm(`remove blog "${title}"`)) {
      deleteMutation.mutate(id);
      navigate("/users")
      notificationDispatcher(createSuccessMsg(`you have deleted '${title}' `));
    }
  };
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{" "}
        <button
          onClick={() =>
            handleUpdateBlog({ ...blog, likes: String(+blog.likes + 1) })
          }>
          like
        </button>
      </p>
      <p>
        added by {blog.user.name}{" "}
        {user.username === blog.user.username ? (
          <button onClick={() => handleDeleteBlog(blog.id, blog.title)}>
            delete
          </button>
        ) : null}
      </p>
    </div>
  );
};
export default Blog;
