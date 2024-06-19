import { useReducer, createContext, useContext,useEffect } from "react";
import { userLogIn } from "./actions";
import blogService from "./services/blogs";
const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
      default:
        return state
  }
};

export const UserContextProvider = (props) => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  blogService.setToken(JSON.parse(loggedUserJSON).token);
  const [user, userDispatcher] = useReducer(
    userReducer,
    JSON.parse(loggedUserJSON),
  );
// useEffect(() => {
//   console.log(loggedUserJSON)
//   if (loggedUserJSON) {
//     userDispatcher(userLogIn());
//   }
// }, []);
  return (
    <UserContext.Provider value={[user, userDispatcher]}>
      {props.children}
    </UserContext.Provider>
  );
};
export const useUserValue = () => {
  const userAndDispatcher = useContext(UserContext);
  return userAndDispatcher[0];
};
export const useUserDispatcher = () => {
  const userAndDispatcher = useContext(UserContext);
  return userAndDispatcher[1];
};
