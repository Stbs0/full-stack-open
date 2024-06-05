import { useState } from "react";
const Blog = ({ blog, handleUpdateBlog, user, handleDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div style={blogStyle}>
      <p>
        {blog.title}
        <button onClick={handleClick}>{showDetails ? "hide" : "view"}</button>
      </p>

      <div style={showDetails ? { display: "block" } : { display: "none" }}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button
            onClick={(e) => {
              handleUpdateBlog(
                e,
                { ...blog, likes: String(+blog.likes + 1) },
                blog.id,
              );
            }}>
            likes
          </button>
        </p>
        <p>{blog.author}</p>
        {user.username === blog.user.username ? (
          <button onClick={()=>handleDeleteBlog(blog.id,blog.title)}>remove</button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
