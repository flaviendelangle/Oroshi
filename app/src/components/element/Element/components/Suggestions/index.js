import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ContentAdd from 'material-ui/svg-icons/content/add'


const Suggestions = ({
  creationMode,
  collection,
  data,
  isPublic,
  type,
}) => {
  if (creationMode || isPublic) {
    return null
  }
  const url = `/collections/${type}/${collection.pk}/suggestions/${data.getPublicId()}/`
  return (
    <Link to={url} >
      <ContentAdd />
    </Link>
  )
}

Suggestions.propTypes = {
  creationMode: PropTypes.bool,
  collection: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isPublic: PropTypes.bool,
  type: PropTypes.string.isRequired,
}

export default Suggestions
