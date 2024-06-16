import { useReducer, createContext } from "react";

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
  const [user, userDispatcher] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatcher]}>
      {props.children}
    </UserContext.Provider>
  );
};
export const useUserValue = () => {
  const userAndDispatcher = useReducer(userReducer, null);
  return userAndDispatcher[0];
};
export const useUserDispatcher = () => {
  const userAndDispatcher = useReducer(userReducer, null);
  return userAndDispatcher[1];
};
