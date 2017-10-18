import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CollectionsAPI} from "./services/api";

class Collection extends Component {
  
  state = {
    editing: true
  };
  
  constructor() {
    super();
    CollectionsAPI.element(23).movies.list().then((response) => {
      console.log(response);
    });
  }
  
  render() {
    //console.log(this.props.params);
    return (
      <div>
        HEY !
      </div>
    )
    
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);