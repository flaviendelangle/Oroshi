import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ParametersSection from '../ParametersSection';
import TextField from '../TextField';
import { getCollectionSettingsState } from 'containers/reducer';
import { update } from 'components/genericScenes/CollectionSettings/actions';
import { getCollectionTypeTitle } from 'services/utils';

const selectStyle = {
  position: 'absolute',
  top: -5,
  right: 20,
};

class SummaryParameters extends Component {
  
  state = {
    title: ''
  };
  
  componentWillReceiveProps(newProps) {
    this.setState({ title: newProps.data.title });
  }
  
  render() {
    return (
      <ParametersSection>
        <div className="title">Summary</div>
        <div className="content">
          <div primaryText="Collection title">
            <TextField
              id="collection_title"
              value={this.state.title}
              onChange={(proxy, title) => this.setState({ title })}
              onSave={() =>
                this.props.update(this.props.data.pk, 'title', this.state.title)
              }
            />
          </div>
          <div primaryText="Collection type">
            <SelectField
              value="0"
              disabled={true}
              style={selectStyle}
            >
              <MenuItem
                value="0"
                primaryText={getCollectionTypeTitle(this.props.scene)}
              />
            </SelectField>
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