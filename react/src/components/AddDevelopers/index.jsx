import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../../services/ducks/action'
import { isUndefined } from 'util'

class AddDevelopers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectId: '',
      name: '',
      surname: ''
    }
  }

  componentDidMount() {
    if (!isUndefined(this.props.match)) {
      const projectId = parseInt(this.props.match.params.projectId)
      this.setState({ projectId: projectId })
    }
  }

  addDeveloper = (devId) => {
    if (isUndefined(this.props.addDevInGroup)) {
      this.props.addDeveloperInProject(this.state.projectId, devId)
    } else {
      this.props.addDevInGroup(devId)
    }
  }

  templatePrintSearched = (dev) => {
    return (
      <div> <span>name: {dev.name}</span> <span>surname: {dev.surname}</span>
        <button onClick={() => this.addDeveloper(dev.id)}>добавить</button>
      </div>
    )
  }

  displayResultSearch = () => {
    return this.props.findedDevelopers.map(d => this.templatePrintSearched(d))
  }

  findDeveloper = () => {
    console.log(this.state.name, this.state.surname)
    this.props.findDeveloper(this.state.name, this.state.surname)
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value })
  }
  onChangeSurname = (e) => {
    this.setState({ surname: e.target.value })
  }


  render() {
    if (this.props.loginedEmployee.role.role === "DEVELOPER") {
      if (!isUndefined(this.props.addDevInGroup)) {
        this.props.addDevInGroup(this.props.loginedEmployee.id)
      }
      return (<span></span>)
    }

    return (
      <div style={{margin:"5px"}}>
        <div className="search">
          <span>Введите данные разработчика</span>
          <input type="text" onChange={this.onChangeName} value={this.state.name} placeholder="Имя" />
          <input type="text" onChange={this.onChangeSurname} value={this.state.surname} placeholder="Фамилия" />
          <button onClick={this.findDeveloper}>Искать разработчика</button>
        </div>
        {
          this.displayResultSearch()
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    findedDevelopers: state.findedDevelopers,
    loginedEmployee: state.loginedEmployee
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    findDeveloper: Actions.findDeveloper,
    addDeveloperInProject: Actions.addDeveloperInProject
  }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AddDevelopers)