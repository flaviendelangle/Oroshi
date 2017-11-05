import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import NavigationLess from 'material-ui/svg-icons/navigation/expand-less'
import NavigationMore from 'material-ui/svg-icons/navigation/expand-more'

import Movie from '../../../Grid/components/Movie/'

import './style.css'

class Section extends Component {
  
  state = {
    full: false
  };
  
  getTitle = () => {
    return this.props.data.key.title || this.props.data.key.name;
  };
  
  getLink = () => {
    return '/' + this.props.field + '/' + this.props.data.key.pk;
  };
  
  showAll = () => {
    this.setState({full: !this.state.full});
  };
  
  renderContent = () => {
    let movies = this.props.data.movies;
    if(!this.state.full && movies.length > 7) {
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
      <div
        className={'stream-section ' + (this.state.full ? 'full': '')}
        data-amount={this.props.data.movies.length}
      >
        <div className="title">
          <Link to={this.getLink()}>
            {this.getTitle()}
          </Link>
          <IconButton onClick={this.showAll}>
            {this.state.full ? <NavigationLess/> : <NavigationMore/>}
          </IconButton>
        </div>
        <div className="content">
          {this.renderContent()}
        </div>
      </div>
    );
  }
  
}

export default Section;