import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import AVMovie from 'material-ui/svg-icons/av/movie';
import HardwareTV from 'material-ui/svg-icons/hardware/tv';

import * as _style from './style';


const CollectionType = ({ onClick }) => (
  <div>
    <TypeFrame
      type="movies"
      label="Movies"
      Icon={AVMovie}
      onClick={onClick}
    />
    <TypeFrame
      type="tv_shows"
      label="TV-Shows"
      Icon={HardwareTV}
      onClick={onClick}
    />
  </div>
);

CollectionType.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const TypeFrame = ({
  type,
  label,
  Icon,
  onClick,
}) => (
  <div style={_style.frame} >
    <IconButton
      iconStyle={_style.icon}
      style={_style.iconContainer}
      onClick={() => onClick(type)}
    >
      <Icon />
    </IconButton>
    <div>{label}</div>
  </div>
);

TypeFrame.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CollectionType;
