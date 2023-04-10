import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import classes from "./TaskBoardComponent.module.css";

const DeleteTaskComponent = () => {
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const taskToDeleteHandler = (e) => {
    e.preventDefault();
    //console.log(e.target.previousSibling.textContent);
   setTaskToDeleteId(e.target.previousSibling.textContent);
    console.log(taskToDeleteId);
  };
  const { error, sendRequest: fetchTasks } = useHTTP(
    "http://localhost:8080/delete-task/" + taskToDeleteId,
    "DELETE",
    {
      Accept: "application/json",
    },
    null,
    null
  );

  const fetch = useEffect(() => {
    if (taskToDeleteId) {
      fetchTasks();
    }
  }, [taskToDeleteId]);

  return (
      <button  onClick={taskToDeleteHandler} className={classes.deleteBtn}>delete</button>
  );
};

export default DeleteTaskComponent;
