import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List'
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

import Header from './components/Header'
import Exports from './components/Exports'
import { getSettings } from 'services/actions/collections'

const paperStyle = {
  width: 500,
  top: 300,
  position: 'absolute',
  left: 'calc(50% - 250px)'
};

class CollectionSettings extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div>
        <Header
          scene={this.props.scene}
        />
        <Paper zDepth={3} style={paperStyle}>
          <Card>
            <CardTitle title="Collection Settings" />
            <CardText style={{padding:0}}>
              <List>
                <ListItem
                  primaryText="Include adult content"
                  rightToggle={<Toggle />}
                />
              </List>
              <Divider inset={true} />
              <Exports
                scene={this.props.scene}
              />
            </CardText>
          </Card>
        </Paper>
      </div>
    );
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    synchronize: collection => dispatch(getSettings(ownProps.scene, collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSettings);