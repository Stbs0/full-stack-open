const Blog = ({  userBlogs }) => (
  <div>
    {userBlogs.map((blog) => (
      <p key={blog.id}>{blog.title}</p>
    ))}
  </div>
);

export default Blog