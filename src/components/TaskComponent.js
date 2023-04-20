import classes from "./TaskComponent.module.css";
import DeleteTaskComponent from "./DeleteTaskComponent";
import React, { useState } from "react";

const Task = (props) => {
  //const [draggedTask, setDraggedTask] = useState(null);

//   const handleDragStart = (e, item) => {
//     setDraggedTask(item);
//     e.target.closest("div").classList.add(classes.dragged);
//   };

//   const handleDragOver = (e) => {
//     e.target.closest("div").classList.add(classes["dragged-over"]);
//     e.preventDefault();
//   };

//   const handleDragEnter = (e, task) => {};

//   const handleDragLeave = (e) => {
//     e.target.closest("div").classList.remove(classes["dragged-over"]);
//   };
//   const handleDragEnd = (e) => {
//     e.target.closest("div").classList.remove(classes.dragged);
//   };

//   const handleDrop = (e) => {
//     onShow(true);
//     e.target.closest("div").classList.remove(classes.dragged);

//     const movedTask = tasks.find((task) => task.id === draggedTask.id);

//     const targetTask = tasks.find(
//       (task) => task.id === parseInt(e.target.closest("div").id)
//     );
//     const newList = tasks.filter((task) => task.id !== movedTask.id);

//     newList.splice(
//       newList.findIndex((task) => task.id === targetTask.id),
//       0,
//       movedTask
//     );

//     newList.splice();

//     setTasks(newList);
//     e.preventDefault();
//   };

  return (
    <div
      className={classes.task}
    //   key={props.task.id}
      id={props.task.id}
    //   draggable
    //   onDragStart={(e) => handleDragStart(e, task)}
    //   onDragOver={handleDragOver}
    //   onDragEnd={handleDragEnd}
    //   onDragEnter={(e) => handleDragEnter(e, task)}
    //   onDragLeave={(e) => handleDragLeave(e, task)}
    //   onDrop={handleDrop}
    >
      <p>{props.task.date.toLocaleDateString()}</p>
      <h3>{props.task.content}</h3>
      <p>{props.task.id}</p>
      <DeleteTaskComponent onTaskDelete={"fetch tasks after deleting"} />
    </div>
  );
};

export default Task;
