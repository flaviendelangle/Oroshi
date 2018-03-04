import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'

import SummaryParameters from './SummaryParameters'
import LanguageParameters from './LanguageParameters'
import ExportParameters from './ExportParameters'
import DataImporter from './DataImporter'
import CoverCustomization from './CoverCustomization'

import styles from './ContentPanel.scss'


const sections = {
  summary: SummaryParameters,
  languages: LanguageParameters,
  exports: ExportParameters,
  imports: DataImporter,
  cover: CoverCustomization,
}

const defaultSection = 'summary'

const ContentPanel = ({ match, ...props }) => (
  <div className={styles.ContentPanel}>
    <Switch>
      {
      Object.keys(sections).map(index => (
        <Route
          key={index /* eslint-disable-line react/no-array-index-key */}
          path={`${match.url}/${index}`}
          render={(routeProps) => {
            const Element = sections[index]
            return <Element {...props} {...routeProps} />
          }}
        />
      ))
    }
      <Redirect to={`${match.url}/${defaultSection}`} />
    </Switch>
  </div>
)

ContentPanel.propTypes = {
  match: PropTypes.object.isRequired,
}

export default ContentPanel
