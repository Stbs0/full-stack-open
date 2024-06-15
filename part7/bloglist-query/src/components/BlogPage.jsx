import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";import blogService from "../services/blogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// eslint-disable-next-line react/display-name
const BlogPage = (props) => {
  const blogVisRef = useRef();
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });
  const blogs = result.data;
   if (result.isLoading) {
     return <div>loading</div>;
   }

   
  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <p>
        {props.user.name} logged in{" "}
        <button onClick={props.handleLogout}>logout</button>
      </p>
      <Togglable
        buttonLabel='create Blog'
        ref={blogVisRef}>
        <BlogForm ref={blogVisRef} />
      </Togglable>

      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdateBlog={props.handleUpdateBlog}
                handleDeleteBlog={props.handleDeleteBlog}
                user={props.user}
              />
            );
          })}
      </div>
    </div>
  );
};
export default BlogPage;
