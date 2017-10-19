import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'

import { update } from './actions'

class SeenCheckbox extends Component {
  
  constructor(props) {
    super(props);
    this.onCheck = this.props.update;
  }
  
  
  render() {
    return (
      <Checkbox
        checked={this.props.data.seen}
        onCheck={() => this.onCheck(this.props.data, this.props.type)}
      />
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.moviesTable.movies
  }
};

const mapDispatchToProps = dispatch => {
  return {
    update: (data, type) => dispatch(update(data, type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeenCheckbox);
