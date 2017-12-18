import React  from 'react';
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


const TypeFrame = ({ type, label, Icon, onClick }) => {
  return (
  <div style={_style.frame}>
    <IconButton
      iconStyle={_style.icon}
      style={_style.iconContainer}
      onClick={_ => onClick(type)}
    >
      <Icon />
    </IconButton>
    <div>{label}</div>
  </div>);
};


export default CollectionType;