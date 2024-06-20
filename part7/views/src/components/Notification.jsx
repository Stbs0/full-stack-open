import { useNotificationValue } from "../NotificationContext";
import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
export const NotifyComponent = () => {
  const blogVisRef = useRef();
  return (
    <div>
      <h1> blogs</h1>
      <Notification />

      <Togglable
        buttonLabel='create Blog'
        ref={blogVisRef}>
        <BlogForm ref={blogVisRef} />
      </Togglable>
    </div>
  );
};
const Notification = () => {
  const notification = useNotificationValue();

  if (notification.message === "") {
    return null;
  }
  const looks = {
    color: notification.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={looks}>{notification.message}</div>;
};

export default Notification;
