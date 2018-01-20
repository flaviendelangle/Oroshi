import React, { Component } from 'react';
import PropTypes from 'prop-types';

import muiThemeable from 'material-ui/styles/muiThemeable';

import cx from 'classnames';

import Grade from 'components/generics/Grade/index';

import './style.css'


class ElementOverlay extends Component {
  static propTypes = {
    addToLayout: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    isPublic: PropTypes.bool.isRequired,
    alreadyInCollection: PropTypes.bool.isRequired, // RENAME
    creationMode: PropTypes.bool.isRequired, // RENAME
    note: PropTypes.number.isRequired,

    mode: PropTypes.string,
    topLeftAction: PropTypes.object,
    topRightAction: PropTypes.object,
  };

  state = {
    show: false,
    waiting: false,
  };

  componentWillReceiveProps(newProps) {
    if (newProps.mouseOver) {
      this.setState({ show: true, waiting: false });
    } else {
      this.setState({ waiting: true });
      this.timeout = setTimeout(() => {
        if (this.state.waiting) {
          this.setState({ show: false, waiting: false });
        }
      }, 300);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  isTesting = () => {
    return this.props.mode === 'test';
  };

  addToLayout = (key, element) => {
    if (this.props.addToLayout) {
      this.props.addToLayout(key, element);
    }
  };

  timeout = null;

  render() {
    const {
      topLeftAction,
      topRightAction,
      isPublic,
      note,
      creationMode,
      onSave,
      onDestroy,
      alreadyInCollection,
    } = this.props;
    const { show } = this.state;
    if (!show && !this.isTesting()) {
      return null;
    }
    const classes = cx({
      'element-overlay': true,
      testing: this.isTesting(),
    });
    return (
      <div className={classes} >
        <Grade
          className="grade"
          value={note}
          mouseOver={show}
          ref={el => this.addToLayout('grade', el)}
        />
        <TopLeftAction isPublic={isPublic} >
          {topLeftAction}
        </TopLeftAction>
        <TopRightAction isPublic={isPublic} >
          {topRightAction}
        </TopRightAction>
        <Footer
          creation_mode={creationMode}
          already_in_collection={alreadyInCollection}
          onSave={onSave}
          onDestroy={onDestroy}
          addToLayout={this.addToLayout}
          isPublic={isPublic}
        />
      </div>
    );
  }

}

const Footer = ({
  creationMode,
  alreadyInCollection,
  onSave,
  onDestroy,
  addToLayout,
  isPublic,
}) => {
  if (isPublic) {
    return null;
  }
  let Content;
  if (
    creationMode &&
    !alreadyInCollection
  ) {
    Content = (
      <div
        role="button"
        tabIndex={0}
        className="footer-content"
        onClick={onSave}
        style={{ background: 'rgba(76,175,80,0.8)' }}
        ref={el => addToLayout('add', el)}
      >
        ADD
      </div>
    );
  } else {
    Content = (
      <div
        role="button"
        tabIndex={0}
        className="footer-content"
        onClick={onDestroy}
        style={{background: 'rgba(244,67,54,0.8)'}}
        ref={el => addToLayout('add', el)}
      >
        REMOVE
      </div>
    );
  }
  return <div className="footer">{Content}</div>;
};

Footer.propTypes = {
  addToLayout: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  isPublic: PropTypes.bool.isRequired,
  alreadyInCollection: PropTypes.bool.isRequired, // RENAME
  creationMode: PropTypes.bool.isRequired, // RENAME
};

const TopLeftAction = ({
  children,
  isPublic,
}) => {
  const classes = cx({
    'top-left-icon': true,
    'public-action': isPublic,
    'private-action': !isPublic,
  });
  return (
    <div className={classes} >
      {children}
    </div>
  );
};

TopLeftAction.propTypes = {
  isPublic: PropTypes.bool,
  children: PropTypes.oneOf(PropTypes.object, PropTypes.array)
};

const TopRightAction = ({
  children,
  isPublic,
}) => {
  const classes = cx({
    'top-right-icon': true,
    'public-action': isPublic,
    'private-action': !isPublic,
  });
  return (
    <div className={classes} >
      {children}
    </div>
  );
};

TopRightAction.propTypes = {
  isPublic: PropTypes.bool,
  children: PropTypes.oneOf(PropTypes.object, PropTypes.array),
};

export default muiThemeable()(ElementOverlay);
