import { useState } from "react";
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);

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
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </p>
      <p>
        author
        <input
          type='text'
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
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </p>
      <button type='submit'>create</button>
    </form>
  );
};

export default BlogForm;
