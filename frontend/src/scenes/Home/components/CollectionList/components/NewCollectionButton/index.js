import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ContentAdd from 'material-ui/svg-icons/content/add'
import { showDialogCreateCollection } from '../../../DialogCreateCollection/actions'

import '../CollectionBox/style.css';


class NewCollectionButton extends Component {
  
  handleClick = () => {
    if(this.props.editing)
      this.props.newCollection();
  };
  
  render(forced=false) {
    if(!forced)
      window.setTimeout(() => this.render(true), 300);
    
    return (
      <Link to='/'>
        <div className={'collection-box ' + (this.props.editing ? '' : 'invisible')} onClick={this.handleClick}>
          <div className="collection-icon">
            <div className="collection-editing-mask" >
              <ContentAdd color="white" className="editing-icon big" />
            </div>
            <div className="fake-img-new-collection">
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
      newCollection: () => dispatch(showDialogCreateCollection(true))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCollectionButton);