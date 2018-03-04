import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import IconButton from 'material-ui/IconButton'

import { getAllTypes, getIcon, getLabel, getStatus } from '../../../../services/content/collectionTypes'

import styles from './CollectionType.scss'


const CollectionType = ({ onClick }) => (
  <div className={styles.CollectionType}>
    {
      getAllTypes().map((type) => {
        const Icon = getIcon(type)
        const status = getStatus(type)
        const label = status === 'work_in_progress' ? 'Coming soon' : getLabel(type)

        const frameClasses = cx({
          [styles.Frame]: true,
          [styles.FrameWorkInProgress]: status === 'work_in_progress',
        })

        return (
          <div key={type} className={frameClasses} >
            <IconButton
              className={styles.Button}
              onClick={() => status === 'ready_to_use' && onClick(type)}
            >
              <Icon className={styles.Icon} />
            </IconButton>
            <div>{ label }</div>
          </div>
        )
      })
    }
  </div>
)

CollectionType.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CollectionType
