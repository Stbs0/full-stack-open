import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notify } from "../reducers/notificationReducer";
const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const time = () => {
    setTimeout(() => {
      dispatch(notify(null));
    }, 5000);

    return <div style={style}>{notification}</div>;
  };
  return notification ? time() : null;
};
export default Notification;
