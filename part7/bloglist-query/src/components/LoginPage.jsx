import Notification from "./Notification";
import { useState, useEffect } from "react";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg, userLogIn } from "../actions";
import { useUserDispatcher, useUserValue } from "../UserContext";
import blogService from "../services/blogs";
import loginService from "../services/login";

const LogInForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const user = useUserValue();
  const userDispatcher = useUserDispatcher();
  const notificationDispatcher = useNotificationDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      userDispatcher(userLogIn(JSON.parse(loggedUserJSON)));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginService.login({ username, password });
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userData),
      );
      blogService.setToken(userData.token);
      userDispatcher(userLogIn(userData));
      notificationDispatcher(
        createSuccessMsg(`Welcome back, ${userData.name} `),
      );
    } catch (error) {
      console.log(error);
      notificationDispatcher(createErrorMsg(`Wrong credentials`));
    }
    setTimeout(() => {
      notificationDispatcher({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='text'
            data-testid='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LogInForm;
