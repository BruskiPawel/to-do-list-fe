import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import DeleteTaskComponent from "./DeleteTaskComponent";
import SaveButtonComponent from "./SaveButtonComponent";
import classes from "./TaskListComponent.module.css";
import { STYLES } from "../actions/styles";
import NewTaskComponent from "./NewTaskComponent";

const TaskListComponent = (props) => {
  const [tasks, setTasks] = useState(null);
  const [sortedTasks, setSortedTasks] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showButton, setShowButton] = useState(false);



  const getAllTasks = (taskArr) => {
    const mapedTasks = taskArr.map((task) => ({
      id: task.id,
      date: new Date(
        task.date[0],
        task.date[1] - 1,
        task.date[2],
        task.date[3],
        task.date[4]
      ),
      content: task.content,
    }));
    setTasks(mapedTasks);
  };

  const deadlineStylesHandler = (deadline) => {
    if (deadline) {
      const diffDays = daysBetween(deadline);
      if (diffDays <= 1) {
        return STYLES.EXPIRED;
      } else if (diffDays <= 3) {
       
        return STYLES.THREE_DAYS_LEFT;
      } else return STYLES.ONE_WEEK_LEFT;
    } else return STYLES.ONE_WEEK_LEFT;
  };

  const daysBetween = (deadline) => { 
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((deadline - today) / oneDay);
    return diffDays;
  };
  const postAllTasks = (data) => {
    setSortedTasks(tasks);
  };
  const { error, sendRequest: fetchTasks } = useHTTP(
    "http://localhost:8080/tasks/" + props.user,
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
    postAllTasks,
    null
  );

  useEffect(() => {
    if (sortedTasks) {
      setShowButton(false);
      postTasks();
      fetchTasks();
    }
  }, [sortedTasks]);

  useEffect(() => {
    if (props.isLoggedIn) {
      setShowButton(false);
      fetchTasks();
    }
  }, [props.isLoggedIn]);

  return (
    <>
      <NewTaskComponent user={props.user} onTaskAdd={fetchTasks} />
      <div className={classes["tasks-container"]}>
        {tasks ? (
          tasks.map((task) => 
            (
            <div
              className={classes.task}
              style={{backgroundColor: deadlineStylesHandler(task.date)}}
              key={task.id}
              id={task.id}
            >
              <p>deadline: {task.date.toLocaleDateString()}</p>
              <h3>{task.content}</h3>
              <DeleteTaskComponent onTaskDelete={fetchTasks} />
            </div>
          ))
        ) : 
          <div>
            <h2>add some tasks</h2>
          </div>
        }
        {showButton ? (
          <SaveButtonComponent onSave={postAllTasks} onDiscard={fetchTasks} />
        ) : null}
      </div>
    </>
  );
};

export default TaskListComponent;
