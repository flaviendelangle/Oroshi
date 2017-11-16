import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';

import ParametersSection from '../ParametersSection';
import TextField from '../TextField';
import { getCollectionSettingsState } from 'containers/reducer';
import { update } from 'components/genericScenes/CollectionSettings/actions';


class SummaryParameters extends Component {
  
  render() {
    return (
      <ParametersSection>
        <div className="title">Summary</div>
        <div className="content">
          <div primaryText="Collection title">
            <TextField
              id="collection_title"
              value={this.props.title}
            />
          </div>
          <div
            primaryText="Include adult content"
            rightToggle={
              <Toggle
                toggled={this.props.data.adult_content}
                onToggle={(proxy, active) => {
                  this.props.update(this.props.data.pk, 'adult_content', active)
                }}
              />
            }
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
    data: root.data
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update: (pk, field, value) => dispatch(update(ownProps.scene, pk, field, value))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryParameters);