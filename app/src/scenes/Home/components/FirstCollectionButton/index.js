import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import { showDialogCreateCollection } from '../DialogCreateCollection/actions'


const containerStyle = {
  textAlign: 'center',
};


const FirstCollectionButton = ({ onClick }) => (
  <div style={containerStyle} >
    <RaisedButton label="Create your first collection" onClick={onClick} />
  </div>
);

FirstCollectionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(showDialogCreateCollection(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FirstCollectionButton);

