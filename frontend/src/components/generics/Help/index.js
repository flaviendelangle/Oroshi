import React, {Component} from 'react';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Progress from 'components/generics/Progress';
import { getElement } from 'services/actions/help';

import * as _style from './style';


class Help extends Component {
  
  componentDidMount() {
    this.props.getElement(this.props.scene, this.props.collection);
  }
  
  render() {
    return (
      <ElementHelp {...this.props} />
    );
  }
  
}

const ElementHelp = ({ element, collection, elementComponent, muiTheme }) => {
  let content;
  if(!element) {
    content = <Progress />;
  } else {
    const Element = elementComponent;
    content = (
      <div>
        <div style={_style.title(muiTheme.palette)}>Element layout :</div>
        <Element
          data={element}
          collection={collection}
          key={element.getPublicId()}
          creationMode={false}
          style={_style.elementLoaded}
        />
      </div>
    );
  }
  return (
    <div style={_style.elementHelp}>
      {content}
    </div>
  );

};

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
