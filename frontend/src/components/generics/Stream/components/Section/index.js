import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import NavigationLess from 'material-ui/svg-icons/navigation/expand-less';
import NavigationMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import muiThemeable from 'material-ui/styles/muiThemeable';

import ElementLine, { groupByLine } from 'components/generics/ElementLine/index';

import * as _style from './style';
import './style.css'


const CONFIG = {
  pageLength: 4
};

class Section extends Component {
  
  state = {
    full: false,
    pages: 1
  };
  
  get title() {
    const { data: { key }} = this.props;
    return key.title || key.name;
  }
  
  get amountToShow() {
    const { lineDimensions } = this.props;
    const { pages } = this.state;
    return CONFIG.pageLength * lineDimensions.elementsPerLine * pages;
  };
  
  get elements() {
    const { data: { content }, lineDimensions } = this.props;
    const { full } = this.state;
    let elements = content;
    if (
      !full &&
      elements.length > lineDimensions.elementsPerLine
    ) {
      elements = elements.slice(0,lineDimensions.elementsPerLine);
    }
    else if (elements.length > this.amountToShow) {
      elements = elements.slice(0, this.amountToShow);
    }
    return groupByLine(elements, lineDimensions);
  }
  
  get isAllShown() {
    const { data: { content, next }} = this.props;
    const local = content.length <= this.amountToShow;
    return local && !next;
  }
  
  
  showFullVersion = _ => {
    this.setState({full: !this.state.full});
  };
  
  showMore = _ => {
    const { data: { next }, loadMore } = this.props;
    const { pages } = this.state;
    if (next) {
      loadMore(next);
    }
    this.setState({pages: pages+1});
  };
  
  renderLink = _ => {
    const { data, field, muiTheme: { palette }} = this.props;
    if (
      data.hasOwnProperty('link') &&
      !data.link
    ) {
      return (
        <span style={{color: palette.titleColor}}>
          {this.title}
        </span>
      );
    }
    return (
      <Link
        to={'/' + field.field + '/' + data.key.pk}
        style={{color: palette.titleColor}}
      >
        {this.title}
      </Link>
    );
  };
  
  renderContent = _ => {
    const { elementComponent, collection, creationMode, isPublic } = this.props;
    const Element = elementComponent;
    return this.elements.map((line, index) => {
      const elements = line.map(el => {
        return (
          <Element
            update={Math.random()}
            data={el}
            collection={collection}
            key={el.getPublicId()}
            creationMode={creationMode}
            isPublic={isPublic}
          />
        );
      });
      return (<ElementLine key={index}>{elements}</ElementLine>);
    });
  };
  
  renderShowMore = _ => {
    if (!this.state.full) {
      return null;
    }
    else if (this.isAllShown) {
      return null;
    }
    return (
      <div style={{textAlign: 'center'}}>
        <IconButton
          onClick={this.showMore}
          style={_style.button}
          iconStyle={_style.icon}
        >
          <NavigationMoreHoriz/>
        </IconButton>
      </div>
    );
  };
  
  render() {
    const { data } = this.props;
    const { full } = this.state;
    return (
      <div
        className={'stream-section ' + (full ? 'full': '')}
        data-amount={data.content.length}
      >
        <div className="title">
          {this.renderLink()}
          <IconButton onClick={this.showFullVersion}>
            {full ? <NavigationLess/> : <NavigationMore/>}
          </IconButton>
        </div>
        <div className="content">
          {this.renderContent()}
          {this.renderShowMore()}
        </div>
      </div>
    );
  }
  
}

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
)(muiThemeable()(Section));
