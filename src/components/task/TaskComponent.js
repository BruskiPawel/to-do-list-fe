import classes from "./TaskComponent.module.css";
import DeleteTaskComponent from "./DeleteTaskComponent";
import React from "react";

const Task = (props) => {
  return (
    <div className={classes.task} id={props.task.id}>
      <p>{props.task.date.toLocaleDateString()}</p>
      <h3>{props.task.content}</h3>
      <p>{props.task.id}</p>
      <DeleteTaskComponent onTaskDelete={props.onDelete} />
    </div>
  );
};

export default Task;
