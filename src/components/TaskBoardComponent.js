import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import NewTaskComponent from "./NewTaskComponent";
import DeleteTaskComponent from "./DeleteTaskComponent";
import classes from "./TaskBoardComponent.module.css";

function TaskBoardComponent() {
  const [tasks, setTasks] = useState(null);
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

  return (
    <div>
      <NewTaskComponent onSubmit={fetch} />
      <div className={classes["tasks-container"]}>
        {tasks ? (
          tasks.map((task) => (
            <div className={classes.task} key={task.id}>
              <h2>{task.title}</h2>
              <h3>{task.content}</h3>
              <p>{task.id}</p>
              <DeleteTaskComponent/>
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
