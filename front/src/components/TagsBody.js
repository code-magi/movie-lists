import React, { Component } from 'react'
import '../css/style.css'

import '../css/MakeList.css'

class TagsBody extends Component {
  constructor(props) {
    super(props)
  }

  handleInputTag = evt => {
    // console.log('handleInputTag calls')

    // this adds constraints to input tags field. for example ^ cant be used and no more than 15 characters
    if (
      evt.target.value[evt.target.value.length - 1] === '^' ||
      evt.target.value.length >= 25
    ) {
      return
    }
    this.props.grandParent.setState({ inputTag: evt.key.value })
  }

  // adds tag
  handleEnterOnTagField = evt => {
    // console.log('handleEnterOnTagField called')
    evt.preventDefault()
    evt.stopPropagation()

    // Separate Enter from another input
    if (evt.keyCode === 13 || evt.which === 13) {
      // Run on Enter only

      // Check for 10 tags only. If more show msg
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
    } else {
      this.handleInputTag(evt)
    }
  }

  displayTags = () => {
    return this.props.grandParent.state.tags.map((elem, index) => {
      // Key should be unique and stable. Here we are more on stability side. Tag could NOT be unique by user enter. React will complain about. We can implement md5(elem), but it is unique like elem itself, so we just use elem
      return (
        <div className="tag" key={elem}>
          {elem}
          <span
            name={index}
            className="fas fa-tag ml-2"
            data-fa-transform="rotate-30"
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

  render() {
    // TODO: resolve this
    // We can't use <form> here - parent ListPropertiesForm also have <form>. React complains about nested forms in DOM. So we try to use onKeyUp which looses to onChange(onKeyPress and onKeyDown win from it). But it also loose to parent ListPropertiesFrom submit form.
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleInputTag}
            onKeyPress={this.handleEnterOnTagField}
            name="tag"
            value={this.props.grandParent.state.inputTag}
            autoComplete="off"
          />
          <div className="tags-holder">{this.displayTags()}</div>
        </form>
      </div>
    )
  }
}

export default TagsBody
