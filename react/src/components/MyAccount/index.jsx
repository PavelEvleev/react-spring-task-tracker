import React from 'react'
import { client } from './../../services/API'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../../services/ducks/action'


class MyAccount extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getLoginedEmployee("mr.malefiic@gmail.com")
  }

  render() {
    const { loginedEmployee, projects } = this.props
    console.log(projects)
    return (
      <div style={{ margin: "5px" }}>
        <h2>Личный кабинет</h2>
        <div style={{ margin: "5px" }}>
          пользователь:
          {
            loginedEmployee != null ? (
              <ul>
                <li>Должность: {loginedEmployee.role.role}</li>
                <li>Имя: {loginedEmployee.name}</li>
                <li>Email: {loginedEmployee.email}</li>
              </ul>) : ""
          }
        </div>
        <div style={{ margin: "5px" }}>
          {this.props.role === "MANAGER" ? <Link to="/project/new">Создать новый проект</Link> : ""}
          <br />
          <h3>Проекты в которых участвую</h3>
          <ul>
            {projects.length > 0 ? projects.map((p, i) => <li key={i}><Link to={`/project/${p.id}`}>{p.name}</Link></li>) : "нет проектов"}
          </ul>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    loginedEmployee: state.loginedEmployee,
    projects: state.projects,
    role: state.role
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getLoginedEmployee: Actions.getLoginedEmployee
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)