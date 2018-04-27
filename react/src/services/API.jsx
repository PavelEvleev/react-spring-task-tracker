import axios from 'axios';

// const serverUrl = "https://peaceful-waters-96928.herokuapp.com/"
// const serverUrl = "http://localhost:8080/";
export const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  // console.log(parts.pop().split(";").shift())
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export const set_cookie = (name, value, date, refreshToken) => {
  let d = new Date()
  d.setTime(d.getTime() + date * 60)
  let expires = "expires=" + d.toGMTString();
  let AuthStr = 'Bearer ' + value;
  axios.defaults.headers.common['Authorization'] = AuthStr;
  document.cookie = name + '=' + value + ';' + expires + ';Path=/;';
  document.cookie = "refresh_token" + '=' + refreshToken + ';' + ';Path=/;';
}

export const delete_cookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export let DEFAULT_HTTP_HEADERS = {
  'Content-Type': 'application/json',
  // 'Cookie': getCookie("JESSIONID")
}

export const validateStatus = (status) => {
  return status >= 200 && status < 300
}
  // baseURL: serverUrl,

export const client = axios.create({
  headers: DEFAULT_HTTP_HEADERS,
  validateStatus: validateStatus
});



export const getAuthenticatedEmployee = () => {
  const uuid = getCookie('uuid')
  console.log(uuid)
  return client.get(`/api/auth/${uuid}`)
}


export const getMyProjects = (id) => {
  return client.get(`/api/employees/${id}/projects`)
}

export const getTasksInProject = (id) => {
  return client.get(`/api/projects/${id}/tasks`)
}

export const patchTaskStatus = (data) => {
  return client.patch("/api/task", data)
}

export const findDeveloper = (name, surname) => {
  return client.get(`/api/employees/developer/search?name=${name}&surname=${surname}`)
}

export const addDeveloperInProject = (data) => {
  return client.post('/api/add/developer/project', data)
}

export const getProjectParticipants = (id) => {
  return client.get(`/api/projects/${id}/employees`)
}

export const getResposibleDevForTask = (id) => {
  return client.get(`/api/tasks/${id}/employee`)
}

export const getCommentsInTask = (id) => {
  return client.get(`/api/tasks/${id}/comments`)
}

export const changeCommentInTask = (comment) => {
  return client.post("/api/comments/update", comment)
}
export const deleteComment = (id) => {
  return client.delete(`/api/comments/${id}`)
}

export const createComment = (data) => {
  return client.post("/api/tasks/employee/comment", data)
}
/*
 * API endpoint to fetch all user books.
*/