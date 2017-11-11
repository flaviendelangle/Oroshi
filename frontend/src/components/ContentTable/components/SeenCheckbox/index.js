import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'

import { getCollectionState } from 'containers/reducer';
import { update } from './actions'

class SeenCheckbox extends Component {
  
  render() {
    return (
      <Checkbox
        checked={this.props.data.seen}
        onCheck={() => this.props.update(this.props.data)}
      />
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionState(state, ownProps.scene).main;
  return {
    movies: root.content
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update: data => {
      dispatch(update(ownProps.scene, data))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeenCheckbox);
