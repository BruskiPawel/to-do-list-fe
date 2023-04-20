import { useState } from "react";
import classes from "./TaskBoardComponent.module.css";
import NewTaskComponent from "./task/NewTaskComponent";
import SaveButtonComponent from "./SaveButtonComponent";
import LoginFormComponent from "./LoginFormComponent";
import TaskListComponent from "./task/TaskListComponent";

function TaskBoardComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

console.log("TaskBoardComponent rerendered");
  return (
    <>
      {!isLoggedIn ? (
        <LoginFormComponent
          onLogin={() => {
            setIsLoggedIn(true);
          }}
        />
      ) : (
        <>
          <NewTaskComponent />
          <div className={classes["tasks-container"]}>
            <TaskListComponent isLoggedIn={isLoggedIn}/>
            {showSaveBtn ? (
              <SaveButtonComponent
                onPost={() => {
                  setShowSaveBtn(false);
                }}
                onFetch={() => {
                  setShowSaveBtn(false);
                }}
              />
            ) : <div/>}
          </div>
        </>
      )}
    </>
  );
}

export default TaskBoardComponent;
