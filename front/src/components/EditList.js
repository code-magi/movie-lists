
import React, { Component } from 'react'
import '../css/style.css'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import '../css/MakeList.css'
import { connect } from 'react-redux'
import axios from 'axios'
// import App from "../App.js";
import Modal from 'react-modal'

import EditListSearchMovie from './EditListSearchMovie'
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

class EditList extends Component {
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

  componentDidMount () {
    // Try and catch are necessary for when the component is mounted when editlist is undefined in redux
    try {
      let tagArr = this.props.editList.tags.split(' ^^ ')
      this.setState({
        chosenMovies: this.props.editList.movieArr,
        tags: tagArr,
        inputTitle: this.props.editList.name,
        inputDescription: this.props.editList.description
      })
    } catch (err) { console.log('err from componentDidMount', err) }
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

  addEditedList = () => {
    // tags will be sent as a string which separates the movies with ^^ .
    let tagBody = this.state.tags.join(' ^^ ')
    let reqBody = {
      listId: this.props.editList._id,
      name: this.state.inputTitle,
      movieArr: this.state.chosenMovies,
      description: this.state.inputDescription,
      tags: tagBody
    }
    console.log('commencing fetch at endpoint /lists/add ')
    axios({
      method: 'put',
      url: '/api/lists/id',
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
    if (!this.props.editList) {
      return <Redirect to='/lists' />
    }
    if (!this.props.loggedIn) {
      return <Redirect to='/loginalert' />
    } else {
      return (
        <div className='container-fluid main-container-make'>
          <h2 className=''>Edit List</h2>
          {this.displayMessage()}
          <div className='container-fluid make-holder'>
            <div className='row row-top-make p-0'>
              <div className='col-md-6 p-2 form-holder-make'>
                <ListPropertiesForm parent={this} />
              </div>
              <div className='col-md-6 search-holder-make'>
                <EditListSearchMovie parent={this} />
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
            <button onClick={this.addEditedList} className='button-modal-list'>
              Confirm
            </button>
            <button
              onClick={() => this.setState({ modalIsOpen: false })}
              className='button-modal-list'
            >
              Not yet
            </button>
          </Modal>
        </div>
      )
    }
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    editList: state.lists.editList
  }
}

export default connect(mapStateToProps)(withRouter(EditList))
