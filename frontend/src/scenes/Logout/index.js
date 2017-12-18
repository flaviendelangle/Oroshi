import React, { Component } from 'react';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Progress from 'components/generics/Progress';
import { logout } from 'services/actions/users';


class Logout extends Component {
  
  componentDidMount() {
    this.props.logout().then(_ => {
      this.props.history.push('/login/');
    });
  }
  
  render() {
    return (
      <Progress message="Logging you out..." />
    );
  }
  
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logout: _ => dispatch(logout())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Logout));