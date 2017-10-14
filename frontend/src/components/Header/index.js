import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';

import MainDrawer from './components/MainDrawer/index'
import { showMainDrawer } from "./components/MainDrawer/actions";

class Header extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.openMainDrawer = props.openMainDrawer;
  }
  
  render() {
    return (
      <div>
        <AppBar
          title="Title"
          onLeftIconButtonTouchTap={() => this.openMainDrawer(true)}
        />
        <MainDrawer/>
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
    openMainDrawer: (show) => {
      dispatch(showMainDrawer(show));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);