import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

import Section from './components/Section/index'

import * as _style from './style'

const CONFIG = {
  pageLength: 10,
}

class Stream extends Component {
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

  showMore = () => {
    this.setState({
      pages: this.state.pages + 1,
    })
  }

  renderSections = () => {
    const {
      data,
      collection,
      elementComponent,
      lineDimensions,
      creationMode,
      isPublic,
    } = this.props
    const { full } = this.state
    let sections = data.results

    if (
      !full &&
      sections.length > CONFIG.pageLength * this.state.pages
    ) {
      sections = sections.slice(0, CONFIG.pageLength * this.state.pages)
    }
    return sections.map(section => (
      <Section
        key={`${section.type}_${section.key.pk}`}
        data={section}
        collection={collection}
        field={data.key}
        elementComponent={elementComponent}
        lineDimensions={lineDimensions}
        creationMode={creationMode}
        isPublic={isPublic}
      />
    ))
  }

  renderShowMore = () => {
    const { data } = this.props
    const { pages } = this.state
    if (data.results.length <= CONFIG.pageLength * pages) {
      return null
    }
    return (
      <div style={{ textAlign: 'center' }} >
        <IconButton
          onClick={this.showMore}
          style={_style.button}
          iconStyle={_style.icon}
        >
          <NavigationMoreHoriz />
        </IconButton>
      </div>
    )
  }

  render() {
    return (
      <div className="content-grid-container">
        <ScrollArea
          speed={0.8}
          horizontal={false}
        >
          <div className="content-grid">
            {this.renderSections()}
            {this.renderShowMore()}
          </div>
        </ScrollArea>
      </div>
    )
  }
}

export default Stream
