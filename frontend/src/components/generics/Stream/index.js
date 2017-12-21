import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar';

import IconButton from 'material-ui/IconButton';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

import Section from './components/Section/index';

import * as _style from './style';

const CONFIG = {
  pageLength: 10
};

class Stream extends Component {
  
  state = {
    pages: 1
  };
  
  showMore = _ => {
    this.setState({pages: (++this.state.pages)});
  };
  
  renderSections = _ => {
    let { data, collection, elementComponent, lineDimensions, creationMode } = this.props;
    let sections = data.results;
    
    if (!this.state.full && sections.length > CONFIG.pageLength * this.state.pages) {
      sections = sections.slice(0,CONFIG.pageLength * this.state.pages);
    }
    return sections.map(section => {
      return (
        <Section
          key={section.key.pk}
          data={section}
          collection={collection}
          field={data.key}
          elementComponent={elementComponent}
          lineDimensions={lineDimensions}
          creationMode={creationMode}
          isPublic={this.props.isPublic}
        />)
    })
  };
  
  renderShowMore = _ => {
    if (this.props.data.results.length <= CONFIG.pageLength * this.state.pages) {
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
    return (
      <div className="content-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="content-grid">
            {this.renderSections()}
            {this.renderShowMore()}
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