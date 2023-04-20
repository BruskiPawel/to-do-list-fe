import { useEffect, useState } from "react";
import { ACTIONS } from "../../Actions";
import { taskListCreator } from "../TaskListCreator";
import classes from "../TaskBoardComponent.module.css";
import useHTTP from "../../hooks/use-http";
import TaskComponent from "./TaskComponent";

const TaskListComponent = (props) => {
  const [tasks, setTasks] = useState(null);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
 
  const getAllTasks = (taskArr) => {
    setTasks(taskListCreator(taskArr));
    console.log(tasks);
  };

  const { error, sendRequest: fetchTasks } = useHTTP(
    ACTIONS.GET_ALL_TASKS,
    null,
    getAllTasks
  );

  useEffect(() => {
    if (props.isLoggedIn) {
      setShowSaveBtn(false);
      fetchTasks();
    }
  }, [props.isLoggedIn]);

  return (
    <div>
      {tasks ? (
        tasks.map((task) => {
          return <TaskComponent key={task.id} task={task} onDelete={fetchTasks}/>;
        })
      ) : (
        <div />
      )}
    </div>
  );
};

export default TaskListComponent;
