import React, { Component } from 'react'
import { connect } from 'react-redux'

import Identicon from '../../../../../../../../components/Identicon'

class IdenticonField extends Component {
  
  componentDidUpdate() {
    this.props.input.onChange(this.props.string);
  }
  
  render() {
    return (
      <Identicon string={this.props.string} size={this.props.size} />

    );
  }
}

const mapStateToProps = state => {
  return {
    string: state.home.dialogCreateCollection.form.identiconField.string
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdenticonField);
