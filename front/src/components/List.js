import React, { Component } from 'react'
import '../css/style.css'
import { Link } from 'react-router-dom'
import '../css/LoginSignup.css'
import { connect } from 'react-redux'
import axios from 'axios'
// import App from '../App.js'
// import Modal from 'react-modal'
import { withRouter } from 'react-router'
import { FacebookShareButton, TwitterShareButton } from 'react-share'

class List extends Component {
  constructor (props) {
    super(props)
    this.state = { list: [] }
  }

  componentDidMount () {
    console.log('getting item id')
    let path = window.location.pathname
    console.log('path', path)
    let pathArr = path.split('/')
    console.log('pathArr', pathArr)
    let listId = pathArr[pathArr.length - 1]
    console.log('listId', listId)
    this.setState({ listId: listId })
    console.log('Fetching from endpoint lists/id')
    axios({
      method: 'post',
      url: '/api/lists/id',
      data: { listId: listId },
      withCredentials: 'include'
    }).then(response => {
      console.log('response', response)
      this.setState({ list: response.data.list })
    })
  }
  // editList(list){
  //   this.props.dispatch({type:"editList",payload:list})
  //   this.props.history.push("./editlist")
  // }
  // deleteList(listId) {
  //   console.log('listId', listId)
  //   console.log('fetch request /api/lists/delete')
  //   axios({
  //     method: 'delete',
  //     url: '/api/lists/id',
  //     data: { listId: listId },
  //     withCredentials: true
  //   }).then(response => {
  //     console.log('response', response)
  //     console.log('response.message', response.message)
  //     this.fetchList()
  //   })
  // }
  // fetchList() {
  //   console.log('fetched to get list')
  //   console.log('url: /api/lists')
  //   axios({
  //     method: 'get',
  //     url: '/api/lists',
  //     withCredentials: true
  //   }).then(response => {
  //     console.log('response', response)
  //     let responseLists = response.data.lists
  //     console.log('responseLists', responseLists)
  //     this.props.dispatch({ type: 'getLists', payload: responseLists })
  //     this.props.history.push("./")
  //   })
  // }

  editList = (list) => {
    this.props.dispatch({ type: 'editList', payload: list })
    this.props.history.push('./editlist')
  }

  deleteList = (listId) => {
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
      this.fetchList()
    })
  }

  fetchList = () => {
    console.log('fetched to get list')
    console.log('url: /api/lists')
    axios({
      method: 'get',
      url: '/api/lists',
      withCredentials: true
    }).then(response => {
      console.log('response', response)
      let responseLists = response.data.lists
      console.log('responseLists', responseLists)
      this.props.dispatch({ type: 'getLists', payload: responseLists })
      this.props.history.push('./')
    })
  }

  // elem is list object
  ownerTools = (elem) => {
    if (elem.userId === this.props.userId) {
      return (
        <React.Fragment>
          <span
            name='edit'
            className='far fa-edit ml-1 mr-1 icon-list '
            onClick={() => {
              this.editList(elem)
            }}
          />
          <span
            name='delete'
            className='fas fa-trash-alt ml-1 mr-1 icon-list'
            onClick={() => this.deleteList(elem._id)}
          />
        </React.Fragment>
      )
    }
  }

  displayList = () => {
    try {
      console.log('movie array', this.state.list.movieArr)
      if (
        this.state.list.movieArr === undefined ||
        this.state.list.movieArr.length === 0
      ) {
        return <h4>There is no list to be displayed</h4>
      } else {
        return (
          <div className='container-fluid main-container-list'>
            <div className='container'>
              <div className='title-social-list'>
                <h3>List: {this.state.list.name}</h3>
                <span className='list-icons'>
                  <FacebookShareButton
                    url={window.location.href}
                    className={'fab fa-facebook ml-1 mr-1 icon-list'}
                  />
                  <TwitterShareButton
                    url={window.location.href}
                    className={'fab fa-twitter-square ml-1 mr-1 icon-list'}
                  />
                  {this.ownerTools(this.state.list)}
                </span>
              </div>
              <ol className='single-list-holder'>
                {this.state.list.movieArr.map(function (elem) {
                  return (
                    <div>
                      <li className='list-item'>
                        <img
                          src={
                            'https://image.tmdb.org/t/p/w500' + elem.poster_path
                          }
                          style={{ maxHeight: '50px' }}
                          alt=''
                        />
                        <Link to={'/movie/' + elem.id}>
                          <span className='title-list'>
                            {elem.original_title}
                          </span>
                        </Link>
                      </li>
                    </div>
                  )
                })}
              </ol>
            </div>
            {/* <div>
            <h4>List:{this.state.list.name}</h4>
            <FacebookShareButton url={window.location.href} className={"fab fa-facebook"}></FacebookShareButton>
            <TwitterShareButton url={window.location.href} className={"fab fa-twitter-square"}></TwitterShareButton>
            {this.ownerTools(this.state.list)}
            <ol>
              {this.state.list.movieArr.map(function(elem) {
                return (
                <div>

                <Link to={"/movie/"+elem.id}><li style={{margin:"10px"}}><img src={"https://image.tmdb.org/t/p/w500" + elem.poster_path} style={{maxHeight:"50px"}}></img>{elem.original_title}</li></Link>
                </div>
                )
              })}
            </ol> */}
          </div>
        )
      }
    } catch (err) { console.log('err from List', err) }
  }
  render () {
    console.log('rendered component list for id', this.listId)
    console.log('ListId', this.props.listId)
    return <div>{this.displayList()}</div>
  }
}

let mapStateToProps = (state) => {
  return { userId: state.user.userId }
}

export default connect(mapStateToProps)(withRouter(List))
