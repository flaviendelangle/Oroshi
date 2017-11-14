import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActionDelete from 'material-ui/svg-icons/action/delete'

import SeenCheckbox from 'components/ContentTable/components/SeenCheckbox'
import { removeElement } from 'services/actions/collections'

import './style.css'

class Actions extends Component {
  
  remove = () => {
    this.props.remove(this.props.collection, this.props.data.pk)
  };
  
  render() {
    return (
      <div className="actions">
        <div>
          <div>Seen :</div>
          <div>
            <SeenCheckbox
              data={this.props.data}
              scene={this.props.scene}
            />
          </div>
        </div>
        <span
          className="delete-movie"
          onClick={this.remove}
        >
          <ActionDelete/>
        </span>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    remove: (collection, pk) => dispatch(removeElement('movies', collection, pk))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
