import React, { Component } from 'react'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';

import { date } from 'services/utils';

const containerStyle = {
  marginBottom: 20,
  fontSize: '2em',
  
};

const ratingStyle = {
  fontSize: 25
};

const titleStyle = {
  display: 'inline-block',
  maxWidth: 'calc(100% - 150px)',
  whiteSpace: 'nowrap',
  verticalAlign: 'top',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const yearStyle = {
  display: 'inline-block'
};

class Title extends Component {
  
  renderTitle = () => {
    if (this.props.title) {
      const release = date(this.props.release, date.TMDB_FORMAT, date.YEAR_FORMAT);
      return (
        <div>
          <div style={titleStyle}>{this.props.title}</div>
          <div style={yearStyle}>{' - ' + release }</div>
        </div>
      );
    } else {
      return (
        <div style={{height: 37}}>
        </div>
      );
    }
  };
  
  renderRating = () => {
    return (
      <div style={ratingStyle}>
        <StarRatingComponent
          name="Move Rate"
          starCount={10}
          value={this.props.note}
          editing={false}
        />
      </div>
    );
  };
  
  render() {
    return (
      <div style={containerStyle}>
        {this.renderTitle()}
        {this.renderRating()}
    </div>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
    release: state.movie.title.release,
    title: state.movie.title.title,
    note: state.movie.title.note
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title);