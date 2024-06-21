import { Link } from "react-router-dom";
import { useUserValue } from "../UserContext";
const Menu = ({ handleLogout }) => {
  const user = useUserValue();

  const padding = {
    padding: 5,
  };
  const backgroundColor = { backgroundColor: "gray" };
  return (
    <div style={backgroundColor}>
      <Link
        style={padding}
        to={"/users"}>
        users
      </Link>

      <Link
        style={padding}
        to={`/users/${user.id}`}>
        blogs
      </Link>
      <span>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  );
};
export default Menu;
