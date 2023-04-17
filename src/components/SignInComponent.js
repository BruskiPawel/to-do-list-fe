import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";

const SingInComponent = () => {
  const [newUser, setNewUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitHandler");
    setNewUser({userName: userName, eMail: email, password: password});
    console.log(newUser)
  };
  const postedUser = () => {};

  const { postError, sendRequest: postUser } = useHTTP(
    "http://localhost:8080/new_user",
    "POST",
    { "Content-Type": "application/json" },
    newUser,
    postedUser
  );

  useEffect(() => {
    if (newUser) {
      postUser();
    }
  }, [newUser]);

  return (
    <form onSubmit={submitHandler}>
      <h2>Sing In to the ToDo List app!</h2>
      <div>
        <label htmlFor="user">User name:</label>
        <input
          type="text"
          id="user-name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">repeat Password:</label>
        <input
          type="password"
          id="repeatedPassword"
          value={repeatedPassword}
          onChange={(event) => setRepeatedPassword(event.target.value)}
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SingInComponent;
