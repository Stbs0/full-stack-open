import { useState } from "react";
import { createBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = { title, url, author };
    dispatch(createBlog(newBlog));
    setAuthor("");
    setTitle("");
    setUrl("");
    // blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type='text'
            data-testid='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type='text'
            data-testid='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type='text'
            data-testid='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
