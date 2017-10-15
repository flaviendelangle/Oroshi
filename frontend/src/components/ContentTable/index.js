import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import DataTables from 'material-ui-datatables'
import SearchBar from 'material-ui-search-bar'

import { filter } from './services/search'
import SeenCheckbox from './components/SeenCheckbox'

const parentStyle = {
  paddingTop: 20
};

const searchStyle = {
  margin: '0 auto 20px auto',
  maxWidth: 800
};

const tableStyle = {
  width: '80%',
  margin: 'auto',
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  maxHeight: 'calc(100vh - 172px)',
};


class ContentTable extends Component {
  
  GENERIC_COLUMNS = {
    seen: {
      label: 'Seen ?',
      render: (name, all) => {
        return (
          <SeenCheckbox data={all} type={this.params.type}/>
        )
      }
    }
  };
  
  
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
  
  complete(columns) {
    return [].concat(columns).concat([this.GENERIC_COLUMNS.seen]);
  }
  
  render() {
    this.complete();
    this.filter();
    return (
        <div style={parentStyle}>
          <SearchBar
            onChange={this.search}
            onRequestSearch={this.search}
            style={searchStyle}
          />
          <ScrollArea
            speed={0.8}
            horizontal={false}
            style={tableStyle}
          >
            <DataTables
              height={'auto'}
              selectable={false}
              showRowHover={true}
              columns={this.complete(this.params.columns)}
              data={this.params.toShow}
              showCheckboxes={false}
              onCellClick={this.handleCellClick}
              onCellDoubleClick={this.handleCellDoubleClick}
              onFilterValueChange={this.handleFilterValueChange}
              onSortOrderChange={this.handleSortOrderChange}
              page={1}
              count={this.params.data.length}
            />
          </ScrollArea>
        </div>
    )
  }
  
}

export default ContentTable;