import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import classes from "./LoginFormComponent.module.css";

const LoginFormComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username: username, password: password, id: null });
  };

  const responseDataHandler = (response) => {
    setId(response);
  };

  const { postError, sendRequest: loginUser } = useHTTP(
    "http://localhost:8080/login_user",
    "POST",
    { "Content-Type": "application/json" },
    user,
    responseDataHandler
  );

  useEffect(() => {
    if (user) {
      loginUser();
      // props.onUserLogin(true);
      // props.userName(user);
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      console.log("use effect :  " + id)
      props.onUserLogin(true);
      props.loggedUser(id);
    }
  }, [id]);

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
      <button type="submit">Log in</button>
      <button type="button">Sing in</button>
    </form>
  );
};

export default LoginFormComponent;
