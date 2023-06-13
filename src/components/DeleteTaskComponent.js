import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import classes from "./DeleteTaskComponent.module.css";

const DeleteTaskComponent = (props) => {
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  // const taskToDeleteHandler = (e) => {
  //   e.preventDefault();
  //   console.log("Id to delete: " + e.target.parentElement.id);
  //  setTaskToDeleteId(e.target.parentElement.id);
  // };
  const { error, sendRequest: deleteTask } = useHTTP(
    "http://localhost:8080/delete-task/" + taskToDeleteId,
    "DELETE",
    {
      "Content-Type": "application/json",
    },
    null,
    null
  );

  useEffect(() => {
    if (taskToDeleteId) {
      deleteTask().then(() => props.onTaskDelete());
    }
  }, [taskToDeleteId]);

  return (
      <button className={classes.delete} onClick={(e) => {
        setTaskToDeleteId(e.target.parentElement.id)
      }} >delete</button>
  );
};

export default DeleteTaskComponent;
