import React, { Component } from 'react'
import { connect } from 'react-redux'
import ActionDelete from 'material-ui/svg-icons/action/delete'

import SeenCheckbox from 'components/ContentTable/components/SeenCheckbox'
import { removeElement } from 'services/actions/collections'

import './style.css'

class Actions extends Component {
  
  render() {
    return (
      <div className="actions">
        <div>
          <div>Seen :</div>
          <div>
            <SeenCheckbox
              data={this.props.data}
              scene="movies"
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
