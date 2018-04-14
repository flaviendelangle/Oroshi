import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import IconButton from 'material-ui/IconButton'

import tM from '../../../../services/content/type'

import styles from './CollectionType.scss'


const CollectionType = ({ onClick }) => (
  <div className={styles.CollectionType}>
    {
      tM.all().map((type) => {
        const getter = tM.read(type)
        const Icon = getter.icon()
        const status = getter.status()
        const label = status === 'work_in_progress' ? 'Coming soon' : getter.label()

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
