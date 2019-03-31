
import React, { Component } from 'react'
import '../css/style.css'

import '../css/MakeList.css'

import TagsBody from './TagsBody'

class ListPropertiesForm extends Component {
  constructor (props) {
    super(props)
  }

  inputTextHandler = (e) => {
    if (e.target.name === 'listName') {
      this.props.parent.setState({ inputTitle: e.currentTarget.value })
    } else if (e.target.name === 'description') {
      this.props.parent.setState({ inputDescription: e.currentTarget.value })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (e.target[0].name === 'tag') {
    } else if (this.props.parent.state.inputTitle.length !== 0) {
      this.props.parent.setState({ modalIsOpen: true })
    } else {
      this.props.parent.setState({ message: 'List title may not be empty' })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className='form-make-list'>
        <h6>List Name:</h6>
        <input
          type='text'
          name='listName'
          className='list-name mb-3'
          onChange={this.inputTextHandler}
          value={this.props.parent.state.inputTitle}
        />

        <h6>Description:</h6>
        <textarea
          name='description'
          onChange={this.inputTextHandler}
          className='text-area-make mb-3'
          value={this.props.parent.state.inputDescription}
        />
        <h6>Input Tags:</h6>
        <TagsBody grandParent={this.props.parent} />
        <input type='submit' className='btn make-submit-button' />
      </form>
    )
  }
}

export default ListPropertiesForm
