import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

import Movie from '../../../Grid/components/Movie/'

import './style.css'

class Section extends Component {
  
  getTitle = () => {
    return this.props.data.key.title || this.props.data.key.name;
  };
  
  getLink = () => {
    return '/collections/' + this.props.collection + '/' +
           this.props.field + '/' + this.props.data.key.pk;
  };
  
  renderContent = () => {
    let movies = this.props.data.movies;
    if(movies.length > 7) {
      movies = movies.slice(0,7);
    }
    
    return movies.map(movie => {
      return (
        <Movie
          data={movie}
          collection={this.props.collection}
          key={movie.pk}
        />
      )
    });
  };
  
  render() {
    return (
      <div className="stream-section">
        <div className="title">
          <Link to={this.getLink()}>
            {this.getTitle()}
          </Link>
        </div>
        <div className="content">
          {this.renderContent()}
        </div>
        <div className="see_more">
          <Link to={this.getLink()}>
            <NavigationMoreHoriz/>
          </Link>
        </div>
      </div>
    );
  }
  
}

export default Section;