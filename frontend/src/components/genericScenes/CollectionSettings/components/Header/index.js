import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AVMovie from 'material-ui/svg-icons/av/movie'
import muiThemeable from 'material-ui/styles/muiThemeable';

import HeaderOriginal from 'components/Header'
import { getCollectionSettingsState } from 'containers/reducer'


class Header extends Component {
  
  get link() {
    return '/collections/' + this.props.scene + '/' + this.props.collection + '/';
  }
  
  render() {
    const style = { color: this.props.muiTheme.palette.alternateTextColor };
    return (
      <div>
        <HeaderOriginal title={this.props.title}>
          <div className="menu">
            <Link to={this.link}>
              <AVMovie style={style}/>
              <div>Return to my collection</div>
            </Link>
          </div>
        </HeaderOriginal>
      </div>
    );
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene).header;
  return {
    collection: root.collection,
    title: root.title
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Header));
