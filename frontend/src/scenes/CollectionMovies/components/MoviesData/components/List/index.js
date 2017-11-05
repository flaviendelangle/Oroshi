import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ContentTable from '../../../../../../components/ContentTable'
import ListCell from '../../../../../../components/ContentTable/components/List'
import { sortMovies } from './actions'

const TABLE_COLUMNS = [
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

class List extends ContentTable {
  
  render() {
    this.params = {
      ...this.params,
      type: 'collection_movies',
      columns: TABLE_COLUMNS,
      tableStyle: {}
    };
    return super.render();
  }
  
}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {
    sort: (...args) => dispatch(sortMovies(...args))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);