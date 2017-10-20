import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';

import Line from './components/Line'

const paperStyle = {
  height: 172,
  width: 'calc(100% - 215px)',
  position: 'absolute',
  padding: 10
};

class Details extends Component {
  
  renderContent = () => {
    if(this.props.data === null) {
      return (null)
    }
    return (
      <div>
        {this.renderDirectors()}
        {this.renderCast()}
      </div>
    )
  };
  
  renderDirectors = () => {
    let i = 0;
    const directors = this.props.data.credits.crew
      .filter(el => el.job === 'Director')
      .map(el => {
        return (
          <span key={el.id}>
            {i++ === 0 ? '' : ', '}
            <Link to={'/directors/' + el.id + '/'}>
              {el.name}
            </Link>
          </span>
        );
      });
    
    return (
      <Line>
        <span>Directed by </span>
        <span>{directors}</span>
      </Line>
    );
  };
  
  renderCast = () => {
    let i = 0;
    const actors = this.props.data.credits.cast
      .filter(el => el.order <= 3)
      .map(el => {
        return (
          <span key={el.id}>
            {i++ === 0 ? '' : ', '}
            <span style={{fontWeight: 'bold'}}>
              {el.name}
            </span>
          </span>
        );
      });
  
    return (
      <Line>
        <span>With </span>
        <span>{actors}</span>
      </Line>
    );
  };
  
  render() {
    return (
      <Paper style={paperStyle} zDepth={3}>
        {this.renderContent()}
      </Paper>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
    data: state.movie.details.data
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);