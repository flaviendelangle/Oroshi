import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import muiThemeable from 'material-ui/styles/muiThemeable';
import ContentAdd from 'material-ui/svg-icons/content/add';

import cx from 'classnames';

import { showDialogCreateCollection } from '../../../DialogCreateCollection/actions';
import '../CollectionBox/style.css';


class NewCollectionButton extends Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    newCollection: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired,
  };

  onClick = () => {
    const { editing, newCollection } = this.props;
    if (editing) {
      newCollection();
    }
  };

  render(forced = false) {
    if (!forced) {
      window.setTimeout(() => this.render(true), 300);
    }
    const { editing, muiTheme: { palette } } = this.props;
    const boxClasses = cx({
      'collection-box': true,
      invisible: !editing,
    });
    return (
      <Link to="/">
        <div
          role="button"
          tabIndex={0}
          className={boxClasses}
          onClick={this.onClick}
        >
          <div className="collection-icon">
            <div className="collection-editing-mask" >
              <ContentAdd color={palette.primary1Color} className="editing-icon big" />
            </div>
            <div className="fake-img-new-collection" />
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  newCollection: () => dispatch(showDialogCreateCollection(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(NewCollectionButton));
