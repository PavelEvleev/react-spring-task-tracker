import * as client from '../API'
// import CryptoJS from 'crypto-js'


const keyEncrypt = 'myReadedBooks25ItStep'

export const ERROR = "ERROR"

export const GET_LOGINED_EMPLOYEE_REQUEST = "GET_LOGINED_EMPLOYEE_REQUEST"
export const GET_LOGINED_EMPLOYEE_SUCCESS = "GET_LOGINED_EMPLOYEE_SUCCESS"

export const GET_PROJECTS_REQUEST = "GET_PROJECTS_REQUEST"
export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS"

export const GET_TASKS_REQUEST = "GET_TASKS_REQUEST"
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS"

export const PATCH_TASK_REQUEST = "PATCH_TASK_REQUEST"
export const PATCH_TASK_SUCCESS = "PATCH_TASK_SUCCESS"

export const SEARCH_DEV_REQUEST = "SEARCH_DEV_REQUEST"
export const SEARCH_DEV_SUCCESS = "SEARCH_DEV_SUCCESS"

export const ADD_DEV_IN_PROJECT_REQUEST = "ADD_DEV_IN_PROJECT_REQUEST"
export const ADD_DEV_IN_PROJECT_SUCCESS = "ADD_DEV_IN_PROJECT_SUCCESS"

export const GET_PROJECT_PARTICIPANTS_REQUEST = "GET_PROJECT_PARTICIPANTS_REQUEST"
export const GET_PROJECT_PARTICIPANTS_SUCCESS = "GET_PROJECT_PARTICIPANTS_SUCCESS"

export const GET_RESPOSIBLE_DEV_FOR_TASK_REQUEST = "GET_RESPOSIBLE_DEV_FOR_TASK_REQUEST"
export const GET_RESPOSIBLE_DEV_FOR_TASK_SUCCESS = "GET_RESPOSIBLE_DEV_FOR_TASK_SUCCESS"

export const GET_COMMENTS_IN_TASK_REQUEST = "GET_COMMENTS_IN_TASK_REQUEST"
export const GET_COMMENTS_IN_TASK_SUCCESS = "GET_COMMENTS_IN_TASK_SUCCESS"

export const UPDATE_COMMENT_IN_TASK_REQUEST = "UPDATE_COMMENT_IN_TASK_REQUEST"
export const UPDATE_COMMENT_IN_TASK_SUCCESS = "UPDATE_COMMENT_IN_TASK_SUCCESS"

export const ADD_COMMENT_IN_TASK_REQUEST = "ADD_COMMENT_IN_TASK_REQUEST"
export const ADD_COMMENT_IN_TASK_SUCCESS = "ADD_COMMENT_IN_TASK_SUCCESS"

export const DELETE_COMMENT_IN_TASK_REQUEST = "DELETE_COMMENT_IN_TASK_REQUEST"
export const DELETE_COMMENT_IN_TASK_SUCCESS = "DELETE_COMMENT_IN_TASK_SUCCESS"

export function getLoginedEmployee() {
  return function (dispatch) {
    dispatch({ type: GET_LOGINED_EMPLOYEE_REQUEST })

    client.getAuthenticatedEmployee().then(response => {
      dispatch({
        type: GET_LOGINED_EMPLOYEE_SUCCESS,
        payload: response.data
      })
      client.getMyProjects(response.data.id).then(response => {
        dispatch({
          type: GET_PROJECTS_SUCCESS,
          payload: response.data._embedded.projects
        })
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}

export function getTasksInProject(id) {
  return function (dispatch) {
    dispatch({ type: GET_TASKS_REQUEST })
    client.getTasksInProject(id).then(response => {
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: response.data._embedded.tasks
      })
    })

  }
}

export function changeStatus(data) {
  return function (dispatch) {
    dispatch({ type: PATCH_TASK_REQUEST })
    client.patchTaskStatus(data).then(response => {
      dispatch({
        type: PATCH_TASK_SUCCESS,
        payload: data
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}

export function findDeveloper(name, surname) {
  return function (dispatch) {
    dispatch({ type: SEARCH_DEV_REQUEST })
    client.findDeveloper(name, surname).then(response => {
      dispatch({
        type: SEARCH_DEV_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
      console.log(error);
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}

export function addDeveloperInProject(projectId, devId) {
  let form = new FormData()
  form.append('devId', devId)
  form.append('projectId', projectId)
  return function (dispatch) {
    dispatch({ type: ADD_DEV_IN_PROJECT_REQUEST })
    client.addDeveloperInProject(form).then(response => {
      dispatch({
        type: ADD_DEV_IN_PROJECT_SUCCESS
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        if (error.response.status === 409) {
          dispatch({
            type: ERROR,
            payload: error.response.data.message
          })
        } else {
          dispatch({
            type: ERROR,
            payload: error.toString()
          })
        }
      }
    }
    )
  }
}


export function getProjectParticipants(projectId) {
  return function (dispatch) {
    dispatch({ type: GET_PROJECT_PARTICIPANTS_REQUEST })
    client.getProjectParticipants(projectId).then(response => {
      dispatch({
        type: GET_PROJECT_PARTICIPANTS_SUCCESS,
        payload: response.data._embedded.employees
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}

export function getResposibleDevForTask(taskId) {
  return function (dispatch) {
    dispatch({ type: GET_RESPOSIBLE_DEV_FOR_TASK_REQUEST })
    client.getResposibleDevForTask(taskId).then(response => {
      dispatch({
        type: GET_RESPOSIBLE_DEV_FOR_TASK_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}

export function getCommentsInTask(id){
  return function (dispatch) {
    dispatch({ type: GET_COMMENTS_IN_TASK_REQUEST })
    client.getCommentsInTask(id).then(response => {
      dispatch({
        type: GET_COMMENTS_IN_TASK_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      })
  }
}

export function changeCommentInTask(comment) {
  return function (dispatch) {
    dispatch({ type: UPDATE_COMMENT_IN_TASK_REQUEST })
    client.changeCommentInTask(comment).then(response => {
      dispatch({
        type: UPDATE_COMMENT_IN_TASK_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}

export function  deleteComment(commentId) {
  return function (dispatch) {
    dispatch({ type: DELETE_COMMENT_IN_TASK_REQUEST })
    client.deleteComment(commentId).then(response => {
      dispatch({
        type: DELETE_COMMENT_IN_TASK_SUCCESS,
        payload: commentId
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}

export function createComment(comment){
  return function (dispatch) {
    dispatch({ type: ADD_COMMENT_IN_TASK_REQUEST })
    client.createComment(comment).then(response => {
      dispatch({
        type: ADD_COMMENT_IN_TASK_SUCCESS,
        payload: response.data
      })
    }).catch(error => {
      if (error.response.status !== 401) {
        dispatch({
          type: ERROR,
          payload: error.toString()
        })
      }
    }
    )
  }
}
