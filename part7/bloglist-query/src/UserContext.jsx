import { useReducer, createContext, useContext } from "react";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return { username: "", token: "", name: "" };
      default:
        return state
  }
};

export const UserContextProvider = (props) => {
  const [user, userDispatcher] = useReducer(userReducer, {
    username: "",
    token: "",
    name: "",
  });

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
