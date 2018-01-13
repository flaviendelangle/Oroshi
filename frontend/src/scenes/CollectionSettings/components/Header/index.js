import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AVMovie from 'material-ui/svg-icons/av/movie'
import muiThemeable from 'material-ui/styles/muiThemeable';

import HeaderOriginal from 'components/generics/Header';
import { getCollectionSettingsState } from 'containers/reducer';


class Header extends Component {
  
  get link() {
    const { scene, collection } = this.props;
    return `/collections/${scene}/${collection}/`;
  }
  
  render() {
    const { title, muiTheme: { palette } } = this.props;
    const style = { color: palette.alternateTextColor };
    return (
      <div>
        <DocumentTitle title={(`${title}- Settings`) || 'Loading...'}/>
        <HeaderOriginal title={title} showTitle={true}>
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
