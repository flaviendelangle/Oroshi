import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Section from '../Section/index'
import { SelectLanguageListItem } from '../../../../components/form/SelectLanguage/index'

import { update as _update } from '../../actions'

const LanguageParameters = ({ data, type, update }) => (
  <Section>
    <Section.Title>Languages</Section.Title>
    <Section.Content>
      <Section.Item primaryText="Title language">
        <SelectLanguageListItem
          type={type}
          value={data.title_language}
          onChange={value => update(data.pk, 'title_language', value)}
          hasOriginalLanguageLine
        />
      </Section.Item>
      <Section.Item primaryText="Poster language">
        <SelectLanguageListItem
          type={type}
          value={data.poster_language}
          onChange={value => update(data.pk, 'poster_language', value)}
          hasOriginalLanguageLine
        />
      </Section.Item>
    </Section.Content>
  </Section>
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
