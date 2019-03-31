import React, { Component } from 'react'
import '../css/style.css'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import '../css/MakeList.css'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal'

import MovieSearchBody from './MakeListSearchMovie'
import ChosenMovies from './ChosenMovies'
import ListPropertiesForm from './ListPropertiesForm'

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '50000000000',
    textAlign: 'center'
  }
}

class MakeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputTitle: '',
      inputDescription: '',
      inputTag: '',
      chosenMovies: [],
      tags: [],
      message: '',
      confirmedFinishedList: false,
      modalIsOpen: false
    }
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

  displayMessage = () => {
    if (this.state.message) {
      return (
        <div className='jump' style={{ color: 'red' }}>
          {this.state.message}
        </div>
      )
    }
  }

  addList = () => {
    // tags will be sent as a string which separates the movies with ^^ .
    let tagBody = this.state.tags.join(' ^^ ')
    let reqBody = {
      name: this.state.inputTitle,
      movieArr: this.state.chosenMovies, /// //TODO
      description: this.state.inputDescription,
      tags: tagBody
    }
    console.log('commencing fetch at endpoint /lists/add ')
    axios({
      method: 'post',
      url: '/api/lists/add',
      data: reqBody,
      withCredentials: 'include'
    })
      .then(response => {
        console.log('response', response)
        if (response.data.success) {
          console.log('successful request')
          this.setState({ confirmedFinishedList: true })
          this.props.history.push('/lists')
        } else {
          console.log('error in request')
        }
      })
      .catch(() => console.log('error in request'))
  }

  render () {
    if (!this.props.loggedIn) {
      return <Redirect to='/loginalert' />
    } else {
      return (
        <div className='container-fluid main-container-make'>
          {this.displayMessage()}
          <div className='container-fluid make-holder'>
            <h2 className='text-center mb-5'>Make List</h2>
            <div className='row row-top-make p-0'>
              <div className='col-md-6 p-2 form-holder-make'>
                <ListPropertiesForm parent={this} />
              </div>
              <div className='col-md-6 search-holder-make'>
                <MovieSearchBody parent={this} />
              </div>
            </div>
          </div>
          <h4>Your Chosen Movies</h4>
          <div className='container container-movies-chosen'>
            <ChosenMovies parent={this} />
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={ModalStyles}
          >
            <h5>Confirm to finish making List</h5>
            <button onClick={this.addList} className='button-modal-list'>
              CONFIRM
            </button>
            <button
              onClick={() => this.setState({ modalIsOpen: false })}
              className='button-modal-list'
            >
              NOT YET
            </button>
          </Modal>
        </div>
      )
    }
  }
}

let mapStateToProps = (state) => {
  return { loggedIn: state.user.loggedIn }
}

export default connect(mapStateToProps)(withRouter(MakeList))
