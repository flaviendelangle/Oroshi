import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import IconButton from 'material-ui/IconButton'
import NavigationMore from 'material-ui/svg-icons/navigation/more-horiz'

import Section from './components/Section'

const CONFIG = {
  pageLength: 10
};

const buttonStyle = {
  width: 96,
  height: 96,
  padding: 24,
};

const iconStyle = {
  width: 48,
  height: 48
};

class Stream extends Component {
  
  state = {
    pages: 1
  };
  
  showAll = () => {
    this.setState({pages: (++this.state.pages)});
  };
  
  renderSections = () => {
    let sections = this.props.data.results;
    if(!this.state.full && sections.length > CONFIG.pageLength * this.state.pages) {
      sections = sections.slice(0,CONFIG.pageLength * this.state.pages);
    }
    return sections.map(section => {
      return (
        <Section
          key={section.key.pk}
          data={section}
          collection={this.props.collection}
          field={this.props.data.key}
          elementComponent={this.props.elementComponent}
        />)
    })
  };
  
  renderShowAll = () => {
    if(this.props.data.results.length <= CONFIG.pageLength * this.state.pages) {
      return null;
    }
    return (
      <div style={{textAlign: 'center'}}>
          <IconButton
            onClick={this.showAll}
            style={buttonStyle}
            iconStyle={iconStyle}
          >
            <NavigationMore/>
          </IconButton>
      </div>
    );
  };
  
  render() {
    return (
      <div className="content-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="content-grid">
            {this.renderSections()}
            {this.renderShowAll()}
          </div>
        </ScrollArea>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);