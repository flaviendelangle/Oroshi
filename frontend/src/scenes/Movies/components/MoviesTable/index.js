import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ContentTable from '../../../../components/ContentTable'
import List from '../../../../components/ContentTable/components/List'

const TABLE_COLUMNS = [
  {
    key: 'pk',
    label: 'N°',
    style: {
      width: '50px' // 98px
    }
  }, {
    key: 'title',
    label: 'Title',
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
      return <List data={directors} keys={{data:"name", key:"tmdbId"}}/>
    }
  }, {
    key: 'note',
    label: 'Note',
    style: {
      width: '50px',
    },
    render: (note, all) => {
      return <span>{note} / 10</span>
    }
  }
];

class MoviesTable extends ContentTable {
  
  render() {
    this.params = {
      ...this.params,
      type: 'collection_movies',
      columns: TABLE_COLUMNS,
      data: this.props.movies,
      tableStyle: {}
    };
    return super.render();
  }
  
}

const mapStateToProps = state => {
  return {
    movies: state.movies.moviesTable.movies
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesTable);