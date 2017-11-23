import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Poster from './components/Poster';
import ElementOverlay from 'components/generics/ElementOverlay';
import Details from './components/Details';
import { addElement, removeElement } from 'services/actions/collections';

import './style.css'

class TVShow extends Component {
  
  state = {
    mouseOver: false,
    isAdding: false,
    isExtended: false
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
  
  handleMouseHover = mouseOver => {
    this.setState({mouseOver})
  };
  
  save = () => {
    if (!this.state.isAdding) {
      this.props.create(this.props.collection, this.props.data);
      this.setState({ isAdding: true });
    }
  };
  
  destroy = () => {
    this.props.destroy(this.props.collection, this.props.data);
  };
  
  showMore = () => {
    this.setState({ isExtended: true });
  };
  
  showLess = () => {
    this.setState({ isExtended: false });
  };
  
  getParentClassName = () => {
    let className = '';
    if (this.props.data.isInCollection()) {
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