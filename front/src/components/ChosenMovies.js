import React, { Component } from 'react'
import '../css/style.css'

import '../css/MakeList.css'
// import App from "../App.js";

class ChosenMovies extends Component {
  constructor (props) {
    super(props)
  }

  displayMovies = () => {
    // db 2019-03-20 commented. React warned Didn't use addSignVisibility
    // let addSignVisibility = "visible";
    // if (this.props.parent.state.chosenMovies.length < 1) {
    //   addSignVisibility = "hidden";
    // }

    // let imageAnimationStyle = { width: '60px', height: '90px' }
    // let showTrashIcon=()=>{
    //   imageAnimationStyle={width:"600px"}
    // }
    console.log('displaying movies')
    let moviesArr = this.props.parent.state.chosenMovies

    let movieDOMSArr = moviesArr.map((elem, index) => {
      return (
        <span
          className='each-chosen-movie-holder'
          onClick={() => this.removeMovie(elem, index)}
        >
          <img
            className='image-inside-list'
            src={'https://image.tmdb.org/t/p/w500' + elem.poster_path}
            // onClick={() => this.removeMovie(elem, index)}
            // onMouseOver={()=>{showTrashIcon()}}
            alt=''
          />
          <div className='middle'>
            <a href='#' className='icon-trash'>
              <i className='far fa-trash-alt' />
            </a>
          </div>
          {/* <div className="image-inside-list-title">{elem.original_title}</div> */}
        </span>
      )
    })
    return movieDOMSArr
  }

  removeMovie (elem, index) {
    console.log('removing Movie')
    console.log('elem', elem)
    console.log('index', index)
    let oldArr = this.props.parent.state.chosenMovies
    console.log('oldArr', oldArr)
    let newArr = oldArr.slice(0)
    newArr.splice(index, 1)
    console.log('newArr', newArr)
    this.props.parent.setState({ chosenMovies: newArr })
  }

  render () {
    return <div className='row row-bottom-make'>{this.displayMovies()}</div>
  }
}

export default ChosenMovies
