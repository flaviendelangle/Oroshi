import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from '../Element.scss'


class Footer extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    footer: PropTypes.array,
  }

  static defaultProps = {
    footer: [],
  }

  render() {
    const { footer } = this.props
    return (
      <div className={styles.Title}>
        {
          footer &&
          footer.map((line) => {
            if (line.link) {
              return (
                <Link
                  key={line.key}
                  to={line.link}
                  target="_blank"
                >
                  {line.value}
                </Link>
              )
            }
            return (
              <div key={line.key}>
                {line.value}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Footer
