import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
const BlogPage = ({
  handleLogout,
  user,
  newBlog,
  handleCreateBlog,
  setNewBlog,
  userBlogs,
  message,
  errorMessage,
}) => {
  return (
    <div>
      <h1>blogs</h1>
      {message || errorMessage ? (
        <Notification message={message} errorMessage={errorMessage} />
      ) : null}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <CreateBlog
        newBlog={newBlog}
        handleCreateBlog={handleCreateBlog}
        setNewBlog={setNewBlog}
      />
      <div>
        {userBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
export default BlogPage;
