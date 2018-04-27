import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Links extends React.Component {

  render() {
    return (
      <div className='nav'>
        <ul>
          <li><Link to="/">На главную</Link></li>
          <li> <Link to="/my-account">Личный кабинет</Link></li>
          <li><Link to="/about">О проекте</Link></li>
        </ul>
      </div>

    )
  }

}
const mapStateToProps = (state) => {
  return {
    role: state.role
  }
}


export default connect(mapStateToProps)(Links)