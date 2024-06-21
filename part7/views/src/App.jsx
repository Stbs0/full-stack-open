import LogInForm from "./components/LoginPage";

import Users from "./components/Users";
import { useUserValue } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs";
import User from "./components/User";
import {
  Routes,
  Route,
  Navigate,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { useRef } from "react";
import { useNotificationDispatch } from "./NotificationContext";
import { useUserDispatcher } from "./UserContext";
import { createSuccessMsg } from "./actions";
import storage from "./services/storage";
import { NotifyComponent } from "./components/Notification";
import Blog from "./components/Blog";

import Menu from "./components/Menu";
const App = () => {
  const navigate = useNavigate();
  const blogVisRef = useRef();

  const loggedUser = useUserValue();
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
  const users = usersData.data;
  const blogs = blogsData.data;

  const blogMatch = useMatch("/blogs/:id");
  const userMatch = useMatch("/users/:id");
  if (usersData.isLoading) {
    return <span>fetching data</span>;
  }
  if (blogsData.isLoading) {
    return <div>fectiong data</div>;
  }
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;
  const handleLogout = () => {
    notificationDispatcher(createSuccessMsg(`Bye bye, ${loggedUser.name} `));
    storage.removeUser();
    navigate("/");
    userDispatcher({ type: "LOGOUT" });
  };
  return (
    <div>
      {loggedUser && <Menu handleLogout={handleLogout} />}
      {loggedUser && <NotifyComponent blogVisRef={blogVisRef} />}

      <div>
        <Routes>
          <Route
            path='/blogs/:id'
            element={<Blog blog={blog} />}
          />
          <Route
            path='/users/:id'
            element={
              loggedUser ? (
                <User user={user} />
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
              loggedUser ? (
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
              loggedUser ? (
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
    </div>
  );
};

export default App;
