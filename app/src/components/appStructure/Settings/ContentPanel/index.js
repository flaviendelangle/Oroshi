import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'

import styles from './ContentPanel.scss'


const ContentPanel = ({
  match,
  defaultSection,
  sections,
  ...props
}) => (
  <div className={styles.ContentPanel}>
    <Switch>
      {
      Object.keys(sections).map(index => (
        <Route
          key={index /* eslint-disable-line react/no-array-index-key */}
          path={`${match.url}/${index}`}
          render={(routeProps) => {
            const Element = sections[index].component
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
  sections: PropTypes.object.isRequired,
  defaultSection: PropTypes.string.isRequired,
}

export default ContentPanel
