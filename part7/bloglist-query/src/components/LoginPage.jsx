import Notification from "./Notification";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg, userLogOut, userLogIn } from "../actions";
import { useUserDispatcher, useUserValue } from "../UserContext";
import blogService from "../services/blogs";
import loginService from "../services/login";

const LogInForm = () => {
  const 
  const user = useUserValue();
  console.log(user);
  const userDispatcher = useUserDispatcher();
  const notificationDispatcher = useNotificationDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      userDispatcher(userLogIn(JSON.parse(loggedUserJSON)));
      blogService.setToken(user.token);
    }
  }, []);
// FIXME: I deleted the useState that controlles the input fix it by restoring the useState 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target.name)
      const username = e.target.name
      const userData = await loginService.login({ username, password });
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userData),
      );
      blogService.setToken(userData.token);
      userDispatcher(userLogIn(userData));
      notificationDispatcher(
        createSuccessMsg(`Welcome back, ${userData.username} `),
      );
   
    } catch (error) {
      console.log(error);
      notificationDispatcher(createErrorMsg(`Wrong credinential`));
    }
    setTimeout(() => {
      notificationDispatcher({ type: "CLEAR" });
    }, 5000);
  };

  const handleLogout = () => {
    notificationDispatcher(createSuccessMsg(`Bye bye, ${user.username} `));
    window.localStorage.removeItem("loggedBlogAppUser");
    userDispatcher(userLogOut());
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
LogInForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};
export default LogInForm;
