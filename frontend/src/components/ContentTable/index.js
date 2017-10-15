import React, { Component } from 'react'
import DataTables from 'material-ui-datatables'
import SearchBar from 'material-ui-search-bar'

import { filter } from './services/search'

const parentStyle = {
  width: '80%',
  margin: '20px auto',
};

const searchStyle = {
  margin: '20px auto',
  maxWidth: 800
};

const tableStyle = {
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
};

class ContentTable extends Component {
  
  state = {
    query: ''
  };
  
  handleCellClick = (key, order) => {
  };
  
  handleCellDoubleClick = (key, order) => {
  };
  
  handleFilterValueChange = (value) => {
  };
  
  handleSortOrderChange = (key, order) => {
  };
  
  filter() {
    this.params.toShow = filter(this.params.data, this.state.query);
  };
  
  search = (query) => {
    this.setState({ query });
    this.filter();
  };
  
  render() {
    this.filter();
    return (
      <div style={parentStyle}>
        <SearchBar
          onChange={this.search}
          onRequestSearch={this.search}
          style={searchStyle}
        />
        <div style={tableStyle}>
          <DataTables
            height={'auto'}
            selectable={false}
            showRowHover={true}
            columns={this.params.columns}
            data={this.params.toShow}
            showCheckboxes={false}
            onCellClick={this.handleCellClick}
            onCellDoubleClick={this.handleCellDoubleClick}
            onFilterValueChange={this.handleFilterValueChange}
            onSortOrderChange={this.handleSortOrderChange}
            page={1}
            count={this.params.data.length}
          />
        </div>
      </div>
    )
  }
  
}

export default ContentTable;