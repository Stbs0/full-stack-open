import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
const notification = () => {
  setErrorMessage()
  setTimeout(() => {
    setErrorMessage(null);
  }, 5000);

  return <div className="error">{message}</div>;
};
  const logInForm = () => (
    <div>
      <h1>log in to application</h1>
      {}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const blogForm = () => {
    return (
      <div>
        <h1>blogs</h1>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <form onSubmit={handleCreateBlog}>
          <h1>create new blog</h1>
          <p>
            title{" "}
            <input
              type="text"
              value={newBlog.title}
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
            />
          </p>
          <p>
            author{" "}
            <input
              type="text"
              value={newBlog.author}
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
            />
          </p>
          <p>
            url{" "}
            <input
              type="text"
              value={newBlog.url}
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
            />
          </p>
          <button type="submit">create</button>
        </form>
        <div>
          {userBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };
  const handleCreateBlog= async(e)=>{
    e.preventDefault();
try{const res = await blogService.create(newBlog);
    setUserBlogs([...userBlogs, res]);
    setNewBlog({ title: "",
    author: "",
    url: "",})}catch(error){console.log(error)}
  }
  return <div>{user === null ? logInForm() : blogForm()}</div>;
};

export default App;
