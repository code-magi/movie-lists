import React, { Component } from 'react'
import '../css/style.css'
import { Redirect } from 'react-router-dom'
import '../css/LoginSignup.css'
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
    WebkitBoxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    MozBoxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    boxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    backgroundColor: '#F7F7F7'
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputEmail: '',
      inputPassword: '',
      modalIsOpen: true
      // modalMessage: Object.values(this.props.errors).join(';')
      // modalMessage: this.props.errors.email
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

  handleInputPassword = (evt) => {
    // Clear modal-message when user starts typing
    if (Object.keys(this.props.authErrors).length !== 0 || 
        Object.keys(this.props.valErrors).length !== 0 ) {
      this.props.clearErrorObjectsAction()
    }

    this.setState({ inputPassword: evt.currentTarget.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let reqBody = {
      email: this.state.inputEmail,
      password: this.state.inputPassword
    }
    console.log('reqBody', reqBody)

    // loginAction post reqBody and dispatch user to Store in trycatch. If Errors dispatch into errors obj
    let url = '/api/users/login'

    // To avoid a problem with params order Let's pass an obj
    let paramObj = {reqBody, url}
    this.props.loginAction(paramObj)

    // TODO: uncomment
    // try {
    //   console.log('fetch from endpoint /lists')
    //   axios({
    //     method: 'get',
    //     url: 'api/lists',
    //     withCredentials: true
    //   }).then(response => {
    //     console.log('response', response)
    //     let responseLists = response.data.lists
    //     console.log('responseLists', responseLists)
    //     this.props.dispatch({ type: 'getLists', payload: responseLists })
    //   })
    // } catch (error) {
    //   console.log('error on fetching from endpoint /lists', error);
    // }


          //// add the list to the store for the particular user"
          // console.log('fetch from endpoint /lists')
          // axios({
          //   method: 'get',
          //   url: 'api/lists',
          //   withCredentials: true
          // }).then(response => {
          //   console.log('response', response)
          //   let responseLists = response.data.lists
          //   console.log('responseLists', responseLists)
          //   this.props.dispatch({ type: 'getLists', payload: responseLists })
          // })
        // } else {
        //   this.setState({
        //     modalMessage: 'Wrong username or password.'
        //   })
        // }
      // }
      // .catch(e => {
      //   if (e) {
      //     console.log('error', e.response.data.valErrors)
      //     this.setState({
      //       modalMessage: Object.values(e.response.data.valErrors).join(';')
      //     })
      //     // console.log("Error. probably username doesnt exist")
      //   }
      // })
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
            <h3 className='header-login-signup mb-3 ml-1'>Log in </h3>
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
              <div>
                <input
                  type='text'
                  onChange={this.handleInputPassword}
                  value={this.state.inputPassword}
                  className=' ml-2 input-login-signup'
                />
                <div className=' ml-2 mb-2'>Password</div>
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

export default connect(mapStateToProps, { loginAction, clearErrorObjectsAction })(Login)
