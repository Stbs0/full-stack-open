import { useState, useEffect,useRef } from "react";
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
 
  const blogRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
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
      setMessage("successfully logedin");
      setTimeout(() => {
        setMessage(null);
      }, 5000);

      blogRef.current.setUserBlogs(
        blogs.filter((blog) => user.username === blog.user.username)
      );
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setMessage("successfully logedout");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setUser(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await blogService.create(newBlog);
      setUserBlogs([...userBlogs, res]);
      setMessage(`Blog created ${res.title} `);
      setNewBlog({ title: "", author: "", url: "" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage(`could not create a blog,${error}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
        <BlogPage ref={blogRef}
          message={message}
          errorMessage={errorMessage}
          handleLogout={handleLogout}
          user={user}
          newBlog={newBlog}
          handleCreateBlog={handleCreateBlog}
          
          
        />
      )}
    </div>
  );
};

export default App;
