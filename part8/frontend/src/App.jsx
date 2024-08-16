import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ME } from "./queires";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState("");
  const {
    data,
    loading,
  } = useQuery(ME);

  const client = useApolloClient();
  useEffect(() => {
    const storageToken = localStorage.getItem("author-token");
    setToken(storageToken);
  }, []);

  if (loading) return <div>loading</div>;
  console.log(data);
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  const logout = () => {
    setToken("");
    localStorage.clear();
    client.resetStore();
  };
  // if (!token) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <div>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <div>
        <NavLink to={"/authors"}>
          <button>authors</button>
        </NavLink>

        <NavLink to={"/books"}>
          <button>books</button>
        </NavLink>
        {token && (
          <NavLink to={"/newBook"}>
            <button>add book</button>{" "}
          </NavLink>
        )}

        <NavLink to={"/login"}>
          <button onClick={() => token && logout()}>
            {token ? "logout" : "login"}
          </button>
        </NavLink>
        {token && (
          <NavLink to={"/recommendation"}>
            <button>recommendation</button>{" "}
          </NavLink>
        )}
      </div>
      <Outlet context={{ notify, setToken, token, data }} />
    </div>
  );
};

export default App;
