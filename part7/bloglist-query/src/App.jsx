import BlogPage from "./components/BlogPage";
import LogInForm from "./components/LoginPage";
import {  useUserValue } from "./UserContext";
// import { createSuccessMsg, createErrorMsg } from "./actions";
// import { userLogOut, userLogIn } from "./actions";
const App = () => {
  const user = useUserValue();
  console.log(user)
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const user = useUserValue();
  // console.log(user);
  // const userDispatcher = useUserDispatcher();
  // const notificationDispatcher = useNotificationDispatch();
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  //   if (loggedUserJSON) {
  //     userDispatcher(userLogIn(JSON.parse(loggedUserJSON)));
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userData = await loginService.login({ username, password });
  //     window.localStorage.setItem(
  //       "loggedBlogAppUser",
  //       JSON.stringify(userData),
  //     );
  //     blogService.setToken(userData.token);
  //     userDispatcher(userLogIn(userData));
  //     notificationDispatcher(
  //       createSuccessMsg(`Welcome back, ${userData.username} `),
  //     );
  //     setUsername("");
  //     setPassword("");
  //   } catch (error) {
  //     console.log(error);
  //     notificationDispatcher(createErrorMsg(`Wrong credinential`));
  //   }
  //   setTimeout(() => {
  //     notificationDispatcher({ type: "CLEAR" });
  //   }, 5000);
  // };

  // const handleLogout = () => {
  //   notificationDispatcher(createSuccessMsg(`Bye bye, ${user.username} `));
  //   window.localStorage.removeItem("loggedBlogAppUser");
  //   userDispatcher(userLogOut());
  // };

  return <div>{user.username==="" ? <LogInForm /> : <BlogPage />}</div>;
};

export default App;
