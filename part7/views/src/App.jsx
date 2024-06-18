import BlogPage from "./components/BlogPage";
import LogInForm from "./components/LoginPage";
import Users from "./components/Users";
import { useUserValue } from "./UserContext"; import { useQuery } from "@tanstack/react-query";
import blogService from "./services/blogs"; 
import User from "./components/User"
import { BrowserRouter as Router, Routes, Route, Link,Navigate  } from "react-router-dom";
// import { createSuccessMsg, createErrorMsg } from "./actions";
// import { userLogOut, userLogIn } from "./actions";

// FIXME: users arnt saved so the login page appear instead of users page no matter what
/* TODO // 
create a use to save the logged in of the user refer to execise 7.13?
*/
const App = () => {
  const user = useUserValue();
  console.log(user);
  const usersData = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAllUsers,
    refetchOnWindowFocus: false,
  });
  return (
    <Router>
      <Routes>
      {/* added props to the User component */}
      <Route path="/users/:id" element={<User users={usersData.data}/>} />
        <Route
          path='/users'
          element={user.username === "" ? <Navigate replace to={"/"}/> : <Users />}
        />
        <Route
          path='/'
          element={<LogInForm />}
        />
      </Routes>
    </Router>
  );
};

export default App;
