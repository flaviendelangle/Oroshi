import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from './components/Poster';
import ElementOverlay from 'components/generics/ElementOverlay';
import Details from './components/Details';
import { pickElement } from 'services/languages';
import { addElement, removeElement } from 'services/actions/collections';

import './style.css'

class TVShow extends Component {
  
  state = {
    mouseOver: false,
    isAdding: false,
    isExtended: false
  };
  
  get title() {
    if (this.props.creationMode) {
      return this.props.data.name;
    }
    const language = this.props.collection.title_language;
    return pickElement(this.props.data, 'titles', 'title', language);
  }
  
  get posterPath() {
    if (this.props.creationMode) {
      return this.props.data.poster_path;
    }
    const language = this.props.collection.poster_language;
    return pickElement(this.props.data, 'posters', 'path', language);
  }
  
  get note() {
    if (this.props.creationMode) {
      return this.props.data.vote_average;
    }
    return this.props.data.note;
  }
  
  handleMouseHover = mouseOver => {
    this.setState({mouseOver})
  };
  
  save = () => {
    if (!this.state.isAdding) {
      this.props.create(this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  destroy = () => {
    const data = this.props.creationMode ? this.props.data.local : this.props.data;
    this.props.destroy(this.props.collection, data);
  };
  
  showMore = () => {
    this.setState({ isExtended: true });
  };
  
  showLess = () => {
    this.setState({ isExtended: false });
  };
  
  getParentClassName = () => {
    let className = '';
    if (this.props.data.already_in_collection) {
      className = 'already-in-collection';
    } else if (this.props.creationMode) {
      className = 'not-in-collection';
    }
    return className
  };
  
  render() {
    return (
      <div className={'tv-show-parent'}>
        <div className={'tv-show-container ' + this.getParentClassName()}>
          <div className="tv-show-frame">
            <Paper
              zDepth={3}
              className="tv-show"
              onMouseEnter={() => this.handleMouseHover(true)}
              onMouseLeave={() => this.handleMouseHover(false)}
            >
              <Poster path={this.posterPath} title={this.title} />
              <ElementOverlay
                note={this.note}
                mouseOver={this.state.mouseOver}
                creation_mode={this.props.creationMode}
                already_in_collection={this.props.data.already_in_collection}
                handleSave={this.save}
                handleDestroy={this.destroy}
                topRightAction={
                    <DetailsIcon
                      creationMode={this.props.creationMode}
                      handleClick={this.showMore}
                    />
                }
              />
            </Paper>
          </div>
          <Footer muiTheme={this.props.muiTheme} title={this.title} />
        </div>
        <DetailsFrame
          show={this.state.isExtended}
          title={this.title}
          data={this.props.data}
          onCollapse={this.showLess}
          collection={this.props.collection}
        />
      </div>
    );
  }
  
}

const DetailsIcon = ({ creationMode, handleClick }) => {
  if (creationMode) {
    return null;
  }
  return <NavigationExpandMore onClick={handleClick} />;
};

const DetailsFrame = ({ show, creationMode, ...props }) => {
  if (!creationMode && show) {
    return (
      <Details {...props} />
    );
  }
  return null;
};

const Footer = ({ muiTheme, title }) => (
  <div
    className="title"
    style={{color: muiTheme.palette.textColor}}
  >
    <div>{title}</div>
  </div>
);

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    create: data => dispatch(addElement('tv_shows', data)),
    destroy: (collection, data) => {
      dispatch(removeElement('tv_shows', collection, data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(TVShow));