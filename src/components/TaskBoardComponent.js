import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import NewTaskComponent from "./NewTaskComponent";
import classes from "./TaskBoardComponent.module.css";
import SaveButtonComponent from "./SaveButtonComponent";
import LoginFormComponent from "./LoginFormComponent";
import TaskListComponent from "./TaskListComponent";

function TaskBoardComponent() {

  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldPost, setShouldPost] = useState(false);
  const [shouldRerender, setShouldRerender] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <LoginFormComponent
          onloggedin={() => {
            setIsLoggedIn(true);
          }}
        />
      ) : (
        <div>
          <NewTaskComponent onTaskAdd={"fetch"} />
          <div className={classes["tasks-container"]}>
            <TaskListComponent isLoggedIn={isLoggedIn} onTasksChange={setShowSaveBtn} shouldRerender={shouldRerender} />
            {showSaveBtn ? (
              <SaveButtonComponent
                onPost={() => {
                  setShouldPost(true);
                  setShowSaveBtn(false);
                }}
                onFetch={() => {
                  setShouldRerender(true);
                  setShowSaveBtn(false);
                }}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskBoardComponent;
