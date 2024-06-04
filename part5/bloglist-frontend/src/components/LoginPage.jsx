import Notification from "./Notification";
const LogInForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  message,
  errorMessage,
}) => (
  <div>
    <h1>log in to application</h1>
    {message || errorMessage ? (
      <Notification message={message} errorMessage={errorMessage} />
    ) : null}
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);
export default LogInForm;
