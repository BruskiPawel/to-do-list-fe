import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import { ACTIONS } from "../Actions";

const NewTaskComponent = (props) => {
  const [newTask, setNewTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addNewTaskHandler = (e) => {
    e.preventDefault();
   
    const [year, month, day] = e.target.children[1].value.split("-");
    const [hours, minutes] = e.target.children[3].value.split(":");
    const dateTime = new Date(year, month -1, day, hours, minutes);
    setNewTask({
        date: dateTime,
        content: e.target.children[5].value,
    })
  };

  const { error, sendRequest: PostNewTask } = useHTTP(
    ACTIONS.SAVE_NEW_TASK,
    newTask,
    null,
    null
  );

   useEffect(() => {
    if(newTask) {
        PostNewTask().then(() => props.onTaskAdd());
    }
  }, [newTask]);

  return (
    <form onSubmit={addNewTaskHandler}>
      <label>date:</label>
      <input type="date"></input>
      <label>time:</label>
      <input type="time"></input>
      <label>Content</label>
      <input type="text" name="content" />
      <button type="submit">add Task</button>
    </form>
  );
};

export default NewTaskComponent;
