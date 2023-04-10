import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import NewTaskComponent from "./NewTaskComponent";
import DeleteTaskComponent from "./DeleteTaskComponent";
import classes from "./TaskBoardComponent.module.css";

function TaskBoardComponent() {
  const [tasks, setTasks] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getAllTasks = (taskArr) => {
    console.log("im in getalltasks compo");
    console.log(taskArr);
    setTasks(taskArr);
    setErrorMessage(error);
  };

  const { error, sendRequest: fetchTasks } = useHTTP(
    "http://localhost:8080/tasks",
    "GET",
    {
      Accept: "application/json",
    },
    null,
    getAllTasks
  );

  const fetch = useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragStart = (e, item) => {
    setDraggedTask(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, task) => {
    const target = e.target.closest("div");
    if (target && target.classList.contains(classes.task)) {
      target.classList.add(classes.dragged);
     }
  };

  const handleDragLeave = (e) => {
    const target = e.target.closest("div");
    if (target && target.classList.contains(classes.dragged)) {
      
    }
    //target.classList.remove(classes.dragged);
  };

  const handleDrop = (e) => {
    console.log("drop");
    const movedTask = tasks.find(
      (task) => task.id === parseInt(draggedTask.id)
    );
    const targetTask = tasks.find(
      (task) => task.id === parseInt(e.target.closest("div").id)
    );
    const newList = tasks.filter((task) => task.id !== movedTask.id);

    newList.splice(
      newList.findIndex((task) => task.id === targetTask.id),
      0,
      movedTask
    );
    setTasks(newList);
    e.preventDefault();
  };

  return (
    <div>
      <NewTaskComponent onSubmit={fetch} />
      <div className={classes["tasks-container"]}>
        {tasks ? (
          tasks.map((task) => (
            <div
              className={classes.task}
              key={task.id}
              id={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, task)}
              onDragLeave={(e) => handleDragLeave(e, task)}
              onDrop={handleDrop}
            >
              <h2>{task.title}</h2>
              <h3>{task.content}</h3>
              <p>{task.id}</p>
              <DeleteTaskComponent />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default TaskBoardComponent;
