import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Progress from '../../components/generics/Progress'
import { get as getCollection } from '../../services/actions/collections'
import { connect } from '../../services/redux'

class CollectionSearch extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    synchronize: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isContentLoaded: PropTypes.bool,
  }
  componentDidMount() {
    const { synchronize, isLoaded, isContentLoaded } = this.props
    if (
      !isLoaded ||
      !isContentLoaded
    ) {
      synchronize()
    }
  }

  onSubmit = (data) => {
    console.log(data)
  }

  render() {
    const {
      isLoaded,
      isContentLoaded,
      type,
    } = this.props
    if (
      !isLoaded ||
      !isContentLoaded
    ) {
      return (
        <Progress />
      )
    }
    return (
      <div>
        <Form onSubmit={this.onSubmit} type={type} />
      </div>
    )
  }
}

const mapStateToProps = ({ content, main }, state) => ({
  collection: main.collection,
  found: main.found,
  isLoaded: main.isLoaded,

  isContentLoaded: content.isContentLoaded,

  lineDimensions: state.app.lineDimensions,
})


const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getCollection(type, collection)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionSearch)

