import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import NavigationLess from 'material-ui/svg-icons/navigation/expand-less'
import NavigationMore from 'material-ui/svg-icons/navigation/expand-more'

import './style.css'

class Section extends Component {
  
  state = {
    full: false
  };
  
  get title() {
    return this.props.data.key.title || this.props.data.key.name;
  }
  
  showAll = () => {
    this.setState({full: !this.state.full});
  };
  
  renderLink = () => {
    if(this.props.data.hasOwnProperty('link') && !this.props.data.link) {
      return this.title;
    }
    return (
      <Link to={'/' + this.props.field.field + '/' + this.props.data.key.pk}>
        {this.title}
      </Link>
    );
  };
  
  renderContent = () => {
    let content = this.props.data.content;
    if(!this.state.full && content.length > 7) {
      content = content.slice(0,7);
    }
    const Element = this.props.elementComponent;
    return content.map(element => {
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
  
  render() {
    return (
      <div
        className={'stream-section ' + (this.state.full ? 'full': '')}
        data-amount={this.props.data.content.length}
      >
        <div className="title">
          {this.renderLink()}
          <IconButton onClick={this.showAll}>
            {this.state.full ? <NavigationLess/> : <NavigationMore/>}
          </IconButton>
        </div>
        <div className="content">
          {this.renderContent()}
        </div>
      </div>
    );
  }
  
}

export default Section;