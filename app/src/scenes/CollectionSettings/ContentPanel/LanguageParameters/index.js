import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ParametersSection, { Line } from '../ParametersSection/index'
import SelectLanguage from '../../../../components/generics/SelectLanguage/index'

import { update as _update } from '../../actions'

const selectStyle = {
  position: 'absolute',
  top: -5,
  right: 20,
}

const LanguageParameters = ({ data, type, update }) => (
  <ParametersSection>
    <div className="title">Languages</div>
    <div className="content">
      <Line primaryText="Title language">
        <SelectLanguage
          type={type}
          style={selectStyle}
          value={data.title_language}
          onChange={value => update(data.pk, 'title_language', value)}
        />
      </Line>
      <Line primaryText="Poster language">
        <SelectLanguage
          type={type}
          style={selectStyle}
          value={data.poster_language}
          onChange={value => update(data.pk, 'poster_language', value)}
        />
      </Line>
    </div>
  </ParametersSection>
)

LanguageParameters.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { type }) => ({
  update: (pk, field, value) => dispatch(_update(type, pk, field, value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageParameters)
