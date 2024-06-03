import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    
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
            onChange={({ target }) => setUsername(target)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
  return (
    <div>{user && logInForm()}</div>

    // <div>
    //   <h2>blogs</h2>
    //   {blogs.map((blog) => (
    //     <Blog key={blog.id} blog={blog} />
    //   ))}
    // </div>
  );
};

export default App;
