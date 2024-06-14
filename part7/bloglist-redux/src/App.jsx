import { useState, useEffect, createRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import {
  createErrorMsg,
  createSuccessMsg,
} from "./reducers/notificationReducer";

import { useDispatch } from "react-redux";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const blogFormRef = createRef();

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      storage.saveUser(user);
      dispatch(createSuccessMsg({ message: `Welcome back, ${user.name}` }));
    } catch (error) {
      dispatch(createErrorMsg({ message: "wrong cardinential" }));
    }
  };

  const handleCreate = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      dispatch(
        createSuccessMsg({
          message: `Blog created: ${newBlog.title}, ${newBlog.author}`,
        }),
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(createErrorMsg({ message: error }));
    }
  };

  const handleVote = async (blog) => {
    console.log("updating", blog);
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });

      dispatch(
        createSuccessMsg({
          message: `You liked ${updatedBlog.title} by ${updatedBlog.author}`,
        }),
      );
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    } catch (error) {
      dispatch(createErrorMsg({ message: error }));
    }
  };

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
    dispatch(createSuccessMsg({ message: `Bye, ${user.name}!` }));
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        dispatch(createSuccessMsg({ message: `Bye, ${user.name}!` }));
      }
    } catch (error) {
      dispatch(createErrorMsg({ message: error }));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable
        buttonLabel='create new blog'
        ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
