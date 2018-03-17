import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

import Section from './Section/index'

import styles from './Stream.scss'


const CONFIG = {
  pageLength: 10,
}

class Stream extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    elementComponent: PropTypes.func.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    creationMode: PropTypes.bool,
    isPublic: PropTypes.bool,
  }

  state = {
    pages: 1,
  }

  getSections = () => {
    const { data: { results } } = this.props
    const { full, pages } = this.state
    const length = CONFIG.pageLength * pages

    if (
      !full &&
      results.length > length
    ) {
      return results.slice(0, length)
    }
    return results
  }

  showMore = () => {
    this.setState({
      pages: this.state.pages + 1,
    })
  }

  render() {
    const {
      data: { key, results },
      collection,
      elementComponent,
      lineDimensions,
      creationMode,
      isPublic,
    } = this.props
    const { pages } = this.state

    const sections = this.getSections()
    return (
      <div className={styles.Stream}>
        {
          sections.map(section => (
            <Section
              key={`${section.type}_${section.key.pk}`}
              data={section}
              collection={collection}
              field={key}
              elementComponent={elementComponent}
              lineDimensions={lineDimensions}
              creationMode={creationMode}
              isPublic={isPublic}
            />
          ))
        }
        {
          (results.length > CONFIG.pageLength * pages) && (
            <div className={styles.ShowMore}>
              <IconButton
                onClick={this.showMore}
                className={styles.Button}
              >
                <NavigationMoreHoriz />
              </IconButton>
            </div>
          )
        }
      </div>
    )
  }
}

export default Stream
