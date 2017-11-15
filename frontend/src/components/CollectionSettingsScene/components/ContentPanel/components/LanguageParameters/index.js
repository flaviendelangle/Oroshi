import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParametersSection from '../ParametersSection';
import { getCollectionSettingsState } from 'containers/reducer';


class LanguageParameters extends Component {
  
  render() {
    return (
      <ParametersSection>
        <div className="title">Language Settings</div>
        <div className="content">
        </div>
      </ParametersSection>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene).main;
  return {
    collection: root.collection
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageParameters);