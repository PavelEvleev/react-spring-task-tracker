import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Comments from './../Comments/index'
import statusTask from './../StatusTask'

import { notify } from 'react-notify-toast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../../services/ducks/action'
import { isUndefined } from 'util';

class Task extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      taskId: '',
      taskName: '',
      description: '',
      selectedStatus: ''
    }
  }

  componentDidMount() {
    const taskId = parseInt(this.props.match.params.taskId)
    this.setState({ taskId: taskId })
    this.props.getResposibleDevForTask(taskId)
    this.props.getComments(taskId)
    console.log(statusTask)
  }

  createComment = (comment) => {
    comment.authorId = this.props.loginedEmployee.id
    comment.taskId = this.state.taskId
    this.props.createComment(comment)
  }

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  onChangeNameProject = (e) => {
    this.setState({ projectName: e.target.value })
  }

  updateStatus = () => {
    console.log(this.state.selectedStatus)
    if (this.state.selectedStatus.length > 1) {
      if (this.props.tasks.find(t => t.id === this.state.taskId).status !== this.state.selectedStatus) {
        const data = {
          taskId: this.state.taskId,
          status: this.state.selectedStatus
        }
        this.props.changeStatus(data)
      }
    } else {
      notify.show("Статус не изменялся", "error", 2500)
    }
  }

  selectedChange = (event, index, value) => {
    this.setState({ selectedStatus: value })
  }

  menuItem = () => {
    return statusTask.map((s, index) => <MenuItem key={index} value={s} primaryText={s} />)
  }

  render() {
    const task = this.props.tasks.find(t => t.id === this.state.taskId)
    console.log(task)
    if (!isUndefined(task))
      return (
        <div>
          <h2>Задача</h2>
          <div>name task: {task.name}</div>
          <div>description: {task.description}</div>
          {
            this.props.resposibleDev ? <div>Ответственный за реализацию: {this.props.resposibleDev.name} {this.props.resposibleDev.surname}</div> : ''
          }
          <div>status: {task.status}</div>
          <SelectField value={this.state.selectedStatus} onChange={this.selectedChange}>
            {this.menuItem()}
          </SelectField>
          <button onClick={this.updateStatus}>Обновить статус</button>
          <div>
            <Comments logined={this.props.loginedEmployee} fetching={this.props.fetching} comments={this.props.comments}
              createComment={this.createComment}
              changeComment={this.props.changeComment}
              deleteComment={this.props.deleteComment}
            />
          </div>
        </div>
      )
    else return (
      <div>
        not found
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    resposibleDev: state.resposibleDev,
    loginedEmployee: state.loginedEmployee,
    comments: state.commentsInTask,
    fetching: state.fetching
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    changeStatus: Actions.changeStatus,
    getComments: Actions.getCommentsInTask,
    changeComment: Actions.changeCommentInTask,
    deleteComment: Actions.deleteComment,
    createComment: Actions.createComment,
    getResposibleDevForTask: Actions.getResposibleDevForTask
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Task)