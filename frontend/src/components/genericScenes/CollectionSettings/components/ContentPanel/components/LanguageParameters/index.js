import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParametersSection, { Line } from '../ParametersSection';
import SelectLanguage from 'components/generics/SelectLanguage';

import { getCollectionSettingsState } from 'containers/reducer';
import { update } from 'components/genericScenes/CollectionSettings/actions';

const selectStyle = {
  position: 'absolute',
  top: -5,
  right: 20,
};

class LanguageParameters extends Component {
  
  render() {
    return (
      <ParametersSection>
        <div className="title">Languages</div>
        <div className="content">
          <Line primaryText="Title language">
            <SelectLanguage
              scene={this.props.scene}
              style={selectStyle}
              value={this.props.data.title_language}
              onChange={ value => {
                this.props.update(this.props.data.pk, 'title_language', value)
              }}
            />
          </Line>
          <Line primaryText="Poster language">
            <SelectLanguage
              scene={this.props.scene}
              style={selectStyle}
              value={this.props.data.poster_language}
              onChange={ value => {
                this.props.update(this.props.data.pk, 'poster_language', value)
              }}
            />
          </Line>
        </div>
      </ParametersSection>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const root = getCollectionSettingsState(state, ownProps.scene).main;
  return {
    data: root.data
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update: (pk, field, value) => dispatch(update(ownProps.scene, pk, field, value))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageParameters);