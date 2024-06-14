import { useEffect, createRef } from "react";

import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { createSuccessMsg } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { removeUser,addUser } from "./reducers/userReducer";
const App = () => {
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);
  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      dispatch(addUser(user));
    }
  }, []);

  const blogFormRef = createRef();

  const handleLogout = () => {
    storage.removeUser();
    dispatch(removeUser());
    dispatch(createSuccessMsg({ message: `Bye, ${user.name}!` }));
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
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
        <NewBlog />
      </Togglable>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
