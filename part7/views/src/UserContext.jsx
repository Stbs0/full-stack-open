import { useReducer, createContext, useContext } from "react";
import blogService from "./services/blogs";
import storage from "./services/storage";
const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const UserContextProvider = (props) => {
  const loadedUser = storage.loadUser();
  const [user, userDispatcher] = useReducer(userReducer, loadedUser);
loadedUser && blogService.setToken(loadedUser.token)
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
