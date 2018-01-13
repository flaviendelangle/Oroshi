import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from 'components/generics/Poster/index';
import ElementOverlay from 'components/generics/ElementOverlay/index';
import Details from './components/Details/index';
import { addElement, removeElement } from 'services/actions/collections/index';

import './style.css'

/** Class representing a tv-show frame, used mainly in the layouts (Grid + Stream) */
class TVShow extends Component {
  
  state = {
    isMouseOver: false,
    isAdding: false,
    isExtended: false,
    isReady: false
  };
  
  get parentClassName() {
    const { data, creationMode } = this.props;
    const { isReady } = this.props;
    let className = '';
    if (data.isInCollection()) {
      className = ' already-in-collection';
    } else if (creationMode) {
      className = ' not-in-collection';
    }
    if (isReady) {
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
  
  handlePosterLoad = _ => {
    this.setState({ isReady: true });
  };
  
  /**
   * Add the movie to the collection
   */
  save = _ => {
    const { collection, data, create } = this.props;
    const { isAdding } = this.state;
    if (!isAdding) {
      create(collection, data);
      this.setState({ isAdding: true });
    }
  };
  
  /**
   * Remove the movie from the collection
   */
  destroy = _ => {
    const { destroy, collection, data } = this.props;
    destroy(collection, data);
  };
  
  /**
   * Launch the Details modal
   */
  showMore = _ => {
    this.setState({ isExtended: true });
  };
  
  /**
   * Hide the Details modal
   */
  showLess = _ => {
    this.setState({ isExtended: false });
  };
  
  render() {
    const { creationMode, collection, data, muiTheme: { palette }} = this.props;
    const { isMouseOver, isExtended } = this.state;
    return (
      <div className={'tv-show-parent' + this.parentClassName}>
        <div className={'tv-show-container '}>
          <div className="tv-show-frame">
            <Paper
              zDepth={3}
              className="tv-show"
              onMouseEnter={_ => this.handleMouseHover(true)}
              onMouseLeave={_ => setTimeout(_ => this.handleMouseHover(false), 300)}
            >
              <Poster
                path={data.getPosterPath()}
                title={data.getTitle()}
                onLoad={this.handlePosterLoad}
              />
              <ElementOverlay
                note={this.note}
                mouseOver={isMouseOver}
                creation_mode={creationMode}
                already_in_collection={data.isInCollection()}
                handleSave={this.save}
                handleDestroy={this.destroy}
                topRightAction={
                  <DetailsIcon
                    creationMode={creationMode}
                    handleClick={this.showMore}
                  />
                }
              />
            </Paper>
          </div>
          <Footer palette={palette} title={data.getTitle()} />
        </div>
        <DetailsFrame
          show={isExtended}
          title={data.getTitle()}
          data={data}
          onCollapse={this.showLess}
          collection={collection}
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

const Footer = ({ palette, title }) => (
  <div
    className="title"
    style={{color: palette.textColor}}
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