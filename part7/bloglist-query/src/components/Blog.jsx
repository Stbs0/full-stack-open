import { useState } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg } from "../actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatch();

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleUpdateBlog = async (e, updatedBlog) => {
    console.log(updatedBlog.id);
    voteMutation.mutate({ updatedBlog, id: updatedBlog.id });
  };

  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  const handleDeleteBlog = (id, title) => {
    if (window.confirm(`remove blog "${title}"`)) {
      deleteMutation.mutate(id);
      notificationDispatcher(createSuccessMsg(`you have voted '${title}' `));
    }
  };
  return (
    <div
      data-testid='blog-list'
      style={blogStyle}>
      <p>
        {blog.title} / {blog.author}
        <button
          data-testid='show details'
          className='showBtn'
          onClick={handleClick}>
          {showDetails ? "hide" : "view"}
        </button>
      </p>

      <div style={showDetails ? { display: "block" } : { display: "none" }}>
        <p className='url'>{blog.url}</p>
        <p className='likes'>
          {blog.likes}
          <button
            className='likeBtn'
            data-testid='like btn'
            onClick={(e) => {
              handleUpdateBlog(e, { ...blog, likes: String(+blog.likes + 1) });
            }}>
            likes
          </button>
        </p>

        {user?.username === blog?.user?.username ? (
          <button
            data-testid='delete btn'
            onClick={() => handleDeleteBlog(blog.id, blog.title)}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
