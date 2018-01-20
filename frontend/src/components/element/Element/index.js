import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';

import cx from 'classnames'

import Poster from '../Poster/index';
import Overlay from '../Overlay/index';
import Suggestions from './components/Suggestions';

import './style.css'


class Element extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    creationMode: PropTypes.bool.isRequired, // RENAME
    layout: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    switchSeen: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired,
    onRender: PropTypes.func,
    mode: PropTypes.string,
    style: PropTypes.object,
    isPublic: PropTypes.bool,
    footer: PropTypes.array,
  };

  state = {
    isMouseOver: false,
    isAdding: false,
    isReady: false,
  };

  componentWillMount() {
    this.setState({
      layout: this.props.layout,
    });
  }

  componentWillReceiveProps(newProps) {
    const { data } = this.props;
    if (data.isInCollection() !== newProps.data.isInCollection()) {
      this.setState({ isAdding: false });
    }
  }

  componentDidUpdate() {
    const { onRender } = this.props;
    if (onRender) {
      onRender({
        layout: this.state.layout,
      });
    }
  }

  /**
   * Update state.mouseOver to decide if we want to generate the Overlay
   * @param {boolean} isMouseOver
   */
  onMouseHover = (isMouseOver) => {
    this.setState({ isMouseOver })
  };

  onPosterLoad = () => {
    this.setState({ isReady: true });
  };

  onSave = () => {
    const { collection, data, onSave } = this.props;
    if (!this.state.isAdding) {
      onSave(collection, data);
    }
  };

  onDestroy = () => {
    const { collection, data, onDestroy } = this.props;
    onDestroy(collection, data);
  };

  getParentClasses = () => {
    const { data, creationMode } = this.props;
    const { isReady } = this.state;
    return cx({
      'movie-parent': true,
      'already-in-collection': (data.isInCollection() && creationMode),
      'not-in-collection': (!data.isInCollection() && creationMode),
      ready: isReady,
    })
  };

  getAction = (actionName) => {
    const action = this.props[actionName];
    if (typeof action === 'string' || action instanceof String) {
      const ActionComponent = this.getActionComponent(action);
      return (
        <span ref={el => this.addToLayout(action, el)} >
          <ActionComponent {...this.props} />
        </span>
      )
    }
    return (
      <span ref={el => this.addToLayout(this.props[`${actionName}Key`], el)} >
        {action}
      </span>
    );
  };

  getActionComponent = (action) => {
    switch (action) {
      case 'suggestions':
        return Suggestions;
      default:
        return null;
    }
  };

  getTopRightAction = () => this.getAction('topRightAction');

  getTopLeftAction = () => this.getAction('topLeftAction');

  /**
   * Check if we are in test mode
   */
  isTesting = () => this.props.mode === 'test';

  addToLayout = (/* key, element */) => {
    // const { layout } = this.state;
    /*
    this.setState(() => ({
      layout: {
        ...layout,
        [key]: {
          ...layout[key],
          element
        }
      },
    }));
    */
  };

  /**
   * Switch the seen parameter of the movie
   */
  switchSeen = () => {
    const { data, switchSeen } = this.props;
    if (this.isTesting()) {
      return null;
    }
    return switchSeen(data);
  };

  render() {
    const {
      style,
      creationMode,
      isPublic,
      mode,
      data,
      footer,
      muiTheme: { palette },
    } = this.props;
    const { isMouseOver } = this.state;
    return (
      <div className={this.getParentClasses()} style={style} >
        <div className="movie-container">
          <Paper
            zDepth={3}
            className="movie"
            onMouseEnter={() => this.onMouseHover(true)}
            onMouseLeave={() => this.onMouseHover(false)}
          >
            <Poster
              path={data.getPosterPath()}
              title={data.getTitle()}
              onLoad={this.onPosterLoad}
            />
            <Overlay
              mode={mode}
              addToLayout={this.addToLayout}
              note={data.getNote()}
              mouseOver={isMouseOver}
              creationMode={creationMode}
              already_in_collection={data.isInCollection()}
              onSave={this.onSave}
              onDestroy={this.onDestroy}
              isPublic={isPublic}
              topRightAction={this.getTopRightAction()}
              topLeftAction={this.getTopLeftAction()}
            />
          </Paper>
        </div>
        <Footer
          palette={palette}
          footer={footer}
          addToLayout={this.addToLayout}
        />
      </div>
    );
  }
}

const Footer = ({
  palette,
  footer,
  addToLayout,
}) => (
  <div
    className="title"
    style={{color: palette.textColor}}
  >
    {
      footer &&
      footer.map((line) => {
        if (line.link) {
          return (
            <Link
              key={1}
              to={line.link}
              target="_blank"
              ref={el => addToLayout(line.key, el)}
            >
              {line.value}
            </Link>
          );
        }
        return (
          <div ref={(el) => addToLayout(line.key, el)} key={1} >
            {line.value}
          </div>
        );
      })
    }
  </div>
);

Footer.propTypes = {
  palette: PropTypes.object.isRequired,
  addToLayout: PropTypes.func.isRequired,
  footer: PropTypes.array,
};

export default muiThemeable()(Element);
