import { useEffect, useReducer, useState } from "react";
import useHTTP from "../hooks/use-http";
import NewTaskComponent from "./NewTaskComponent";
import DeleteTaskComponent from "./DeleteTaskComponent";
import classes from "./TaskBoardComponent.module.css";
import SaveButtonComponent from "./SaveButtonComponent";
import LoginFormComponent from "./LoginFormComponent";
import { Reducer } from "../reducer/Reducer";
import { ACTIONS, actions } from "../Actions";
import Task from "./TaskComponent.js";
import { TaskListCreator } from "./TaskListCreator";

function TaskBoardComponent() {
  //const [taski, dispatch] = useReducer(Reducer, []);
  const [tasks, setTasks] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [sortedTasks, setSortedTasks] = useState(null);
  //const [draggedTask, setDraggedTask] = useState(null);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const getAllTasks = (taskArr) => {
    setTasks(TaskListCreator(taskArr));
  };

  const { error, sendRequest: fetchTasks } = useHTTP(
    ACTIONS.GET_ALL_TASKS,
    null,
    getAllTasks
  );

  useEffect(() => {
   
      setShowSaveBtn(false);
      fetchTasks();
    
  }, [isLoggedin]);

  console.log("TASKI Z DISPATCH" + sortedTasks);
  // const postAllTasks = (data) => {
  //   setSortedTasks(tasks);
  // };

  // const { postError, sendRequest: postTasks } = useHTTP(
  //   "http://localhost:8080/post_sorted_tasks",
  //   "POST",
  //   { "Content-Type": "application/json" },
  //   sortedTasks,
  //   postAllTasks,
  //   null
  // );

  // useEffect(() => {
  //   if (sortedTasks) {
  //     setShowSaveBtn(false);
  //     //postTasks();
  //   }
  // }, [sortedTasks]);
  console.log("TASK BOARD rerendered");
  return (
    <div>
      {isLoggedin ? (
        <LoginFormComponent
      
          onloggedin={() => {
            setIsLoggedin(true);
          }}
        />
      ) : (
        <div>
          <NewTaskComponent  />
          <div className={classes["tasks-container"]}>
            {tasks ? (
              tasks.map((task) => {
                return <Task key={task.id} task={task} />;
              })
            ) : (
              <div></div>
            )}
            {showSaveBtn ? (
              <SaveButtonComponent
                onPost={() => {
                  //postAllTasks();
                  setShowSaveBtn(false);
                }}
                onFetch={() => {
                  //fetchTasks();
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
