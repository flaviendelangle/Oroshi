import React, { PureComponent, Fragment } from 'react'
import { Stage, Layer, Arrow, Text } from 'react-konva'
import PropTypes from 'prop-types'

import styles from './Canvas.scss'


class Canvas extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    element: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
  }

  static getArrowConfig() {
    return {
      pointerWidth: 8,
      pointerLength: 8,
      fill: 'red',
      stroke: 'red',
      strokeWidth: 2,
    }
  }

  state = {
    layout: [],
  }

  onElementRender = ({ layout }) => {
    if (!this.canvas) {
      this.setState({ layout: [] })
    } else {
      const newLayout = Object
        .keys(layout)
        .map(el => ({
          ...layout[el],
          name: el,
        }))
        .filter(el => (!Object.prototype.hasOwnProperty.call(el, 'show') || el.show) && el.element)
        .map((config) => {
          const coordinates = config.element.getBoundingClientRect()
          const canvasCoordinates = this.translateCoordinates(coordinates)
          const props = this.buildArrow(canvasCoordinates, config.label)
          return {
            ...config,
            domElement: config.element,
            coordinates,
            canvasCoordinates,
            props,
            name: config.name,
          }
        })
      this.setState({ layout: newLayout })
    }
  }

  getArrows() {
    return this.state.layout.map(el => (
      <Fragment>
        <Arrow {...el.props.arrow} />
        <Text {...el.props.text} />
      </Fragment>
    ))
  }

  canvas = null

  translateCoordinates = (coordinates) => {
    const canvasCoordinates = this.canvas.getBoundingClientRect()

    return {
      top: coordinates.top - canvasCoordinates.top,
      bottom: coordinates.bottom - canvasCoordinates.top,
      left: coordinates.left - canvasCoordinates.left,
      right: coordinates.right - canvasCoordinates.left,
    }
  }

  buildArrow = (canvasCoordinates, label) => {
    const verticalMiddle = (canvasCoordinates.top + canvasCoordinates.bottom) / 2
    const arrow = {
      ...Canvas.getArrowConfig(),
      points: [
        150,
        verticalMiddle,
        canvasCoordinates.left - 10,
        verticalMiddle,
      ],
    }
    const text = {
      text: label,
      x: 0,
      y: (verticalMiddle - 8),
      fontSize: 16,
      fill: 'red',
    }

    return { arrow, text }
  }

  render() {
    const {
      component,
      element,
      collection,
    } = this.props
    const Element = component
    return (
      <div className={styles.Canvas}>
        <div className={styles.Element}>
          <Element
            data={element}
            collection={collection}
            key={element.getPublicId()}
            creationMode={false}
            mode="test"
            onRender={this.onElementRender}
          />
        </div>
        <Stage
          className={styles.Overlay}
          ref={(el) => { this.canvas = el }}
        >
          <Layer>
            {this.getArrows()}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Canvas

