import React, {Component} from 'react';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Progress from 'components/generics/Progress';
import Canvas from './components/Canvas';
import { getElement } from 'services/actions/help';

import * as _style from './style';


class Help extends Component {
  
  componentDidMount() {
    this.props.getElement(this.props.scene, this.props.collection);
  }
  
  render() {
    if(this.props.isPublic) {
      return (
        <PublicHelp palette={this.props.muiTheme.palette} />
      );
    }
    return (
      <ElementHelp {...this.props} />
    );
  }
  
}

const ElementHelp = ({ element, elementComponent, muiTheme, ...props }) => {
  let content;
  const childProps = {
    ...props,
    element,
  };
  if(!element) {
    content = <Progress />;
  } else {
    content = (
      <div>
        <div style={_style.title(muiTheme.palette)}>Element layout :</div>
        <Canvas component={elementComponent} elementProps={childProps} />
      </div>
    );
  }
  return (
    <div style={_style.elementHelp}>
      {content}
    </div>
  );

};

const PublicHelp = ({ palette }) => (
  <div style={_style.publicContainer(palette)}>
      <span style={_style.publicContent(palette)}>There is nothing to see here :(</span>
  </div>
);

const mapStateToProps = state => {
  const root = state.help;
  return {
    element: root.element
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getElement: (...args) => dispatch(getElement(...args))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(Help));