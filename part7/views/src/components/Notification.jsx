import { useNotificationValue } from "../NotificationContext";
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
