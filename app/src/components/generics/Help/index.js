import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Progress from '../../../components/generics/Progress'
import Canvas from './Canvas'

import { getElement as _getElement } from '../../../services/actions/help'

import styles from './Help.scss'


class Help extends Component {
  static propTypes = {
    getElement: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    isPublic: PropTypes.bool,
    elementComponent: PropTypes.func,
    element: PropTypes.object,
  }

  componentDidMount() {
    const { getElement, collection, type } = this.props
    getElement(type, collection)
  }

  render() {
    const {
      isPublic,
      element,
      elementComponent,
      collection,
    } = this.props
    if (isPublic) {
      return (
        <div className={styles.PublicHelp} >
          <span className={styles.Content}>There is nothing to see here :(</span>
        </div>
      )
    }
    if (!element) {
      return <Progress />
    }
    return (
      <div className={styles.Help}>
        <div className={styles.Title}>Element layout :</div>
        <Canvas
          component={elementComponent}
          collection={collection}
          element={element}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const root = state.help
  return {
    element: root.element,
  }
}

const mapDispatchToProps = dispatch => ({
  getElement: (...args) => dispatch(_getElement(...args)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Help)
