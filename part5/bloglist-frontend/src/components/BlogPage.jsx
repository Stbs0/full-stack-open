import { forwardRef, useState } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogPage = forwardRef((props, refs) => {
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
      <Togglable
        buttonLabel='create Blog'
        ref={refs}>
        <BlogForm createBlog={props.handleCreateBlog} />
      </Togglable>
      // TODO fix this. it dont re render on inserting the blog
      <div>
        {props.userBlogs.map((blog) => {
          <Blog
            key={blog.id}
            blog={blog}
          />;
          console.log(blog);
        })}
      </div>
    </div>
  );
});
export default BlogPage;
