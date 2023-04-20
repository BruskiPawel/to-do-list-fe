import { useEffect, useReducer, useState } from "react";
import useHTTP from "../hooks/use-http";
import NewTaskComponent from "./NewTaskComponent";
import DeleteTaskComponent from "./DeleteTaskComponent";
import classes from "./TaskBoardComponent.module.css";
import SaveButtonComponent from "./SaveButtonComponent";
import LoginFormComponent from "./LoginFormComponent";
import { reducer } from "../reducer/Reducer";
import { ACTIONS, actions } from "../Actions";
import Task from "./TaskComponent.js";

function TaskBoardComponent() {
  const [state, dispatch] = useReducer(reducer, {} );

  const [tasks, setTasks] = useState(null);
  const [sortedTasks, setSortedTasks] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const getAllTasks = (taskArr) => {
    const updatedTasks = taskArr.map((task) => ({
      id: task.id,
      date: new Date(
        task.date[0],
        task.date[1],
        task.date[2],
        task.date[3],
        task.date[4]
      ),
      content: task.content,
    }));
    setTasks(updatedTasks);
  };
  // const postAllTasks = (data) => {
  //   setSortedTasks(tasks);
  // };

  const { error, sendRequest: fetchTasks } = useHTTP(

    ACTIONS.FETCH_ALL_TASKS,
    null,
    getAllTasks,
    null
  );

  // const { postError, sendRequest: postTasks } = useHTTP(
  //   "http://localhost:8080/post_sorted_tasks",
  //   "POST",
  //   { "Content-Type": "application/json" },
  //   sortedTasks,
  //   postAllTasks,
  //   null
  // );

  useEffect(() => {
      setShowSaveBtn(false);
      fetchTasks();
      setTasks(dispatch({type: ACTIONS.FETCH_ALL}))
  }, [isLoggedin]);

  useEffect(() => {
    if (sortedTasks) {
      setShowSaveBtn(false);
      //postTasks();
    }
  }, [sortedTasks]);

  return (
    <div>
      {!isLoggedin ? (
        <LoginFormComponent
          isLoggedin={fetchTasks}
          onloggedin={() => {
            setIsLoggedin(true);
          }}
        />
      ) : (
        <div>
          <NewTaskComponent onTaskAdd={fetchTasks} />
          <div className={classes["tasks-container"]}>
            {tasks ? (
              tasks.map((task) => {return <Task key={task.id} task={task} />})
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
                  fetchTasks();
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
