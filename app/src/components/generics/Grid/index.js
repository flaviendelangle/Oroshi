import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

import ElementLine, { groupByLine } from '../ElementLine/index'

import styles from './Grid.scss'


const CONFIG = {
  pageLength: 4,
}

/**
 * Class representing the Grid layout
 * This layout show the elements as a responsive grid with CONFIG.pageLength lines
 */
class Grid extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    lineDimensions: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    creationMode: PropTypes.bool, // RENAME
    isPublic: PropTypes.bool, // RENAME
    loadMore: PropTypes.func,
    elementComponent: PropTypes.func.isRequired,
  }

  state = {
    pages: 1,
  }

  get amountToShow() {
    const { lineDimensions } = this.props
    const perLine = lineDimensions.elementsPerLine
    return CONFIG.pageLength * perLine * this.state.pages
  }

  get elements() {
    let elements = this.props.data.results
    if (elements.length > this.amountToShow) {
      elements = elements.slice(0, this.amountToShow)
    }
    return groupByLine(elements, this.props.lineDimensions)
  }

  isAllShown() {
    const local = this.props.data.results.length <= this.amountToShow
    return local && !this.props.data.next
  }

  /**
   * Show CONFIG.pageLength more lines in the Grid
   */
  showMore = () => {
    const { loadMore, data: { next } } = this.props
    const { pages } = this.state
    if (next) {
      loadMore(next)
    }
    this.setState({ pages: pages + 1 })
  }

  render() {
    const {
      elementComponent: Element,
      collection,
      creationMode,
      isPublic,
    } = this.props
    return (
      <div className={styles.Grid}>
        {
          this.elements.map((line, index) => (
            <ElementLine key={index} > { /* eslint-disable-line react/no-array-index-key */ }
              {
                line.map(el => (
                  <Element
                    update={Math.random()}
                    data={el}
                    collection={collection}
                    key={el.getPublicId()}
                    creationMode={creationMode}
                    isPublic={isPublic}
                  />
                ))
              }
            </ElementLine>
          ))
        }
        {
          !this.isAllShown() && (
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

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  loadMore: loadFunction => dispatch(loadFunction()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid)
