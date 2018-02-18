import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollArea from 'react-scrollbar'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

import ElementLine, { groupByLine } from 'components/generics/ElementLine/index'

import * as _style from './style'
import './style.css'


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
    elementComponent: PropTypes.func,
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

  get isAllShown() {
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

  renderItems = () => {
    const {
      elementComponent,
      collection,
      creationMode,
      isPublic,
    } = this.props
    const Element = elementComponent
    return this.elements.map((line, i) => {
      const index = i
      const elements = line.map(el => (
        <Element
          update={Math.random()}
          data={el}
          collection={collection}
          key={el.getPublicId()}
          creationMode={creationMode}
          isPublic={isPublic}
        />
      ))
      return (<ElementLine key={index} >{elements}</ElementLine>)
    })
  }

  render() {
    return (
      <div className="content-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="content-grid">
            {this.renderItems()}
            <ShowMore isAllShown={this.isAllShown} showMore={this.showMore} />
          </div>
        </ScrollArea>
      </div>
    )
  }
}

const ShowMore = ({ isAllShown, showMore }) => {
  if (isAllShown) {
    return null
  }
  return (
    <div style={_style.showMore} >
      <IconButton
        onClick={showMore}
        style={_style.button}
        iconStyle={_style.icon}
      >
        <NavigationMoreHoriz />
      </IconButton>
    </div>
  )
}

ShowMore.propTypes = {
  isAllShown: PropTypes.bool.isRequired,
  showMore: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  loadMore: loadFunction => dispatch(loadFunction()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid)
