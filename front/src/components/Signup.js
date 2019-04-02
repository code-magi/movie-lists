import React, { Component } from 'react'
import '../css/style.css'
import { Redirect } from 'react-router-dom'
// import "../css/LoginSignup.css";
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal'

import { loginAction, clearErrorObjectsAction } from '../actions/userActions'

// Previously was (App) but should be a react app DOM element under react-modal docs
Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '50000000000',
    webkitBoxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    mozBoxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    boxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    backgroundColor: '#F7F7F7'
  }
}

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputEmail: '',
      inputPassword: '',
      inputConfirmPassword: '',
      inputUsername: '',
      modalIsOpen: true
      // modalMessage: ''
    }
  }

  handleInputEmail = (evt) => {
    // Clear modal-message when user starts typing
    if (Object.keys(this.props.authErrors).length !== 0 || 
        Object.keys(this.props.valErrors).length !== 0 ) {
      this.props.clearErrorObjectsAction()
    }

    this.setState({ inputEmail: evt.currentTarget.value })
  }

  handleInputUsername = (evt) => {
    // Clear modal-message when user starts typing
    if (Object.keys(this.props.authErrors).length !== 0 || 
        Object.keys(this.props.valErrors).length !== 0 ) {
      this.props.clearErrorObjectsAction()
    }

    this.setState({ inputUsername: evt.currentTarget.value })
  }

  handleInputPassword = (evt) => {
    // Clear modal-message when user starts typing
    if (Object.keys(this.props.authErrors).length !== 0 || 
        Object.keys(this.props.valErrors).length !== 0 ) {
      this.props.clearErrorObjectsAction()
    }

    this.setState({ inputPassword: evt.currentTarget.value })
  }

  handleInputConfirmPassword = (evt) => {
    // Clear modal-message when user starts typing
    if (Object.keys(this.props.authErrors).length !== 0 || 
        Object.keys(this.props.valErrors).length !== 0 ) {
      this.props.clearErrorObjectsAction()
    }

    this.setState({ inputConfirmPassword: evt.currentTarget.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // TODO: think how to re-implement front validation
    // if (this.state.inputConfirmPassword !== this.state.inputPassword) {
    //   this.setState({ modalMessage: 'Password fields do not match.' })
    //   return
    // }

    // make fetch request here and dispatch action if it returns positive
    // Recommend backend also expects a password and user
    let reqBody = {
      email: this.state.inputEmail,
      password: this.state.inputPassword,
      password2: this.state.inputConfirmPassword,
      username: this.state.inputUsername
    }
    console.log('reqBody', reqBody)

    // loginAction post reqBody and dispatch user to Store in trycatch. If Errors dispatch into errors obj
    let url = '/api/users/signup'

    // To avoid a problem with params order Let's pass an obj
    let paramObj = {reqBody, url}
    this.props.loginAction(paramObj)

    // console.log('reqBody', reqBody)
    // axios({
    //   method: 'post',
    //   data: reqBody,
    //   url: '/api/users/signup',
    //   withCredentials: true
    // })
    //   .then(response => {
    //     console.log('post signup was successful')
    //     console.log('response', response)
    //     let { email, userId, avatar } = response.data
    //     // Dispatch to set loggedIn to true
    //     this.props.dispatch({ type: 'login', payload: { email, userId, avatar } })
    //     axios({
    //       method: 'get',
    //       url: 'api/lists',
    //       withCredentials: true
    //     }).then(response => {
    //       console.log('response', response)
    //       let responseLists = response.data.lists
    //       console.log('responseLists', responseLists)
    //       this.props.dispatch({ type: 'getLists', payload: responseLists })
    //     })
    //   })
    //   .catch(e => {
    //     console.log('error of this request', e.response.data.valErrors)
    //     try {
    //       let errorMessage = Object.values(e.response.data.valErrors).join(';')
    //       console.log('errorMessage', errorMessage)
    //       this.setState({
    //         modalMessage: errorMessage
    //       })
    //     } catch (error) {
    //       console.log('error', error)
    //     }
    //   })
    // //
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal = () => {
    // this.subtitle.style.color="#f00"
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render () {
    if (!this.props.loggedIn && this.state.modalIsOpen) {

       // Func loop through valErrors or authError objs and create one or several divs for modal-message
      const renderModalMessage = () => {

        // Create div for modal-message
        const createModalMessageDiv = (errors) => {
          return Object.keys(errors).map(key => {
            console.log('key', key)
            return(
              <div className='modal-message' key={key}>{errors[key]}</div>
            )
          })
        }

        // Check what's error exists and ca
        const {valErrors, authErrors} = this.props
        console.log('valErrors :', valErrors);
        console.log('authErrors :', authErrors);
        if(Object.keys(valErrors).length > 0) return createModalMessageDiv(valErrors)
        if(Object.keys(authErrors).length > 0) return createModalMessageDiv(authErrors)
      }
      return (
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <h3 className='header-login-signup mb-3 ml-1'>Sign up </h3>
            <form onSubmit={this.handleSubmit}>
              <div className=' ml-2'>
                <input
                  type='text'
                  onChange={this.handleInputEmail}
                  value={this.state.inputEmail}
                  className='input-login-signup'
                />
                <div className='mb-1'>Email</div>
              </div>
              <div className=' ml-2'>
                <input
                  type='text'
                  onChange={this.handleInputUsername}
                  value={this.state.inputUsername}
                  className='input-login-signup'
                />
                <div className='mb-1'>Username</div>
              </div>
              <div>
                <input
                  type='text'
                  onChange={this.handleInputPassword}
                  value={this.state.inputPassword}
                  className=' ml-2 input-login-signup'
                />
                <div className=' ml-2 mb-2'>Password</div>
              </div>
              <div>
                <input
                  type='text'
                  onChange={this.handleInputConfirmPassword}
                  value={this.state.inputConfirmPassword}
                  className=' ml-2 input-login-signup'
                />
                <div className=' ml-2 mb-2'>Confirm Password</div>
              </div>
              {renderModalMessage()}
              <input className='btn button-login-signup' type='submit' />
            </form>
          </Modal>
        </div>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

let mapStateToProps = (state) => {
  return { 
    loggedIn: state.user.loggedIn,
    authErrors: state.user.authErrors,
    valErrors: state.user.valErrors
  }
}

export default connect(mapStateToProps, { loginAction, clearErrorObjectsAction })(Signup)
