import { useState ,forwardRef} from "react";
const BlogForm = forwardRef((props, refs) => {
  

  return (
    <form onSubmit={props.handleCreateBlog}>
      <h1>create new blog</h1>
      <p>
        title{" "}
        <input
          type="text"
          value={props.newBlog.title}
          onChange={({ target }) =>
            props.setNewBlog({ ...props.newBlog, title: target.value })
          }
        />
      </p>
      <p>
        author{" "}
        <input
          type="text"
          value={props.newBlog.author}
          onChange={({ target }) =>
            props.setNewBlog({ ...props.newBlog, author: target.value })
          }
        />
      </p>
      <p>
        url{" "}
        <input
          type="text"
          value={props.newBlog.url}
          onChange={({ target }) =>
            props.setNewBlog({ ...props.newBlog, url: target.value })
          }
        />
      </p>
      <button type="submit">create</button>
    </form>
  );
  })

export default BlogForm;
