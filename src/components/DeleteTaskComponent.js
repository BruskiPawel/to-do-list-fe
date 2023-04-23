import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import classes from "./DeleteTaskComponent.module.css";

const DeleteTaskComponent = (props) => {
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const taskToDeleteHandler = (e) => {
    e.preventDefault();
    //console.log(e.target.previousSibling.textContent);
   setTaskToDeleteId(e.target.previousSibling.textContent);
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
      fetchTasks().then(() => props.onTaskDelete());
    }
  }, [taskToDeleteId]);

  return (
      <button onClick={taskToDeleteHandler} >delete</button>
  );
};

export default DeleteTaskComponent;
