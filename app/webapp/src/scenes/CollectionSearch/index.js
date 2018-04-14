import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Results from './Results'
import Progress from '../../components/generics/Progress'

import { get as getCollection, searchInCollection } from '../../services/actions/collections'
import { connect } from '../../services/redux'
import scrollable from '../../helpers/scrollable'


class CollectionSearch extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    collection: PropTypes.object.isRequired,
    synchronize: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    content: PropTypes.array,
    matches: PropTypes.array,
    isLoaded: PropTypes.bool.isRequired,
    isContentLoaded: PropTypes.bool,
    lineDimensions: PropTypes.object,
  }

  static defaultProps = {
    content: [],
    matches: [],
  }

  componentDidMount() {
    const { synchronize, isLoaded, isContentLoaded } = this.props
    if (
      !isLoaded ||
      !isContentLoaded
    ) {
      synchronize().then(() => this.onSubmit({}))
    } else {
      this.onSubmit({})
    }
  }

  onSubmit = (data) => {
    const { search, content } = this.props
    search(data, content)
  }

  render() {
    const {
      isLoaded,
      isContentLoaded,
      type,
      content,
      matches,
      lineDimensions,
      collection,
      config,
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
        <Form onSubmit={this.onSubmit} type={type} content={content} />
        <Results
          type={type}
          collection={collection}
          data={{ results: matches }}
          lineDimensions={lineDimensions}
          elementComponent={config.elementComponent}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ content, main, search }, state) => ({
  collection: main.collection,
  found: main.found,
  isLoaded: main.isLoaded,

  isContentLoaded: content.isContentLoaded,
  content: content.content,

  matches: search.matches,

  lineDimensions: state.app.lineDimensions,
})


const mapDispatchToProps = (dispatch, { type, collection }) => ({
  synchronize: () => dispatch(getCollection(type, collection)),
  search: (data, elements) => {
    dispatch(searchInCollection(type, collection, data, elements))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(scrollable(CollectionSearch))

