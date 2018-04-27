import React from 'react'
import { client } from './../../services/API'
import { notify } from 'react-notify-toast'


export default class NewProject extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectName: '',
      description: ''
    }
  }


  onChangeDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  onChangeNameProject = (e) => {
    this.setState({ projectName: e.target.value })
  }

  createProject = () => {
    const { projectName, description } = this.state
    if (projectName.length < 2) {
      notify.show("поля не могут быть пустыми", 'error', 5000)
    } else if (description.length < 10) {
      notify.show("описание слишком короткое", 'error', 5000)
    } else {
      const data = {
        name: this.state.projectName,
        description: this.state.description,
        managerId: 1
      }
      client.post("/api/employee/create/project", data).then(response => {
        if (response.status === 200)
          notify.show("Проект создан успешно", 'success', 1500)
      }).catch(error => {
        notify.show(error.toString(), 'error', 3500)
      })
    }
  }

  render() {
    return (
      <div style={{ margin: "5px" }}>
        <input type="text" onChange={this.onChangeNameProject} value={this.state.projectName} placeholder="Введите имя проекта" />
        <input type="text" onChange={this.onChangeDescription} value={this.state.description} placeholder="Описание проекта" />
        <button onClick={this.createProject}>Создать проект</button>
      </div>
    )
  }
}