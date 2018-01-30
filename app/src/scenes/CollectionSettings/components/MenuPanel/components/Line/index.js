import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import muiThemeable from 'material-ui/styles/muiThemeable';

import { goToSection } from './actions';

import './style.css';


class Line extends Component {
  static propTypes = {
    muiTheme: PropTypes.object.isRequired,
    goTo: PropTypes.func.isRequired,
    children: PropTypes.string,
    value: PropTypes.any,
    active: PropTypes.bool,
  };

  get active() {
    const { active } = this.props;
    return active ? 1 : 0;
  }

  get contentStyle() {
    const { muiTheme: { baseTheme } } = this.props;
    return {
      color: baseTheme.palette.textColor,
    };
  }

  render() {
    const { goTo, value, children } = this.props;
    return (
      <div className="line" data-active={this.active} >
        <div
          role="button"
          tabIndex={0}
          style={this.contentStyle}
          className="line-content"
          onClick={() => goTo(value)}
        >
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, { type, collection }) => ({
  goTo: value => dispatch(goToSection(type, collection, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(muiThemeable()(Line));
