import { useState } from "react";
import NewTaskComponent from "./components/NewTaskComponent";
import classes from "./App.module.css";
import LoginFormComponent from "./components/LoginFormComponent";
import TaskListComponent from "./components/TaskListComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={classes.app}>
      {!isLoggedIn ? (
        <LoginFormComponent onUserLogin={setIsLoggedIn} />
      ) : (
        <TaskListComponent isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
}

export default App;
