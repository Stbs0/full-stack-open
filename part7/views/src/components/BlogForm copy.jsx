import { useState, forwardRef } from "react";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg } from "../actions";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // eslint-disable-next-line react/display-name
const BlogForm = forwardRef((props, ref) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const queryClient = useQueryClient();
  const notificationDispatcher = useNotificationDispatch();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      notificationDispatcher(
        createSuccessMsg(`you have created '${newBlog.title}' `),
      );
    },
    onError: (error) => {
      console.log(error);
      notificationDispatcher(createErrorMsg(`create failed`));
    },
    onSettled: () => {
      setTimeout(() => {
        notificationDispatcher({ type: "CLEAR" });
      }, 5000);
    },
  });
  const addBlog = (event) => {
    event.preventDefault();
    newBlogMutation.mutate(newBlog);
    ref.current.toggleVisibility();
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <form onSubmit={addBlog}>
      <h1>create new blog</h1>
      <p>
        title
        <input
          type='text'
          value={newBlog.title}
          placeholder='write title'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </p>
      <p>
        author
        <input
          type='text'
          placeholder='write author'
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </p>
      <p>
        url
        <input
          type='text'
          placeholder='write url'
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </p>
      <button
        className='createBlogBtn'
        type='submit'>
        create
      </button>
    </form>
  );
});

export default BlogForm;
