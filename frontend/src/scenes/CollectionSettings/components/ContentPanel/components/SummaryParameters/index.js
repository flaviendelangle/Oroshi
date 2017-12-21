import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import SocialShare from 'material-ui/svg-icons/social/share';

import DeleteAlert from './components/DeleteAlert';
import ShowPublicLinkAlert from './components/ShowPublicLinkAlert';
import ParametersSection, { Line } from '../ParametersSection';
import TextField from 'components/form/TextField';
import Toggle from 'components/form/Toggle';
import { getCollectionSettingsState } from 'containers/reducer';
import { update } from 'scenes/CollectionSettings/actions';
import { getCollectionTypeTitle } from 'services/utils';
import { destroy } from 'services/actions/collections';

const selectStyle = {
  position: 'absolute',
  top: -5,
  right: 50,
};

class SummaryParameters extends Component {
  
  state = {
    title: '',
    showDeleteAlert: false,
    showGetPublicLinkAlert: false
  };
  
  componentWillReceiveProps(newProps) {
    this.setState({ title: newProps.data.title });
  }
  
  render() {
    return (
      <div>
        <ParametersSection>
          <div className="title">Summary</div>
          <div className="content">
            <Line primaryText="Collection title">
              <TextField
                id="collection_title"
                value={this.state.title}
                onChange={(proxy, title) => this.setState({ title })}
                onSave={_ =>
                  this.props.update(this.props.data.pk, 'title', this.state.title)
                }
              />
            </Line>
            <Line primaryText="Collection type">
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
            </Line>
            <Line
              primaryText="Include adult content"
              rightToggle={
                <Toggle
                  toggled={this.props.data.adult_content}
                  onToggle={(proxy, active) => {
                    this.props.update(this.props.data.pk, 'adult_content', active)
                  }}
                />
              }
            />
            <Line
              primaryText="Public access to your collection"
              rightToggle={
                <Toggle
                  toggled={this.props.data.public}
                  onToggle={(proxy, active) => {
                    this.props.update(this.props.data.pk, 'public', active)
                  }}
                />
              }
            />
            <Line
              rightIcon={<SocialShare />}
              primaryText="Get your public link"
              onClick={_ => this.setState({ showGetPublicLinkAlert: true })}
            />
            <Line
              rightIcon={<ActionDeleteForever />}
              primaryText="Destroy this collection"
              onClick={_ => this.setState({ showDeleteAlert: true })}
            />
          </div>
        </ParametersSection>
        <DeleteAlert
          open={this.state.showDeleteAlert}
          onClose={_ => this.setState({ showDeleteAlert: false })}
          onDelete={_ => this.props.deleteCollection(this.props.data.pk)}
        />
        <ShowPublicLinkAlert
          open={this.state.showGetPublicLinkAlert}
          data={this.props.data}
          scene={this.props.scene}
          onClose={_ => this.setState({ showGetPublicLinkAlert: false })}
          onDelete={_ => {}} //this.props.deleteCollection(this.props.data.pk)}
        />
      </div>
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
    update: (pk, field, value) => dispatch(update(ownProps.scene, pk, field, value)),
    deleteCollection: pk => dispatch(destroy(ownProps.scene, pk))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryParameters);