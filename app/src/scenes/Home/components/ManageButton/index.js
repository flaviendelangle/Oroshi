import React, { Component } from 'react'
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

const containerStyle = {
  textAlign: 'center',
  marginBottom: 20,
};


class ManageButton extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  getLabel = () => (this.props.editing ? 'Finished' : 'Manage');

  render() {
    const { onClick } = this.props;
    return (
      <div style={containerStyle} >
        <RaisedButton label={this.getLabel()} onClick={onClick} />
      </div>
    )
  }
}

export default ManageButton;
