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


  useEffect(() => {
    blogService.getAll().then((blog) => setBlogs(blog));
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      setUser({ username, password });
      setUsername("");
      setPassword("");
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
  const logInForm = () => (
    <div>
      <h1>log in to application</h1>
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

  const blogForm = () => {
    const userBlogs = blogs.filter(
      (blog) => user.username === blog.user.username
    );

    return (
      <div>
        <h1>blogs</h1>
        <p>
          {userBlogs[0].user.name} logged in{" "}
          <button onClick={handleLogout}>logout</button>
        </p>
        <div>
          <h1>create new blog</h1>
          <p>title <input type="text" /></p>
        </div>
        <div>
          {userBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };
  return <div>{user === null ? logInForm() : blogForm()}</div>;
};

export default App;
