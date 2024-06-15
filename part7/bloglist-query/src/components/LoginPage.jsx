import Notification from "./Notification";
import PropTypes from "prop-types";
const LogInForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <div>
    <h1>log in to application</h1>
    <Notification />
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='text'
          data-testid='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
);
LogInForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};
export default LogInForm;
