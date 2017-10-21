import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import Header from './components/Header'
import { loadCollection } from './actions'

const paperStyle = {
  width: 500,
  height: 500,
  top: 50,
  left: 'calc(50% - 250px)'
};

class CollectionSettings extends Component {
  
  componentDidMount() {
    this.props.synchronize(this.props.match.params.collection_id);
  }
  
  render() {
    return (
      <div>
        <Header/>
        <Paper zDepth={3} style={paperStyle}>
          <Card>
            <CardTitle title="Collection Settings" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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

const mapDispatchToProps = dispatch => {
  return {
    synchronize: (collection) => dispatch(loadCollection(collection))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSettings);