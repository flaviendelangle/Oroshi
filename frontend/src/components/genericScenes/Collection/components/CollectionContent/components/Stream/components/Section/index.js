import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import NavigationLess from 'material-ui/svg-icons/navigation/expand-less'
import NavigationMore from 'material-ui/svg-icons/navigation/expand-more'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'
import muiThemeable from 'material-ui/styles/muiThemeable';

import './style.css'


const CONFIG = {
  pageLength: 20
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
  
  get elements() {
    let elements = this.props.data.content;
    if(!this.state.full && elements.length > 7) {
      elements = elements.slice(0,7);
    }
    else if(elements.length > CONFIG.pageLength * this.state.pages) {
      elements = elements.slice(0,CONFIG.pageLength * this.state.pages);
    }
    return elements;
  }
  
  get isAllShown() {
    const local = this.props.data.content.length <= CONFIG.pageLength * this.state.pages;
    return local && !this.props.data.next;
  }
  
  showFullVersion = () => {
    this.setState({full: !this.state.full});
  };
  
  showMore = () => {
    if(this.props.data.next) {
      this.props.loadMore(this.props.data.next);
    }
    this.setState({pages: (++this.state.pages)});
  };
  
  renderLink = () => {
    if(this.props.data.hasOwnProperty('link') && !this.props.data.link) {
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
    return this.elements.map(element => {
      return (
        <Element
          data={element}
          collection={this.props.collection}
          key={element.pk || element.id}
          creationMode={this.props.creationMode}
          onCreate={this.props.onCreate}
        />
      )
    });
  };
  
  renderShowMore = () => {
    if(!this.state.full) {
      return null;
    }
    else if(this.isAllShown) {
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
