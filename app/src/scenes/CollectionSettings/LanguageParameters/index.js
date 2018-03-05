import React from 'react'
import PropTypes from 'prop-types'

import Section from '../../../components/appStructure/Settings/Section/index'
import { SelectLanguageListItem } from '../../../components/form/SelectLanguage/index'


const LanguageParameters = ({ collection, type, update }) => (
  <Section>
    <Section.Title>Languages</Section.Title>
    <Section.Content>
      <Section.Item primaryText="Title language">
        <SelectLanguageListItem
          type={type}
          value={collection.title_language}
          onChange={value => update('title_language', value)}
          hasOriginalLanguageLine
        />
      </Section.Item>
      <Section.Item primaryText="Poster language">
        <SelectLanguageListItem
          type={type}
          value={collection.poster_language}
          onChange={value => update('poster_language', value)}
          hasOriginalLanguageLine
        />
      </Section.Item>
    </Section.Content>
  </Section>
)

LanguageParameters.propTypes = {
  collection: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
}

export default LanguageParameters
