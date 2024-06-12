import { useReducer, createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VALUE":
      return action.payload.content;

    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatcher] = useReducer(
    notificationReducer,
    null,
  );
  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatcher]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
