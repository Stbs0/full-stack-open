import { useOutletContext, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queires";
import { useEffect, useState } from "react";
const LoginFrom = () => {
  const { setToken, notify } = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { data, error }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors);
      notify(error.graphQLErrors);
      console.log("first");
    },
    onCompleted: (data) => {
      setToken(data.login.value);
      localStorage.setItem("author-token", data.login.value);
      navigate("/books");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    login({
      variables: {
        username,
        password,
      },
    });

    setPassword("");
    setUsername("");
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='name'>name</label>
      <input
        onChange={({ target }) => setUsername(target.value)}
        value={username}
        type='text'
        id='name'
        name='username'
      />
      <br />
      <label htmlFor='password'>password</label>
      <input
        onChange={({ target }) => setPassword(target.value)}
        type='text'
        id='password'
        value={password}
        name='password'
      />
      <button>login</button>
    </form>
  );
};

export default LoginFrom;
