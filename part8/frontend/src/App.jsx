import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ALL_BOOKS, BOOK_ADDED, ME } from "./queires";

export const updateCache = (cache, query, bookAdded) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, (data) => {
    return {
      allBooks: data.allBooks.concat(bookAdded),
    };
  });
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState("");
  const { data, loading } = useQuery(ME);

  const client = useApolloClient();
  useEffect(() => {
    const storageToken = localStorage.getItem("author-token");
    setToken(storageToken);
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded;
      console.log(bookAdded);
      notify(bookAdded.title);
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded);
    },
  });
  if (loading) return <div>loading</div>;
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
        {data?.me && (
          <NavLink to={"/newBook"}>
            <button>add book</button>{" "}
          </NavLink>
        )}

        <NavLink to={"/login"}>
          <button onClick={() => data?.me && logout()}>
            {data?.me ? "logout" : "login"}
          </button>
        </NavLink>
        {data?.me && (
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
