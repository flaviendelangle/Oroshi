import React, { Component } from 'react';
import { connect } from 'react-redux';

import ParametersSection, { Line } from '../ParametersSection';
import SelectLanguage from 'components/generics/SelectLanguage';

import { getCollectionSettingsState } from 'containers/reducer';
import { update } from 'scenes/CollectionSettings/actions';

const selectStyle = {
  position: 'absolute',
  top: -5,
  right: 20,
};

class LanguageParameters extends Component {
  
  render() {
    const { data, scene, update } = this.props;
    return (
      <ParametersSection>
        <div className="title">Languages</div>
        <div className="content">
          <Line primaryText="Title language">
            <SelectLanguage
              scene={scene}
              style={selectStyle}
              value={data.title_language}
              onChange={ value => {
                update(data.pk, 'title_language', value)
              }}
            />
          </Line>
          <Line primaryText="Poster language">
            <SelectLanguage
              scene={scene}
              style={selectStyle}
              value={data.poster_language}
              onChange={ value => {
                update(data.pk, 'poster_language', value)
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