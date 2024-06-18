import { createContext, useReducer, useContext } from "react";

export const NotificationContext = createContext();

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.payload;
case "ERROR":
    case "CLEAR":
      return { message: "", type: "" };

    default:
      return state;
  }
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatcher] = useReducer(
    notificationReducer,
    { message: "", type: "" },
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatcher]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
