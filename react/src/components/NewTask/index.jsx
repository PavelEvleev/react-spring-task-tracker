import React from 'react'
import { client } from './../../services/API'
import { notify } from 'react-notify-toast'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import statusTask from './../StatusTask'
import AddDeveloper from './../AddDevelopers'
import { error } from 'util';

export default class NewTask extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectId: '',
      projectName: '',
      description: '',
      selectedStatus: ''
    }
  }

  componentDidMount() {
    const projectId = parseInt(this.props.match.params.projectId)
    this.setState({ projectId: projectId })
    console.log(statusTask)
  }


  onChangeDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  onChangeNameProject = (e) => {
    this.setState({ projectName: e.target.value })
  }

  createTask = () => {
    const { projectName, description, selectedStatus } = this.state

    if (projectName.length < 2 || selectedStatus.length < 1) {
      notify.show("поля не могут быть пустыми", 'error', 5000)
    } else if (description.length < 10) {
      notify.show("описание слишком короткое", 'error', 5000)
    } else {
      const data = {
        projectId: this.state.projectId,
        devId: this.state.devId ? this.state.devId : null,
        task: {
          name: this.state.projectName,
          description: this.state.description,
          status: this.state.selectedStatus,
        }
      }
      client.post("/api/projects/create/task", data).then(response => {
        if (response.status === 200)
          notify.show("Задача создана успешно", 'success', 1500)
      }).catch(error => {
        notify.show(error.toString(), 'error', 3500)
      })
    }
  }

  selectedChange = (event, index, value) => {
    this.setState({ selectedStatus: value })
  }

  menuItem = () => {
    return statusTask.map((s, index) => <MenuItem key={index} value={s} primaryText={s} />)
  }

  addDevInTask = (devId) => {
    console.log(devId)
    this.setState({ devId: devId })
  }

  render() {
    return (
      <div style={{ margin: "5px" }}>
        <div style={{ margin: "5px" }}>
          <AddDeveloper addDevInGroup={this.addDevInTask} />
        </div>
        <div >
          <input type="text" onChange={this.onChangeNameProject} value={this.state.projectName} placeholder="Название задачи" />
          <input type="text" onChange={this.onChangeDescription} value={this.state.description} placeholder="Описание задачи" />
          <SelectField value={this.state.selectedStatus} onChange={this.selectedChange}>
            {this.menuItem()}
          </SelectField>
        </div>
        <button onClick={this.createTask}>Создать проект</button>
      </div>
    )
  }
}
