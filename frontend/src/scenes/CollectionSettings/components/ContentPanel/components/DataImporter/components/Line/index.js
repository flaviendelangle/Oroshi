import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ListItem} from 'material-ui/List';
import ActionDone from 'material-ui/svg-icons/action/done'

class Line extends Component {

  renderIcon = () => {
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

const mapStateToProps = ({ settings: { dataImporter }}, state, { data }) => {
  return {
    done: !!dataImporter.created[data.tmdbId]
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Line);