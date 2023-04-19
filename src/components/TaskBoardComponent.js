import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import NewTaskComponent from "./NewTaskComponent";
import DeleteTaskComponent from "./DeleteTaskComponent";
import classes from "./TaskBoardComponent.module.css";
import SaveButtonComponent from "./SaveButtonComponent";
import LoginFormComponent from "./LoginFormComponent";

function TaskBoardComponent() {
  const [tasks, setTasks] = useState(null);
  const [sortedTasks, setSortedTasks] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const getAllTasks = (taskArr) => {
    console.log(" get all tasks");
    console.log(taskArr);
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
    console.log("po mapingu: " + updatedTasks);
    setTasks(updatedTasks);
  };
  const postAllTasks = (data) => {
    console.log("im in post all compo");
    console.log(data);
    setSortedTasks(tasks);
  };

  const { error, sendRequest: fetchTasks } = useHTTP(
    "http://localhost:8080/tasks",
    "GET",
    {
      Accept: "application/json",
    },
    null,
    getAllTasks,
    null
  );

  const { postError, sendRequest: postTasks } = useHTTP(
    "http://localhost:8080/post_sorted_tasks",
    "POST",
    { "Content-Type": "application/json" },
    sortedTasks,
    postAllTasks,
    null
  );

  useEffect(() => {
    if (isLoggedin) {
      setShowSaveBtn(false);
      fetchTasks();
    }
  }, [isLoggedin]);

  useEffect(() => {
    if (sortedTasks) {
      setShowSaveBtn(false);
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
    e.target.closest("div").classList.remove(classes.dragged);

    const movedTask = tasks.find((task) => task.id === draggedTask.id);

    const targetTask = tasks.find(
      (task) => task.id === parseInt(e.target.closest("div").id)
    );
    const newList = tasks.filter((task) => task.id !== movedTask.id);

    newList.splice(
      newList.findIndex((task) => task.id === targetTask.id),
      0,
      movedTask
    );

    newList.splice();

    setTasks(newList);
    e.preventDefault();
  };

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
                  <p>{task.date.toLocaleDateString()}</p>
                  <h3>{task.content}</h3>
                  <p>{task.id}</p>
                  <DeleteTaskComponent onTaskDelete={fetchTasks} />
                </div>
              ))
            ) : (
              <div></div>
            )}
            {showSaveBtn ? (
              <SaveButtonComponent
                onPost={() => {
                  postAllTasks();
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
