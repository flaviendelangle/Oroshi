import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { path } from '../../../../services/TheMovieDatabaseJS/images'

import './style.css'

const containerStyle = {
  margin: '0 auto',
  padding: 40,
  width: '80%',
  maxWidth: 1200,
  color: '#333',
};

const titleStyle = {
  fontSize: '2em',
  textAlign: 'left',
  margin: '25px 0px'
};

const movieStyle = {
};

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true
      }
    },{
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },{
      breakpoint: 975,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },{
      breakpoint: 710,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },{
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

class Recommendations extends Component {
  
  url = (poster) => {
    return path + '/w185' + poster;
  };
  
  renderRecommendations = () => {
    if(!this.props.movies.results) {
      return (null);
    }
    return this.props.movies.results.map(el => {
      return (
        <div style={movieStyle} key={el.id}>
          <img src={this.url(el.backdrop_path)}  alt="Poster"/>
        </div>
      );
    });
  };
  
  render() {
    return (
      <div style={containerStyle}>
        <div style={titleStyle}>Recommendations :</div>
        <Slider {...settings}>
          {this.renderRecommendations()}
        </Slider>
      </div>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
    movies: state.movie.recommendations.movies
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations);