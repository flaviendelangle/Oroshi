import React, { Component } from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Grade from 'components/generics/Grade';

import './style.css'


class ElementOverlay extends Component {
  
  state = {
    show: false,
    waiting: false
  };
  
  timeout = null;
  
  isTesting = _ => {
    return this.props.mode === 'test';
  };
  
  addToLayout = (key, element) => {
    if(this.props.addToLayout) {
      this.props.addToLayout(key, element);
    }
  };
  
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  
  componentWillReceiveProps(newProps) {
    if (newProps.mouseOver) {
      this.setState({ show: true, waiting: false });
    } else {
      this.setState({ waiting: true });
      this.timeout = setTimeout(_ => {
        if (this.state.waiting) {
          this.setState({ show: false, waiting: false });
        }
      }, 300);
    }
  }
  
  render() {
    if (!this.state.show && !this.isTesting()) {
      return null;
    }
    return (
      <div className={'element-overlay ' + (this.isTesting() ? ' testing' : '')}>
        <Grade
          className="grade"
          value={this.props.note}
          mouseOver={this.state.show}
          ref={el => this.addToLayout('grade', el)}
        />
        <TopLeftAction isPublic={this.props.isPublic}>
          {this.props.topLeftAction}
        </TopLeftAction>
        <TopRightAction isPublic={this.props.isPublic}>
          {this.props.topRightAction}
        </TopRightAction>
        <Footer
          creation_mode={this.props.creation_mode}
          already_in_collection={this.props.already_in_collection}
          handleSave={this.props.handleSave}
          handleDestroy={this.props.handleDestroy}
          addToLayout={this.addToLayout}
          isPublic={this.props.isPublic}
        />
      </div>
    );
  }
  
}

const Footer = ({ creation_mode, already_in_collection, handleSave, handleDestroy, addToLayout, isPublic }) => {
  if(isPublic) {
    return null;
  }
  let Content;
  if (creation_mode && !already_in_collection) {
    Content = (
      <div
        className="footer-content"
        onClick={handleSave}
        style={{background: 'rgba(76,175,80,0.8)'}}
        ref={el => addToLayout('add', el)}
      >
        ADD
      </div>
    );
  } else {
    Content = (
      <div
        className="footer-content"
        onClick={handleDestroy}
        style={{background: 'rgba(244,67,54,0.8)'}}
        ref={el => addToLayout('add', el)}
      >
        REMOVE
      </div>
    );
  }
  return <div className="footer">{Content}</div>;
};

const TopLeftAction = ({ children, isPublic }) => {
  return (
    <div className={'top-left-icon ' + (isPublic ? 'public' : 'private')}>
      {children}
    </div>
  );
};

const TopRightAction = ({ children, isPublic }) => {
  return (
    <div className={'top-right-icon ' + (isPublic ? 'public' : 'private')}>
      {children}
    </div>
  );
};

export default muiThemeable()(ElementOverlay);