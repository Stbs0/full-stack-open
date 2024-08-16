import { createBrowserRouter, Navigate } from "react-router-dom";
import Authors from "../components/Authors";
import Books from "../components/Books";
import NewBook from "../components/NewBook";
import App from "../App";
import LoginFrom from "../components/LoginFrom";
import Recommidations from "../components/Recommidations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Navigate
            to='/authors'
            replace
          />
        ), // Redirect to /authors
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "newBook",
        element: <NewBook />,
      },
      {
        path: "/login",
        element: <LoginFrom />,
      },
      {
        path:'recommendation',
        element:<Recommidations/>
      }
    ],
  },
]);

export default router;
