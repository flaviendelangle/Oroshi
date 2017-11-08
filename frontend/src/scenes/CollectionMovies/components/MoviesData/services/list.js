import React from 'react'

import { Link } from 'react-router-dom'
import ListCell from 'components/ContentTable/components/List'

export const TABLE_COLUMNS = [
  {
    key: 'pk',
    label: 'N°',
    sortable: true,
    style: {
      width: '50px' // 98px
    }
  }, {
    key: 'title',
    label: 'Title',
    sortable: true,
    style: {
      width: '30%', // 30% + 48px
      overflow: 'hidden'
    },
    render: (title, all) => {
      return <Link to={'/movies/' + all.tmdbId + '/'}>{title}</Link>
      
    }
  }, {
    key: 'release',
    label: 'Release',
    sortable: true,
    style: {
      width: '80px' // 128px
    }
  }, {
    key: 'directors',
    label: 'Directors',
    style: {
      width: 'calc(70% - 274px)',
      overflow: 'hidden'
    },
    render: (directors, all) => {
      return <ListCell data={directors} keys={{data:"name", key:"tmdbId"}}/>
    }
  }, {
    key: 'note',
    label: 'Note',
    sortable: true,
    style: {
      width: '50px',
    },
    render: (note, all) => {
      return <span>{note} / 10</span>
    }
  }
];
