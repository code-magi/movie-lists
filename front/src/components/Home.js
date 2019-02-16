import React, { Component } from 'react'
import '../css/style.css'
import { Link } from 'react-router-dom'
import BannerOne from '../media/images/main-poster-pikachu.jpg'
import BannerTwo from '../media/images/main-poster-shazam.jpg'
import BannerThree from '../media/images/main-poster-dumbo.jpg'

class Home extends Component {
  render() {
    return (
      <div className="bg-light">
        <div className="container-fluid top-main">
          <h1 className="top-main-header">Your Movie Lists</h1>
          <p className="top-main-text">
            Search for movies. Make lists. Share with friends.
          </p>
          <Link to="/list">
            <button className="btn btn-lg btn-color-main">Get Started</button>
          </Link>
          <div />
        </div>

        <div className="container-fluid second-main">
          <div className="row row-main-page">
            <div className="col-md-3 text-center p-2 three-images">
              <img
                className="d-block"
                src="https://via.placeholder.com/200X200"
                alt=""
              />
              <p>Number 1</p>
            </div>
            <div className="col-md-3 text-center p-2 three-images">
              <img
                className="d-block"
                src="https://via.placeholder.com/200X200"
                alt=""
              />
              <p>Number 2</p>
            </div>
            <div className="col-md-3 text-center p-2 three-images">
              <img
                className="d-block"
                src="https://via.placeholder.com/200X200"
                alt=""
              />
              <p>Number 3</p>
            </div>
          </div>
        </div>

        <div className="container-fluid third-main">
          <h1 className="carousel-header">Upcoming Movies</h1>
          <div
            id="carouselControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner mx-auto">
              <div className="carousel-item active">
                <a href="https://www.imdb.com/title/tt5884052/?ref_=fn_al_tt_1">
                  <img className="d-block" src={BannerOne} alt="First slide" />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.imdb.com/title/tt0448115/?ref_=nv_sr_1">
                  <img
                    className="d-block image-two"
                    src={BannerTwo}
                    alt="Second slide"
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a href="https://www.imdb.com/title/tt3861390/?ref_=fn_al_tt_1">
                  <img
                    className="d-block"
                    src={BannerThree}
                    alt="Third slide"
                  />
                </a>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselControls"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="container-fluid bg-dark">
          <div />
        </div>
      </div>
    )
  }
}

export default Home