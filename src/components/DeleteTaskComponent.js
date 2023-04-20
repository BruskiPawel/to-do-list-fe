import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import classes from "./TaskBoardComponent.module.css";
import { ACTIONS } from "../Actions";

const DeleteTaskComponent = (props) => {
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const taskToDeleteHandler = (e) => {
    e.preventDefault();
    //console.log(e.target.previousSibling.textContent);
   setTaskToDeleteId(e.target.previousSibling.textContent);
  };
  const { error, sendRequest: fetchTasks } = useHTTP(
    ACTIONS.DELETE_TASK,
    null,
    null,
    null
  );

  const fetch = useEffect(() => {
    if (taskToDeleteId) {
      fetchTasks().then(() => props.onTaskDelete());
    }
  }, [taskToDeleteId]);

  return (
      <button onClick={taskToDeleteHandler} className={classes.deleteBtn}>delete</button>
  );
};

export default DeleteTaskComponent;
