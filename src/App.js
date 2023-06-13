import { useEffect, useState } from "react";
import NewTaskComponent from "./components/NewTaskComponent";
import classes from "./App.module.css";
import LoginFormComponent from "./components/LoginFormComponent";
import TaskListComponent from "./components/TaskListComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  return (
    <div className={classes.app}>
      {!isLoggedIn ? (
        <LoginFormComponent loggedUser={setUser} onUserLogin={setIsLoggedIn} />
      ) : (
        <TaskListComponent  user={user} isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
}

export default App;
