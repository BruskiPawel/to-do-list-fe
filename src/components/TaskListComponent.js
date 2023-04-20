import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import DeleteTaskComponent from "./DeleteTaskComponent";
import classes from "./TaskBoardComponent.module.css";

const TaskListComponent = (props) => {
  const [tasks, setTasks] = useState(null);
  const [sortedTasks, setSortedTasks] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const getAllTasks = (taskArr) => {
    const mapedTasks = taskArr.map((task) => ({
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
    setTasks(mapedTasks);
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

  useEffect(() => {
     if (props.isLoggedIn || props.shouldRerender) {
        props.onTasksChange(false);
      fetchTasks();
    }
  }, [props.isLoggedIn, props.shouldRerender]);

  const postAllTasks = (data) => {
    setSortedTasks(tasks);
  };

  const { postError, sendRequest: postTasks } = useHTTP(
    "http://localhost:8080/post_sorted_tasks",
    "POST",
    { "Content-Type": "application/json" },
    sortedTasks,
    postAllTasks,
    null
  );

  useEffect(() => {
    if (sortedTasks ) {
        console.log("posting tasks")
        console.log(sortedTasks)
      props.onTasksChange(false);
      postTasks();
      fetchTasks();
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
    props.onTasksChange(true);
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
    <>
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
    </>
  );
};

export default TaskListComponent;
