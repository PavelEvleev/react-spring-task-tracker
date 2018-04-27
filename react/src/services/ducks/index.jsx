import Immutable from 'seamless-immutable'
import { notify } from 'react-notify-toast'
import * as Action from './action'


const store = Immutable({
  login: false,
  fetching: false,
  loginedEmployee: null,
  findedDevelopers: [],
  projects: [],
  participants: [],
  tasks: [],
  commentsInTask: [],
  commentsPageable: {},
  resposibleDev: null,
  role: ''


})

const rootReducer = (state = store, action) => {

  switch (action.type) {
    case Action.ERROR:

      notify.show(action.payload, 'error', 5000)
      return state.merge({ error: action.payload })
    case Action.GET_LOGINED_EMPLOYEE_SUCCESS:
      return state.merge({ loginedEmployee: action.payload, role: action.payload.role.role })

    case Action.GET_PROJECTS_SUCCESS:
      return state.merge({ projects: action.payload })
    case Action.GET_TASKS_SUCCESS:
      return state.merge({ tasks: action.payload })
    case Action.PATCH_TASK_SUCCESS:
      return state.merge({ tasks: state.tasks.map(task => task.id === action.payload.taskId ? Object.assign({}, task, { status: action.payload.status }) : task) })
    case Action.SEARCH_DEV_SUCCESS:
      return state.merge({ findedDevelopers: action.payload })
    case Action.GET_PROJECT_PARTICIPANTS_SUCCESS:
      return state.merge({ participants: action.payload })
    case Action.GET_RESPOSIBLE_DEV_FOR_TASK_SUCCESS:
      return state.merge({ resposibleDev: action.payload })
    case Action.GET_COMMENTS_IN_TASK_SUCCESS:
      const { payload } = action
      return state.merge({ commentsInTask: payload.content, commentsPageable: { number: payload.number, totalPages: payload.totalPages } })
    case Action.UPDATE_COMMENT_IN_TASK_REQUEST:
      return state.merge({ fetching: true })
    case Action.UPDATE_COMMENT_IN_TASK_SUCCESS:
      notify.show("Комментарий обновлён", "success", 1500)
      return state.merge({ fetching: false, commentsInTask: state.commentsInTask.map(comment => comment.id === action.payload.id ? action.payload : comment) })
    case Action.DELETE_COMMENT_IN_TASK_SUCCESS:
      return state.merge({ commentsInTask: state.commentsInTask.filter(comment => comment.id !== action.payload) })
    case Action.ADD_COMMENT_IN_TASK_SUCCESS:
    notify.show("Комментарий добавлен", "success", 1500)
      return state.merge({
        commentsInTask: state.commentsInTask.filter(c => c.id === action.payload.id).length > 0
          ? state.commentsInTask.map(comment => comment.id === action.payload.id ? action.payload : comment)
          : state.commentsInTask.concat(action.payload)
      })
    case Action.ADD_DEV_IN_PROJECT_SUCCESS:
      notify.show("Разработчик добавлен в проект", "success", 2000)
      return state
    default:
      return state
  }
}

export default rootReducer
