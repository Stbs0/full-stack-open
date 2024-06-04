import { forwardRef,useState,useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogPage = forwardRef(
  (props,refs) => {
     const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const blogFormRef = useRef()
    return (
      <div>
        <h1>blogs</h1>
        {props.message || props.errorMessage ? (
          <Notification
            message={props.message}
            errorMessage={props.errorMessage}
          />
        ) : null}
        <p>
          {props.user.name} logged in{" "}
          <button onClick={props.handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="create Blog" ref={refs}>
          <BlogForm
            ref={blogFormRef}
            newBlog={props.newBlog}
            handleCreateBlog={props.handleCreateBlog}
            setNewBlog={props.setNewBlog}
          />
        </Togglable>

        <div>
          <Blog userBlogs={props.userBlogs} />
        </div>
      </div>
    );
  }
);
export default BlogPage;
