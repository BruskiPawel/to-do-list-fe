import { useCallback, useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import { ACTIONS } from "../Actions";

const LoginFormComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username: username, password: password });
  };
  const loginHandler = (response) => {
    console.log(response);
        props.onloggedin();
        props.isLoggedin();
  };

  const { postError, sendRequest: loginUser } = useHTTP(
    ACTIONS.LOG_IN_USER,
    user,
    null,
    loginHandler
  );
  
  useEffect(() => {
    if (user) {
      loginUser();
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginFormComponent;
