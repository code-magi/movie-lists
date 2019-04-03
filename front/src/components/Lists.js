import React, { Component } from 'react'
import '../css/style.css'
import { Redirect, Link } from 'react-router-dom'
import '../css/LoginSignup.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router'
import { FacebookShareButton, TwitterShareButton } from 'react-share'

import { getListsAction, editListAction } from '../actions/listActions'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uniqueTags: []
    }
  }

  componentDidMount() {
    // Fetch lists and dispatch them into Store
    this.props.getListsAction()
  }

  // NOTE: Task is setState when props changed.
  // Because we need update Tags only when lists changed.
  // For React it is NOT simple task. Look Memorization at the end of article
  // Simpler recommended solution: just take out Tags from lists when rendering. But here we solved that challenge :)
  // It's for future purpose. Imagine filtering is very expensive(big data or complex filtering algorithm). We need avoid it during each render.
  // getDerivedStateFromProps lifecycle method exists for only one purpose. It enables a component to update its internal state as the result of changes in props.
  // // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  static getDerivedStateFromProps(props, state) {
    const setDisplayedTags = () => {
      console.log('this.props.lists 39:', props.lists)
      if (props.lists !== undefined || Object.keys(props.lists).length > 0) {
        console.log('setDisplayedTags main body run')

        const getArrAllTags = lists => {
          // console.log('lists from getArrAllTags', lists)
          let ret = []
          lists.forEach(list => {
            // console.log('list', list)

            // console.log("specific list tags",list.tags.split(" ^^ "))
            let tagFromListArr = list.tags.split(' ^^ ')
            ret = ret.concat(tagFromListArr)
            // console.log('retAfter', ret)
          })
          // console.log('ret', ret)
          return ret
        }
        let ArrAllTags = getArrAllTags(props.lists)

        // console.log('ArrAllTags', ArrAllTags)
        let tagSet = new Set(ArrAllTags)
        // console.log('tagSet', tagSet)
        let uniqueTagsArr = Array.from(tagSet)
        // console.log('uniqueTagsArr', uniqueTagsArr)

        return uniqueTagsArr
        // this.setState({ uniqueTags: uniqueTagsArr })
      }
    }

    // Re-run the setDisplayedTags whenever the lists changed
    // Note we need to store prevPropsList to detect changes.
    if (props.lists !== state.prevPropsLists) {
      return {
        prevPropsLists: props.lists,
        uniqueTags: setDisplayedTags()
      }
    }
    return null
  }

  editList = list => {
    this.props.editListAction(list)
    this.props.history.push('./lists/editlist')
  }

  deleteList = listId => {
    console.log('listId', listId)
    console.log('fetch request /api/lists/delete')
    axios({
      method: 'delete',
      url: '/api/lists/id',
      data: { listId: listId },
      withCredentials: true
    }).then(response => {
      console.log('response', response)
      console.log('response.message', response.message)
      this.props.getListsAction()
    })
  }

  displayLists = () => {
    try {
      let listsArr = this.props.lists
      console.log('listsArr', listsArr)

      const createListElements = (elem, index) => {
        // console.log('elem', elem)
        // console.log('index', index)

        return (
          <li className="each-list" key={elem._id}>
            <Link to={'lists/' + elem._id}>
              <span className="title-lists">{elem.name}</span>
            </Link>
            <span className="lists-icons">
              <FacebookShareButton
                url={window.location.origin + '/lists/' + elem._id}
                className={'fab fa-facebook ml-1 mr-1 icon-lists'}
              />
              <TwitterShareButton
                url={window.location.origin + '/lists/' + elem._id}
                className={'fab fa-twitter-square ml-1 mr-1 icon-lists'}
              />
              <span
                name="edit"
                className="far fa-edit MouseOver ml-1 mr-1 icon-lists"
                onClick={() => {
                  // debugger
                  this.editList(elem)
                }}
              />
              <span
                name="delete"
                className="fas fa-trash-alt MouseOver ml-1 mr-1 icon-lists"
                onClick={() => this.deleteList(elem._id)}
              />
            </span>
          </li>
        )
      }
      if (!listsArr.length || listsArr === undefined) {
        return (
          <div>
            <h6>No Lists have been created yet</h6>
            <Link to="/lists/makelist">Create a List</Link>
          </div>
        )
      } else {
        // console.log('listsArr to be mapped', listsArr)
        return listsArr.map(createListElements)
      }
    } catch (err) {
      console.log('err on displayLists ', err)
    }
  }

  displayTags = () => {
    console.log('displayTags called')
    let renderDomElement = (elem, idx) => {
      return (
        <Link to={'./searchtags/' + elem} key={idx}>
          <span className="lists-tag ml-1 mr-1">
            {elem} <span className="fas fa-tag" />
          </span>
        </Link>
      )
    }
    return this.state.uniqueTags.map(renderDomElement)
  }

  // Moved to getDerivedStateFromProps
  // setDisplayedTags = () => {
  //   console.log('this.props.lists 144:', this.props.lists);
  //   if (this.props.lists!== undefined || Object.keys(this.props.lists).length > 0) {
  //     console.log('displaying all tags in the lists.....')
  //     // let getListTagsArr = list => {
  //     //   // console.log("specific list tags",list.tags.split(" ^^ "))
  //     //   return list.tags.split(' ^^ ')
  //     // }
  //     let getArrAllTags = lists => {
  //       console.log('lists from getArrAllTags', lists)
  //       let ret = []
  //       lists.forEach(list => {
  //         // console.log('list', list)

  //         // console.log("specific list tags",list.tags.split(" ^^ "))
  //         let tagFromListArr = list.tags.split(' ^^ ')
  //         ret = ret.concat(tagFromListArr)
  //         // console.log('retAfter', ret)
  //       })
  //       // console.log('ret', ret)
  //       return ret
  //     }
  //     let ArrAllTags = getArrAllTags(this.props.lists)
  //     console.log('ArrAllTags', ArrAllTags)
  //     let tagSet = new Set(ArrAllTags)
  //     console.log('tagSet', tagSet)
  //     let uniqueTagsArr = Array.from(tagSet)
  //     console.log('uniqueTagsArr', uniqueTagsArr)

  //     this.setState({ uniqueTags: uniqueTagsArr })
  //   }
  // }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/loginalert" />
    } else {
      return (
        <div className="container-fluid main-container-lists">
          <div className="container">
            <h2 className="text-center mb-3 mt-5">My Lists</h2>
            <div className="row">
              <ul className="col-md-8 lists-holder">{this.displayLists()}</ul>

              <div className="col-md-3 tags-holder-lists">
                <h4 className="text-center mb-4">My Tags</h4>
                {this.displayTags()}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

let mapStateToProps = state => {
  return {
    lists: state.lists.lists,
    loggedIn: state.user.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { getListsAction, editListAction }
)(withRouter(Lists))
