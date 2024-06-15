import { useState } from "react";
import { useNotificationDispatch } from "../NotificationContext";
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const notificationDispatcher = useNotificationDispatch();
  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    notificationDispatcher({
      message: `created new blog '${newBlog.title}'`,
      type: "NOTIFY",
    });

    setTimeout(() => {
      notificationDispatcher({ type: "CLEAR" });
    });
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
};

export default BlogForm;
