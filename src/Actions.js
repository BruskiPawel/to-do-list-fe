
export const ACTIONS = {
  GET_ALL_TASKS: {
    URL: "http://localhost:8080/tasks",
    METHOD: "GET",
    HEADER: { "Content-Type": "application/json" },
  },

  LOG_IN_USER: {
    URL: "http://localhost:8080/login_user",
    METHOD: "POST",
    HEADER: { "Content-Type": "application/json" },
  },

  SAVE_NEW_TASK: {
    URL: "http://localhost:8080/add-new-task",
    METHOD: "POST",
    HEADER: { "Content-Type": "application/json" },
  },

  DELETE_TASK: {
    URL: "http://localhost:8080/delete-task",
    METHOD: "DELETE",
    HEADER: { "Content-Type": "application/json" },
  },

  GET_ALL: "get_all",


  
};
