import { useState } from "react";
const Blog = ({ blog, handleUpdateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log("blog");

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
  console.log("blog",blog);
  return (
    <div style={blogStyle}>
      <p>
        {blog.title}
        <button onClick={handleClick}>{showDetails ? "hide" : "view"}</button>
      </p>

      <div style={showDetails ? { display: "block" } : { display: "none" }}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button
            onClick={() =>
              handleUpdateBlog(
                { ...blog, likes: String(+blog.likes + 1) },
                blog.id,
              )
            }>
            likes
          </button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
