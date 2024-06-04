import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogPage from "./components/BlogPage";
import LogInForm from "./components/LoginPage";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setUserBlogs(
        blogs.filter((blog) => user.username === blog.user.username)
      );
    } catch (error) {
      console.log(error);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await blogService.create(newBlog);
      setUserBlogs([...userBlogs, res]);
      setNewBlog({ title: "", author: "", url: "" });
      setMessage("Blog created")
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
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
          message={message}
          errorMessage={errorMessage}
        />
      ) : (
        <BlogPage
          message={message}
          errorMessage={errorMessage}
          handleLogout={handleLogout}
          user={user}
          newBlog={newBlog}
          handleCreateBlog={handleCreateBlog}
          setNewBlog={setNewBlog}
          userBlogs={userBlogs}
        />
      )}
    </div>
  );
};

export default App;
