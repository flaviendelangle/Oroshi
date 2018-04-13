import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ImageEye from 'material-ui/svg-icons/image/remove-red-eye'

import Element from '../../components/element/Element/index'
import { addElement, removeElement } from '../../services/actions/collections/index'
import { switchSeenOnElement } from './actions'
import { publicRoot } from '../../services/TheMovieDatabaseJS/movies'
import date from '../../services/content/date'


const LAYOUT = {
  title: {
    label: 'Title',
  },
  year: {
    label: 'Year of release',
  },
  grade: {
    label: 'Public grade',
  },
  seen: {
    label: 'Have you seen it ?',
  },
  suggestions: {
    label: 'Find others suggested movies',
  },
  add: {
    label: 'Add to collection',
  },
}

const SEEN_STYLE = { color: 'green' }
const NOT_SEEN_STYLE = { color: 'red' }

/** Class representing a movie frame, used mainly in the layouts (Grid + Stream) */
class Movie extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    onRender: PropTypes.func,
    creationMode: PropTypes.bool, // RENAME
    mode: PropTypes.string,
    switchSeen: PropTypes.func,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps
    if (
      !prevState.data ||
      prevState.data !== nextProps.data
    ) {
      const releaseDate = date(data.getReleaseDate(), date.TMDB_FORMAT, date.YEAR_FORMAT)
      const footer = [
        { key: 'year', value: releaseDate },
        { key: 'title', value: data.getTitle(), link: publicRoot + data.getPublicId() },
      ]
      return {
        data,
        footer,
      }
    }

    return {
      data,
    }
  }

  state = {
    footer: [],
    data: null, // eslint-disable-line react/no-unused-state
  }

  isTesting = () => this.props.mode === 'test'

  switchSeen = () => {
    const { data, switchSeen } = this.props
    if (this.isTesting()) {
      return null
    }
    return switchSeen(data)
  }

  render() {
    const {
      collection,
      data,
      create,
      destroy,
      creationMode,
      onRender,
      ...props
    } = this.props
    const { footer } = this.state
    return (
      <Element
        data={data}
        collection={collection}
        type="movies"
        layout={LAYOUT}
        creationMode={creationMode}
        onSave={create}
        onDestroy={destroy}
        onRendery={onRender}
        footer={footer}
        topRightAction={
          <Seen
            creationMode={creationMode}
            seen={data.hasBeenSeen()}
            onClick={this.switchSeen}
          />
        }
        topRightActionKey="seen"
        topLeftAction="suggestions"
        {...props}
      />
    )
  }
}

const Seen = ({ seen, onClick, creationMode }) => {
  if (creationMode) {
    return null
  }
  return (
    <ImageEye
      style={seen ? SEEN_STYLE : NOT_SEEN_STYLE}
      onClick={onClick}
    />
  )
}

Seen.propTypes = {
  seen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  creationMode: PropTypes.bool, // RENAME
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  create: (collection, element) => {
    dispatch(addElement('movies', collection, element))
  },
  destroy: (collection, element) => {
    dispatch(removeElement('movies', collection, element))
  },
  switchSeen: data => dispatch(switchSeenOnElement(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Movie)
