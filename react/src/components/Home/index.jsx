import React from 'react';
import * as client from './../../services/API'


/**
 * Simple Home component.
 */
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }

  componentDidMount() {
    // this.getCookie("JSESSIONID")
    // client.client.get('/api/employees').then((response) => {
    //  console.log(response)
    // })
  }

  // getCookie = (name) => {
  //   console.log(name)
  //   var value = "; " + document.cookie;
  //   console.log(value)
  //   var parts = value.split("; " + name + "=");
  //   console.log(parts)
  //   // if (parts.length === 2) return parts.pop().split(";").shift();
  // }

  render() {
    return (
      <div>
        Главная страница
      </div>
    )
  }
}