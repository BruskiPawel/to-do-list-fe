
export const TaskListCreator = (tasks) => {
  const newList = tasks.map((task) => ({
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
  return newList;
};
