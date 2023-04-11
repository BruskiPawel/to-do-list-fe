import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import NewTaskComponent from "./NewTaskComponent";
import DeleteTaskComponent from "./DeleteTaskComponent";
import classes from "./TaskBoardComponent.module.css";

function TaskBoardComponent() {
  const [tasks, setTasks] = useState(null);
  const [sortedTasks, setSortedTasks] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [discardChanges, setDiscardChanges] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const getAllTasks = (taskArr) => {
    console.log("im in getalltasks compo");
    console.log(taskArr);
    setTasks(taskArr);
    setErrorMessage(error);
  };
  const postAllTasks = (taskArr) => {
    console.log("im in post all compo");
    setSortedTasks(tasks);
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

  const { postError, sendRequest: postTasks } = useHTTP(
    "http://localhost:8080/post_sorted_tasks",
    "POST",
    { "Content-Type": "application/json" },
    sortedTasks,
    postAllTasks
  );

  const fetch = useEffect(() => {
      fetchTasks();
  }, []);

  const post = useEffect(() => {
    if (sortedTasks) {
      postTasks();
    }
  }, [sortedTasks]);

  const handleDragStart = (e, item) => {
    setDraggedTask(item);
    e.target.closest("div").classList.add(classes.dragged);
  };

  const handleDragOver = (e) => {
    e.target.closest("div").classList.add(classes["dragged-over"]);
    e.preventDefault();
  };

  const handleDragEnter = (e, task) => {};

  const handleDragLeave = (e) => {
    e.target.closest("div").classList.remove(classes["dragged-over"]);
  };
  const handleDragEnd = (e) => {
    e.target.closest("div").classList.remove(classes.dragged);
  };

  const handleDrop = (e) => {
    setShowSaveBtn(true);
    console.log("drop" + e.target.closest("div"));
    e.target.closest("div").classList.remove(classes.dragged);

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
      <NewTaskComponent onTaskAdd={fetchTasks}/>
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
              onDragEnd={handleDragEnd}
              onDragEnter={(e) => handleDragEnter(e, task)}
              onDragLeave={(e) => handleDragLeave(e, task)}
              onDrop={handleDrop}
            >
              <h2>{task.title}</h2>
              <h3>{task.content}</h3>
              <p>{task.id}</p>
              <DeleteTaskComponent onTaskDelete={fetchTasks}/>
            </div>
          ))
        ) : (
          <div></div>
        )}
        {showSaveBtn ? (
          <div className={classes.saveSortedList}>
            <button onClick={() => {postAllTasks(); setShowSaveBtn(false)}} className={classes.saveBtn}>
              save changes
            </button>
            <button onClick={() => {fetchTasks(); setShowSaveBtn(false)}} className={classes.saveBtn}>
              discard changes
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TaskBoardComponent;
