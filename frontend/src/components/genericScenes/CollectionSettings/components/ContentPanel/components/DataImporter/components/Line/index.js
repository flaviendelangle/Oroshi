import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ListItem} from 'material-ui/List';
import ActionDone from 'material-ui/svg-icons/action/done'

import { getCollectionSettingsState } from 'containers/reducer';

class Line extends Component {

  renderIcon = _ => {
    if (this.props.done) {
      return <ActionDone/>;
    }
    return (null);
  };
  
  render() {
    return (
      <ListItem
        primaryText={this.props.data.title}
        rightIcon={this.renderIcon()}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene);
  return {
    done: !!root.dataImporter.created[ownProps.data.tmdbId]
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Line);