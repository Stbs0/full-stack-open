import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import Notification from "./Notification";
import { useNotificationDispatch } from "../NotificationContext";
import { createSuccessMsg } from "../actions";
import { useUserDispatcher, useUserValue } from "../UserContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import storage from "../services/storage";
const Users = ({ users }) => {
  const user = useUserValue();

  return (
    <div>
     
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
                <td>
                  {" "}
                  <Link to={`/users/${userInfo.id}`}> {userInfo.name}</Link>
                </td>
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
