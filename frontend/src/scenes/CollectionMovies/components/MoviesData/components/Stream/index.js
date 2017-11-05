import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'

import Section from './components/Section'

class Stream extends Component {
  
  renderSections = () => {
    return this.props.data.results.map(section => {
      return (
        <Section
          key={section.key.pk}
          data={section}
          collection={this.props.collection}
          field={this.props.data.key}
        />)
    })
  };
  
  render() {
    return (
      <div className="movie-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="movie-grid">
            {this.renderSections()}
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