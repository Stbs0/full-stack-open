import LogInForm from "./components/LoginPage";

import Users from "./components/Users";
import { useUserValue } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";
import User from "./components/User";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNotificationDispatch } from "./NotificationContext";
import { useUserDispatcher } from "./UserContext";
import { userLogIn, createSuccessMsg } from "./actions";
import storage from "./services/storage";
import Notification, { NotifyComponent } from "./components/Notification";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useId } from "react";
import { useGetBlogs, useGetUsers } from "./queries";
const App = () => {
  // const navigate = useNavigate();
  const blogVisRef = useRef();

  const user = useUserValue();
  const notificationDispatcher = useNotificationDispatch();
  const userDispatcher = useUserDispatcher();
  const usersData = useQuery({
    queryKey: ["users"],
    queryFn: blogService.getAllUsers,
  });
  const blogsData = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const handleLogout = () => {
    notificationDispatcher(createSuccessMsg(`Bye bye, ${user.name} `));
    storage.removeUser();
    userDispatcher({ type: "LOGOUT" });
  };
  const users = usersData.data;
  const blogs = blogsData.data;

  const userId = users.find((u) => u.username === user.username);

  const padding = {
    padding: 5,
  };
  const backgroundColor = { backgroundColor: "gray" };
  return (
    <Router>
      <div style={backgroundColor}>
        <Link
          style={padding}
          to={`/users/${userId.id}`}>
          blogs
        </Link>
        <Link
          style={padding}
          to={"/users"}>
          users
        </Link>
        <span>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      </div>
      {user && NotifyComponent()}

      <div>
        <Routes>
          <Route
            path='/blogs/:id'
            element={<Blog blogs={blogs} />}
          />
          <Route
            path='/users/:id'
            element={
              user ? (
                <User users={users} />
              ) : (
                <Navigate
                  replace
                  to={"/"}
                />
              )
            }
          />
          <Route
            path='/users'
            element={
              user ? (
                <Users users={users} />
              ) : (
                <Navigate
                  replace
                  to={"/"}
                />
              )
            }
          />
          <Route
            path='/'
            element={
              user ? (
                <Navigate
                  replace
                  to={"/users"}
                />
              ) : (
                <LogInForm />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
