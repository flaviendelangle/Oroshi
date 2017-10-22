import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress';

import ContentTable from '../../../../components/ContentTable'
import List from '../../../../components/ContentTable/components/List'
import Help from './components/Help'
import Grid from './components/Grid'
import { sortMovies } from './actions'

const progressStyle = {
  width: 40,
  height: 40,
  position: 'absolute',
  left: 'calc(50% - 20px)',
  top: 'calc(50% - 20px)',
};

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
      return <List data={directors} keys={{data:"name", key:"tmdbId"}}/>
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

class MoviesTable extends ContentTable {
  
  render() {
    if(!this.props.loaded) {
      return (
        <div style={progressStyle}>
          <CircularProgress />
        </div>
      );
    } else if(!this.props.found) {
      return (<div>Not found</div>)
    } else if(this.props.movies.length === 0) {
      return (<Help/>)
    } else if(this.props.layout === 'grid') {
      return (<Grid movies={this.props.movies}/>)
    }
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
    movies: state.collectionMovies.moviesTable.movies,
    collection: state.collectionMovies.moviesTable.collection,
    found: state.collectionMovies.moviesTable.found,
    loaded: state.collectionMovies.moviesTable.loaded,
    update: state.collectionMovies.moviesTable.update,
    layout: state.collectionMovies.moviesTable.layout
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sort: (field, direction) => dispatch(sortMovies(field, direction))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesTable);