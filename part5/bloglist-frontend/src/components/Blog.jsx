import { useState, Fragment } from "react";
const Blog = ({ blog }) => {
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
  console.log("blog");
  return (
    <div style={blogStyle}>
      <p>
        {blog.title}
        <button onClick={handleClick}>{showDetails ? "hide" : "view"}</button>
      </p>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button>likes</button>
          </p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
