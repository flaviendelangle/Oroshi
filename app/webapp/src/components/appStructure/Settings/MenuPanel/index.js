import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router-dom'


import styles from './MenuPanel.scss'


const MenuPanel = ({ match, location, sections }) => (
  <div className={styles.MenuPanel} >
    {
      Object.keys(sections).map((index) => {
        const lineClasses = cx({
          [styles.Line]: true,
          [styles.LineActive]: (`${match.url}/${index}/` === location.pathname),
        })

        return (
          <Link
            to={`${match.url}/${index}/`}
            key={index /* eslint-disable-line react/no-array-index-key */}
          >
            <div className={lineClasses} >
              { sections[index].label }
            </div>
          </Link>
        )
      })
    }
  </div>
)

MenuPanel.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  sections: PropTypes.object.isRequired,
}


export default MenuPanel
