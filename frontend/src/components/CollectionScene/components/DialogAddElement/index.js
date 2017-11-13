import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SearchBar from 'material-ui-search-bar'
import ScrollArea from 'react-scrollbar'

import { getCollectionState } from 'containers/reducer';
import Results from './components/Results/index'
import { showDialog, search } from './actions'

const searchStyle = {
  margin: '0 auto 20px auto',
  maxWidth: 500
};

const containerStyle = {
};

class DialogAddElement extends Component {
  
  state = {
    query: ''
  };
  
  render() {
    
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.props.close}
      />
    ];
    
    return (
        <Dialog
          title="Complete your collection"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.props.close}
          autoScrollBodyContent={true}
          bodyStyle={containerStyle}
        >
          <ScrollArea
            speed={0.8}
            horizontal={false}
          >
            <SearchBar
              onChange={query => this.setState({query})}
              onRequestSearch={() => {
                this.props.search(this.props.collection, this.state.query);
              }}
              style={searchStyle}
            />
            <Results
              scene={this.props.scene}
              elementComponent={this.props.elementComponent}
            />
          </ScrollArea>
        </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionState(state, ownProps.scene).dialogAddElement;
  return {
    isOpen: root.main.show,
    resultsList: root.results.data
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    close: () => dispatch(showDialog(false)),
    search: (collection, query) => {
      if(query) {
        dispatch(search(ownProps.scene, collection, query));
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddElement);