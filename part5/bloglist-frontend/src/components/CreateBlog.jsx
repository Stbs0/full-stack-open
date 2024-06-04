const CreateBlog = ({ newBlog, handleCreateBlog, setNewBlog }) => {
  <form onSubmit={handleCreateBlog}>
    <h1>create new blog</h1>
    <p>
      title{" "}
      <input
        type="text"
        value={newBlog.title}
        onChange={({ target }) =>
          setNewBlog({ ...newBlog, title: target.value })
        }
      />
    </p>
    <p>
      author{" "}
      <input
        type="text"
        value={newBlog.author}
        onChange={({ target }) =>
          setNewBlog({ ...newBlog, author: target.value })
        }
      />
    </p>
    <p>
      url{" "}
      <input
        type="text"
        value={newBlog.url}
        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
      />
    </p>
    <button type="submit">create</button>
  </form>;
};
export default CreateBlog;
