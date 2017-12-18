import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar';

import IconButton from 'material-ui/IconButton';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

import ElementLine, { groupByLine } from 'components/generics/ElementLine/index';

import * as _style from './style';
import './style.css'


const CONFIG = {
  pageLength: 4,
};

/**
 * Class representing the Grid layout
 * This layout show the elements as a responsive grid with CONFIG.pageLength lines
 */
class Grid extends Component {
  
  state = {
    pages: 1
  };
  
  get amountToShow() {
    const perLine = this.props.lineDimensions.elementsPerLine;
    return CONFIG.pageLength * perLine * this.state.pages;
  };
  
  get elements() {
    let elements = this.props.data.results;
    if (elements.length > this.amountToShow) {
      elements = elements.slice(0, this.amountToShow);
    }
    return groupByLine(elements, this.props.lineDimensions);
  }
  
  get isAllShown() {
    const local = this.props.data.results.length <= this.amountToShow;
    return local && !this.props.data.next;
  }
  
  /**
   * Show CONFIG.pageLength more lines in the Grid
   */
  showMore = _ => {
    if (this.props.data.next) {
      this.props.loadMore(this.props.data.next);
    }
    this.setState({pages: (++this.state.pages)});
  };
  
  renderItems = _ => {
    const Element = this.props.elementComponent;
    return this.elements.map((line, index) => {
      const elements = line.map(el => {
        return (
          <Element
            update={Math.random()}
            data={el}
            collection={this.props.collection}
            key={el.getPublicId()}
            creationMode={this.props.creationMode}
          />
        );
      });
      return (<ElementLine key={index}>{elements}</ElementLine>);
   });
  };
  
  render() {
    return (
      <div className="content-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="content-grid">
            {this.renderItems()}
            <ShowMore isAllShown={this.isAllShown} showMore={this.showMore} />
          </div>
        </ScrollArea>
      </div>
    );
  }
  
}

const ShowMore = ({ isAllShown, showMore }) => {
  if (isAllShown) {
    return null;
  }
  return (
    <div style={_style.showMore}>
      <IconButton
        onClick={showMore}
        style={_style.button}
        iconStyle={_style.icon}
      >
        <NavigationMoreHoriz/>
      </IconButton>
    </div>
  );
};

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    loadMore: loadFunction => dispatch(loadFunction())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
