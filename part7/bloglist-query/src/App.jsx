import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogPage from "./components/BlogPage";
import LogInForm from "./components/LoginPage";
import { useNotificationDispatch } from "./NotificationContext";
import { createSuccessMsg, createErrorMsg } from "./actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const notificationDispatcher = useNotificationDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  

  //setting the data at the beginning
  //when user refresh the browsers remember the token

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      notificationDispatcher(createSuccessMsg(`Welcome back, ${username} `));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      notificationDispatcher(createErrorMsg(`Wrong credinential`));
    }
    setTimeout(() => {
      notificationDispatcher({ type: "CLEAR" });
    }, 5000);
  };

  const handleDeleteBlog = async (id, title) => {
    try {
      if (window.confirm(`remove blog "${title}"`)) {
        await blogService.remove(id);

        // setBlogs(blogs.filter((blog) => blog.id !== id));
        notificationDispatcher(createSuccessMsg(`you have deleted '${title}'`));
      }
    } catch (error) {
      console.log(error);
      notificationDispatcher(createErrorMsg(`Delete failed`));
    }
    setTimeout(() => {
      notificationDispatcher({ type: "CLEAR" });
    }, 5000);
  };

  const handleLogout = () => {
    notificationDispatcher(createSuccessMsg(`Bye bye, ${user.username} `));
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  

 

  return (
    <div>
      {user === null ? (
        <LogInForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <BlogPage
          handleLogout={handleLogout}
          user={user}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  );
};

export default App;
