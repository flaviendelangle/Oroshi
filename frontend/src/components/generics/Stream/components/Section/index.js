import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import NavigationLess from 'material-ui/svg-icons/navigation/expand-less'
import NavigationMore from 'material-ui/svg-icons/navigation/expand-more'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'
import muiThemeable from 'material-ui/styles/muiThemeable';

import ElementLine, { groupByLine } from 'components/generics/ElementLine/index';

import './style.css'


const CONFIG = {
  pageLength: 4
};

const buttonStyle = {
  width: 72,
  height: 72,
  padding: 18,
};

const iconStyle = {
  width: 36,
  height: 36
};

class Section extends Component {
  
  state = {
    full: false,
    pages: 1
  };
  
  get title() {
    return this.props.data.key.title || this.props.data.key.name;
  }
  
  get amountToShow() {
    const perLine = this.props.lineDimensions.elementsPerLine;
    return CONFIG.pageLength * perLine * this.state.pages;
  };
  
  get elements() {
    let elements = this.props.data.content;
    if (!this.state.full && elements.length > this.props.lineDimensions.elementsPerLine) {
      elements = elements.slice(0,this.props.lineDimensions.elementsPerLine);
    }
    else if (elements.length > this.amountToShow) {
      elements = elements.slice(0, this.amountToShow);
    }
    return groupByLine(elements, this.props.lineDimensions);
  }
  
  get isAllShown() {
    const local = this.props.data.content.length <= this.amountToShow;
    return local && !this.props.data.next;
  }
  
  
  showFullVersion = () => {
    this.setState({full: !this.state.full});
  };
  
  showMore = () => {
    if (this.props.data.next) {
      this.props.loadMore(this.props.data.next);
    }
    this.setState({pages: (++this.state.pages)});
  };
  
  renderLink = () => {
    if (this.props.data.hasOwnProperty('link') && !this.props.data.link) {
      return (
        <span style={{color: this.props.muiTheme.palette.titleColor}}>
          {this.title}
        </span>
      );
    }
    return (
      <Link
        to={'/' + this.props.field.field + '/' + this.props.data.key.pk}
        style={{color: this.props.muiTheme.palette.titleColor}}
      >
        {this.title}
      </Link>
    );
  };
  
  renderContent = () => {
    const Element = this.props.elementComponent;
    let i = 0;
    return this.elements.map(line => {
      const elements = line.map(el => {
        return (
          <Element
            data={el}
            collection={this.props.collection}
            key={el.getPublicId()}
            creationMode={this.props.creationMode}
          />
        );
      });
      return (<ElementLine key={++i}>{elements}</ElementLine>);
    });
  };
  
  renderShowMore = () => {
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
          style={buttonStyle}
          iconStyle={iconStyle}
        >
          <NavigationMoreHoriz/>
        </IconButton>
      </div>
    );
  };
  
  render() {
    return (
      <div
        className={'stream-section ' + (this.state.full ? 'full': '')}
        data-amount={this.props.data.content.length}
      >
        <div className="title">
          {this.renderLink()}
          <IconButton onClick={this.showFullVersion}>
            {this.state.full ? <NavigationLess/> : <NavigationMore/>}
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
