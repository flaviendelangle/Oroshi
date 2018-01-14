import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import BackSpace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Header extends Component {
  
  get link() {
    const { type, collection } = this.props;
    return `/collections/${type}/${collection.pk}/`;
  }
  
  render() {
    const { muiTheme: { palette }} = this.props;
    return (
      <div>
        <AppBar
          title={ this.props.showTitle ? this.props.title : ''}
          onLeftIconButtonTouchTap={_ => this.props.openMainDrawer(true)}
          showMenuIconButton={!this.props.isPublic}
          iconElementLeft={
            <Link to={this.link}>
              <IconButton
                tooltip="Return to collection"
                iconStyle={{ color: palette.alternateTextColor }}
              >
                <BackSpace />
              </IconButton>
            </Link>
          }
        >
        </AppBar>
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Header));