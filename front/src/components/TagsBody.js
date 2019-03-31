
import React, { Component } from 'react'
import '../css/style.css'

import '../css/MakeList.css'

class TagsBody extends Component {
  constructor (props) {
    super(props)
  }

  handleInputTag = (evt) => {
    // this adds constraints to input tags field. for example ^ cant be used and no more than 15 characters
    if (
      evt.target.value[evt.target.value.length - 1] === '^' ||
      evt.target.value.length >= 25
    ) {
      return
    }
    this.props.grandParent.setState({ inputTag: evt.currentTarget.value })
  }

  // adds tag
  handleSubmit = (evt) => {
    evt.preventDefault()
    if (this.props.grandParent.state.inputTag.trim().length) {
      console.log('adding tag', this.props.grandParent.state.inputTag)
      if (this.props.grandParent.state.tags.length <= 10) {
        this.props.grandParent.setState({
          tags: this.props.grandParent.state.tags.concat(
            this.props.grandParent.state.inputTag
          ),
          inputTag: '',
          message: ''
        })
      } else {
        this.props.grandParent.setState({
          message: 'Lists can only have a maximum of 10 tags'
        })
      }
    }
  }

  displayTags = () => {
    return this.props.grandParent.state.tags.map((elem, index) => {
      return (
        <div className='tag'>
          {elem}
          <span
            name={index}
            className='fas fa-tag ml-2'
            data-fa-transform='rotate-30'
            onClick={evt => {
              console.log('evt', evt)
              console.log('i just clicked on a tag')
              let oldTagArr = this.props.grandParent.state.tags.slice(0)
              console.log('oldTagArr', oldTagArr)
              let newTagArr = oldTagArr.slice(0)
              newTagArr.splice(index, 1)
              console.log('newTagArr', newTagArr)
              this.props.grandParent.setState({ tags: newTagArr })
            }}
          />
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            onChange={this.handleInputTag}
            name='tag'
            value={this.props.grandParent.state.inputTag}
            autoComplete='off'
          />
          <div className='tags-holder'>{this.displayTags()}</div>
        </form>
      </div>
    )
  }
}

export default TagsBody
