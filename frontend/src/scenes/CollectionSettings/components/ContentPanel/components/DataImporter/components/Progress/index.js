import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from 'material-ui/LinearProgress';


const Progress = ({ progress }) => <LinearProgress mode="determinate" value={progress} />;

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Progress;
