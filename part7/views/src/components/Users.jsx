import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import Notification from "./Notification";
import {useNotificationDispatch} from "../NotificationContext"
import { createSuccessMsg, } from "../actions";
import { useUserDispatcher } from "../UserContext";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogAppUser"));
  console.log(user)
  const navigate=useNavigate()
  const notificationDispatcher = useNotificationDispatch();
  const userDispatcher=useUserDispatcher()
  
  const usersData = useQuery({
    queryKey: ["users"],
    queryFn: blogService.getAllUsers,
  });

  const users = usersData.data;

  const handleLogout = () => {
    notificationDispatcher(createSuccessMsg(`Bye bye, ${user.name} `));
    window.localStorage.removeItem("loggedBlogAppUser");
    userDispatcher({ type: "LOGOUT" });
  };
  
if (usersData.isLoading) {
    return <div>fetching data</div>
}
  return (
    <div>
      <h1> users</h1>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userInfo) => {
            return (
              <tr key={userInfo.id}>
                <td>{userInfo.name}</td>
                <td>{userInfo.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
