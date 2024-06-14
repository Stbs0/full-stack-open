import { useState } from "react";
import { createBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
const NewBlog = ({ doCreate }) => {
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
// TODo think hard here
  const handleSubmit = (event) => {
    event.preventDefault();
 try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      dispatch(
        createSuccessMsg({
          message: `Blog created: ${newBlog.title}, ${newBlog.author}`,
        }),
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(createErrorMsg({ message: error }));
    }

    dispatch(createBlog({ title, url, author }));
    setAuthor("");
    setTitle("");
    setUrl("");
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
