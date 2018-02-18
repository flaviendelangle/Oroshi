import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import ActionDone from 'material-ui/svg-icons/action/done'

const Line = ({ done, title}) => (
  <ListItem
    primaryText={title}
    rightIcon={done ? <ActionDone /> : null}
  />
);

Line.propTypes = {
  done: PropTypes.bool,
  title: PropTypes.string,
};

export default Line;
