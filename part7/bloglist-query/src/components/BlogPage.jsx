import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import { useUserValue, useUserDispatcher } from "../UserContext";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg } from "../actions";
// eslint-disable-next-line react/display-name
const BlogPage = () => {
  const blogVisRef = useRef();
  const user = useUserValue();
  const userDispatcher = useUserDispatcher();
  const notificationDispatcher = useNotificationDispatch();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });
  const blogs = result.data;

  if (result.isLoading) {
    return <div>loading</div>;
  }
  const handleLogout = () => {
    notificationDispatcher(createSuccessMsg(`Bye bye, ${user.name} `));
    window.localStorage.removeItem("loggedBlogAppUser");
    userDispatcher({ type: "LOGOUT" });
  };

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
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
              />
            );
          })}
      </div>
    </div>
  );
};
export default BlogPage;
