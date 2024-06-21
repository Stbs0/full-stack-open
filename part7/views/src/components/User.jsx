import { Link } from "react-router-dom";
const User = ({ user }) => {
  console.log(user);
  if (!user) {
    return null;
  }
  const blogStyle = {
    border: "solid",
    borderWidth: 1,
  };
  return (
    <div>
      {" "}
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li
            style={blogStyle}
            key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
