import { Link } from "react-router-dom";
const Users = ({ users }) => {
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
