import React from 'react'
import PropTypes from 'prop-types'

import ContentSave from 'material-ui/svg-icons/content/save'

import styles from './ClickableOverlay.scss'


const ClickableOverlay = ({ onClick, data }) => (
  <div
    role="button"
    tabIndex={0}
    className={styles.ClickableOverlay}
    onClick={() => onClick && onClick(data)}
  >
    <ContentSave />
  </div>
)

ClickableOverlay.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default ClickableOverlay
