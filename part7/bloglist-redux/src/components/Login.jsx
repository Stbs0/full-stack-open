import { useState } from "react";
import { handleLogIn } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(handleLogIn({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type='text'
          data-testid='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          data-testid='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input
        type='submit'
        value='Login'
      />
    </form>
  );
};

export default Login;
