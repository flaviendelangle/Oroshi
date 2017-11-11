import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCollectionState } from 'containers/reducer';
import { save } from './actions'

class Results extends Component {
  
  renderList = () => {
    return this.props.data.results.map(el => {
      const Element = this.props.elementComponent;
      return (
        <Element
          data={el}
          key={el.id}
          creationMode={true}
          onCreate={this.props.save}
        />
      )
    })
  };

  render() {
    if(this.props.data.results.length === 0) {
      return (null);
    }
    return (
      <div style={{textAlign: 'center'}}>
        {this.renderList()}
      </div>
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionState(state, ownProps.scene).dialogAddElement.results;
  return {
    data: root.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    save: data => dispatch(save(ownProps.scene, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);