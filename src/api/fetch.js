/* eslint-disable camelcase */
export const IP = "localhost";
export const PORT = 8080;

// api utility helper function
const apiCall = async (path, method, body) => {
  const token = localStorage.getItem("authToken");
  const init = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token === "undefined" ? undefined : token,
    },
    body: method === "GET" ? undefined : JSON.stringify(body),
  };
  const response = await fetch(`http://${IP}:${PORT}${path}`, init);
  const data = await response.json();
  if (!response.ok) {
    console.log(data.message);
    throw data;
  }
  return data;
};

/* Authetication */
// signup
export const register = (bodyObj) => apiCall("/userAuth/register", "POST", bodyObj);

// Post login information
export const login = (bodyObj) => apiCall("/userAuth/login", "POST", bodyObj);

/* Connections */
// Accept connection
export const acceptConnection = (id) => apiCall(`/connection/accept/${id}`, "POST", {});

// Decline connection
export const declineConnection = (id) => apiCall(`/connection/decline/${id}`, "POST", {});

// Send connection
export const sendConnection = (user_id, connection_msg) =>
  apiCall("/connection/send", "POST", { connection_msg, user_id });

// Get all connected users
export const connected = () => apiCall("/connection/connected", "GET", {});

// Get all users who requested for connection
export const receivedRequests = () => apiCall("/connection/receivelist", "GET", {});

// Get all users who were requested for connection by me.
export const sentRequests = () => apiCall("/connection/sendlist", "GET", {});

/* User information */
// Get user profile by id
export const getProfile = (id) =>
  apiCall(id === undefined ? "/user/profile" : `/user/profile/${id}`, "GET", {});

// edit profile by PUT
export const editProfile = (bodyObj) => apiCall("/user/profile", "PUT", bodyObj);

// Get all available tags
export const getAvailTags = () => apiCall("/user/availtags", "GET", {});

export const getOwnProfile = () => apiCall("/user/profile", "GET", {});

// task creation
export const taskCreation = (bodyObj) => apiCall("/task/create", "POST", bodyObj);

/* Tasks */
// Get tasks by status
export const getTasks = (complete) =>
  apiCall(complete ? "/task/status/completed" : "/task/me", "GET", {});

export const getMyTasks = () => apiCall("task/me", "GET", {});

export const getTasksOther = (complete) =>
  apiCall(complete ? "/task/other/complete" : "/task/other", "GET", {});

export const acceptTask = (id) => apiCall(`/task/accept/${id}`, "GET", {});

export const declineTask = (id) => apiCall(`/task/decline/${id}`, "GET", {});

export const postStatus = (task_id, status) => apiCall("/task/status", "POST", { status, task_id });

export const getTask = (id) => apiCall(`/task/taskId/${id}`, "GET", {});

export const putTask = (id, bodyObj) => apiCall(`/task/edit/${id}`, "PUT", bodyObj);

export const postFeedback = (bodyObj) => apiCall("/task/feedback", "POST", bodyObj);

/* Search */
export const globalSearch = (searchKey) => apiCall(`/search/global?key=${searchKey}`, "GET", {});
export const searchTasks = (bodyObj) => apiCall("/search/task", "POST", bodyObj);
export const searchUsers = (bodyObj) => apiCall("/search/user", "POST", bodyObj);

/* Recommendation */
export const recommendation = (task_tag) => apiCall(`/recommend/${task_tag}`, "GET", {});
export const recommendationAll = () => apiCall("/recommend/", "GET", {});

/* Workload monitor */
export const changeAvailableHours = (bodyObj) =>
  apiCall("/available?ava_hour=".concat(bodyObj.ava_hour), "POST", {});

export const busyEstimate = (bodyObj) =>
  apiCall("/busyEstimate?user_id=".concat(bodyObj.user_id), "POST", {});

/* Test */
// export const testResponse = (task_tag) => apiCall(`/recommend/${task_tag}`, "GET", {});
