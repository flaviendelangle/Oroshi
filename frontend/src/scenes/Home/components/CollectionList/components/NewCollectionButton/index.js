import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ContentAdd from 'material-ui/svg-icons/content/add';
import { showDialogCreateCollection } from '../../../DialogCreateCollection/actions';

import '../CollectionBox/style.css';


class NewCollectionButton extends Component {
  
  handleClick = () => {
    const { editing, newCollection } = this.props;
    if (editing)
      newCollection();
  };
  
  render(forced=false) {
    if (!forced) {
      window.setTimeout(() => this.render(true), 300);
    }
    const { editing, muiTheme: { palette }} = this.props;
    return (
      <Link to='/'>
        <div className={'collection-box ' + (editing ? '' : 'invisible')} onClick={this.handleClick} >
          <div className="collection-icon">
            <div className="collection-editing-mask" >
              <ContentAdd color={palette.primary1Color} className="editing-icon big" />
            </div>
            <div className="fake-img-new-collection">
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      newCollection: () => dispatch(showDialogCreateCollection(true))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(NewCollectionButton));