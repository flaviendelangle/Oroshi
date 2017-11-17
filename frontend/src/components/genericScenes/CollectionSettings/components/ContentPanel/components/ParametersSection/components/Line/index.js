import React, { Component } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ListItem } from 'material-ui/List';


const Line = ({ params }) => (
  <ListItem {...params} />
);

export default muiThemeable()(Line);