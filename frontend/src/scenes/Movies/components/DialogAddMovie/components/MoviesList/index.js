import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataTables from 'material-ui-datatables'

import SaveButton from './components/SaveButton/index'

const TABLE_COLUMNS = [
  {
    key: 'title',
    label: 'Title',
  }, {
    key: 'release_date',
    label: 'Release date'
  }, {
    render: (name, all) => {
      return (<SaveButton data={all} />)
    }
  }
];

class MoviesList extends Component {
  
  handleCellClick = (key, order) => {
  };
  
  handleCellDoubleClick = (key, order) => {
  };
  
  handleFilterValueChange = (value) => {
  };
  
  handleSortOrderChange = (key, order) => {
  };
  
  render() {
    if(this.props.data.results.length === 0) {
      return (null);
    }
    return (
      <DataTables
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={this.props.data.results}
        showCheckboxes={false}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onFilterValueChange={this.handleFilterValueChange}
        onSortOrderChange={this.handleSortOrderChange}
        page={1}
        count={this.props.data.results.length}
      />
    )
  }
  
}

// Decorate with connect to read form values

const mapStateToProps = state => {
  return {
    data: state.movies.dialogAddMovie.moviesList.data
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);