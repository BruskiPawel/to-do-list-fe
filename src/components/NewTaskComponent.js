import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";

const NewTaskComponent = (props) => {
  const [newTask, setNewTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addNewTaskHandler = (e) => {
    e.preventDefault();
    setNewTask({
        title: e.target.children[1].value,
        content: e.target.children[3].value
    })
  };

  const { error, sendRequest: PostNewTask } = useHTTP(
    "http://localhost:8080/add-new-task",
    "POST",
    {'Content-Type': 'application/json'},
    newTask,
    null
  );

   useEffect(() => {
    if(newTask) {
        PostNewTask().then(() => props.onTaskAdd());
    }
  }, [newTask]);

  return (
    <form onSubmit={addNewTaskHandler}>
      <label>Title</label>
      <input type="text" name="title" />
      <label>Content</label>
      <input type="text" name="content" />
      <button type="submit">add Task</button>
    </form>
  );
};

export default NewTaskComponent;
