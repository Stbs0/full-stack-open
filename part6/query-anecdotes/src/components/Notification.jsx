import  NotificationContext  from "../NotificationContext";
import { useContext } from "react";
const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  console.log(notification)
  if (notification === null) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
