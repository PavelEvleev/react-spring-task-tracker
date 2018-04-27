import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../../services/ducks/action'
import { isUndefined } from 'util'
import { Link } from 'react-router-dom'

class Project extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectId: ''
    }
  }

  componentDidMount() {
    const projectId = parseInt(this.props.match.params.projectId)
    this.setState({ projectId: projectId })
    this.props.getTasksInProject(projectId)
    this.props.getParticipants(projectId)
  }

  resultParticipants = () => {
    return (
      this.props.participants.map(p => <li key={p.id}>{p.name} {p.surname} - {p.role.role}</li>)
    )
  }


  render() {
    const project = this.props.projects.find(x => x.id === this.state.projectId)
    // debugger
    if (!isUndefined(project))
      return (
        <div style={{ margin: "5px" }}>
          <h2>Проект</h2>
          <div>Название проекта: {project.name}</div>
          <div>Описание: {project.description}</div>
          <div>
            Участники проекта
            <ul>
              {this.resultParticipants()}
            </ul>
            {
              this.props.loginedEmployee.role.role === "MANAGER" ? <Link to={`/project/${project.id}/add-developers`}>Добавить разработчиков в проект</Link> : ''
            }
          </div>
          <div style={{ margin: "5px" }}>
            Список задач на проекте
            <ul>
              {this.props.tasks.map((t, index) => <li key={index} ><Link to={`/project/task/${t.id}`}>{t.name}</Link></li>)}
            </ul>
            <Link to={`/project/${project.id}/task/new`}> Создать новый такс</Link>
          </div>
        </div>

      )
    else return (
      <div>
        мы не нашли проект
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    participants: state.participants,
    loginedEmployee: state.loginedEmployee,
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getTasksInProject: Actions.getTasksInProject,
    getParticipants: Actions.getProjectParticipants
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Project)