import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

import ParametersSection from '../ParametersSection';
import { getCollectionSettingsState } from 'containers/reducer';

const textFieldStyle = {
  position: 'absolute',
  top: -5,
  right: 10,
};

const inputStyle = {
  textAlign: 'right'
};

class SummaryParameters extends Component {
  
  render() {
    return (
      <ParametersSection>
        <div className="title">Summary</div>
        <div className="content">
          <div primaryText="Collection title">
            <TextField
              id="collection_title"
              style={textFieldStyle}
              value={this.props.title}
              inputStyle={inputStyle}
            />
          </div>
          <div
            primaryText="Include adult content"
            rightToggle={<Toggle />}
          >
          </div>
        </div>
      </ParametersSection>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene).main;
  return {
    collection: root.collection,
    title: root.title
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryParameters);