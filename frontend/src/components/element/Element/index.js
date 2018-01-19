import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ContentAdd from 'material-ui/svg-icons/content/add';

import cx from 'classnames'

import Poster from '../Poster/index';
import Overlay from '../Overlay/index';
import date from 'services/content/date';

import './style.css'


class Element extends Component {
  
  state = {
    isMouseOver: false,
    isAdding: false,
    isReady: false
  };
  
  get release_date() {
    return date(this.props.data.getReleaseDate(), date.TMDB_FORMAT, date.YEAR_FORMAT);
  }
  
  getParentClasses = () => {
    const { data, creationMode } = this.props;
    const { isReady } = this.state;
    return cx({
      'movie-parent': true,
      'already-in-collection': (data.isInCollection() && creationMode),
      'not-in-collection': (!data.isInCollection() && creationMode),
      'ready': isReady,
    })
  };
  
  getAction = actionName => {
    const action = this.props[actionName];
    if(typeof action === 'string' || action instanceof String) {
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
  
  getActionComponent = action => {
    switch(action) {
      case 'suggestions':
        return Suggestions;
      default:
        return null;
    }
  };
  
  getTopRightAction = () => this.getAction('topRightAction');
  
  getTopLeftAction = () => this.getAction('topLeftAction');
  
  /**
   * Update state.mouseOver to decide if we want to generate the Overlay
   * @param {boolean} isMouseOver
   */
  onMouseHover = isMouseOver => {
    this.setState({ isMouseOver })
  };
  
  onPosterLoad = _ => {
    this.setState({ isReady: true });
  };
  
  onSave = () => {
    const { collection, data, onSave } = this.props;
    if(!this.state.isAdding) {
      onSave(collection, data);
    }
  };
  
  onDestroy = () => {
    const { collection, data, onDestroy } = this.props;
    onDestroy(collection, data);
  };
  
  /**
   * Check if we are in test mode
   */
  isTesting = _ => {
    return this.props.mode === 'test';
  };
  
  addToLayout = (key, element) => {
    const { layout } = this.state;
    /*this.setState(() => ({
      layout: {
        ...layout,
        [key]: {
          ...layout[key],
          element
        }
      },
    }));*/
  };
  
  /**
   * Switch the seen parameter of the movie
   */
  switchSeen = _ => {
    if (this.isTesting()) {
      return null;
    }
    this.props.switchSeen(this.props.data);
  };
  
  componentWillMount() {
    this.setState({
      layout: this.props.layout
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
        layout: this.state.layout
      });
    }
  }
  
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
            onMouseEnter={_ => this.onMouseHover(true)}
            onMouseLeave={_ => this.onMouseHover(false)}
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
              creation_mode={creationMode}
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

const Footer = ({ palette, footer, addToLayout }) => (
  <div
    className="title"
    style={{color: palette.textColor}}
  >
    {
      footer &&
      footer.map((line, index) => {
        if(line.link) {
          return (
            <Link
              key={index}
              to={line.link}
              target="_blank"
              ref={el => addToLayout(line.key, el)}
            >
              {line.value}
            </Link>
          );
        }
        return (
          <div ref={el => addToLayout(line.key, el)} key={index} >
            {line.value}
          </div>
        );
      })
    }
  </div>
);

const Suggestions = ({ creation_mode, collection, data, isPublic, type }) => {
  if (creation_mode || isPublic) {
    return null;
  }
  const url = `/collections/${type}/${collection.pk}/suggestions/${data.getPublicId()}/`;
  return (
    <Link to={url} >
      <ContentAdd/>
    </Link>
  );
};

export default muiThemeable()(Element);
