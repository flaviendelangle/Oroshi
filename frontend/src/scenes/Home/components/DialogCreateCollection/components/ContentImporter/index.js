import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import { List } from 'material-ui/List'

import Line from './components/Line'
import Progress from './components/Progress'
import { importContent } from './actions'

class ContentImporter extends Component {
  
  elements = [];
  
  constructor(props) {
    super(props);
    if(props.contentToImport) {
      this.elements = props.contentToImport;
    }
  }
  
  componentWillReceiveProps(newProps) {
    if(!this.props.contentToImport && newProps.contentToImport) {
      this.props.importContent(newProps.contentToImport);
      this.elements = newProps.contentToImport;
    }
  }
  
  renderLines = () => {
    return this.elements.map(el => {
      return (<Line data={el} key={el.tmdbId} />);
    })
  };
  
  render() {
    return (
      <div>
        <Progress progress={this.props.progress} />
        <List>
          <ScrollArea
            speed={0.8}
            horizontal={false}
          >
            {this.renderLines()}
          </ScrollArea>
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const root = state.home.dialogCreateCollection.contentImporter;
  return {
    contentToImport: root.contentToImport,
    progress: root.progress
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    importContent: movies => dispatch(importContent(ownProps.scene, dispatch, movies))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentImporter);