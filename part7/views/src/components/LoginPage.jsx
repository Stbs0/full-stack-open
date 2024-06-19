import Notification from "./Notification";
import { useState } from "react";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg, createErrorMsg, userLogIn } from "../actions";
import { useUserDispatcher } from "../UserContext";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useNavigate } from "react-router-dom";
import storage from "../services/storage";

const LogInForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const userDispatcher = useUserDispatcher();
  const notificationDispatcher = useNotificationDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginService.login({ username, password });
      console.log(userData)
      storage.saveUser(userData);
      console.log(userData)
      userDispatcher(userLogIn(userData));
      notificationDispatcher(
        createSuccessMsg(`Welcome back, ${userData.name} `),
      );
      blogService.setToken(userData.token);
      navigate("/users");
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
