import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from 'components/generics/Poster';
import ElementOverlay from 'components/generics/ElementOverlay';
import Details from './components/Details';
import { addElement, removeElement } from 'services/actions/collections';

import './style.css'

/** Class representing a tv-show frame, used mainly in the layouts (Grid + Stream) */
class TVShow extends Component {
  
  state = {
    isMouseOver: false,
    isAdding: false,
    isExtended: false,
    isReady: false
  };
  
  get title() {
    return this.props.data.getTitle();
  }
  
  get posterPath() {
    return this.props.data.getPosterPath();
  }
  
  get note() {
    return this.props.data.getNote();
  }
  
  get parentClassName() {
    let className = '';
    if (this.props.data.isInCollection()) {
      className = ' already-in-collection';
    } else if (this.props.creationMode) {
      className = ' not-in-collection';
    }
    if(this.state.isReady) {
      className += ' ready';
    }
    return className
  }
  
  /**
   * Update state.mouseOver to decide if we want to generate the Overlay
   * @param {boolean} isMouseOver
   */
  handleMouseHover = isMouseOver => {
    this.setState({ isMouseOver })
  };
  
  handlePosterLoad = () => {
    this.setState({ isReady: true });
  };
  
  /**
   * Add the movie to the collection
   */
  save = () => {
    if (!this.state.isAdding) {
      this.props.create(this.props.collection, this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  /**
   * Remove the movie from the collection
   */
  destroy = () => {
    this.props.destroy(this.props.collection, this.props.data);
  };
  
  /**
   * Launch the Details modal
   */
  showMore = () => {
    this.setState({ isExtended: true });
  };
  
  /**
   * Hide the Details modal
   */
  showLess = () => {
    this.setState({ isExtended: false });
  };
  
  render() {
    return (
      <div className={'tv-show-parent' + this.parentClassName}>
        <div className={'tv-show-container '}>
          <div className="tv-show-frame">
            <Paper
              zDepth={3}
              className="tv-show"
              onMouseEnter={() => this.handleMouseHover(true)}
              onMouseLeave={() => setTimeout(() => this.handleMouseHover(false), 300)}
            >
              <Poster
                path={this.posterPath}
                title={this.title}
                onLoad={this.handlePosterLoad}
              />
              <ElementOverlay
                note={this.note}
                mouseOver={this.state.isMouseOver}
                creation_mode={this.props.creationMode}
                already_in_collection={this.props.data.isInCollection()}
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

const DetailsFrame = ({ creationMode, ...props }) => {
  if (!creationMode) {
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
    create: (collection, element) => {
      dispatch(addElement('tv_shows', collection, element));
    },
    destroy: (collection, data) => {
      dispatch(removeElement('tv_shows', collection, data))
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(TVShow));