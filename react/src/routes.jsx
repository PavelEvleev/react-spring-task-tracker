import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Notifications from 'react-notify-toast'

import Links from './links'

import Home from './components/Home/index'
import About from './components/About/index'
import MyAccount from './components/MyAccount/index'
import NewProject from './components/NewProject/index'
import Project from './components/Project/index'
import NewTask from './components/NewTask/index'
import Task from './components/Task/index'
import AddDevelopers from './components/AddDevelopers/index'


export default class Routes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleTouchTap = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div className="container" >
        <Links />
        <div className="main-window">
          <Switch>
            <Route exact path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/my-account" component={MyAccount} />
            <Route path="/project/new" component={NewProject} />
            <Route path="/project/task/:taskId" component={Task} />
            <Route path="/project/:projectId/add-developers" component={AddDevelopers} />
            <Route path="/project/:projectId/task/new" component={NewTask} />
            <Route path="/project/:projectId" component={Project} />
          </Switch>
        </div>
        <Notifications options={{ zIndex: 5000 }} />
      </div>
    )
  }
}