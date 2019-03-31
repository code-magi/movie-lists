import React, { Component } from 'react'
import '../css/style.css'
import { withRouter } from 'react-router'
import '../css/MakeList.css'
import { connect } from 'react-redux'

class UnconnectedLoginAlert extends Component {
  render () {
    if (this.props.loggedIn) {
      this.props.history.push('/')
      return (<div />)
    } else {
      return (
        <h3 className='jump' style={{ position: 'relative', top: '50px' }}>To access this feature please sign up or Log in</h3>
      )
    }
  }
}

let mapStateToProps = function (state) {
  return { loggedIn: state.user.loggedIn }
}

let LoginAlert = connect(mapStateToProps)(withRouter(UnconnectedLoginAlert))
export default LoginAlert
